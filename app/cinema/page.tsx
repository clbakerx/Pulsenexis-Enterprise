"use client";

import * as React from "react";
import Link from "next/link";

type CinemaKit = {
  title: string;
  subtitle: string;
  description: string;
  slug: string; // routes to /cinema/[slug]
  priceLabel?: string; // optional, for future products
};

const DEFAULT_PRICE_LABEL = "$169 one-time license";

const CINEMA_KITS: CinemaKit[] = [
  {
    title: "Cinematic Tool Kits Vol 1",
    subtitle: "Reveal Toolkit",
    description: "Trailer-ready rises, reveals, and cinematic moments.",
    slug: "cinematic-reveal-toolkit-vol1",
    priceLabel: DEFAULT_PRICE_LABEL,
  },
  {
    title: "Cinematic Tool Kits Vol 2",
    subtitle: "Reveal Toolkit",
    description: "More tension, lifts, pulses, and reveal hits.",
    slug: "cinematic-reveal-toolkit-vol2",
    priceLabel: DEFAULT_PRICE_LABEL,
  },
  {
    title: "Cinematic Tool Kits Vol 3",
    subtitle: "Reveal Toolkit",
    description: "Bigger builds and modern trailer beds.",
    slug: "cinematic-reveal-toolkit-vol3",
    priceLabel: DEFAULT_PRICE_LABEL,
  },
  {
    title: "Cinematic Tool Kits Vol 4",
    subtitle: "Reveal Toolkit",
    description: "Peak-energy builds, stingers, and climax cues.",
    slug: "cinematic-reveal-toolkit-vol4",
    priceLabel: DEFAULT_PRICE_LABEL,
  },
];

export default function CinemaPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-neutral-900">Cinema</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Film &amp; trailer-ready cues, tension beds, and reveal moments — built for creators.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {CINEMA_KITS.map((kit) => (
            <div
              key={kit.slug}
              className="rounded-2xl border border-neutral-200 bg-white shadow-sm"
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-base font-semibold text-neutral-900">{kit.title}</div>

                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-neutral-500">{kit.subtitle}</span>
                      <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-semibold text-neutral-700">
                        Film &amp; Trailer Ready
                      </span>
                    </div>

                    <div className="mt-3 text-sm text-neutral-600">{kit.description}</div>
                  </div>

                  <div className="shrink-0 text-right">
                    <div className="text-xs font-semibold text-neutral-900">{kit.priceLabel}</div>
                  </div>
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
            </div>
          ))}
        </section>

        <div className="mt-10 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} PulseNexis • Honey Drip Records
        </div>
      </div>
    </main>
  );
}
