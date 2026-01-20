// =========================================
// FILE: app/support/page.tsx
// =========================================
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "Support • PulseNexis",
  description: "Help Center, FAQs, and contact options for PulseNexis.",
};

type FAQ = {
  q: string;
  a: ReactNode; // ✅ allows string OR JSX
};

const faqs: FAQ[] = [
  {
    q: "How do I license a song?",
    a: (
      <>
        Contact us via{" "}
        <a className="text-blue-600 hover:underline" href="mailto:info@pulsenexis.com">
          info@pulsenexis.com
        </a>{" "}
        and one of our agents will ensure your needs are met. We'll guide you through the licensing
        process and provide personalized assistance.
      </>
    ),
  },
  {
    q: "Can I use a song on YouTube or Instagram?",
    a: (
      <>
        Yes, if your license tier includes social usage. Please add{" "}
        <span className="font-medium">"Music by PulseNexis"</span> in your credits and include the
        license ID in your video description.
      </>
    ),
  },
  {
    q: "Do you offer refunds?",
    a: (
      <>
        Because digital assets are immediately accessible, all sales are final. If you have trouble
        with a file or received the wrong version, contact us and we'll make it right.
      </>
    ),
  },
  {
    q: "Where can I find my receipt and license?",
    a: (
      <>
        We email both to the address used at checkout. If you need a re-send, please{" "}
        <Link href="/contact" className="text-blue-600 hover:underline">
          contact us
        </Link>
        .
      </>
    ),
  },
];

function FAQItem({ q, a }: { q: string; a: ReactNode }) {
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
            <Link
              href="/contact"
              className="rounded-xl bg-white/10 px-4 py-2 font-semibold backdrop-blur transition hover:bg-white/20"
            >
              Contact Us
            </Link>
            <Link
              href="/terms"
              className="rounded-xl bg-white/10 px-4 py-2 font-semibold backdrop-blur transition hover:bg-white/20"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="rounded-xl bg-white/10 px-4 py-2 font-semibold backdrop-blur transition hover:bg-white/20"
            >
              Privacy
            </Link>
          </div>
        </div>

        <div className="rounded-2xl bg-white/10 p-6">
          <ul className="grid grid-cols-2 gap-3 text-sm opacity-95">
            <li>• 24–48 hr email response</li>
            <li>• License lookups</li>
            <li>• File re-delivery</li>
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
    </main>
  );
}
