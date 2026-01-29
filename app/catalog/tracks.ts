export type Track = {
  id: string;
  title: string;
  artist?: string | null;
  mood?: string;
  bpm?: number;
  key?: string;
  previewSrc?: string; // full URL OR filename
};

export const TRACKS: Track[] = [
  {
    id: "t1",
    title: "Come Get This Love (Remix)",
    artist: "PulseNexis",
    mood: "Grown & soulful",
    bpm: 76,
    key: "E minor",
    previewSrc:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Come%20Get%20This%20Love%20(Remix).mp3",
  },

  {
    id: "t2",
    title: "Your Love Comes With Side Effects",
    artist: "PulseNexis",
    previewSrc:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Your%20Love%20Comes%20With%20Side%20Effects.mp3",
  },

  {
    id: "t3",
    title: "You Got Me Funked Up",
    artist: "PulseNexis",
    previewSrc:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/You%20Got%20Me%20Funked%20Up.mp3",
  },

  // ✅ Add more tracks the same way:
  // {
  //   id: "t4",
  //   title: "You And Me",
  //   artist: "PulseNexis",
  //   previewSrc: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/You%20And%20Me.mp3",
  // },
  //{
  //   id: "t5",
  //   title: "Worth The Wait (Remix)",
  //   artist: "PulseNexis",
  //   previewSrc: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Worth%20The%20Wait%20(Remix).mp3",
  // },
  //{
  //   id: "t6",
  //   title: "With You",
  //   artist: "PulseNexis",
  //   previewSrc: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/With%20You_Sample_1.mp3",
  // },
];
