import { HITLAB_SONGS } from "@/lib/hitlabCatalog";

export default function SongPage({ params }: { params: { slug: string } }) {
  const song = HITLAB_SONGS.find((s) => s.slug === params.slug);

  if (!song) {
    return (
      <main className="min-h-screen bg-black text-white px-10 py-12">
        <h1 className="text-2xl font-bold">Song not found</h1>
        <a className="text-yellow-300 underline" href="/browse">Back to Browse</a>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-10 py-12">
      <a className="text-yellow-300 underline" href="/browse">← Back</a>

      <h1 className="mt-4 text-4xl font-bold">{song.title}</h1>
      <p className="mt-2 text-white/70">{song.vibe}</p>

      <div className="mt-4 text-white/60 text-sm">
        {song.bpm ? `BPM: ${song.bpm}` : ""} {song.key ? ` • Key: ${song.key}` : ""}
      </div>

      {song.previewUrl ? (
        <div className="mt-8">
          <p className="mb-2 text-white/70">Preview</p>
          <audio controls className="w-full">
            <source src={song.previewUrl} />
          </audio>
        </div>
      ) : (
        <p className="mt-8 text-white/60">
          Preview link not added yet.
        </p>
      )}

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="border border-white/10 p-5 rounded-xl">
          <div className="text-xl font-bold">Creator</div>
          <div className="mt-2 text-yellow-300 font-semibold">${song.priceCreator}</div>
          <p className="mt-3 text-white/70">Social, YouTube, podcasts, personal projects.</p>
          <button className="mt-4 w-full bg-yellow-300 text-black py-2 rounded-xl font-bold">
            Buy Creator
          </button>
        </div>

        <div className="border border-white/10 p-5 rounded-xl">
          <div className="text-xl font-bold">Business</div>
          <div className="mt-2 text-yellow-300 font-semibold">${song.priceBusiness}</div>
          <p className="mt-3 text-white/70">Ads, brands, monetized client work.</p>
          <button className="mt-4 w-full bg-yellow-300 text-black py-2 rounded-xl font-bold">
            Buy Business
          </button>
        </div>

        <div className="border border-white/10 p-5 rounded-xl">
          <div className="text-xl font-bold">Exclusive</div>
          <div className="mt-2 text-yellow-300 font-semibold">${song.priceExclusive}+</div>
          <p className="mt-3 text-white/70">One buyer. Track removed from store.</p>
          <button className="mt-4 w-full bg-yellow-300 text-black py-2 rounded-xl font-bold">
            Request Exclusive
          </button>
        </div>
      </div>
    </main>
  );
}
