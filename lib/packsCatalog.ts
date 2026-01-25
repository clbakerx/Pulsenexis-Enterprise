export type Preview = {
  id: string;
  title: string;
  mood: string;
  bpm: number;
  key: string;

  trackFolder: string;
  fileName: string;

  sources?: string[]; // optional full URL fallbacks
};

export type Pack = {
  slug: string;
  name: string;
  badge?: string;
  tagline: string;
  description: string;
  bullets: string[];
  packRoot: string; // can be "Packs/..." OR "https://filedn.com/.../Packs/..."
  previews: Preview[];
};

const FILEDN_BASE = "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/";

// Optional helper if you like full URL roots:
function joinRoot(...parts: string[]) {
  return FILEDN_BASE + parts.map(encodeURIComponent).join("/") + "/";
}

// ✅ Robust: works for BOTH full URL packRoot and relative packRoot
export function buildSampleUrl(packRoot: string, trackFolder: string, fileName: string) {
  const root = packRoot.endsWith("/") ? packRoot : packRoot + "/";
  const base = /^https?:\/\//i.test(root) ? root : FILEDN_BASE + root;

  return base + [trackFolder, "samples", fileName].map(encodeURIComponent).join("/");
}

const PACKS: Pack[] = [
  {
    slug: "rnb-blueprint",
    name: "R&B Blueprint Pack",
    badge: "Fan Favorite",
    tagline: "Grown & soulful. Ready for love scenes and late-night vibes.",
    description:
      "A polished R&B starter pack with warm chords, smooth bass, and emotional bounce for content that needs heart.",
    bullets: ["Romantic + smooth tempos", "Clean loop points", "Best for reels + shorts"],

    // ✅ matches your confirmed working URL folder: R&B-Blueprint-Pack -> R%26B-Blueprint-Pack
    packRoot: joinRoot("Packs", "R&B-Blueprint-Pack"),

    previews: [
      {
        id: "heart-on-read",
        title: "Heart On Read",
        mood: "Smooth",
        bpm: 76,
        key: "B♭",
        trackFolder: "Heart-on-Read",
        fileName: "Heart-on-Read-16Bar.mp3",
        sources: [
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/R%26B-Blueprint-Pack/Heart-on-Read/samples/Heart-on-Read-16Bar.mp3",
        ],
      },
      {
        id: "late-night-drive",
        title: "Late Night Drive",
        mood: "Romantic",
        bpm: 74,
        key: "A♭",
        trackFolder: "Late-Night-Drive",
        fileName: "Late-Night-Drive-16Bar.mp3",
      },
      {
        id: "after-hours",
        title: "After Hours",
        mood: "Emotional",
        bpm: 72,
        key: "C minor",
        trackFolder: "After-Hours",
        fileName: "After-Hours-16Bar.mp3",
      },
      {
        id: "pillow-talk",
        title: "Pillow Talk",
        mood: "Warm",
        bpm: 78,
        key: "F",
        trackFolder: "Pillow-Talk",
        fileName: "Pillow-Talk-16Bar.mp3",
      },
      {
        id: "midnight-promise",
        title: "Midnight Promise",
        mood: "Soulful",
        bpm: 70,
        key: "E♭",
        trackFolder: "Midnight-Promise",
        fileName: "Midnight-Promise-16Bar.mp3",
      },
    ],
  },

  {
    slug: "trap-soul",
    name: "Trap Soul Pack",
    badge: "New",
    tagline: "Modern R&B with 808 weight.",
    description:
      "Dark-to-warm Trap Soul palette: 808s, airy keys, and tension chords that feel current and cinematic.",
    bullets: ["808 + ambient texture", "Hook-friendly grooves", "Best for story content"],

    // ✅ now valid because buildSampleUrl prefixes FILEDN_BASE if needed
    packRoot: "Packs/Trap-Soul-Pack/",

    previews: [
      {
        id: "midnight-808",
        title: "Midnight 808",
        mood: "Cinematic",
        bpm: 74,
        key: "F minor",
        trackFolder: "Midnight-808",
        fileName: "Midnight-808-16Bar.mp3",
      },
      {
        id: "drip-in-the-air",
        title: "Drip In The Air",
        mood: "Airy",
        bpm: 76,
        key: "A♭ minor",
        trackFolder: "Drip-in-the-Air",
        fileName: "Drip-in-the-Air-16Bar.mp3",
      },
      {
        id: "tension-love",
        title: "Tension Love",
        mood: "Dark/Warm",
        bpm: 72,
        key: "C minor",
        trackFolder: "Tension-Love",
        fileName: "Tension-Love-16Bar.mp3",
      },
      {
        id: "hook-season",
        title: "Hook Season",
        mood: "Hooky",
        bpm: 78,
        key: "E minor",
        trackFolder: "Hook-Season",
        fileName: "Hook-Season-16Bar.mp3",
      },
    ],
  },
];

export function getAllPacks() {
  return PACKS;
}

export function getPackBySlug(slug: string) {
  return PACKS.find((p) => p.slug === slug) ?? null;
}
