"use client";

import React, { useState } from "react";

const BUYER_CTA_HREF = "/jukebox"; // keep for later when jukebox returns
const ARTIST_CTA_HREF = "/contact"; // keep for later if needed
const TRADEMARK_HREF = "/trademark"; // update if your trademark page route differs

// ✅ TRENDING FROM YOUTUBE (NO JUKEBOX LINKS)
const FEATURED_TRACKS = [
  {
    title: "Snowflakes & Slow Jams",
    mood: "Winter R&B • Slow jam",
    useCase: "Holiday reels, romantic shorts, cozy scenes",
    youtubeUrl: "https://www.youtube.com/watch?v=ud6lLSeTBvY",
  },
  {
    title: "How Many Love Songs",
    mood: "Late-night R&B • Vibey",
    useCase: "Date night content, sultry visuals, slow motion",
    youtubeUrl: "https://youtu.be/pe3Cpap6o7A?si=usWjkjXtDX5TxHR9",
  },
  {
    title: "Tis' the Season",
    mood: "Romantic ballad • Classic feel",
    useCase: "Love stories, wedding content, emotional edits",
    youtubeUrl: "https://youtu.be/UqwDjw5I1VQ?si=2PKZHer2_1p5hWhQ",
  },
  {
    title: "Give The World To You",
    mood: "Big love anthem • Soulful",
    useCase: "Proposal videos, highlight reels, cinematic moments",
    youtubeUrl: "https://www.youtube.com/watch?v=a0P9vnLkpSY",
  },
];

