"use client";

import { useState } from "react";
import Link from "next/link";

const BOOK_URL = "https://www.amazon.com/dp/B0H4DZ4YJ8";

// ─── Simplified, client-side version of Nova's qualification logic ──────────
// This mirrors the *idea* of how Nova scores a lead — it runs in the browser,
// makes zero API calls, and costs nothing. The real Nova lives at /api/chat.
const SIGNALS = {
  hot: {
    weight: 3,
    label: "buying intent",
    terms: ["license","licensing","commercial","budget","pricing","how much","price","buy","purchase","invoice","checkout","ready","deadline","this week","today","need it","get started","sign me up","sign up"],
  },
  warm: {
    weight: 2,
    label: "curiosity",
    terms: ["interested","considering","thinking about","tell me more","what do you offer","could work","might","maybe","options","sample","demo","how does"],
  },
  cold: {
    weight: -2,
    label: "low intent",
    terms: ["just looking","just browsing","just curious","not sure","someday","no rush","free only","just free","not buying","window shopping"],
  },
};

const EXAMPLES = [
  { label: "An urgent buyer", text: "Hey, I need a commercial license for a YouTube ad going live this week — what's your pricing?" },
  { label: "A curious creator", text: "These beats sound great. Tell me more about what you offer for TikTok edits?" },
  { label: "A casual browser", text: "just looking around, not really buying anything, are these free?" },
];

function analyze(input: string) {
  const t = input.toLowerCase();
  const caught = [];
  let score = 0;

  for (const [tier, cfg] of Object.entries(SIGNALS)) {
    for (const term of cfg.terms) {
      if (t.includes(term)) {
        caught.push({ tier, term, label: cfg.label });
        score += cfg.weight;
      }
    }
  }

  let verdict;
  if (score >= 3) verdict = "HOT";
  else if (score >= 1) verdict = "WARM";
  else verdict = "COLD";

  return { verdict, caught, score };
}

const VERDICTS = {
  HOT: {
    ring: "border-rose-400/40 bg-rose-500/10",
    dot: "bg-rose-400",
    text: "text-rose-300",
    headline: "Route to checkout — now.",
    move: "Real intent plus urgency. Nova drops the small talk, confirms the use case, and sends them straight to a Stripe checkout link.",
  },
  WARM: {
    ring: "border-amber-400/40 bg-amber-500/10",
    dot: "bg-amber-400",
    text: "text-amber-300",
    headline: "Nurture, don't push.",
    move: "Interest without commitment. Nova answers the question, offers a free sample, and captures an email for the welcome sequence.",
  },
  COLD: {
    ring: "border-sky-400/40 bg-sky-500/10",
    dot: "bg-sky-400",
    text: "text-sky-300",
    headline: "Keep it light.",
    move: "Low intent for now. Nova stays friendly, hands over a free-beats link, and never hard-sells someone who isn't ready.",
  },
};

const STEPS = [
  { n: "01", title: "Give it one job", body: "Nova doesn't try to do everything. It does exactly one thing — decide if a visitor is Hot, Warm, or Cold. Narrow it down until the job fits on a single line." },
  { n: "02", title: "Write the judgment down first", body: "Before any code, I wrote out the signals a good salesperson reads on instinct: urgency, a specific need, a budget mention. The rules came before the program." },
  { n: "03", title: "Give it your voice", body: "Nova's instructions are really just me, on paper, explaining how I'd talk to a buyer — patient with the curious, direct with the ready, never pushy with the cold." },
  { n: "04", title: "Let it act, not just talk", body: "A score with no follow-through is useless. Hot leads get a checkout link, warm leads get a free sample, cold leads get a no-pressure download. Every verdict has a next move." },
  { n: "05", title: "Watch it, then adjust", body: "I read what real visitors said and tuned the signals over time. One disciplined pass at a time — the same way the whole channel got built." },
];

export default function HowIBuiltNovaPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [thinking, setThinking] = useState(false);

  function run(text) {
    const value = text ?? input;
    if (!value.trim()) return;
    setInput(value);
    setResult(null);
    setThinking(true);
    setTimeout(() => {
      setResult(analyze(value));
      setThinking(false);
    }, 650);
  }

  const v = result ? VERDICTS[result.verdict] : null;

  return (
    <div className="bg-[#0b0b14] text-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* ── Hero ───────────────────────────────────────────── */}
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">
          Behind the build
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
          How I built <span className="text-violet-300">Nova</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
          Nova is the little AI that greets visitors on PulseNexis and quietly
          decides who's ready to buy. Here's a taste of how it works — and how a
          solo builder put it together, one step at a time.
        </p>

        {/* ── Interactive demo (the taste) ───────────────────── */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            Try it — send Nova a message
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3}
            placeholder="Type what a visitor might say…"
            className="mt-4 w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-violet-400/50"
          />

          <div className="mt-3 flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                type="button"
                onClick={() => run(ex.text)}
                className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-xs text-white/70 transition hover:border-violet-400/40 hover:text-white"
              >
                {ex.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => run()}
            disabled={thinking || !input.trim()}
            className="mt-5 w-full rounded-2xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {thinking ? "Nova is reading…" : "See how Nova scores it"}
          </button>

          {/* Verdict */}
          {result && v && (
            <div className={`mt-6 rounded-2xl border ${v.ring} p-5`}>
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${v.dot}`} />
                <span className={`text-sm font-bold tracking-wide ${v.text}`}>
                  {result.verdict} LEAD
                </span>
              </div>
              <p className="mt-3 text-base font-semibold text-white">
                {v.headline}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/70">
                {v.move}
              </p>

              {result.caught.length > 0 && (
                <div className="mt-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                    Signals Nova caught
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {result.caught.map((c, i) => (
                      <span
                        key={`${c.term}-${i}`}
                        className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/70"
                      >
                        “{c.term}” · {c.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <p className="mt-5 text-xs leading-relaxed text-white/40">
            This is a simplified, in-browser version of Nova's logic — no data
            leaves your screen. The real Nova reasons with more nuance, but the
            idea is exactly this: read the signals, pick the next move.
          </p>
        </div>

        {/* ── The build, step by step ────────────────────────── */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold md:text-3xl">
            The build, one step at a time
          </h2>
          <div className="mt-8 space-y-8">
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-5">
                <div className="shrink-0 text-sm font-semibold text-violet-300/80">
                  {s.n}
                </div>
                <div>
                  <div className="text-base font-semibold text-white">
                    {s.title}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Book CTA ───────────────────────────────────────── */}
        <div className="mt-16 rounded-3xl border border-amber-300/20 bg-amber-400/[0.06] p-7 md:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
            The full playbook
          </p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight md:text-3xl">
            Nova is one chapter. The whole method is in the book.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70">
            <em>The Dollar-A-Day Music Channel</em> is the honest, step-by-step
            story of how PulseNexis got built — every system, every misstep,
            written for anyone wondering if they can build something real on
            their own. If you can read it, you can do it.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-amber-300"
            >
              Get the book on Amazon
            </Link>
            <Link
              href="/story"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Read the story
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
