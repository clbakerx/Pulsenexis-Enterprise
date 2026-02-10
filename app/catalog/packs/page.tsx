import { PACKS } from "./packs";
import { PACK_BUNDLE_PRICE, PACK_BUNDLE_STRIPE_LINK } from "@/lib/pricing";

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function PacksPage() {
  const jazzPacks = PACKS.filter((p) => p.genre === "jazz");

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <section className="mb-6">
        <h1 className="text-4xl font-extrabold">Jazz Packs</h1>
        <p className="mt-2 text-sm opacity-80">Pick a pack below, then checkout.</p>
      </section>

      {/* What’s Included */}
      <section className="mb-8 rounded-3xl border bg-white p-5">
        <div className="text-sm font-semibold">What’s included in every bundle</div>
        <p className="mt-1 text-sm opacity-70">
          Clean deliverables for content, ads, client work, and edits.
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "Stems (trackouts)",
            "Full files (MP3 + WAV)",
            "Loops (8 & 16 bar)",
            "Commercial license agreement (PDF)",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full border bg-white px-3 py-1 text-xs font-semibold"
            >
              ✅ {item}
            </span>
          ))}
        </div>

        <div className="mt-4 text-xs opacity-60">Note: exact contents may vary slightly by pack.</div>
      </section>

      {/* Pack Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {jazzPacks.flatMap((pack) => {
          const pairs = chunk(pack.tracks ?? [], 2);

          return pairs.map((pair, idx) => {
            const checkoutUrl = `${PACK_BUNDLE_STRIPE_LINK}?client_reference_id=pulsenexis_jazz_${pack.slug}`;

            return (
              <div
                key={`${pack.slug}-${idx}`}
                className="rounded-3xl border bg-white p-5 shadow-sm overflow-hidden"
              >
                {/* Pack Info */}
                <div>
                  <div className="text-xs font-semibold uppercase opacity-60">Jazz Pack</div>
                  <div className="mt-1 text-lg font-extrabold">{pack.title}</div>
                  <p className="mt-1 text-sm opacity-70">{pack.description}</p>
                </div>

                {/* Tracks (stacked, contained) */}
                <div className="mt-4 grid gap-3">
                  {pair.map((t) => (
                    <div key={t.id} className="rounded-2xl border p-3 overflow-hidden">
                      <div>
                        <div className="truncate text-sm font-semibold">{t.title}</div>
                        <div className="text-xs opacity-60">Preview • License-ready</div>
                      </div>

                      {t.previewUrl ? (
                        <div className="mt-2 w-full">
                          <audio controls preload="none" className="h-8 w-full">
                            <source src={t.previewUrl} type="audio/mpeg" />
                          </audio>
                        </div>
                      ) : (
                        <div className="mt-2 text-xs opacity-60">No preview</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-4">
                  <a
                    href={checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-full bg-black px-4 py-2 text-center text-sm font-semibold text-white hover:opacity-90"
                  >
                    Buy Jazz Bundle — ${PACK_BUNDLE_PRICE}
                  </a>

                  <div className="mt-2 text-center text-[11px] opacity-70">
                    Includes stems • WAV/MP3 • loops • commercial license
                  </div>
                </div>
              </div>
            );
          });
        })}
      </div>
    </main>
  );
}
