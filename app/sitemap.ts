import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pulsenexis.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/packs`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/licensing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/support`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/ai-video-sample`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const songSlugs = [
    "grown-and-sexy",
  ];

  const songPages: MetadataRoute.Sitemap = songSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticPages, ...songPages];
}