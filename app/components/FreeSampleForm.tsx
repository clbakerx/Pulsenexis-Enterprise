'use client';

// app/components/FreeSampleForm.tsx
// Captures email + use case, saves it through /api/free-sample,
// then shows the picked track with a player right on the page.

import { useEffect, useState } from 'react';

type Sample = { id: string; title: string; vibe: string; audioUrl: string };
type Status = 'idle' | 'loading' | 'success' | 'error';

const USE_CASES = ['Reels & shorts', 'Wedding / love story', 'Podcast', 'Film / cinematic', 'Gaming', 'Just browsing'];
const STORAGE_KEY = 'pulsenexis_free_sample';

export default function FreeSampleForm() {
  const [email, setEmail] = useState('');
  const [useCase, setUseCase] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [sample, setSample] = useState<Sample | null>(null);

  // Returning visitor goes straight to the track they already got.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSample(JSON.parse(saved));
        setStatus('success');
      }
    } catch {}
  }, []);

  async function handleSubmit() {
    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg('Please enter a valid email address.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/free-sample', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, useCase: useCase || 'unspecified', company }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.sample) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }
      setSample(data.sample);
      setStatus('success');
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.sample));
      } catch {}
    } catch (e) {
      setStatus('error');
      setErrorMsg(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    }
  }

  function reset() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setSample(null);
    setEmail('');
    setUseCase('');
    setStatus('idle');
  }

  if (status === 'success' && sample) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500">
          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-emerald-700">Your Pulsenexis pick</p>
        <h2 className="mt-1 text-2xl font-bold text-neutral-900">{sample.title}</h2>
        <p className="mt-1 text-sm text-neutral-500">{sample.vibe}</p>

        <audio controls preload="none" src={sample.audioUrl} className="mt-6 w-full">
          Your browser does not support audio playback.
        </audio>

        <a
          href={sample.audioUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-400"
        >
          Open / save the MP3
        </a>

        <p className="mt-4 text-sm text-neutral-500">Like what you hear? Visit the catalog for the full license.</p>
        <p className="mt-2 text-xs text-neutral-400">
          Unable to save your MP3? Email{' '}
          <a href="mailto:info@pulsenexis.com" className="underline">info@pulsenexis.com</a>{' '}
          for a download link - include the track title.
        </p>
        <button type="button" onClick={reset} className="mt-4 text-xs text-neutral-400 underline hover:text-neutral-600">
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border-2 border-dashed border-emerald-300 bg-emerald-50 p-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Free sample - Pulsenexis pick</p>
      <h1 className="mt-2 text-3xl font-bold text-neutral-900">Taste it before you buy.</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Drop your email and we will pick a sample from the catalog for you - no card, no catch.
      </p>

      <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-emerald-700">What are you scoring?</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {USE_CASES.map((u) => (
          <button
            key={u}
            type="button"
            onClick={() => setUseCase(useCase === u ? '' : u)}
            className={
              'rounded-full border px-4 py-2 text-sm transition ' +
              (useCase === u
                ? 'border-emerald-500 bg-emerald-500 text-white'
                : 'border-neutral-300 bg-white text-neutral-700 hover:border-emerald-400')
            }
          >
            {u}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errorMsg) setErrorMsg('');
            if (status === 'error') setStatus('idle');
          }}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
          placeholder="your@email.com"
          disabled={status === 'loading'}
          className="flex-1 rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 disabled:opacity-50"
        />
        {/* Honeypot: hidden from people, bots fill it in */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="hidden"
          aria-hidden="true"
        />
        <button
          onClick={handleSubmit}
          disabled={status === 'loading'}
          className="shrink-0 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'loading' ? 'Picking your track...' : 'Get my sample'}
        </button>
      </div>
      {errorMsg && <p className="mt-3 text-sm text-red-600">{errorMsg}</p>}
      <p className="mt-3 text-xs text-neutral-400">No spam. Unsubscribe anytime. Every visitor gets a different sample.</p>
    </div>
  );
}