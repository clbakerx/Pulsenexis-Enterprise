import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

// ✅ Lock API version so Checkout supports custom_fields consistently
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
});

type Body = {
  packSlug?: string;
  note?: string;
};

const PACKS_ALLOWLIST = new Set([
  "rnb-blueprint",
  "trap-soul",
  "smooth-jazz",
  "dance-pop",
  "hip-hop-drums",
  "cinematic",
]);

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    const packSlug = (body.packSlug || "").trim();
    if (!PACKS_ALLOWLIST.has(packSlug)) {
      return NextResponse.json({ error: "Invalid pack." }, { status: 400 });
    }

    // Your pre-checkout note (optional) - stored in metadata (not shown on Stripe Checkout)
    const note = (body.note || "").trim().slice(0, 200);

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
      "http://localhost:3000";

    const priceId = (process.env.STRIPE_PRICE_PACK_BUNDLE_199 || "").trim();
    if (!priceId) {
      return NextResponse.json(
        { error: "Missing STRIPE_PRICE_PACK_BUNDLE_199" },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      // ✅ Hardened line_items
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      success_url: `${siteUrl}/packs?success=1&pack=${encodeURIComponent(
        packSlug
      )}`,
      cancel_url: `${siteUrl}/packs?canceled=1&pack=${encodeURIComponent(
        packSlug
      )}`,

      // ✅ Shows a Notes textbox ON Stripe Checkout
      // IMPORTANT: Stripe max length is 255
      custom_fields: [
        {
          key: "order_note",
          label: { type: "custom", custom: "Indicate which Pack you want" },
          type: "text",
          optional: true,
          text: { maximum_length: 255 }, // ✅ FIXED (was 500)
        },
      ],

      // Internal storage (your app/admin)
      metadata: {
        type: "pack",
        packSlug,
        note,
      },

      payment_intent_data: {
        metadata: {
          type: "pack",
          packSlug,
          note,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Checkout packs error:", err);
    return NextResponse.json(
      { error: err?.message || "Checkout failed." },
      { status: 500 }
    );
  }
}
