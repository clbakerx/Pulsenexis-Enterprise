"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth, useClerk } from "@clerk/nextjs";

const BASE = "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Singles";

const SONGS = [
  { id: "48-hours", title: "48 Hours", vibe: "Moody • R&B", audioUrl: `${BASE}/48-Hours/48-Hours_Sample.mp3` },
  { id: "a-love-thats-true", title: "A Love That's True", vibe: "Romantic • R&B", audioUrl: `${BASE}/A-Love-Thats-True/A-Love-Thats-True_Sample.mp3` },
  { id: "all-in", title: "All In", vibe: "Romantic • R&B", audioUrl: `${BASE}/All-In/All-In_Sample.mp3` },
  { id: "all-of-me", title: "All Of Me", vibe: "Moody • R&B", audioUrl: `${BASE}/All-Of-Me/All-Of-Me_Sample.mp3` },
  { id: "another-moment", title: "Another Moment", vibe: "Moody • R&B", audioUrl: `${BASE}/Another-Moment/Another-Moment_Sample.mp3` },
  { id: "betrayed-again", title: "Betrayed Again", vibe: "Moody • R&B", audioUrl: `${BASE}/Betrayed-Again/Betrayed-Again_Sample.mp3` },
  { id: "boyfriend", title: "Boyfriend", vibe: "Moody • R&B", audioUrl: `${BASE}/Boyfriend/Boyfriend_Sample.mp3` },
  { id: "breaking-my-heart", title: "Breaking My Heart", vibe: "Moody • R&B", audioUrl: `${BASE}/Breaking-My-Heart/Breaking-My-Heart_Sample.mp3` },
  { id: "bring-the-snow", title: "Bring The Snow", vibe: "Moody • R&B", audioUrl: `${BASE}/Bring-The-Snow/Bring-The-Snow_Sample.mp3` },
  { id: "built-different", title: "Built Different", vibe: "Moody • R&B", audioUrl: `${BASE}/Built-Different/Built-Different_Sample.mp3` },
  { id: "cant-stay-away", title: "Can't Stay Away", vibe: "Moody • R&B", audioUrl: `${BASE}/Cant-Stay-Away/Cant-Stay-Away_Sample.mp3` },
  { id: "chances", title: "Chances", vibe: "Moody • R&B", audioUrl: `${BASE}/Chances/Chances_Sample.mp3` },
  { id: "clean-air", title: "Clean Air", vibe: "Poetic • Soul", audioUrl: `${BASE}/Clean-Air/Clean-Air_Sample.mp3` },
  { id: "closer-than-before", title: "Closer Than Before", vibe: "Romantic • R&B", audioUrl: `${BASE}/Closer-Than-Before/Closer-Than-Before_Sample.mp3` },
  { id: "crystal-ball", title: "Crystal Ball", vibe: "Poetic • Soul", audioUrl: `${BASE}/Crystal-Ball/Crystal-Ball_Sample.mp3` },
  { id: "emotionally", title: "Emotionally", vibe: "Moody • R&B", audioUrl: `${BASE}/Emotionally/Emotionally_Sample.mp3` },
  { id: "extraordinary-love", title: "Extraordinary Love", vibe: "Romantic • R&B", audioUrl: `${BASE}/Extraordinary-Love/Extraordinary-Love_Sample.mp3` },
  { id: "forward", title: "Forward", vibe: "Moody • R&B", audioUrl: `${BASE}/Forward/Forward_Sample.mp3` },
  { id: "heart-gets-in-the-way", title: "Heart Gets In The Way", vibe: "Moody • R&B", audioUrl: `${BASE}/Heart-Gets-in-the-Way/Heart-Gets-in-the-Way_Sample.mp3` },
  { id: "last-night", title: "Last Night", vibe: "Moody • R&B", audioUrl: `${BASE}/Last-Night/Last-Night_Sample.mp3` },
  { id: "made-for-this", title: "Made For This", vibe: "Romantic • R&B", audioUrl: `${BASE}/Made-for-this/Made-for-this_Sample.mp3` },
  { id: "millionaire", title: "Millionaire", vibe: "Moody • R&B", audioUrl: `${BASE}/Millionaire/Millionaire_Sample.mp3` },
  { id: "movie-of-the-year", title: "Movie Of The Year", vibe: "Moody • R&B", audioUrl: `${BASE}/Movie-Of-The-Year/Movie-Of-The-Year_Sample.mp3` },
  { id: "never-again", title: "Never Again", vibe: "Moody • R&B", audioUrl: `${BASE}/Never-Again/Never-Again_Sample.mp3` },
  { id: "no-distance-between-us", title: "No Distance Between Us", vibe: "Romantic • R&B", audioUrl: `${BASE}/No-Distance-Between-Us_V2/No-Distance-Between-Us_V2_Sample.mp3` },
  { id: "no-doubt", title: "No Doubt", vibe: "Moody • R&B", audioUrl: `${BASE}/No-Doubt/No-Doubt_Sample.mp3` },
  { id: "no-halfway-love", title: "No Halfway Love", vibe: "Moody • R&B", audioUrl: `${BASE}/No-Halfway-Love/No-Halfway-Love_Sample.mp3` },
  { id: "no-way-you-win", title: "No Way You Win", vibe: "Moody • R&B", audioUrl: `${BASE}/No-Way-You-Win/No-Way-You-Win_Sample.mp3` },
  { id: "not-just-for-tonight", title: "Not Just For Tonight", vibe: "Moody • R&B", audioUrl: `${BASE}/Not-Just-For-Tonight/Not-Just-For-Tonight_Sample.mp3` },
  { id: "nothing-falls-through", title: "Nothing Falls Through", vibe: "Moody • R&B", audioUrl: `${BASE}/Nothing-Falls-Through/Nothing-Falls-Through_Sample.mp3` },
  { id: "one-love", title: "One Love", vibe: "Romantic • R&B", audioUrl: `${BASE}/One-Love/One-Love_Sample.mp3` },
  { id: "paid-the-price", title: "Paid The Price", vibe: "Moody • R&B", audioUrl: `${BASE}/Paid-the-Price/Paid-the-Price_Sample.mp3` },
  { id: "perfect-choice", title: "Perfect Choice", vibe: "Romantic • R&B", audioUrl: `${BASE}/Perfect-Choice/Perfect-Choice_Sample.mp3` },
  { id: "release-me", title: "Release Me", vibe: "Moody • R&B", audioUrl: `${BASE}/Release-Me/Release-Me_Sample.mp3` },
  { id: "right-here-with-you", title: "Right Here With You", vibe: "Romantic • R&B", audioUrl: `${BASE}/Right-Here-With-You/Right-Here-With-You_Sample.mp3` },
  { id: "right-in-the-middle", title: "Right In The Middle", vibe: "Moody • R&B", audioUrl: `${BASE}/Right-in-the-Middle/Right-in-the-Middle_Sample.mp3` },
  { id: "say-it-right", title: "Say It Right", vibe: "Moody • R&B", audioUrl: `${BASE}/Say-It-Right/Say-It-Right_Sample.mp3` },
  { id: "sensational", title: "Sensational", vibe: "Romantic • R&B", audioUrl: `${BASE}/Sensational/Sensational_Sample.mp3` },
  { id: "slow-motion-love", title: "Slow Motion Love", vibe: "Romantic • R&B", audioUrl: `${BASE}/Slow-Motion-Love/Slow-Motion-Love_Sample.mp3` },
  { id: "soapbox-attention", title: "Soapbox Attention", vibe: "Moody • R&B", audioUrl: `${BASE}/Soapbox-Attention/Soapbox-Attention_Sample.mp3` },
  { id: "teach-me-to-love", title: "Teach Me To Love", vibe: "Romantic • R&B", audioUrl: `${BASE}/Teach-Me-To-Love/Teach-Me-To-Love_Sample.mp3` },
  { id: "tell-me-you-love-me-again", title: "Tell Me You Love Me Again", vibe: "Romantic • R&B", audioUrl: `${BASE}/Tell-Me-You-Love-Me-Again/Tell-Me-You-Love-Me-Again_Sample.mp3` },
  { id: "the-only-way-i-be", title: "The Only Way I Be", vibe: "Poetic • Soul", audioUrl: `${BASE}/The-Only-Way-I-Be/The-Only-Way-I-Be_Sample.mp3` },
  { id: "this-love-aint-temporary", title: "This Love Ain't Temporary", vibe: "Moody • R&B", audioUrl: `${BASE}/This-Love-Aint-Temporary/This-Love-Aint-Temporary_Sample.mp3` },
  { id: "this-love-is-relevant", title: "This Love Is Relevant", vibe: "Moody • R&B", audioUrl: `${BASE}/This-Love-Is-Relevant/This-Love-Is-Relevant_Sample.mp3` },
  { id: "under-the-moonlight", title: "Under The Moonlight", vibe: "Romantic • R&B", audioUrl: `${BASE}/Under-the-Moonlight/Under-the-Moonlight_Sample.mp3` },
  { id: "where-do-we-go-tonight", title: "Where Do We Go Tonight", vibe: "Moody • R&B", audioUrl: `${BASE}/Where-Do-We-Go-Tonight/Where-Do-We-Go-Tonight_Sample.mp3` },
  { id: "where-im-going", title: "Where I'm Going", vibe: "Poetic • Soul", audioUrl: `${BASE}/Where-Im-Going/Where-Im-Going_Sample.mp3` },
  { id: "where-we-need-to-be", title: "Where We Need To Be", vibe: "Moody • R&B", audioUrl: `${BASE}/Where-We-Need-To-Be/Where-We-Need-To-Be_Sample.mp3` },
  { id: "winter-white", title: "Winter White", vibe: "Poetic • Soul", audioUrl: `${BASE}/Winter-White/Winter-White_Sample.mp3` },
  { id: "wouldnt-want-to", title: "Wouldn't Want To", vibe: "Moody • R&B", audioUrl: `${BASE}/Wouldnt-Want-To/Wouldnt-Want-To_Sample.mp3` },
];

