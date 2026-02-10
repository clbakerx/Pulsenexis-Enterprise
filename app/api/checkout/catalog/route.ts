import { NextResponse } from "next/server";
import Stripe from "stripe";
import { COMPLETE_BUNDLE_PRICE_CENTS } from "@/lib/pricing";

export const runtime = "nodejs";

// Guard STRIPE_SECRET_KEY so failures are clear
const secret = process.env.STRIPE_SECRET_KEY;
if (!secret) {
  throw new Error(
    "Missing STRIPE_SECRET_KEY (set it in .env.local or Vercel env vars)"
  );
}

// Keep apiVersion unset to avoid TS mismatch issues unless you know you need it
const stripe = new Stripe(secret);

type Deliverable = "loops" | "samples" | "stems" | "complete";

type CartRow = {
  title: string;
  deliverable: Deliverable;
  qty?: number;
  trackId?: string;
  packSlug?: string;
};

const UNIT_AMOUNT: Record<Deliverable, number> = {
  loops: 2900,
  samples: 4900,
  stems: 6900,
  complete: COMPLETE_BUNDLE_PRICE_CENTS, // ✅ was 10000
};

function isDeliverable(v: unknown): v is Deliverable {
  return v === "loops" || v === "samples" || v === "stems" || v === "complete";
}

function clampQty(v: unknown) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(99, Math.floor(n)));
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const cart = body?.cart as CartRow[] | undefined;

    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const row of cart) {
      if (!row || typeof row.title !== "string" || !row.title.trim()) {
        return NextResponse.json(
          { error: "Invalid cart row: missing title" },
          { status: 400 }
        );
      }

      if (!isDeliverable(row.deliverable)) {
        return NextResponse.json(
          { error: `Invalid deliverable for: ${row.title}` },
          { status: 400 }
        );
      }

      const qty = clampQty(row.qty);
      const deliverable = row.deliverable;

      const pretty =
        deliverable === "complete"
          ? "Complete Bundle (Loops + Stems + Samples MP3/WAV)"
          : deliverable.toUpperCase();

      line_items.push({
        quantity: qty,
        price_data: {
          currency: "usd",
          unit_amount: UNIT_AMOUNT[deliverable],
          product_data: {
            name: `${row.title} — ${pretty}`,
          },
        },
      });
    }

    if (line_items.length === 0) {
      return NextResponse.json({ error: "No valid items" }, { status: 400 });
    }

    const origin =
      req.headers.get("origin") ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      "http://localhost:3000";

    // Keep metadata small + safe
    const safeCart = JSON.stringify(
      cart.map((r) => ({
        title: String(r.title ?? "").slice(0, 120),
        deliverable: r.deliverable,
        qty: clampQty(r.qty),
        trackId: r.trackId ?? "",
        packSlug: r.packSlug ?? "",
      }))
    ).slice(0, 4500);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/catalog`,
      metadata: { source: "catalog" },
      payment_intent_data: {
        metadata: {
          source: "catalog",
          cart: safeCart,
        },
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe session created without a redirect URL" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
