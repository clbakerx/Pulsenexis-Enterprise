import Link from "next/link";
import { PACKS } from "../packs";

export default function PackDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const pack = PACKS.find((p) => p.slug === params.slug);

  if (!pack) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-extrabold">Pack not found</h1>
        <p className="mt-2 text-sm opacity-80">That pack slug doesn’t exist yet.</p>
        <Link className="mt-6 inline-block underline" href="/catalog/packs">
          Back to Packs
        </Link>
      </main>
    );
  }

  // ✅ Safe optional fields (won't break TypeScript even if Pack type doesn't include them yet)
  const bpmRange = "bpmRange" in pack ? (pack as any).bpmRange : undefined;
  const mood = "mood" in pack ? (pack as any).mood : undefined;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link className="text-sm font-semibold underline" href="/catalog/packs">
        ← Back to Packs
      </Link>

      <h1 className="mt-4 text-4xl font-extrabold">{pack.title}</h1>
      <p className="mt-3 text-base opacity-80">{pack.description}</p>

      <div className="mt-6 grid gap-3 rounded-2xl border bg-white p-6">
        <div className="text-sm">
          <span className="font-semibold">Genre:</span> {pack.genre.toUpperCase()}
        </div>

        {bpmRange ? (
          <div className="text-sm">
            <span className="font-semibold">BPM Range:</span> {bpmRange}
          </div>
        ) : null}

        {mood ? (
          <div className="text-sm">
            <span className="font-semibold">Mood:</span> {mood}
          </div>
        ) : null}
      </div>

      {/* Placeholder CTA */}
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          View Licensing Options
        </button>

        <button
          type="button"
          className="rounded-full border px-5 py-2 text-sm font-semibold hover:bg-black/5"
        >
          Preview Audio
        </button>
      </div>
    </main>
  );
}
