import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

type Deliverable = "loops" | "alt" | "stems";

type CartItem = {
  id: string;
  trackId: string;
  title: string;
  deliverable: Deliverable;
};

const PRICE_BY_DELIVERABLE: Record<Deliverable, string> = {
  stems: "price_1SrSENE65uOKrEAHa3bT2Gia",
  alt: "price_1SrS2aE65uOKrEAHZyksARpJ",   // Samples
  loops: "price_1SrRzvE65uOKrEAHhDi85YS2",
};

export async function POST(req: Request) {
  try {
    const { cart } = (await req.json()) as { cart: CartItem[] };

    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Group quantities by deliverable price
    const qtyByDeliverable: Record<Deliverable, number> = { loops: 0, alt: 0, stems: 0 };
    for (const item of cart) qtyByDeliverable[item.deliverable]++;

    const line_items = (Object.keys(qtyByDeliverable) as Deliverable[])
      .filter((d) => qtyByDeliverable[d] > 0)
      .map((d) => ({
        price: PRICE_BY_DELIVERABLE[d],
        quantity: qtyByDeliverable[d],
      }));

    const origin = req.headers.get("origin") ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/catalog`,
      // Optional: useful metadata for fulfillment later
      metadata: {
        cart_summary: JSON.stringify(
          cart.map((c) => ({ trackId: c.trackId, title: c.title, deliverable: c.deliverable }))
        ).slice(0, 500), // keep it small
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Checkout error" }, { status: 500 });
  }
}
