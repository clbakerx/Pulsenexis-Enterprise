import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Still return success so the widget UX isn't blocked when email isn't configured
    console.warn("RESEND_API_KEY not set — email not sent for nova lead:", email);
    return NextResponse.json({ success: true });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: "Nova at PulseNexis <info@pulsenexis.com>",
      to: [email],
      bcc: ["info@pulsenexis.com"],
      subject: "Nova here — your PulseNexis music awaits 🎵",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 580px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #eee;">
          <div style="background: #1a1a2e; padding: 28px 32px;">
            <p style="margin: 0; font-size: 22px; font-weight: 600; color: #fff;">Hey, it's Nova 👋</p>
            <p style="margin: 8px 0 0; font-size: 14px; color: #aaa;">Your PulseNexis music assistant</p>
          </div>
          <div style="padding: 28px 32px;">
            <p style="margin: 0 0 16px; font-size: 15px; color: #333; line-height: 1.6;">
              Thanks for connecting with me. Whether you're a creator, a game dev, or you need a custom song for someone special — PulseNexis has you covered.
            </p>
            <p style="margin: 0 0 24px; font-size: 15px; color: #333; line-height: 1.6;">
              Here are a few places to start:
            </p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0;">
                  <a href="https://pulsenexis.com/packs" style="color: #534AB7; font-weight: 500; font-size: 14px; text-decoration: none;">→ Browse Music Packs</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0;">
                  <a href="https://pulsenexis.com/custom-songs" style="color: #534AB7; font-weight: 500; font-size: 14px; text-decoration: none;">→ Order a Custom Song</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0;">
                  <a href="https://pulsenexis.com/games" style="color: #534AB7; font-weight: 500; font-size: 14px; text-decoration: none;">→ Gaming Audio Packs</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0;">
                  <a href="https://pulsenexis.com/free-sample" style="color: #534AB7; font-weight: 500; font-size: 14px; text-decoration: none;">→ Grab a Free Sample</a>
                </td>
              </tr>
            </table>
            <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #f0f0f0;">
              <p style="margin: 0; font-size: 13px; color: #999;">
                No spam, ever. Just new music drops, deals, and updates from PulseNexis.<br/>
                — Nova &amp; the PulseNexis team
              </p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Resend error (nova-lead):", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
