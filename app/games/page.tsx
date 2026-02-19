import Link from "next/link";
import { PLANS, type GamePlan } from "./plans";

function PlanCard({ plan }: { plan: GamePlan }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-[1.02]"
        style={{ backgroundImage: `url("${plan.bgUrl}")` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 transition group-hover:bg-black/65" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-widest text-white/75">
              {plan.brand}
            </p>
            <h3 className="mt-3 text-2xl font-extrabold">
              {plan.title}
              <span className="block mt-1 text-base font-semibold text-white/80">
                {plan.subtitle}
              </span>
            </h3>
          </div>

          {plan.badge ? (
            <span className="rounded-full border border-purple-300/40 bg-purple-600/30 px-3 py-1 text-xs font-semibold text-purple-100">
              {plan.badge}
            </span>
          ) : null}
        </div>

        <p className="mt-4 text-sm text-white/75">{plan.description}</p>

        {/* Optional mini audio preview */}
        {plan.demoUrl ? (
          <div className="mt-5 rounded-2xl border border-white/10 bg-black/45 p-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="text-left">
                <div className="text-xs font-semibold">Preview Demo</div>
                <div className="text-[11px] text-white/60">MP3 stream</div>
              </div>
              <a
                href={plan.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-purple-300 underline underline-offset-4 hover:text-purple-200"
              >
                Open
              </a>
            </div>

            <audio controls preload="none" className="w-full">
              <source src={plan.demoUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ) : null}

        {/* Actions (NO View Pack button) */}
        <div className="mt-6 flex flex-wrap gap-3">
          {plan.gumroadUrl ? (
            <a
              href={plan.gumroadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-purple-400 bg-black/30 px-5 py-2.5 text-sm font-semibold transition hover:bg-black/50"
            >
              🛒 Get It
            </a>
          ) : (
            <span className="rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white/70">
              Not for sale yet
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GamesPage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Subtle page backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.10),transparent_45%)]" />
      <div className="relative z-10">
        {/* Header */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm font-semibold tracking-widest text-white/75">
            PULSENEXIS GAMING AUDIO
          </p>
          <h1 className="mt-3 text-4xl font-extrabold md:text-6xl">
            Game Audio Packs
          </h1>
          <p className="mt-4 max-w-2xl text-white/75 md:text-lg">
            Loopable, layered, engine-friendly music built for Unity, Unreal,
            and indie pipelines. Browse packs below.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full border border-white/15 bg-white/10 px-6 py-3 font-semibold transition hover:bg-white/20"
            >
              ← Back to PulseNexis
            </Link>
          </div>
        </section>

        {/* Cards */}
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="grid gap-6 md:grid-cols-2">
            {PLANS.map((plan) => (
              <PlanCard key={plan.slug} plan={plan} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
