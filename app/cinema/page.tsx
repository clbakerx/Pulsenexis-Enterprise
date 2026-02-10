"use client";

import * as React from "react";
import Link from "next/link";

type CinemaKit = {
  title: string;
  subtitle: string;
  description: string;
  slug: string; // routes to /cinema/[slug]
};

// ❌ Old (Payment Link) kept here only if you want it later
// const CINEMA_PAYLINK_URL = "https://buy.stripe.com/fZu14n0bVeTR7SF45f4ZG0t";

const CINEMA_PRICE = 169;

// ✅ Checkout route (you add: app/api/checkout/cinema/route.ts)
// Sends kit + optional note into Stripe Checkout Session metadata.
const checkoutHrefForCinemaKit = (kitTitle: string, note?: string) => {
  const params = new URLSearchParams();
  params.set("kit", kitTitle);
  if (note?.trim()) params.set("note", note.trim());
  return `/api/checkout/cinema?${params.toString()}`;
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
  const [notesBySlug, setNotesBySlug] = React.useState<Record<string, string>>(
    {}
  );

  const setNote = (slug: string, value: string) => {
    setNotesBySlug((prev) => ({ ...prev, [slug]: value }));
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-neutral-900">Cinema</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Film &amp; trailer-ready cues, tension beds, and reveal moments —
            built for creators.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {CINEMA_KITS.map((kit) => {
            const note = notesBySlug[kit.slug] || "";

            return (
              <div
                key={kit.slug}
                className="rounded-2xl border border-neutral-200 bg-white shadow-sm"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-base font-semibold text-neutral-900">
                        {kit.title}
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <span className="text-xs text-neutral-500">
                          {kit.subtitle}
                        </span>
                        <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-semibold text-neutral-700">
                          Film &amp; Trailer Ready
                        </span>
                      </div>

                      <div className="mt-3 text-sm text-neutral-600">
                        {kit.description}
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <div className="text-sm font-semibold text-neutral-900">
                        ${CINEMA_PRICE}
                      </div>
                      <div className="mt-0.5 text-[11px] text-neutral-500">
                        one-time license
                      </div>
                    </div>
                  </div>

                  {/* ✅ Optional notes field (saved into Checkout metadata via your API route) */}
                  <div className="mt-4">
                    <label className="mb-1 block text-[11px] font-semibold text-neutral-700">
                      Checkout note (ex: “Please indicate which Volume you desire.”)
                    </label>
                    <input
                      value={note}
                      onChange={(e) => setNote(kit.slug, e.target.value)}
                      placeholder="Add a note for your order (optional)"
                      className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
                    />
                    <p className="mt-1 text-[11px] text-neutral-500">
                      This note is attached to your Stripe checkout and appears in your order
                      details.
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <Link
                      href={`/cinema/${kit.slug}`}
                      className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                    >
                      View kit
                    </Link>

                    {/* ✅ New: goes through your checkout route so we can attach kit + note */}
                    <a
                      href={checkoutHrefForCinemaKit(kit.title, note)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white hover:opacity-90"
                    >
                      Buy — ${CINEMA_PRICE}
                    </a>
                  </div>

                  <div className="mt-2 text-[11px] text-neutral-500">
                    Includes 2-song bundles inside each kit • stream previews before
                    purchase
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <div className="mt-10 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} PulseNexis • Honey Drip Records
        </div>
      </div>
    </main>
  );
}
