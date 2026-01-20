import Link from "next/link";

export const metadata = {
  title: "Packs • PulseNexis",
  description: "Browse curated music packs for creators, brands, and projects.",
};

// ✅ Universal pack checkout link ($199)
const PACKS_STRIPE_URL = "https://buy.stripe.com/fZu3cv7En2751uh8lv4ZG0l";

type Pack = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  bullets: string[];
  badge?: string;
  href: string;
};

const packs: Pack[] = [
  {
    id: "rnb-blueprint",
    name: "Pulsenexis Blueprint Pack",
    tagline: "Grown & soulful. Ready for love scenes and late-night vibes.",
    description:
      "A polished R&B starter pack with warm chords, smooth bass, and emotional bounce for content that needs heart.",
    bullets: ["Romantic + smooth tempos", "Clean loop points", "Best for reels + shorts"],
    badge: "Fan Favorite",
    href: "/catalog/packs/rnb-blueprint",
  },
  {
    id: "trap-soul",
    name: "Trap Soul Pack",
    tagline: "Modern R&B with 808 weight.",
    description:
      "Dark-to-warm Trap Soul palette: 808s, airy keys, and tension chords that feel current and cinematic.",
    bullets: ["808 + ambient texture", "Hook-friendly grooves", "Best for story content"],
    href: "/catalog/packs/trap-soul",
  },
  {
    id: "smooth-jazz",
    name: "Smooth Jazz Pack",
    tagline: "Luxury lounge energy.",
    description:
      "Polished jazz chords and clean instrumentation for upscale brand content, lounge scenes, and smooth transitions.",
    bullets: ["Warm Rhodes + sax vibes", "No harsh drums", "Best for luxury + lifestyle"],
    href: "/catalog/packs/smooth-jazz",
  },
  {
    id: "dance-pop",
    name: "Dance Pop Pack",
    tagline: "Bright. Energetic. Movement-ready.",
    description:
      "Upbeat tracks designed for motion content: workouts, ads, product drops, and energetic intros.",
    bullets: ["High energy", "Clear drops", "Best for product + promo"],
    href: "/catalog/packs/dance-pop",
  },
  {
    id: "hip-hop-drums",
    name: "Hip-Hop-Drums Pack",
    tagline: "Knock, bounce, and pocket.",
    description:
      "Hard-hitting drum loops and grooves built to sit under voiceovers, promos, and fast edits.",
    bullets: ["Punchy drums", "Clean transients", "Best for voiceover content"],
    href: "/catalog/packs/hip-hop-drums",
  },
  {
    id: "cinematic",
    name: "Cinematic Pack",
    tagline: "Big emotion and trailer-style moments.",
    description:
      "Cinematic textures, swells, and tension builds for storytelling, documentary vibes, and dramatic reveals.",
    bullets: ["Builds + swells", "Emotional tension", "Best for trailers + reels"],
    badge: "New",
    href: "/catalog/packs/cinematic",
  },
];

export default function PacksPage() {
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
          <div key={p.id} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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
                href={p.href}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900"
              >
                View Pack
              </Link>

              {/* ✅ Start Order goes straight to Stripe checkout */}
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
