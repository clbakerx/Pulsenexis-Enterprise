// app/grown-and-sexy/page.jsx
// Server Component — owns SEO metadata, fonts, and structured data.
// The interactive UI lives in the client component below it.

import { Cormorant_Garamond, Jost } from "next/font/google";
import GrownAndSexy from "./GrownAndSexy";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const COVER = "https://img.youtube.com/vi/O-0DXj6XHPI/maxresdefault.jpg";

// ---- SEO + metadata targeting (Next.js handles <head> from this object) ----
export const metadata = {
  title: "Grown & Sexy — Late Night R&B Mix | PulseNexis",
  description:
    "Grown & Sexy: 89 minutes of smooth slow jams for late nights. A Quiet Storm R&B and neo-soul compilation from PulseNexis. 21 original tracks, one-stop cleared.",
  keywords: [
    "Quiet Storm Music",
    "Smooth R&B",
    "Slow Jams",
    "Soul Music",
    "Late Night R&B",
    "neo-soul",
    "grown and sexy",
    "PulseNexis",
  ],
  authors: [{ name: "Chris Baker · PulseNexis Music (ASCAP)" }],
  alternates: { canonical: "https://pulsenexis.com/grown-and-sexy" },
  openGraph: {
    type: "music.album",
    siteName: "PulseNexis",
    title: "Grown & Sexy — Late Night R&B Mix",
    description:
      "89 minutes of smooth slow jams for late nights. Quiet Storm. Smooth R&B. Soul. PulseNexis.",
    url: "https://pulsenexis.com/grown-and-sexy",
    images: [{ url: COVER, width: 1280, height: 720 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grown & Sexy — Late Night R&B Mix | PulseNexis",
    description: "89 minutes of smooth slow jams for late nights. Quiet Storm · Smooth R&B · Soul.",
    images: [COVER],
  },
};

// ---- Schema.org structured data for rich results in Google ----
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicAlbum",
  name: "Grown & Sexy — Late Night R&B Mix",
  byArtist: { "@type": "MusicGroup", name: "PulseNexis" },
  genre: ["Quiet Storm", "Smooth R&B", "Slow Jams", "Soul Music", "Late Night R&B"],
  image: COVER,
  url: "https://pulsenexis.com/grown-and-sexy",
  datePublished: "2026",
  copyrightHolder: { "@type": "Organization", name: "PulseNexis Music" },
};

export default function Page() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GrownAndSexy />
    </div>
  );
}
