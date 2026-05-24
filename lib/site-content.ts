export const USE_CASES = [
  {
    title: "Story Reels & Shorts",
    desc: "Emotion-ready music for dramatic edits, POV videos, and text-driven storytelling.",
    href: "/shorts",
    badge: "Most popular",
  },
  {
    title: "Instagram / TikTok Reels",
    desc: "Fast emotional hooks and clean cuts that fit 9:16 content.",
    href: "/shorts",
    badge: "9:16 ready",
  },
  {
    title: "Weddings & Love Stories",
    desc: "Romantic, cinematic, heartfelt music for visual memories and love-driven content.",
    href: "/packs",
    badge: "Romance",
  },
  {
    title: "Film & Cinematic",
    desc: "Big-feeling tracks for scenes, trailers, montages, and emotional moments.",
    href: "/packs",
    badge: "Cinematic",
  },
  {
    title: "Ads & Brand Content",
    desc: "Commercial-ready music for campaigns, product videos, and branded content.",
    href: "/packs",
    badge: "Commercial",
  },
  {
    title: "Podcasts & Voiceover",
    desc: "Supportive beds that stay out of the way of dialogue while adding atmosphere.",
    href: "/packs",
    badge: "Clean",
  },
  {
    title: "Gaming Audio",
    desc: "Loop-ready systems, modular stems, and engine-friendly exports for interactive projects.",
    href: "/games",
    badge: "NEW",
  },
  {
    title: "Custom Songs",
    desc: "Anniversary, proposal, birthday, or memorial — a one-of-a-kind original song made from your story.",
    href: "/custom-songs",
    badge: "Personal",
  },
];

export const FEATURED_TRACKS = [
  {
    title: "Bring the Snow (Slide We Ride)",
    desc: "Smooth, late-night R&B built for motion, confidence, and intimate moments.",
    href: "/bring-the-snow",
    badge: "Hot right now",
    bestFor: "Drive scenes • Lifestyle • Romantic visuals",
  },
  {
    title: "Right in the Middle",
    desc: "A steady, grown groove for conversation scenes, reflection, and emotional cutaways.",
    href: "/right-in-the-middle",
    badge: "Hot right now",
    bestFor: "Talk scenes • Documentary • Slow motion b-roll",
  },
  {
    title: "Chances",
    desc: "Warm, hopeful late-night energy—perfect for love stories and comeback moments.",
    href: "/chances",
    badge: "Hot right now",
    bestFor: "Romantic visuals • Vlogs • Storytelling",
  },
];

export const TRACK_LICENSES = [
  {
    name: "Basic",
    price: "$29",
    description:
      "Perfect for personal projects and simple creator content. Includes a high-quality MP3 download and permission to use the track in non-commercial or limited creator projects.",
    features: ["Personal use rights", "High-quality MP3 download"],
    href: "https://buy.stripe.com/7sY28r5wf8vtc8VeJT4ZG0E",
    cta: "Buy License",
    popular: false,
  },
  {
    name: "Creator",
    price: "$49",
    description:
      "Designed for active creators who publish content across platforms. Allows monetized use on YouTube, streaming releases, and commercial creator projects.",
    features: [
      "Monetized YouTube content",
      "Spotify and streaming releases",
      "Commercial creator use",
    ],
    href: "https://buy.stripe.com/dRm7sLbUD8vtc8V6dn4ZG0F",
    cta: "Get Creator License",
    popular: true,
  },
  {
    name: "Pro",
    price: "$79",
    description:
      "Built for professional creators, brands, and commercial production. Includes expanded usage rights and premium deliverables like stems for deeper creative control.",
    features: [
      "Unlimited commercial use",
      "Stems included",
      "Professional production use",
    ],
    href: "https://buy.stripe.com/00w5kD8Ir3b9dcZeJT4ZG0G",
    cta: "Buy Pro License",
    popular: false,
  },
];

