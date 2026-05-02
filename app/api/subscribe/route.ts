import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, track } = await req.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const res = await fetch(
    `https://api.convertkit.com/v3/forms/${process.env.KIT_FORM_ID}/subscribe`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: process.env.KIT_API_KEY,
        email,
        fields: { sample_track: track },
      }),
    }
  );

  const data = await res.json();

  if (!res.ok || data.error) {
    return NextResponse.json({ error: data.message || 'Failed' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}