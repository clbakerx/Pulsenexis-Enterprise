"use client";

import Image from "next/image";
import React from "react";
import { SINGLE_SONG_PRICE } from "@/lib/pricing";

type Track = {
  title: string;
  artist?: string;
  coverUrl?: string | null;
  // intentionally not using trackNo / duration anymore
  // trackNo?: number | null;
  // duration?: string | number | null;
};

export default function TrackCard({
  track,
  view = "grid",
  onPreview,
  onLicense,
}: {
  track: Track;
  view?: "grid" | "list";
  onPreview?: (track: Track) => void;
  onLicense?: (track: Track) => void;
}) {
  const isList = view === "list";

  return (
    <div
      className={[
        "rounded-2xl border border-slate-200 bg-white shadow-sm",
        "overflow-hidden p-4",
      ].join(" ")}
    >
      <div className={isList ? "flex gap-4 items-start" : ""}>
        {/* COVER */}
        <div
          className={[
            "relative rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-100",
            "flex items-center justify-center overflow-hidden",
            isList ? "w-[140px] h-[140px] shrink-0" : "w-full h-[160px]",
          ].join(" ")}
        >
          <div className="relative w-[84px] h-[84px]">
            <Image
              src={track.coverUrl || "/HoneyDrip Logo.jpg"}
              alt={track.title || "Cover"}
              fill
              className="object-contain rounded-lg"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                const img = e.currentTarget;

                // prevent infinite error loop
                img.onerror = null;
                img.src = "/HoneyDrip Logo.jpg";
              }}
            />
          </div>

          {/* Inside-cover text (keeps all covers uniform) */}
          <div className="absolute bottom-3 left-3 right-3 text-center">
            <div className="text-[11px] font-semibold tracking-wide text-amber-800">
              HONEY DRIP
            </div>
            <div className="text-[11px] font-semibold tracking-wide text-amber-800">
              RECORDS
            </div>
            <div className="text-[11px] text-orange-600 truncate">
              {track.title}
            </div>
          </div>
        </div>

        {/* INFO */}
        <div className={isList ? "flex-1" : ""}>
          <div className={isList ? "mt-0" : "mt-3"}>
            {/* fixed title height for uniform cards */}
            <div className="h-[46px]">
              <div className="text-[16px] font-semibold text-slate-900 leading-tight line-clamp-2">
                {track.title}
              </div>
            </div>

            <div className="text-[13px] text-slate-500 truncate">
              {track.artist || "PulseNexis"}
            </div>

            {/* spacer row (replaces duration row so layout stays consistent) */}
            <div className="mt-2 h-[26px]" />
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-[13px] font-medium text-slate-800 hover:bg-slate-50"
              onClick={() => onPreview?.(track)}
            >
              Preview
            </button>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-[13px] font-semibold text-white hover:bg-slate-900"
              onClick={() => onLicense?.(track)}
              aria-label={`License ${track.title} for $${SINGLE_SONG_PRICE}`}
              title={`License for $${SINGLE_SONG_PRICE}`}
            >
              License • ${SINGLE_SONG_PRICE}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
