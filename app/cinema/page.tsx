import Link from "next/link";
import { CINEMA_PACKS } from "@/lib/cinemaCatalog";

export const metadata = {
  title: "Cinema | PulseNexis",
  description: "Cinematic scores and trailer-ready music by PulseNexis.",
};

export default function CinemaPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">Cinema</h1>
        <p className="mt-2 text-sm opacity-80">
          Trailer-ready cues, tension beds, and reveal moments — built for creators.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {CINEMA_PACKS.map((p) => (
          <Link
            key={p.slug}
            href={`/cinema/${p.slug}`}
            className="rounded-2xl border p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold">{p.name}</div>
                <div className="mt-1 text-sm opacity-80">{p.tagline}</div>
                <div className="mt-3 text-sm opacity-80">{p.description}</div>
              </div>
              <div className="text-xs rounded-full border px-3 py-1 opacity-80">
                View
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
