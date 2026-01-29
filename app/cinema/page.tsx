"use client";

import * as React from "react";
import Link from "next/link";

type CinemaKit = {
  title: string;
  subtitle: string;   // small line (e.g. "Reveal Toolkit")
  description: string;
  slug: string;       // routes to /cinema/[slug]
};

const CINEMA_KITS: CinemaKit[] = [
  {
    title: "Cinematic Tool Kits Vol 1",
    subtitle: "Reveal Toolkit",
    description: "Trailer-ready rises, reveals, and cinematic moments.",
    slug: "cinematic-reveal-toolkit-vol1",
  },
  {
    title: "Cinematic Tool Kits Vol 2",
    subtitle: "Reveal Toolkit",
    description: "More tension, lifts, pulses, and reveal hits.",
    slug: "cinematic-reveal-toolkit-vol2",
  },
  {
    title: "Cinematic Tool Kits Vol 3",
    subtitle: "Reveal Toolkit",
    description: "Bigger builds and modern trailer beds.",
    slug: "cinematic-reveal-toolkit-vol3",
  },
  {
    title: "Cinematic Tool Kits Vol 4",
    subtitle: "Reveal Toolkit",
    description: "Peak-energy builds, stingers, and climax cues.",
    slug: "cinematic-reveal-toolkit-vol4",
  },
];

export default function CinemaPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-neutral-900">Cinema</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Trailer-ready cues, tension beds, and reveal moments — built for creators.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {CINEMA_KITS.map((kit) => (
            <div
              key={kit.slug}
              className="rounded-2xl border border-neutral-200 bg-white shadow-sm"
            >
              <div className="p-6 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-base font-semibold text-neutral-900">
                    {kit.title}
                  </div>

                  <div className="mt-1 text-xs text-neutral-500">
                    {kit.subtitle}
                  </div>

                  <div className="mt-3 text-sm text-neutral-600">
                    {kit.description}
                  </div>
                </div>

                <Link
                  href={`/cinema/${kit.slug}`}
                  className="shrink-0 rounded-full border border-neutral-300 px-4 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}