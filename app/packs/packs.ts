export type PackTrack = {
  id: string;
  title: string;
  previewUrl: string; // required
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
        title: "Love Dont Leave Me",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Jazz/Love-Dont-Leave-Me/Love%20Don't%20Leave%20Me_30secSample.mp3",
      },
      {
        id: "jn-04",
        title: "Love Dont Leave Me V2",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Jazz/Love-Dont-Leave-Me/Love%20Don't%20Leave%20Me%20(V2)_30secSample.mp3",
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
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/R-%26-B-Blueprint-Pack/Late-Night-Drive/samples/Late-Night-Drive-16Bar.mp3",
      },
      {
        id: "heart-on-read",
        title: "Heart On Read",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/R-%26-B-Blueprint-Pack/Heart-on-Read/samples/Heart-on-Read-16Bar.mp3",
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
    ],
  },
    {
    slug: "jn",
    title: "Jazz Nights",
    description: "Test pack to confirm deploy + rendering is working.",
    genre: "jazz",
    bpmRange: "80–90",
    mood: "Test • Smooth • Clean",
    tracks: [
      {
        id: "jn-05",
        title: "Jazz Nights",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Jazz/Life-Finally-Smiles/Life%20Finally%20Smiles_30secSample.mp3",
      },
      {
        id: "jst-02",
        title: "Jazz Nights",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Jazz/Love-Dont-Leave-Me/Love%20Don't%20Leave%20Me_30secSample.mp3",
      },
    ],
  },
  {
    slug: "rnb-pack",
    title: "R&B Pack",
    description: "R&B selections to elevate your content.",
    genre: "rnb",
    bpmRange: "72–78",
    mood: "Grown • Smooth • Warm",
    tracks: [
      {
        id: "rnb-01",
        title: "Pillow Talk",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/R-%26-B-Blueprint-Pack/Pillow-Talk/samples/Pillow-Talk-16Bar.mp3",
      },
      {
        id: "rnbt-02",
        title: "After Hours",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/R-%26-B-Blueprint-Pack/After-Hours/samples/After-Hours-16Bar.mp3",
      },
    ],
  },

  {
    slug: "soul-pack",
    title: "Soul Pack",
    description: "Soul inspired selections to elevate your content.",
    genre: "soul",
    bpmRange: "78–92",
    mood: "Soulful • Warm • Test",
    tracks: [
      {
        id: "soul-01",
        title: "Something New",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Something%20New.mp3",
      },
      {
        id: "soult-02",
        title: "Lead The Way",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Lead%20The%20Way.mp3",
      },
      {
    slug: "soul-pack",
    title: "Soul Pack",
    description: "Soul inspired selections to elevate your content.",
    genre: "soul",
    bpmRange: "78–92",
    mood: "Soulful • Warm • Test",
    tracks: [
      {
        id: "soul-03",
        title: "If It’s Real",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/IF%20IT'S%20REAL.mp3",
      },
      {
        id: "soult-04",
        title: "How Many Love Songs",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/How%20Many%20Love%20Songs.mp3",
      },
    ],
  },
