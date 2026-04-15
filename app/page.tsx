import Link from "next/link";
import Image from "next/image";

const USE_CASES = [
  {
    title: "Story Reels & Shorts",
    desc: "Emotion-ready music for dramatic edits, POV videos, and text-driven storytelling.",
    href: "/shorts",
    badge: "Most popular",
  },
  {
    title: "Instagram / TikTok Reels",
    desc: "Fast emotional hooks and clean cuts that fit 9:16 content.",
    href: "/shorts",
    badge: "9:16 ready",
  },
  {
    title: "Weddings & Love Stories",
    desc: "Romantic, cinematic, heartfelt music for visual memories and love-driven content.",
    href: "/packs",
    badge: "Romance",
  },
  {
    title: "Film & Cinematic",
    desc: "Big-feeling tracks for scenes, trailers, montages, and emotional moments.",
    href: "/packs",
    badge: "Cinematic",
  },
  {
    title: "Ads & Brand Content",
    desc: "Commercial-ready music for campaigns, product videos, and branded content.",
    href: "/packs",
    badge: "Commercial",
  },
  {
    title: "Podcasts & Voiceover",
    desc: "Supportive beds that stay out of the way of dialogue while adding atmosphere.",
    href: "/packs",
    badge: "Clean",
  },
  {
    title: "Gaming Audio",
    desc: "Loop-ready systems, modular stems, and engine-friendly exports for interactive projects.",
    href: "/games",
    badge: "NEW",
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

const PLANS = [
  {
    name: "Basic",
    price: "$29",
    description:
      "Perfect for personal projects and simple creator content. Includes a high-quality MP3 download and permission to use the track in non-commercial or limited creator projects.",
    features: ["Personal use rights", "High-quality MP3 download"],
    href: "https://buy.stripe.com/7sY28r5wf8vtc8VeJT4ZG0E",
    cta: "Buy License",
    popular: false,
  },
  {
    name: "Creator",
    price: "$49",
    description:
      "Designed for active creators who publish content across platforms. Allows monetized use on YouTube, streaming releases, and commercial creator projects.",
    features: [
      "Monetized YouTube content",
      "Spotify and streaming releases",
      "Commercial creator use",
    ],
    href: "https://buy.stripe.com/dRm7sLbUD8vtc8V6dn4ZG0F",
    cta: "Get Creator License",
    popular: true,
  },
  {
    name: "Pro",
    price: "$79",
    description:
      "Built for professional creators, brands, and commercial production. Includes expanded usage rights and premium deliverables like stems for deeper creative control.",
    features: [
      "Unlimited commercial use",
      "Stems included",
      "Professional production use",
    ],
    href: "https://buy.stripe.com/00w5kD8Ir3b9dcZeJT4ZG0G",
    cta: "Buy Pro License",
    popular: false,
  },
];

function CheckIcon() {
  return (
    <svg
      className="h-3 w-3"
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* HERO */}
      <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 p-10 text-white shadow-sm">
          <div className="text-sm font-semibold tracking-wide opacity-90">
            PULSENEXIS
          </div>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
            Emotion-Ready Music
            <br />
            <span className="text-amber-300">for Story Creators</span>
          </h1>

          <p className="mt-4 max-w-xl text-base/7 opacity-90">
            Creator-safe music packs, emotional singles, and cinematic audio
            built for reels, shorts, romantic visuals, storytelling, and
            content that needs real feeling.
          </p>

          <ul className="mt-6 grid gap-2 text-sm opacity-95 sm:grid-cols-2">
            <li>✅ Creator-safe music</li>
            <li>✅ Clean deliverables</li>
            <li>✅ Simple licensing</li>
            <li>✅ Monetized use</li>
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/packs"
              className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-400"
            >
              Browse Packs
            </Link>

            <Link
              href="/shorts"
              className="rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20"
            >
              Explore Shorts
            </Link>

            <Link
              href="#plans"
              className="rounded-full bg-black/25 px-6 py-3 text-sm font-semibold text-white hover:bg-black/35"
            >
              View Plans
            </Link>
          </div>

          <div className="mt-8 border-t border-white/20 pt-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-white/70">
              More from PulseNexis
            </div>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link
                href="/games"
                className="text-white/85 underline-offset-4 hover:text-white hover:underline"
              >
                Gaming Audio
              </Link>

              <Link
                href="/licensing"
                className="text-white/85 underline-offset-4 hover:text-white hover:underline"
              >
                Licensing
              </Link>

              <Link
                href="/trademark"
                className="text-white/85 underline-offset-4 hover:text-white hover:underline"
              >
                Trademark Showcase
              </Link>
            </div>
          </div>

          <p className="mt-4 text-xs opacity-80">
            Music for creators • stories • visual moments • monetized content
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-500 px-5 py-3 text-center text-sm font-bold tracking-wide text-white shadow-sm">
            Your Photo My Music — AI Video Creator{" "}
            <Link href="/studio" className="underline underline-offset-2 hover:opacity-80">
              Visit the Studio
            </Link>
          </div>

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
            Creator-safe music packs • emotional singles • cinematic audio
          </div>
        </div>
        </div>
      </section>

      {/* FEATURED MONEY BLOCK */}
      <section className="mt-14">
        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                Featured Pack
              </div>

              <h2 className="mt-4 text-3xl font-bold text-neutral-900 sm:text-4xl">
                Emotional Story Pack Vol. 1
              </h2>

              <p className="mt-3 max-w-2xl text-neutral-600">
                Built for creators making emotional reels, relationship POV edits,
                and short-form storytelling content that needs real feeling.
              </p>

              <p className="mt-2 text-xs text-neutral-500">
                Built for creators posting consistent content across reels, shorts,
                and story-driven formats.
              </p>

              <div className="mt-5 rounded-2xl border bg-neutral-50 p-4">
                <div className="mb-2 text-xs font-semibold text-neutral-500">
                  Listen before you buy
                </div>

                <audio controls className="w-full">
                  <source
                    src="https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Before-You-Hear-It-From-Him/Before%20You%20Hear%20It%20From%20Him_Short.mp3"
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>

                <p className="mt-2 text-xs text-neutral-500">
                  Includes 2 emotion-ready signature tracks plus short-form cuts.
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
                  2 premium emotional tracks
                </div>
                <div className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
                  15s and 30s creator-ready cuts
                </div>
                <div className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
                  Loopable versions for editing
                </div>
                <div className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
                  Instant download + fast licensing
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/packs"
                  className="rounded-full bg-indigo-700 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
                >
                  Shop This Pack
                </Link>

                <Link
                  href="#plans"
                  className="rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                >
                  See License Options
                </Link>
              </div>

              <p className="mt-4 text-xs text-neutral-500">
                Used for reels, storytelling content, and monetized creator projects.
              </p>
            </div>

            <div className="rounded-3xl bg-neutral-900 p-6 text-white">
              <div className="text-sm font-semibold text-neutral-300">
                Best for
              </div>

              <ul className="mt-4 space-y-3 text-sm text-neutral-200">
                <li>• Relationship POV edits</li>
                <li>• Emotional storytelling reels</li>
                <li>• Romantic and breakup content</li>
                <li>• Reflective shorts and captions</li>
              </ul>

              <div className="mt-6 rounded-2xl bg-white/5 p-4">
                <div className="text-xs uppercase tracking-wide text-neutral-400">
                  Starter pricing
                </div>

                <div className="mt-2 text-3xl font-bold">$29</div>

                <p className="mt-2 text-sm text-neutral-300">
                  Start with the Basic license now. Upgrade anytime as your content grows.
                </p>
              </div>

              <div className="mt-6">
                <Link
                  href="https://buy.stripe.com/7sY28r5wf8vtc8VeJT4ZG0E"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-100"
                >
                  Buy Basic License
                </Link>
              </div>

              <p className="mt-3 text-center text-xs text-neutral-400">
                Instant access after purchase
              </p>
            </div>
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
              Focused track pages with fast preview and checkout.
            </p>
          </div>

          <Link
            href="/shorts"
            className="inline-flex w-fit items-center rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
          >
            View full catalog
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HOT_RIGHT_NOW.map((track) => (
            <div key={track.title} className="rounded-2xl border bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{track.title}</div>
                  <p className="mt-2 text-sm opacity-80">{track.desc}</p>
                </div>

                <span className="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                  {track.badge}
                </span>
              </div>

              <p className="mt-3 text-xs text-neutral-600">
                <span className="font-semibold">Best for:</span> {track.bestFor}
              </p>

              <div className="mt-4 flex gap-3">
                <Link
                  href={track.href}
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                >
                  View Track
                </Link>

                <Link
                  href={`${track.href}#buy`}
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
              Choose a use case to see the best-fit PulseNexis options.
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
          {USE_CASES.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-2xl border bg-white p-5 transition hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{item.title}</div>
                  <p className="mt-2 text-sm opacity-80">{item.desc}</p>
                </div>

                <span className="shrink-0 rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                  {item.badge}
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
                Start with Packs or Hot Right Now for the fastest path to licensing.
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

      {/* PLANS */}
      <section className="mt-14" id="plans">
        <div className="flex flex-col gap-2">
          <div>
            <div className="text-sm font-semibold text-neutral-800">
              Pricing &amp; Plans
            </div>
            <h2 className="mt-2 text-2xl font-bold">
              Choose the license that fits your project
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Buy one license fast without changing the rest of your PulseNexis workflow.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border bg-white p-6 ${
                plan.popular
                  ? "border-violet-300 shadow-lg ring-1 ring-violet-200"
                  : "border-neutral-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-neutral-900 px-4 py-1 text-xs font-semibold text-white">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-semibold text-neutral-900">
                  {plan.name}
                </h3>
                <p className="mt-3 text-5xl font-bold text-neutral-900">
                  {plan.price}
                </p>
                <p className="mt-3 text-sm text-neutral-600">
                  {plan.description}
                </p>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <CheckIcon />
                    </div>
                    <span className="text-sm text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                  plan.popular
                    ? "bg-indigo-600 text-white hover:bg-indigo-500"
                    : "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-10 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold">1) Browse</div>
          <p className="mt-2 text-sm opacity-80">
            Browse licensable singles, packs, and creator-ready tracks built for
            emotional content and real-world projects.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold">2) Choose Your Use</div>
          <p className="mt-2 text-sm opacity-80">
            Pick the best fit for shorts, brands, weddings, podcasts, film, or
            games, then choose the license that matches your use.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold">3) Publish &amp; Monetize</div>
          <p className="mt-2 text-sm opacity-80">
            Checkout once and publish confidently with creator-safe music and
            licensing designed for monetized content.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mt-12">
        <div className="rounded-3xl bg-neutral-900 p-8 text-white">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold text-neutral-300">
              Build with PulseNexis
            </div>
            <h2 className="mt-2 text-3xl font-bold">
              Start with a track, a pack, or a full licensing path
            </h2>
            <p className="mt-3 text-sm text-neutral-300">
              Whether you need music for a short video, a brand campaign, a wedding
              piece, or a game system, PulseNexis gives you a fast path from sound
              to published project.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/packs"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-100"
              >
                Browse Packs
              </Link>

              <Link
                href="/licensing"
                className="rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20"
              >
                View Licensing
              </Link>

              <Link
                href="/games"
                className="rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20"
              >
                Explore Gaming Audio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}