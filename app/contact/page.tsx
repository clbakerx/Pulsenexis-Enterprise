'use client';

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [showNoEmailApp, setShowNoEmailApp] = useState(false);

  const composeMailto = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const name = (formData.get('name') || '').toString();
    const email = (formData.get('email') || '').toString();
    const subject = (formData.get('subject') || 'Support Request').toString();
    const message = (formData.get('message') || '').toString();
    const order = (formData.get('order') || '').toString().trim();
    
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      order ? `Order #: ${order}` : null,
      '',
      message
    ].filter(Boolean).join('\r\n');
    
    const mailtoUrl = `mailto:info@pulsenexis.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines)}`;
    window.location.href = mailtoUrl;
    
    setTimeout(() => {
      setShowNoEmailApp(true);
    }, 800);
  };

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
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-8">Contact Us</h1>
          
          <div className="bg-gradient-to-r from-purple-50 to-amber-50 p-6 rounded-xl border border-neutral-200 mb-8">
            <p className="text-lg text-neutral-700 leading-relaxed">
              Fill the form below or email us directly at{' '}
              <a href="mailto:info@pulsenexis.com" className="text-purple-600 hover:text-purple-700 font-medium">
                info@pulsenexis.com
              </a>.
            </p>
          </div>

          {/* Contact Form */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Contact Us</h2>
            
            <form onSubmit={composeMailto} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="order" className="block text-sm font-medium text-neutral-700 mb-2">
                    Order # (optional)
                  </label>
                  <input
                    type="text"
                    id="order"
                    name="order"
                    className="w-full rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                ></textarea>
              </div>

              <div className="flex gap-4 items-center flex-wrap">
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200"
                >
                  Compose Email
                </button>
                <a 
                  href="mailto:info@pulsenexis.com" 
                  className="text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Or email info@pulsenexis.com
                </a>
              </div>
            </form>

            {showNoEmailApp && (
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-amber-800">
                  If no email app opens, copy this address: <strong>info@pulsenexis.com</strong>
                </p>
              </div>
            )}
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Other Ways to Reach Us</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 border border-neutral-200 rounded-xl">
                <h3 className="text-xl font-semibold text-purple-900 mb-3">📧 Email</h3>
                <p className="text-neutral-700 mb-4">
                  For general inquiries, licensing questions, or support.
                </p>
                <a 
                  href="mailto:info@pulsenexis.com" 
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  info@pulsenexis.com
                </a>
              </div>

              <div className="p-6 border border-neutral-200 rounded-xl">
                <h3 className="text-xl font-semibold text-purple-900 mb-3">⚡ Quick Response</h3>
                <p className="text-neutral-700 mb-4">
                  We typically respond to all inquiries within 24-48 hours.
                </p>
                <p className="text-sm text-neutral-600">
                  Business hours: Monday - Friday, 9 AM - 6 PM EST
                </p>
              </div>
            </div>
          </section>
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