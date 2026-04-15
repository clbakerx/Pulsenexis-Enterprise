import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

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

      console.log("PAID:", {
        productType,
        amount_total: session.amount_total,
        customer_email: session.customer_details?.email,
        session_id: session.id,
      });

      // Credit studio video purchases
      if (productType === "studio_credits") {
        const clerkUserId = session.client_reference_id;
        const creditsToAdd = parseInt(meta.credits || "1", 10);

        if (clerkUserId) {
          // Upsert user row
          await supabaseAdmin.from("users").upsert(
            {
              clerk_user_id: clerkUserId,
              email: session.customer_details?.email ?? null,
            },
            { onConflict: "clerk_user_id" }
          );

          // Fetch and increment credits
          const { data: user } = await supabaseAdmin
            .from("users")
            .select("id, credits")
            .eq("clerk_user_id", clerkUserId)
            .single();

          if (user) {
            await supabaseAdmin
              .from("users")
              .update({ credits: user.credits + creditsToAdd })
              .eq("id", user.id);

            console.log("Added " + creditsToAdd + " credit(s) to user " + clerkUserId);
          }
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