export const CUSTOM_SONG_PACKAGES = [
  {
    name: "Starter",
    price: "$149",
    description: "A heartfelt custom song concept based on your story.",
    features: [
      "Custom lyrics based on your story",
      "One original song concept",
      "Demo vocal direction",
      "MP3 delivery",
      "Great for birthdays, apologies, and simple gifts",
    ],
    cta: "Start My Song",
    href: "#order",
    featured: false,
  },
  {
    name: "Signature",
    price: "$399",
    description: "The best choice for anniversaries, proposals, and emotional gifts.",
    features: [
      "Custom lyrics + full song structure",
      "Polished demo production direction",
      "Personalized hook and chorus",
      "One revision round",
      "Delivered as a keepsake-ready MP3",
    ],
    cta: "Choose Signature",
    href: "#order",
    featured: true,
  },
  {
    name: "Exclusive",
    price: "$999+",
    description: "Premium custom song experience with exclusive rights options.",
    features: [
      "Full custom song package",
      "Premium arrangement direction",
      "Priority delivery",
      "Expanded revision support",
      "Exclusive ownership/license options",
    ],
    cta: "Request Exclusive",
    href: "#order",
    featured: false,
  },
];

export const CUSTOM_SONG_OCCASIONS = [
  "Anniversary",
  "Wedding or proposal",
  "Birthday",
  "Apology song",
  "Memorial tribute",
  "Long-distance love",
  "Valentine's Day",
  "Just because",
];

export function buildNovaSystemPrompt(): string {
  const customSongPackageList = CUSTOM_SONG_PACKAGES.map(
    (p) => `- ${p.name} (${p.price})${p.featured ? " ★ Most Popular" : ""}: ${p.description} Includes: ${p.features.join(", ")}.`
  ).join("\n");

  const licenseList = TRACK_LICENSES.map(
    (l) => `- ${l.name} (${l.price})${l.popular ? " ★ Most Popular" : ""}: ${l.description}`
  ).join("\n");

  const featuredTrackList = FEATURED_TRACKS.map(
    (t) => `- "${t.title}": ${t.desc} Best for: ${t.bestFor}.`
  ).join("\n");

  const useCaseList = USE_CASES.map((u) => u.title).join(" · ");

  const occasionList = CUSTOM_SONG_OCCASIONS.join(" · ");

  return `You are Nova, a warm and knowledgeable sales assistant for PulseNexis — a music platform built for creators and personal gifting. Your job is to quickly understand what someone needs and guide them to the right product. Be warm, concise, and confident. Never ask a clarifying question you already know the answer to.

## PRODUCTS YOU SELL

### 1. CUSTOM SONGS — for personal occasions (your most emotional, high-value product)
When someone mentions: anniversary, proposal, wedding, birthday, memorial, apology, tribute, love gift, or "made just for them" — this is always a Custom Song lead. Do NOT ask if it's "personal or business." It's personal. Jump straight to the experience and packages.

Packages at pulsenexis.com/custom-songs:
${customSongPackageList}

Occasions we cover: ${occasionList}

How it works: They share their story → we shape the song → they receive a heartfelt MP3 they can surprise someone with.

### 2. TRACK LICENSES — for creators licensing existing music
For YouTube, TikTok, Reels, Spotify, brand content. All tracks are royalty-free, no copyright strikes.

${licenseList}

### 3. FEATURED TRACKS (hot right now)
${featuredTrackList}

### 4. USE CASES WE SERVE
${useCaseList}

## HOW TO HANDLE COMMON SITUATIONS

**"Anniversary track" or any personal occasion** → This is a Custom Song. Say something like: "That's perfect for our Custom Songs — we turn your story into an original song they'll never forget. Our Signature package (${CUSTOM_SONG_PACKAGES.find((p) => p.featured)?.price}) is most popular for anniversaries and includes a full song with personalized hook and chorus. Want me to tell you how it works or which package fits best?"

**Creator needing music for content** → Ask one question: what platform/use case? Then recommend the right license tier.

**Unsure what they need** → Ask one focused question to route them: "Are you looking for a custom song made from your story, or music to use in your own content?"

Keep responses short — 2-4 sentences max unless they ask for details. Always move toward the sale.`;
}
