// =========================================
// FILE: app/support/page.tsx
// =========================================
import Link from "next/link";

export const metadata = {
  title: "Support • PulseNexis",
  description: "Help Center, FAQs, and contact options for PulseNexis.",
};

const faqs = [
  {
    q: "How do I license a song?",
    a: "Open the song page and choose a license tier. You'll be guided to checkout. After purchase, your license and download links are emailed to you.",
  },
  {
    q: "Can I use a song on YouTube or Instagram?",
    a: "Yes, if your license tier includes social usage. Please add \"Music by PulseNexis\" in your credits and include the license ID in your video description.",
  },
  {
    q: "Do you offer refunds?",
    a: "Because digital assets are immediately accessible, all sales are final. If you have trouble with a file or received the wrong version, contact us and we’ll make it right.",
  },
  {
    q: "Where can I find my receipt and license?",
    a: "We email both to the address used at checkout. You can also request a re-send using the form below.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-2xl border p-4 hover:shadow-sm">
      <summary className="cursor-pointer list-none text-lg font-semibold">
        <span className="mr-2 inline-block transition-transform group-open:rotate-90">▸</span>
        {q}
      </summary>
      <div className="mt-2 text-base text-gray-700 leading-relaxed">{a}</div>
    </details>
  );
}

export default function SupportPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <section className="mb-12 grid gap-6 rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-8 text-white md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-black tracking-tight">PulseNexis Support</h1>
          <p className="mt-3 text-lg opacity-90">
            Stuck on something? Browse quick answers or reach out—real humans, fast replies.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#contact" className="rounded-xl bg-white/10 px-4 py-2 font-semibold backdrop-blur transition hover:bg-white/20">Contact Us</a>
            <Link href="/terms" className="rounded-xl bg-white/10 px-4 py-2 font-semibold backdrop-blur transition hover:bg-white/20">Terms</Link>
            <Link href="/privacy" className="rounded-xl bg-white/10 px-4 py-2 font-semibold backdrop-blur transition hover:bg-white/20">Privacy</Link>
          </div>
        </div>
        <div className="rounded-2xl bg-white/10 p-6">
          <ul className="grid grid-cols-2 gap-3 text-sm opacity-95">
            <li>• 24–48 hr email response</li>
            <li>• License lookups</li>
            <li>• File re‑delivery</li>
            <li>• Billing questions</li>
          </ul>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="grid gap-3">
          {faqs.map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      <section id="contact" className="mb-24">
        <h2 className="mb-4 text-2xl font-bold">Contact us</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <form
            className="rounded-2xl border p-6"
            method="POST"
            action="https://formspree.io/f/your-form-id" // ← replace with your Formspree/Backend endpoint
          >
            <div className="grid gap-4">
              <label className="grid gap-1">
                <span className="text-sm font-medium">Your email</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="rounded-xl border px-3 py-2 outline-none focus:ring"
                  placeholder="you@example.com"
                />
              </label>
              <label className="grid gap-1">
                <span className="text-sm font-medium">Subject</span>
                <input
                  type="text"
                  name="subject"
                  required
                  className="rounded-xl border px-3 py-2 outline-none focus:ring"
                  placeholder="Billing, license, download…"
                />
              </label>
              <label className="grid gap-1">
                <span className="text-sm font-medium">Message</span>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="rounded-xl border px-3 py-2 outline-none focus:ring"
                  placeholder="Tell us what you need help with. Include order email or license ID if you have it."
                />
              </label>
              <button type="submit" className="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700">
                Send message
              </button>
              <p className="text-xs text-gray-500">
                By contacting us you agree to our <Link href="/privacy" className="underline">Privacy Policy</Link>.
              </p>
            </div>
          </form>

          <div className="rounded-2xl border p-6">
            <h3 className="text-lg font-semibold">Other ways to reach us</h3>
            <ul className="mt-3 space-y-3 text-gray-700">
              <li>
                <a href="mailto:support@pulsenexis.com" className="underline">support@pulsenexis.com</a>
              </li>
              <li>
                <a href="/terms" className="underline">License & Terms</a>
              </li>
              <li>
                <a href="/privacy" className="underline">Privacy Policy</a>
              </li>
              <li>
                <a href="/catalog" className="underline">Browse the Music Catalog</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
