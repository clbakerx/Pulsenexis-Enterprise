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
  bpmRange?: string; // optional
  mood?: string;     // ✅ optional (fixes build error for pack.mood)
  tracks: PackTrack[];
};

export const PACKS: Pack[] = [
  {
    slug: "jazz-nights",
    title: "Jazz Nights",
    description: "Late-night jazz textures, warm lounge energy.",
    genre: "jazz",
    bpmRange: "70–92", // optional (edit/remove anytime)
    mood: "Late-night • Lounge • Warm", // optional (edit/remove anytime)
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
];
