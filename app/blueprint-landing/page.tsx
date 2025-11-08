"use client";
import React from "react";
import { motion } from "framer-motion";

export default function BlueprintLandingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.25),transparent_60%)]"/>
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-center gap-10"
          >
            <div className="flex-1">
              <p className="uppercase tracking-widest text-xs text-zinc-400">PulseNexis Feature</p>
              <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold leading-tight">
                Create R&B That <span className="text-yellow-400">Feels Like Forever</span>
              </h1>
              <p className="mt-4 text-zinc-300 max-w-2xl">
                The <span className="font-semibold">PulseNexis R&B Song Creation Blueprint™</span> is your guided framework to
                plan, write, and produce records with the emotional depth and polish of modern legends.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="/rnb-blueprint" className="inline-flex items-center justify-center rounded-2xl bg-yellow-400 text-black px-5 py-3 font-semibold shadow hover:opacity-90">
                  Try the Blueprint
                </a>
              </div>
              <div className="mt-5 text-sm text-zinc-500">No account needed to try. Save/print/export when you’re ready.</div>
            </div>

            {/* Mock UI card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex-1 w-full"
            >
              <div className="bg-zinc-950/70 backdrop-blur rounded-3xl border border-zinc-800 shadow-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-3 w-3 rounded-full bg-red-500"/>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"/>
                  <div className="h-3 w-3 rounded-full bg-green-500"/>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Title" value="When I Get You Home"/>
                  <Field label="Mood / Emotion" value="Romantic • Confident • Soulful"/>
                  <Field label="Tempo (BPM)" value="82"/>
                  <Field label="Key / Scale" value="A♭ Major"/>
                  <Field label="Outline" value="Intro → Verse → Pre → Chorus → Verse → Bridge → Final" className="sm:col-span-2"/>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What It Is */}
      <section className="border-t border-zinc-900 bg-zinc-950/40">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl sm:text-3xl font-bold">Structure for Your Soul</h2>
            <p className="mt-3 text-zinc-300 max-w-3xl">
              Capture raw emotion and turn it into intentional art. The Blueprint guides you through identity, musical
              foundation, lyric craft, vocal harmony, and production direction — before you ever open your DAW.
            </p>
          </motion.div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <Feature title="Emotional Clarity" desc="Define concept, theme, and listener emotion so your story lands."/>
            <Feature title="Musical Structure" desc="Lock tempo, key, harmony ideas, and instrumentation with purpose."/>
            <Feature title="Lyric Blueprint" desc="Map verses, hooks, and bridges with guided prompts that keep you focused."/>
            <Feature title="Vocal Harmony Plan" desc="Lead, 3rds/5ths, falsetto layers, and ad‑libs — arranged like a pro."/>
            <Feature title="Studio Integration" desc="Autosave to browser, export/import JSON, and print for your session."/>
            <Feature title="Creator Ready" desc="Built for indie artists, producers, and songwriters with industry goals."/>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Why It Matters</h2>
              <p className="mt-3 text-zinc-300">
                R&B isn’t dead — it just needs direction. The PulseNexis Blueprint brings structure back to soul music so
                your songs sound timeless, feel honest, and move people.
              </p>
              <ul className="mt-6 space-y-2 text-zinc-300 list-disc list-inside">
                <li>Stay consistent across projects and collaborators</li>
                <li>Cut pre‑production time and studio confusion</li>
                <li>Make intentional choices listeners can feel</li>
              </ul>
              <div className="mt-8 flex gap-3">
                <a href="/rnb-blueprint" className="inline-flex items-center justify-center rounded-2xl bg-yellow-400 text-black px-5 py-3 font-semibold shadow hover:opacity-90">Start Your Blueprint</a>
                <a href="https://app.pulsenexis.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-2xl border border-zinc-700 px-5 py-3 font-semibold hover:bg-zinc-900">Join PulseNexis Creators</a>
              </div>
            </div>
            <div className="bg-zinc-950/60 rounded-3xl border border-zinc-800 p-6">
              <h3 className="text-lg font-semibold">What You’ll Plan</h3>
              <dl className="mt-4 grid sm:grid-cols-2 gap-4 text-zinc-300">
                <Item k="Identity" v="Title, theme, mood, audience, references"/>
                <Item k="Musical" v="Tempo, key, time, instrumentation"/>
                <Item k="Lyrics" v="Hook, POV, tense, section goals"/>
                <Item k="Vocals" v="Lead, harmony stacks, falsetto, ad‑libs"/>
                <Item k="Production" v="Vibe refs, mix notes, dynamics"/>
                <Item k="Emotion" v="Listener takeaway — what they should feel"/>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Designed for PulseNexis Artists */}
      <section className="border-t border-zinc-900 bg-zinc-950/40">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold">Designed for PulseNexis Artists</h2>
          <p className="mt-3 text-zinc-300 max-w-3xl">
            Pair your Blueprint with PulseNexis licensing and distribution tools. Secure your creative identity, generate
            ready‑to‑share demos, and present blueprinted ideas to collaborators or sync buyers.
          </p>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Card title="Inspiration Mode" desc="Start fresh with prompts that turn feelings into songs."/>
            <Card title="Reference Mode" desc="Reverse‑engineer a PulseNexis track’s structure for learning."/>
            <Card title="Studio Mode" desc="Export JSON or print for engineers, co‑writers, and A&R."/>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">Write with purpose. Create with soul. Build with PulseNexis.</h2>
          <div className="mt-6 flex justify-center gap-3">
            <a href="/rnb-blueprint" className="inline-flex items-center justify-center rounded-2xl bg-yellow-400 text-black px-6 py-3 font-semibold shadow hover:opacity-90">Start Your Blueprint</a>
            <a href="/contact" className="inline-flex items-center justify-center rounded-2xl border border-zinc-700 px-6 py-3 font-semibold hover:bg-zinc-900">Talk to Our Team</a>
          </div>
          <p className="mt-4 text-sm text-zinc-500">© {new Date().getFullYear()} PulseNexis. R&B Song Creation Blueprint™</p>
        </div>
      </section>
    </main>
  );
}

function Field({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={`rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 ${className}`}>
      <div className="text-xs uppercase tracking-wider text-zinc-400">{label}</div>
      <div className="mt-1 font-semibold">{value}</div>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5"
    >
      <div className="text-yellow-400 font-semibold">{title}</div>
      <p className="mt-1 text-zinc-300 text-sm">{desc}</p>
    </motion.div>
  );
}

function Item({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
      <div className="text-xs text-zinc-400">{k}</div>
      <div className="font-medium">{v}</div>
    </div>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6">
      <div className="text-lg font-semibold text-yellow-400">{title}</div>
      <p className="mt-1 text-zinc-300 text-sm">{desc}</p>
    </div>
  );
}
