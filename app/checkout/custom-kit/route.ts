import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const priceId = process.env.STRIPE_CUSTOM_KIT_PRICE_ID;
    if (!priceId) {
      return NextResponse.json(
        { error: "Missing STRIPE_CUSTOM_KIT_PRICE_ID" },
        { status: 500 }
      );
    }

    // Basic validation (keep it simple)
    const email = (body.email || "").trim();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Stripe metadata limits:
    // - keys/values must be strings
    // - keep values reasonably short
    // We'll stringify arrays/objects.
    const metadata: Record<string, string> = {
      intake_email: email,
      projectType: String(body.projectType || ""),
      platforms: Array.isArray(body.platforms) ? body.platforms.join(", ") : "",
      mood: Array.isArray(body.mood) ? body.mood.join(", ") : "",
      genre: String(body.genre || ""),
      tempo: String(body.tempo || ""),
      key: String(body.key || ""),
      length: String(body.length || ""),
      deliverables: Array.isArray(body.deliverables)
        ? body.deliverables.join(", ")
        : "",
      usageScope: String(body.usageScope || ""),
      brandName: String(body.brandName || ""),
      deadline: String(body.deadline || ""),
      budget: String(body.budget || ""),
      notes: String(body.notes || "").slice(0, 480), // keep metadata short
    };

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,

      // where Stripe returns to your site
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/custom-music-kits/create?canceled=1`,

      // save the intake on the Checkout Session
      metadata,

      // also save on the PaymentIntent (useful for webhooks)
      payment_intent_data: {
        metadata,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Checkout error" },
      { status: 500 }
    );
  }
}
