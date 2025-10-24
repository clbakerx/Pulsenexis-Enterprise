"use client";

import React, { useEffect, useState } from "react";

type TrackJson = { title?: string; artist?: string; streamPath?: string; id?: string };
type Catalog = { album?: string; tracks: TrackJson[] };

export default function CatalogClient() {
  const [data, setData] = useState<Catalog | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 20;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/catalog');
        if (!mounted) return;
        if (res.ok) setData(await res.json());
      } catch {}
    })();
    return () => { mounted = false };
  }, []);

  if (!data) return <div>Loading catalog…</div>;

  const filtered = data.tracks.filter((t) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return String(t.title ?? "").toLowerCase().includes(q) || String(t.artist ?? "").toLowerCase().includes(q);
  });

  const pages = Math.ceil(filtered.length / pageSize);
  const start = page * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  function playTrack(t: TrackJson) {
    try {
      const bc = new BroadcastChannel('shared-player');
      bc.postMessage({ type: 'play', streamPath: t.streamPath, title: t.title });
      bc.close();
    } catch {
      // fallback: navigate with query param
      location.href = `/?play=${encodeURIComponent(t.streamPath ?? '')}`;
    }
  }

  return (
    <div>
      <h2 style={{ marginTop: 8 }}>{data.album ?? 'Catalog'}</h2>
      <div style={{ margin: '8px 0 12px', display: 'flex', gap: 8 }}>
        <input value={query} onChange={(e) => { setQuery(e.target.value); setPage(0); }} placeholder="Search title or artist" style={{ flex: 1, padding: 6 }} />
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>Prev</button>
          <button onClick={() => setPage((p) => Math.min(pages - 1, p + 1))} disabled={page >= pages - 1}>Next</button>
        </div>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {pageItems.map((t, i) => (
          <li key={t.id ?? i} style={{ margin: '6px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>{t.title}</div>
              {t.artist ? <div style={{ fontSize: 12 }}>{t.artist}</div> : null}
            </div>
            <div>
              <button onClick={() => playTrack(t)} style={{ marginLeft: 8 }}>Play</button>
            </div>
          </li>
        ))}
      </ul>
      {pages > 1 ? (
        <div style={{ marginTop: 12 }}>
          Page {page + 1} of {pages}
        </div>
      ) : null}
    </div>
  );
}
