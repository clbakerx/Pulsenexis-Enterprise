"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import TopHero from "@/app/components/TopHero";
import { PACKS } from "./packs";
import { PACK_BUNDLE_PRICE, PACK_BUNDLE_STRIPE_LINK } from "@/lib/pricing";

type Genre = "jazz" | "rnb" | "soul";

function withQuery(baseUrl: string, params: Record<string, string>) {
  try {
    const u = new URL(baseUrl);
    for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
    return u.toString();
  } catch {
    return baseUrl; // if Stripe url is missing/invalid, don't crash the page
  }
}

export default function PacksClient() {
  const sp = useSearchParams();
  const genre = (sp.get("genre") ?? "").toLowerCase() as Genre | "";

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
        titlePre="Creator-safe "
        titleHighlight="music packs"
        titlePost=" that sell"
        descriptionLines={[
          "Two quick previews per pack. One clean buy button. No broken routes.",
          "License once • monetize forever.",
        ]}
        bullets={[
          "Perpetual license",
          "Monetization allowed",
          "No Content ID claims",
          "Clean WAV/MP3 deliverables",
        ]}
        buttons={[
          { label: "Jump to packs", href: "#packs", variant: "primary" },
          { label: "License Terms", href: "/licensing", variant: "outline" },
          { label: "Back Home", href: "/", variant: "ghost" },
        ]}
        footnote="Preview → Buy → Done. We removed extra links to keep this stable."
      />

      {/* Filters */}
      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/packs"
          className="rounded-full border bg-white px-4 py-2 text-sm font-semibold"
        >
          All
        </Link>
        <Link
          href="/packs?genre=jazz"
          className="rounded-full border bg-white px-4 py-2 text-sm font-semibold"
        >
          Jazz
        </Link>
        <Link
          href="/packs?genre=rnb"
          className="rounded-full border bg-white px-4 py-2 text-sm font-semibold"
        >
          R&amp;B
        </Link>
        <Link
          href="/packs?genre=soul"
          className="rounded-full border bg-white px-4 py-2 text-sm font-semibold"
        >
          Soul
        </Link>
      </div>

      <div id="packs" className="mt-10 space-y-16">
        {showJazz && <PackGrid label="Jazz Packs" packs={jazzPacks} refPrefix="jazz" />}
        {showRnb && <PackGrid label="R&B Packs" packs={rnbPacks} refPrefix="rnb" />}
        {showSoul && soulPacks.length > 0 && (
          <PackGrid label="Soul Packs" packs={soulPacks} refPrefix="soul" />
        )}
      </div>

      {/* Global bundle CTA */}
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

function PackGrid({
  label,
  packs,
  refPrefix,
}: {
  label: string;
  packs: {
    slug: string;
    title: string;
    description: string;
    genre: "rnb" | "soul" | "jazz";
    bpmRange?: string;
    mood?: string;
    tracks: { id: string; title: string; previewUrl?: string }[];
  }[];
  refPrefix: string;
}) {
  if (!packs.length) return null;

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-4xl font-extrabold">{label}</h2>
        <p className="mt-2 text-sm opacity-80">
          Two previews per pack + one buy button. Locked down for stability.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {packs.map((pack) => {
          const samples = (pack.tracks ?? []).slice(0, 2);

          // ✅ IMPORTANT: Stripe links must be <a>, not <Link>
          const checkoutUrl = withQuery(PACK_BUNDLE_STRIPE_LINK, {
            client_reference_id: `packs_${refPrefix}_${pack.slug}`,
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

              {/* Two previews */}
              <div className="mt-4 grid gap-3">
                {samples.map((t) => (
                  <div key={t.id} className="rounded-2xl border p-3">
                    <div className="truncate text-sm font-semibold">{t.title}</div>
                    {t.previewUrl ? (
                      <audio controls preload="none" className="mt-2 h-8 w-full">
                        <source src={t.previewUrl} type="audio/mpeg" />
                      </audio>
                    ) : (
                      <div className="mt-2 text-xs opacity-60">No preview</div>
                    )}
                  </div>
                ))}
              </div>

              {/* One CTA */}
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
  );
}
