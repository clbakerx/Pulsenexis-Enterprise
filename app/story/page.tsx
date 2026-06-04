import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "The PulseNexis Story | PulseNexis",
  description:
    "How a dollar-a-day music channel became PulseNexis — a music, licensing, and creator-growth platform built by Chris Baker.",
};

export default function StoryPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section className="grid gap-10 rounded-3xl bg-neutral-950 p-6 text-white lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:p-10">
        <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-amber-300/30 shadow-2xl">
          <Image
            src="/The_Dollar_A_Day_FRONT_COVER_6x9.jpg"
            alt="The PulseNexis Story book cover"
            width={600}
            height={900}
            priority
            className="h-auto w-full"
          />
        </div>

        <div>
          <div className="inline-flex rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-amber-300">
            The PulseNexis Story
          </div>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-6xl">
            How a dollar-a-day music channel became a music business.
          </h1>

          <p className="mt-5 max-w-2xl text-base/7 text-white/70">
            PulseNexis started with a simple belief: one song, one idea, and one
            consistent step could become something bigger. This is the story of
            building a music platform from passion, persistence, technology, and faith.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/packs"
              className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-neutral-950 hover:bg-amber-300"
            >
              Browse Music Packs
            </Link>

            <Link
              href="/custom-songs"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15"
            >
              Custom Songs
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-3xl">
        <div className="text-sm font-semibold uppercase tracking-wide text-amber-700">
          The Beginning
        </div>

        <h2 className="mt-3 text-3xl font-bold text-neutral-900">
          It started with the music.
        </h2>

        <div className="mt-5 space-y-5 text-base/8 text-neutral-700">
          <p>
            PulseNexis was built from years of loving music, creating songs, and
            learning how difficult it can be for independent creators to get heard.
            The problem was never just talent. The real challenge was discovery,
            marketing, licensing, consistency, and having the right tools.
          </p>

          <p>
            What began as a small music idea became a larger mission: create a place
            where original songs, creator-safe music, licensing, AI-powered tools,
            custom music, and storytelling could all work together.
          </p>

          <p>
            The dollar-a-day mindset represents the heart of PulseNexis — building
            patiently, learning daily, and turning small consistent moves into a real
            music business.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-3xl rounded-3xl border bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-neutral-900">
          What PulseNexis is building
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            "Royalty-free music for creators",
            "Commercial music licensing",
            "Custom songs for real stories",
            "AI tools for music promotion",
            "Gaming audio and loop packs",
            "Short-form video-ready music",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl bg-neutral-50 p-4 text-sm font-semibold text-neutral-700"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-3xl rounded-3xl bg-neutral-950 p-8 text-white">
        <h2 className="text-3xl font-bold">
          The story is still being written.
        </h2>

        <p className="mt-4 text-sm/7 text-white/70">
          Every song, every pack, every tool, and every release is another chapter.
          PulseNexis exists for creators who need music with emotion, purpose, and
          the freedom to post without fear.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/packs"
            className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-neutral-950 hover:bg-amber-300"
          >
            Explore PulseNexis Music
          </Link>

          <Link
            href="/"
            className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15"
          >
            Back Home
          </Link>
        </div>
      </section>
    </main>
  );
}