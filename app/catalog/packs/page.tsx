import Link from "next/link";
import { getAllPacks } from "@/lib/packsCatalog";

export const metadata = {
  title: "Packs • PulseNexis",
  description: "Browse curated music packs for creators, brands, and projects.",
};

// ✅ Universal pack checkout link ($199)
const PACKS_STRIPE_URL = "https://buy.stripe.com/fZu3cv7En2751uh8lv4ZG0l";

export default function PacksPage() {
  const packs = getAllPacks();

  return (
    <div className="py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tight text-slate-900">Packs</h1>
        <p className="mt-2 text-slate-600">
          Curated collections built for creators. Pick a vibe, grab a pack, and ship content faster.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packs.map((p) => (
          <div key={p.slug} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {p.badge ? (
              <div className="absolute -top-3 left-6">
                <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                  {p.badge}
                </span>
              </div>
            ) : null}

            <div className="text-sm font-semibold text-slate-900">{p.name}</div>
            <div className="mt-2 text-lg font-bold text-slate-900">{p.tagline}</div>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">{p.description}</p>

            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {p.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-[2px] text-slate-900">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex gap-3">
              <Link
                href={`/catalog/packs/${p.slug}`}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900"
              >
                View Pack
              </Link>

              <a
                href={PACKS_STRIPE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Start Order — $199
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
        Want something custom for your brand?{" "}
        <Link href="/custom-music-kits#intake" className="font-semibold text-slate-900 hover:underline">
          Use the Custom Music Kits intake form
        </Link>
        .
      </div>
    </div>
  );
}
