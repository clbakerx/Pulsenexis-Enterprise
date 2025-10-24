"use client";

import React, { useEffect, useRef, useState } from "react";

type Track = { url: string; title: string; artist?: string; streamPath?: string };

const STORAGE_KEY = "shared-player-state";
const DEFAULT_BASE_URL = "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/";

function ensureDir(b: string) {
  return b.endsWith("/") ? b : b + "/";
}

async function fetchListing(baseUrl: string): Promise<Track[]> {
  const base = ensureDir(baseUrl);
  try {
    const r = await fetch("/tracks.json");
    if (r.ok) {
      const json = await r.json();
      if (Array.isArray(json)) return json.map((t: any) => ({ url: new URL(String(t), base).toString(), title: String(t) }));
      if (json && typeof json === "object" && Array.isArray((json as any).tracks)) {
        const usedBase = ensureDir((json as any).baseURL || base);
        return (json as any).tracks.map((t: any) => ({ url: new URL(t.streamPath || "", usedBase).toString(), title: t.title || String(t.streamPath || ""), artist: t.artist, streamPath: t.streamPath }));
      }
    }
  } catch {}

  try {
    const r = await fetch(new URL("tracks.json", base).toString());
    if (r.ok) {
      const json = await r.json();
      if (Array.isArray(json)) return json.map((t: any) => ({ url: new URL(String(t), base).toString(), title: String(t) }));
      if (json && typeof json === "object" && Array.isArray((json as any).tracks)) {
        const usedBase = ensureDir((json as any).baseURL || base);
        return (json as any).tracks.map((t: any) => ({ url: new URL(t.streamPath || "", usedBase).toString(), title: t.title || String(t.streamPath || ""), artist: t.artist, streamPath: t.streamPath }));
      }
    }
  } catch {}

  return [];
}

