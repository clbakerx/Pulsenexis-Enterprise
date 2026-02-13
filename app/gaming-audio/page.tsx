import Link from "next/link";

const DEMO_URL =
  "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Games/NeonSyndicate/NeonSydicate_Demo.mp3";

const BG_URL =
  "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Games/NeonSyndicate/NeonSyndicate_600.png";

const GUMROAD_URL =
  "https://cushyc.gumroad.com/l/hwrbq?_gl=1*1wykmoo*_ga*MTI3MzEyOTMwNC4xNzcwOTEyNzM3*_ga_6LJN6D94N6*czE3NzA5MzA0NTYkbzIkZzEkdDE3NzA5MzA1NjgkajMyJGwwJGgw";

export default function GamingAudioPage() {
  return (
    <main className="relative min-h-screen text-white">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${BG_URL}")` }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-6 py-20 text-center">
          <p className="text-sm font-semibold tracking-widest text-white/80">
            PULSENEXIS GAMING AUDIO
          </p>

          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold">
            Neon Syndicate
            <span className="block mt-2 text-2xl font-semibold text-white/80 md:text-3xl">
              Game Audio Pack Vol. 1
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-white/80 md:text-lg">
            Modular, loop-ready music systems built for futuristic worlds — clean
            loop points, intensity layers, and engine-friendly exports.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#demo"
              className="rounded-full bg-purple-600 px-6 py-3 font-semibold transition hover:bg-purple-500"
            >
              🎧 Listen to Demo
            </a>

            <a
              href={GUMROAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-purple-400 bg-black/30 px-6 py-3 font-semibold transition hover:bg-black/50"
            >
              🛒 Get Neon Syndicate Vol. 1
            </a>

            <Link
              href="/"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold transition hover:bg-white/20"
            >
              ← Back to PulseNexis
            </Link>
          </div>

          {/* Audio player */}
          <div
            id="demo"
            className="mx-auto mt-10 max-w-2xl rounded-2xl border border-white/15 bg-black/50 p-5 backdrop-blur"
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <div className="text-left">
                <div className="text-sm font-semibold">Neon Syndicate Demo</div>
                <div className="text-xs text-white/70">Streaming preview (MP3)</div>
              </div>

              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-purple-300 underline underline-offset-4 hover:text-purple-200"
              >
                Open in new tab
              </a>
            </div>

            <audio controls preload="none" className="w-full">
              <source src={DEMO_URL} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur">
              <h3 className="text-xl font-bold">Modular</h3>
              <p className="mt-2 text-white/70">
                Isolated stems designed for adaptive layering during gameplay.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur">
              <h3 className="text-xl font-bold">Loop-Ready</h3>
              <p className="mt-2 text-white/70">
                Clean 8 & 16 bar loops built for seamless engine playback.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur">
              <h3 className="text-xl font-bold">Engine-Friendly</h3>
              <p className="mt-2 text-white/70">
                Optimized exports for Unity, Unreal, and indie pipelines.
              </p>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="mx-auto max-w-5xl px-6 pb-20 text-center">
          <h2 className="text-3xl font-bold">Vol. 2 Coming Soon</h2>
          <p className="mt-3 text-white/70">
            Expanding the Neon Syndicate universe with new intensity layers.
          </p>
        </section>
      </div>
    </main>
  );
}
