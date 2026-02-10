import Link from "next/link";
import Image from "next/image";

const USE_CASES = [
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
    href: "/cinema",
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

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* HERO — Step 1: Locked Buyer Path */}
      <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
        {/* LEFT */}
        <div className="rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 p-10 text-white shadow-sm">
          <div className="text-sm font-semibold tracking-wide opacity-90">
            HONEY DRIP RECORDS
          </div>

          <h1 className="mt-4 text-4xl leading-tight font-extrabold sm:text-5xl">
            License Music Once.
            <br />
            <span className="text-amber-300">Monetize Forever.</span>
          </h1>

          <p className="mt-4 max-w-xl text-base/7 opacity-90">
            PulseNexis provides{" "}
            <span className="font-semibold text-white">perpetual</span>,{" "}
            <span className="font-semibold text-white">creator-safe</span> music
            licenses for YouTube, films, ads, weddings, and brand content — with{" "}
            <span className="font-semibold text-white">no renewals</span> and{" "}
            <span className="font-semibold text-white">no Content ID claims</span>.
          </p>

          <ul className="mt-6 space-y-2 text-sm opacity-95">
            <li>✅ Perpetual license (no expiration)</li>
            <li>✅ Monetization allowed (within tier scope)</li>
            <li>✅ No Content ID / copyright stress</li>
            <li>✅ Music built for real creators</li>
          </ul>

          {/* Primary buttons (removed: Browse Licensable Music + How Licensing Works) */}
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/shorts"
              className="rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20"
            >
              <span className="mr-2 inline-flex items-center rounded-full bg-amber-400 px-2 py-0.5 text-[11px] font-bold text-black">
                NEW
              </span>
              Shorts &amp; Jingles
            </Link>
          </div>

          {/* Extras row (removed: Support) */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/catalog"
              className="rounded-full bg-white/15 px-5 py-2 text-sm font-semibold text-white hover:bg-white/20"
            >
              Browse Catalog
            </Link>

            <Link
              href="/catalog/packs?genre=jazz"
              className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-400"
            >
              Jazz Packs
            </Link>

            <Link
              href="/trademark"
              className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
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
            Perpetual licenses • Creator-safe music
          </div>
        </div>
      </section>

      {/* STEP 2: USE-CASE FIRST SECTION */}
      <section className="mt-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Find music for your project</h2>
            <p className="mt-1 text-sm text-neutral-600">
              Choose a use-case to see the best-fit licenses and packs.
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
              <div className="text-sm font-semibold">Not sure which one you need?</div>
              <p className="mt-1 text-sm opacity-80">
                Start with Packs — it’s the fastest path to licensing.
              </p>
            </div>

            <Link
              href="/packs"
              className="inline-flex w-fit items-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Browse Packs
            </Link>
          </div>
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="mt-10 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold">1) Browse</div>
          <p className="mt-2 text-sm opacity-80">
            Browse licensable packs and tracks built for creators—fast, emotional,
            and ready for content.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold">2) Pick a License</div>
          <p className="mt-2 text-sm opacity-80">
            Choose the tier that matches your project scope (YouTube, ads, client
            work, brand campaigns, and more).
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
