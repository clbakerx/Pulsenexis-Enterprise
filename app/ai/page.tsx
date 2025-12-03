"use client";

import Link from "next/link";
import { useState } from "react";

type SongIdea = {
  id: number;
  title: string;
  hook: string;
  vibe: string;
  structure: string;
};

export default function AISongCreatorPage() {
  const [mood, setMood] = useState("Romantic, late-night slow jam");
  const [style, setStyle] = useState("R&B Slow Jam");
  const [tempo, setTempo] = useState(74);
  const [key, setKey] = useState("A♭ Major");
  const [refs, setRefs] = useState("Charlie Wilson, Tank");
  const [story, setStory] = useState(
    "A grown man owning his mistakes and promising real love this time."
  );

  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<SongIdea[]>([]);

  const presets = [
    {
      label: "Slow Jam",
      mood: "Intimate, candlelit, late-night",
      style: "R&B Slow Jam",
      tempo: 72,
      key: "B♭ Major",
      refs: "Jodeci, Boyz II Men",
    },
    {
      label: "Uplift",
      mood: "Hopeful, victory, breakthrough love",
      style: "Modern Soul / Mid-tempo",
      tempo: 84,
      key: "C Major",
      refs: "Earth, Wind & Fire, Charlie Wilson",
    },
    {
      label: "Heartbreak",
      mood: "Painful but healing, reflective",
      style: "Quiet Storm Ballad",
      tempo: 68,
      key: "G♭ Major",
      refs: "Babyface, After 7",
    },
  ];

  function applyPreset(preset: (typeof presets)[number]) {
    setMood(preset.mood);
    setStyle(preset.style);
    setTempo(preset.tempo);
    setKey(preset.key);
    setRefs(preset.refs);
  }

  async function handleGenerate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // Demo mock — later replace this with a real API call
    setTimeout(() => {
      const baseTitle =
        mood.toLowerCase().includes("heartbreak") ||
        story.toLowerCase().includes("hurt") ||
        story.toLowerCase().includes("cheating")
          ? "Love Has Never Been Like Us (After the Storm)"
          : "When You Are Mine (PulseNexis Draft)";

      const secondTitle =
        style.toLowerCase().includes("slow") || tempo <= 76
          ? "All Night To Prove It"
          : "The Way You Love Me Hits Different";

      const ideasGenerated: SongIdea[] = [
        {
          id: 1,
          title: baseTitle,
          hook: `“Say my name, fall in love with me / Every heartbeat writes our history.”`,
          vibe: `${style} in ${key} at ${tempo} BPM — ${mood}. Inspired by ${refs}.`,
          structure:
            "Verse 1 (confession & setup) → Pre-chorus (tension) → Big hook with stacked harmonies → Verse 2 (details & promises) → Bridge (emotional breakdown) → Final hook with ad-libs.",
        },
        {
          id: 2,
          title: secondTitle,
          hook: `“You took my flaws and turned them into faith / Now every second with you I don’t waste.”`,
          vibe: `Grown-folks ${style} with modern drums and classic PulseNexis harmonies. Build the arrangement around your story: ${story.slice(
            0,
            140
          )}${story.length > 140 ? "..." : ""}`,
          structure:
            "Open with soft Rhodes + bass, no drums. Drop drums on the first hook. Add choir-style backgrounds on the second hook and a key-change or lift on the last chorus.",
        },
        {
          id: 3,
          title: "Bonus Concept: PulseNexis Sketch",
          hook: `“If this ain’t real, then why does my soul sound like you?”`,
          vibe: `Alternate idea focused on ${mood.toLowerCase()} with ${refs} as subtle references, not copies.`,
          structure:
            "Short intro → Hook first (no verse) → Spoken or half-sung breakdown → Full verse → Hook out. Perfect for TikTok / short-form performances.",
        },
      ];

      setIdeas(ideasGenerated);
      setLoading(false);
    }, 900);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1020] via-[#15123a] to-[#21114a] text-white">
      {/* Top strip / mini-nav */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs font-bold">
              PN
            </span>
            <div className="text-xs sm:text-sm">
              <p className="font-semibold tracking-wide">
                PulseNexis · AI Song Creator
              </p>
              <p className="text-[11px] text-purple-200/80">
                Built for grown R&amp;B, soul and slow jams.
              </p>
            </div>
          </div>
          <div className="hidden gap-2 text-xs sm:flex">
            <Link
              href="/"
              className="rounded-full border border-white/15 px-3 py-1 hover:bg-white/10"
            >
              Home
            </Link>
            <Link
              href="/catalog"
              className="rounded-full border border-white/15 px-3 py-1 hover:bg-white/10"
            >
              Catalog
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:gap-10 lg:py-12">
        {/* Left: Controls */}
        <section className="w-full lg:w-[54%]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-900/20 px-3 py-1 text-[11px] font-medium text-purple-100 shadow-sm">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-purple-400 text-[10px] font-bold text-black">
              ✨
            </span>
            AI-assisted R&amp;B songwriting · PulseNexis style
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            Turn your{" "}
            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
              story
            </span>{" "}
            into a song concept.
          </h1>
          <p className="mt-3 text-sm text-purple-100/80 sm:text-[15px]">
            Describe the mood, key, tempo, and what you’ve been through. We’ll
            sketch titles, hooks, and arrangement ideas you can take straight
            into your DAW or writer’s notebook.
          </p>

          {/* Presets */}
          <div className="mt-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-purple-200/80">
              Quick presets
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className="rounded-full border border-purple-400/40 bg-purple-900/40 px-3 py-1 text-[11px] font-medium text-purple-100 hover:border-purple-300 hover:bg-purple-700/50"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form card */}
          <form
            onSubmit={handleGenerate}
            className="mt-5 space-y-4 rounded-2xl border border-white/10 bg-black/30 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.65)] sm:p-5"
          >
            {/* Mood + style */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-purple-200/80">
                  Mood
                </label>
                <input
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-purple-200/40 focus:border-purple-300 focus:outline-none focus:ring-1 focus:ring-purple-300"
                  placeholder="Romantic, emotional, healing…"
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-purple-200/80">
                  Style
                </label>
                <input
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-purple-200/40 focus:border-purple-300 focus:outline-none focus:ring-1 focus:ring-purple-300"
                  placeholder="Quiet Storm, Mid-tempo, Ballad…"
                />
              </div>
            </div>

            {/* Tempo + key */}
            <div className="grid gap-3 sm:grid-cols-[2fr_1.2fr]">
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-purple-200/80">
                  Tempo (BPM)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={60}
                    max={100}
                    value={tempo}
                    onChange={(e) => setTempo(Number(e.target.value))}
                    className="h-1 w-full cursor-pointer appearance-none rounded-full bg-purple-900/60 accent-purple-400"
                  />
                  <span className="w-10 text-right text-xs text-purple-100">
                    {tempo}
                  </span>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-purple-200/80">
                  Key
                </label>
                <select
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-purple-300 focus:outline-none focus:ring-1 focus:ring-purple-300"
                >
                  <option>A♭ Major</option>
                  <option>B♭ Major</option>
                  <option>G♭ Major</option>
                  <option>C Major</option>
                  <option>F Minor</option>
                  <option>E♭ Minor</option>
                  <option>Custom / Other</option>
                </select>
              </div>
            </div>

            {/* References */}
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-purple-200/80">
                Reference artists / songs
              </label>
              <input
                value={refs}
                onChange={(e) => setRefs(e.target.value)}
                className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-purple-200/40 focus:border-purple-300 focus:outline-none focus:ring-1 focus:ring-purple-300"
                placeholder="Charlie Wilson, Tank, Babyface…"
              />
            </div>

            {/* Story / idea */}
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-purple-200/80">
                What’s the story?
              </label>
              <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-purple-200/40 focus:border-purple-300 focus:outline-none focus:ring-1 focus:ring-purple-300"
                placeholder="Describe what happened, what you feel, and what you want the song to say…"
              />
              <p className="mt-1 text-[11px] text-purple-200/80">
                Think of this like telling your story to a producer before you
                hit record.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-purple-900/50 transition-all duration-200 hover:from-purple-300 hover:via-pink-300 hover:to-blue-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Generating ideas…" : "Generate Song Concepts"}
              </button>
              <p className="text-[11px] text-purple-200/80">
                Start with a couple of ideas. You can always refine the prompt
                and run it again.
              </p>
            </div>
          </form>
        </section>

        {/* Right: Results */}
        <section className="w-full lg:w-[46%]">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.65)] sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-purple-200/80">
                  AI suggestions
                </p>
                <h2 className="text-lg font-semibold sm:text-xl">
                  PulseNexis song sketches
                </h2>
              </div>
              <span className="rounded-full bg-purple-900/60 px-3 py-1 text-[11px] text-purple-100">
                Drafts · Not final lyrics
              </span>
            </div>

            {ideas.length === 0 ? (
              <div className="mt-6 rounded-xl border border-dashed border-white/15 bg-black/20 px-4 py-6 text-center text-sm text-purple-100/80">
                <p className="font-medium">
                  No concepts yet. Fill out the left side and hit{" "}
                  <span className="text-purple-200">Generate Song Concepts</span>
                  .
                </p>
                <p className="mt-2 text-[12px] text-purple-200/80">
                  You’ll get titles, hook lines, and arrangement notes that fit
                  your mood, key, and tempo.
                </p>
              </div>
            ) : (
              <div className="mt-3 flex max-h-[480px] flex-col gap-3 overflow-y-auto pr-1">
                {ideas.map((idea) => (
                  <article
                    key={idea.id}
                    className="rounded-xl border border-white/12 bg-gradient-to-br from-[#20103a] via-[#130f2f] to-[#101322] p-3 text-sm shadow-lg shadow-black/40 sm:p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-semibold sm:text-lg">
                          {idea.title}
                        </h3>
                        <p className="mt-1 text-[12px] text-purple-100/80">
                          {idea.vibe}
                        </p>
                      </div>
                      <button className="rounded-full border border-purple-400/60 bg-purple-900/40 px-3 py-1 text-[11px] font-medium text-purple-50 hover:bg-purple-700/60">
                        Save idea
                      </button>
                    </div>
                    <div className="mt-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-purple-200/80">
                        Hook idea
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed">
                        {idea.hook}
                      </p>
                    </div>
                    <div className="mt-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-purple-200/80">
                        Arrangement notes
                      </p>
                      <p className="mt-1 text-[12px] text-purple-100/85">
                        {idea.structure}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
