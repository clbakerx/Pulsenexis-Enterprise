export const metadata = {
  title: "Blueprint – How It Works | PulseNexis",
  description: "Watch the walkthrough for the R&B Song Creation Blueprint.",
};

export default function BlueprintVideoPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold">How the Blueprint Works</h1>
        <p className="text-zinc-400 mt-2">
          A quick tour of planning identity, musical structure, lyrics, harmonies, and production.
        </p>

        {/* YouTube (replace VIDEO_ID) */}
        <div className="mt-8 relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full rounded-2xl border border-zinc-800"
            src="https://www.youtube.com/embed/VIDEO_ID?rel=0"
            title="PulseNexis Blueprint Tutorial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>
    </main>
  );
}
