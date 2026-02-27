import Link from "next/link";
import TopHero from "@/app/components/TopHero";

const DEFAULT_BUY_URL = "https://buy.stripe.com/7sYaEXaQz4fd3Cp45f4ZG0C";

type SingleTrack = {
  id: string;
  title: string;
  subtitle?: string;
  priceLabel: string;
  buyUrl: string;
  previewUrl: string;
};

const SINGLES: SingleTrack[] = [
  {
    id: "what-you-wanna-do",
    title: "What You Wanna Do",
    subtitle: "Song Preview",
    priceLabel: "$3.99",
    buyUrl: DEFAULT_BUY_URL,
    previewUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/What%20You%20Wanna%20Do.mp3",
  },
  {
    id: "whats-your-number",
    title: "What's Your Number",
    subtitle: "Song Preview",
    priceLabel: "$3.99",
    buyUrl: DEFAULT_BUY_URL,
    previewUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/What%27s%20Your%20Number.mp3",
  },
  {
    id: "what-part-of-no-do-you-not-understand",
    title: "What Part of No Do You Not Understand",
    subtitle: "Song Preview",
    priceLabel: "$3.99",
    buyUrl: DEFAULT_BUY_URL,
    previewUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/What%20Part%20Of%20No%20Do%20You%20Not%20Understand%20(Remix).mp3",
  },
  {
    id: "the-cool-in-you",
    title: "The Cool in You",
    subtitle: "Song Preview",
    priceLabel: "$3.99",
    buyUrl: DEFAULT_BUY_URL,
    previewUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/The-Cool-In-You.mp3",
  },
  {
    id: "no-greater-love",
    title: "No Greater Love",
    subtitle: "Song Preview",
    priceLabel: "$3.99",
    buyUrl: DEFAULT_BUY_URL,
    previewUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/No%20Greater%20Love.mp3",
  },
  {
    id: "more-than-friends",
    title: "More Than Friends",
    subtitle: "Song Preview",
    priceLabel: "$3.99",
    buyUrl: DEFAULT_BUY_URL,
    previewUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/More%20Than%20Friends.mp3",
  },
  {
    id: "pour-it-slow",
    title: "Pour It Slow",
    subtitle: "Song Preview",
    priceLabel: "$3.99",
    buyUrl: DEFAULT_BUY_URL,
    previewUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Pour%20It%20Slow_Sample_1.mp3",
  },
  {
    id: "money-talks",
    title: "Money Talks",
    subtitle: "Song Preview",
    priceLabel: "$3.99",
    buyUrl: DEFAULT_BUY_URL,
    previewUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Money%20Talks%20(V-2).mp3",
  },
  {
    id: "mike-dreams",
    title: "Mike Dreams",
    subtitle: "Song Preview",
    priceLabel: "$3.99",
    buyUrl: DEFAULT_BUY_URL,
    previewUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Mike%20Dreams.mp3",
  },
  {
    id: "be my mrs clause",
    title: "Be My Mrs Clause",
    subtitle: "Song Preview",
    priceLabel: "$3.99",
    buyUrl: DEFAULT_BUY_URL,
    previewUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Be%20My%20Mrs%20Clause.mp3",
  },
  {
    id: "red nose tryna look into your windows",
    title: "Red Nose Tryna Look Into Your Windows",
    subtitle: "Song Preview",
    priceLabel: "$3.99",
    buyUrl: DEFAULT_BUY_URL,
    previewUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Red%20Nose%20Tryna%20Look%20Into%20Your%20Windows.mp3",
  },
  {
    id: "red means run",
    title: "Red Means Run",
    subtitle: "Song Preview",
    priceLabel: "$3.99",
    buyUrl: DEFAULT_BUY_URL,
    previewUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Red%20Means%20Run.mp3",
  },
  
  {
    id: "cant-stay-away",
    title: "Can't Stay Away",
    subtitle: "Song Preview",
    priceLabel: "$3.99",
    buyUrl: DEFAULT_BUY_URL,
    previewUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Singles/Cant-Stay-Away/Can%E2%80%99t-Stay-Away_Sample.mp3",
  },
];

export default function SinglesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <TopHero
        eyebrow="PULSENEXIS • SINGLES"
        titlePre="PulseNexis "
        titleHighlight="Singles"
        titlePost=""
        descriptionLines={[
          "Apple-clean cards: one preview, one price, one click.",
          "Tap play to preview. Buy instantly via Stripe.",
        ]}
        bullets={[
          "One preview per track",
          "Secure Stripe checkout",
          "Fast, clean, creator-safe",
          "No clutter — just singles",
        ]}
        buttons={[
          { label: "Browse Singles", href: "#singles", variant: "primary" },
          { label: "License Terms", href: "/licensing", variant: "outline" },
          { label: "Back Home", href: "/", variant: "ghost" },
        ]}
        footnote="Singles • Checkout opens in a new tab • No renewals"
      />

      <section id="singles" className="mt-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Singles</h2>
            <p className="mt-1 text-sm text-neutral-600">
              Each card includes one preview and one buy button.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/licensing"
              className="inline-flex w-fit items-center rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              License Terms
            </Link>
            <Link
              href="/packs"
              className="inline-flex w-fit items-center rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              Browse Packs
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SINGLES.map((s) => (
            <article
              key={s.id}
              className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-base font-semibold tracking-tight text-neutral-900">
                    {s.title}
                  </h3>
                  {s.subtitle ? (
                    <p className="mt-1 text-xs text-neutral-500">{s.subtitle}</p>
                  ) : null}
                </div>

                <span className="shrink-0 rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-800">
                  {s.priceLabel}
                </span>
              </div>

              <div className="mt-5">
                <audio controls preload="none" className="w-full">
                  <source src={s.previewUrl} type="audio/mpeg" />
                </audio>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <a
                  href={s.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
                >
                  Buy
                </a>
                <span className="text-xs text-neutral-500">Secure checkout</span>
              </div>

              <p className="mt-3 text-xs text-neutral-500">
                Opens Stripe in a new tab • Instant access after purchase
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-neutral-200 bg-white p-6">
        <h4 className="text-sm font-semibold text-neutral-900">
          Want stems or custom edits?
        </h4>
        <p className="mt-1 text-sm text-neutral-600">
          Check{" "}
          <Link className="font-semibold underline" href="/custom-music-kits">
            Custom Music Kits
          </Link>{" "}
          for stems, loop points, and alternate versions.
        </p>
      </section>
    </main>
  );
}
