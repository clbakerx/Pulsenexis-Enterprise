import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pulsenexis.com";
  const now = new Date();

  const publicPages = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/packs", changeFrequency: "weekly", priority: 0.9 },
    { path: "/licensing", changeFrequency: "monthly", priority: 0.9 },
    { path: "/support", changeFrequency: "monthly", priority: 0.7 },
    { path: "/sample", changeFrequency: "weekly", priority: 0.8 },
    { path: "/free-sample", changeFrequency: "weekly", priority: 0.8 },
    { path: "/free-beats", changeFrequency: "weekly", priority: 0.8 },
    { path: "/singles", changeFrequency: "weekly", priority: 0.8 },
    { path: "/shorts", changeFrequency: "weekly", priority: 0.7 },
    { path: "/cinema", changeFrequency: "weekly", priority: 0.8 },
    { path: "/gaming-audio", changeFrequency: "weekly", priority: 0.8 },
    { path: "/games", changeFrequency: "weekly", priority: 0.8 },
    { path: "/custom-songs", changeFrequency: "monthly", priority: 0.8 },
    { path: "/custom-music-kits", changeFrequency: "monthly", priority: 0.8 },
    { path: "/create", changeFrequency: "weekly", priority: 0.7 },
    { path: "/transform", changeFrequency: "weekly", priority: 0.7 },
    { path: "/make-video", changeFrequency: "weekly", priority: 0.7 },
    { path: "/generate-video", changeFrequency: "weekly", priority: 0.7 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.4 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.4 },
    { path: "/trademark", changeFrequency: "monthly", priority: 0.6 },
    { path: "/story", changeFrequency: "monthly", priority: 0.7 },
    { path: "/bring-the-snow", changeFrequency: "weekly", priority: 0.9 },
    { path: "/right-in-the-middle", changeFrequency: "weekly", priority: 0.9 },
    { path: "/chances", changeFrequency: "weekly", priority: 0.9 },
  ] as const;

  return publicPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}