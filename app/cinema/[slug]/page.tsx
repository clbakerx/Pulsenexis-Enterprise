import { CINEMA_PACKS } from "@/lib/cinemaCatalog";
import PackClient from "./pack-client";

export function generateStaticParams() {
  return CINEMA_PACKS.map((p) => ({ slug: p.slug }));
}

export default function CinemaPackPage({ params }: { params: { slug: string } }) {
  const pack = CINEMA_PACKS.find((p) => p.slug === params.slug);

  if (!pack) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Pack not found</h1>
        <p className="mt-2 opacity-80">
          No pack matches slug: <span className="font-mono">{params.slug}</span>
        </p>
      </main>
    );
  }

  return <PackClient pack={pack} />;
}
