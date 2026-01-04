export default function CreatorPacksPage() {
  const packs = [
    { name: "Love Sessions Pack", items: "5 hooks + 5 instrumentals + cutdowns" },
    { name: "R&B Money Pack", items: "10 tracks for TikTok/Shorts + 30-sec edits" },
    { name: "Wedding & Vows Pack", items: "Romantic ballads for reels + ceremonies" },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-10 py-12">
      <h1 className="text-3xl font-bold mb-6">Creator Packs</h1>

      <div className="grid gap-4 md:grid-cols-3">
        {packs.map((p) => (
          <div key={p.name} className="rounded-xl border border-white/10 p-5">
            <div className="text-xl font-bold">{p.name}</div>
            <p className="mt-3 text-white/70">{p.items}</p>
            <button className="mt-4 w-full bg-yellow-300 text-black py-2 rounded-xl font-bold">
              View Pack
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
