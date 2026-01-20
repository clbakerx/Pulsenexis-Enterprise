import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

// 1) Central SKU → PRICE_ID map
function priceForSku(sku: string): string | undefined {
  const map: Record<string, string | undefined> = {
    // Blueprints
    rnb_blueprint_instant: process.env.STRIPE_PRICE_RNB_BLUEPRINT_INSTANT,
    rnb_blueprint_custom: process.env.STRIPE_PRICE_RNB_BLUEPRINT_CUSTOM,

    // Packs (examples — name them however you want)
    pack_rnb_blueprint: process.env.STRIPE_PRICE_PACK_RNB_BLUEPRINT,
    pack_trap_soul: process.env.STRIPE_PRICE_PACK_TRAP_SOUL,
    pack_cinematic: process.env.STRIPE_PRICE_PACK_CINEMATIC,
  };

  return map[sku];
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const sku = String(body?.sku || "");

    if (!sku) {
      return NextResponse.json({ error: "Missing sku" }, { status: 400 });
    }

    const priceId = priceForSku(sku);
    if (!priceId) {
      return NextResponse.json(
        { error: `Unknown sku or missing env var for sku: ${sku}` },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!siteUrl) {
      return NextResponse.json(
        { error: "Missing NEXT_PUBLIC_SITE_URL in env" },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/catalog/packs`,
      metadata: { sku },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
