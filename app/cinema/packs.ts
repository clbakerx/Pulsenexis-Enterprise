export type CinemaKit = {
  title: string;
  subtitle: string;
  description: string;
  slug: string;
  priceLabel?: string;
  badge?: string;
};

const DEFAULT_PRICE_LABEL = "$169 one-time license";

export const CINEMA_KITS: CinemaKit[] = [
  {
    title: "Cinematic Tool Kits Vol 1",
    subtitle: "Reveal Toolkit",
    description: "Trailer-ready rises, reveals, and cinematic moments.",
    slug: "cinematic-reveal-toolkit-vol1",
    priceLabel: DEFAULT_PRICE_LABEL,
    badge: "Film & Trailer Ready",
  },
  {
    title: "Cinematic Tool Kits Vol 2",
    subtitle: "Reveal Toolkit",
    description: "More tension, lifts, pulses, and reveal hits.",
    slug: "cinematic-reveal-toolkit-vol2",
    priceLabel: DEFAULT_PRICE_LABEL,
    badge: "Film & Trailer Ready",
  },
  {
    title: "Cinematic Tool Kits Vol 3",
    subtitle: "Reveal Toolkit",
    description: "Bigger builds and modern trailer beds.",
    slug: "cinematic-reveal-toolkit-vol3",
    priceLabel: DEFAULT_PRICE_LABEL,
    badge: "Film & Trailer Ready",
  },
  {
    title: "Cinematic Tool Kits Vol 4",
    subtitle: "Reveal Toolkit",
    description: "Peak-energy builds, stingers, and climax cues.",
    slug: "cinematic-reveal-toolkit-vol4",
    priceLabel: DEFAULT_PRICE_LABEL,
    badge: "Film & Trailer Ready",
  },
];
