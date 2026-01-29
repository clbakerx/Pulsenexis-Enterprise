import Link from "next/link";
import { getPackBySlug, FILEDN_BASE } from "../../data/packs";

function buildFileUrl(packFolder: string, file: string) {
  const cleanFolder = packFolder.replace(/^\/+|\/+$/g, "");
  const cleanFile = file.replace(/^\/+/, "");

  // encode each segment so spaces etc work
  const encoded = cleanFile
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");

  return `${FILEDN_BASE}${cleanFolder}/${encoded}`;
}

export default function PackDetailPage({ params }: { params: { slug: string } }) {
  const pack = getPackBySlug(params.slug);

  if (!pack) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold">Pack not found</h1>
        <p className="mt-2 text-neutral-600">That pack slug doesn’t exist.</p>
        <Link className="mt-6 inline-block underline" href="/packs">
          Back to packs
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link href="/packs" className="text-sm underline text-neutral-600">
            ← Back to packs
          </Link>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight">{pack.cardTitle}</h1>
          <p className="mt-2 text-sm text-neutral-600 max-w-2xl">{pack.description}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {pack.tags.map((t) => (
              <span key={t} className="rounded-full border px-3 py-1 text-xs text-neutral-700">
                {t}
              </span>
            ))}
          </div>
        </div>

        <a
          href={pack.stripeUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-900"
        >
          Buy now
        </a>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-bold">Tracks</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Preview each track below. (If a file lives inside subfolders, put the subpath in <code>file</code>,
          e.g. <code>SongFolder/samples/Track.mp3</code>.)
        </p>

        <div className="mt-5 space-y-4">
          {pack.tracks.length === 0 ? (
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
              No tracks added yet for this pack. Add them in <code>app/data/packs.ts</code>.
            </div>
          ) : (
            pack.tracks.map((t) => (
              <div key={t.id} className="rounded-2xl border border-neutral-200 p-4">
                <div className="text-sm font-semibold">{t.title}</div>
                <audio className="mt-2 w-full" controls preload="none">
                  <source src={buildFileUrl(pack.packFolder, t.file)} type="audio/mpeg" />
                </audio>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
