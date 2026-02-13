"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import TopHero from "@/app/components/TopHero";
import { PACKS } from "@/app/catalog/packs/packs";
import { PACK_BUNDLE_PRICE, PACK_BUNDLE_STRIPE_LINK } from "@/lib/pricing";



function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function withQuery(baseUrl: string, params: Record<string, string>) {
  try {
    const u = new URL(baseUrl);
    for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
    return u.toString();
  } catch {
    return baseUrl;
  }
}

const STRIPE_PACK_BUNDLE_LINK = "https://buy.stripe.com/00wbJ19MvdPN3Cp1X74ZG0w";

export default function PacksClient() {
  const sp = useSearchParams();
  const genre = (sp.get("genre") ?? "").toLowerCase();

  const jazzPacks = PACKS.filter((p) => p.genre === "jazz");
  const rnbPacks = PACKS.filter((p) => p.genre === "rnb");
  const soulPacks = PACKS.filter((p) => p.genre === "soul");

  const showJazz = !genre || genre === "jazz";
  const showRnb = !genre || genre === "rnb";
  const showSoul = !genre || genre === "soul";

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <TopHero
        eyebrow="PULSENEXIS • PACKS"
        titlePre="Music built for "
        titleHighlight="Shorts"
        titlePost=", Reels & Brands"
        descriptionLines={[
          "Loop-ready, creator-safe packs optimized for TikTok, Instagram Reels, and YouTube Shorts.",
          "Designed to support text overlays and voiceovers.",
        ]}
        bullets={[
          "Loop-first • edit-safe",
          "Monetization allowed",
          "No Content ID claims",
          "One-time purchase • Perpetual license",
        ]}
        buttons={[
          { label: "Choose a bundle", href: "#bundles", variant: "primary" },
          { label: "View License Terms", href: "/licensing", variant: "outline" },
          { label: "Back Home", href: "/", variant: "ghost" },
        ]}
        footnote="Pick a bundle below • Checkout opens in a new tab • No renewals • No Content ID"
      />

      {/* quick filters */}
      <div className="mt-8 flex flex-wrap gap-2">
        <Link href="/packs" className="rounded-full border bg-white px-4 py-2 text-sm font-semibold">
          All
        </Link>
        <Link href="/packs?genre=jazz" className="rounded-full border bg-white px-4 py-2 text-sm font-semibold">
          Jazz
        </Link>
        <Link href="/packs?genre=rnb" className="rounded-full border bg-white px-4 py-2 text-sm font-semibold">
          R&amp;B
        </Link>
        <Link href="/packs?genre=soul" className="rounded-full border bg-white px-4 py-2 text-sm font-semibold">
          Soul
        </Link>
      </div>

      <div id="bundles" className="mt-12 space-y-16">
        {showJazz && (
          <GenreSection
            label="Jazz Packs"
            subtitle="Pick a pack below, then checkout."
            packs={jazzPacks}
            clientRefPrefix="pulsenexis_jazz"
          />
        )}
        {showRnb && (
          <GenreSection
            label="R&B Packs"
            subtitle="Grown & soulful packs for creators."
            packs={rnbPacks}
            clientRefPrefix="pulsenexis_rnb"
          />
        )}
        {showSoul && soulPacks.length > 0 && (
          <GenreSection
            label="Soul Packs"
            subtitle="Warm, classic, emotional foundations."
            packs={soulPacks}
            clientRefPrefix="pulsenexis_soul"
          />
        )}
      </div>
    </main>
  );
}

function GenreSection({
  label,
  subtitle,
  packs,
  clientRefPrefix,
}: {
  label: string;
  subtitle: string;
  packs: {
    slug: string;
    title: string;
    description: string;
    bpmRange?: string;
    mood?: string;
    tracks: { id: string; title: string; previewUrl?: string }[];
  }[];
  clientRefPrefix: string;
}) {
  if (!packs.length) return null;

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-4xl font-extrabold">{label}</h2>
        <p className="mt-2 text-sm opacity-80">{subtitle}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {packs.flatMap((pack) => {
          const pairs = chunk(pack.tracks ?? [], 2);

          return pairs.map((pair, idx) => {
            const checkoutUrl = withQuery(STRIPE_PACK_BUNDLE_LINK, {
              client_reference_id: `${clientRefPrefix}_${pack.slug}_${idx}`,
            });

            return (
              <div key={`${pack.slug}-${idx}`} className="overflow-hidden rounded-3xl border bg-white p-5 shadow-sm">
                <div>
                  <div className="text-xs font-semibold uppercase opacity-60">
                    {label.replace(" Packs", "")} Pack
                  </div>
                  <div className="mt-1 text-lg font-extrabold">{pack.title}</div>
                  <p className="mt-1 text-sm opacity-70">{pack.description}</p>
                </div>

                <div className="mt-4 grid gap-3">
                  {pair.map((t) => (
                    <div key={t.id} className="overflow-hidden rounded-2xl border p-3">
                      <div className="truncate text-sm font-semibold">{t.title}</div>
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

                <div className="mt-4">
                  <a
                    href={checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-full bg-black px-4 py-2 text-center text-sm font-semibold text-white hover:opacity-90"
                  >
                    Buy Bundle — ${PACK_BUNDLE_PRICE}
                  </a>
                </div>
              </div>
            );
          });
        })}
      </div>
    </section>
  );
}
