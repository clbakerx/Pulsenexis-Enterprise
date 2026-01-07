import Link from "next/link";
import { getPackBySlug } from "@/data/packs";

export default function PackDetailPage({ params }: { params: { slug: string } }) {
  const pack = getPackBySlug(params.slug);
  if (!pack) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Pack not found</h1>
        <p className="mt-2 opacity-80">This pack slug does not exist.</p>
        <Link className="mt-6 inline-block underline" href="/catalog/packs">
          Back to packs
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex flex-col gap-3">
        <Link className="underline text-sm" href="/catalog/packs">← Back to packs</Link>
        <h1 className="text-3xl font-semibold">{pack.title}</h1>
        <p className="opacity-80">{pack.shortDescription}</p>

        <div className="flex flex-wrap gap-2 pt-1">
          {pack.tags.map((t) => (
            <span key={t} className="rounded-full border px-2 py-1 text-xs opacity-80">
              {t}
            </span>
          ))}
        </div>

        <div className="pt-3">
          <audio controls preload="none" className="w-full">
            <source src={pack.previewUrl} />
          </audio>
        </div>

        <div className="mt-6 rounded-2xl border p-5">
          <h2 className="text-lg font-semibold">What you receive</h2>
          <p className="mt-1 text-sm opacity-80">
            Every kit is delivered as a labeled folder you can drop into your editor immediately.
          </p>
          <pre className="mt-4 whitespace-pre-wrap rounded-xl border bg-black/5 p-4 text-sm">
            {pack.deliveryFormatText}
          </pre>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {Object.values(pack.tiers).map((tier) => (
            <div key={tier.key} className="rounded-2xl border p-5">
              <div className="text-sm opacity-70">{tier.name}</div>
              <div className="mt-1 text-2xl font-semibold">${tier.price}</div>
              <p className="mt-2 text-sm opacity-80">{tier.description}</p>
              <ul className="mt-3 list-disc pl-5 text-sm opacity-85">
                {tier.includes.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>

              {/* Replace this button with Stripe checkout later */}
              <button
                className="mt-4 w-full rounded-xl bg-black px-4 py-2 text-sm text-white hover:opacity-90"
                onClick={() => alert("Checkout wiring comes next (Stripe).")}
              >
                Buy {tier.name}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 text-sm opacity-80">
          License included. <Link className="underline" href="/licensing">Read licensing terms</Link>.
        </div>
      </div>
    </main>
  );
}
