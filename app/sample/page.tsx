"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";

const SAMPLE_SONGS = [
  {
    id: "someone-elses-man",
    title: "Someone Else's Man",
    vibe: "Emotional • R&B",
    audioUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Video-Generator/Somebody%20Else%E2%80%99s%20Man_clip.mp3",
  },
  {
    id: "the-only-way-i-be",
    title: "The Only Way I Be",
    vibe: "Poetic • Soul",
    audioUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Video-Generator/The%20Only%20Way%20I%20Be_clip.mp3",
  },
  {
    id: "how-many-love-songs",
    title: "How Many Love Songs",
    vibe: "Moody • R&B",
    audioUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Video-Generator/How%20Many%20Love%20Songs_clip.mp3",
  },
  {
    id: "all-in",
    title: "All In",
    vibe: "Romantic • R&B",
    audioUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Video-Generator/All%20In_clip.mp3",
  },
  {
    id: "crystal-ball",
    title: "Crystal Ball",
    vibe: "Poetic • Soul",
    audioUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Video-Generator/Crystal%20Ball_clip.mp3",
  },
  {
    id: "movie-of-the-year",
    title: "Movie of the Year",
    vibe: "Moody • R&B",
    audioUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Video-Generator/Movie%20of%20the%20Year_clip.mp3",
  },
  {
    id: "boyfriend",
    title: "Boyfriend",
    vibe: "Moody • R&B",
    audioUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Singles/Boyfriend/Boyfriend_V2_Sample.mp3",
  },
  {
    id: "no-way-you-win",
    title: "No Way You Win",
    vibe: "Moody • R&B",
    audioUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Singles/No-Way-You-Win/No%20Way%20You%20Win_Sample.mp3",
  },
  {
    id: "where-we-need-to-be",
    title: "Where We Need To Be",
    vibe: "Moody • R&B",
    audioUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Singles/Where-We-Need-To-Be/Where%20We%20Need%20to%20Be_Sample.mp3",
  },
];

