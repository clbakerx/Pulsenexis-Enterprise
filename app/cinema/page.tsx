import Link from "next/link";
import TopHero from "../components/TopHero";
import { CINEMA_KITS } from "./packs";

export default function CinemaPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <TopHero
          eyebrow="PULSENEXIS • CINEMA"
          titlePre="Cinematic Tool Kits for "
          titleHighlight="Trailers"
          titlePost=" & Storytelling"
          descriptionLines={[
            "Film & trailer-ready cues, tension beds, and reveal moments — built for creators.",
            "Each kit includes streamable previews and instant access options.",
          ]}
          bullets={[
            "Trailer-ready rises, hits, pulses, and reveal builds",
            "Clean loop points + modern cinematic sound",
            "Use in videos, games, ads, and content",
          ]}
          buttons={[
            { label: "Browse kits", href: "#kits", variant: "primary" },
            { label: "Contact", href: "/contact", variant: "outline" },
          ]}
          // optional: if you want a cinema-specific footnote, override it
          footnote="Pick a kit below • Previews inside each kit page • One-time license"
        />

        <section id="kits" className="mt-8 grid gap-6 md:grid-cols-2">
          {CINEMA_KITS.map((kit) => (
            <article
              key={kit.slug}
              className="rounded-2xl border border-neutral-200 bg-white shadow-sm"
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-base font-semibold text-neutral-900">
                      {kit.title}
                    </h2>

                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-neutral-500">{kit.subtitle}</span>

                      {kit.badge ? (
                        <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-semibold text-neutral-700">
                          {kit.badge}
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-3 text-sm text-neutral-600">{kit.description}</p>
                  </div>

                  {kit.priceLabel ? (
                    <div className="shrink-0 text-right">
                      <div className="text-xs font-semibold text-neutral-900">
                        {kit.priceLabel}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="mt-5">
                  <Link
                    href={`/cinema/${kit.slug}`}
                    className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                  >
                    View kit
                  </Link>
                </div>

                <div className="mt-2 text-[11px] text-neutral-500">
                  Stream previews inside each kit page.
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
