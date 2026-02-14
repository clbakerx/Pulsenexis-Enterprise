"use client";

import Link from "next/link";
import TopHero from "@/app/components/TopHero";
import { PACKS } from "./packs";
import { PACK_BUNDLE_PRICE, PACK_BUNDLE_STRIPE_LINK } from "@/lib/pricing";

type Genre = "jazz" | "rnb" | "soul" | "";

function withQuery(baseUrl: string, params: Record<string, string>) {
  try {
    const u = new URL(baseUrl);
    for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
    return u.toString();
  } catch {
    return baseUrl;
  }
}

export default function PacksView({ genre }: { genre: Genre }) {
  const g = (genre ?? "").toLowerCase() as Genre;

  const jazzPacks = PACKS.filter((p) => p.genre === "jazz");
  const rnbPacks = PACKS.filter((p) => p.genre === "rnb");
  const soulPacks = PACKS.filter((p) => p.genre === "soul");

  const showJazz = !g || g === "jazz";
  const showRnb = !g || g === "rnb";
  const showSoul = !g || g === "soul";

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
        <FilterButton label="All" href="/packs" active={!g} />
        <FilterButton label="Jazz" href="/packs?genre=jazz" active={g === "jazz"} />
        <FilterButton label="R&B" href="/packs?genre=rnb" active={g === "rnb"} />
        <FilterButton label="Soul" href="/packs?genre=soul" active={g === "soul"} />
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

function FilterButton({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
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
    tracks: { id: string; title: string; previewUrl: string }[];
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
          // ✅ ALWAYS 2 previews per card (even if you have 4 tracks)
          const samples = (pack.tracks ?? []).slice(0, 2);

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

              {/* ✅ Exactly 2 preview players */}
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
