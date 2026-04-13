import Link from "next/link";

export default function HomePage() {
  const VIDEO_STYLES = [
    {
      title: "Romantic Story Video",
      desc: "Soft, emotional visuals for anniversaries, love notes, and heartfelt posts.",
      href: "/make-video?song=someone-elses-man",
      badge: "Romance",
    },
    {
      title: "Reel-Ready Video",
      desc: "Fast, clean, vertical-friendly video creation built for TikTok, Reels, and Shorts.",
      href: "/make-video?song=the-only-way-i-be",
      badge: "9:16 Ready",
    },
    {
      title: "Cinematic Mood Video",
      desc: "Turn one portrait into a dramatic visual moment with music, atmosphere, and emotion.",
      href: "/make-video",
      badge: "Cinematic",
    },
    {
      title: "Wedding & Love Story",
      desc: "Create a keepsake-style music video for engagements, weddings, vows, and memories.",
      href: "/make-video",
      badge: "Keepsake",
    },
    {
      title: "Creator Promo Video",
      desc: "Give your content a premium emotional hook with personalized visual storytelling.",
      href: "/make-video",
      badge: "Creator",
    },
    {
      title: "Gift Video Experience",
      desc: "Make a personalized surprise video for birthdays, holidays, or someone special.",
      href: "/make-video",
      badge: "Giftable",
    },
  ];

  const VIDEO_PLANS = [
    {
      name: "Starter",
      price: "$12.99",
      frequency: "/month",
      description:
        "Perfect for casual users who want a few personalized music videos every month.",
      features: [
        "5 videos per month",
        "Up to 60 seconds per video",
        "Standard render speed",
        "Watermarked exports",
        "Personal use",
      ],
      href: "https://buy.stripe.com/YOUR_STARTER_LINK",
      cta: "Start Creating",
      popular: false,
    },
    {
      name: "Creator",
      price: "$24.99",
      frequency: "/month",
      description:
        "Best for social creators who want more videos, cleaner exports, and faster turnaround.",
      features: [
        "20 videos per month",
        "Up to 2 minutes per video",
        "Faster rendering",
        "No watermark",
        "Social posting use",
        "Premium song access",
      ],
      href: "https://buy.stripe.com/YOUR_CREATOR_LINK",
      cta: "Create More Videos",
      popular: true,
    },
    {
      name: "Pro",
      price: "$49.99",
      frequency: "/month",
      description:
        "For brands, power users, and high-volume creators who need premium output and priority access.",
      features: [
        "Unlimited videos",
        "Up to 5 minutes per video",
        "Priority queue",
        "HD downloads",
        "Commercial use",
        "Full catalog access",
      ],
      href: "https://buy.stripe.com/YOUR_PRO_LINK",
      cta: "Go Pro",
      popular: false,
    },
  ];

  function CheckIcon() {
    return (
      <svg
        className="h-3 w-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <header className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-lg font-extrabold tracking-tight text-neutral-900">
            PulseNexis
          </Link>

          <nav className="hidden items-center gap-3 sm:flex">
            <a
              href="#demo"
              className="rounded-full px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-white"
            >
              Demo
            </a>
            <a
              href="#styles"
              className="rounded-full px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-white"
            >
              Styles
            </a>
            <a
              href="#plans"
              className="rounded-full px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-white"
            >
              Pricing
            </a>
            <Link
              href="/make-video"
              className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
            >
              Create Video
            </Link>
          </nav>
        </header>

        <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-700 to-neutral-950 p-8 text-white shadow-sm sm:p-10">
            <div className="text-sm font-semibold tracking-wide opacity-90">
              PULSENEXIS AI VIDEO
            </div>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              Turn Your Photo Into
              <br />
              <span className="text-amber-300">an AI Music Video</span>
            </h1>

            <p className="mt-4 max-w-xl text-base/7 opacity-90">
              Upload a photo, choose a PulseNexis song, and create a personalized
              video built for storytelling, social sharing, gifts, romantic
              moments, and unforgettable content.
            </p>

            <ul className="mt-6 grid gap-2 text-sm opacity-95 sm:grid-cols-2">
              <li>✅ Upload one photo</li>
              <li>✅ Choose a song</li>
              <li>✅ Generate in minutes</li>
              <li>✅ Download and share</li>
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/make-video"
                className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-400"
              >
                Create My Video
              </Link>

              <a
                href="#demo"
                className="rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20"
              >
                Watch Demo
              </a>

              <a
                href="#plans"
                className="rounded-full bg-black/25 px-6 py-3 text-sm font-semibold text-white hover:bg-black/35"
              >
                View Plans
              </a>
            </div>

            <div className="mt-8 border-t border-white/20 pt-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-white/70">
                Best for
              </div>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                <span className="text-white/85">Reels & Shorts</span>
                <span className="text-white/85">Wedding videos</span>
                <span className="text-white/85">Romantic content</span>
                <span className="text-white/85">Gift moments</span>
              </div>
            </div>

            <p className="mt-4 text-xs opacity-80">
              Photo-to-video creation • emotional music • creator-ready output
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border bg-black shadow-sm">
            <div className="aspect-[16/9] w-full">
              <video
                className="h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
              >
                <source src="/demos/Leave-it-to-Me.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="absolute bottom-4 left-4 rounded-xl bg-black/70 px-3 py-2 text-sm text-white">
              Demo Video • PulseNexis
            </div>
          </div>
        </section>

        <section className="mt-14" id="demo">
          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                  See How It Works
                </div>

                <h2 className="mt-4 text-3xl font-bold text-neutral-900 sm:text-4xl">
                  Put yourself in the song
                </h2>

                <p className="mt-3 max-w-2xl text-neutral-600">
                  PulseNexis turns one portrait into a personalized music video.
                  Choose the mood, pick the track, and create something emotional,
                  cinematic, and instantly shareable.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
                    1) Upload your photo
                  </div>
                  <div className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
                    2) Pick your song
                  </div>
                  <div className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
                    3) Generate your video
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/make-video"
                    className="rounded-full bg-indigo-700 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
                  >
                    Try the Experience
                  </Link>

                  <a
                    href="#plans"
                    className="rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                  >
                    See Pricing
                  </a>
                </div>

                <p className="mt-4 text-xs text-neutral-500">
                  Real demo powered by a local PulseNexis video file.
                </p>
              </div>

              <div className="overflow-hidden rounded-3xl border bg-black">
                <div className="aspect-[9/16] w-full">
                  <video
                    className="h-full w-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                  >
                    <source src="/demos/Leave-it-to-Me.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12" id="styles">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-neutral-800">
                Featured Video Styles
              </div>
              <h2 className="mt-2 text-2xl font-bold">
                Choose the vibe you want to create
              </h2>
              <p className="mt-1 text-sm text-neutral-600">
                Start with a style, then personalize the experience inside the video creator.
              </p>
            </div>

            <Link
              href="/make-video"
              className="inline-flex w-fit items-center rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              Open Video Creator
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VIDEO_STYLES.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border bg-white p-5 transition hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold">{item.title}</div>
                    <p className="mt-2 text-sm opacity-80">{item.desc}</p>
                  </div>

                  <span className="shrink-0 rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                    {item.badge}
                  </span>
                </div>

                <div className="mt-4 text-sm font-semibold text-indigo-600 group-hover:text-indigo-700">
                  Create this style →
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14" id="plans">
          <div className="flex flex-col gap-2">
            <div>
              <div className="text-sm font-semibold text-neutral-800">
                Pricing &amp; Plans
              </div>
              <h2 className="mt-2 text-2xl font-bold">
                Choose the video plan that fits your workflow
              </h2>
              <p className="mt-1 text-sm text-neutral-600">
                Subscribe through Stripe and start creating personalized AI music videos.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {VIDEO_PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border bg-white p-6 ${
                  plan.popular
                    ? "border-violet-300 shadow-lg ring-1 ring-violet-200"
                    : "border-neutral-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-neutral-900 px-4 py-1 text-xs font-semibold text-white">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-neutral-900">
                    {plan.name}
                  </h3>
                  <p className="mt-3 text-5xl font-bold text-neutral-900">
                    {plan.price}
                    <span className="ml-1 text-base font-medium text-neutral-500">
                      {plan.frequency}
                    </span>
                  </p>
                  <p className="mt-3 text-sm text-neutral-600">
                    {plan.description}
                  </p>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <CheckIcon />
                      </div>
                      <span className="text-sm text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                    plan.popular
                      ? "bg-indigo-600 text-white hover:bg-indigo-500"
                      : "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50"
                  }`}
                >
                  {plan.cta}
                </a>

                <Link
                  href="/make-video"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-neutral-200 px-5 py-3 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
                >
                  Preview Feature
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5">
            <div className="text-sm font-semibold">1) Upload</div>
            <p className="mt-2 text-sm opacity-80">
              Add a clear portrait photo with good lighting and a visible face.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <div className="text-sm font-semibold">2) Personalize</div>
            <p className="mt-2 text-sm opacity-80">
              Choose your song, mood, and preferred experience style inside the creator.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <div className="text-sm font-semibold">3) Share</div>
            <p className="mt-2 text-sm opacity-80">
              Generate your video, download it, and share it anywhere your story lives.
            </p>
          </div>
        </section>

        <section className="mt-12 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border bg-white p-6">
            <div className="text-lg font-semibold">What do I need to start?</div>
            <p className="mt-2 text-sm text-neutral-600">
              Just one clear photo and a selected song. For best results, use a
              front-facing image with good lighting and a visible face.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <div className="text-lg font-semibold">How long does it take?</div>
            <p className="mt-2 text-sm text-neutral-600">
              Most videos should generate in a few minutes depending on plan,
              length, and current rendering volume.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <div className="rounded-3xl bg-neutral-900 p-8 text-white">
            <div className="max-w-3xl">
              <div className="text-sm font-semibold text-neutral-300">
                Build with PulseNexis
              </div>
              <h2 className="mt-2 text-3xl font-bold">
                Create a personalized video people will actually feel
              </h2>
              <p className="mt-3 text-sm text-neutral-300">
                Whether it is for a reel, a relationship moment, a surprise gift,
                or premium creator content, PulseNexis gives you a fast path from
                photo to finished emotional video.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/make-video"
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-100"
                >
                  Create My Video
                </Link>

                <a
                  href="#plans"
                  className="rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20"
                >
                  View Plans
                </a>

                <a
                  href="#demo"
                  className="rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20"
                >
                  Watch Demo
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}