import Link from "next/link";

const FEATURED_PACK = {
  title: "Emotional Story Pack Vol. 1",
  subtitle:
    "Built for emotional reels, relationship POV edits, and story-driven short-form content.",
  previewUrl:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Before-You-Hear-It-From-Him/Before%20You%20Hear%20It%20From%20Him_Short.mp3",
  features: [
    "2 premium emotional tracks",
    "15s and 30s creator-ready cuts",
    "Loopable versions for editing",
    "Instant download + fast licensing",
  ],
  bestFor: [
    "Relationship POV edits",
    "Emotional storytelling reels",
    "Romantic and breakup content",
    "Reflective shorts and captions",
  ],
};

const LICENSES = [
  {
    name: "Basic",
    price: "$29",
    description:
      "Best for personal projects and simple creator content using the featured pack.",
    href: "https://buy.stripe.com/7sY28r5wf8vtc8VeJT4ZG0E",
    badge: "",
    features: ["Personal use rights", "High-quality MP3 access"],
  },
  {
    name: "Creator",
    price: "$49",
    description:
      "Best for active creators publishing monetized content across platforms.",
    href: "https://buy.stripe.com/dRm7sLbUD8vtc8V6dn4ZG0F",
    badge: "Most popular",
    features: [
      "Monetized YouTube content",
      "Commercial creator use",
      "Streaming-friendly usage",
    ],
  },
  {
    name: "Pro",
    price: "$79",
    description:
      "Best for professional creators, client work, and expanded commercial use.",
    href: "https://buy.stripe.com/00w5kD8Ir3b9dcZeJT4ZG0G",
    badge: "",
    features: [
      "Unlimited commercial use",
      "Premium production usage",
      "Expanded usage flexibility",
    ],
  },
];

const MORE_PACKS = [
  {
    title: "Romantic Visuals Pack",
    description:
      "Warm, cinematic cuts for love stories, wedding visuals, and intimate reels.",
    tag: "Romance",
  },
  {
    title: "Reflective Nights Pack",
    description:
      "Late-night emotional textures for monologues, captions, and introspective edits.",
    tag: "Reflective",
  },
  {
    title: "Story Momentum Pack",
    description:
      "Music for transitions, reveals, emotional payoff, and cinematic pacing.",
    tag: "Storytelling",
  },
];

function CheckIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
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

