import Link from "next/link";

export default function LicensingPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white">PN</span>
            <Link href="/" className="text-sm font-semibold tracking-wide">HONEY DRIP RECORDS</Link>
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

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <div className="prose prose-neutral prose-lg max-w-none">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-8">Music Licensing</h1>
          
          <div className="bg-gradient-to-r from-purple-50 to-amber-50 p-6 rounded-xl border border-neutral-200 mb-8">
            <p className="text-lg text-neutral-700 leading-relaxed">
              License high-quality music from PulseNexis for your commercial projects, films, advertisements, 
              and creative endeavors. Our extensive catalog offers diverse genres and moods to fit any project.
            </p>
          </div>

          <div className="grid gap-8">
            {/* Licensing Types */}
            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Licensing Options</h2>
              <div className="grid gap-6 md:grid-cols-2">
                
                {/* Sync Licensing */}
                <div className="p-6 border border-neutral-200 rounded-xl">
                  <h3 className="text-xl font-semibold text-purple-900 mb-3">🎬 Sync Licensing</h3>
                  <p className="text-neutral-700 mb-4">
                    Perfect for film, TV, commercials, and video content. Synchronize our music with your visual media.
                  </p>
                  <div className="space-y-2 text-sm text-neutral-600">
                    <p>✓ Film & Television</p>
                    <p>✓ Commercials & Advertisements</p>
                    <p>✓ YouTube & Social Media</p>
                    <p>✓ Corporate Videos</p>
                  </div>
                </div>

                {/* Mechanical Licensing */}
                <div className="p-6 border border-neutral-200 rounded-xl">
                  <h3 className="text-xl font-semibold text-purple-900 mb-3">💿 Mechanical Licensing</h3>
                  <p className="text-neutral-700 mb-4">
                    License music for reproduction and distribution across physical and digital formats.
                  </p>
                  <div className="space-y-2 text-sm text-neutral-600">
                    <p>✓ Digital Downloads</p>
                    <p>✓ Streaming Platforms</p>
                    <p>✓ Physical CDs & Vinyl</p>
                    <p>✓ Compilation Albums</p>
                  </div>
                </div>

                {/* Performance Licensing */}
                <div className="p-6 border border-neutral-200 rounded-xl">
                  <h3 className="text-xl font-semibold text-purple-900 mb-3">🎤 Performance Licensing</h3>
                  <p className="text-neutral-700 mb-4">
                    License for public performances, live events, and broadcast applications.
                  </p>
                  <div className="space-y-2 text-sm text-neutral-600">
                    <p>✓ Live Events & Concerts</p>
                    <p>✓ Radio & Podcasts</p>
                    <p>✓ Retail & Hospitality</p>
                    <p>✓ Public Venues</p>
                  </div>
                </div>

                {/* Custom Licensing */}
                <div className="p-6 border border-amber-200 bg-amber-50 rounded-xl">
                  <h3 className="text-xl font-semibold text-amber-900 mb-3">⚡ Custom Licensing</h3>
                  <p className="text-amber-800 mb-4">
                    Need something specific? We offer custom licensing solutions tailored to your unique project needs.
                  </p>
                  <div className="space-y-2 text-sm text-amber-700">
                    <p>✓ Exclusive Rights</p>
                    <p>✓ Territory-Specific</p>
                    <p>✓ Duration-Based</p>
                    <p>✓ Usage-Specific</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Pricing Structure */}
            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Pricing Structure</h2>
              <div className="overflow-hidden border border-neutral-200 rounded-xl">
                <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200">
                  <h3 className="text-lg font-semibold text-neutral-900">License Types & Rates</h3>
                </div>
                <div className="p-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="text-center p-4 border border-neutral-200 rounded-lg">
                      <h4 className="font-semibold text-neutral-900 mb-2">Standard Sync</h4>
                      <p className="text-2xl font-bold text-purple-600 mb-2">$299</p>
                      <p className="text-sm text-neutral-600">Per track, per project</p>
                    </div>
                    <div className="text-center p-4 border border-neutral-200 rounded-lg">
                      <h4 className="font-semibold text-neutral-900 mb-2">Premium Sync</h4>
                      <p className="text-2xl font-bold text-purple-600 mb-2">$599</p>
                      <p className="text-sm text-neutral-600">Broadcast & commercial use</p>
                    </div>
                    <div className="text-center p-4 border border-neutral-200 rounded-lg">
                      <h4 className="font-semibold text-neutral-900 mb-2">Exclusive Rights</h4>
                      <p className="text-2xl font-bold text-purple-600 mb-2">Custom</p>
                      <p className="text-sm text-neutral-600">Contact for pricing</p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      💡 <strong>Volume Discounts Available:</strong> Save up to 30% on multi-track licenses and long-term agreements.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* How It Works */}
            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-6">How It Works</h2>
              <div className="grid gap-6 md:grid-cols-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Browse Catalog</h3>
                  <p className="text-sm text-neutral-600">Explore our music catalog and find the perfect tracks for your project.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Request Quote</h3>
                  <p className="text-sm text-neutral-600">Contact us with your project details and licensing requirements.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Review Agreement</h3>
                  <p className="text-sm text-neutral-600">We&apos;ll send you a custom licensing agreement for your approval.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Get Your Music</h3>
                  <p className="text-sm text-neutral-600">Upon payment, receive high-quality files and usage rights.</p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="p-6 border border-neutral-200 rounded-xl">
                  <h3 className="font-semibold text-neutral-900 mb-2">What&apos;s included with a sync license?</h3>
                  <p className="text-neutral-700">
                    Sync licenses include the right to synchronize the music with visual content, high-quality audio files 
                    (WAV/MP3), and detailed usage terms specific to your project scope.
                  </p>
                </div>
                <div className="p-6 border border-neutral-200 rounded-xl">
                  <h3 className="font-semibold text-neutral-900 mb-2">Can I use licensed music internationally?</h3>
                  <p className="text-neutral-700">
                    Yes, our standard licenses include worldwide usage rights. For territory-specific restrictions 
                    or exclusive regional rights, please contact us for custom licensing options.
                  </p>
                </div>
                <div className="p-6 border border-neutral-200 rounded-xl">
                  <h3 className="font-semibold text-neutral-900 mb-2">How long does the licensing process take?</h3>
                  <p className="text-neutral-700">
                    Standard licensing typically takes 2-3 business days. Rush licensing (24-48 hours) is available 
                    for an additional fee. Custom agreements may take longer depending on complexity.
                  </p>
                </div>
                <div className="p-6 border border-neutral-200 rounded-xl">
                  <h3 className="font-semibold text-neutral-900 mb-2">Do you offer stem files or remixing rights?</h3>
                  <p className="text-neutral-700">
                    Yes! We can provide stem files and remixing rights for additional licensing fees. 
                    Contact us to discuss your specific creative needs.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact CTA */}
            <section className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-amber-500 p-8 rounded-xl text-white">
                <h2 className="text-2xl font-semibold mb-4">Ready to License Music?</h2>
                <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                  Get started with your licensing request today. Our team is ready to help you find 
                  the perfect music for your project and provide competitive licensing rates.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/catalog"
                    className="inline-flex items-center justify-center rounded-xl bg-white text-purple-600 px-6 py-3 text-sm font-semibold hover:bg-purple-50 transition-colors"
                  >
                    Browse Music Catalog
                  </Link>
                  <a
                    href="mailto:info@pulsenexis.com"
                    className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    Request Licensing Quote
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 mt-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-neutral-600 md:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} Honey Drip Records · All rights reserved.</p>
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