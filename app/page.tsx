// app/page.tsx
// This can be a Server Component (no 'use client' needed).
// If you later add client-only hooks or event handlers, add 'use client' at the top.

import Link from "next/link";
import Image from "next/image";

const LOGO_URL =
  "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1200&auto=format&fit=crop"; // placeholder

export default function PulseNexisHome() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Top Bar / Nav */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white">PN</span>
            <a href="#" className="text-sm font-semibold tracking-wide">HONEY DRIP RECORDS</a>
          </div>

          {/* Desktop Links */}
          <ul className="hidden items-center gap-6 text-sm font-medium md:flex">
            
            <li className="relative group">
              <button className="inline-flex items-center gap-1 hover:opacity-70" aria-haspopup="true">
                MORE <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" className="mt-px"><path d="M5.25 7.5L10 12.25 14.75 7.5"/></svg>
              </button>
              <div className="invisible absolute right-0 mt-2 w-48 divide-y divide-neutral-100 rounded-xl border border-neutral-200 bg-white p-1 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
                <Link className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50" href="/transform">Why You Need This</Link>
                <Link className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50" href="/about">About</Link>
                <Link className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50" href="/contact">Contact</Link>
                <Link className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50" href="/licensing">Licensing</Link>
              </div>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <details className="relative md:hidden">
            <summary className="list-none cursor-pointer rounded-xl border border-neutral-200 px-3 py-1.5 text-sm font-medium">Menu</summary>
            <div className="absolute right-0 mt-2 w-64 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl">
              <Link className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50" href="/catalog">Music Catalog</Link>
              <Link className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50" href="/transform">Why You Need This</Link>
              <Link className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50" href="/about">About</Link>
              <Link className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50" href="/contact">Contact</Link>
              <Link className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50" href="/licensing">Licensing</Link>
            </div>
          </details>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-2 md:items-center lg:gap-12 lg:px-8 lg:py-16">
        {/* Left panel (purple card) */}
        <section className="order-2 md:order-1">
          <div className="rounded-3xl bg-[#7b6cd9] p-10 text-white shadow-xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">PULSENEXIS</h1>
            <p className="mt-3 text-base/7 opacity-90">Music Catalog · PulseNexis</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
              >
                BROWSE MUSIC CATALOG
              </Link>
              <Link
                href="/transform"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all duration-200"
              >
                WHY YOU NEED THIS
              </Link>
              <a
                href="https://app.pulsenexis.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                Join PulseNexis Now
              </a>
              <a
                href="https://fanbase.com/pulsenexis"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label="PulseNexis on Fanbase (opens in a new tab)"
              >
                Visit us on Fanbase
              </a>
            </div>
          </div>
        </section>

        {/* Right panel (logo image) */}
        <section className="order-1 md:order-2">
          <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 shadow-xl">
            <Image
              src={LOGO_URL}
              alt="PulseNexis hero artwork"
              width={800}
              height={600}
              className="aspect-[16/12] w-full object-cover"
            />
            {/* Optional caption / watermark */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
              <p className="text-lg font-bold tracking-wide drop-shadow">PULSE NEXIS</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-neutral-600 md:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} Honey Drip Records · All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link className="hover:text-neutral-900" href="/terms">Terms</Link>
            <Link className="hover:text-neutral-900" href="/privacy">Privacy</Link>
            <Link className="hover:text-neutral-900" href="/support">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}