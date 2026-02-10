import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type Body = {
  kit?: string;        // human title (recommended)
  note?: string;
  productId?: string;  // slug (recommended)
};

function slugify(input: string) {
  return (input || "")
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Body;

    const kitTitle = (body.kit || "").trim();
    const note = (body.note || "").trim();

    if (!kitTitle) {
      return NextResponse.json({ error: "Missing kit" }, { status: 400 });
    }

    const priceId = process.env.STRIPE_CINEMA_PRICE_ID;
    if (!priceId) {
      return NextResponse.json(
        { error: "Missing STRIPE_CINEMA_PRICE_ID env var" },
        { status: 500 }
      );
    }

    const origin =
      process.env.NEXT_PUBLIC_SITE_URL?.trim() || new URL(req.url).origin;

    const safeNote = note.slice(0, 450);

    // ✅ Prefer passed slug; else derive from title
    const productId = (body.productId || "").trim() || slugify(kitTitle);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],

      success_url: `${origin}/checkout/success?from=cinema&kit=${encodeURIComponent(
        kitTitle
      )}&pid=${encodeURIComponent(productId)}`,
      cancel_url: `${origin}/cinema`,

      metadata: {
        product_type: "cinema",
        product_id: productId,
        product_title: kitTitle,
        note: safeNote,
      },

      client_reference_id: productId,

      customer_creation: "if_required",
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : typeof err === "string" ? err : "Unknown error";

    console.error("POST /api/checkout/cinema failed:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
