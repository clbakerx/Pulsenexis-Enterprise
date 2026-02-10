import Link from "next/link";
import * as React from "react";

export function KitShell({
  backHref,
  backLabel,
  title,
  subtitle,
  children,
}: {
  backHref: string;
  backLabel: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-12 md:px-6">
        <div className="mb-6 text-sm text-neutral-600">
          <Link href={backHref} className="hover:underline">
            ← {backLabel}
          </Link>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          {title}
        </h1>

        {subtitle ? (
          <p className="mt-2 max-w-3xl text-neutral-600">{subtitle}</p>
        ) : null}

        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}