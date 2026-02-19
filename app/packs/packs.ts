export type PackTrack = {
  id: string
  title: string
  previewUrl: string
}

export type Pack = {
  slug: string
  title: string
  description: string
  genre: "rnb" | "soul" | "jazz"
  bpmRange?: string
  mood?: string
  tracks: PackTrack[]
}

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
        id: "life-finally-smiles",
        title: "Life Finally Smiles",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Jazz/Life-Finally-Smiles/Life%20Finally%20Smiles_30secSample.mp3",
      },
      {
        id: "life-finally-smiles-v2",
        title: "Life Finally Smiles V2",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Jazz/Life-Finally-Smiles/Life-Finally-Smiles-(Ver_2)_30secSample.mp3",
      },
      {
        id: "love-dont-leave-me",
        title: "Love Dont Leave Me",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Jazz/Love-Dont-Leave-Me/Love%20Don't%20Leave%20Me_30secSample.mp3",
      },
      {
        id: "love-dont-leave-me-v2",
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
    slug: "jazz-pack-two",
    title: "Jazz Pack Two",
    description: "Jazz cuts to elevate your content.",
    genre: "jazz",
    bpmRange: "80–90",
    mood: "Jazz • Smooth • Clean",
    tracks: [
      {
        id: "in-the-space-between",
        title: "In The Space Between",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Jazz/In-The-Space-Between/In%20the%20Space%20Between_30secSample.mp3",
      },
      {
        id: "in-the-space-between-v2",
        title: "In The Space Between V2",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Jazz/In-The-Space-Between/In%20the%20Space%20Between%20(V2)_30secSample.mp3",
      },
    ],
  },

  {
    slug: "jazz-nights-3",
    title: "Jazz Nights 3",
    description: "Smooth late-night jazz textures with intimate lounge energy.",
    genre: "jazz",
    bpmRange: "70–92",
    mood: "Late-night • Lounge • Warm",
    tracks: [
      {
        id: "quiet-confidence",
        title: "Quiet Confidence",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Jazz/Quiet-Confidence/Quiet%20Confidence_30secSample.mp3",
      },
      {
        id: "quiet-confidence-v2",
        title: "Quiet Confidence V2",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Jazz/Quiet-Confidence/Quiet%20Confidence%20(V2)_30secSample.mp3",
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
        id: "pillow-talk",
        title: "Pillow Talk",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/R-%26-B-Blueprint-Pack/Pillow-Talk/samples/Pillow-Talk-16Bar.mp3",
      },
      {
        id: "after-hours",
        title: "After Hours",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/R-%26-B-Blueprint-Pack/After-Hours/samples/After-Hours-16Bar.mp3",
      },
    ],
  },

  {
    slug: "soul-pack-1",
    title: "Soul Pack 1",
    description: "Soul inspired selections to elevate your content.",
    genre: "soul",
    bpmRange: "78–92",
    mood: "Soulful • Warm • Test",
    tracks: [
      {
        id: "something-new",
        title: "Something New",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Something%20New.mp3",
      },
      {
        id: "lead-the-way",
        title: "Lead The Way",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Lead%20The%20Way.mp3",
      },
    ],
  },

  {
    slug: "soul-pack-2",
    title: "Soul Pack 2",
    description: "Soul inspired selections to elevate your content.",
    genre: "soul",
    bpmRange: "78–92",
    mood: "Soulful • Warm • Test",
    tracks: [
      {
        id: "if-its-real",
        title: "If It’s Real",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/IF%20IT%27S%20REAL.mp3",
      },
      {
        id: "how-many-love-songs",
        title: "How Many Love Songs",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/How%20Many%20Love%20Songs.mp3",
      },
    ],
  },

  {
    slug: "soul-pack-3",
    title: "Soul Pack 3",
    description: "Soul inspired selections to elevate your content.",
    genre: "soul",
    bpmRange: "78–92",
    mood: "Soulful • Warm • Test",
    tracks: [
      {
        id: "silhouette",
        title: "Silhouette",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Catalog/Silhouette/SilhouetteV2_30secSample.mp3",
      },
      {
        id: "nothing-falls-through",
        title: "Nothing Falls Through",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Catalog/Nothing-Falls-Through/Nothing%20Falls%20Through_60Sec.mp3",
      },
    ],
  },

  {
    slug: "soul-pack-4",
    title: "Soul Pack 4",
    description: "Soul inspired selections to elevate your content.",
    genre: "soul",
    bpmRange: "78–92",
    mood: "Soulful • Warm • Test",
    tracks: [
      {
        id: "weekday-lover",
        title: "Weekday-Lover",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Weekday-Lover/Weekday-Lover_30secSample.mp3",
      },
      {
        id: "weekday-lover-v2",
        title: "Weekday-Lover V2",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Weekday-Lover/Weekday-Lover(V2)_30secSample.mp3",
      },
    ],
  },

  {
    slug: "soul-pack-5",
    title: "Soul Pack 5",
    description: "Soul inspired selections to elevate your content.",
    genre: "soul",
    bpmRange: "78–92",
    mood: "Soulful • Warm • Test",
    tracks: [
      {
        id: "another-silly-love-song",
        title: "Another Silly Love Song",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Another-Silly-Love-Song/Another%20Silly%20Love%20Song_30secSample.mp3",
      },
      {
        id: "another-silly-love-song-v2",
        title: "Another Silly Love Song V2",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Another-Silly-Love-Song/Another%20Silly%20Love%20Song_V2_30secSample.mp3",
      },
    ],
  },

  {
    slug: "soul-pack-6",
    title: "Soul Pack 6",
    description: "Soul inspired selections to elevate your content.",
    genre: "soul",
    bpmRange: "78–92",
    mood: "Soulful • Warm • Test",
    tracks: [
      {
        id: "but-this-ones-real",
        title: "But This One's Real",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/But-This-Ones-Real/But-This-One's-Real_30secSample.mp3",
      },
      {
        id: "but-this-ones-real-v2",
        title: "But This One's Real V2",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/But-This-Ones-Real/But-This-One's-Real(V2)30secSample.mp3",
      },
    ],
  },

  {
    slug: "soul-pack-7",
    title: "Soul Pack 7",
    description: "Soul inspired selections to elevate your content.",
    genre: "soul",
    bpmRange: "78–92",
    mood: "Soulful • Warm • Test",
    tracks: [
      {
        id: "nothing-falls-through",
        title: "Nothing Falls Through",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Nothing-Falls-Through/Nothing-Falls-Through_60Sec.mp3",
      },
      {
        id: "nothing-falls-through-v2",
        title: "Nothing Falls Through V2",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/Nothing-Falls-Through/Nothing-Falls-Through30secSampleV2.mp3",
      },
      {
    slug: "soul-pack-8",
    title: "Soul Pack 8",
    description: "Soul inspired selections to elevate your content.",
    genre: "soul",
    bpmRange: "78–92",
    mood: "Soulful • Warm • Test",
    tracks: [
      {
        id: "december",
        title: "December",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/December/DecemberSample.mp3",
      },
      {
        id: "december-v2",
        title: "December V2",
        previewUrl:
          "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Packs/December/DecemberV2Sample.mp3",
      },
    ],
  },
]
