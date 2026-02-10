"use client";

import Link from "next/link";
import { getPackBySlug, buildFileDNUrl } from "@/data/packs";

export default function PackClient({ slug }: { slug: string }) {
  const pack = getPackBySlug(slug);

  if (!pack) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold">Pack not found</h1>
        <p className="mt-2 text-neutral-600">
          No pack matches slug: <span className="font-mono">{slug}</span>
        </p>
        <Link className="mt-6 inline-block underline" href="/packs">
          Back to packs
        </Link>
      </main>
    );
  }

  const tracks = pack.tracks ?? [];
  const folder = pack.packFolder ?? "";

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/packs" className="text-sm underline text-neutral-600">
        ← Back to packs
      </Link>

      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">{pack.title}</h1>
      <p className="mt-2 max-w-2xl text-sm text-neutral-600">
        {pack.shortDescription}
      </p>

      <section className="mt-10">
        <h2 className="text-lg font-bold">Samples</h2>

        {tracks.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm">
            No samples added yet.
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            {tracks.map((t) => {
              // ✅ This was your bug: buildFileUrl doesn't exist.
              // ✅ Use the function you actually import: buildFileDNUrl
              const src = buildFileDNUrl(folder, t.file);

              return (
                <div key={t.id} className="rounded-2xl border border-neutral-200 p-4">
                  <div className="text-sm font-semibold">{t.title}</div>

                  <audio className="mt-2 w-full" controls preload="none">
                    <source src={src} type="audio/mpeg" />
                  </audio>

                  <div className="mt-2 break-all text-xs text-neutral-500">{src}</div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
