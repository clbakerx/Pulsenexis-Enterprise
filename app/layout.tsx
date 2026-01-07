import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConsentBanner from "@/components/ConsentBanner";

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
  description: "Music Catalog • PulseNexis — Device Fingerprinting & Analytics Solutions",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Global header */}
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm">
                PN
              </span>
              <span>PulseNexis</span>
            </Link>

            <nav className="flex items-center gap-4 text-sm">
              <Link className="hover:underline" href="/catalog/packs">
                Packs
              </Link>
              <Link className="hover:underline" href="/custom-music-kits">
                Custom Kits
              </Link>
              <Link className="hover:underline" href="/licensing">
                Licensing
              </Link>
              <Link className="hover:underline" href="/support">
                Support
              </Link>
            </nav>
          </div>
        </header>

        {/* Page content */}
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>

        {/* Footer bits */}
        <ConsentBanner />
      </body>
    </html>
  );
}
