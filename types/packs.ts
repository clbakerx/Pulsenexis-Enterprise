// types/packs.ts
export type PackTrack = {
  id: string;
  title: string;
  file: string; // relative to packFolder, e.g. "Midnight Clean/samples/Midnight Clean_sample.mp3"
};

export type PackTier = {
  key: string;
  name: string;
  price: number;
  description: string;
  includes: string[];
};

export type Pack = {
  slug: string;
  title: string;
  tags: string[];

  previewUrl: string;
  shortDescription: string;
  includesSummary: string[];
  deliveryFormatText: string;

  tiers: {
    starter: PackTier;
    pro: PackTier;
    exclusive: PackTier;
  };

  // ✅ required for FileDN builds
  packFolder: string;

  // ✅ samples list
  tracks: PackTrack[];
};