"use client";

type Preview = { label?: string; src: string };

type Cue = {
  id: string;
  title: string;
  bpm?: number;
  key?: string;
  previewA?: Preview;
  previewB?: Preview;
  previews?: Preview[]; // optional alternative shape
};

type Pack = {
  slug: string;
  name: string;
  tagline?: string;
  description?: string;
  stripeUrl?: string;
  cues: Cue[];
};

function getCuePreviews(cue: Cue): Preview[] {
  // Prefer array if present, otherwise fall back to previewA/previewB
  const arr = Array.isArray(cue.previews) ? cue.previews : [];
  const fallback = [cue.previewA, cue.previewB].filter(Boolean) as Preview[];
  const merged = arr.length ? arr : fallback;

  // Only return previews with a valid src
  return merged.filter((p) => typeof p?.src === "string" && p.src.trim().length > 0).slice(0, 2);
}

export default function PackClient({ pack }: { pack: Pack }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">{pack.name}</h1>

            {pack.tagline && (
              <p className="mt-2 text-sm opacity-80">{pack.tagline}</p>
            )}

            {pack.description && (
              <p className="mt-3 text-sm opacity-80">{pack.description}</p>
            )}
          </div>

          {pack.stripeUrl ? (
            <a
              href={pack.stripeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border px-5 py-3 text-sm font-semibold hover:shadow-sm transition"
            >
              Buy on Stripe
            </a>
          ) : (
            <div className="text-xs opacity-70">Stripe link not set</div>
          )}
        </div>
      </header>

      {/* Previews + Purchase Info */}
      <section className="rounded-2xl border p-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-semibold">Previews</h2>
          <div className="text-xs opacity-70">Up to two previews per cue</div>
        </div>

        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* LEFT: Previews grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {pack.cues.map((cue) => {
              const previews = getCuePreviews(cue);

              return (
                <div key={cue.id} className="rounded-2xl border p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold">{cue.title}</div>
                      {(cue.bpm || cue.key) && (
                        <div className="text-sm opacity-80">
                          {cue.bpm ? `${cue.bpm} BPM` : ""}
                          {cue.bpm && cue.key ? " • " : ""}
                          {cue.key ?? ""}
                        </div>
                      )}
                    </div>
                  </div>

                  {previews.length === 0 ? (
                    <div className="mt-3 text-sm opacity-70">
                      No previews available.
                    </div>
                  ) : (
                    <div className="mt-3 grid gap-4">
                      {previews.map((p, idx) => (
                        <div key={`${cue.id}-preview-${idx}`}>
                          <div className="mb-1 flex items-center justify-between">
                            <div className="text-xs font-semibold opacity-80">
                              {p.label || `Preview ${idx === 0 ? "A" : "B"}`}
                            </div>
                            <a
                              href={p.src}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs rounded-full border px-3 py-1 hover:shadow-sm transition"
                            >
                              Open
                            </a>
                          </div>
                          <audio
                            className="w-full"
                            controls
                            preload="none"
                            src={p.src}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT: Purchase box */}
          <aside className="h-fit rounded-2xl border p-4 lg:sticky lg:top-24">
            <div className="text-sm font-semibold">
              What your purchase includes
            </div>

            <ul className="mt-3 space-y-2 text-sm opacity-80">
              <li>
                • Full-quality <span className="font-semibold">WAV</span> +{" "}
                <span className="font-semibold">MP3</span>
              </li>
              <li>
                • Complete <span className="font-semibold">Stem Package</span>{" "}
                (all tracks)
              </li>
              <li>
                • <span className="font-semibold">8-bar</span> /{" "}
                <span className="font-semibold">16-bar</span> sample cuts
              </li>
              <li>• Clean file naming + organized folders</li>
            </ul>

            <div className="mt-4 rounded-xl border px-3 py-2 text-xs opacity-70">
              Previews may be shortened/watermarked. Full files are delivered
              after checkout.
            </div>

            {pack.stripeUrl ? (
              <a
                href={pack.stripeUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border px-4 py-3 text-sm font-semibold hover:shadow-sm transition"
              >
                Buy this pack
              </a>
            ) : (
              <div className="mt-4 text-xs opacity-70">
                Add <span className="font-mono">stripeUrl</span> to this pack in{" "}
                <span className="font-mono">lib/cinemaCatalog.ts</span>.
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
