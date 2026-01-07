"use client";

import { useRef } from "react";
import Link from "next/link";

const tiers = [
  {
    name: "Starter Creator Kit",
    price: 79,
    bullets: [
      "1 loopable track (60–90s)",
      "Full + cutdowns + loops + metadata",
      "Creator License",
      "48-hour delivery",
    ],
  },
  {
    name: "Creator Pro Kit",
    price: 249,
    bullets: [
      "Full length track (2:00–2:30)",
      "2 alternate mixes",
      "1 revision",
      "3–5 business days",
    ],
  },
  {
    name: "Brand Exclusive Kit",
    price: 1250,
    bullets: [
      "Exclusive usage rights (worldwide, perpetual)",
      "Stems included (drums, bass, chords, melody, FX)",
      "3 alternate mixes",
      "5–10 business days",
    ],
  },
];

export default function CustomMusicKitsPage() {
  const intakeRef = useRef<HTMLElement | null>(null);

  const goToIntake = () => {
    intakeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Custom Music Kits</h1>
      <p className="mt-2 opacity-80">
        AI-assisted, human-polished music kits—loopable, cut down, and labeled—so you can publish fast
        without copyright headaches.
      </p>

      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <Link className="underline" href="/catalog/packs">
          Browse packs
        </Link>
        <span className="opacity-60">•</span>
        <Link className="underline" href="/licensing">
          Licensing
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {tiers.map((t) => (
          <div key={t.name} className="rounded-2xl border p-5">
            <div className="text-sm opacity-70">{t.name}</div>
            <div className="mt-1 text-2xl font-semibold">${t.price}</div>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm opacity-85">
              {t.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            <button
              type="button"
              className="mt-4 w-full rounded-xl bg-black px-4 py-2 text-sm text-white hover:opacity-90"
              onClick={goToIntake}
            >
              Start Order
            </button>
          </div>
        ))}
      </div>

      <section className="mt-10 rounded-2xl border p-5">
        <h2 className="text-lg font-semibold">What you receive</h2>
        <p className="mt-1 text-sm opacity-80">
          Every sale includes a labeled folder: full track + cutdowns + loops + metadata. Exclusive adds stems.
        </p>
        <pre className="mt-4 whitespace-pre-wrap rounded-xl border bg-black/5 p-4 text-sm">
{`/01_FULL  (WAV + MP3)
/02_CUTDOWNS  (60/30/15/6)
/03_LOOPS  (8/16 bars)
/04_STEMS  (Exclusive only)
/05_METADATA  (BPM, key, mood, tags)`}
        </pre>
      </section>

      {/* Intake anchor */}
      <section
        ref={(el) => {
          intakeRef.current = el;
        }}
        className="mt-10 rounded-2xl border p-5"
        id="intake"
      >
        <h2 className="text-lg font-semibold">Intake Form</h2>
        <p className="mt-1 text-sm opacity-80">
          (MVP) For now, email us your request or use the Contact page. We wire the form next.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link className="rounded-xl border px-4 py-2 text-sm" href="/contact">
            Open Contact Form
          </Link>
          <Link className="rounded-xl border px-4 py-2 text-sm" href="/licensing">
            Read Licensing
          </Link>
        </div>
      </section>
    </main>
  );
}
