import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });

  const whsec = process.env.STRIPE_WEBHOOK_SECRET;
  if (!whsec) return NextResponse.json({ error: "Missing STRIPE_WEBHOOK_SECRET" }, { status: 500 });

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, whsec);
  } catch (err: any) {
    console.error("Webhook signature verify failed:", err?.message);
    return NextResponse.json({ error: "Bad signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const meta = session.metadata || {};
      const productType = meta.product_type;
      const productId = meta.product_id;
      const productTitle = meta.product_title;
      const note = meta.note;

      // ✅ This is your “notification” source of truth
      console.log("✅ PAID:", {
        productType,
        productId,
        productTitle,
        note,
        amount_total: session.amount_total,
        customer_email: session.customer_details?.email,
        session_id: session.id,
      });

      // OPTIONAL: store in DB, send email, create download record, etc.
      // Example pseudo:
      // await db.orders.create({ ... })
      // await sendEmailToYou({ productType, productId, productTitle, ... })
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
