'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

type Track = { title: string; artist?: string; streamPath: string; duration?: number | null };
type SongsFile = { album?: string; baseURL?: string; tracks?: Track[]; catalog?: Track[] };

// helpers
const s = (v?: string | null) => (typeof v === 'string' ? v : '');
const slugify = (t: string) => s(t).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$|/g, '');
const cleanPath = (p = '') => p.trim();
const joinUrl = (base = '', p = '') =>
  base.replace(/\/$/, '') + '/' + cleanPath(p).split('/').map(encodeURIComponent).join('/');

export default function CatalogPage() {
  const [data, setData] = useState<SongsFile | null>(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 24;

  // one shared audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [nowPlaying, setNowPlaying] = useState<{ title: string; url: string } | null>(null);

  // load songs.json
  useEffect(() => {
    fetch('/songs.json')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status} loading /songs.json`);
        return r.json();
      })
      .then(setData)
      .catch((e) => {
        console.error(e);
        setData({ album: 'Pulsenexis – Catalog', baseURL: '', tracks: [] }); // minimal fallback
      });
  }, []);

  // normalize tracks
  const allTracks = useMemo<Track[]>(() => {
    const list = (data?.tracks ?? data?.catalog ?? []) as Track[];
    return list
      .filter(Boolean)
      .map((t) => ({
        title: s(t?.title) || 'Untitled',
        artist: s(t?.artist) || 'PulseNexis',
        streamPath: s(t?.streamPath),
        duration: t?.duration ?? null,
      }))
      .filter((t) => !!t.streamPath);
  }, [data]);

  // filter + sort
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? allTracks.filter(
          (t) => s(t.title).toLowerCase().includes(q) || s(t.artist).toLowerCase().includes(q),
        )
      : allTracks;
    return [...list].sort((a, b) =>
      s(a.title).localeCompare(s(b.title), undefined, { sensitivity: 'base' }),
    );
  }, [allTracks, query]);

  // pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  // play handler
  const playTrack = (t: Track) => {
    const url = data?.baseURL ? joinUrl(data.baseURL, t.streamPath) : t.streamPath;
    setNowPlaying({ title: s(t.title) || 'Untitled', url });
    requestAnimationFrame(() => {
      const el = audioRef.current;
      if (!el) return;
      el.pause();
      el.src = url;
      el.load();
      el.play().catch(() => {});
    });
  };

  if (!data) return <p style={{ padding: 24 }}>Loading…</p>;

  // simple palette (you can tweak)
  const COLORS = {
    bg: '#0d0a08',        // deep brown (logo background feel)
    card: '#ffffff',
    text: '#111827',
    dim: 'rgba(17,24,39,.65)',
    gold: '#D7B566',      // Honey Drip gold
    line: '#e5e7eb',
    black: '#111827',
    white: '#fff',
  };

  return (
    <main
      style={{
        padding: 24,
        maxWidth: 1100,
        margin: '0 auto',
        color: COLORS.text,
        background: COLORS.bg,
        minHeight: '100vh',
      }}
    >
      <header style={{ margin: '8px 0 20px' }}>
        <h1 style={{ color: COLORS.gold, fontSize: 28, margin: 0 }}>
          Honey Drip Records — Catalog
        </h1>
        <div style={{ color: COLORS.dim, marginTop: 6 }}>
          Streaming from <code title={s(data.baseURL)} style={{ color: COLORS.gold }}>
            Pulsenexis Stream
          </code>
          {' · '}
          <span>{allTracks.length} tracks</span>
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search title or artist…"
            style={{
              width: 360,
              maxWidth: '100%',
              padding: '10px 12px',
              border: `1px solid ${COLORS.line}`,
              borderRadius: 12,
              outline: 'none',
            }}
          />
          <div style={{ marginLeft: 'auto', color: COLORS.white }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={current === 1}
              style={btnSm(COLORS)}
            >
              ◀
            </button>
            <span style={{ margin: '0 8px', color: COLORS.white }}>
              {current}/{totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={current === totalPages}
              style={btnSm(COLORS)}
            >
              ▶
            </button>
          </div>
        </div>
      </header>

      {/* grid of simple rectangular cards */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))',
          gap: 16,
        }}
      >
        {pageItems.map((t) => {
          const openUrl = data?.baseURL ? joinUrl(data.baseURL, t.streamPath) : t.streamPath;
          const slug = slugify(t.title);
          return (
            <li
              key={`${slug}-${openUrl}`}
              style={{
                border: `1px solid ${COLORS.line}`,
                borderRadius: 16,
                padding: 14,
                background: COLORS.card,
                display: 'grid',
                gridTemplateColumns: '1fr auto auto',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{t.title}</div>
                <div style={{ color: COLORS.dim, fontSize: 13 }}>{t.artist}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button onClick={() => playTrack(t)} style={btnPrimary(COLORS)}>▶ Play</button>
                <Link
                  href={`https://app.pulsenexis.com/track/${encodeURIComponent(slug)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={btnGhost(COLORS)}
                >
                  Join
                </Link>
                <a
                  href={openUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open file in new tab"
                  title="Open audio file"
                  style={btnIcon(COLORS)}
                >
                  ⤓
                </a>
              </div>
            </li>
          );
        })}
      </ul>

      {/* sticky player */}
      <div
        style={{
          position: 'sticky',
          bottom: 12,
          marginTop: 24,
          background: COLORS.card,
          border: `1px solid ${COLORS.line}`,
          borderRadius: 16,
          padding: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        }}
      >
        <div style={{ fontSize: 14, marginBottom: 8, color: COLORS.text }}>
          {nowPlaying ? `Now playing: ${nowPlaying.title}` : 'Select a track to play'}
        </div>
        <audio ref={audioRef} controls preload="metadata" style={{ width: '100%' }} />
      </div>
    </main>
  );
}

// button styles
const btnPrimary = (C: any): React.CSSProperties => ({
  border: `1px solid ${C.black}`,
  background: C.black,
  color: C.white,
  padding: '8px 12px',
  borderRadius: 10,
  cursor: 'pointer',
  textDecoration: 'none',
  fontSize: 14,
});

const btnGhost = (C: any): React.CSSProperties => ({
  border: `1px solid ${C.line}`,
  background: '#fff',
  color: C.black,
  padding: '8px 12px',
  borderRadius: 10,
  cursor: 'pointer',
  textDecoration: 'none',
  fontSize: 14,
});

const btnSm = (C: any): React.CSSProperties => ({
  ...btnGhost(C),
  padding: '6px 10px',
});

const btnIcon = (C: any): React.CSSProperties => ({
  ...btnGhost(C),
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  padding: 8,
});
