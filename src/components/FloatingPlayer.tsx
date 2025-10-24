"use client";

import React, { useEffect, useRef, useState } from "react";

type Pos = { x: number; y: number } | null;

const STORAGE_KEY_POS = "shared-player-float-pos";

export default function FloatingPlayer() {
  const [visible, setVisible] = useState(true);
  const [pos, setPos] = useState<Pos>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_POS);
      if (raw) return JSON.parse(raw);
    } catch {}
    return null;
  });
  const [trackTitle, setTrackTitle] = useState<string>("No track");
  const [trackArtist, setTrackArtist] = useState<string>("");
  const [playing, setPlaying] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  const elRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef<{ ox: number; oy: number } | null>(null);

  useEffect(() => {
    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel("shared-player");
    } catch (err) {
      bc = null;
    }
    if (!bc) return;

    const onMsg = (ev: MessageEvent) => {
      const msg = ev.data;
      if (!msg || typeof msg !== "object") return;
      if (msg.type === "state") {
        const s = msg as any;
        setIndex(typeof s.index === "number" ? s.index : 0);
        setPlaying(Boolean(s.playing));
        if (Array.isArray(s.tracks) && s.tracks.length > 0) {
          setTrackTitle(s.tracks[s.index]?.title || s.tracks[0].title || "No track");
          setTrackArtist(s.tracks[s.index]?.artist || "");
        }
      }
    };

    bc.addEventListener("message", onMsg as EventListener);
    // request an immediate state by sending a ping command
    bc.postMessage({ type: "command", action: "ping" });

    return () => {
      bc.removeEventListener("message", onMsg as EventListener);
      bc.close();
    };
  }, []);

  useEffect(() => {
    try {
      if (pos) localStorage.setItem(STORAGE_KEY_POS, JSON.stringify(pos));
      else localStorage.removeItem(STORAGE_KEY_POS);
    } catch {}
  }, [pos]);

  function sendCommand(action: string, payload?: any) {
    try {
      const bc = new BroadcastChannel("shared-player");
      bc.postMessage({ type: "command", action, ...(payload || {}) });
      bc.close();
    } catch {}
  }

  function onPointerDown(e: React.PointerEvent) {
    const el = elRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    dragging.current = { ox: e.clientX - rect.left, oy: e.clientY - rect.top };
    (e.target as Element).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    const ox = dragging.current.ox;
    const oy = dragging.current.oy;
    const nx = e.clientX - ox;
    const ny = e.clientY - oy;
    setPos({ x: Math.max(8, nx), y: Math.max(8, ny) });
  }

  function onPointerUp(e: React.PointerEvent) {
    try {
      (e.target as Element).releasePointerCapture(e.pointerId);
    } catch {}
    dragging.current = null;
  }

  return visible ? (
    <div
      ref={elRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        position: "fixed",
        left: pos?.x ?? "auto",
        right: pos ? "auto" : 24,
        top: pos?.y ?? "auto",
        bottom: pos ? "auto" : 24,
        zIndex: 9999,
        width: 260,
        padding: 12,
        borderRadius: 10,
        boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
        background: "linear-gradient(180deg,#fff8ef,#fff6ee)",
        cursor: "grab",
        userSelect: "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "#171717" }}>{trackTitle}</div>
          <div style={{ fontSize: 12, color: "#7a4a14", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{trackArtist}</div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginLeft: 8 }}>
          <button onClick={(e) => { e.stopPropagation(); sendCommand("prev"); }} style={{ padding: "6px", borderRadius: 6 }}>◀</button>
          <button onClick={(e) => { e.stopPropagation(); sendCommand(playing ? "pause" : "play"); }} style={{ padding: "6px 8px", borderRadius: 6 }}>{playing ? "▮▮" : "▶"}</button>
          <button onClick={(e) => { e.stopPropagation(); sendCommand("next"); }} style={{ padding: "6px", borderRadius: 6 }}>▶▸</button>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        <button onClick={(e) => { e.stopPropagation(); setVisible(false); }} style={{ fontSize: 12, color: "#171717" }}>Hide</button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setPos(null);
          }}
          style={{ fontSize: 12, color: "#171717" }}
        >
          Reset
        </button>
      </div>
    </div>
  ) : (
    <div style={{ position: "fixed", right: 24, bottom: 24, zIndex: 9999 }}>
      <button onClick={() => setVisible(true)} style={{ padding: 10, borderRadius: 999, background: "#8a4b0b", color: "#fff", border: "none" }}>Now</button>
    </div>
  );
}
