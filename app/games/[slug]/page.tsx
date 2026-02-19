import Link from "next/link";
import { notFound } from "next/navigation";
import { PLANS } from "../plans";

export default function GamingPlanPage({
  params,
}: {
  params: { slug: string };
}) {
  const plan = PLANS.find((p) => p.slug === params.slug);
  if (!plan) return notFound();

  return (
    <main className="relative min-h-screen text-white">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${plan.bgUrl}")` }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-6 py-20 text-center">
          <p className="text-sm font-semibold tracking-widest text-white/80">
            {plan.brand}
          </p>

          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold">
            {plan.title}
            <span className="block mt-2 text-2xl font-semibold text-white/80 md:text-3xl">
              {plan.subtitle}
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-white/80 md:text-lg">
            {plan.description}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {plan.demoUrl ? (
              <a
                href="#demo"
                className="rounded-full bg-purple-600 px-6 py-3 font-semibold transition hover:bg-purple-500"
              >
                🎧 Listen to Demo
              </a>
            ) : null}

            {plan.gumroadUrl ? (
              <a
                href={plan.gumroadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-purple-400 bg-black/30 px-6 py-3 font-semibold transition hover:bg-black/50"
              >
                🛒 Get {plan.title}
              </a>
            ) : (
              <span className="rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white/70">
                Not for sale yet
              </span>
            )}

            <Link
              href="/games"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold transition hover:bg-white/20"
            >
              ← Back to Games
            </Link>
          </div>

          {/* Audio player */}
          {plan.demoUrl ? (
            <div
              id="demo"
              className="mx-auto mt-10 max-w-2xl rounded-2xl border border-white/15 bg-black/50 p-5 backdrop-blur"
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <div className="text-left">
                  <div className="text-sm font-semibold">{plan.title} Demo</div>
                  <div className="text-xs text-white/70">
                    Streaming preview (MP3)
                  </div>
                </div>

                <a
                  href={plan.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-purple-300 underline underline-offset-4 hover:text-purple-200"
                >
                  Open in new tab
                </a>
              </div>

              <audio controls preload="none" className="w-full">
                <source src={plan.demoUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ) : null}
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur">
              <h3 className="text-xl font-bold">Modular</h3>
              <p className="mt-2 text-white/70">
                Isolated stems designed for adaptive layering during gameplay.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur">
              <h3 className="text-xl font-bold">Loop-Ready</h3>
              <p className="mt-2 text-white/70">
                Clean 8 & 16 bar loops built for seamless engine playback.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur">
              <h3 className="text-xl font-bold">Engine-Friendly</h3>
              <p className="mt-2 text-white/70">
                Optimized exports for Unity, Unreal, and indie pipelines.
              </p>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        {(plan.roadmapTitle || plan.roadmapText) && (
          <section className="mx-auto max-w-5xl px-6 pb-20 text-center">
            <h2 className="text-3xl font-bold">
              {plan.roadmapTitle ?? "Coming Soon"}
            </h2>
            <p className="mt-3 text-white/70">
              {plan.roadmapText ?? "More packs are on the way."}
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
