"use client";

import React, { useState } from "react";

const BUYER_CTA_HREF = "/jukebox";
const ARTIST_CTA_HREF = "/contact";
const TRADEMARK_HREF = "/trademark";

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

const SYNC_CATALOG = [
  {
    id: "almost-counts",
    title: "Almost Counts",
    mood: "Emotional • Longing • Relatable",
    tempo: "82 BPM",
    key: "F Minor",
    lane: "Midnight Feels",
    tags: ["situationship", "duet", "viral", "R&B"],
    previewUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Singles/Almost-Counts/Almost%20Counts_Sample.mp3",
    uses: ["Film & TV", "Social Media", "Commercials"],
  },
  {
    id: "someone-elses-man",
    title: "Someone Else's Man",
    mood: "Heartbreak • Raw • Cinematic",
    tempo: "74 BPM",
    key: "D Minor",
    lane: "Raw & Real",
    tags: ["heartbreak", "romance", "emotional"],
    previewUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Video-Generator/Somebody%20Else%E2%80%99s%20Man_clip.mp3",
    uses: ["Film & TV", "Social Media"],
  },
  {
    id: "the-foundation",
    title: "The Foundation",
    mood: "Uplifting • Cinematic • Hopeful",
    tempo: "84 BPM",
    key: "Ab Major",
    lane: "Soul Lift",
    tags: ["love", "cinematic", "gospel", "uplifting"],
    previewUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Video-Generator/The%20Only%20Way%20I%20Be_clip.mp3",
    uses: ["Film & TV", "Commercials", "Social Media"],
  },
  {
    id: "comfortable-stranger",
    title: "Comfortable Stranger",
    mood: "Sophisticated • Bittersweet • Jazz",
    tempo: "68 BPM",
    key: "Eb Major",
    lane: "Smooth Current",
    tags: ["jazz", "sophisticated", "adult R&B"],
    previewUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Singles/Comfortable-Stranger/Comfortable%20Stranger_Sample.mp3",
    uses: ["Film & TV", "Commercials", "Social Media"],
  },
  {
    id: "not-the-one",
    title: "Not The One",
    mood: "Bittersweet • Confessional • Quiet",
    tempo: "76 BPM",
    key: "C Minor",
    lane: "Raw & Real",
    tags: ["unrequited love", "friendship", "ballad"],
    previewUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Singles/Not-The-One/Not%20The%20One_Sample.mp3",
    uses: ["Film & TV", "Social Media"],
  },
  {
    id: "right-in-the-middle",
    title: "Right in the Middle",
    mood: "Smooth • Late Night • Sensual",
    tempo: "70 BPM",
    key: "G Minor",
    lane: "Midnight Feels",
    tags: ["late night", "smooth", "romance"],
    previewUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Singles/Right-in-the-Middle/Right%20in%20the%20Middle_30secSample.mp3",
    uses: ["Film & TV", "Commercials", "Social Media"],
  },
];

const SYNC_TIERS = [
  {
    name: "Social Media License",
    price: "$49",
    unit: "per track",
    description: "YouTube, TikTok, Instagram, Facebook — one song, one creator.",
    features: [
      "1 song · 1 year license",
      "All social platforms",
      "Up to 1M views",
      "Non-exclusive",
      "Instant delivery",
      "ASCAP cleared",
    ],
    href: "https://buy.stripe.com/28E8wP2k32752ylcBL4ZG0L",
    cta: "License Now",
    popular: false,
  },
  {
    name: "Film & TV License",
    price: "$299",
    unit: "per track",
    description: "Independent films, documentaries, web series, streaming.",
    features: [
      "1 song · full film run",
      "Festival & streaming rights",
      "Up to 10,000 seat venues",
      "Non-exclusive",
      "License agreement included",
      "ASCAP cleared",
    ],
    href: "https://buy.stripe.com/dRm7sLaQz6nlc8V6dn4ZG0M",
    cta: "License Now",
    popular: true,
  },
  {
    name: "Commercial License",
    price: "$599",
    unit: "per track",
    description: "Ads, brand campaigns, corporate videos, product launches.",
    features: [
      "1 song · 1 year campaign",
      "All broadcast platforms",
      "National & regional campaigns",
      "Non-exclusive",
      "Full indemnification",
      "ASCAP cleared",
    ],
    href: "https://buy.stripe.com/aFa8wP5wf8vt5KxatD4ZG0N",
    cta: "License Now",
    popular: false,
  },
];

