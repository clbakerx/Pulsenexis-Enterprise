import Link from "next/link";

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white">PN</span>
            <Link href="/" className="text-sm font-semibold tracking-wide">PULSENEXIS</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-neutral-900 mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-neutral-600 mb-16">
            Start your journey with PulseNexis today
          </p>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Monthly Plan */}
            <div className="relative p-8 border-2 border-neutral-200 rounded-3xl bg-white shadow-lg">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-neutral-900 mb-4">Monthly</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-neutral-900">$9.99</span>
                  <span className="text-lg text-neutral-600">/month</span>
                </div>
                <p className="text-neutral-600 mb-8">Perfect for getting started</p>

                {/* Features */}
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-neutral-700">Full platform access</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-neutral-700">Stream unlimited music</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-neutral-500">No downloads available</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-neutral-700">24/7 Support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-neutral-700">Cancel anytime</span>
                  </li>
                </ul>

                <button className="w-full rounded-2xl border-2 border-neutral-300 bg-white px-6 py-3 text-lg font-semibold text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-200">
                  Get Started
                </button>
              </div>
            </div>

            {/* Annual Plan */}
            <div className="relative p-8 border-2 border-purple-300 rounded-3xl bg-white shadow-xl">
              {/* Most Popular Badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-neutral-900 text-white px-4 py-1 text-sm font-semibold rounded-full">
                  Most Popular
                </span>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-semibold text-neutral-900 mb-4">Annual</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-neutral-900">$99</span>
                  <span className="text-lg text-neutral-600">/year</span>
                </div>
                <p className="text-green-600 font-medium mb-8">Save $20 per year</p>

                {/* Features */}
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-neutral-700">Full platform access</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-neutral-700">Stream unlimited music</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-neutral-700">Download for offline use</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-neutral-700">24/7 Support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-neutral-700">Cancel anytime</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-purple-700 font-medium">Priority support</span>
                  </li>
                </ul>

                <button className="w-full rounded-2xl bg-neutral-900 px-6 py-3 text-lg font-semibold text-white hover:bg-neutral-800 transition-all duration-200">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Support Link */}
          <div className="mt-12 text-center">
            <p className="text-neutral-600">
              Have questions?{" "}
              <a 
                href="mailto:info@pulsenexis.com" 
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Contact support
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                What's the difference between streaming and downloading?
              </h3>
              <p className="text-neutral-600">
                With streaming, you can listen to all music in our catalog while connected to the internet. 
                Downloading allows you to save tracks to your device for offline listening and use in your projects.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                Can I upgrade from monthly to annual plan?
              </h3>
              <p className="text-neutral-600">
                Yes! You can upgrade to the annual plan at any time and we'll prorate the billing. 
                You'll immediately gain access to downloads and priority support.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                What happens if I cancel my subscription?
              </h3>
              <p className="text-neutral-600">
                You can cancel anytime. Your access will continue until the end of your current billing period. 
                Any downloaded files will remain accessible for 30 days after cancellation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                Do you offer licensing for commercial use?
              </h3>
              <p className="text-neutral-600">
                Yes! Both plans include personal streaming rights. For commercial licensing (sync, broadcast, etc.), 
                please visit our{" "}
                <Link href="/licensing" className="text-purple-600 hover:text-purple-700 font-medium">
                  licensing page
                </Link>{" "}
                for detailed pricing and terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-neutral-600 md:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} PulseNexis · Elevating Human Potential Through Music</p>
          <div className="flex items-center gap-5">
            <Link className="hover:text-neutral-900" href="/terms">Terms</Link>
            <Link className="hover:text-neutral-900" href="/privacy">Privacy</Link>
            <Link className="hover:text-neutral-900" href="/support">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}