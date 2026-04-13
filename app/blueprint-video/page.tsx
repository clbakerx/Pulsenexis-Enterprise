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

        <div className="mt-8 relative w-full" style={{ paddingTop: "56.25%" }}>
          <video
            className="absolute inset-0 w-full h-full rounded-2xl border border-zinc-800 object-cover"
            controls
            playsInline
            preload="metadata"
          >
            <source src="/demos/Leave-it-to-Me.mp4" type="video/mp4" />
          </video>
        </div>
      </section>
    </main>
  );
}