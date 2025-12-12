// app/page.tsx
// Server Component (no "use client" needed)

import Link from "next/link";
import Image from "next/image";

const LOGO_URL =
  "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1200&auto=format&fit=crop"; // placeholder

const TIKTOK_URL = "https://www.tiktok.com/@pulsenexis";
const YOUTUBE_URL = "https://www.youtube.com/@pulsenexis";
const FANBASE_URL = "https://fanbase.com/pulsenexis";
const PROMPTBASE_URL = "https://promptbase.com/app/rb-album-cover-generator";
const APP_URL = "https://app.pulsenexis.com";

export default function PulseNexisHome() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Top Bar / Nav */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/90 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2.5 sm:px-4 sm:py-3 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white sm:h-8 sm:w-8 sm:text-sm">
              PN
            </span>
            <Link href="/" className="text-xs font-semibold tracking-wide sm:text-sm">
              <span className="hidden sm:inline">HONEY DRIP RECORDS</span>
              <span className="sm:hidden">HONEY DRIP</span>
            </Link>
          </div>

          {/* Desktop Links */}
          <ul className="hidden items-center gap-6 text-sm font-medium md:flex">
            <li className="relative group">
              <button
                className="inline-flex items-center gap-1 hover:opacity-70"
                aria-haspopup="true"
                type="button"
              >
                MORE{" "}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="mt-px"
                  aria-hidden="true"
                >
                  <path d="M5.25 7.5L10 12.25 14.75 7.5" />
                </svg>
              </button>

              <div className="invisible absolute right-0 mt-2 w-56 divide-y divide-neutral-100 rounded-xl border border-neutral-200 bg-white p-1 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
                <div className="py-1">
                  <Link
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50"
                    href="/blueprint-landing"
                  >
                    Blueprint
                  </Link>
                  <Link
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50"
                    href="/rnb-blueprint"
                  >
                    Create
                  </Link>
                  <Link
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50"
                    href="/ai"
                  >
                    AI Song Creator
                  </Link>
                  <Link
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50"
                    href="/catalog"
                  >
                    Music Catalog
                  </Link>
                  <Link
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50"
                    href="/licensing"
                  >
                    Licensing
                  </Link>
                </div>

                <div className="py-1">
                  <Link
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50"
                    href="/transform"
                  >
                    Why You Need This
                  </Link>
                  <Link
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50"
                    href="/about"
                  >
                    About
                  </Link>
                  <Link
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50"
                    href="/contact"
                  >
                    Contact
                  </Link>
                </div>

                {/* External */}
                <div className="py-1">
                  <a
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50"
                    href={TIKTOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    TikTok
                  </a>
                  <a
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50"
                    href={YOUTUBE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    YouTube
                  </a>
                </div>
              </div>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <details className="relative md:hidden">
            <summary className="list-none cursor-pointer rounded-lg border border-neutral-200 px-2.5 py-1.5 text-xs font-medium sm:rounded-xl sm:px-3 sm:text-sm">
              Menu
            </summary>

            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl sm:w-64">
              <Link
                className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50"
                href="/catalog"
              >
                Music Catalog
              </Link>
              <Link
                className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50"
                href="/blueprint-landing"
              >
                Blueprint
              </Link>
              <Link
                className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50"
                href="/rnb-blueprint"
              >
                Create
              </Link>
              <Link
                className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50"
                href="/ai"
              >
                AI Song Creator
              </Link>
              <Link
                className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50"
                href="/licensing"
              >
                Licensing
              </Link>
              <Link
                className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50"
                href="/transform"
              >
                Why You Need This
              </Link>
              <Link
                className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50"
                href="/about"
              >
                About
              </Link>
              <Link
                className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50"
                href="/contact"
              >
                Contact
              </Link>

              <div className="mt-2 border-t border-neutral-200 pt-2">
                <a
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50"
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TikTok
                </a>
                <a
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50"
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </a>
              </div>
            </div>
          </details>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:gap-8 sm:py-10 md:grid-cols-2 md:items-center md:gap-10 lg:gap-12 lg:px-8 lg:py-16 xl:gap-16">
        {/* Left panel (purple card) */}
        <section className="order-2 md:order-1">
          <div className="rounded-2xl bg-[#7b6cd9] p-6 text-white shadow-xl sm:rounded-3xl sm:p-8 lg:p-10">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
              PULSENEXIS
            </h1>
            <p className="mt-2 text-sm opacity-90 sm:mt-3 sm:text-base/7">
              Music Catalog · PulseNexis
            </p>

            {/* BUTTON STACK */}
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              {/* Catalog */}
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-neutral-900 shadow-sm hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900/20 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm"
              >
                <span className="hidden sm:inline">BROWSE MUSIC CATALOG</span>
                <span className="sm:hidden">CATALOG</span>
              </Link>

              {/* Licensing */}
              <Link
                href="/licensing"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-4 py-2.5 text-xs font-semibold text-neutral-900 shadow-lg transition-all duration-200 hover:from-emerald-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm"
              >
                <span className="hidden sm:inline">
                  MUSIC LICENSING &amp; PARTNERSHIPS
                </span>
                <span className="sm:hidden">LICENSING</span>
              </Link>

              {/* Blueprint */}
              <Link
                href="/blueprint-landing"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 px-4 py-2.5 text-xs font-semibold text-neutral-900 shadow-lg transition-all duration-200 hover:from-yellow-600 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm"
              >
                R&amp;B BLUEPRINT
              </Link>

              {/* AI Song Creator */}
              <Link
                href="/ai"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg transition-all duration-200 hover:from-indigo-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm"
              >
                AI SONG CREATOR
              </Link>

              {/* TikTok (NEW) */}
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 px-4 py-2.5 text-xs font-semibold text-white shadow-lg transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/30 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm"
                aria-label="PulseNexis on TikTok (opens in a new tab)"
              >
                <span className="hidden sm:inline">Follow on TikTok</span>
                <span className="sm:hidden">TIKTOK</span>
              </a>

              {/* Why You Need This */}
              <Link
                href="/transform"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg transition-all duration-200 hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm"
              >
                <span className="hidden sm:inline">WHY YOU NEED THIS</span>
                <span className="sm:hidden">WHY THIS?</span>
              </Link>

              {/* External tools */}
              <a
                href={PROMPTBASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg transition-all duration-200 hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm"
              >
                <span className="hidden sm:inline">
                  R&amp;B ALBUM COVER GENERATOR
                </span>
                <span className="sm:hidden">COVER GEN</span>
              </a>

              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm"
              >
                <span className="hidden sm:inline">Join PulseNexis Now</span>
                <span className="sm:hidden">JOIN NOW</span>
              </a>

              <a
                href={FANBASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm"
                aria-label="PulseNexis on Fanbase (opens in a new tab)"
              >
                <span className="hidden sm:inline">Visit us on Fanbase</span>
                <span className="sm:hidden">FANBASE</span>
              </a>

              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm"
              >
                <span className="hidden sm:inline">Join us on YouTube</span>
                <span className="sm:hidden">YOUTUBE</span>
              </a>
            </div>
          </div>
        </section>

        {/* Right panel (logo image) */}
        <section className="order-1 md:order-2">
          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 shadow-xl sm:rounded-3xl">
            <Image
              src={LOGO_URL}
              alt="PulseNexis hero artwork"
              width={800}
              height={600}
              className="aspect-[4/3] w-full object-cover sm:aspect-[16/12]"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-white sm:p-4">
              <p className="text-base font-bold tracking-wide drop-shadow sm:text-lg">
                PULSE NEXIS
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-neutral-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-3 py-6 text-xs text-neutral-600 sm:gap-4 sm:px-4 sm:py-8 sm:text-sm md:flex-row lg:px-8">
          <p className="text-center md:text-left">
            <span className="hidden sm:inline">
              © {new Date().getFullYear()} Honey Drip Records · All rights
              reserved.
            </span>
            <span className="sm:hidden">
              © {new Date().getFullYear()} Honey Drip Records
            </span>
          </p>
          <div className="flex items-center gap-3 sm:gap-5">
            <Link className="transition-colors hover:text-neutral-900" href="/terms">
              Terms
            </Link>
            <Link className="transition-colors hover:text-neutral-900" href="/privacy">
              Privacy
            </Link>
            <Link className="transition-colors hover:text-neutral-900" href="/support">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
