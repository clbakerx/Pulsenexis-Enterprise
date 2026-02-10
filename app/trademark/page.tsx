import Link from "next/link";

type ShowcaseSample = {
  id: string;
  title: string;
  subtitle?: string;
  demoUrl: string; // FULL FileDN URL (paste exact)
};

const SAMPLES: ShowcaseSample[] = [
  {
    id: "undone-by-you",
    title: "Undone by You",
    subtitle: "PulseNexis Sound™ — Trademark Showcase",
    demoUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Undone%20by%20You.mp3",
  },
  {
    id: "time-to-let-him-go",
    title: "Time to Let Him Go",
    subtitle: "PulseNexis Sound™ — Trademark Showcase",
    demoUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Time%20to%20Let%20Him%20Go.mp3",
  },
  {
    id: "shelter-me",
    title: "Shelter Me",
    subtitle: "PulseNexis Sound™ — Trademark Showcase",
    demoUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Shelter%20Me.mp3",
  },
  {
    id: "love-has-never-been-like-us",
    title: "Love Has Never Been Like Us",
    subtitle: "PulseNexis Sound™ — Trademark Showcase",
    demoUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Love%20has%20never%20been%20like%20us.mp3",
  },
  {
    id: "las-vegas-nights",
    title: "Las Vegas Nights",
    subtitle: "PulseNexis Sound™ — Trademark Showcase",
    demoUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Las%20Vegas%20Nights.mp3",
  },
  {
    id: "When You Do That Thing You Do To Me",
    title: "When You Do That Thing You Do To Me",
    subtitle: "PulseNexis Sound™ — Trademark Showcase",
    demoUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/When%20You%20Do%20That%20Thing%20You%20Do%20To%20Me.mp3",
  },
];

export default function TrademarkPage() {
  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Top nav */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="text-sm font-semibold text-neutral-700 hover:underline">
            ← Back home
          </Link>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/packs"
              className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              Packs
            </Link>
            <Link
              href="/cinema"
              className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              Cinema
            </Link>
            <Link
              href="/licensing"
              className="rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white hover:opacity-90"
            >
              Licensing
            </Link>
          </div>
        </div>

        {/* Hero */}
        <section className="mt-8 rounded-3xl border border-neutral-200 bg-neutral-50 p-8 md:p-10">
          <div className="text-xs font-semibold tracking-wider text-neutral-500">
            TRADEMARK SHOWCASE
          </div>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 md:text-4xl">
            PulseNexis Sound™
          </h1>

          <p className="mt-3 max-w-3xl text-sm text-neutral-700 md:text-base">
            This page is a public-facing audio showcase for the PulseNexis Sound™ identity —
            a consistent sonic palette across releases. These demos highlight signature tone,
            quality, and creative direction.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-neutral-200 bg-white p-4">
              <div className="text-sm font-semibold text-neutral-900">Consistent Identity</div>
              <div className="mt-1 text-xs text-neutral-600">
                Recognizable textures, harmonies, and mix bias.
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-4">
              <div className="text-sm font-semibold text-neutral-900">Creator-Safe</div>
              <div className="mt-1 text-xs text-neutral-600">
                Clean previews designed for browsing and selection.
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-4">
              <div className="text-sm font-semibold text-neutral-900">Premium Finish</div>
              <div className="mt-1 text-xs text-neutral-600">
                Polished audio that translates across devices.
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-4">
              <div className="text-sm font-semibold text-neutral-900">Licensing-Ready</div>
              <div className="mt-1 text-xs text-neutral-600">
                Packs + cinema toolkits available for purchase.
              </div>
            </div>
          </div>
        </section>

        {/* Samples */}
        <section className="mt-10">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">Trademark Audio Samples</h2>
            <p className="mt-1 text-sm text-neutral-600">
              Five signature tracks used to demonstrate the PulseNexis Sound™ identity.
            </p>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {SAMPLES.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
              >
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-neutral-900">{s.title}</div>
                  {s.subtitle ? <div className="mt-1 text-xs text-neutral-500">{s.subtitle}</div> : null}
                </div>

                <audio className="mt-4 w-full" controls preload="none">
                  <source src={s.demoUrl} type="audio/mpeg" />
                </audio>

                <div className="mt-2 break-all text-[11px] text-neutral-400">{s.demoUrl}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-10 rounded-3xl border border-neutral-200 bg-white p-6">
          <div className="text-sm font-semibold text-neutral-900">
            Want the PulseNexis Sound™ for your project?
          </div>
          <p className="mt-1 text-sm text-neutral-600">
            Browse Packs and Cinema toolkits, then license the bundle that fits your project.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/packs"
              className="rounded-full bg-neutral-900 px-5 py-2 text-xs font-semibold text-white hover:opacity-90"
            >
              Explore Packs
            </Link>
            <Link
              href="/cinema"
              className="rounded-full border border-neutral-300 bg-white px-5 py-2 text-xs font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              Explore Cinema
            </Link>
            <Link
              href="/licensing"
              className="rounded-full border border-neutral-300 bg-white px-5 py-2 text-xs font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              Licensing Terms
            </Link>
          </div>
        </section>

        <div className="mt-10 text-center text-xs text-neutral-500">
          © {year} PulseNexis • Honey Drip Records
        </div>
      </div>
    </main>
  );
}
