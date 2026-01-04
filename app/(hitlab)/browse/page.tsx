import { HITLAB_SONGS } from "@/lib/hitlabCatalog";

export default function BrowsePage() {
  return (
    <main className="min-h-screen bg-black text-white px-10 py-12">
      <h1 className="text-3xl font-bold mb-2">Browse Music</h1>
      <p className="text-white/70 mb-8">
        Preview emotional R&B and license instantly.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {HITLAB_SONGS.map((song) => (
          <a
            key={song.slug}
            href={`/song/${song.slug}`}
            className="rounded-xl border border-white/10 p-5 hover:bg-white/5"
          >
            <div className="text-xl font-bold">{song.title}</div>
            <div className="mt-2 text-white/70">{song.vibe}</div>
            <div className="mt-3 text-sm text-yellow-300">
              Creator ${song.priceCreator} • Business ${song.priceBusiness}
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
