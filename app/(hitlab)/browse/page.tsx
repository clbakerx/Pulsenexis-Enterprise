export default function BrowsePage() {
  const songs = ["How Many Love Songs", "Loud and Clear", "Morning Perfection"];

  return (
    <main className="min-h-screen bg-black text-white px-10 py-12">
      <h1 className="text-3xl font-bold mb-6">Browse Music</h1>

      <div className="grid gap-4 md:grid-cols-3">
        {songs.map((s) => (
          <a
            key={s}
            href={`/song/${s.toLowerCase().replace(/ /g, "-")}`}
            className="rounded-xl border border-white/10 p-5 hover:bg-white/5"
          >
            {s}
          </a>
        ))}
      </div>
    </main>
  );
}
