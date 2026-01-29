"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CinemaKitPage() {
  const params = useParams();
  const slug = (params?.slug as string) ?? "";

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Link
          href="/cinema"
          className="text-sm font-semibold text-neutral-700 hover:underline"
        >
          ← Back to Cinema
        </Link>

        <h1 className="mt-6 text-3xl font-semibold text-neutral-900">
          {slug.replaceAll("-", " ")}
        </h1>

        <p className="mt-3 text-sm text-neutral-600">
          This is the kit page for <span className="font-semibold">{slug}</span>. Add kit tracks,
          previews, and checkout wiring here.
        </p>

        <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
          <div className="text-sm font-semibold text-neutral-900">Next steps</div>
          <ul className="mt-2 space-y-2 text-sm text-neutral-700">
            <li>• Add track list + preview audio (FileDN)</li>
            <li>• Add “License / Buy” actions (either per-kit pricing or per-track)</li>
            <li>• If you want Cinema to also use the $100 per-song bundle, we can reuse the same cart system</li>
          </ul>
        </div>
      </div>
    </main>
  );
}