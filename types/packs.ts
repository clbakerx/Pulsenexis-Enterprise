// types/packs.ts

export type PackTierKey = "starter" | "pro" | "exclusive";

export type PackTier = {
  key: PackTierKey;
  name: string;
  price: number; // USD display price
  description: string;
  includes: string[];
  stripePriceId?: string; // add later
};

export type Pack = {
  slug: string;
  title: string;
  tags: string[];
  previewUrl: string; // 30–60s preview audio
  shortDescription: string;

  // Short “what’s included” bullets for cards
  includesSummary: string[];

  // Full “what’s included” for detail page
  deliveryFormatText: string; // paste folder template here

  tiers: Record<PackTierKey, PackTier>;

  // Add later for fulfillment
  downloads?: Partial<Record<PackTierKey, string>>; // url per tier
};
