import Link from "next/link";

export default function DonatePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-3xl bg-neutral-900 p-10 text-white sm:p-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="text-xs font-semibold tracking-wide text-white/80">
            Independent · self-funded · no label behind it
          </span>
        </div>

        <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
          Support the music
        </h1>

        <p className="mt-4 max-w-xl text-base/7 text-white/70">
          PulseNexis is a one-person operation — every track, mix, and release
          is funded and built independently. If the music has helped your
          content, told your story, or just been a good listen, a donation
          goes straight back into new releases, gear, and keeping the catalog
          growing.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="https://www.paypal.com/donate/?hosted_button_id=BH3W89KV6VD3Y"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-amber-300"
          >
            Donate via PayPal
          </Link>
          <Link
            href="https://pulsenexis.bandcamp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15"
          >
            Listen on Bandcamp
          </Link>
        </div>

        <p className="mt-6 text-xs text-white/40">
          Donations are optional and separate from track licensing — you
          don&rsquo;t need to donate to use or license any PulseNexis music.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold text-neutral-900">
            Prefer to support by listening?
          </div>
          <p className="mt-2 text-sm text-neutral-600">
            The full catalog is also on Bandcamp — streaming and
            name-your-price downloads help just as much as a direct
            donation.
          </p>
          <Link
            href="https://pulsenexis.bandcamp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Open Bandcamp →
          </Link>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold text-neutral-900">
            Looking to license a track instead?
          </div>
          <p className="mt-2 text-sm text-neutral-600">
            Every song comes with commercial licensing for YouTube, TikTok,
            and Reels — no strikes, no guesswork.
          </p>
          <Link
            href="/packs"
            className="mt-3 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Browse Packs →
          </Link>
        </div>
      </div>
    </main>
  );
}
