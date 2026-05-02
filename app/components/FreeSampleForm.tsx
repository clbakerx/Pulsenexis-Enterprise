'use client';

import { useState } from 'react';

const BASE = 'https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/FreeSamples';

type Track = { title: string; vibe: string; url: string };

const TRACKS: Track[] = [
  { title: '48 Hours', vibe: 'Moody - R&B', url: BASE + '/48-Hours_V2_Sample.mp3' },
  { title: 'A Love Thats True', vibe: 'Romantic - R&B', url: BASE + '/A Love Thats True_Sample.mp3' },
  { title: 'All In', vibe: 'Romantic - R&B', url: BASE + '/All In_Sample.mp3' },
  { title: 'All Of Me', vibe: 'Moody - R&B', url: BASE + '/All of Me_Sample.mp3' },
  { title: 'Almost Counts', vibe: 'Emotional - R&B', url: BASE + '/Almost Counts_Sample.mp3' },
  { title: 'Another Moment', vibe: 'Moody - R&B', url: BASE + '/Another Moment_V2_Sample.mp3' },
  { title: 'Betrayed Again', vibe: 'Moody - R&B', url: BASE + '/Betrayed Again_V2_Sample.mp3' },
  { title: 'Boyfriend', vibe: 'Moody - R&B', url: BASE + '/Boyfriend_Sample.mp3' },
  { title: 'Breaking My Heart', vibe: 'Moody - R&B', url: BASE + '/Breaks My Heart.mp3' },
  { title: 'Bring The Snow', vibe: 'Moody - R&B', url: BASE + '/Bring-the-Snow(Slide We Ride)Sample.mp3' },
  { title: 'Built Different', vibe: 'Moody - R&B', url: BASE + '/Built Different_Sample.mp3' },
  { title: 'Cant Stay Away', vibe: 'Moody - R&B', url: BASE + '/Cant-Stay-Away_Sample.mp3' },
  { title: 'Chances', vibe: 'Moody - R&B', url: BASE + '/Chances_30secSample.mp3' },
  { title: 'Clean Air', vibe: 'Poetic - Soul', url: BASE + '/Clean Air_Sample.mp3' },
  { title: 'Closer Than Before', vibe: 'Romantic - R&B', url: BASE + '/Closer-Than-Before_Sample.mp3' },
  { title: 'Crystal Ball', vibe: 'Poetic - Soul', url: BASE + '/Crystal Ball_Sample.mp3' },
  { title: 'Emotionally', vibe: 'Moody - R&B', url: BASE + '/Emotionally_Sample.mp3' },
  { title: 'Extraordinary Love', vibe: 'Romantic - R&B', url: BASE + '/Extraordinary Love_Sample.mp3' },
  { title: 'First Sight', vibe: 'Moody - R&B', url: BASE + '/First Sight_Sample.mp3' },
  { title: 'Forward', vibe: 'Moody - R&B', url: BASE + '/Forward (No Looking Back)_Sample.mp3' },
  { title: 'Heart Gets In The Way', vibe: 'Moody - R&B', url: BASE + '/Heart Gets in the Way.mp3' },
  { title: 'Last Night', vibe: 'Moody - R&B', url: BASE + '/Last Night .mp3' },
  { title: 'Made For This', vibe: 'Romantic - R&B', url: BASE + '/Made For This_Sample.mp3' },
  { title: 'Millionaire', vibe: 'Moody - R&B', url: BASE + '/Millionaire_V2_Sample.mp3' },
  { title: 'Movie Of The Year', vibe: 'Moody - R&B', url: BASE + '/Movie of the Year_Sample.mp3' },
  { title: 'Never Again', vibe: 'Moody - R&B', url: BASE + '/Never Again_Sample.mp3' },
  { title: 'No Distance Between Us', vibe: 'Romantic - R&B', url: BASE + '/No-Distance-Between-Us_V2_Sample.mp3' },
  { title: 'No Doubt', vibe: 'Moody - R&B', url: BASE + '/No Doubt_Sample.mp3' },
  { title: 'No Halfway Love', vibe: 'Moody - R&B', url: BASE + '/No Halfway Love_Sample.mp3' },
  { title: 'No Way You Win', vibe: 'Moody - R&B', url: BASE + '/No Way You Win_Sample.mp3' },
  { title: 'Not Just For Tonight', vibe: 'Moody - R&B', url: BASE + '/Not Just For Tonight_Sample.mp3' },
  { title: 'Nothing Falls Through', vibe: 'Moody - R&B', url: BASE + '/Nothing-Falls-Through_V2_Short.mp3' },
  { title: 'One Love', vibe: 'Romantic - R&B', url: BASE + '/One Love_Sample.mp3' },
  { title: 'Paid The Price', vibe: 'Moody - R&B', url: BASE + '/Paid the Price_Sample.mp3' },
  { title: 'Perfect Choice', vibe: 'Romantic - R&B', url: BASE + '/Perfect-Choice-(Remix).mp3' },
  { title: 'Release Me', vibe: 'Moody - R&B', url: BASE + '/Release Me_Sample.mp3' },
  { title: 'Right Here With You', vibe: 'Romantic - R&B', url: BASE + '/Right-Here-With-You_Sample.mp3' },
  { title: 'Right In The Middle', vibe: 'Moody - R&B', url: BASE + '/Right in the Middle_30secSample.mp3' },
  { title: 'Say It Right', vibe: 'Moody - R&B', url: BASE + '/Say it Right_Sample.mp3' },
  { title: 'Sensational', vibe: 'Romantic - R&B', url: BASE + '/Sensational_V2.mp3' },
  { title: 'Slow Motion Love', vibe: 'Romantic - R&B', url: BASE + '/Slow Motion Love_Sample.mp3' },
  { title: 'Soapbox Attention', vibe: 'Moody - R&B', url: BASE + '/Soapbox Attention_Sample.mp3' },
  { title: 'Teach Me To Love', vibe: 'Romantic - R&B', url: BASE + '/Teach Me to Love_Sample.mp3' },
  { title: 'Tell Me You Love Me Again', vibe: 'Romantic - R&B', url: BASE + '/Tell-Me-You-Love-Me-Again_Sample.mp3' },
  { title: 'The Only Way I Be', vibe: 'Poetic - Soul', url: BASE + '/The Only Way I Be_Sample.mp3' },
  { title: 'This Love Aint Temporary', vibe: 'Moody - R&B', url: BASE + '/This-Love-Aint-Temporary_V2_Sample.mp3' },
  { title: 'This Love Is Relevant', vibe: 'Moody - R&B', url: BASE + '/This-Love-Is-Relevant_Sample.mp3' },
  { title: 'Under The Moonlight', vibe: 'Romantic - R&B', url: BASE + '/Under the Moonlight_V2_Sample.mp3' },
  { title: 'Where Do We Go Tonight', vibe: 'Moody - R&B', url: BASE + '/Where Do We Go Tonight_Sample.mp3' },
  { title: 'Where Im Going', vibe: 'Poetic - Soul', url: BASE + '/Where-Im-Going_V2_Sample.mp3' },
  { title: 'Where We Need To Be', vibe: 'Moody - R&B', url: BASE + '/Where We Need to Be_Sample.mp3' },
  { title: 'Winter White', vibe: 'Poetic - Soul', url: BASE + '/Winter-While-Sample.mp3' },
  { title: 'Wouldnt Want To', vibe: 'Moody - R&B', url: BASE + '/Wouldnt-Want-To_Sample.mp3' },
];

