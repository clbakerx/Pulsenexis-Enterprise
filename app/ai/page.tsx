"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";

// If you later return ideas from /api/song-concepts, they should match this.
type SongIdeaFromApi = {
  title: string;
  hookIdea: string;
  vibe: string;
  arrangementNotes: string;
};

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
  // Track all titles we've ever shown in this session so we can avoid repeats
  const [usedTitles, setUsedTitles] = useState<string[]>([]);

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
  ] as const;

  function applyPreset(preset: (typeof presets)[number]) {
    setMood(preset.mood);
    setStyle(preset.style);
    setTempo(preset.tempo);
    setKey(preset.key);
    setRefs(preset.refs);
  }

  function pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function generateLocalIdeas(params: {
    mood: string;
    style: string;
    tempo: number;
    key: string;
    refs: string;
    story: string;
    usedTitles: string[];
  }): SongIdea[] {

    const starts = [
      "Learning How",
      "Trying Again",
      "Running Toward",
      "Holding On To",
      "Let Me Prove",
      "Tonight I Show",
      "If You Believe",
      "Nothing Like",
      "All My Life With",
      "This Time For",
      "Reasons To Love",
      "After The Storm Of",
    ];

    const middles = [
      " Your Heart",
      " Your Love",
      " What We Are",
      " This Feeling",
      " Your Touch",
      " Our Story",
      " The Real You",
      " The Real Us",
      " This Forever",
    ];

    const endings = [
      "",
      " Tonight",
      " For Real",
      " Again",
      " For Good",
      " (PulseNexis Draft)",
      " (Second Chance)",
    ];

    const safetyTitles: string[] = [];

    const makeTitle = () => {
      const s = pickRandom(starts);
      const m = pickRandom(middles);
      const e = pickRandom(endings);
      return `${s}${m}${e}`.trim();
    };

    const uniqueTitles: string[] = [];

    // Try a bunch of random combinations until we get 3 that
    // we haven't used before in this session.
    for (let i = 0; i < 20 && uniqueTitles.length < 3; i++) {
      const candidate = makeTitle();

      if (
        !uniqueTitles.includes(candidate) &&
        !usedTitles.includes(candidate)
      ) {
        uniqueTitles.push(candidate);
      } else {
        safetyTitles.push(candidate);
      }
    }

    // If we somehow still don't have 3, pad with any remaining titles
    while (uniqueTitles.length < 3 && safetyTitles.length > 0) {
      const candidate = safetyTitles.shift()!;
      if (!uniqueTitles.includes(candidate)) {
        uniqueTitles.push(candidate);
      }
    }

    // Final extra safety net
    while (uniqueTitles.length < 3) {
      uniqueTitles.push(
        `Untitled PulseNexis ${Date.now().toString().slice(-4)}-${
          uniqueTitles.length + 1
        }`
      );
    }

    const now = new Date().toLocaleTimeString();

    return uniqueTitles.map((title, idx) => {
      const hook = (() => {
        if (idx === 0) {
          return `“Say my name, trust this change in me / Every heartbeat proves your faith is safe with me.”`;
        }
        if (idx === 1) {
          return `“I’ll spend all night proving I’m the one / Every second, every breath, every beat says you’re my only one.”`;
        }
        return `“If this ain’t real, then why does my whole soul sound like you?”`;
      })();

      const vibe = `${style} in ${key} at ${tempo} BPM — ${moodDescriptor}. Inspired by ${refsShort}. Generated at ${now}.`;

      const structure = (() => {
        if (idx === 0) {
          return "Verse 1 (confession & setup) → Pre-chorus (tension) → Big hook with stacked harmonies → Verse 2 (details & promises) → Bridge (emotional breakdown) → Final hook with ad-libs.";
        }
        if (idx === 1) {
          return "Grown-folks arrangement: soft Rhodes + bass intro → drums enter on first hook → second hook adds choir-style backgrounds → bridge lifts the key or adds modulation → final vamp with ad-libs.";
        }
        return "Short intro → Hook first (no verse) → half-sung breakdown or spoken moment → full verse → hook out. Built for short-form performance but expandable to a full record.";
      })();

      return {
        id: idx + 1,
        title,
        hook,
        vibe,
        structure,
      };
    });
  }

  async function handleGenerate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      let finalIdeas: SongIdea[] = [];

      // Try hitting a backend if you wire up /api/song-concepts later
      try {
        const res = await fetch("/api/song-concepts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mood,
            style,
            tempo,
            key,
            refs,
            story,
            previousTitles: usedTitles,
          }),
        });

        if (res.ok) {
          const data = (await res.json()) as { ideas?: SongIdeaFromApi[] };

          const apiIdeas = (data.ideas ?? []).filter(
            (idea) =>
              idea.title &&
              !usedTitles.includes(idea.title) &&
              idea.title.trim().length > 0
          );

          if (apiIdeas.length > 0) {
            finalIdeas = apiIdeas.slice(0, 3).map((idea, index) => ({
              id: index + 1,
              title: idea.title,
              hook: idea.hookIdea,
              vibe: idea.vibe,
              structure: idea.arrangementNotes,
            }));
          } else {
            console.warn(
              "song-concepts API returned no usable ideas, using local generator instead."
            );
          }
        } else {
          console.warn(
            "song-concepts API not available (status",
            res.status,
            ") — using local generator instead."
          );
        }
      } catch (apiError) {
        // If the route doesn't exist or throws, we just fall back.
        console.warn(
          "song-concepts API call failed, using local generator instead.",
          apiError
        );
      }

      if (finalIdeas.length === 0) {
        finalIdeas = generateLocalIdeas({
          mood,
          style,
          tempo,
          key,
          refs,
          story,
          usedTitles,
        });
      }

      setIdeas(finalIdeas);
      setUsedTitles((prev) => [
        ...new Set([...prev, ...finalIdeas.map((i) => i.title)]),
      ]);
    } catch (err) {
      console.error("Unexpected error generating ideas:", err);
      const fallback = generateLocalIdeas({
        mood,
        style,
        tempo,
        key,
        refs,
        story,
        usedTitles,
      });
      setIdeas(fallback);
      setUsedTitles((prev) => [
        ...new Set([...prev, ...fallback.map((i) => i.title)]),
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleExportText() {
    if (ideas.length === 0) return;

    const lines: string[] = [];

    lines.push("PulseNexis · AI Song Creator Export");
    lines.push("==================================");
    lines.push("");
    lines.push(`Mood: ${mood}`);
    lines.push(`Style: ${style}`);
    lines.push(`Tempo (BPM): ${tempo}`);
    lines.push(`Key: ${key}`);
    lines.push(`Reference artists / songs: ${refs}`);
    lines.push("");
    lines.push("Story / concept");
    lines.push("---------------");
    lines.push(story);
    lines.push("");
    lines.push("Generated concepts");
    lines.push("------------------");
    lines.push("");

    ideas.forEach((idea, idx) => {
      lines.push(`Concept ${idx + 1}: ${idea.title}`);
      lines.push("Hook idea:");
      lines.push(idea.hook);
      lines.push("");
      lines.push("Vibe:");
      lines.push(idea.vibe);
      lines.push("");
      lines.push("Arrangement notes:");
      lines.push(idea.structure);
      lines.push("");
      lines.push("------------------------------------------------------------");
      lines.push("");
    });

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pulsenexis-song-concepts.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-purple-900/60 px-3 py-1 text-[11px] text-purple-100">
                  Drafts · Not final lyrics
                </span>
                <button
                  type="button"
                  onClick={handleExportText}
                  disabled={ideas.length === 0}
                  className="rounded-full border border-purple-400/60 bg-purple-900/40 px-3 py-1 text-[11px] font-medium text-purple-50 hover:bg-purple-700/60 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Export (.txt)
                </button>
              </div>
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
