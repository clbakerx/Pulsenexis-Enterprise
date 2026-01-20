export type LicenseTier = "loops" | "samples" | "stems";

export const LICENSE_PRICES: Record<LicenseTier, number> = {
  loops: 29,
  samples: 49,
  stems: 69,
};

export const LICENSE_LABELS: Record<LicenseTier, string> = {
  loops: "Loops",
  samples: "Samples (8/16 bar cuts)",
  stems: "Stems (full package)",
};
