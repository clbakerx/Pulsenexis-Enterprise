"use client";

import { useState, useEffect } from "react";
import { useAuth, useClerk } from "@clerk/nextjs";

const SONGS = [
  { id: "someone-elses-man", title: "Someone Else's Man", vibe: "Moody • R&B", audioUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Video-Generator/Somebody%20Else%E2%80%99s%20Man_clip.mp3" },
  { id: "the-only-way-i-be", title: "The Only Way I Be", vibe: "Poetic • Soul", audioUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Video-Generator/The%20Only%20Way%20I%20Be_clip.mp3" },
  { id: "home-many-love-songs", title: "Home Many Love Songs", vibe: "Moody • R&B", audioUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Video-Generator/Home%20Many%20Love%20Songs_clip.mp3" },
  { id: "all-in", title: "All In", vibe: "Romantic • R&B", audioUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Video-Generator/Made%20for%20this_clip.mp3" },
  { id: "crystal-ball", title: "Crystal Ball", vibe: "Poetic • Soul", audioUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Video-Generator/Crystal%20Ball_clip.mp3" },
  { id: "movie of the year", title: "Movie of the Year", vibe: "Moody • R&B", audioUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Video-Generator/Movie%20of%20the%20Year_clip.mp3" },
  { id: "no-way-you-win", title: "No Way You Win", vibe: "Moody • R&B", audioUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Video-Generator/Somebody%20Else%E2%80%99s%20Man_clip.mp3" },
  { id: "boyfriend", title: "Boyfriend", vibe: "Moody • R&B", audioUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Video-Generator/Somebody%20Else%E2%80%99s%20Man_clip.mp3" },
  { id: "where-we-need-to-be", title: "Where We Need To Be", vibe: "Moody • R&B", audioUrl: " https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Singles/Where-We-Need-To-Be/Where%20We%20Need%20to%20Be_Sample.mp3” },
  { id: "too-late", title: "Too Late", vibe: "Moody • R&B", audioUrl: "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Video-Generator/Somebody%20Else%E2%80%99s%20Man_clip.mp3" },
];

export default function VideoGenerator() {
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();

  const [file, setFile] = useState(null);
  const [selectedSongId, setSelectedSongId] = useState("");
  const [status, setStatus] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState(null); // null = not yet fetched
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [pendingGenerate, setPendingGenerate] = useState(false);
  const [creditsStillPending, setCreditsStillPending] = useState(false);

  // Fetch credits whenever the user signs in
  useEffect(() => {
    if (!isSignedIn) { setCredits(null); return; }
    fetch("/api/studio/credits")
      .then((r) => r.json())
      .then((d) => setCredits(d.credits ?? 0))
      .catch(() => setCredits(0));
  }, [isSignedIn]);

  // Auto-generate after sign-in if the user had clicked Generate while logged out
  useEffect(() => {
    if (isSignedIn && pendingGenerate && !loading) {
      setPendingGenerate(false);
      handleGenerate();
    }
  }, [isSignedIn, pendingGenerate]);

  // Handle ?purchased=true redirect from Stripe
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("purchased") === "true") {
      setPurchaseSuccess(true);
      const url = new URL(window.location.href);
      url.searchParams.delete("purchased");
      window.history.replaceState({}, "", url.toString());
      // Re-fetch credits (webhook may take a moment)
      const poll = setInterval(() => {
        fetch("/api/studio/credits")
          .then((r) => r.json())
          .then((d) => {
            if ((d.credits ?? 0) > 0) {
              setCredits(d.credits);
              setCreditsStillPending(false);
              clearInterval(poll);
            }
          });
      }, 3000);
      setTimeout(() => {
        clearInterval(poll);
        // If credits still haven't appeared, show a manual refresh prompt
        setCredits((c) => {
          if ((c ?? 0) === 0) setCreditsStillPending(true);
          return c;
        });
      }, 90000); // 90s timeout
    }
  }, []);

  async function handleGenerate() {
    if (!file) { setStatus("Please upload a photo."); return; }
    if (!selectedSongId) { setStatus("Please choose a song."); return; }

    const song = SONGS.find((s) => s.id === selectedSongId);
    if (!song) { setStatus("Selected song not found."); return; }

    // Auth gate
    if (!isSignedIn) {
      setPendingGenerate(true);
      openSignIn({ redirectUrl: "/studio" });
      return;
    }

    // Credits gate
    if (credits === 0) {
      window.location.href = "/studio/checkout";
      return;
    }

    try {
      setLoading(true);
      setStatus("Creating your video...");
      setVideoUrl("");

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
      if (!createRes.ok) throw new Error(createData.error || "Failed to start video generation.");

      const videoId = createData.id;
      let finalVideoUrl = "";

      for (let i = 0; i < 150; i++) {
        await new Promise((resolve) => setTimeout(resolve, 5000));

        const pollRes = await fetch(`/api/generate-video?id=${videoId}`, { cache: "no-store" });
        const pollData = await pollRes.json();

        if (!pollRes.ok) throw new Error(pollData.error || "Failed while checking video status.");
        if (pollData.status === "done" && pollData.resultUrl) { finalVideoUrl = pollData.resultUrl; break; }
        if (pollData.status === "error") throw new Error("Video generation failed.");

        const elapsed = Math.round(((i + 1) * 5) / 60);
        setStatus(`Rendering video... (~${elapsed} min elapsed)`);
      }

      if (!finalVideoUrl) throw new Error("Video generation timed out after 12 minutes.");

      // Save video + decrement credit
      const completeRes = await fetch("/api/studio/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songId: song.id, songTitle: song.title, videoUrl: finalVideoUrl }),
      });
      const completeData = await completeRes.json();
      if (completeRes.ok) setCredits(completeData.creditsRemaining ?? 0);

      setVideoUrl(finalVideoUrl);
      setStatus("Your video is ready.");
    } catch (error) {
      setStatus(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const buttonLabel = () => {
    if (loading) return "Generating...";
    if (!isSignedIn) return "Sign in to Generate";
    if (credits === 0) return "Buy Credits to Generate";
    return "Generate My Video";
  };

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
          Upload a photo and we'll create a personalized music video with your face powered by AI.
        </p>

        {purchaseSuccess && !creditsStillPending && (
          <div className="mt-4 rounded-2xl border border-violet-500/30 bg-violet-500/10 px-4 py-3 text-sm text-violet-300">
            Payment received! Your credits are being applied — this takes just a moment.
          </div>
        )}

        {creditsStillPending && (
          <div className="mt-4 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300">
            Credits are taking longer than expected.{" "}
            <button
              className="underline underline-offset-2 hover:text-yellow-200"
              onClick={() =>
                fetch("/api/studio/credits")
                  .then((r) => r.json())
                  .then((d) => {
                    if ((d.credits ?? 0) > 0) {
                      setCredits(d.credits);
                      setCreditsStillPending(false);
                    }
                  })
              }
            >
              Tap to refresh
            </button>{" "}
            or{" "}
            <a href="/support" className="underline underline-offset-2 hover:text-yellow-200">
              contact support
            </a>
            .
          </div>
        )}

        {isSignedIn && credits !== null && (
          <div className="mt-4 text-sm text-white/40">
            Credits remaining: <span className="font-semibold text-white/70">{credits}</span>
            {credits === 0 && (
              <a href="/studio/checkout" className="ml-2 text-violet-400 underline underline-offset-2 hover:text-violet-300">
                Buy more →
              </a>
            )}
            {credits > 0 && (
              <a href="/studio/videos" className="ml-4 text-violet-400 underline underline-offset-2 hover:text-violet-300">
                View my videos →
              </a>
            )}
          </div>
        )}

        <div className="mt-8 space-y-8">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-[11px]">1</span>
              Upload your photo
            </div>
            <label className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.02] px-6 text-center transition hover:bg-white/[0.04]">
              <div className="mb-3 text-2xl">📸</div>
              <div className="text-base font-medium">{file ? file.name : "Tap or drag a photo here"}</div>
              <div className="mt-2 text-sm text-white/40">JPG or PNG · Face must be clearly visible</div>
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
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-[11px]">2</span>
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
                      active ? "border-violet-400 bg-violet-500/10" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="text-base font-medium">{song.title}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="w-full rounded-2xl bg-violet-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {buttonLabel()}
            </button>
            <p className="mt-3 text-center text-sm text-white/40">
              Need video credits?{" "}
              <a href="/studio/checkout" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
                Purchase here →
              </a>
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
