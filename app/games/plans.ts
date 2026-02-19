export type GamePlan = {
  slug: string;
  brand: string;
  title: string;
  subtitle: string;
  description: string;
  bgUrl: string;
  demoUrl?: string;
  gumroadUrl?: string;
  badge?: string;
  roadmapTitle?: string;
  roadmapText?: string;
};

const BRAND = "PULSENEXIS GAMING AUDIO";

export const PLANS: GamePlan[] = [
  {
    slug: "neon-syndicate-vol-1",
    brand: BRAND,
    title: "Neon Syndicate",
    subtitle: "Game Audio Pack Vol. 1",
    description:
      "Modular, loop-ready music systems built for futuristic worlds — clean loop points, intensity layers, and engine-friendly exports.",
    bgUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Games/NeonSyndicate/NeonSyndicate_600.png",
    demoUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Games/NeonSyndicate/NeonSydicate_Demo.mp3",
    gumroadUrl:
      "https://cushyc.gumroad.com/l/hwrbq?_gl=1*1wykmoo*_ga*MTI3MzEyOTMwNC4xNzcwOTEyNzM3*_ga_6LJN6D94N6*czE3NzA5MzA0NTYkbzIkZzEkdDE3NzA5MzA1NjgkajMyJGwwJGgw",
    badge: "NEW",
    roadmapTitle: "Vol. 2 Coming Soon",
    roadmapText: "Expanding the Neon Syndicate universe with new intensity layers.",
  },

  {
    slug: "is-it-in-you",
    brand: BRAND,
    title: "Is It In You",
    subtitle: "Game Audio Pack",
    description:
      "Loop-ready, layered game music built for clean loop points and engine-friendly use.",
    bgUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Games/Is%20It%20In%20You/Is-It-In-You_600.png",
    badge: "COMING SOON",
    roadmapTitle: "Checkout Coming Soon",
    roadmapText: "Stripe checkout will be connected here soon.",
  },

  {
    slug: "midnight-pursuit",
    brand: BRAND,
    title: "Midnight Pursuit",
    subtitle: "Game Audio Pack",
    description:
      "Dark-to-driven cinematic energy with a loop-first structure for gameplay pacing.",
    bgUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Games/Midnight%20Pursuit/Midnight-Pursuit_600.png",
    badge: "COMING SOON",
    roadmapTitle: "Checkout Coming Soon",
    roadmapText: "Stripe checkout will be connected here soon.",
  },

  {
    slug: "no-more-creation",
    brand: BRAND,
    title: "No More Creation",
    subtitle: "Game Audio Pack",
    description:
      "Tension-forward textures built for missions, menus, and moody scene transitions.",
    bgUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Games/No%20More%20Creation/No-More-Creation_600.png",
    badge: "COMING SOON",
    roadmapTitle: "Checkout Coming Soon",
    roadmapText: "Stripe checkout will be connected here soon.",
  },

  {
    slug: "none-reduced",
    brand: BRAND,
    title: "None Reduced",
    subtitle: "Game Audio Pack",
    description:
      "Full-strength themes with layered intensity potential—built for Unity/Unreal pipelines.",
    bgUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Games/None%20Reduced/None-Reduced_600.png",
    badge: "COMING SOON",
    roadmapTitle: "Checkout Coming Soon",
    roadmapText: "Stripe checkout will be connected here soon.",
  },

  {
    slug: "sonic-temporality",
    brand: BRAND,
    title: "Sonic Temporality",
    subtitle: "Game Audio Pack",
    description:
      "Evolving motifs and time-bending textures structured for loopable systems and cut-scene flow.",
    bgUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Games/Sonic%20Temporality/Sonic-Temporality_600.png",
    badge: "COMING SOON",
    roadmapTitle: "Checkout Coming Soon",
    roadmapText: "Stripe checkout will be connected here soon.",
  },
];
