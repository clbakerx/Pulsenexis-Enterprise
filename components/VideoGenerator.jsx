"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "pn_studio_unlocked";

const SONGS = [
  { id: "someone-elses-man", title: "Someone Else's Man", vibe: "Moody • R&B", audioUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Video-Generator/Somebody%20Else%E2%80%99s%20Man_clip.mp3" },
  { id: "the-only-way-i-be", title: "The Only Way I Be", vibe: "Poetic • Soul", audioUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Video-Generator/The%20Only%20Way%20I%20Be_clip.mp3" },
  { id: "home-many-love-songs", title: "Home Many Love Songs", vibe: "Moody • R&B", audioUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Video-Generator/Home%20Many%20Love%20Songs_clip.mp3" },
  { id: "all-in", title: "All In", vibe: "Romantic • R&B", audioUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Video-Generator/Made%20for%20this_clip.mp3" },
  { id: "crystal-ball", title: "Crystal Ball", vibe: "Poetic • Soul", audioUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Video-Generator/Crystal%20Ball_clip.mp3" },
  { id: "movie of the year", title: "Movie of the Year", vibe: "Moody • R&B", audioUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Video-Generator/Movie%20of%20the%20Year_clip.mp3" },
];

export default function VideoGenerator() {
  const [file, setFile] = useState(null);
  const [selectedSongId, setSelectedSongId] = useState("");
  const [status, setStatus] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromStripe = params.get("purchased") === "true";
    const stored = localStorage.getItem(STORAGE_KEY) === "true";

    if (fromStripe) {
      localStorage.setItem(STORAGE_KEY, "true");
      setUnlocked(true);
      // Clean up the URL param without a page reload
      const url = new URL(window.location.href);
      url.searchParams.delete("purchased");
      window.history.replaceState({}, "", url.toString());
    } else if (stored) {
      setUnlocked(true);
    }
  }, []);

  async function handleGenerate() {
    if (!file) {
      setStatus("Please upload a photo.");
      return;
    }

    if (!selectedSongId) {
      setStatus("Please choose a song.");
      return;
    }

    const song = SONGS.find((s) => s.id === selectedSongId);
    if (!song) {
      setStatus("Selected song not found.");
      return;
    }

    try {
      setLoading(true);
      setStatus("Creating your video...");
      setVideoUrl("");

      // Convert file to base64 as the API expects
      const imageBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const createRes = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64, audioUrl: song.audioUrl }),
      });

      const createData = await createRes.json();

      if (!createRes.ok) {
        throw new Error(createData.error || "Failed to start video generation.");
      }

      const videoId = createData.id;

      let finalVideoUrl = "";
      for (let i = 0; i < 80; i++) {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const pollRes = await fetch(`/api/generate-video?id=${videoId}`, {
          cache: "no-store",
        });

        const pollData = await pollRes.json();

        if (!pollRes.ok) {
          throw new Error(pollData.error || "Failed while checking video status.");
        }

        if (pollData.status === "done" && pollData.resultUrl) {
          finalVideoUrl = pollData.resultUrl;
          break;
        }

        if (pollData.status === "error") {
          throw new Error("Video generation failed.");
        }

        setStatus(`Rendering video... (${i + 1})`);
      }

      if (!finalVideoUrl) {
        throw new Error("Video generation timed out.");
      }

      setVideoUrl(finalVideoUrl);
      setStatus("Your video is ready.");
    } catch (error) {
      setStatus(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[28px] border border-white/10 bg-[#0b0b14] p-6 text-white md:p-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-violet-300">
          PulseNexis • Personalized Experience
        </p>

        <h2 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">
          Your face.
          <br />
          <span className="text-violet-300">My songs.</span>
        </h2>

        <p className="mt-4 text-base text-white/70">
          Upload a photo and we’ll create a personalized music video with your face powered by AI.
        </p>

        <div className="mt-8 space-y-8">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-[11px]">
                1
              </span>
              Upload your photo
            </div>

            <label className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.02] px-6 text-center transition hover:bg-white/[0.04]">
              <div className="mb-3 text-2xl">📸</div>
              <div className="text-base font-medium">
                {file ? file.name : "Tap or drag a photo here"}
              </div>
              <div className="mt-2 text-sm text-white/40">
                JPG or PNG · Face must be clearly visible
              </div>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-[11px]">
                2
              </span>
              Choose a song
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {SONGS.map((song) => {
                const active = selectedSongId === song.id;

                return (
                  <button
                    key={song.id}
                    type="button"
                    onClick={() => setSelectedSongId(song.id)}
                    className={`rounded-2xl border px-5 py-5 text-left transition ${
                      active
                        ? "border-violet-400 bg-violet-500/10"
                        : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="text-base font-medium">{song.title}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            {unlocked ? (
              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading}
                className="w-full rounded-2xl bg-violet-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Generating..." : "Generate My Video"}
              </button>
            ) : (
              <a
                href="/studio/checkout"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-6 py-4 text-base font-semibold text-white/50 cursor-not-allowed select-none"
                onClick={(e) => e.preventDefault()}
              >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
                Generate My Video
              </a>
            )}
            <p className="mt-3 text-center text-sm text-white/40">
              {unlocked ? (
                <>
                  Need more credits?{" "}
                  <a href="/studio/checkout" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
                    Purchase here →
                  </a>
                </>
              ) : (
                <>
                  Purchase credits to unlock video generation.{" "}
                  <a href="/studio/checkout" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
                    Buy credits →
                  </a>
                </>
              )}
            </p>
          </div>

          {status ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70">
              {status}
            </div>
          ) : null}

          {videoUrl ? (
            <div className="space-y-3">
              <div className="text-sm font-medium text-white/80">Preview</div>
              <video
                className="w-full rounded-3xl border border-white/10 bg-black"
                controls
                controlsList="nodownload"
                playsInline
                preload="metadata"
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}