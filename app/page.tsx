import Link from "next/link";
import Image from "next/image";
import { USE_CASES, FEATURED_TRACKS as HOT_RIGHT_NOW, TRACK_LICENSES as PLANS } from "@/lib/site-content";

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
        <div className="rounded-3xl bg-neutral-900 p-10 text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold tracking-wide text-white/80">
              100% royalty-free · no copyright strikes
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
            Music that <span className="text-amber-400">hits</span> for creators
            who can&rsquo;t afford to get flagged
          </h1>

          <p className="mt-4 max-w-xl text-base/7 text-white/70">
            R&amp;B and hip-hop cleared for YouTube, TikTok, and Reels.
            Download stems, loops, full cuts, and ready-to-post tracks —
            commercial license included every time.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2 text-sm">
            {[
              "Monetized YouTube ✓",
              "TikTok & Reels ✓",
              "Stems included ✓",
              "Instant download ✓",
            ].map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-white/80"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/packs"
              className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-amber-300"
            >
              Browse Packs
            </Link>
            <Link
              href="/shorts"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15"
            >
              Explore Tracks
            </Link>
            <Link
              href="#plans"
              className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white/70 hover:text-white"
            >
              View Pricing
            </Link>
            <Link
              href="/grown-and-sexy"
              className="rounded-full border border-amber-400/40 bg-amber-400/10 px-6 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Grown &amp; Sexy
            </Link>
          </div>
          <div className="mt-8 border-t border-white/10 pt-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-white/40">
              More from PulseNexis
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link href="/games" className="text-white/60 hover:text-white">
                Gaming Audio
              </Link>
              <Link href="/licensing" className="text-white/60 hover:text-white">
                Licensing
              </Link>
              <Link href="/trademark" className="text-white/60 hover:text-white">
                Trademark Showcase
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-amber-700">
              New — AI Video Creator
            </div>
            <p className="mt-1 text-sm font-semibold text-neutral-900">
              Your photos + our music = a cinematic video, ready to post.
            </p>
            <Link
              href="/studio"
              className="mt-3 inline-flex items-center text-sm font-semibold text-amber-700 hover:text-amber-600"
            >
              Visit the Studio →
            </Link>
          </div>

          <div className="rounded-2xl border border-pink-200 bg-pink-50 px-5 py-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-pink-700">
              Custom Songs
            </div>
            <p className="mt-1 text-sm font-semibold text-neutral-900">
              Turn your love story into a real original song — anniversaries, proposals, and more.
            </p>
            <Link
              href="/custom-songs"
              className="mt-3 inline-flex items-center text-sm font-semibold text-pink-700 hover:text-pink-600"
            >
              Start my song →
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
              Creator-safe music · emotional singles · cinematic audio
            </div>
          </div>
        </div>
      </section>

      {/* PULSENEXIS STORY FEATURE */}
      <section className="mt-10">
        <div className="grid gap-8 rounded-3xl bg-neutral-950 p-6 text-white shadow-xl lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:p-10">
          <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-amber-300/30 shadow-2xl">
            <Image
              src="/The_Dollar_A_Day_FRONT_COVER_6x9.jpg"
              alt="The PulseNexis Story book cover"
              width={600}
              height={900}
              className="h-auto w-full"
            />
          </div>

          <div>
            <div className="inline-flex rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-amber-300">
              The PulseNexis Story
            </div>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-5xl">
              More than a story. A blueprint for building what you believe in.
            </h2>

            <p className="mt-5 max-w-2xl text-base/7 text-white/70">
              This book shows how a dollar-a-day music channel became PulseNexis —
              one song, one upload, one lesson, and one step at a time.
            </p>

            <p className="mt-4 max-w-2xl text-base/7 text-white/70">
              It was written for artists, creators, entrepreneurs, veterans, and
              dreamers who wonder if building something meaningful is really possible.
              The message is simple: it is possible, it is attainable, and you do not
              have to start with everything figured out.
            </p>

            <p className="mt-4 max-w-2xl text-base/7 text-white/70">
              If PulseNexis can grow from an idea into a real music business, your
              dream can grow too — one disciplined day at a time.
            </p>

            <p className="mt-4 text-sm font-medium text-amber-300">
              Kindle and Paperback editions are currently being prepared for release.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                className="cursor-default rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-neutral-950"
              >
                Amazon Release Coming Soon
              </button>

              <Link
                href="/story"
                className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15"
              >
                Read the Story
              </Link>

              <Link
                href="/packs"
                className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15"
              >
                Browse Music
              </Link>
            </div>

            <p className="mt-5 text-sm text-white/50">
              Built by Chris Baker · Founder of PulseNexis
            </p>
          </div>
        </div>
      </section>

      {/* FREE SAMPLE HOOK — updated to point to /free-sample */}
      <section className="mt-8">
        <div className="rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Not sure yet?
              </div>
              <h2 className="mt-1 text-lg font-bold text-neutral-900">
                Taste it before you buy — get a free sample on us
              </h2>
              <p className="mt-1 text-sm text-neutral-600">
                No card required. Pulsenexis picks a sample for you.
              </p>
            </div>
            <Link
              href="/free-sample"
              className="inline-flex shrink-0 items-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-400"
            >
              Get a free sample
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PACK */}
      <section className="mt-10">
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

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
                  2 full R&amp;B / hip-hop tracks
                </div>
                <div className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
                  15s &amp; 30s Reels-ready cuts
                </div>
                <div className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
                  Loopable versions for editing
                </div>
                <div className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
                  Instant download + commercial license
                </div>
              </div>

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
                  2 emotion-ready signature tracks + short-form cuts included.
                </p>
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
                  Start with the Basic license. Upgrade anytime as your content grows.
                </p>
              </div>

              <Link
                href="https://buy.stripe.com/7sY28r5wf8vtc8VeJT4ZG0E"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-100"
              >
                Buy Basic License
              </Link>

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
              Tracks creators are posting with this week
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Preview, license, and download in minutes.
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
                  Preview
                </Link>
                <Link
                  href={`${track.href}#buy`}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                  License it
                </Link>
              </div>

              <p className="mt-3 text-xs opacity-70">
                Secure checkout via Stripe · Instant access after purchase
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

      {/* PRICING */}
      <section className="mt-14" id="plans">
        <div>
          <div className="text-sm font-semibold text-neutral-800">
            Pricing &amp; Plans
          </div>
          <h2 className="mt-2 text-2xl font-bold">
            Pay once. Post forever. No subscriptions required.
          </h2>
          <p className="mt-1 text-sm text-neutral-600">
            Every license includes commercial use. Upgrade anytime — your Stripe checkout stays the same.
          </p>
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
                <p className="mt-1 text-xs text-neutral-500">one-time · lifetime license</p>
                <p className="mt-3 text-sm text-neutral-600">{plan.description}</p>
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

        <div className="mt-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-neutral-900">
                Need broadcast, sync, or white-label rights?
              </div>
              <p className="mt-1 text-sm text-neutral-600">
                Brands, ad agencies, and sync placements — reach out for a Pro License quote.
              </p>
            </div>
            <Link
              href="/licensing"
              className="inline-flex w-fit items-center rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white hover:bg-neutral-700"
            >
              View Licensing
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-10 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold">1) Find your vibe</div>
          <p className="mt-2 text-sm opacity-80">
            Browse by use case — reels, storytelling, romance, ads, gaming. Pick what fits your project.
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold">2) Choose your license</div>
          <p className="mt-2 text-sm opacity-80">
            Basic for personal, Creator for monetized channels, Pro for brands and commercial production.
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold">3) Post without fear</div>
          <p className="mt-2 text-sm opacity-80">
            Download instantly after checkout. Your license covers YouTube, TikTok, Reels, and beyond.
          </p>
        </div>
      </section>

      {/* FINAL CTA — free sample button added */}
      <section className="mt-12">
        <div className="rounded-3xl bg-neutral-900 p-8 text-white">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold text-neutral-300">
              Build with PulseNexis
            </div>
            <h2 className="mt-2 text-3xl font-bold">
              One track. One pack. Or a full licensing path — start anywhere.
            </h2>
            <p className="mt-3 text-sm text-neutral-300">
              R&amp;B and hip-hop built for creators who post every day and need music
              that won&rsquo;t fight them. Download, license, post, repeat.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/custom-songs"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-100"
              >
                Custom Songs
              </Link>
              <Link
                href="/free-sample"
                className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-400"
              >
                Get a free sample
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