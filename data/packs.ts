// data/packs.ts
import type { Pack } from "@/types/packs";

const DELIVERY_FORMAT = `Delivery Format

/01_FULL
TrackName_Full_2m15s.wav
TrackName_Full_2m15s.mp3

/02_CUTDOWNS
TrackName_60s.wav
TrackName_30s.wav
TrackName_15s.wav
TrackName_06s_Bumper.wav

/03_LOOPS
TrackName_Loop_08bars.wav
TrackName_Loop_16bars.wav

/04_STEMS (Brand Exclusive only)
Drums.wav
Bass.wav
Chords.wav
Melody.wav
FX.wav

/05_METADATA
TrackName_Metadata.txt (BPM, key, mood, tags, ISRC optional)
`;

export const packs: Pack[] = [
  {
    slug: "midnight-clean-groove-kit",
    title: "Midnight Clean Groove Kit",
    tags: ["Chill", "Late Night", "Smooth", "Creator Safe", "Podcast Bed"],
    previewUrl: "https://example.com/previews/midnight-clean-groove.mp3",
    shortDescription:
      "Smooth late-night grooves designed for creator content—clean, loopable, and easy to edit.",
    includesSummary: [
      "Full track (WAV + MP3)",
      "Cutdowns (60/30/15/6)",
      "Loops (8/16 bars)",
      "Metadata (BPM/Key/Tags)",
      "License included",
    ],
    deliveryFormatText: DELIVERY_FORMAT,
    tiers: {
      starter: {
        key: "starter",
        name: "Starter Creator Kit",
        price: 79,
        description: "Everything you need for monetized content—fast.",
        includes: ["Full + Cutdowns + Loops + Metadata", "Creator License"],
      },
      pro: {
        key: "pro",
        name: "Creator Pro Kit",
        price: 249,
        description: "More flexibility for editors + stronger options.",
        includes: ["Starter + 2 alt mixes", "1 revision (custom orders)"],
      },
      exclusive: {
        key: "exclusive",
        name: "Brand Exclusive Kit",
        price: 1250,
        description: "Exclusive usage rights + stems for pro campaigns.",
        includes: ["Pro + stems", "Exclusive usage rights", "Track removed from resale"],
      },
    },
  },

  {
    slug: "uplift-win-theme-kit",
    title: "Uplift & Win Theme Kit",
    tags: ["Motivational", "Bright", "Corporate Clean", "Intro/Outro", "Ads"],
    previewUrl: "https://example.com/previews/uplift-win.mp3",
    shortDescription:
      "High-energy, clean theme music built for intros, ads, and feel-good wins.",
    includesSummary: [
      "Full track (WAV + MP3)",
      "Cutdowns (60/30/15/6)",
      "Loops (8/16 bars)",
      "Metadata (BPM/Key/Tags)",
      "License included",
    ],
    deliveryFormatText: DELIVERY_FORMAT,
    tiers: {
      starter: { key: "starter", name: "Starter Creator Kit", price: 79, description: "Publish-ready kit.", includes: ["Full + Cutdowns + Loops + Metadata", "Creator License"] },
      pro: { key: "pro", name: "Creator Pro Kit", price: 249, description: "Alt mixes + flexibility.", includes: ["Starter + 2 alt mixes", "1 revision (custom orders)"] },
      exclusive: { key: "exclusive", name: "Brand Exclusive Kit", price: 1250, description: "Stems + exclusive usage.", includes: ["Pro + stems", "Exclusive usage rights", "Track removed from resale"] },
    },
  },

  {
    slug: "neon-rnb-bed-kit",
    title: "Neon R&B Bed Kit",
    tags: ["R&B", "Romantic", "Warm Rhodes", "Soft 808", "Vlog Friendly"],
    previewUrl: "https://example.com/previews/neon-rnb.mp3",
    shortDescription:
      "Warm R&B textures for storytime, vlogs, and intimate creator content.",
    includesSummary: [
      "Full track (WAV + MP3)",
      "Cutdowns (60/30/15/6)",
      "Loops (8/16 bars)",
      "Metadata (BPM/Key/Tags)",
      "License included",
    ],
    deliveryFormatText: DELIVERY_FORMAT,
    tiers: {
      starter: { key: "starter", name: "Starter Creator Kit", price: 79, description: "Publish-ready kit.", includes: ["Full + Cutdowns + Loops + Metadata", "Creator License"] },
      pro: { key: "pro", name: "Creator Pro Kit", price: 249, description: "Alt mixes + flexibility.", includes: ["Starter + 2 alt mixes", "1 revision (custom orders)"] },
      exclusive: { key: "exclusive", name: "Brand Exclusive Kit", price: 1250, description: "Stems + exclusive usage.", includes: ["Pro + stems", "Exclusive usage rights", "Track removed from resale"] },
    },
  },

  {
    slug: "focus-mode-loop-kit",
    title: "Focus Mode Loop Kit",
    tags: ["Study", "Ambient", "Minimal", "Background", "No Distractions"],
    previewUrl: "https://example.com/previews/focus-mode.mp3",
    shortDescription:
      "Minimal, clean, repeatable music beds that stay out of the way.",
    includesSummary: [
      "Full track (WAV + MP3)",
      "Cutdowns (60/30/15/6)",
      "Loops (8/16 bars)",
      "Metadata (BPM/Key/Tags)",
      "License included",
    ],
    deliveryFormatText: DELIVERY_FORMAT,
    tiers: {
      starter: { key: "starter", name: "Starter Creator Kit", price: 79, description: "Publish-ready kit.", includes: ["Full + Cutdowns + Loops + Metadata", "Creator License"] },
      pro: { key: "pro", name: "Creator Pro Kit", price: 249, description: "Alt mixes + flexibility.", includes: ["Starter + 2 alt mixes", "1 revision (custom orders)"] },
      exclusive: { key: "exclusive", name: "Brand Exclusive Kit", price: 1250, description: "Stems + exclusive usage.", includes: ["Pro + stems", "Exclusive usage rights", "Track removed from resale"] },
    },
  },

  {
    slug: "cinematic-confidence-kit",
    title: "Cinematic Confidence Kit",
    tags: ["Epic", "Determined", "Trailer Feel", "Sports", "Brand Energy"],
    previewUrl: "https://example.com/previews/cinematic-confidence.mp3",
    shortDescription:
      "Big, confident energy built for promos, sports clips, and bold ads.",
    includesSummary: [
      "Full track (WAV + MP3)",
      "Cutdowns (60/30/15/6)",
      "Loops (8/16 bars)",
      "Metadata (BPM/Key/Tags)",
      "License included",
    ],
    deliveryFormatText: DELIVERY_FORMAT,
    tiers: {
      starter: { key: "starter", name: "Starter Creator Kit", price: 79, description: "Publish-ready kit.", includes: ["Full + Cutdowns + Loops + Metadata", "Creator License"] },
      pro: { key: "pro", name: "Creator Pro Kit", price: 249, description: "Alt mixes + flexibility.", includes: ["Starter + 2 alt mixes", "1 revision (custom orders)"] },
      exclusive: { key: "exclusive", name: "Brand Exclusive Kit", price: 1250, description: "Stems + exclusive usage.", includes: ["Pro + stems", "Exclusive usage rights", "Track removed from resale"] },
    },
  },

  {
    slug: "dreamy-lofi-soul-kit",
    title: "Dreamy Lo-Fi Soul Kit",
    tags: ["Lo-Fi", "Soulful", "Nostalgic", "Smooth", "Storytime"],
    previewUrl: "https://example.com/previews/dreamy-lofi.mp3",
    shortDescription:
      "Soft, nostalgic textures perfect for storytelling and calm edits.",
    includesSummary: [
      "Full track (WAV + MP3)",
      "Cutdowns (60/30/15/6)",
      "Loops (8/16 bars)",
      "Metadata (BPM/Key/Tags)",
      "License included",
    ],
    deliveryFormatText: DELIVERY_FORMAT,
    tiers: {
      starter: { key: "starter", name: "Starter Creator Kit", price: 79, description: "Publish-ready kit.", includes: ["Full + Cutdowns + Loops + Metadata", "Creator License"] },
      pro: { key: "pro", name: "Creator Pro Kit", price: 249, description: "Alt mixes + flexibility.", includes: ["Starter + 2 alt mixes", "1 revision (custom orders)"] },
      exclusive: { key: "exclusive", name: "Brand Exclusive Kit", price: 1250, description: "Stems + exclusive usage.", includes: ["Pro + stems", "Exclusive usage rights", "Track removed from resale"] },
    },
  },
];

export function getPackBySlug(slug: string) {
  return packs.find((p) => p.slug === slug) ?? null;
}