export default function PulseNexisLicensingLanding() {
  const [licenseOpen, setLicenseOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 pb-12 pt-16">
        {/* HERO */}
        <section className="grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              License <span className="text-emerald-400">hit-quality music</span>
            </h1>

            <p className="mt-4 text-slate-300 max-w-xl">
              PulseNexis is the all-in-one licensing and creator platform where
              artists earn and creators get instant commercial-ready music.
            </p>

            <ul className="mt-6 space-y-2 text-sm text-slate-300">
              <li>✅ Start licensing from $19</li>
              <li>✅ No label • No contracts • No gatekeepers</li>
              <li>✅ Instant downloads with commercial rights</li>
              <li>✅ Artists get paid automatically</li>
            </ul>

            <div className="mt-8 flex gap-4 flex-wrap">
              <a
                href={TRADEMARK_HREF}
                className="bg-emerald-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-emerald-400 transition"
              >
                Trademark
              </a>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-3">
            <div className="flex justify-between bg-slate-800 rounded-xl p-3">
              <span>Creators • Day 1</span>
              <span className="text-emerald-300">Find your sound</span>
            </div>
            <div className="flex justify-between bg-slate-800 rounded-xl p-3">
              <span>Creators • Day 7</span>
              <span className="text-emerald-300">Publish monetized content</span>
            </div>
            <div className="flex justify-between bg-slate-800 rounded-xl p-3">
              <span>Artists • Day 1</span>
              <span className="text-emerald-300">Upload & set price</span>
            </div>
            <div className="flex justify-between bg-slate-800 rounded-xl p-3">
              <span>Artists • Day 30</span>
              <span className="text-emerald-300">First royalty payout</span>
            </div>
          </div>
        </section>

        {/* ✅ TRENDING SECTION */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-center">
            Trending on PulseNexis
          </h2>

          <p className="mt-2 text-center text-slate-300 text-sm">
            These are the songs listeners are replaying the most on our YouTube
            channel right now.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {FEATURED_TRACKS.map((track) => (
              <div
                key={track.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-slate-50">
                      {track.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">{track.mood}</p>
                  </div>

                  <span className="text-[10px] rounded-full border border-emerald-500/60 px-3 py-1 text-emerald-300">
                    Trending
                  </span>
                </div>

                <p className="text-xs text-slate-400">
                  Best for: {track.useCase}
                </p>

                <div className="mt-2 flex flex-wrap gap-3 text-xs">
                  <a
                    href={track.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full bg-emerald-500 px-3 py-2 font-semibold text-slate-950 hover:bg-emerald-400 transition"
                  >
                    Watch on YouTube
                  </a>

                  <a
                    href={TRADEMARK_HREF}
                    className="inline-flex items-center rounded-full border border-slate-600 px-3 py-2 font-semibold text-slate-200 hover:border-emerald-400 hover:text-emerald-200 transition"
                  >
                    Trademark This Style
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ✅ LICENSE (TL;DR + ACCORDION) */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-center">License Terms</h2>
          <p className="mt-2 text-center text-slate-300 text-sm">
            Quick summary first — full terms below.
          </p>

          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-2 md:items-start">
              {/* LEFT */}
              <div>
                <h3 className="text-lg font-semibold text-emerald-300">
                  TL;DR License Summary
                </h3>

                <p className="mt-2 text-sm text-slate-200 leading-relaxed max-w-prose">
                  When you buy a PulseNexis license, you get ongoing usage rights
                  (no renewal needed). You’re not buying ownership of the music —
                  you’re buying permission to use it based on your selected tier.
                </p>

                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  <li>✅ Perpetual use (no expiration)</li>
                  <li>✅ Monetization allowed (within tier scope)</li>
                  <li>✅ Worldwide, non-exclusive rights</li>
                  <li>🚫 No reselling the audio file by itself</li>
                  <li>🚫 No Content ID / PRO registration</li>
                </ul>
              </div>

              {/* RIGHT */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">
                    License Type
                  </p>
                  <p className="mt-2 text-sm text-slate-100 font-semibold leading-snug">
                    Perpetual • Non-exclusive • Worldwide
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">
                    Monetization
                  </p>
                  <p className="mt-2 text-sm text-slate-100 font-semibold leading-snug">
                    Allowed (within tier scope)
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">
                    You Can
                  </p>
                  <p className="mt-2 text-sm text-slate-100 leading-relaxed">
                    Use music in videos, ads, social content, podcasts, and
                    projects — as permitted by your license tier.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">
                    You Can’t
                  </p>
                  <p className="mt-2 text-sm text-slate-100 leading-relaxed">
                    Resell the track standalone, claim ownership, or register it
                    in Content ID systems.
                  </p>
                </div>
              </div>
            </div>

            {/* Accordion Toggle */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setLicenseOpen((v) => !v)}
                aria-expanded={licenseOpen}
                className="w-full flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-950/30 px-4 py-3 text-left hover:border-emerald-400 transition"
              >
                <span className="text-sm font-semibold text-slate-100">
                  {licenseOpen ? "Hide full license terms" : "Read full license terms"}
                </span>
                <span className="text-slate-300 text-xs">{licenseOpen ? "−" : "+"}</span>
              </button>

              {/* Accordion Content */}
              {licenseOpen && (
                <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-5 md:p-6">
                  <div className="flex flex-col gap-6">
                    <div>
                      <h4 className="text-base font-semibold text-emerald-300">
                        License Grant
                      </h4>
                      <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                        Upon purchase, PulseNexis (“Licensor”) grants the purchaser
                        (“Licensee”) a{" "}
                        <span className="font-semibold">perpetual</span>,{" "}
                        <span className="font-semibold">non-exclusive</span>,{" "}
                        <span className="font-semibold">worldwide</span> license to
                        use the licensed music track(s) in accordance with the
                        selected license tier.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-300">
                        <li>
                          • Use the music in approved projects (audiovisual productions,
                          digital media, online content, commercial or non-commercial
                          projects), as permitted by the selected license.
                        </li>
                        <li>• Monetize approved projects without ongoing fees or renewals.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-base font-semibold text-emerald-300">
                        Ownership
                      </h4>
                      <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                        All licensed music remains the exclusive property of PulseNexis
                        and/or its contributing artists. This license does{" "}
                        <span className="font-semibold">not</span> transfer ownership,
                        copyright, or publishing rights.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-base font-semibold text-emerald-300">
                        Restrictions
                      </h4>
                      <ul className="mt-2 space-y-2 text-sm text-slate-300">
                        <li>
                          • Do not resell, sublicense, distribute, or make the music
                          available as a standalone file.
                        </li>
                        <li>• Do not claim ownership, authorship, or copyright of the music.</li>
                        <li>
                          • Do not register the music with Content ID systems, performing
                          rights organizations, or similar services.
                        </li>
                        <li>• Do not use the music in unlawful, defamatory, or misleading content.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-base font-semibold text-emerald-300">
                        Termination
                      </h4>
                      <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                        This license is perpetual provided the Licensee complies with these
                        terms. PulseNexis may terminate the license if these terms are violated.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Note: This section is a website summary for convenience. If you publish
                        full Terms of Service / License Agreement, those terms should control in
                        the event of a conflict.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
