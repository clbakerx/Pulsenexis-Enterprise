export default function CustomSongPage() {
  const packages = [
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
    },
  ];

  const occasions = [
    "Anniversary",
    "Wedding or proposal",
    "Birthday",
    "Apology song",
    "Memorial tribute",
    "Long-distance love",
    "Valentine’s Day",
    "Just because",
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="relative overflow-hidden px-6 py-20 sm:py-28 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,114,182,0.28),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.18),transparent_35%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-pink-300">
              PulseNexis Custom Songs
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Turn your love story into a real song.
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-200 sm:text-xl">
              Anniversary, proposal, apology, birthday, memorial, or just because — we transform your story into an emotional original song made to be remembered.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#order"
                className="rounded-full bg-pink-500 px-8 py-4 text-center font-semibold text-white shadow-lg shadow-pink-500/25 transition hover:bg-pink-400"
              >
                Start My Song
              </a>
              <a
                href="#packages"
                className="rounded-full border border-white/20 px-8 py-4 text-center font-semibold text-white transition hover:bg-white/10"
              >
                View Packages
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-4">
          {occasions.map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center text-sm font-medium text-neutral-200">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Give them something no store can sell.</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-300">
            Anyone can buy flowers, jewelry, or a card. A custom song says, “I remembered the story. I remembered the feeling. I made this just for you.”
          </p>
        </div>
      </section>

      <section id="packages" className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Choose your custom song package</h2>
            <p className="mt-4 text-neutral-300">Start simple or create a premium keepsake.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-3xl border p-8 shadow-2xl ${
                  pkg.featured
                    ? "border-pink-400 bg-pink-500/10 shadow-pink-500/10"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              >
                {pkg.featured && (
                  <div className="mb-5 inline-flex rounded-full bg-pink-500 px-4 py-1 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold">{pkg.name}</h3>
                <p className="mt-3 text-neutral-300">{pkg.description}</p>
                <div className="mt-6 text-4xl font-bold">{pkg.price}</div>
                <ul className="mt-8 space-y-3 text-sm text-neutral-200">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="text-pink-300">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={pkg.href}
                  className={`mt-8 block rounded-full px-6 py-3 text-center font-semibold transition ${
                    pkg.featured
                      ? "bg-pink-500 text-white hover:bg-pink-400"
                      : "bg-white text-neutral-950 hover:bg-neutral-200"
                  }`}
                >
                  {pkg.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">How it works</h2>
            <div className="mt-8 space-y-6">
              {[
                ["1", "Tell us the story", "Share the occasion, names, memories, emotions, and the message you want the song to carry."],
                ["2", "We shape the song", "Your story becomes a custom concept, hook, lyrics, and emotional direction."],
                ["3", "You receive your song", "We deliver a heartfelt MP3 that you can send, play, or reveal as a surprise."],
              ].map(([num, title, copy]) => (
                <div key={num} className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-500 font-bold">{num}</div>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-neutral-300">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-pink-300">Sample reveal idea</p>
            <blockquote className="mt-6 text-2xl font-semibold leading-snug">
              “I wanted to give you more than a gift. I wanted you to hear what you mean to me.”
            </blockquote>
            <p className="mt-6 text-neutral-300">
              Play the song during dinner, send it as a private link, use it during a proposal, or surprise them on their birthday.
            </p>
          </div>
        </div>
      </section>

      <section id="order" className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-pink-400/30 bg-pink-500/10 p-8 sm:p-12">
          <h2 className="text-3xl font-bold sm:text-4xl">Start your custom song</h2>
          <p className="mt-4 text-neutral-200">
            Pay securely via Stripe — you&apos;ll be sent to our song request form right after checkout.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <a href="https://buy.stripe.com/fZuaEX5wfaDB5Kx45f4ZG0O" target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-white px-5 py-4 text-center font-semibold text-neutral-950 hover:bg-neutral-200">
              Buy Starter — $149
            </a>
            <a href="https://buy.stripe.com/28E7sL6Aj8vt1uh0T34ZG0P" target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-pink-500 px-5 py-4 text-center font-semibold text-white hover:bg-pink-400">
              Buy Signature — $399
            </a>
            <a href="https://buy.stripe.com/aFa6oHgaTdPN0qd7hr4ZG0Q" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/20 px-5 py-4 text-center font-semibold text-white hover:bg-white/10">
              Buy Exclusive — $999
            </a>
          </div>

          <div className="mt-10 rounded-2xl bg-neutral-950/70 p-6">
            <h3 className="font-semibold">Recommended intake form fields:</h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-300">
              <li>• Your name and email</li>
              <li>• Recipient name</li>
              <li>• Occasion/date needed</li>
              <li>• Tell us your story</li>
              <li>• Mood: romantic, apology, joyful, memorial, inspirational</li>
              <li>• Style reference: classic R&B, modern R&B, soul, pop, gospel-inspired</li>
              <li>• Any words, names, or memories that must be included</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
