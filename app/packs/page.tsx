import Link from "next/link";

// ✅ Use the one working Stripe Payment Link you gave me
const PACKS_STRIPE_LINK = "https://buy.stripe.com/00wbJ19MvdPN3Cp1X74ZG0w";

// If you already have your PACKS somewhere else, import that instead.
// This is a safe fallback shape so the page compiles even if packs data changes.
import { PACKS } from "@/app/catalog/packs/packs"; // <-- your screenshot shows this exists

type Pack = {
  slug: string;
  title: string;
  description?: string;
  genre?: string;
  mood?: string;
  bpmRange?: string;
};

function normGenre(v: unknown) {
  const g = String(v ?? "").toLowerCase();
  if (g === "jazz" || g === "rnb" || g === "soul") return g;
  return "";
}

function withClientRef(baseUrl: string, clientRef: string) {
  try {
    const u = new URL(baseUrl);
    u.searchParams.set("client_reference_id", clientRef);
    return u.toString();
  } catch {
    return baseUrl;
  }
}

export default function PacksPage({
  searchParams,
}: {
  searchParams?: { genre?: string };
}) {
  const genre = normGenre(searchParams?.genre);

  // ✅ normalize to a simple list of packs
  const packs = (PACKS as unknown as Pack[]) ?? [];

  const filtered =
    genre && packs.length
      ? packs.filter((p) => (p.genre ?? "").toLowerCase() === genre)
      : packs;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Simple hero */}
      <section className="rounded-3xl border bg-white p-8">
        <div className="text-xs font-semibold tracking-wide opacity-60">
          PULSENEXIS • PACKS
        </div>

        <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl">
          Creator-safe music packs.
        </h1>

        <p className="mt-3 max-w-2xl text-sm opacity-80">
          One-time license. Monetize forever. Clean deliverables for Shorts, Reels,
          brands, podcasts, weddings — and more.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={PACKS_STRIPE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Buy Packs Bundle — $49
          </a>

          <Link
            href="/licensing"
            className="rounded-full border px-6 py-3 text-sm font-semibold hover:bg-black/5"
          >
            View License Terms
          </Link>

          <Link
            href="/"
            className="rounded-full border px-6 py-3 text-sm font-semibold hover:bg-black/5"
          >
            Back Home
          </Link>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 text-xs opacity-70">
          {[
            "Perpetual license",
            "Monetization allowed",
            "No Content ID claims",
            "Clean WAV/MP3 deliverables",
          ].map((x) => (
            <span key={x} className="rounded-full border px-3 py-1">
              ✅ {x}
            </span>
          ))}
        </div>
      </section>

      {/* Filters */}
      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/packs"
          className={`rounded-full border px-4 py-2 text-sm font-semibold ${
            !genre ? "bg-black text-white" : "bg-white"
          }`}
        >
          All
        </Link>
        <Link
          href="/packs?genre=jazz"
          className={`rounded-full border px-4 py-2 text-sm font-semibold ${
            genre === "jazz" ? "bg-black text-white" : "bg-white"
          }`}
        >
          Jazz
        </Link>
        <Link
          href="/packs?genre=rnb"
          className={`rounded-full border px-4 py-2 text-sm font-semibold ${
            genre === "rnb" ? "bg-black text-white" : "bg-white"
          }`}
        >
          R&amp;B
        </Link>
        <Link
          href="/packs?genre=soul"
          className={`rounded-full border px-4 py-2 text-sm font-semibold ${
            genre === "soul" ? "bg-black text-white" : "bg-white"
          }`}
        >
          Soul
        </Link>
      </div>

      {/* Packs grid */}
      <section className="mt-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold">
              {genre ? `${genre.toUpperCase()} Packs` : "All Packs"}
            </h2>
            <p className="mt-1 text-sm opacity-70">
              Browse packs, then buy the bundle via Stripe.
            </p>
          </div>
          <div className="text-sm opacity-70">{filtered.length} packs</div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-6 rounded-2xl border bg-white p-6 text-sm">
            No packs found for this genre yet.
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => {
              const clientRef = `packs_${p.slug || "unknown"}`;
              const checkout = withClientRef(PACKS_STRIPE_LINK, clientRef);

              return (
                <div
                  key={p.slug}
                  className="rounded-2xl border bg-white p-5"
                >
                  <div className="text-xs font-semibold uppercase opacity-60">
                    {(p.genre ?? "pack").toString()}
                  </div>

                  <div className="mt-1 text-lg font-extrabold">{p.title}</div>

                  {p.description ? (
                    <p className="mt-2 text-sm opacity-80">{p.description}</p>
                  ) : null}

                  {(p.mood || p.bpmRange) ? (
                    <div className="mt-3 text-xs opacity-60">
                      {p.mood ? <span>{p.mood}</span> : null}
                      {p.mood && p.bpmRange ? <span> • </span> : null}
                      {p.bpmRange ? <span>{p.bpmRange} BPM</span> : null}
                    </div>
                  ) : null}

                  <div className="mt-4 flex flex-col gap-2">
                    <Link
                      href={`/catalog/packs/${p.slug}`}
                      className="rounded-full border px-4 py-2 text-center text-sm font-semibold hover:bg-black/5"
                    >
                      View Details
                    </Link>

                    <a
                      href={checkout}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-black px-4 py-2 text-center text-sm font-semibold text-white hover:opacity-90"
                    >
                      Buy Bundle — $49
                    </a>
                  </div>

                  <p className="mt-3 text-[11px] opacity-60">
                    Checkout opens in a new tab • client ref: {clientRef}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
