import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const bundle = searchParams.get("bundle") || "Shorts Bundle";

  const PRICE_ID = process.env.STRIPE_SHORTS_PRICE_ID as string;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL as string;

  if (!PRICE_ID) {
    return NextResponse.json(
      { error: "Missing STRIPE_SHORTS_PRICE_ID env var" },
      { status: 500 }
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: PRICE_ID, quantity: 1 }],

    success_url: `${SITE_URL}/shorts?success=1`,
    cancel_url: `${SITE_URL}/shorts?canceled=1`,

    // ✅ records which bundle they chose
    metadata: {
      product: "PulseNexis Shorts Bundle",
      bundle,
    },

    // ✅ user-entered note shown in Stripe Checkout
    custom_fields: [
      {
        key: "notes",
        label: { type: "custom", custom: "Bundle notes (optional)" },
        type: "text",
        optional: true,
        text: { maximum_length: 200 },
      },
    ],
  });

  return NextResponse.redirect(session.url!, { status: 303 });
}