export default function PacksPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* HERO */}
      <section className="rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-700 p-8 text-white shadow-sm sm:p-10">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold tracking-wide opacity-90">
            PULSENEXIS PACKS
          </div>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
            Music Packs for Creators,
            <br />
            <span className="text-amber-300">Stories, and Visual Moments</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base/7 opacity-90">
            Browse creator-safe music packs built for reels, shorts, emotional
            storytelling, romantic visuals, and monetized content.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#featured-pack"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-100"
            >
              Start with Featured Pack
            </a>

            <a
              href="#licenses"
              className="rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20"
            >
              View License Options
            </a>
          </div>
        </div>
      </section>

      {/* FEATURED PACK */}
      <section id="featured-pack" className="mt-14">
        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                Featured Pack
              </div>

              <h2 className="mt-4 text-3xl font-bold text-neutral-900 sm:text-4xl">
                {FEATURED_PACK.title}
              </h2>

              <p className="mt-3 max-w-2xl text-neutral-600">
                {FEATURED_PACK.subtitle}
              </p>

              <p className="mt-2 text-xs text-neutral-500">
                Best for creators posting consistently across reels, shorts, and
                story-driven formats.
              </p>

              <div className="mt-5 rounded-2xl border bg-neutral-50 p-4">
                <div className="mb-2 text-xs font-semibold text-neutral-500">
                  Listen before you buy
                </div>

                <audio controls className="w-full">
                  <source src={FEATURED_PACK.previewUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>

                <p className="mt-2 text-xs text-neutral-500">
                  Includes 2 emotion-ready signature tracks plus short-form cuts.
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {FEATURED_PACK.features.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700"
                  >
                    {feature}
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#licenses"
                  className="rounded-full bg-indigo-700 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
                >
                  Choose a License
                </a>

                <Link
                  href="/"
                  className="rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                >
                  Back to Homepage
                </Link>
              </div>

              <p className="mt-4 text-xs text-neutral-500">
                Designed for reels, storytelling content, and monetized creator
                projects.
              </p>
            </div>

            <div className="rounded-3xl bg-neutral-900 p-6 text-white">
              <div className="text-sm font-semibold text-neutral-300">
                Best for
              </div>

              <ul className="mt-4 space-y-3 text-sm text-neutral-200">
                {FEATURED_PACK.bestFor.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl bg-white/5 p-4">
                <div className="text-xs uppercase tracking-wide text-neutral-400">
                  Starter pricing
                </div>

                <div className="mt-2 text-3xl font-bold">$29</div>

                <p className="mt-2 text-sm text-neutral-300">
                  Start with the Basic license now. Upgrade anytime as your
                  content grows.
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

      {/* LICENSE OPTIONS */}
      <section id="licenses" className="mt-14">
        <div className="flex flex-col gap-2">
          <div>
            <div className="text-sm font-semibold text-neutral-800">
              License Options
            </div>
            <h2 className="mt-2 text-2xl font-bold text-neutral-900">
              Choose the license that fits your content
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Start simple now and scale your usage as your content grows.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {LICENSES.map((license) => (
            <div
              key={license.name}
              className={`relative rounded-2xl border bg-white p-6 ${
                license.badge
                  ? "border-violet-300 shadow-lg ring-1 ring-violet-200"
                  : "border-neutral-200"
              }`}
            >
              {license.badge ? (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-neutral-900 px-4 py-1 text-xs font-semibold text-white">
                    {license.badge.toUpperCase()}
                  </span>
                </div>
              ) : null}

              <div className="text-center">
                <h3 className="text-2xl font-semibold text-neutral-900">
                  {license.name}
                </h3>
                <p className="mt-3 text-5xl font-bold text-neutral-900">
                  {license.price}
                </p>
                <p className="mt-3 text-sm text-neutral-600">
                  {license.description}
                </p>
              </div>

              <ul className="mt-6 space-y-3">
                {license.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <CheckIcon />
                    </div>
                    <span className="text-sm text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={license.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                  license.badge
                    ? "bg-indigo-600 text-white hover:bg-indigo-500"
                    : "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50"
                }`}
              >
                {license.name === "Basic"
                  ? "Buy Basic License"
                  : license.name === "Creator"
                    ? "Get Creator License"
                    : "Buy Pro License"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-14 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold text-neutral-900">1) Preview</div>
          <p className="mt-2 text-sm text-neutral-600">
            Listen to the featured pack so you know exactly how it feels before
            you buy.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold text-neutral-900">
            2) Choose a license
          </div>
          <p className="mt-2 text-sm text-neutral-600">
            Pick the license that matches your current use and upgrade later if
            needed.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold text-neutral-900">3) Publish</div>
          <p className="mt-2 text-sm text-neutral-600">
            Download your music and start using it in reels, shorts, and
            monetized content.
          </p>
        </div>
      </section>

      {/* MORE PACKS */}
      <section className="mt-14">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-neutral-800">
              More pack directions
            </div>
            <h2 className="mt-2 text-2xl font-bold text-neutral-900">
              Build out your catalog over time
            </h2>
          </div>

          <Link
            href="/shorts"
            className="inline-flex w-fit items-center rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
          >
            Explore Shorts
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {MORE_PACKS.map((pack) => (
            <div key={pack.title} className="rounded-2xl border bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-neutral-900">
                    {pack.title}
                  </div>
                  <p className="mt-2 text-sm text-neutral-600">
                    {pack.description}
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                  {pack.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mt-14">
        <div className="rounded-3xl bg-neutral-900 p-8 text-white">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold text-neutral-300">
              Ready to monetize?
            </div>

            <h2 className="mt-2 text-3xl font-bold">
              Start with one pack, one audience, and one clear buy path
            </h2>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="https://buy.stripe.com/7sY28r5wf8vtc8VeJT4ZG0E"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-100"
              >
                Buy Basic License
              </Link>

              <Link
                href="/"
                className="rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}