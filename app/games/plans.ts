export type GamePlan = {
  slug: string;
  brand: string;
  title: string;
  subtitle: string;
  description: string;
  bgUrl: string;

  demoUrl?: string;

  // checkout
  stripeUrl?: string;
  gumroadUrl?: string;

  badge?: string;
  roadmapTitle?: string;
  roadmapText?: string;
};

const BRAND = "PULSENEXIS GAMING AUDIO";
const STRIPE_ALL = "https://buy.stripe.com/14AeVd6AjaDB0qd31b4ZG0D";

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
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Games/Is-It-In-You/Isitinyou_600.png",
    demoUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Games/Is-It-In-You/Is%20It%20In%20You%20(V2)Sample.mp3",
    stripeUrl: STRIPE_ALL,
    badge: "NEW",
    roadmapTitle: "Buy Now",
    roadmapText: "Instant checkout via Stripe.",
  },

  {
    slug: "midnight-pursuit",
    brand: BRAND,
    title: "Midnight Pursuit",
    subtitle: "Game Audio Pack",
    description:
      "Dark-to-driven cinematic energy with a loop-first structure for gameplay pacing.",
    bgUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Games/Midnight-Pursuit/Midnight_Pursuit_600.png",
    demoUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Games/Midnight-Pursuit/Midnight_Pursuit_Sample.mp3",
    stripeUrl: STRIPE_ALL,
    badge: "NEW",
    roadmapTitle: "Buy Now",
    roadmapText: "Instant checkout via Stripe.",
  },

  {
    slug: "no-more-creation",
    brand: BRAND,
    title: "No More Creation",
    subtitle: "Game Audio Pack",
    description:
      "Tension-forward textures built for missions, menus, and moody scene transitions.",
    bgUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Games/No-More-Creation/No_More_Creation_600.png",
    demoUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Games/No-More-Creation/No-More-CreationSample.mp3",
    stripeUrl: STRIPE_ALL,
    badge: "NEW",
    roadmapTitle: "Buy Now",
    roadmapText: "Instant checkout via Stripe.",
  },

  {
    slug: "none-reduced",
    brand: BRAND,
    title: "None Reduced",
    subtitle: "Game Audio Pack",
    description:
      "Full-strength themes with layered intensity potential—built for Unity/Unreal pipelines.",
    bgUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Games/None-Reduced/None_Reduced_600.png",
    demoUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Games/None-Reduced/None-ReducedSample.mp3",
    stripeUrl: STRIPE_ALL,
    badge: "NEW",
    roadmapTitle: "Buy Now",
    roadmapText: "Instant checkout via Stripe.",
  },

  {
    slug: "sonic-temporality",
    brand: BRAND,
    title: "Sonic Temporality",
    subtitle: "Game Audio Pack",
    description:
      "Evolving motifs and time-bending textures structured for loopable systems and cut-scene flow.",
    bgUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Games/Sonic-Tempularity/Sonic_Tempularity_600.png",
    demoUrl:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Games/Sonic-Tempularity/Sonic-Tempularity30secSample.mp3",
    stripeUrl: STRIPE_ALL,
    badge: "COMING SOON",
    roadmapTitle: "Buy Now",
    roadmapText: "Instant checkout via Stripe.",
  },
];