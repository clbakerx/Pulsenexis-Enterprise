import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConsentBanner from "./components/ConsentBanner";
import TrafficMeter from "./components/TrafficMeter";
import { CartProvider } from "./providers";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pulsenexis Enterprises",
  description:
    "Music Catalog • PulseNexis — Device Fingerprinting & Analytics Solutions",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <CartProvider>
            <header className="border-b bg-white">
              <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm">
                    PN
                  </span>
                  <span>PulseNexis</span>
                </Link>
                <div className="flex items-center gap-4">
                  <nav className="flex items-center gap-4 text-sm">
                    <Link className="hover:underline" href="/packs">
                      Packs
                    </Link>
                    <Link className="hover:underline" href="/cinema">
                      Cinema
                    </Link>
                    <Link className="hover:underline" href="/licensing">
                      Licensing
                    </Link>
                    <Link className="hover:underline" href="/support">
                      Support
                    </Link>
                    <Link className="hover:underline" href="/pulsenexis-download">
                      PulseNexis Download™
                    </Link>
                    <Link
                      className="hover:underline font-medium text-violet-600"
                      href="/sample"
                    >
                      AI Video Sample
                    </Link>
                    <Link
                      href="/studio"
                      className="rounded-full bg-violet-600 px-4 py-1.5 text-white hover:bg-violet-700 transition-colors"
                    >
                      🎬 Studio
                    </Link>
                  </nav>
                  <div className="hidden sm:block">
                    <TrafficMeter />
                  </div>
                </div>
              </div>
            </header>
            <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
            <ConsentBanner />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
