import Link from "next/link";

export default function GamingAudioPage() {
  return (
    <main className="bg-black text-white min-h-screen">

      {/* Hero */}
      <section className="text-center py-20 px-6">
        <h1 className="text-4xl md:text-6xl font-bold">
          PulseNexis Gaming Audio
        </h1>
        <p className="mt-4 text-gray-400 text-lg">
          Modular sound systems for futuristic worlds.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="https://fledn.com/ldxHrdHcf3tV7YntUkvw8R0/Games/NeonSyndicate/NeonSydicate_Demo.mp3"
            className="bg-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-500 transition"
          >
            🎧 Listen to Demo
          </a>

          <a
            href="https://cushyc.gumroad.com/l/hwrbq?_gl=1*1wykmoo*_ga*MTI3MzEyOTMwNC4xNzcwOTEyNzM3*_ga_6LJN6D94N6*czE3NzA5MzA0NTYkbzIkZzEkdDE3NzA5MzA1NjgkajMyJGwwJGgw"
            target="_blank"
            className="border border-purple-500 px-6 py-3 rounded-lg font-semibold hover:bg-purple-900 transition"
          >
            🛒 Get Neon Syndicate Vol. 1
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 px-10 py-20 bg-zinc-900">
        <div>
          <h3 className="text-xl font-bold">Modular</h3>
          <p className="text-gray-400 mt-2">
            Isolated stems designed for adaptive layering during gameplay.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold">Loop-Ready</h3>
          <p className="text-gray-400 mt-2">
            Clean 8 & 16 bar loops built for seamless engine playback.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold">Engine-Friendly</h3>
          <p className="text-gray-400 mt-2">
            Optimized exports for Unity, Unreal, and indie pipelines.
          </p>
        </div>
      </section>

      {/* Roadmap */}
      <section className="text-center py-16">
        <h2 className="text-3xl font-bold">Vol. 2 Coming Soon</h2>
        <p className="text-gray-400 mt-4">
          Expanding the Neon Syndicate universe with new intensity layers.
        </p>
      </section>

    </main>
  );
}
