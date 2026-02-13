"use client";

import { PACKS } from "./packs/packs";
import { PACK_BUNDLE_PRICE, PACK_BUNDLE_STRIPE_LINK } from "@/lib/pricing";

export default function CatalogPacksClient() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="rounded-3xl border bg-white p-8">
        <div className="text-xs font-semibold tracking-wide text-neutral-500">
          PULSENEXIS • PACKS
        </div>

        <h1 className="mt-3 text-4xl font-extrabold">
          Creator-safe music packs.
        </h1>

        <p className="mt-3 max-w-2xl text-sm text-neutral-600">
          Two quick samples per pack. One bundle checkout. No extra routes to
          break.
        </p>

        <a
          href={PACK_BUNDLE_STRIPE_LINK}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          Buy Packs Bundle — ${PACK_BUNDLE_PRICE}
        </a>
      </header>

      <section className="mt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PACKS.map((p) => {
            const s1 = p.tracks?.[0];
            const s2 = p.tracks?.[1];

            return (
              <div key={p.slug} className="rounded-2xl border bg-white p-5">
                <div className="text-xs font-semibold uppercase text-neutral-500">
                  {p.genre}
                </div>

                <div className="mt-1 text-lg font-bold">{p.title}</div>
                <p className="mt-2 text-sm text-neutral-700">{p.description}</p>

                <div className="mt-4 space-y-2">
                  {s1?.previewUrl ? (
                    <a
                      href={s1.previewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-neutral-50"
                    >
                      🎧 Sample 1: {s1.title}
                    </a>
                  ) : (
                    <div className="rounded-xl border px-4 py-2 text-sm opacity-70">
                      Sample 1 coming soon
                    </div>
                  )}

                  {s2?.previewUrl ? (
                    <a
                      href={s2.previewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-neutral-50"
                    >
                      🎧 Sample 2: {s2.title}
                    </a>
                  ) : (
                    <div className="rounded-xl border px-4 py-2 text-sm opacity-70">
                      Sample 2 coming soon
                    </div>
                  )}
                </div>

                <a
                  href={PACK_BUNDLE_STRIPE_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-black px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
                >
                  Buy Bundle — ${PACK_BUNDLE_PRICE}
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
