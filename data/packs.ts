// data/packs.ts
import type { Pack } from "@/types/packs";

export const FILEDN_BASE = "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/";

/**
 * Builds a full FileDN URL from:
 *  - packFolder: "Packs/Midnight Clean Groove Kit"
 *  - file:      "Midnight Clean/samples/Midnight Clean_sample.mp3"
 *
 * Result:
 *  https://filedn.com/.../Packs/Midnight%20Clean%20Groove%20Kit/Midnight%20Clean/samples/Midnight%20Clean_sample.mp3
 */
export function buildFileDNUrl(packFolder: string, file: string) {
  const cleanFolder = String(packFolder ?? "").replace(/^\/+|\/+$/g, "");
  const cleanFile = String(file ?? "").replace(/^\/+/, "");

  const encodedFolder = cleanFolder
    .split("/")
    .map((seg) => {
      try {
        return encodeURIComponent(decodeURIComponent(seg));
      } catch {
        return encodeURIComponent(seg);
      }
    })
    .join("/");

  const encodedFile = cleanFile
    .split("/")
    .map((seg) => {
      try {
        return encodeURIComponent(decodeURIComponent(seg));
      } catch {
        return encodeURIComponent(seg);
      }
    })
    .join("/");

  const base = FILEDN_BASE.replace(/\/+$/, "/");
  return `${base}${encodedFolder}/${encodedFile}`;
}

export const DELIVERY_FORMAT = `PulseNexis Delivery Format

/01_FULL
TrackName_Full.wav
TrackName_Full.mp3

/02_CUTDOWNS
TrackName_60s.wav
TrackName_30s.wav

/03_LOOPS
TrackName_Loop_08bars.wav
TrackName_Loop_16bars.wav

/04_STEMS (Brand Exclusive only)
Drums.wav
Bass.wav
Other.wav
Vocals.wav

/05_METADATA
TrackName_Metadata.txt (BPM, key, mood, tags, ISRC optional)
`;

export const PACKS: Pack[] = [
  {
    slug: "midnight-clean-groove-kit",
    title: "Midnight Clean Groove Kit",
    tags: ["Chill", "Late Night", "Smooth", "Creator Safe", "Podcast Bed"],

    packFolder: "Packs/Midnight Clean Groove Kit",

    previewUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Midnight%20Clean_sample.mp3",

    shortDescription:
      "Smooth late-night grooves designed for creator content—clean, loopable, and easy to edit.",

    includesSummary: [
      "Full track (WAV + MP3)",
      "Cutdowns (60/30)",
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

    tracks: [
      {
        id: "m1",
        title: "Midnight Clean (Sample)",
        // ✅ relative to packFolder
        file: "Midnight Clean/samples/Midnight Clean_sample.mp3",
      },
    ],
  },
];

export function getPackBySlug(slug: string) {
  const s = decodeURIComponent(String(slug ?? "")).trim().toLowerCase();
  return PACKS.find((p) => p.slug.trim().toLowerCase() === s) ?? null;
}