export default function VideoGenerator() {
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();

  const [file, setFile] = useState(null);
  const [selectedSongId, setSelectedSongId] = useState("");
  const [status, setStatus] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [pendingGenerate, setPendingGenerate] = useState(false);
  const [creditsStillPending, setCreditsStillPending] = useState(false);
  const [pollCount, setPollCount] = useState(0);

  const handleGenerateRef = useRef(null);

  // ─── Fetch credits when signed in ────────────────────────────────────────
  useEffect(() => {
    if (!isSignedIn) {
      setCredits(null);
      return;
    }
    fetch("/api/studio/credits")
      .then((r) => r.json())
      .then((d) => setCredits(d.credits ?? 0))
      .catch(() => setCredits(0));
  }, [isSignedIn]);

  // ─── Read URL params on load ──────────────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const songParam = params.get("song");
    if (songParam) {
      const match = SONGS.find((s) => s.id === songParam);
      if (match) setSelectedSongId(match.id);
    }

    if (params.get("purchased") === "true") {
      setPurchaseSuccess(true);

      // Clean the URL immediately
      const url = new URL(window.location.href);
      url.searchParams.delete("purchased");
      window.history.replaceState({}, "", url.toString());

      // Check once immediately — webhook may have already fired
      fetch("/api/studio/credits")
        .then((r) => r.json())
        .then((d) => {
          const incoming = d.credits ?? 0;
          if (incoming > 0) {
            setCredits(incoming);
            return; // Done — no polling needed
          }

          // Not ready yet — poll every 5s for up to 5 minutes (60 attempts)
          let attempts = 0;
          const maxAttempts = 60;

          const poll = setInterval(() => {
            attempts++;
            setPollCount(attempts);

            fetch("/api/studio/credits")
              .then((r) => r.json())
              .then((d) => {
                const c = d.credits ?? 0;
                if (c > 0) {
                  setCredits(c);
                  setCreditsStillPending(false);
                  clearInterval(poll);
                }
              })
              .catch(() => {});

            if (attempts >= maxAttempts) {
              clearInterval(poll);
              setCreditsStillPending(true);
            }
          }, 5000);

          return () => clearInterval(poll);
        })
        .catch(() => {});
    }
  }, []);

  // ─── After sign-in: restore saved selections + auto-trigger generation ────
  useEffect(() => {
    if (!isSignedIn || loading) return;

    const savedSongId = sessionStorage.getItem("pendingSongId");
    if (savedSongId) {
      setSelectedSongId(savedSongId);
      sessionStorage.removeItem("pendingSongId");
    }

    const savedImageData = sessionStorage.getItem("pendingImageData");
    const savedImageName = sessionStorage.getItem("pendingImageName");
    if (savedImageData && savedImageName) {
      fetch(savedImageData)
        .then((r) => r.blob())
        .then((blob) => {
          const restored = new File([blob], savedImageName, { type: blob.type });
          setFile(restored);
          sessionStorage.removeItem("pendingImageData");
          sessionStorage.removeItem("pendingImageName");
        })
        .catch(() => {
          sessionStorage.removeItem("pendingImageData");
          sessionStorage.removeItem("pendingImageName");
        });
    }

    const pending =
      pendingGenerate || sessionStorage.getItem("pendingGenerate") === "true";
    if (pending) {
      sessionStorage.removeItem("pendingGenerate");
      setPendingGenerate(false);
      setTimeout(() => {
        handleGenerateRef.current?.();
      }, 300);
    }
  }, [isSignedIn]);

  // ─── Core generation function ─────────────────────────────────────────────
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

    // Not signed in — save everything and open sign-in modal (no redirect)
    if (!isSignedIn) {
      sessionStorage.setItem("pendingSongId", selectedSongId);
      sessionStorage.setItem("pendingGenerate", "true");
      setPendingGenerate(true);

      const reader = new FileReader();
      reader.onload = () => {
        try {
          sessionStorage.setItem("pendingImageData", reader.result);
          sessionStorage.setItem("pendingImageName", file.name);
        } catch {
          // sessionStorage quota exceeded for large images — song still saved
        }
      };
      reader.readAsDataURL(file);

      openSignIn({
        routing: "hash",
        afterSignInUrl: window.location.href,
        afterSignUpUrl: window.location.href,
      });
      return;
    }

    // No credits — go to checkout
    if (credits === 0) {
      window.location.href = "/studio/checkout";
      return;
    }

    // Generate the video
    try {
      setLoading(true);
      setStatus("Creating your video...");
      setVideoUrl("");

      const imageBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Failed to read uploaded file."));
        reader.readAsDataURL(file);
      });

      const createRes = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64,
          audioUrl: song.audioUrl,
        }),
      });

      const createData = await createRes.json();

      if (!createRes.ok) {
        throw new Error(createData.error || "Failed to start video generation.");
      }

      const videoId = createData.id;
      let finalVideoUrl = "";

      for (let i = 0; i < 150; i++) {
        await new Promise((resolve) => setTimeout(resolve, 5000));

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

        const elapsed = Math.round(((i + 1) * 5) / 60);
        setStatus(`Rendering video... (~${elapsed} min elapsed)`);
      }

      if (!finalVideoUrl) {
        throw new Error("Video generation timed out after 12 minutes.");
      }

      const completeRes = await fetch("/api/studio/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          songId: song.id,
          songTitle: song.title,
          videoUrl: finalVideoUrl,
        }),
      });

      const completeData = await completeRes.json();

      if (completeRes.ok) {
        setCredits(completeData.creditsRemaining ?? 0);
      }

      setVideoUrl(finalVideoUrl);
      setStatus("Your video is ready.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      setStatus(message);
    } finally {
      setLoading(false);
    }
  }

  handleGenerateRef.current = handleGenerate;

  const manualRefresh = () => {
    fetch("/api/studio/credits")
      .then((r) => r.json())
      .then((d) => {
        if ((d.credits ?? 0) > 0) {
          setCredits(d.credits);
          setCreditsStillPending(false);
        }
      });
  };

  const buttonLabel = () => {
    if (loading) return "Generating...";
    if (!isSignedIn) return "Sign in to Generate";
    if (credits === null) return "Loading...";
    if (purchaseSuccess && credits === 0 && !creditsStillPending) return "Waiting for credits...";
    if (credits === 0) return "Buy Credits to Generate";
    return "Generate My Video";
  };

  const isButtonDisabled =
    loading || (purchaseSuccess && credits === 0 && !creditsStillPending);

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
          Upload a photo and we'll create a personalized music video with your
          face powered by AI.
        </p>

        {/* Payment received — waiting for webhook */}
        {purchaseSuccess && credits === 0 && !creditsStillPending && (
          <div className="mt-4 rounded-2xl border border-violet-500/30 bg-violet-500/10 px-4 py-3 text-sm text-violet-300">
            Payment received! Applying your credits
            {pollCount > 0 ? ` (${Math.round(pollCount * 5)}s)` : ""}...
          </div>
        )}

        {/* Credits landed successfully */}
        {purchaseSuccess && credits !== null && credits > 0 && (
          <div className="mt-4 rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
            Credits added! You're ready to generate your video.
          </div>
        )}

        {/* Credits taking too long */}
        {creditsStillPending && (
          <div className="mt-4 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300">
            Credits are taking longer than expected.{" "}
            <button
              className="underline underline-offset-2 hover:text-yellow-200"
              onClick={manualRefresh}
            >
              Tap to refresh
            </button>{" "}
            or{" "}
            <a
              href="/support"
              className="underline underline-offset-2 hover:text-yellow-200"
            >
              contact support
            </a>
            .
          </div>
        )}

        {isSignedIn && credits !== null && (
          <div className="mt-4 text-sm text-white/40">
            Credits remaining:{" "}
            <span className="font-semibold text-white/70">{credits}</span>
            {credits === 0 && !purchaseSuccess && (
              <a
                href="/studio/checkout"
                className="ml-2 text-violet-400 underline underline-offset-2 hover:text-violet-300"
              >
                Buy more →
              </a>
            )}
            {credits > 0 && (
              <a
                href="/studio/videos"
                className="ml-4 text-violet-400 underline underline-offset-2 hover:text-violet-300"
              >
                View my videos →
              </a>
            )}
          </div>
        )}

        <div className="mt-8 space-y-8">
          {/* Step 1: Upload photo */}
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

          {/* Step 2: Choose a song */}
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
                    <div className="mt-1 text-sm text-white/50">{song.vibe}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Generate */}
          <div>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isButtonDisabled}
              className="w-full rounded-2xl bg-violet-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {buttonLabel()}
            </button>

            <p className="mt-3 text-center text-sm text-white/40">
              Need video credits?{" "}
              <a
                href="/studio/checkout"
                className="text-violet-400 underline underline-offset-2 hover:text-violet-300"
              >
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
