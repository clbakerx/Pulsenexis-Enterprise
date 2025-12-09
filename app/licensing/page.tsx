"use client";

import React from "react";

const BUYER_CTA_HREF = "/jukebox";   // keep for later when jukebox returns
const ARTIST_CTA_HREF = "/contact";
const PLANS_HREF = "/plans";

// ✅ TRENDING FROM YOUTUBE (NO JUKEBOX LINKS)
const FEATURED_TRACKS = [
  {
    title: "Snowflakes & Slow Jams",
    mood: "Winter R&B • Slow jam",
    useCase: "Holiday reels, romantic shorts, cozy scenes",
    youtubeUrl: "https://www.youtube.com/watch?v=ud6lLSeTBvY",
  },
  {
    title: "All Night to Prove It",
    mood: "Late-night R&B • Vibey",
    useCase: "Date night content, sultry visuals, slow motion",
    youtubeUrl: "https://www.youtube.com/watch?v=MpLbZCnMrpM",
  },
  {
    title: "Nothing Compares",
    mood: "Romantic ballad • Classic feel",
    useCase: "Love stories, wedding content, emotional edits",
    youtubeUrl: "https://www.youtube.com/watch?v=mJu0Byso1_A",
  },
  {
    title: "Give The World To You",
    mood: "Big love anthem • Soulful",
    useCase: "Proposal videos, highlight reels, cinematic moments",
    youtubeUrl: "https://www.youtube.com/watch?v=a0P9vnLkpSY",
  },
];

export default function PulseNexisLicensingLanding() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-16">

        {/* HERO */}
        <section className="grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              License <span className="text-emerald-400">hit-quality music</span>{" "}
              — or start <span className="text-emerald-400">selling yours today</span>
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
                href={PLANS_HREF}
                className="bg-emerald-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-emerald-400 transition"
              >
                License Music
              </a>

              <a
                href={ARTIST_CTA_HREF}
                className="border border-slate-600 px-6 py-3 rounded-full font-semibold hover:border-emerald-400 transition"
              >
                Start Selling My Music
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

        {/* ✅ TRENDING SECTION — THIS IS WHAT YOU WERE MISSING */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-center">
            Trending on PulseNexis
          </h2>

          <p className="mt-2 text-center text-slate-300 text-sm">
            These are the songs listeners are replaying the most on our YouTube channel right now.
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
                    <p className="text-xs text-slate-300 mt-1">
                      {track.mood}
                    </p>
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
                    href={PLANS_HREF}
                    className="inline-flex items-center rounded-full border border-slate-600 px-3 py-2 font-semibold text-slate-200 hover:border-emerald-400 hover:text-emerald-200 transition"
                  >
                    License This Style
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section className="mt-20 text-center">
          <h2 className="text-2xl font-bold">Simple Pricing</h2>

          <div className="grid md:grid-cols-3 gap-6 mt-8 text-sm">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="font-semibold">Starter License</h3>
              <p className="text-emerald-300 text-xl mt-2">$19</p>
            </div>

            <div className="bg-slate-900 border border-emerald-500 rounded-2xl p-6 shadow-xl">
              <h3 className="font-semibold">Business License</h3>
              <p className="text-emerald-300 text-xl mt-2">$99+</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="font-semibold">Pro Artist</h3>
              <p className="text-emerald-300 text-xl mt-2">Monthly</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