export default function SharedPlayer({ baseUrl = DEFAULT_BASE_URL }: { baseUrl?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bcRef = useRef<BroadcastChannel | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const list = await fetchListing(baseUrl);
        if (!mounted) return;
        setTracks(list);
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setTracks([]);
      } finally {
        if (mounted) setLoading(false);
      }

      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const s = JSON.parse(raw);
          if (Array.isArray(s.tracks) && typeof s.index === "number") {
            setIndex(Math.min(s.index, (s.tracks || []).length - 1));
          }
        }
      } catch {}
    })();
    return () => {
      mounted = false;
    };
  }, [baseUrl]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ index, tracks: tracks.map((t) => t.url) }));
    } catch {}
  }, [index, tracks]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setPosition(audio.currentTime);
    const onDur = () => setDuration(audio.duration || 0);
    const onEnd = () => {
      setPlaying(false);
      setIndex((i) => (i + 1) % Math.max(1, tracks.length));
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onDur);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onDur);
      audio.removeEventListener("ended", onEnd);
    };
  }, [tracks]);

  // BroadcastChannel: publish state changes and listen for commands from floating player or other tabs
  useEffect(() => {
    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel("shared-player");
      bcRef.current = bc;
    } catch (err) {
      bc = null;
      bcRef.current = null;
    }

    if (bc) {
      const sendState = () => {
        bc!.postMessage({ type: "state", index, playing, tracks: tracks.map((t) => ({ title: t.title, artist: t.artist, url: t.url })) });
      };

      // send initial state
      sendState();

      const onCmd = (ev: MessageEvent) => {
        const msg = ev.data;
        if (!msg || typeof msg !== "object") return;
        if (msg.type === "command") {
          const action = msg.action;
          if (action === "play") handlePlayPause();
          else if (action === "pause") handlePlayPause();
          else if (action === "next") handleNext();
          else if (action === "prev") handlePrev();
          else if (action === "select" && typeof msg.index === "number") selectTrack(msg.index);
        }
      };

      bc.addEventListener("message", onCmd as EventListener);

      // broadcast on relevant state changes
      const interval = setInterval(sendState, 1000);

      return () => {
        clearInterval(interval);
        bc!.removeEventListener("message", onCmd as EventListener);
        try { bc!.close(); } catch {}
        bcRef.current = null;
      };
    }
  }, [index, playing, tracks]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    if (tracks[index]) {
      audio.src = `/api/proxy?url=${encodeURIComponent(tracks[index].url)}`;
      audio.load();
      if (playing) audio.play().catch(() => setPlaying(false));
    } else {
      audio.removeAttribute("src");
      audio.load();
    }
    setPosition(0);
  }, [index, tracks, playing]);

  function handlePlayPause() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      try { bcRef.current?.postMessage({ type: "command", action: "pause" }); } catch {}
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      try { bcRef.current?.postMessage({ type: "command", action: "play" }); } catch {}
    }
  }

  function handleNext() {
    setIndex((i) => (i + 1) % Math.max(1, tracks.length));
    try { bcRef.current?.postMessage({ type: "command", action: "next" }); } catch {}
  }

  function handlePrev() {
    setIndex((i) => (i - 1 + Math.max(1, tracks.length)) % Math.max(1, tracks.length));
    try { bcRef.current?.postMessage({ type: "command", action: "prev" }); } catch {}
  }

  function selectTrack(i: number) {
    setIndex(i);
    setPlaying(true);
    requestAnimationFrame(() => audioRef.current?.play().catch(() => setPlaying(false)));
    try { bcRef.current?.postMessage({ type: "command", action: "select", index: i }); } catch {}
  }

  function onSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    const v = Number(e.target.value);
    if (audio && !Number.isNaN(v)) {
      audio.currentTime = v;
      setPosition(v);
    }
  }

  return (
    <div style={{ maxWidth: 960, margin: "1rem auto", padding: 20 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <img src="/Logo%20Honey%20Drip.png" alt="Honey Drip" style={{ height: 56, borderRadius: 8 }} />
        <div>
          <h3 style={{ margin: 0 }}>Shared Music Player</h3>
          <div style={{ fontSize: 13, opacity: 0.8 }}>
            Streaming from: <a href={ensureDir(baseUrl)}>{ensureDir(baseUrl)}</a>
          </div>
        </div>
      </div>

      <audio ref={audioRef} preload="none" />

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
        <button onClick={handlePrev} disabled={tracks.length === 0}>Prev</button>
        <button onClick={handlePlayPause} disabled={tracks.length === 0}>{playing ? "Pause" : "Play"}</button>
        <button onClick={handleNext} disabled={tracks.length === 0}>Next</button>
        <div style={{ flex: 1 }}>
          <input type="range" min={0} max={duration || 0} value={position} onChange={onSeek} style={{ width: "100%" }} />
          <div style={{ fontSize: 12 }}>{Math.floor(position)} / {Math.floor(duration)} sec</div>
        </div>
      </div>

      <hr />

      <div>
        <strong>Playlist</strong>
        {loading ? (
          <div style={{ marginTop: 8 }}>Loading playlist…</div>
        ) : tracks.length === 0 ? (
          <div style={{ marginTop: 8 }}>
            No tracks found. If you control the host, add a <code>tracks.json</code> at the base URL with a <code>tracks</code> array of <code>{"{title, artist, streamPath}"}</code>.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12, marginTop: 12 }}>
            {tracks.map((t, i) => {
              const selected = i === index;
              return (
                <div key={t.url} role="button" onClick={() => selectTrack(i)} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 10, borderRadius: 10, border: selected ? "2px solid #c77a1a" : "1px solid rgba(200,150,90,0.25)", background: selected ? "linear-gradient(180deg, #fff8ef, #fff6ee)" : "#fff", cursor: "pointer", minHeight: 76, color: "#171717" }}>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 14, color: "#171717" }}>{t.title}</div>
                    {t.artist ? <div style={{ fontSize: 12, color: "#7a4a14" }}>{t.artist}</div> : null}
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                    <button onClick={(e) => { e.stopPropagation(); selectTrack(i); }} style={{ padding: "6px 10px", background: "#8a4b0b", color: "#fff", border: "none", borderRadius: 6 }}>{selected && playing ? "Pause" : "Play"}</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