export default function PulseNexisLicensingLanding() {
  const [licenseOpen, setLicenseOpen] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [contactError, setContactError] = useState("");
  const [contactLoading, setContactLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", projectType: "", songs: "", message: "" });

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setContactError("");
    setContactLoading(true);
    try {
      const subject = `Sync Licensing Request — ${form.projectType || "Custom"}`;
      const body = `Project Type: ${form.projectType}\nSongs Interested In: ${form.songs}\n\n${form.message}`;
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, subject, message: body }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      setContactSent(true);
    } catch (err: unknown) {
      setContactError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setContactLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 pb-12 pt-16">

        {/* ── HERO ── */}
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
              <a
                href="#sync"
                className="border border-emerald-500/60 text-emerald-300 px-6 py-3 rounded-full font-semibold hover:bg-emerald-500/10 transition"
              >
                Sync Licensing →
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

        {/* ── TRENDING ── */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-center">Trending on PulseNexis</h2>
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
                    <h3 className="text-base font-semibold text-slate-50">{track.title}</h3>
                    <p className="text-xs text-slate-300 mt-1">{track.mood}</p>
                  </div>
                  <span className="text-[10px] rounded-full border border-emerald-500/60 px-3 py-1 text-emerald-300">
                    Trending
                  </span>
                </div>
                <p className="text-xs text-slate-400">Best for: {track.useCase}</p>
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

        {/* ── SYNC LICENSING CATALOG ── */}
        <section id="sync" className="mt-24">
          <div className="text-center mb-10">
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 border border-emerald-500/40 rounded-full px-4 py-1.5">
              Honey Drip Records · ASCAP Registered
            </span>
            <h2 className="mt-4 text-2xl font-bold">Sync Licensing Catalog</h2>
            <p className="mt-2 text-slate-400 text-sm max-w-xl mx-auto">
              Original R&B and Soul compositions available for film, TV, commercials,
              and social media. Every track is ASCAP registered and emotion-first.
            </p>
          </div>

          <div className="grid gap-4">
            {SYNC_CATALOG.map((track) => (
              <div
                key={track.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="text-base font-semibold text-slate-50">{track.title}</h3>
                      <span className="text-[10px] rounded-full border border-emerald-500/40 px-2 py-0.5 text-emerald-300">
                        {track.lane}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{track.mood}</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
                      <span className="text-xs text-slate-500">{track.tempo}</span>
                      <span className="text-slate-700">·</span>
                      <span className="text-xs text-slate-500">{track.key}</span>
                      <span className="text-slate-700">·</span>
                      {track.uses.map((u) => (
                        <span key={u} className="text-xs text-slate-500">{u}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {track.tags.map((tag) => (
                        <span key={tag} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="sm:w-60 shrink-0">
                    <audio controls preload="none" className="w-full mb-3">
                      <source src={track.previewUrl} type="audio/mpeg" />
                    </audio>
                    <div className="flex gap-2">
                      <a
                        href="#sync-pricing"
                        className="flex-1 text-center text-xs py-2 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition font-semibold"
                      >
                        License
                      </a>
                      <a
                        href="#contact"
                        className="flex-1 text-center text-xs py-2 rounded-lg border border-slate-600 text-slate-300 hover:border-emerald-400 hover:text-emerald-200 transition"
                      >
                        Custom
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SYNC PRICING ── */}
        <section id="sync-pricing" className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Sync License Pricing</h2>
            <p className="mt-2 text-slate-400 text-sm">
              Simple, transparent, instant. All licenses are non-exclusive and ASCAP cleared.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {SYNC_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border p-6 flex flex-col ${
                  tier.popular
                    ? "border-emerald-500/60 bg-emerald-500/5"
                    : "border-slate-800 bg-slate-900/80"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap">
                    Most Requested
                  </div>
                )}
                <div className="text-xs font-semibold text-emerald-400 mb-1 uppercase tracking-wide">
                  {tier.name}
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-slate-50">{tier.price}</span>
                  <span className="text-xs text-slate-500">{tier.unit}</span>
                </div>
                <p className="text-xs text-slate-400 mb-5 leading-relaxed">{tier.description}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="text-emerald-400 shrink-0">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <a
                  href={tier.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center py-3 rounded-xl text-sm font-semibold transition ${
                    tier.popular
                      ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                      : "border border-slate-600 text-slate-200 hover:border-emerald-400 hover:text-emerald-200"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-slate-600 mt-4">
            Need a custom quote for major studio or global campaign?{" "}
            <a href="#contact" className="text-emerald-400 hover:text-emerald-300">Contact us →</a>
          </p>
        </section>

        {/* ── CONTACT FORM ── */}
        <section id="contact" className="mt-20">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 md:p-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-1">Custom Licensing Request</h2>
              <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                Major studio placement, custom edits, stems, or bulk catalog licensing —
                reach out and we'll put together a custom package. Most requests answered within 24 hours.
              </p>

              {contactSent ? (
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-6 py-8 text-center">
                  <p className="text-emerald-300 font-semibold text-lg mb-2">Request sent!</p>
                  <p className="text-sm text-slate-400">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="grid gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 block mb-2">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Smith"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 block mb-2">Email</label>
                      <input
                        type="email"
                        required
                        placeholder="you@studio.com"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 block mb-2">Project Type</label>
                    <select
                      value={form.projectType}
                      onChange={(e) => setForm((f) => ({ ...f, projectType: e.target.value }))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="">Select project type...</option>
                      <option>Feature Film</option>
                      <option>TV Series</option>
                      <option>Documentary</option>
                      <option>Commercial / Brand Campaign</option>
                      <option>YouTube / Social Media</option>
                      <option>Video Game</option>
                      <option>Podcast / Audio</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 block mb-2">Song(s) You're Interested In</label>
                    <input
                      type="text"
                      placeholder="e.g. Almost Counts, Comfortable Stranger"
                      value={form.songs}
                      onChange={(e) => setForm((f) => ({ ...f, songs: e.target.value }))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 block mb-2">Tell us about your project</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe your project, how you'd like to use the music, timeline, and budget range..."
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 resize-none"
                    />
                  </div>

                  {contactError && (
                    <p className="text-sm text-red-400 text-center">{contactError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={contactLoading}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-semibold py-4 rounded-xl text-sm transition"
                  >
                    {contactLoading ? "Sending…" : "Send Licensing Request →"}
                  </button>

                  <p className="text-xs text-slate-600 text-center">
                    Or email directly:{" "}
                    <a href="mailto:info@pulsenexis.com" className="text-emerald-400">info@pulsenexis.com</a>
                    {" "}· Usually responds within 24 hours
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── LICENSE TERMS (existing) ── */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-center">License Terms</h2>
          <p className="mt-2 text-center text-slate-300 text-sm">
            Quick summary first — full terms below.
          </p>

          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-2 md:items-start">
              <div>
                <h3 className="text-lg font-semibold text-emerald-300">TL;DR License Summary</h3>
                <p className="mt-2 text-sm text-slate-200 leading-relaxed max-w-prose">
                  When you buy a PulseNexis license, you get ongoing usage rights
                  (no renewal needed). You're not buying ownership of the music —
                  you're buying permission to use it based on your selected tier.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  <li>✅ Perpetual use (no expiration)</li>
                  <li>✅ Monetization allowed (within tier scope)</li>
                  <li>✅ Worldwide, non-exclusive rights</li>
                  <li>🚫 No reselling the audio file by itself</li>
                  <li>🚫 No Content ID / PRO registration</li>
                </ul>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">License Type</p>
                  <p className="mt-2 text-sm text-slate-100 font-semibold leading-snug">Perpetual • Non-exclusive • Worldwide</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">Monetization</p>
                  <p className="mt-2 text-sm text-slate-100 font-semibold leading-snug">Allowed (within tier scope)</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">You Can</p>
                  <p className="mt-2 text-sm text-slate-100 leading-relaxed">
                    Use music in videos, ads, social content, podcasts, and projects — as permitted by your license tier.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">You Can't</p>
                  <p className="mt-2 text-sm text-slate-100 leading-relaxed">
                    Resell the track standalone, claim ownership, or register it in Content ID systems.
                  </p>
                </div>
              </div>
            </div>

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

              {licenseOpen && (
                <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-5 md:p-6">
                  <div className="flex flex-col gap-6">
                    <div>
                      <h4 className="text-base font-semibold text-emerald-300">License Grant</h4>
                      <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                        Upon purchase, PulseNexis ("Licensor") grants the purchaser ("Licensee") a{" "}
                        <span className="font-semibold">perpetual</span>,{" "}
                        <span className="font-semibold">non-exclusive</span>,{" "}
                        <span className="font-semibold">worldwide</span> license to use the licensed
                        music track(s) in accordance with the selected license tier.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-300">
                        <li>• Use the music in approved projects (audiovisual productions, digital media, online content, commercial or non-commercial projects), as permitted by the selected license.</li>
                        <li>• Monetize approved projects without ongoing fees or renewals.</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-emerald-300">Ownership</h4>
                      <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                        All licensed music remains the exclusive property of PulseNexis and/or its
                        contributing artists. This license does <span className="font-semibold">not</span> transfer
                        ownership, copyright, or publishing rights.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-emerald-300">Restrictions</h4>
                      <ul className="mt-2 space-y-2 text-sm text-slate-300">
                        <li>• Do not resell, sublicense, distribute, or make the music available as a standalone file.</li>
                        <li>• Do not claim ownership, authorship, or copyright of the music.</li>
                        <li>• Do not register the music with Content ID systems, performing rights organizations, or similar services.</li>
                        <li>• Do not use the music in unlawful, defamatory, or misleading content.</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-emerald-300">Termination</h4>
                      <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                        This license is perpetual provided the Licensee complies with these terms.
                        PulseNexis may terminate the license if these terms are violated.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Note: This section is a website summary for convenience. If you publish full
                        Terms of Service / License Agreement, those terms should control in the event of a conflict.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ASCAP footer note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-600">All music published by Honey Drip Records · ASCAP Member</p>
        </div>

      </div>
    </main>
  );
}
