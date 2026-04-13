"use client";

import { useState } from "react";

const SONGS = [
  { id: "someone-elses-man", title: "Someone Else's Man" },
  { id: "the-only-way-i-be", title: "The Only Way I Be" },
];

export default function VideoGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [selectedSongId, setSelectedSongId] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!file) {
      setStatus("Please upload a photo.");
      return;
    }

    if (!selectedSongId) {
      setStatus("Please choose a song.");
      return;
    }

    try {
      setLoading(true);
      setStatus("Creating your video...");
      setVideoUrl("");

      const formData = new FormData();
      formData.append("photo", file);
      formData.append("songId", selectedSongId);

      const createRes = await fetch("/api/generate-video", {
        method: "POST",
        body: formData,
      });

      const createData = await createRes.json();

      if (!createRes.ok) {
        throw new Error(createData.error || "Failed to start video generation.");
      }

      const videoId = createData.videoId;

      let finalVideoUrl = "";
      for (let i = 0; i < 40; i++) {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const pollRes = await fetch(`/api/generate-video?videoId=${videoId}`, {
          cache: "no-store",
        });

        const pollData = await pollRes.json();

        if (!pollRes.ok) {
          throw new Error(pollData.error || "Failed while checking video status.");
        }

        if (pollData.status === "completed" && pollData.videoUrl) {
          finalVideoUrl = pollData.videoUrl;
          break;
        }

        if (pollData.status === "failed" || pollData.status === "error") {
          throw new Error("Video generation failed.");
        }

        setStatus(`Rendering video... (${i + 1})`);
      }

      if (!finalVideoUrl) {
        throw new Error("Video generation timed out.");
      }

      setVideoUrl(finalVideoUrl);
      setStatus("Your video is ready.");
    } catch (error: any) {
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
          Upload a photo and we’ll create a personalized music video with your
          face powered by AI.
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
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="w-full rounded-2xl bg-violet-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate My Video"}
            </button>
          </div>

          {status ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70">
              {status}
            </div>
          ) : null}

          {videoUrl ? (
            <div className="space-y-3">
              <div className="text-sm font-medium text-white/80">
                Preview
              </div>
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