import Link from "next/link";

type ShowcaseSample = {
  id: string;
  title: string;
  subtitle?: string;
  demoUrl: string;
};

const SAMPLES: ShowcaseSample[] = [
  {
    id: "first-sight",
    title: "First Sight",
    subtitle: "PulseNexis Sound™ — Trademark Showcase",
    demoUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Singles/First-Sight/First%20Sight_Sample.mp3",
  },
  {
    id: "time-to-let-him-go",
    title: "Time to Let Him Go",
    subtitle: "PulseNexis Sound™ — Trademark Showcase",
    demoUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Time%20to%20Let%20Him%20Go.mp3",
  },
  {
    id: "touch-like-that",
    title: "Touch Like That",
    subtitle: "PulseNexis Sound™ — Trademark Showcase",
    demoUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Singles/Touch-Like-That/Touch%20Like%20That_Sample.mp3",
  },
  {
    id: "lock-in",
    title: "Lock In",
    subtitle: "PulseNexis Sound™ — Trademark Showcase",
    demoUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Singles/Lock-In/Lock%20In_Sample.mp3",
  },
  {
    id: "movie-of-the-year",
    title: "Movie of the Year",
    subtitle: "PulseNexis Sound™ — Trademark Showcase",
    demoUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Singles/Movie-Of-The-Year/Movie%20of%20the%20Year_Sample.mp3",
  },
  {
    id: "when-you-do-that-thing-you-do-to-me",
    title: "When You Do That Thing You Do To Me",
    subtitle: "PulseNexis Sound™ — Trademark Showcase",
    demoUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/When%20You%20Do%20That%20Thing%20You%20Do%20To%20Me.mp3",
  },
];

export default function TrademarkPage() {
  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="text-sm font-semibold text-neutral-700 hover:underline"
          >
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
              href="/packs"
              className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              Toolkits
            </Link>
            <Link
              href="/licensing"
              className="rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white hover:opacity-90"
            >
              Licensing
            </Link>
          </div>
        </div>

        <section className="mt-8 rounded-3xl border border-neutral-200 bg-neutral-50 p-8 md:p-10">
          <div className="text-xs font-semibold tracking-wider text-neutral-500">
            TRADEMARK SHOWCASE
          </div>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 md:text-4xl">
            PulseNexis Sound™
          </h1>

          <p className="mt-3 max-w-3xl text-sm text-neutral-700 md:text-base">
            This page is a public-facing audio showcase for the PulseNexis
            Sound™ identity — a consistent sonic palette across releases. These
            demos highlight signature tone, quality, and creative direction.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-neutral-200 bg-white p-4">
              <div className="text-sm font-semibold text-neutral-900">
                Consistent Identity
              </div>
              <div className="mt-1 text-xs text-neutral-600">
                Recognizable textures, harmonies, and mix bias.
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-4">
              <div className="text-sm font-semibold text-neutral-900">
                Creator-Safe
              </div>
              <div className="mt-1 text-xs text-neutral-600">
                Clean previews designed for browsing and selection.
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-4">
              <div className="text-sm font-semibold text-neutral-900">
                Premium Finish
              </div>
              <div className="mt-1 text-xs text-neutral-600">
                Polished audio that translates across devices.
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-4">
              <div className="text-sm font-semibold text-neutral-900">
                Licensing-Ready
              </div>
              <div className="mt-1 text-xs text-neutral-600">
                Packs and toolkits available for purchase.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">
              Trademark Audio Samples
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Six signature tracks used to demonstrate the PulseNexis Sound™
              identity.
            </p>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {SAMPLES.map((sample) => (
              <div
                key={sample.id}
                className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
              >
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-neutral-900">
                    {sample.title}
                  </div>
                  {sample.subtitle ? (
                    <div className="mt-1 text-xs text-neutral-500">
                      {sample.subtitle}
                    </div>
                  ) : null}
                </div>

                <audio className="mt-4 w-full" controls preload="none">
                  <source src={sample.demoUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>

                <div className="mt-2 break-all text-[11px] text-neutral-400">
                  {sample.demoUrl}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-neutral-200 bg-white p-6">
          <div className="text-sm font-semibold text-neutral-900">
            Want the PulseNexis Sound™ for your project?
          </div>
          <p className="mt-1 text-sm text-neutral-600">
            Browse packs and toolkits, then license the bundle that fits your
            project.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/packs"
              className="rounded-full bg-neutral-900 px-5 py-2 text-xs font-semibold text-white hover:opacity-90"
            >
              Explore Packs
            </Link>
            <Link
              href="/packs"
              className="rounded-full border border-neutral-300 bg-white px-5 py-2 text-xs font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              Explore Toolkits
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