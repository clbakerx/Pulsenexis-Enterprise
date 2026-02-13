import Link from "next/link";
import TopHero from "@/app/components/TopHero";
import { PACKS } from "./packs";
import { PACK_BUNDLE_PRICE, PACK_BUNDLE_STRIPE_LINK } from "@/lib/pricing";

type Genre = "jazz" | "rnb" | "soul";
type GenreOrAll = Genre | "all";

function normalizeGenre(g: string): GenreOrAll {
  if (g === "jazz" || g === "rnb" || g === "soul") return g;
  return "all";
}

function withQuery(baseUrl: string, params: Record<string, string>) {
  try {
    const u = new URL(baseUrl, "https://pulsenexis.com");
    for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
    return baseUrl.startsWith("http") ? u.toString() : u.pathname + u.search + u.hash;
  } catch {
    return baseUrl;
  }
}

export default function PacksView({ genre }: { genre: string }) {
  const g = normalizeGenre(genre);

  const filtered =
    g === "all" ? PACKS : PACKS.filter((p) => p.genre === g);

  const sections: { label: string; key: Genre; packs: typeof PACKS }[] = [
    { label: "Jazz Packs", key: "jazz", packs: filtered.filter((p) => p.genre === "jazz") },
    { label: "R&B Packs", key: "rnb", packs: filtered.filter((p) => p.genre === "rnb") },
    { label: "Soul Packs", key: "soul", packs: filtered.filter((p) => p.genre === "soul") },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <TopHero
        eyebrow="PULSENEXIS • PACKS"
        titlePre="Creator-safe "
        titleHighlight="music packs"
        titlePost=" that convert"
        descriptionLines={[
          "Two previews per pack. One clean buy button. Built for stability.",
          "License once • monetize forever.",
        ]}
        bullets={[
          "Perpetual license",
          "Monetization allowed",
          "No Content ID claims",
          "Clean deliverables",
        ]}
        buttons={[
          { label: "Jump to packs", href: "#packs", variant: "primary" },
          { label: "License Terms", href: "/licensing", variant: "outline" },
          { label: "Back Home", href: "/", variant: "ghost" },
        ]}
        footnote="Preview → Buy → Done. Simple on purpose."
      />

      {/* Filters */}
      <div className="mt-8 flex flex-wrap gap-2">
        <FilterButton active={g === "all"} href="/packs" label="All" />
        <FilterButton active={g === "jazz"} href="/packs?genre=jazz" label="Jazz" />
        <FilterButton active={g === "rnb"} href="/packs?genre=rnb" label="R&B" />
        <FilterButton active={g === "soul"} href="/packs?genre=soul" label="Soul" />
      </div>

      <div id="packs" className="mt-10 space-y-16">
        {sections.map((s) =>
          s.packs.length ? (
            <section key={s.key}>
              <div className="mb-6">
                <h2 className="text-3xl font-extrabold">{s.label}</h2>
                <p className="mt-2 text-sm opacity-80">
                  Two previews per pack + one buy button.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {s.packs.map((pack) => {
                  const samples = (pack.tracks ?? []).slice(0, 2);
                  const checkoutUrl = withQuery(PACK_BUNDLE_STRIPE_LINK, {
                    client_reference_id: `packs_${pack.genre}_${pack.slug}`,
                  });

                  return (
                    <div
                      key={pack.slug}
                      className="overflow-hidden rounded-3xl border bg-white p-5 shadow-sm"
                    >
                      <div className="text-xs font-semibold uppercase opacity-60">
                        {pack.genre.toUpperCase()}
                      </div>

                      <div className="mt-1 text-lg font-extrabold">{pack.title}</div>
                      <p className="mt-1 text-sm opacity-70">{pack.description}</p>

                      {(pack.mood || pack.bpmRange) && (
                        <div className="mt-2 text-xs opacity-60">
                          {pack.mood ? <span>{pack.mood}</span> : null}
                          {pack.mood && pack.bpmRange ? <span> • </span> : null}
                          {pack.bpmRange ? <span>{pack.bpmRange} BPM</span> : null}
                        </div>
                      )}

                      <div className="mt-4 space-y-3">
                        {samples.map((t) => (
                          <div key={t.id} className="rounded-xl border p-3">
                            <div className="mb-2 text-sm font-semibold">{t.title}</div>
                            <audio controls preload="none" className="w-full">
                              <source src={t.previewUrl} type="audio/mpeg" />
                            </audio>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4">
                        <a
                          href={checkoutUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full rounded-full bg-black px-4 py-2 text-center text-sm font-semibold text-white hover:opacity-90"
                        >
                          Buy Bundle — ${PACK_BUNDLE_PRICE}
                        </a>

                        <div className="mt-2 text-center text-[11px] opacity-70">
                          Secure checkout via Stripe • Instant access after purchase
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null
        )}
      </div>

      <div className="mt-16 rounded-3xl border bg-white p-6 text-center">
        <div className="text-sm opacity-70">Want everything?</div>
        <a
          href={PACK_BUNDLE_STRIPE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          Buy Packs Bundle — ${PACK_BUNDLE_PRICE}
        </a>
      </div>
    </main>
  );
}

function FilterButton({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        "rounded-full border px-4 py-2 text-sm font-semibold",
        active ? "bg-black text-white border-black" : "bg-white hover:bg-neutral-50",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}
