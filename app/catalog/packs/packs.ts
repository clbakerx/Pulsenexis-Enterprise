export type PackTrack = {
  id: string;
  title: string;
  previewUrl?: string;
};

export type Pack = {
  slug: string;
  title: string;
  description: string;
  genre: "rnb" | "soul" | "jazz";
  bpmRange?: string;
  mood?: string;
  tracks: PackTrack[];
};

export const PACKS: Pack[] = [
  {
    slug: "jazz-nights",
    title: "Jazz Nights",
    description: "Late-night jazz textures, warm lounge energy.",
    genre: "jazz",
    bpmRange: "70–92",
    mood: "Late-night • Lounge • Warm",
    tracks: [
      {
        id: "jn-01",
        title: "Life Finally Smiles",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Jazz/Life-Finally-Smiles/Life%20Finally%20Smiles_30secSample.mp3",
      },
      {
        id: "jn-02",
        title: "Life Finally Smiles V2",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Jazz/Life-Finally-Smiles/Life-Finally-Smiles-(Ver_2)_30secSample.mp3",
      },
      {
        id: "jn-03",
        title: "In The Space Between",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Jazz/In-The-Space-Between/In%20the%20Space%20Between_30secSample.mp3",
      },
      {
        id: "jn-04",
        title: "In The Space Between V2",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Jazz/In-The-Space-Between/In%20the%20Space%20Between%20(V2)_30secSample.mp3",
      },
      {
        id: "jn-05",
        title: "After the Applause",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Jazz/After-The-Applause/After%20the%20Applause_30secSample.mp3",
      },
      {
        id: "jn-06",
        title: "After the Applause V2",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Jazz/After-The-Applause/After%20the%20Applause%20(V2)30secSample.mp3",
      },
    ],
  },

  {
    slug: "rnb-blueprint",
    title: "R&B Blueprint Pack",
    description: "Grown & soulful. Ready for love scenes and late-night vibes.",
    genre: "rnb",
    bpmRange: "72–78",
    mood: "Romantic • Smooth • Warm",
    tracks: [
      {
        id: "late-night-drive",
        title: "Late Night Drive",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/R%26B-Blueprint-Pack/Late-Night-Drive/samples/Late-Night-Drive-16Bar.mp3",
      },
      {
        id: "heart-on-read",
        title: "Heart On Read",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/R%26B-Blueprint-Pack/Heart-on-Read/samples/Heart-on-Read-16Bar.mp3",
      },
      {
        id: "after-hours",
        title: "After Hours",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/R%26B-Blueprint-Pack/After-Hours/samples/After-Hours-16Bar.mp3",
      },
      {
        id: "pillow-talk",
        title: "Pillow Talk",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/R%26B-Blueprint-Pack/Pillow-Talk/samples/Pillow-Talk-16Bar.mp3",
      },
    ],
  },

  {
    slug: "trap-soul",
    title: "Trap Soul Pack",
    description:
      "Modern R&B with 808 weight. Dark-to-warm palette with airy keys and tension chords built for current content.",
    genre: "rnb",
    bpmRange: "72–78",
    mood: "808 • Airy • Cinematic",
    tracks: [
      {
        id: "midnight-808",
        title: "Midnight 808",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Trap-Soul-Pack/Midnight-808/samples/Midnight-808-16Bar.mp3",
      },
      {
        id: "drip-in-the-air",
        title: "Drip In The Air",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Trap-Soul-Pack/Drip-in-the-Air/samples/Drip-in-the-Air-16Bar.mp3",
      },
      {
        id: "tension-love",
        title: "Tension Love",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Catalog/Tension-Love/samples/Tension-Love-16Bar.mp3",
      },
      {
        id: "hook-season",
        title: "Hook Season",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Trap-Soul-Pack/Hook-Season/samples/Hook-Season-16Bar.mp3",
      },
    ],
  },
];
