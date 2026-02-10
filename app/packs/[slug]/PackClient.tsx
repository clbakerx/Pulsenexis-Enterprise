"use client";

import Link from "next/link";
import type { Pack } from "@/types/packs";

export default function PackClient({ pack }: { pack: Pack }) {
  if (!pack) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold">Pack missing</h1>
        <Link href="/packs" className="underline">Back to packs</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-4xl font-extrabold">{pack.title}</h1>
    </main>
  );
}
