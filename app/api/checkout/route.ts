import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

type Deliverable = "loops" | "samples" | "stems";

type CartItem = {
  title: string;
  deliverable: Deliverable;
};

const PRICE_BY_DELIVERABLE: Record<Deliverable, string | undefined> = {
  loops: process.env.STRIPE_PRICE_CATALOG_LOOPS,
  samples: process.env.STRIPE_PRICE_CATALOG_SAMPLES,
  stems: process.env.STRIPE_PRICE_CATALOG_STEMS,
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cart = body.cart ?? body.items;

    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    for (const key of ["loops", "samples", "stems"] as Deliverable[]) {
      if (!PRICE_BY_DELIVERABLE[key]) {
        return NextResponse.json(
          { error: `Missing price env for ${key}` },
          { status: 500 }
        );
      }
    }

    const counts: Record<Deliverable, number> = {
      loops: 0,
      samples: 0,
      stems: 0,
    };

    for (const item of cart) {
      if (counts[item.deliverable] !== undefined) {
        counts[item.deliverable]++;
      }
    }

    const line_items = (Object.keys(counts) as Deliverable[])
      .filter((k) => counts[k] > 0)
      .map((k) => ({
        price: PRICE_BY_DELIVERABLE[k]!,
        quantity: counts[k],
      }));

    const origin =
      req.headers.get("origin") ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/catalog/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/catalog`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err?.message ?? "Checkout failed" },
      { status: 500 }
    );
  }
}
