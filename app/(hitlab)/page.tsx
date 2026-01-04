export default function HitLabHome() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm uppercase tracking-widest text-white/60">
          HoneyDrip Records • PulseNexis HitLab
        </p>

        <h1 className="mt-6 text-5xl font-bold">
          Turn Songs into <span className="text-yellow-300">Licensed Wins</span>
        </h1>

        <p className="mt-6 max-w-xl text-white/70">
          Royalty-free R&B & Soul for creators, brands, and film. Preview. License. Download.
        </p>

        <div className="mt-10 flex gap-4">
          <a href="/browse" className="rounded-xl bg-yellow-300 px-6 py-3 font-bold text-black">
            Browse Music
          </a>
          <a href="/licenses" className="rounded-xl border border-white/20 px-6 py-3">
            Licensing
          </a>
          <a href="/creator-packs" className="rounded-xl border border-white/20 px-6 py-3">
            Creator Packs
          </a>
        </div>
      </div>
    </main>
  );
}
