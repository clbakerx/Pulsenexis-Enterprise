"use client";

import { useState } from "react";

const contactReasons = [
  "Custom love song order",
  "Anniversary or proposal song",
  "Apology or reconciliation song",
  "Memorial or tribute song",
  "Business jingle or intro music",
  "General PulseNexis question",
];

const projectTypes = [
  "Custom love song",
  "Anniversary song",
  "Proposal song",
  "Apology song",
  "Memorial tribute",
  "Business jingle / intro",
  "Other",
];

type FormState = "idle" | "loading" | "success" | "error";

const TIER_LABELS: Record<string, string> = {
  starter: "Starter ($149)",
  signature: "Signature ($399)",
  exclusive: "Exclusive ($999)",
};

function ContactForm({ paid, tier }: { paid?: boolean; tier?: string }) {
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const projectType = fd.get("projectType")?.toString() ?? "";
    const deadline = fd.get("deadline")?.toString() ?? "";
    const story = fd.get("story")?.toString() ?? "";
    const style = fd.get("style")?.toString() ?? "";

    const messageParts = [
      story,
      deadline ? `Deadline: ${deadline}` : null,
      style ? `Preferred style: ${style}` : null,
    ].filter(Boolean).join("\n\n");

    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      subject: projectType || "Custom Song Request",
      message: messageParts,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      } else {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      }
    } catch {
      setErrorMsg("Could not send your request. Please email us directly at info@pulsenexis.com.");
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      {paid && (
        <div className="col-span-full rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-6 py-4">
          <p className="font-semibold text-emerald-300">
            Payment confirmed{tier && TIER_LABELS[tier] ? ` — ${TIER_LABELS[tier]}` : ""}
          </p>
          <p className="mt-1 text-sm text-neutral-300">
            Fill out the form below so we can start building your song.
          </p>
        </div>
      )}

      <div className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <h2 className="text-2xl font-bold">Before you reach out</h2>
          <p className="mt-4 leading-7 text-neutral-300">
            The more detail you share, the better we can shape the song around
            the emotion, occasion, and message you want them to feel.
          </p>

          <div className="mt-8 space-y-4">
            {contactReasons.map((reason) => (
              <div key={reason} className="flex gap-3 text-sm text-neutral-200">
                <span className="text-pink-300">✓</span>
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-pink-400/30 bg-pink-500/10 p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-pink-300">
            Quick contact
          </p>
          <h3 className="mt-4 text-2xl font-bold">Prefer email?</h3>
          <p className="mt-3 text-neutral-300">
            Send your song idea, deadline, and best contact email.
          </p>
          <a
            href="mailto:info@pulsenexis.com?subject=Custom%20Song%20Request"
            className="mt-6 inline-flex rounded-full bg-pink-500 px-6 py-3 font-semibold text-white transition hover:bg-pink-400"
          >
            Email PulseNexis
          </a>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
        <h2 className="text-3xl font-bold">Start the conversation</h2>
        <p className="mt-3 text-neutral-300">
          Tell us what you need and we&apos;ll help you find the right package.
        </p>

        {status === "success" ? (
          <div className="mt-8 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6 text-center">
            <p className="text-lg font-semibold text-emerald-300">Request sent!</p>
            <p className="mt-2 text-sm text-neutral-300">
              We&apos;ll get back to you within 24–48 hours.
            </p>
          </div>
        ) : (
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-neutral-200">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-white outline-none transition placeholder:text-neutral-500 focus:border-pink-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-200">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-white outline-none transition placeholder:text-neutral-500 focus:border-pink-400"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-neutral-200">
                  Project type
                </label>
                <select
                  name="projectType"
                  required
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-white outline-none transition focus:border-pink-400"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  {projectTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-200">
                  Deadline
                </label>
                <input
                  type="text"
                  name="deadline"
                  placeholder="Example: June 15"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-white outline-none transition placeholder:text-neutral-500 focus:border-pink-400"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-200">
                Tell us the story
              </label>
              <textarea
                name="story"
                required
                rows={6}
                placeholder="Who is the song for? What happened? What feeling should the song capture? Include names, memories, phrases, or details you want in the song."
                className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-white outline-none transition placeholder:text-neutral-500 focus:border-pink-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-200">
                Preferred mood or style
              </label>
              <input
                type="text"
                name="style"
                placeholder="Romantic R&B, soulful, joyful, emotional, gospel-inspired, etc."
                className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-white outline-none transition placeholder:text-neutral-500 focus:border-pink-400"
              />
            </div>

            {status === "error" && (
              <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-full bg-pink-500 px-8 py-4 font-semibold text-white shadow-lg shadow-pink-500/25 transition hover:bg-pink-400 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending…" : "Send My Request"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ContactPage({ paid, tier }: { paid?: boolean; tier?: string }) {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="relative overflow-hidden px-6 py-20 sm:py-28 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,114,182,0.28),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.16),transparent_35%)]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-pink-300">
              Contact PulseNexis
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Tell us the story behind the song.
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-200 sm:text-xl">
              Have a custom song idea, question, or special deadline? Send the
              details and we&apos;ll help you choose the right package or next step.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <ContactForm paid={paid} tier={tier} />
      </section>

      <section className="px-6 pb-20 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center sm:p-12">
          <h2 className="text-3xl font-bold">Ready to order now?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-300">
            If you already know you want a custom song, go straight to the
            package page and start your order.
          </p>
          <a
            href="/custom-songs#packages"
            className="mt-8 inline-flex rounded-full bg-white px-8 py-4 font-semibold text-neutral-950 transition hover:bg-neutral-200"
          >
            View Custom Song Packages
          </a>
        </div>
      </section>
    </main>
  );
}
