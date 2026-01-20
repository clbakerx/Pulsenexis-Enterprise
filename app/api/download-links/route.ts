import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

// Your pack → file keys mapping (edit to match your storage paths)
function fileKeysFor(packSlug: string, tier: string) {
  const base = `packs/${packSlug}`;
  if (tier === "loops") return [{ name: "Loops.zip", key: `${base}/loops.zip` }];
  if (tier === "alt") return [
    { name: "Loops.zip", key: `${base}/loops.zip` },
    { name: "Alt Versions.zip", key: `${base}/alt.zip` },
  ];
  if (tier === "stems") return [
    { name: "Loops.zip", key: `${base}/loops.zip` },
    { name: "Alt Versions.zip", key: `${base}/alt.zip` },
    { name: "Stems.zip", key: `${base}/stems.zip` },
  ];
  return [];
}

// TODO: Replace this with your storage’s signed-url function (S3/R2/Supabase/etc.)
async function signUrlForKey(_key: string): Promise<string> {
  throw new Error("signUrlForKey() not implemented for your storage yet.");
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id");
  const email = searchParams.get("email")?.toLowerCase().trim();

  if (!session_id || !email) return new Response("Missing session_id or email", { status: 400 });

  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.payment_status !== "paid") return new Response("Payment not completed.", { status: 403 });

  const stripeEmail = session.customer_details?.email?.toLowerCase().trim();
  if (!stripeEmail || stripeEmail !== email) return new Response("Email mismatch.", { status: 403 });

  const packSlug = session.metadata?.packSlug;
  const tier = session.metadata?.tier;

  if (!packSlug || !tier) return new Response("Missing purchase metadata.", { status: 400 });

  const files = fileKeysFor(packSlug, tier);
  if (!files.length) return new Response("No files available for this tier.", { status: 400 });

  const signed = await Promise.all(
    files.map(async (f) => ({ name: f.name, url: await signUrlForKey(f.key) }))
  );

  return Response.json({ files: signed });
}
