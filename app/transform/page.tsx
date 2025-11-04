import Link from "next/link";
import Image from "next/image";

export default function TransformPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/30 to-amber-50/20">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/90 backdrop-blur">
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
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl">
              Your Journey
              <span className="block bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">
                Needs Its Soundtrack
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-neutral-600">
              Every transformational moment in your life deserves music that amplifies your purpose, 
              elevates your vision, and propels you toward the person you're becoming.
            </p>
            
            <div className="mt-10 flex items-center justify-center gap-6">
              <Link
                href="/catalog"
                className="rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105"
              >
                Discover Your Sound
              </Link>
              <Link
                href="#why-music-matters"
                className="rounded-2xl border-2 border-neutral-300 px-8 py-4 text-lg font-semibold text-neutral-900 hover:border-purple-500 hover:text-purple-700 transition-all duration-300"
              >
                Learn Why Music Matters
              </Link>
            </div>
          </div>
        </div>

        {/* Floating visual elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-amber-500/20 rounded-full blur-xl"></div>
      </section>

      {/* The Problem Section */}
      <section className="py-16 lg:py-24 bg-neutral-900 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-6">
              You're Building Something Extraordinary
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              But every creator, entrepreneur, and visionary faces the same challenge: 
              finding the perfect audio foundation that matches their ambition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-neutral-800/50 border border-neutral-700">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">😤</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Generic Music Kills Your Vibe</h3>
              <p className="text-neutral-400">
                Stock music sounds like everyone else's content. Your vision deserves something unique that sets you apart.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-neutral-800/50 border border-neutral-700">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⏰</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Time Is Your Enemy</h3>
              <p className="text-neutral-400">
                Searching through endless libraries wastes precious time you could spend building your empire.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-neutral-800/50 border border-neutral-700">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💔</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Mismatched Energy Breaks Flow</h3>
              <p className="text-neutral-400">
                Wrong music disrupts your audience's emotional journey, weakening your message's impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="why-music-matters" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-neutral-900 mb-8">
                Music Is The Bridge Between
                <span className="block text-purple-600">Your Vision & Their Hearts</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">Amplifies Your Message</h3>
                    <p className="text-neutral-600">
                      The right soundtrack doesn't just accompany your content—it amplifies your message, 
                      making every word, every frame, every moment more impactful.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">Creates Emotional Resonance</h3>
                    <p className="text-neutral-600">
                      Music bypasses logic and speaks directly to the soul. It creates the emotional foundation 
                      that transforms viewers into believers, customers into advocates.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">Accelerates Your Growth</h3>
                    <p className="text-neutral-600">
                      When your content hits different, people remember you. They share you. They seek you out. 
                      That's how movements are born.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-purple-100 via-purple-50 to-amber-50 border-2 border-purple-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-6xl">🎵</span>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">Your Sound, Your Story</h3>
                  <p className="text-neutral-600">
                    Every track in our catalog is crafted to elevate human potential and amplify greatness.
                  </p>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Stories */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-purple-50 to-amber-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-neutral-900 mb-6">
              The Transformation Is Real
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              When you match the right music to your mission, magic happens. 
              Here's what our community experiences:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-neutral-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">📈</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">3x Engagement</h3>
              </div>
              <p className="text-neutral-600 text-center">
                "My content went from good to unforgettable. People started sharing, 
                commenting, and asking where I found such powerful music."
              </p>
              <div className="mt-6 text-center">
                <span className="text-sm font-medium text-purple-600">— Sarah K., Content Creator</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-neutral-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">Perfect Alignment</h3>
              </div>
              <p className="text-neutral-600 text-center">
                "Finally found music that matches my brand's energy. Every track feels like 
                it was made specifically for my vision."
              </p>
              <div className="mt-6 text-center">
                <span className="text-sm font-medium text-purple-600">— Marcus T., Entrepreneur</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-neutral-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">Instant Impact</h3>
              </div>
              <p className="text-neutral-600 text-center">
                "Within hours of switching to PulseNexis music, my videos started hitting different. 
                The transformation was immediate."
              </p>
              <div className="mt-6 text-center">
                <span className="text-sm font-medium text-purple-600">— Alex M., YouTuber</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-16 lg:py-24 bg-neutral-900 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-6">
              Every Day You Wait Is a Day Your Competitors Get Ahead
            </h2>
            <p className="text-xl text-neutral-300 max-w-4xl mx-auto mb-12">
              While you're settling for ordinary music, someone else is using extraordinary soundtracks 
              to captivate the audience you're meant to serve. Don't let perfect be the enemy of progress.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              <div className="p-6 rounded-2xl bg-red-900/30 border border-red-700/50">
                <h3 className="text-lg font-semibold mb-3 text-red-300">❌ Without PulseNexis</h3>
                <ul className="text-left space-y-2 text-neutral-400">
                  <li>• Generic music that blends into the noise</li>
                  <li>• Weak emotional connection with your audience</li>
                  <li>• Content that's quickly forgotten</li>
                  <li>• Missing out on your breakthrough moment</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-green-900/30 border border-green-700/50">
                <h3 className="text-lg font-semibold mb-3 text-green-300">✅ With PulseNexis</h3>
                <ul className="text-left space-y-2 text-neutral-400">
                  <li>• Music that amplifies your unique message</li>
                  <li>• Deep emotional resonance that builds loyalty</li>
                  <li>• Content that gets remembered and shared</li>
                  <li>• The sonic foundation for your empire</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-2xl font-semibold text-amber-400">
                Your breakthrough moment is waiting for its soundtrack.
              </p>
              <Link
                href="/catalog"
                className="inline-block rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-12 py-4 text-xl font-bold text-white shadow-2xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105"
              >
                Find Your Sound Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-purple-600 via-purple-700 to-amber-600">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-5xl font-bold tracking-tight mb-8">
              Your Journey Starts With The First Note
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-12">
              Stop searching. Stop settling. Stop waiting for the perfect moment. 
              Your perfect soundtrack is here, ready to elevate everything you create.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/catalog"
                className="rounded-2xl bg-white text-purple-700 px-10 py-4 text-lg font-bold shadow-xl hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
              >
                Explore the Catalog
              </Link>
              <Link
                href="/licensing"
                className="rounded-2xl border-2 border-white/30 text-white px-10 py-4 text-lg font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Get Licensing Info
              </Link>
              <a
                href="mailto:info@pulsenexis.com"
                className="rounded-2xl border-2 border-white/30 text-white px-10 py-4 text-lg font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Talk to Our Team
              </a>
            </div>

            <div className="mt-12 text-purple-200">
              <p className="text-sm">Join thousands of creators who've found their sound.</p>
              <p className="text-sm font-semibold">Your transformation starts today.</p>
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