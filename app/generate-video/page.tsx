"use client";
import { useState } from "react";

export default function GenerateVideoPage() {
  const [audio, setAudio] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!audio || !image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("audio", audio);
    formData.append("image", image);

    const res = await fetch("/api/generate-video", {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();
    setVideoUrl(URL.createObjectURL(blob));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold">🎬 AI Singer Video Generator</h1>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <label className="text-sm text-gray-400">Upload Audio (MP3/WAV)</label>
        <input type="file" accept="audio/*" onChange={(e) => setAudio(e.target.files?.[0] || null)} className="bg-gray-800 p-2 rounded"/>
        <label className="text-sm text-gray-400">Upload Singer Image (JPG/PNG)</label>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} className="bg-gray-800 p-2 rounded"/>
        <button onClick={handleGenerate} disabled={loading || !audio || !image}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 py-3 rounded-lg font-bold text-lg">
          {loading ? "⏳ Generating... (1-2 mins)" : "✨ Generate Video"}
        </button>
      </div>
      {videoUrl && (
        <div className="flex flex-col items-center gap-4">
          <video src={videoUrl} controls className="rounded-xl max-w-md w-full"/>
          <a href={videoUrl} download="singer-video.mp4" className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-bold">
            ⬇️ Download Video
          </a>
        </div>
      )}
    </div>
  );
}