export default function SamplePage() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [status, setStatus] = useState<null | "loading" | "polling" | "done" | "error">(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File | null | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;
    setPhoto(file);
    const reader = new FileReader();
    reader.onload = (e) => setPhotoPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const song = SAMPLE_SONGS.find((s) => s.id === selectedSong);
  const isReady = photo && selectedSong;

  const generateSample = async () => {
    if (!isReady || !song) return;
    setStatus("loading");
    setVideoUrl(null);
    setErrorMsg("");

    try {
      const imageBase64 = await new Promise<string>((res, rej) => {
        const reader = new FileReader();
        reader.onload = (e) => res(e.target?.result as string);
        reader.onerror = () => rej(new Error("Failed to read file"));
        reader.readAsDataURL(photo!);
      });

      const createRes = await fetch("/api/sample-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64, audioUrl: song.audioUrl, songId: song.id }),
      });

      const createData = await createRes.json();

      if (createRes.status === 429) {
        setErrorMsg("You've used your free sample today. Come back tomorrow or upgrade to create unlimited videos!");
        setStatus("error");
        return;
      }

      if (!createRes.ok) throw new Error(createData.error || "Failed to start generation");

      setStatus("polling");
      const { id } = createData;

      for (let i = 0; i < 80; i++) {
        await new Promise((r) => setTimeout(r, 3000));
        const pollRes = await fetch(`/api/generate-video?id=${id}`);
        const pollData = await pollRes.json();
        if (pollData.status === "done") {
          setVideoUrl(pollData.resultUrl);
          setStatus("done");
          return;
        }
        if (pollData.status === "error") throw new Error("Sample generation failed");
      }

      throw new Error("Timed out — please try again");
    } catch (err: any) {
      setErrorMsg(err.message);
      setStatus("error");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e8e4df", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <div style={{ borderBottom: "0.5px solid #1e1b28", padding: "0 1.5rem", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none", fontSize: 15, fontWeight: 500, color: "#f0ece8" }}>
          Pulse<span style={{ color: "#9b8ecf" }}>Nexis</span>
        </Link>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link href="/singles" style={{ fontSize: 13, color: "#5a5560", textDecoration: "none" }}>Singles</Link>
          <Link href="/studio" style={{ fontSize: 13, color: "#c4a8ff", textDecoration: "none", background: "rgba(106,79,207,0.12)", padding: "6px 14px", borderRadius: 20, border: "0.5px solid #3a3245" }}>
            🎬 Full Studio
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "4rem 1.5rem 4rem" }}>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ display: "inline-block", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#9b8ecf", marginBottom: "1rem", background: "rgba(155,142,207,0.08)", padding: "6px 16px", borderRadius: 20, border: "0.5px solid #2a2535" }}>
            Free Sample · No Sign-in Required
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, color: "#f0ece8", lineHeight: 1.15, marginBottom: "0.75rem" }}>
            Try it free.<br />
            <em style={{ fontStyle: "italic", color: "#c4a8ff" }}>See your face in the music.</em>
          </h1>
          <p style={{ fontSize: 15, color: "#7a7572", lineHeight: 1.6, maxWidth: 480, margin: "0 auto" }}>
            Upload your photo, pick a PulseNexis song, and we'll create a free 10-second AI video sample. One free sample per day.
          </p>
        </div>

        {/* Step 1 — Photo */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.75rem" }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", border: "1px solid #3a3245", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#9b8ecf" }}>1</div>
            <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#5a5560" }}>Upload your photo</span>
          </div>

          {!photoPreview ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{ border: `1px dashed ${isDragging ? "#6a4fcf" : "#2a2535"}`, borderRadius: 16, padding: "2.5rem 1.5rem", textAlign: "center", cursor: "pointer", background: isDragging ? "rgba(106,79,207,0.04)" : "rgba(255,255,255,0.01)", transition: "all 0.2s", position: "relative" }}
            >
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files?.[0])} />
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(155,142,207,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", fontSize: 18 }}>📸</div>
              <p style={{ fontSize: 14, color: "#7a7572", margin: 0 }}>Tap or drag your photo here</p>
              <p style={{ fontSize: 11, color: "#3d3a40", marginTop: 4 }}>JPG or PNG · Face must be clearly visible</p>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", border: "1px solid #1e1b28", borderRadius: 16 }}>
              <img src={photoPreview} alt="Your photo" style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: "2px solid #3a3245", flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 14, color: "#c4a8ff", marginBottom: 2 }}>Photo ready ✓</p>
                <span onClick={() => { setPhoto(null); setPhotoPreview(null); }} style={{ fontSize: 12, color: "#5a5560", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3 }}>Change photo</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ height: 1, background: "#1a1720", margin: "2rem 0" }} />

        {/* Step 2 — Song */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.75rem" }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", border: "1px solid #3a3245", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#9b8ecf" }}>2</div>
            <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#5a5560" }}>Choose a song</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {SAMPLE_SONGS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSong(s.id)}
                style={{ padding: "1rem 1.25rem", border: `1px solid ${selectedSong === s.id ? "#6a4fcf" : "#1e1b28"}`, borderRadius: 12, background: selectedSong === s.id ? "rgba(106,79,207,0.08)" : "rgba(255,255,255,0.01)", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}
              >
                <div style={{ width: 6, height: 6, borderRadius: "50%", border: `1px solid ${selectedSong === s.id ? "#9b8ecf" : "#3a3245"}`, background: selectedSong === s.id ? "#9b8ecf" : "transparent", marginBottom: 8, transition: "all 0.2s" }} />
                <div style={{ fontSize: 14, color: "#c8c4d0", fontWeight: 400, marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 11, color: "#5a5560" }}>{s.vibe}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateSample}
          disabled={!isReady || status === "loading" || status === "polling"}
          style={{ width: "100%", padding: 16, marginTop: "1rem", background: isReady ? "#6a4fcf" : "#2a2535", color: "#f0ece8", border: "none", borderRadius: 12, fontSize: 15, fontFamily: "'DM Sans', sans-serif", cursor: isReady ? "pointer" : "not-allowed", opacity: status === "loading" || status === "polling" ? 0.7 : 1, transition: "all 0.2s" }}
        >
          {status === "loading" || status === "polling" ? "Generating your sample..." : "🎬 Generate Free Sample"}
        </button>

        <p style={{ textAlign: "center", fontSize: 12, color: "#3d3a40", marginTop: 8 }}>
          Free · No sign-in · 1 sample per day · 10 seconds
        </p>

        {/* Status */}
        {(status === "loading" || status === "polling") && (
          <div style={{ textAlign: "center", padding: "2rem", fontSize: 14, color: "#5a5560" }}>
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#9b8ecf", marginRight: 8, animation: "pulse 1.4s ease-in-out infinite" }} />
            {status === "loading" ? "Uploading your photo..." : "Creating your sample — takes 1–2 minutes..."}
          </div>
        )}

        {status === "error" && (
          <div style={{ marginTop: "1.5rem", padding: "1rem 1.25rem", border: "1px solid #2a2035", borderRadius: 16, background: "rgba(207,111,111,0.05)" }}>
            <p style={{ fontSize: 14, color: "#cf6f6f", marginBottom: "0.75rem" }}>{errorMsg}</p>
            <Link href="/studio" style={{ display: "inline-block", padding: "10px 20px", background: "#6a4fcf", color: "#f0ece8", textDecoration: "none", borderRadius: 50, fontSize: 13, fontWeight: 500 }}>
              🎬 Upgrade to Full Studio →
            </Link>
          </div>
        )}

        {/* Video Result */}
        {status === "done" && videoUrl && (
          <div style={{ marginTop: "2rem" }}>
            <div style={{ border: "1px solid #1e1b28", borderRadius: 16, overflow: "hidden", position: "relative" }}>
              <video controls src={videoUrl} style={{ width: "100%", display: "block" }} />
              {/* Watermark overlay */}
              <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.6)", color: "rgba(255,255,255,0.7)", fontSize: 11, padding: "4px 10px", borderRadius: 20, letterSpacing: "0.1em", textTransform: "uppercase", pointerEvents: "none" }}>
                PulseNexis Sample
              </div>
            </div>

            {/* CTA after video */}
            <div style={{ marginTop: "1.5rem", padding: "1.75rem", border: "1px solid #2a2035", borderRadius: 20, background: "rgba(106,79,207,0.05)", textAlign: "center" }}>
              <div style={{ display: "inline-block", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9b8ecf", marginBottom: "0.75rem", background: "rgba(155,142,207,0.08)", padding: "4px 12px", borderRadius: 20, border: "0.5px solid #2a2535" }}>
                Your sample is ready
              </div>
              <p style={{ fontSize: 18, fontWeight: 500, color: "#f0ece8", marginBottom: "0.5rem", fontFamily: "'Playfair Display', serif" }}>
                Love what you see?
              </p>
              <p style={{ fontSize: 14, color: "#7a7572", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                Get the full-length video with no watermark — emailed directly to you.<br />
                Plans start at just $9.99.
              </p>

              {/* Primary CTA */}
              <Link
                href="/studio#pricing"
                style={{ display: "inline-block", padding: "14px 32px", background: "#6a4fcf", color: "#f0ece8", textDecoration: "none", borderRadius: 50, fontSize: 15, fontWeight: 600, marginBottom: "1rem", letterSpacing: "0.01em" }}
              >
                🎬 View Pricing & Create Full Video
              </Link>

              {/* Pricing preview */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", margin: "1.25rem 0" }}>
                {[
                  { label: "1 Video", price: "$9.99", href: "https://buy.stripe.com/4gM8wPgaT13lc8V45f4ZG0I" },
                  { label: "3 Videos", price: "$24", href: "/api/checkout/studio?tier=pack3", popular: true },
                  { label: "10 Videos", price: "$59", href: "/api/checkout/studio?tier=pack10" },
                ].map((t) => (
                  <a
                    key={t.label}
                    href={t.href}
                    style={{ display: "block", padding: "0.875rem 0.5rem", borderRadius: 14, border: t.popular ? "1px solid #6a4fcf" : "0.5px solid #2a2535", background: t.popular ? "rgba(106,79,207,0.12)" : "rgba(255,255,255,0.02)", textDecoration: "none", textAlign: "center" }}
                  >
                    <div style={{ fontSize: 11, color: "#9b8ecf", marginBottom: "0.25rem" }}>{t.label}</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#f0ece8" }}>{t.price}</div>
                    {t.popular && <div style={{ fontSize: 9, color: "#9b8ecf", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.25rem" }}>Best value</div>}
                  </a>
                ))}
              </div>

              <Link href="/singles" style={{ fontSize: 13, color: "#5a5560", textDecoration: "none" }}>
                Browse more songs →
              </Link>
            </div>
          </div>
        )}

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
        @media (max-width: 500px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
