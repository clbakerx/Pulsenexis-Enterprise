import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* HERO */}
      <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
        {/* LEFT */}
        <div className="rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 p-10 text-white shadow-sm">
          <div className="text-sm font-semibold tracking-wide opacity-90">
            HONEY DRIP RECORDS
          </div>

          <h1 className="mt-4 text-5xl font-extrabold leading-tight">PULSENEXIS</h1>

          <p className="mt-4 max-w-xl text-base/7 opacity-90">
            Discover original R&amp;B + Soul music, explore licensing-ready packs, and use
            PulseNexis tools to build faster—whether you’re a creator, brand, or listener.
          </p>

          {/* Pills row */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/catalog"
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
            >
              Browse Music Catalog
            </Link>

            <Link
              href="/catalog/packs"
              className="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-black hover:bg-amber-300"
            >
              Packs
            </Link>

            {/* ✅ NEW Cinema pill */}
            <Link
              href="/cinema"
              className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Cinema
            </Link>

            <Link
              href="/catalog/packs/rnb-blueprint"
              className="rounded-full bg-blue-500 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-400"
            >
              R&amp;B Blueprint
            </Link>

            <Link
              href="/ai"
              className="rounded-full bg-fuchsia-500 px-5 py-2 text-sm font-semibold text-white hover:bg-fuchsia-400"
            >
              AI Song Creator
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/licensing"
              className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              How It Works (Licensing)
            </Link>

            <Link
              href="/support"
              className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Support
            </Link>
          </div>
        </div>

        {/* RIGHT (IMAGE HERO) */}
        <div className="relative w-full overflow-hidden rounded-3xl border bg-white">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src="/hero-studio.jpg"
              alt="Music production studio setup"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="absolute bottom-4 left-4 rounded-xl bg-black/60 px-3 py-2 text-sm text-white">
            PulseNexis • Studio Sessions
          </div>
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="mt-10 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold">1) Browse</div>
          <p className="mt-2 text-sm opacity-80">
            Explore the catalog and find the vibe you need—hooks, moods, and ready-to-use
            tracks.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold">2) Pick a Pack</div>
          <p className="mt-2 text-sm opacity-80">
            Grab licensing-ready packs built for creators who need speed: content, ads,
            promos, and more.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold">3) License</div>
          <p className="mt-2 text-sm opacity-80">
            Choose the right license tier, checkout, and you’re cleared to use it based on
            the terms.
          </p>
        </div>
      </section>
    </main>
  );
}