function randomTrack(): Track {
  return TRACKS[Math.floor(Math.random() * TRACKS.length)];
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function FreeSampleForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [picked] = useState<Track>(randomTrack);

  async function handleSubmit() {
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), track: picked.title }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500">
          <svg
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Your Pulsenexis pick
        </p>
        <h2 className="mt-1 text-2xl font-bold text-neutral-900">{picked.title}</h2>
        <p className="mt-1 text-sm text-neutral-500">{picked.vibe}</p>
        <a
          href={picked.url}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-400"
        >
          Listen to your sample
        </a>
        <p className="mt-4 text-sm text-neutral-500">
          Like what you hear? Visit the catalog for the full license.
        </p>
        <p className="mt-2 text-xs text-neutral-400">
          Unable to save your MP3? Email{' '}
          <a href="mailto:info@pulsenexis.com" className="underline">
            info@pulsenexis.com
          </a>{' '}
          for a download link include the track title.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border-2 border-dashed border-emerald-300 bg-emerald-50 p-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
        Free sample - Pulsenexis pick
      </p>
      <h1 className="mt-2 text-3xl font-bold text-neutral-900">Taste it before you buy.</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Drop your email and we will pick a sample from the catalog for you - no card, no catch.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
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
        <button
          onClick={handleSubmit}
          disabled={status === 'loading'}
          className="shrink-0 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'loading' ? 'Submitting...' : 'Get my sample'}
        </button>
      </div>
      {errorMsg && <p className="mt-3 text-sm text-red-600">{errorMsg}</p>}
      <p className="mt-3 text-xs text-neutral-400">
        No spam. Unsubscribe anytime. Every visitor gets a different sample.
      </p>
    </div>
  );
}