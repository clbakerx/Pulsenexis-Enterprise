import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const TIERS = {
  single: { amount: 999,  credits: 1,  name: "1 AI Video" },
  pack3:  { amount: 2400, credits: 3,  name: "3 AI Videos" },
  pack10: { amount: 5900, credits: 10, name: "10 AI Videos" },
} as const;

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    const signInUrl = new URL("/sign-in", process.env.NEXT_PUBLIC_SITE_URL);
    signInUrl.searchParams.set("redirect_url", req.url);
    return Response.redirect(signInUrl.toString());
  }

  const tier = (req.nextUrl.searchParams.get("tier") ?? "single") as keyof typeof TIERS;
  const tierData = TIERS[tier] ?? TIERS.single;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price_data: {
        currency: "usd",
        product_data: { name: `PulseNexis Studio — ${tierData.name}` },
        unit_amount: tierData.amount,
      },
      quantity: 1,
    }],
    mode: "payment",
    client_reference_id: userId,
    metadata: {
      product_type: "studio_credits",
      tier,
      credits: String(tierData.credits),
    },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/studio?purchased=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/studio/checkout`,
  });

  return Response.redirect(session.url!);
}
