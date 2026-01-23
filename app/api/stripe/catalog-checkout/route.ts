import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Deliverable = "loops" | "samples" | "stems";

type CartItem = {
  title: string;
  deliverable: Deliverable;
  qty?: number;
};

const PRICE_BY_DELIVERABLE: Record<Deliverable, string | undefined> = {
  loops: process.env.STRIPE_PRICE_CATALOG_LOOPS,
  samples: process.env.STRIPE_PRICE_CATALOG_SAMPLES,
  stems: process.env.STRIPE_PRICE_CATALOG_STEMS,
};

function isDeliverable(x: any): x is Deliverable {
  return x === "loops" || x === "samples" || x === "stems";
}

export async function POST(req: Request) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return NextResponse.json(
        { error: "Missing STRIPE_SECRET_KEY (check .env.local + restart dev server)" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });

    const { items, customerEmail } = await req.json();

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const safeItems: CartItem[] = items
      .filter((it: any) => it && typeof it === "object")
      .map((it: any) => ({
        title: String(it.title ?? "").slice(0, 120),
        deliverable: it.deliverable,
        qty: Number.isFinite(it.qty) ? Math.max(1, Math.min(99, Number(it.qty))) : 1,
      }))
      .filter((it) => it.title.length > 0 && isDeliverable(it.deliverable));

    if (safeItems.length === 0) {
      return NextResponse.json({ error: "No valid cart items" }, { status: 400 });
    }

    // Ensure prices exist
    for (const it of safeItems) {
      const price = PRICE_BY_DELIVERABLE[it.deliverable];
      if (!price) {
        return NextResponse.json(
          { error: `Missing Stripe price env for deliverable: ${it.deliverable}` },
          { status: 500 }
        );
      }
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = safeItems.map((it) => ({
      price: PRICE_BY_DELIVERABLE[it.deliverable]!,
      quantity: it.qty ?? 1,
    }));

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!siteUrl) {
      return NextResponse.json({ error: "Missing NEXT_PUBLIC_SITE_URL" }, { status: 500 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer_email: customerEmail || undefined,
      billing_address_collection: "auto",
      success_url: `${siteUrl}/catalog/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/catalog?canceled=1`,
      metadata: {
        cart: JSON.stringify(safeItems).slice(0, 5000),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("catalog-checkout error:", err);
    return NextResponse.json({ error: err?.message ?? "Server error" }, { status: 500 });
  }
}
