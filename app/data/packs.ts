export type PackTrack = {
  id: string;
  title: string;
  file: string; // mp3 filename OR relative path inside the pack folder
};

export type Pack = {
  slug: string;        // /packs/[slug]
  cardTitle: string;   // card name on /packs
  description: string;
  tags: string[];
  packFolder: string;  // EXACT folder name under /Packs/
  stripeUrl: string;   // Buy Now link
  tracks: PackTrack[]; // preview page track list
};

export const FILEDN_BASE =
  "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/";

export const PACKS: Pack[] = [
  {
    slug: "trap-soul-pack",
    cardTitle: "Trap Soul Pack",
    description: "Dark, modern R&B textures and bounce-ready grooves.",
    tags: ["Trap-Soul", "Modern", "Bounce"],
    packFolder: "Trap-Soul-Pack",
    stripeUrl: "https://buy.stripe.com/fZu3cv7En2751uh8lv4ZG0l",
    tracks: [],
  },
  {
    slug: "smooth-jazz-pack",
    cardTitle: "Smooth Jazz Pack",
    description: "Warm chords and classy late-night polish.",
    tags: ["Smooth", "Jazz", "Clean"],
    packFolder: "Smooth-Jazz-Pack",
    stripeUrl: "https://buy.stripe.com/fZu3cv7En2751uh8lv4ZG0l",
    tracks: [],
  },
  {
    slug: "rnb-blueprint-pack",
    cardTitle: "R&B Blueprint Pack",
    description: "Signature PulseNexis R&B foundations built for creators.",
    tags: ["R&B", "Blueprint", "Grown"],
    packFolder: "R-%26-B-Blueprint-Pack",
    stripeUrl: "https://buy.stripe.com/fZu3cv7En2751uh8lv4ZG0l",
    tracks: [
      { id: "pillow-talk", title: "Pillow Talk", file: "Pillow-Talk-16Bar.mp3" },
      // add the rest one-by-one (file can also be "Folder/samples/File.mp3" if needed)
    ],
  },
  {
    slug: "hip-hop-drums-pack",
    cardTitle: "Hip Hop Drums Pack",
    description: "Punchy drum beds, loops, and bounce-ready foundations.",
    tags: ["Hip-Hop", "Drums", "Hard"],
    packFolder: "Hip-Hop-Drums-Pack",
    stripeUrl: "https://buy.stripe.com/fZu3cv7En2751uh8lv4ZG0l",
    tracks: [],
  },
  {
    slug: "dance-pop-pack",
    cardTitle: "Dance Pop Pack",
    description: "Bright, uplifting energy for modern edits and promos.",
    tags: ["Dance", "Pop", "Uplift"],
    packFolder: "Dance-Pop-Pack",
    stripeUrl: "https://buy.stripe.com/fZu3cv7En2751uh8lv4ZG0l",
    tracks: [],
  },
  {
    slug: "cinematic-pack",
    cardTitle: "Cinematic Pack",
    description: "Trailer-ready cues, tension beds, and big reveal moments.",
    tags: ["Cinematic", "Trailer", "Tension"],
    packFolder: "Cinematic-Pack",
    stripeUrl: "https://buy.stripe.com/fZu3cv7En2751uh8lv4ZG0l",
    tracks: [],
  },
];

export function getPackBySlug(slug: string) {
  return PACKS.find((p) => p.slug === slug) || null;
}
