// lib/cinemaCatalog.ts

type Preview = { label: string; src: string };

type Cue = {
  id: string;
  title: string;
  bpm?: number;
  key?: string;
  previewA?: Preview;
  previewB?: Preview;
};

type CinemaPack = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stripeUrl?: string;
  cues: Cue[];
};

export const CINEMA_PACKS: readonly CinemaPack[] = [
  {
    slug: "cinematic-reveal-toolkit-vol1",
    name: "Cinematic Tool Kits Vol 1",
    tagline: "Reveal Toolkit",
    description: "Trailer-ready rises, reveals, and cinematic moments.",
    stripeUrl: "https://buy.stripe.com/8x2aEX9MvbHFgpb8lv4ZG0g", // <-- replace with your real Stripe link
    cues: [
      {
        id: "vol1-01",
        title: "Gravity Rise",
        bpm: 120,
        key: "C minor",
        previewA: {
          label: "Preview A",
          src: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Gravity-Rise/Gravity%20Rise%20%E2%80%94%2030sec.mp3",
        },
        previewB: {
          label: "Preview B",
          src: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Cinema/Gravity-Rise/Gravity%20Rise%20%E2%80%94%2060sec.mp3",
        },
      },
      // add more cues here...
    ],
  },

  {
    slug: "cinematic-reveal-toolkit-vol2",
    name: "Cinematic Tool Kits Vol 2",
    tagline: "Reveal Toolkit",
    description: "More tension, lifts, pulses, and reveal hits.",
    stripeUrl: "https://buy.stripe.com/6oU14n6Aj5jha0NfNX4ZG0h",
    cues: [],
  },

  {
    slug: "cinematic-reveal-toolkit-vol3",
    name: "Cinematic Tool Kits Vol 3",
    tagline: "Reveal Toolkit",
    description: "Bigger builds and modern trailer beds.",
    stripeUrl: "https://buy.stripe.com/6oUfZhf6PbHF2yl6dn4ZG0i",
    cues: [],
  },

  {
    slug: "cinematic-reveal-toolkit-vol4",
    name: "Cinematic Tool Kits Vol 4",
    tagline: "Reveal Toolkit",
    description: "Peak-energy builds, stingers, and climax cues.",
    stripeUrl: "https://buy.stripe.com/6oU3cv0bVdPN7SFgS14ZG0j",
    cues: [],
  },
] as const;
// Note: The 'as const' assertion ensures that the CINEMA_PACKS array and its contents are treated as immutable,