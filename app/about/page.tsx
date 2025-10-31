import Link from "next/link";

export default function AboutPage() {
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
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-8">About PulseNexis</h1>
          
          <div className="grid gap-8 md:gap-12">
            {/* Company Overview */}
            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Our Story</h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                PulseNexis is the premier music catalog platform by Honey Drip Records, dedicated to bringing you 
                the finest collection of curated tracks across multiple genres. Founded with a passion for music 
                discovery, we connect artists with listeners through our innovative streaming platform.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                At PulseNexis, our goal is to inspire creativity and connection. We provide artists with access to original music tracks that spark inspiration and elevate their songwriting process. 
                Our mission is to build a seamless bridge between exceptional music and the people who appreciate it — 
                fostering a vibrant community where creators can showcase their artistry and music lovers can discover their next favorite sound.
              </p>
            </section>

            {/* Our Mission */}
            <section className="bg-amber-50 p-6 rounded-xl border border-amber-200">
              <h2 className="text-2xl font-semibold text-amber-900 mb-4">Our Mission</h2>
              <p className="text-amber-800 leading-relaxed">
               To make music discovery accessible to everyone by creating a platform where aspiring artists can find music that can be used to assist their creativity 
               to a global audience — giving listeners a thoughtfully curated experience that transcends the mainstream.

              </p>
            </section>

            {/* What We Offer */}
            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-6">What We Offer</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-6 border border-neutral-200 rounded-xl">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">Curated Music Catalog</h3>
                  <p className="text-neutral-700">
                    Access to 176+ carefully selected tracks spanning multiple genres, each chosen for its 
                    unique artistic value and production quality.
                  </p>
                </div>
                <div className="p-6 border border-neutral-200 rounded-xl">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">High-Quality Streaming</h3>
                  <p className="text-neutral-700">
                    Experience crystal-clear audio streaming with our optimized delivery system designed 
                    for the best listening experience.
                  </p>
                </div>
                <div className="p-6 border border-neutral-200 rounded-xl">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">Artist Support</h3>
                  <p className="text-neutral-700">
                    We believe in supporting artists by providing them with a platform to reach new audiences 
                    and grow their fanbase.
                  </p>
                </div>
                <div className="p-6 border border-neutral-200 rounded-xl">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">Community Focus</h3>
                  <p className="text-neutral-700">
                    Building a community of music enthusiasts who appreciate quality, creativity, and 
                    authentic musical expression.
                  </p>
                </div>
              </div>
            </section>

            {/* Team Section */}
            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Our Team</h2>
              <div className="bg-gradient-to-r from-purple-50 to-amber-50 p-8 rounded-xl border border-neutral-200">
                <p className="text-neutral-700 leading-relaxed text-center">
                  PulseNexis is powered by a passionate team of music professionals, technology experts, 
                  and creative minds who work together to bring you the best possible music discovery experience. 
                  Our diverse backgrounds in music production, software development, and digital marketing allow us 
                  to create a platform that truly serves both aspiring artists and listeners.
                </p>
              </div>
            </section>

            {/* Get Started */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Ready to Explore?</h2>
              <p className="text-neutral-700 mb-6">
                Join thousands of music lovers who have already discovered their new favorite tracks on PulseNexis.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/catalog"
                  className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition-colors"
                >
                  Browse Music Catalog
                </Link>
                <a
                  href="https://app.pulsenexis.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-purple-600 px-6 py-3 text-sm font-semibold text-purple-600 hover:bg-purple-50 transition-colors"
                >
                  Join PulseNexis App
                </a>
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