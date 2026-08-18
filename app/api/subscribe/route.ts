import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a few minutes.' },
      { status: 429 },
    );
  }

  let email = '';
  let track = '';
  try {
    const body = await req.json();
    email = (body.email ?? '').trim();
    track = body.track ?? '';
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  // Verify server configuration BEFORE calling Brevo. A missing key or list id
  // in the deployed environment is the most common cause of "subscription failed."
  const apiKey = process.env.BREVO_API_KEY;
  const listIdRaw = process.env.BREVO_LIST_ID;

  if (!apiKey) {
    console.error('Subscribe config error: BREVO_API_KEY is not set in this environment');
    return NextResponse.json(
      { error: 'Email service is not configured (missing API key).' },
      { status: 500 },
    );
  }

  const listId = Number(listIdRaw);
  if (!listIdRaw || Number.isNaN(listId)) {
    console.error('Subscribe config error: BREVO_LIST_ID missing or not a number:', listIdRaw);
    return NextResponse.json(
      { error: 'Email service is not configured (missing list id).' },
      { status: 500 },
    );
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
        attributes: { SAMPLE_TRACK: track },
      }),
    });

    // 201 created, 204 updated, 200 ok — all good.
    if (res.ok) {
      return NextResponse.json({ success: true });
    }

    // Read Brevo's actual response so the real reason is visible.
    const detail = await res.text();

    // A known duplicate is not a real failure — the email is already captured.
    if (res.status === 400 && detail.toLowerCase().includes('already exist')) {
      return NextResponse.json({ success: true, note: 'already_subscribed' });
    }

    console.error(`Brevo error ${res.status}:`, detail);

    // Surface the real reason to the client instead of a generic message,
    // so a failure shows WHY on screen. Trim to keep it readable.
    return NextResponse.json(
      { error: `Subscription failed (${res.status})`, detail: detail.slice(0, 300) },
      { status: 502 },
    );
  } catch (err) {
    console.error('Subscribe error:', err);
    return NextResponse.json(
      { error: 'Server error contacting the email service.' },
      { status: 500 },
    );
  }
}