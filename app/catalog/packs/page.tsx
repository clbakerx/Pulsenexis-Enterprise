import Link from "next/link";
import { packs } from "@/data/packs";

export default function PacksPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">Packs</h1>
        <p className="text-base opacity-80">
          Content-ready music kits—loopable, cut down, and labeled—so creators can publish fast
          without copyright headaches.
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          <Link className="underline" href="/custom-music-kits">Need a custom kit?</Link>
          <span className="opacity-60">•</span>
          <Link className="underline" href="/licensing">View licensing</Link>
          <span className="opacity-60">•</span>
          <Link className="underline" href="/catalog/tracks">Browse tracks</Link>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {packs.map((pack) => (
          <article key={pack.slug} className="rounded-2xl border p-5 shadow-sm">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold">{pack.title}</h2>
              <p className="text-sm opacity-80">{pack.shortDescription}</p>

              <div className="flex flex-wrap gap-2 pt-1">
                {pack.tags.map((t) => (
                  <span key={t} className="rounded-full border px-2 py-1 text-xs opacity-80">
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-3">
                <audio controls preload="none" className="w-full">
                  <source src={pack.previewUrl} />
                </audio>
              </div>

              <div className="pt-3">
                <div className="text-sm font-medium">What’s included</div>
                <ul className="mt-2 list-disc pl-5 text-sm opacity-85">
                  {pack.includesSummary.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2">
                <Link
                  href={`/catalog/packs/${pack.slug}`}
                  className="rounded-xl border px-4 py-2 text-center text-sm hover:opacity-90"
                >
                  View pack details & buy
                </Link>
              </div>

              <div className="pt-2 text-xs opacity-70">
                License included. <Link className="underline" href="/licensing">Read terms</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
