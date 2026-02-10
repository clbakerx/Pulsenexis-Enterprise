import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // If your Stripe typings complain, remove apiVersion line.
});

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const kit = (url.searchParams.get("kit") || "").trim();
    const note = (url.searchParams.get("note") || "").trim();

    if (!kit) {
      return NextResponse.json({ error: "Missing kit param" }, { status: 400 });
    }

    // ✅ This must be a Stripe PRICE id like: price_123...
    const priceId = process.env.STRIPE_CINEMA_PRICE_ID;
    if (!priceId) {
      return NextResponse.json(
        { error: "Missing STRIPE_CINEMA_PRICE_ID env var" },
        { status: 500 }
      );
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL || url.origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],

      // ✅ where Stripe returns after payment / cancel
      success_url: `${origin}/checkout/success?from=cinema&kit=${encodeURIComponent(kit)}`,
      cancel_url: `${origin}/cinema`,

      // ✅ Save the kit + optional note
      metadata: {
        product_type: "cinema",
        kit,
        note: note ? note.slice(0, 450) : "", // keep it short/safe
      },

      // optional nicety
      customer_creation: "if_required",
      allow_promotion_codes: true,
    });

    return NextResponse.redirect(session.url!, { status: 303 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : typeof err === "string" ? err : "Unknown error";
    console.error("GET /api/checkout/cinema failed:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
