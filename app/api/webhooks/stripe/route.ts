import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Stripe requires the RAW request body for signature verification
async function getRawBody(req: Request) {
  const arrayBuffer = await req.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  const rawBody = await getRawBody(req);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${err.message}` },
      { status: 400 }
    );
  }

  // ✅ handle successful checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const buyerEmail = session.customer_details?.email || "";
    const bundle = (session.metadata?.bundle || "Unknown Bundle") as string;

    // Optional: fetch custom fields (notes) if you added them
    const full = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["custom_fields"],
    });

    const noteField = (full as any).custom_fields?.find((f: any) => f.key === "notes");
    const buyerNotes = noteField?.text?.value || "";

    // ✅ Bundle -> Download Links (your real FileDN zips)
    const DOWNLOADS: Record<string, { mainZip: string; v2Zip?: string }> = {
      "Love Sessions EP 01": {
        mainZip:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Shorts/Love-Sessions-EP_01/Love_Sessions_EP01_Bundle.zip",
        v2Zip:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Shorts/Love-Sessions-EP_01/Love_Sessions_EP01_V2_Bundle.zip",
      },
    };

    const links = DOWNLOADS[bundle];

    // 🔒 Fallback if the bundle name doesn't match
    // (You can set this to a generic "All Episodes" zip later.)
    if (!links) {
      console.warn("No download mapping found for bundle:", bundle);
    }

    // ✅ For now we log it (Step 3 will email it automatically)
    console.log("✅ SHORTS PURCHASE:", {
      buyerEmail,
      bundle,
      buyerNotes,
      downloads: links || null,
    });
  }

  return NextResponse.json({ received: true });
}
