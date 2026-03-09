import Link from "next/link";

function FeatureItem({
  children,
  included = true,
  highlight = false,
}: {
  children: React.ReactNode;
  included?: boolean;
  highlight?: boolean;
}) {
  return (
    <li className="flex items-start gap-3">
      <div
        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
          included
            ? highlight
              ? "bg-violet-100 text-violet-600"
              : "bg-emerald-100 text-emerald-600"
            : "bg-red-100 text-red-500"
        }`}
      >
        {included ? (
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      <span
        className={`text-sm leading-6 ${
          included
            ? highlight
              ? "font-medium text-violet-700"
              : "text-neutral-700"
            : "text-neutral-400"
        }`}
      >
        {children}
      </span>
    </li>
  );
}

function PlanCard({
  name,
  price,
  period,
  description,
  savings,
  popular = false,
  buttonLabel,
  buttonHref = "#",
  features,
}: {
  name: string;
  price: string;
  period: string;
  description: string;
  savings?: string;
  popular?: boolean;
  buttonLabel: string;
  buttonHref?: string;
  features: {
    label: string;
    included?: boolean;
    highlight?: boolean;
  }[];
}) {
  return (
    <div
      className={`relative rounded-3xl border p-8 shadow-sm transition-all duration-300 ${
        popular
          ? "border-violet-300 bg-white shadow-xl ring-1 ring-violet-200 md:-translate-y-2"
          : "border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-md"
      }`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-neutral-900 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-8 text-center">
        <h3 className="text-2xl font-semibold text-neutral-900">{name}</h3>

        <div className="mt-5">
          <span className="text-5xl font-bold tracking-tight text-neutral-900">
            {price}
          </span>
          <span className="ml-1 text-lg text-neutral-500">{period}</span>
        </div>

        <p className="mt-4 text-sm text-neutral-600">{description}</p>

        {savings && (
          <p className="mt-3 text-sm font-semibold text-emerald-600">
            {savings}
          </p>
        )}
      </div>

      <ul className="space-y-4">
        {features.map((feature) => (
          <FeatureItem
            key={feature.label}
            included={feature.included ?? true}
            highlight={feature.highlight}
          >
            {feature.label}
          </FeatureItem>
        ))}
      </ul>

      <div className="mt-8">
        <Link
          href={buttonHref}
          className={`inline-flex w-full items-center justify-center rounded-2xl px-6 py-3.5 text-base font-semibold transition ${
            popular
              ? "bg-neutral-900 text-white hover:bg-neutral-800"
              : "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50"
          }`}
        >
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
}

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/85 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
              PN
            </span>
            <Link href="/" className="text-sm font-semibold tracking-[0.18em] text-neutral-900">
              PULSENEXIS
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/catalog"
              className="hidden text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 md:inline-block"
            >
              Browse Catalog
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
            >
              ← Back to Home
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-violet-600">
              Membership Plans
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              Choose the PulseNexis plan that fits your workflow
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
              Stream premium music, unlock platform access, and choose the billing option
              that works best for how often you create.
            </p>
          </div>

          {/* Trust Strip */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 rounded-2xl border border-neutral-200 bg-white p-4 text-sm text-neutral-600 shadow-sm md:grid-cols-4">
            <div>Full platform access</div>
            <div>Unlimited streaming</div>
            <div>Cancel anytime</div>
            <div>Secure billing</div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Simple access. Clear value.
            </h2>
            <p className="mt-4 text-neutral-600">
              Start monthly or save more with annual billing.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <PlanCard
              name="Monthly"
              price="$9.99"
              period="/month"
              description="A flexible option for getting started with PulseNexis."
              buttonLabel="Start Monthly"
              buttonHref="/checkout?plan=monthly"
              features={[
                { label: "Full platform access" },
                { label: "Stream unlimited music" },
                { label: "No downloads available", included: false },
                { label: "24/7 support" },
                { label: "Cancel anytime" },
              ]}
            />

            <PlanCard
              name="Annual"
              price="$99"
              period="/year"
              description="Best for active users who want better value across the year."
              savings="Save $20 per year"
              popular
              buttonLabel="Choose Annual"
              buttonHref="/checkout?plan=annual"
              features={[
                { label: "Full platform access" },
                { label: "Stream unlimited music" },
                { label: "Download for offline use" },
                { label: "24/7 support" },
                { label: "Cancel anytime" },
                { label: "Priority support", highlight: true },
              ]}
            />
          </div>

          {/* Supporting links */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
            <Link
              href="/licensing"
              className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
            >
              Need commercial licensing?
            </Link>
            <Link
              href="/custom-music-kits"
              className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
            >
              Looking for custom music?
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-neutral-50 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-neutral-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-neutral-600">
              A few quick answers before you choose a plan.
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-neutral-900">
                What&apos;s the difference between streaming and downloading?
              </h3>
              <p className="mt-3 text-neutral-600">
                Streaming gives you access to the PulseNexis catalog while connected to
                the internet. Downloads let you save eligible tracks for offline listening
                and access.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-neutral-900">
                Can I switch from monthly to annual later?
              </h3>
              <p className="mt-3 text-neutral-600">
                Yes. You can upgrade when you&apos;re ready and move into the annual option
                for better long-term savings.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-neutral-900">
                What happens if I cancel?
              </h3>
              <p className="mt-3 text-neutral-600">
                You can cancel anytime. Your access stays active through the end of your
                billing period.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-neutral-900">
                Do these plans include commercial licensing?
              </h3>
              <p className="mt-3 text-neutral-600">
                Platform membership and commercial licensing are separate. For sync,
                broadcast, or business use, visit our{" "}
                <Link href="/licensing" className="font-medium text-violet-600 hover:text-violet-700">
                  licensing page
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="mt-10 text-center text-neutral-600">
            Have questions?{" "}
            <a
              href="mailto:info@pulsenexis.com"
              className="font-medium text-violet-600 hover:text-violet-700"
            >
              Contact support
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-neutral-600 md:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} PulseNexis · Elevating Human Potential Through Music</p>
          <div className="flex items-center gap-5">
            <Link className="hover:text-neutral-900" href="/terms">
              Terms
            </Link>
            <Link className="hover:text-neutral-900" href="/privacy">
              Privacy
            </Link>
            <Link className="hover:text-neutral-900" href="/support">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}