import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "The PulseNexis Story | PulseNexis",
  description:
    "How a dollar-a-day music channel became PulseNexis — a music, licensing, creator-growth platform, and published book by Chris Baker.",
};

export default function StoryPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section className="grid gap-10 rounded-3xl bg-neutral-950 p-6 text-white lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:p-10">
        <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-amber-300/30 shadow-2xl">
          <Image
            src="/The_Dollar_A_Day_FRONT_COVER_6x9.jpg"
            alt="The Dollar a Day Dream book cover"
            width={600}
            height={900}
            priority
            className="h-auto w-full"
          />
        </div>

        <div>
          <div className="inline-flex rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-amber-300">
            Published on Amazon
          </div>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-6xl">
            The Dollar a Day Dream
            <span className="block text-amber-300 text-2xl sm:text-3xl mt-2">
              The Story Behind PulseNexis
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base/7 text-white/70">
            PulseNexis started with a simple belief: one song, one idea, and one
            consistent step could become something bigger. What began as a
            dollar-a-day music experiment evolved into a music platform focused
            on licensing, creator growth, technology, and opportunity.
          </p>

          <p className="mt-4 max-w-2xl text-base/7 text-white/70">
            Now that journey has been published in{" "}
            <strong className="text-white">The Dollar a Day Dream</strong>,
            sharing the lessons, challenges, faith, persistence, and vision that
            helped build PulseNexis.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://www.amazon.com/dp/B0H4DZ4YJ8"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-amber-300"
            >
              Buy the Book on Amazon
            </a>

            <Link
              href="/packs"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Browse Music Packs
            </Link>

            <Link
              href="/custom-songs"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
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
          It started with one idea.
        </h2>

        <div className="mt-5 space-y-5 text-base/8 text-neutral-700">
          <p>
            PulseNexis was built from years of loving music, writing songs, and
            learning firsthand how difficult it can be for independent creators
            to get discovered. Talent alone was never enough. The real challenge
            was marketing, licensing, consistency, audience growth, and having
            the right tools.
          </p>

          <p>
            What started as a small music project eventually became a larger
            mission: create a platform where original songs, creator-safe music,
            licensing opportunities, AI-powered tools, custom music, and
            storytelling could work together.
          </p>

          <p>
            The dollar-a-day mindset represents the heart of PulseNexis —
            building patiently, learning daily, and proving that small,
            consistent actions can create something much bigger over time.
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

      <section className="mx-auto mt-12 max-w-3xl rounded-3xl border border-amber-200 bg-amber-50 p-8">
        <h2 className="text-2xl font-bold text-neutral-900">
          Read the Full Story
        </h2>

        <p className="mt-4 text-neutral-700">
          Discover how a simple idea, a passion for music, and a commitment to
          daily progress evolved into PulseNexis. Learn the lessons, setbacks,
          victories, and mindset that helped turn a dream into a growing music
          business.
        </p>

        <a
          href="https://www.amazon.com/dp/B0H4DZ4YJ8"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          Get the Book on Amazon →
        </a>
      </section>

      <section className="mx-auto mt-12 max-w-3xl rounded-3xl bg-neutral-950 p-8 text-white">
        <h2 className="text-3xl font-bold">
          The story is still being written.
        </h2>

        <p className="mt-4 text-sm/7 text-white/70">
          Every song, every pack, every tool, and every release is another
          chapter. PulseNexis exists for creators who need music with emotion,
          purpose, and the freedom to create without limits.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/packs"
            className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-neutral-950 hover:bg-amber-300"
          >
            Explore PulseNexis Music
          </Link>

          <a
            href="https://www.amazon.com/dp/B0H4DZ4YJ8"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15"
          >
            Buy the Book
          </a>

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