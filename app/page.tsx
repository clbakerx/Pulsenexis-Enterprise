import Link from "next/link";
import Image from "next/image";

const USE_CASES = [
  {
    title: "Gaming Audio (NEW)",
    desc: "Modular stems, loop-ready systems, engine-friendly exports.",
    href: "/gaming-audio",
    badge: "NEW",
  },
  {
    title: "YouTube & Shorts",
    desc: "Fast hooks, emotional beds, clean mixes.",
    href: "/shorts",
    badge: "Most popular",
  },
  {
    title: "Instagram / TikTok Reels",
    desc: "Punchy vibes that fit 9:16 edits.",
    href: "/shorts",
    badge: "9:16 ready",
  },
  {
    title: "Weddings & Love Stories",
    desc: "Romantic, cinematic, heartfelt moments.",
    href: "/packs",
    badge: "Romance",
  },
  {
    title: "Film & Cinematic",
    desc: "Big emotion for trailers & scenes.",
    href: "/packs",
    badge: "Cinematic",
  },
  {
    title: "Ads & Brand Content",
    desc: "Commercial-ready tracks for campaigns.",
    href: "/packs",
    badge: "Commercial",
  },
  {
    title: "Podcasts & Voiceover",
    desc: "Supportive beds that don’t fight dialogue.",
    href: "/packs",
    badge: "Clean",
  },
];

const HOT_RIGHT_NOW = [
  {
    title: "Bring the Snow (Slide We Ride)",
    desc: "Smooth, late-night R&B built for motion, confidence, and intimate moments.",
    href: "/bring-the-snow",
    badge: "Hot right now",
    bestFor: "Drive scenes • Lifestyle • Romantic visuals",
  },
  {
    title: "Right in the Middle",
    desc: "A steady, grown groove for conversation scenes, reflection, and emotional cutaways.",
    href: "/right-in-the-middle",
    badge: "Hot right now",
    bestFor: "Talk scenes • Documentary • Slow motion b-roll",
  },
  {
    title: "Chances",
    desc: "Warm, hopeful late-night energy—perfect for love stories and comeback moments.",
    href: "/chances",
    badge: "Hot right now",
    bestFor: "Romantic visuals • Vlogs • Storytelling",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* HERO */}
      <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
        {/* LEFT */}
        <div className="rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 p-10 text-white shadow-sm">
          <div className="text-sm font-semibold tracking-wide opacity-90">
            HONEY DRIP RECORDS
          </div>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
            License Music Once.
            <br />
            <span className="text-amber-300">Monetize Forever.</span>
          </h1>

          <p className="mt-4 max-w-xl text-base/7 opacity-90">
            PulseNexis delivers{" "}
            <span className="font-semibold text-white">perpetual</span>,{" "}
            <span className="font-semibold text-white">creator-safe</span> music
            licensing for YouTube, film, weddings, ads, brands — and now{" "}
            <span className="font-semibold text-white">Gaming Audio Systems</span>{" "}
            with loop-ready structure and modular stems.
          </p>

          <ul className="mt-6 space-y-2 text-sm opacity-95">
            <li>✅ Perpetual license (no expiration)</li>
            <li>✅ Monetization allowed (within tier scope)</li>
            <li>✅ No Content ID / copyright stress</li>
            <li>✅ Clean deliverables for real creators</li>
          </ul>

          {/* Primary buttons */}
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/gaming-audio"
              className="rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20"
            >
              <span className="mr-2 inline-flex items-center rounded-full bg-amber-400 px-2 py-0.5 text-[11px] font-bold text-black">
                NEW
              </span>
              🎮 Explore Gaming Audio
            </Link>

            <Link
              href="/shorts"
              className="rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20"
            >
              Shorts &amp; Jingles
            </Link>

            <Link
              href="/packs"
              className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-400"
            >
              Browse Packs
            </Link>
          </div>

          {/* Extras row (✅ Catalog removed, ✅ nesting fixed) */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/licensing"
              className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Licensing
            </Link>

            <Link
              href="/trademark"
              className="rounded-full bg-black/30 px-5 py-2 text-sm font-semibold text-white hover:bg-black/40"
            >
              Trademark Showcase
            </Link>
          </div>

          <p className="mt-4 text-xs opacity-90">
            License once • Use forever • Keep monetizing
          </p>
        </div>

        {/* RIGHT (IMAGE HERO) */}
        <div className="relative w-full overflow-hidden rounded-3xl border bg-white">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src="/hero-studio.jpg"
              alt="Music production studio setup"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="absolute bottom-4 left-4 rounded-xl bg-black/60 px-3 py-2 text-sm text-white">
            Perpetual licenses • Creator-safe music • Gaming audio systems
          </div>
        </div>
      </section>

      {/* HOT RIGHT NOW */}
      <section className="mt-12" id="hot">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-neutral-800">
              🔥 Hot Right Now on PulseNexis
            </div>
            <h2 className="mt-2 text-2xl font-bold">
              Start with the tracks creators are feeling this week
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Focused track pages (preview → buy fast).
            </p>
          </div>

          {/* NOTE: This is NOT hero. If you want, I can remove this too. */}
          <Link
            href="/shorts"
            className="inline-flex w-fit items-center rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
          >
            View full catalog
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HOT_RIGHT_NOW.map((t) => (
            <div key={t.title} className="rounded-2xl border bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{t.title}</div>
                  <p className="mt-2 text-sm opacity-80">{t.desc}</p>
                </div>

                <span className="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                  {t.badge}
                </span>
              </div>

              <p className="mt-3 text-xs text-neutral-600">
                <span className="font-semibold">Best for:</span> {t.bestFor}
              </p>

              <div className="mt-4 flex gap-3">
                <Link
                  href={t.href}
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                >
                  View Track →
                </Link>

                <Link
                  href={`${t.href}#buy`}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                  Buy Now
                </Link>
              </div>

              <p className="mt-3 text-xs opacity-70">
                Secure checkout via Stripe • Instant access after purchase
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* USE CASES */}
      <section className="mt-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Find music for your project</h2>
            <p className="mt-1 text-sm text-neutral-600">
              Choose a use-case to see the best-fit options.
            </p>
          </div>

          <Link
            href="/packs"
            className="inline-flex w-fit items-center rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
          >
            View all packs
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group rounded-2xl border bg-white p-5 transition hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{c.title}</div>
                  <p className="mt-2 text-sm opacity-80">{c.desc}</p>
                </div>

                <span className="shrink-0 rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                  {c.badge}
                </span>
              </div>

              <div className="mt-4 text-sm font-semibold text-indigo-600 group-hover:text-indigo-700">
                Browse →
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border bg-white p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold">Not sure where to start?</div>
              <p className="mt-1 text-sm opacity-80">
                Start with Packs — it’s the fastest path to licensing.
              </p>
            </div>

            <Link
              href="/singles"
              className="inline-flex w-fit items-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Browse Singles
            </Link>
          </div>
        </div>
      </section>

      {/* INFO */}
      <section className="mt-10 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold">1) Browse</div>
          <p className="mt-2 text-sm opacity-80">
            Browse licensable singles and tracks built for creators—fast, emotional,
            and ready for content.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold">2) Choose Your Use</div>
          <p className="mt-2 text-sm opacity-80">
            Pick what you’re building (Shorts, brands, weddings, podcasts, games),
            and grab the best-fit product.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold">3) Publish &amp; Monetize</div>
          <p className="mt-2 text-sm opacity-80">
            Checkout once and publish confidently—your license doesn’t expire,
            and you can keep monetizing.
          </p>
        </div>
      </section>
    </main>
  );
}
