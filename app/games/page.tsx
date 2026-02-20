import { PLANS } from "./plans";

function getCheckout(plan: { stripeUrl?: string; gumroadUrl?: string }) {
  if (plan.stripeUrl) return { label: "Buy Now", href: plan.stripeUrl };
  if (plan.gumroadUrl) return { label: "Get It", href: plan.gumroadUrl };
  return null;
}

export default function GamesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            PulseNexis Gaming Audio
          </h1>
          <p className="mt-2 text-sm text-white/70">
            Loop-ready, tension-forward game music packs built for clean loop points,
            layering, and engine-friendly use.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PLANS.map((plan) => {
            const checkout = getCheckout(plan);

            return (
              <article
                key={plan.slug}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl"
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    backgroundImage: `url(${plan.bgUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

                {/* Content */}
                <div className="relative z-10 flex min-h-[320px] flex-col p-6">
                  {/* Top Row */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[11px] font-semibold tracking-widest text-white/70">
                        {plan.brand}
                      </div>
                      <h2 className="mt-2 text-2xl font-semibold leading-tight">
                        {plan.title}
                      </h2>
                      <div className="mt-1 text-sm text-white/70">
                        {plan.subtitle}
                      </div>
                    </div>

                    {plan.badge ? (
                      <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wide">
                        {plan.badge}
                      </div>
                    ) : null}
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-relaxed text-white/75">
                    {plan.description}
                  </p>

                  {/* Demo Player */}
                  {plan.demoUrl ? (
                    <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-semibold text-white/80">
                            Preview Demo
                          </div>
                          <div className="text-[11px] text-white/50">MP3 stream</div>
                        </div>
                        <a
                          className="text-xs font-semibold text-white/70 hover:text-white"
                          href={plan.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open
                        </a>
                      </div>

                      <audio
                        className="mt-3 w-full"
                        controls
                        preload="none"
                        src={plan.demoUrl}
                      />
                    </div>
                  ) : null}

                  {/* Bottom CTA */}
                  <div className="mt-auto pt-5">
                    {checkout ? (
                      <a
                        href={checkout.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white hover:bg-white/15"
                      >
                        {checkout.label}
                      </a>
                    ) : (
                      <button
                        disabled
                        className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white/50"
                      >
                        Not for sale yet
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}