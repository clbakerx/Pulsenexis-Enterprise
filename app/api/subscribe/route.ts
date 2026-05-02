import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { email, track } = await req.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: 'PulseNexis <info@pulsenexis.com>',
      to: [email],
      subject: 'Your free Pulsenexis sample 🎵',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">Here's your free sample!</h2>
          <p>Thanks for trying Pulsenexis. Here's the track we picked for you:</p>
          <p style="font-size: 18px; font-weight: bold;">${track}</p>
          <p>
            <a href="${track}" style="background: #10b981; color: white; padding: 12px 24px; border-radius: 999px; text-decoration: none; display: inline-block;">
              Download Your Sample
            </a>
          </p>
          <p style="color: #6b7280; font-size: 14px;">
            No spam. Unsubscribe anytime.<br/>
            — The Pulsenexis Team
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Resend error:', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}