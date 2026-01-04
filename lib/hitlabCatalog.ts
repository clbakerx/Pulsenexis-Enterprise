export type HitLabSong = {
  title: string;
  slug: string;
  vibe: string;
  bpm?: number;
  key?: string;
  previewUrl?: string;  // mp3 link
  priceCreator?: number;
  priceBusiness?: number;
  priceExclusive?: number;
};

export const HITLAB_SONGS: HitLabSong[] = [
  {
    title: "How Many Love Songs",
    slug: "how-many-love-songs",
    vibe: "Emotional R&B / Grown",
    bpm: 76,
    key: "B♭",
    previewUrl: "", // add mp3 link later
    priceCreator: 39,
    priceBusiness: 149,
    priceExclusive: 999
  },
  {
    title: "Loud and Clear",
    slug: "loud-and-clear",
    vibe: "Confident Midtempo / Smooth",
    bpm: 84,
    key: "A♭",
    previewUrl: "",
    priceCreator: 39,
    priceBusiness: 149,
    priceExclusive: 999
  },
];
