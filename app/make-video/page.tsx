"use client";

import dynamic from "next/dynamic";

const VideoGenerator = dynamic(() => import("@/components/VideoGenerator"), {
  ssr: false,
});

export default function MakeVideoPage() {
  return (
    <main className="min-h-screen bg-[#f3f3f3] text-black">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-[28px] bg-[#efefef] p-6 md:p-10">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">PulseNexis</h1>

            <a
              href="#create"
              className="rounded-full bg-black px-5 py-2 text-white no-underline"
            >
              Create Video
            </a>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[28px] bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 p-8 text-white shadow-xl">
              <p className="text-sm font-semibold tracking-wide text-white/80">
                PULSENEXIS AI VIDEO
              </p>

              <h2 className="mt-6 text-5xl font-semibold leading-tight">
                Turn Your Photo Into
                <br />
                <span className="text-yellow-300">an AI Music Video</span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-white/85">
                Upload a photo, choose a PulseNexis song, and create a personalized
                video powered by AI.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 text-base">
                <div>✅ Upload one photo</div>
                <div>✅ Choose a song</div>
                <div>✅ Generate in minutes</div>
                <div>✅ Replay on site</div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#create"
                  className="rounded-full bg-emerald-400 px-6 py-3 font-medium text-black no-underline"
                >
                  Create My Video
                </a>
              </div>
            </div>

            <div className="rounded-[28px] bg-zinc-900 p-4 shadow-xl">
              <div className="relative w-full" style={{ paddingTop: "177.78%" }}>
                <video
                  className="absolute inset-0 h-full w-full rounded-[24px] object-cover"
                  controls
                  playsInline
                  preload="metadata"
                >
                  <source src="/demos/Leave-it-to-Me.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="create" className="mx-auto max-w-6xl px-6 pb-16 scroll-mt-24">
        <div className="rounded-[28px] bg-[#0b0b14] p-4 md:p-6">
          <VideoGenerator />
        </div>
      </section>
    </main>
  );
}