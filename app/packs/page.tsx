import Link from "next/link";
import { PACKS } from "../data/packs";

export default function PacksPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-extrabold tracking-tight">Packs</h1>
      <p className="mt-2 text-sm text-neutral-600 max-w-2xl">
        Content-ready music kits—loopable, cut down, and labeled—so creators can publish fast without copyright headaches.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {PACKS.map((pack) => (
          <article key={pack.slug} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">{pack.cardTitle}</h2>
            <p className="mt-2 text-sm text-neutral-600">{pack.description}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {pack.tags.map((t) => (
                <span key={t} className="rounded-full border px-3 py-1 text-xs text-neutral-700">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 flex gap-2">
              <Link
                href={`/packs/${pack.slug}`}
                className="flex-1 rounded-xl border px-4 py-2 text-center text-sm font-semibold hover:bg-neutral-50"
              >
                View pack details
              </Link>

              <a
                href={pack.stripeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 rounded-xl bg-black px-4 py-2 text-center text-sm font-semibold text-white hover:bg-neutral-900"
              >
                Buy now
              </a>
            </div>

            <div className="mt-3 text-xs text-neutral-500">
              License included. <Link href="/licensing" className="underline">Read terms</Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}