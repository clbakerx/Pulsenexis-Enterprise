"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: result.message
        });
        // Clear form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Something went wrong'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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
          
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Get In Touch</h2>
              <p className="text-neutral-700 leading-relaxed mb-8">
                We&apos;d love to hear from you! Whether you&apos;re an artist looking to join our catalog, 
                a listener with feedback, or a partner interested in collaboration, we&apos;re here to help.
              </p>

              <div className="space-y-6">
                {/* General Contact */}
                <div className="p-6 border border-neutral-200 rounded-xl">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">General Inquiries</h3>
                  <div className="space-y-2 text-neutral-700">
                    <p>📧 <a href="mailto:info@pulsenexisp.com" className="text-purple-600 hover:text-purple-700">info@pulsenexis.com</a></p>
  
                  </div>
                </div>

    

                {/* Technical Support */}
                <div className="p-6 border border-neutral-200 rounded-xl">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">Technical Support</h3>
                  <div className="space-y-2 text-neutral-700">
                    <p>📧 <a href="mailto:info@pulsenexis.com" className="text-purple-600 hover:text-purple-700">info@pulsenexis.com</a></p>
                    <p>Or visit our <Link href="/support" className="text-purple-600 hover:text-purple-700">Support Center</Link></p>
                  </div>
                </div>

                {/* Business Partnerships */}
                <div className="p-6 border border-neutral-200 rounded-xl">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">Business & Partnerships</h3>
                  <div className="space-y-2 text-neutral-700">
                    <p>📧 <a href="mailto:info@pulsenexis.com" className="text-purple-600 hover:text-purple-700">info@pulsenexis.com</a></p>
                    <p className="text-sm">Licensing, collaborations, and business opportunities</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Form */}
            <section>
              <div className="bg-gradient-to-br from-purple-50 to-amber-50 p-8 rounded-xl border border-neutral-200">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Send us a Message</h2>
                
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    >
                      <option value="">Select a topic</option>
                      <option value="general">General Inquiry</option>
                      <option value="artist">Artist Submission</option>
                      <option value="technical">Technical Support</option>
                      <option value="business">Business/Partnership</option>
                      <option value="licensing">Licensing Inquiry</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-vertical"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    Send Message
                  </button>

                  <p className="text-sm text-neutral-600 text-center">
                    We&apos;ll get back to you within 24-48 hours.
                  </p>
                </form>
              </div>
            </section>
          </div>

          {/* Additional Info */}
          <section className="mt-12 text-center">
            <div className="bg-neutral-50 p-8 rounded-xl border border-neutral-200">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Office Hours</h2>
              <div className="grid gap-4 md:grid-cols-2 max-w-md mx-auto">
                <div>
                  <p className="font-medium text-neutral-700">Monday - Friday</p>
                  <p className="text-neutral-600">9:00 AM - 6:00 PM EST</p>
                </div>
                <div>
                  <p className="font-medium text-neutral-700">Weekend</p>
                  <p className="text-neutral-600">Limited Support</p>
                </div>
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