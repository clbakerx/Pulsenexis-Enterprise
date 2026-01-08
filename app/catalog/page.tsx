"use client";

import * as React from "react";
import Image from "next/image";

type ViewMode = "grid" | "list";

// ✅ Put your FileDN folder base here (must end with a slash)
const AUDIO_BASE_URL = "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/";

type Track = {
  id: number;
  title: string;
  artist: string;
  streamPath: string; // ex: "/A Crazy Ride.mp3" or "A Crazy Ride.mp3"
  genre: string[];
  mood: string[];
  duration?: string | null;
  album?: string;
  year?: number;
};

const ALL_GENRES = ["R&B", "Pop", "Dance", "Rap"];
const ALL_MOODS = ["Romantic", "Smooth", "Warm", "Energetic", "Chill"];

function classNames(...c: Array<string | false | undefined | null>) {
  return c.filter(Boolean).join(" ");
}

function normalizeTag(s: string) {
  const t = (s || "").trim();
  if (!t) return t;
  if (t.toLowerCase() === "r&b") return "R&B";
  return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}

function categorizeTrack(title: string): { genre: string[]; mood: string[] } {
  const titleLower = title.toLowerCase();
  const genres: string[] = [];
  const moods: string[] = [];

  // Rap cues
  if (
    /\brap\b/.test(titleLower) ||
    /\bbars?\b/.test(titleLower) ||
    /\bflow\b/.test(titleLower) ||
    /\bfreestyle\b/.test(titleLower) ||
    /\btrap\b/.test(titleLower) ||
    /\bmic\b/.test(titleLower) ||
    /\bspit(?:tin[g']?)?\b/.test(titleLower) ||
    /\bcypher\b/.test(titleLower)
  ) {
    genres.push("Rap");
    moods.push("Energetic");
  }

  // R&B cues
  if (
    titleLower.includes("love") ||
    titleLower.includes("heart") ||
    titleLower.includes("baby") ||
    titleLower.includes("you")
  ) {
    if (!genres.includes("Rap")) genres.push("R&B");
    moods.push("Romantic");
  }

  // Dance/Pop cues
  if (
    titleLower.includes("dance") ||
    titleLower.includes("move") ||
    titleLower.includes("fire") ||
    titleLower.includes("ignite")
  ) {
    if (!genres.includes("Rap")) genres.push("Dance");
    moods.push("Energetic");
  }

  if (titleLower.includes("crazy") || titleLower.includes("wild") || titleLower.includes("party")) {
    if (!genres.includes("Rap")) genres.push("Pop");
    moods.push("Energetic");
  }

  // Chill cue
  if (titleLower.includes("chill") || titleLower.includes("relax") || titleLower.includes("smooth")) {
    moods.push("Chill");
  }

  if (genres.length === 0) genres.push("R&B");
  if (moods.length === 0) moods.push("Smooth");

  return { genre: genres, mood: moods };
}

function toAudioUrl(streamPath: string) {
  const raw = (streamPath || "").trim();
  const cleaned = raw.startsWith("/") ? raw.slice(1) : raw;
  // encode only the filename part (spaces, etc). Keep slashes if any.
  const parts = cleaned.split("/").map((p) => encodeURIComponent(p));
  return `${AUDIO_BASE_URL}${parts.join("/")}`;
}

/**
 * ✅ Cover component lives INSIDE this file.
 * This guarantees spacing + text sizes are identical on every card.
 */
function Cover({ title }: { title: string }) {
  return (
    <div className="aspect-square w-full rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="relative mb-3 flex-shrink-0">
          <Image
            src="/HoneyDrip Logo.jpg"
            alt="HoneyDrip Records"
            width={64}
            height={64}
            className="w-16 h-16 object-contain rounded-lg"
            onError={() => {
              // next/image doesn't reliably expose the underlying img for DOM edits;
              // keep it simple: if the file is missing, the build is still fine.
            }}
          />
        </div>

        <div className="text-center mb-2">
          <div className="text-[11px] font-bold text-amber-800 tracking-wider leading-tight">
            HONEY DRIP
            <br />
            RECORDS
          </div>
        </div>

        <div className="text-center w-full">
          <div className="text-xs text-amber-600 font-medium line-clamp-2 leading-tight">{title}</div>
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/**
 * ✅ Simple license modal placeholder (NO Stripe/env vars required).
 * We’ll wire real Stripe links later.
 */
function LicenseModal({
  open,
  onClose,
  track,
}: {
  open: boolean;
  onClose: () => void;
  track: Pick<Track, "title" | "artist"> | null;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white border shadow-xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-lg font-semibold text-slate-900 truncate">{track?.title ?? "License"}</div>
            <div className="text-sm text-slate-600 truncate">{track?.artist ?? "PulseNexis"}</div>
          </div>
          <button onClick={onClose} className="rounded-xl border px-3 py-1 text-sm hover:bg-slate-50">
            Close
          </button>
        </div>

        <div className="mt-4 grid gap-3">
          <div className="rounded-xl border p-3">
            <div className="font-semibold text-slate-900">Creator License</div>
            <div className="text-sm text-slate-600">For YouTube, social, podcasts, indie creators.</div>
            <button className="mt-2 rounded-xl bg-black text-white px-4 py-2 text-sm font-medium">
              Coming next (Stripe link)
            </button>
          </div>

          <div className="rounded-xl border p-3">
            <div className="font-semibold text-slate-900">Business License</div>
            <div className="text-sm text-slate-600">For brands, ads, commercial use.</div>
            <button className="mt-2 rounded-xl bg-black text-white px-4 py-2 text-sm font-medium">
              Coming next (Stripe link)
            </button>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          We’ll connect these buttons to Stripe Checkout URLs once everything is stable.
        </p>
      </div>
    </div>
  );
}

// ---------- Manifest parsing (clean + type-safe) ----------
type RawTrack = {
  title?: unknown;
  artist?: unknown;
  streamPath?: unknown;
  path?: unknown;
  genre?: unknown;
  mood?: unknown;
  duration?: unknown;
  album?: unknown;
  year?: unknown;
};

function parseManifest(data: unknown): RawTrack[] {
  // manifest can be: [ ... ] OR { tracks: [ ... ] }
  if (Array.isArray(data)) return data as RawTrack[];

  if (data && typeof data === "object") {
    const maybe = data as { tracks?: unknown };
    if (Array.isArray(maybe.tracks)) return maybe.tracks as RawTrack[];
  }

  return [];
}

function asString(v: unknown, fallback: string) {
  return typeof v === "string" && v.trim() ? v : fallback;
}
function asNumber(v: unknown) {
  return typeof v === "number" && Number.isFinite(v) ? v : undefined;
}
function asStringArray(v: unknown): string[] | null {
  if (!Array.isArray(v)) return null;
  const arr = v.map((x) => String(x).trim()).filter(Boolean);
  return arr.length ? arr : null;
}

export default function CatalogPage() {
  const [tracks, setTracks] = React.useState<Track[]>([]);
  const [tracksLoaded, setTracksLoaded] = React.useState(false);

  const [query, setQuery] = React.useState("");
  const [view, setView] = React.useState<ViewMode>("grid");
  const [genre, setGenre] = React.useState<string | null>(null);
  const [mood, setMood] = React.useState<string | null>(null);

  const [showDebug, setShowDebug] = React.useState(false);
  const [useProxy, setUseProxy] = React.useState(false);

  const [nowPlaying, setNowPlaying] = React.useState<number | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [audioError, setAudioError] = React.useState<string | null>(null);
  const [trackDurations, setTrackDurations] = React.useState<Record<number, string>>({});
  const audioRef = React.useRef<HTMLAudioElement>(null);

  // License modal state
  const [licenseOpen, setLicenseOpen] = React.useState(false);
  const [selectedForLicense, setSelectedForLicense] = React.useState<Pick<Track, "title" | "artist"> | null>(null);

  const TRACKS_PER_PAGE = 20;
  const [currentPage, setCurrentPage] = React.useState(1);

  // Load manifest (single, clean loader)
  React.useEffect(() => {
    let cancelled = false;

    async function loadTracks() {
      try {
        const res = await fetch("/manifest.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`manifest.json fetch failed (${res.status})`);

        const data: unknown = await res.json();
        const rawTracks = parseManifest(data);

        const built: Track[] = rawTracks.map((t, idx) => {
          const title = asString(t.title, `Track ${idx + 1}`);
          const artist = asString(t.artist, "PulseNexis");
          const streamPath = asString(t.streamPath ?? t.path, "");

          const fallback = categorizeTrack(title);

          const genreArr = (asStringArray(t.genre) ?? fallback.genre).map(normalizeTag);
          const moodArr = (asStringArray(t.mood) ?? fallback.mood).map(normalizeTag);

          const duration =
            typeof t.duration === "string"
              ? t.duration
              : t.duration == null
                ? null
                : String(t.duration);

          const album = typeof t.album === "string" ? t.album : undefined;
          const year = asNumber(t.year);

          return {
            id: idx + 1,
            title,
            artist,
            streamPath,
            genre: genreArr.length ? genreArr : ["R&B"],
            mood: moodArr.length ? moodArr : ["Smooth"],
            duration,
            album,
            year,
          };
        });

        if (!cancelled) {
          setTracks(built);
          setTracksLoaded(true);
        }
      } catch (err) {
        console.error("Failed to load tracks:", err);
        if (!cancelled) {
          setTracks([]);
          setTracksLoaded(true);
        }
      }
    }

    loadTracks();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = React.useMemo(() => {
    if (!tracksLoaded) return [];
    let list = [...tracks];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((t) => t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q));
    }
    if (genre) list = list.filter((t) => t.genre.includes(genre));
    if (mood) list = list.filter((t) => t.mood.includes(mood));

    list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [tracksLoaded, tracks, query, genre, mood]);

  // Pagination
  React.useEffect(() => {
    setCurrentPage(1);
  }, [query, genre, mood]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / TRACKS_PER_PAGE));
  const paginatedTracks = React.useMemo(() => {
    const start = (currentPage - 1) * TRACKS_PER_PAGE;
    return filtered.slice(start, start + TRACKS_PER_PAGE);
  }, [filtered, currentPage]);

  const currentIndex = React.useMemo(() => filtered.findIndex((t) => t.id === nowPlaying), [filtered, nowPlaying]);
  const currentTrack = currentIndex >= 0 ? filtered[currentIndex] : null;

  const getTrackDuration = (track: Track) => {
    if (track.duration) return String(track.duration);
    if (trackDurations[track.id]) return trackDurations[track.id];
    return "Unknown";
  };

  const playTrack = (id: number) => {
    setAudioError(null);
    setNowPlaying(id);
  };

  const prev = () => {
    if (!filtered.length) return;
    if (currentIndex > 0) setNowPlaying(filtered[currentIndex - 1].id);
    else setNowPlaying(filtered[filtered.length - 1].id);
  };

  const next = () => {
    if (!filtered.length) return;
    if (currentIndex < filtered.length - 1) setNowPlaying(filtered[currentIndex + 1].id);
    else setNowPlaying(filtered[0].id);
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (e) {
      console.error("Play failed:", e);
      setAudioError(`Playback failed: ${e instanceof Error ? e.message : "Unknown error"}`);
      setIsPlaying(false);
    }
  };

  // Bind audio whenever track changes
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    const directUrl = toAudioUrl(currentTrack.streamPath);
    const proxiedUrl = `/api/proxy-audio?url=${encodeURIComponent(directUrl)}`;
    const url = useProxy ? proxiedUrl : directUrl;

    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setAudioError(null);

    audio.preload = "auto";
    audio.crossOrigin = useProxy ? null : "anonymous";
    audio.src = url;

    const onLoadedMetadata = () => {
      if (audio.duration && Number.isFinite(audio.duration) && !currentTrack.duration) {
        setTrackDurations((prevMap) => ({ ...prevMap, [currentTrack.id]: formatTime(audio.duration) }));
      }
    };

    const onError = () => {
      const code = audio.error?.code ?? "unknown";
      if (!useProxy) {
        setUseProxy(true);
        return;
      }
      setAudioError(`Cannot load "${currentTrack.title}" (code: ${String(code)}).`);
      setIsPlaying(false);
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("error", onError);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    audio.load();

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentTrack, useProxy]);

  // Loading state
  if (!tracksLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="h-9 w-9 rounded-xl bg-black grid place-items-center text-white font-bold mb-4 mx-auto">PN</div>
          <h2 className="text-xl font-semibold mb-2">Loading PulseNexis Catalog...</h2>
          <p className="text-slate-500">Fetching your music collection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-black grid place-items-center text-white font-bold">PN</div>
            <div>
              <h1 className="text-xl font-semibold leading-tight text-slate-900">PulseNexis Music Catalog</h1>
              <p className="text-xs text-slate-600">Browse • Filter • Preview • License</p>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden md:block text-xs text-slate-600 font-medium">
              {filtered.length} tracks{tracks.length && filtered.length !== tracks.length ? ` of ${tracks.length}` : ""}
            </div>

            <button onClick={() => setShowDebug((s) => !s)} className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50">
              {showDebug ? "Hide Debug" : "Debug"}
            </button>

            <button
              onClick={() => setView("grid")}
              className={classNames(
                "rounded-xl border px-3 py-2 text-sm hover:bg-slate-50",
                view === "grid" && "bg-slate-900 text-white border-slate-900 hover:bg-slate-900"
              )}
            >
              Grid view
            </button>
            <button
              onClick={() => setView("list")}
              className={classNames(
                "rounded-xl border px-3 py-2 text-sm hover:bg-slate-50",
                view === "list" && "bg-slate-900 text-white border-slate-900 hover:bg-slate-900"
              )}
            >
              List view
            </button>
          </div>
        </div>
      </header>

      {/* Debug */}
      {showDebug && (
        <section className="max-w-6xl mx-auto px-4 py-6 bg-yellow-50 border border-yellow-200 rounded-xl my-6">
          <h3 className="text-sm font-semibold text-yellow-800 mb-2">🐛 Debug</h3>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="text-xs text-yellow-700">
              AUDIO_BASE_URL: <code className="bg-yellow-100 px-1 rounded">{AUDIO_BASE_URL}</code>
            </div>

            <button
              onClick={() => setUseProxy((p) => !p)}
              className={classNames(
                "text-xs px-3 py-1 rounded-lg border",
                useProxy ? "bg-green-100 border-green-300 text-green-800" : "bg-gray-100 border-gray-300 text-gray-700"
              )}
            >
              {useProxy ? "✓ Using Proxy" : "Use Proxy"}
            </button>
          </div>

          <div className="mt-3 grid gap-2 text-xs">
            {tracks.slice(0, 8).map((t) => (
              <div key={t.id} className="flex items-center gap-2 bg-white/60 p-2 rounded">
                <span className="font-medium">{t.title}:</span>
                <code className="bg-yellow-100 px-1 rounded">{t.streamPath}</code>
                <span className="text-yellow-600">→</span>
                <a href={toAudioUrl(t.streamPath)} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                  Direct
                </a>
                <button onClick={() => playTrack(t.id)} className="text-green-700 hover:underline ml-2">
                  Test Play
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-3 py-4 sm:px-4 sm:py-6">
        <div className="grid gap-3 sm:gap-4 md:grid-cols-12">
          <div className="md:col-span-6">
            <label htmlFor="catalog-search" className="block text-xs font-medium text-slate-600 mb-1">
              Search
            </label>
            <input
              id="catalog-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or artist…"
              autoComplete="off"
              className="w-full rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-medium text-slate-600 mb-1">Genre</label>
            <div className="flex gap-2 flex-wrap">
              <button
                className={classNames("rounded-full border px-3 py-1 text-sm", !genre && "bg-slate-900 text-white border-slate-900")}
                onClick={() => setGenre(null)}
              >
                All
              </button>
              {ALL_GENRES.map((g) => (
                <button
                  key={g}
                  onClick={() => setGenre(g)}
                  className={classNames(
                    "rounded-full border px-3 py-1 text-sm hover:bg-slate-50",
                    genre === g && "bg-slate-900 text-white border-slate-900"
                  )}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-medium text-slate-600 mb-1">Mood</label>
            <div className="flex gap-2 flex-wrap">
              <button
                className={classNames("rounded-full border px-3 py-1 text-sm", !mood && "bg-slate-900 text-white border-slate-900")}
                onClick={() => setMood(null)}
              >
                All
              </button>
              {ALL_MOODS.map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={classNames(
                    "rounded-full border px-3 py-1 text-sm hover:bg-slate-50",
                    mood === m && "bg-slate-900 text-white border-slate-900"
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 pb-24">
        {view === "grid" ? (
          <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-5">
            {paginatedTracks.map((t) => (
              <article key={t.id} className="group rounded-2xl border p-3 hover:shadow-sm transition">
                <Cover title={t.title} />

                <div className="mt-3">
                  <h3 className="font-semibold leading-snug line-clamp-1 text-slate-900 min-h-[24px]">{t.title}</h3>
                  <p className="text-sm text-slate-600 line-clamp-1 min-h-[20px]">{t.artist}</p>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      #{t.id} • {getTrackDuration(t)}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => playTrack(t.id)}
                        className="rounded-xl border border-slate-300 px-3 py-1 text-sm text-slate-900 hover:bg-slate-50 font-medium"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => {
                          setSelectedForLicense({ title: t.title, artist: t.artist });
                          setLicenseOpen(true);
                        }}
                        className="rounded-xl bg-black text-white px-3 py-1 text-sm font-medium hover:bg-slate-900"
                      >
                        License
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="divide-y border rounded-2xl overflow-hidden">
            {paginatedTracks.map((t) => (
              <article key={t.id} className="grid grid-cols-12 items-center gap-3 p-3">
                <div className="col-span-1">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 flex items-center justify-center">
                    <Image src="/HoneyDrip Logo.jpg" alt="HoneyDrip Records" width={32} height={32} className="w-8 h-8 object-contain rounded" />
                  </div>
                </div>

                <div className="col-span-6 min-w-0">
                  <h3 className="font-medium leading-tight text-slate-900 truncate">{t.title}</h3>
                  <p className="text-sm text-slate-600 truncate">{t.artist}</p>
                </div>

                <div className="col-span-3 text-sm text-slate-600 truncate">{t.genre.join(", ")}</div>
                <div className="col-span-1 text-sm text-slate-500">{getTrackDuration(t)}</div>

                <div className="col-span-1 flex justify-end gap-2">
                  <button
                    onClick={() => playTrack(t.id)}
                    className="rounded-xl border border-slate-300 px-3 py-1 text-sm text-slate-900 hover:bg-slate-50 font-medium"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => {
                      setSelectedForLicense({ title: t.title, artist: t.artist });
                      setLicenseOpen(true);
                    }}
                    className="rounded-xl bg-black text-white px-3 py-1 text-sm font-medium hover:bg-slate-900"
                  >
                    License
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="text-sm text-slate-600">
              Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </main>

      {/* Now Playing Bar */}
      {nowPlaying && currentTrack && (
        <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[min(92%,60rem)] z-40">
          {audioError && (
            <div className="mb-2 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              <strong>Audio Error:</strong> {audioError}
              <br />
              <span className="text-xs opacity-75">Trying: {toAudioUrl(currentTrack.streamPath)}</span>
            </div>
          )}

          <div className="rounded-2xl border bg-white shadow-lg p-3 flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 flex items-center justify-center">
              <Image src="/HoneyDrip Logo.jpg" alt="HoneyDrip Records" width={32} height={32} className="w-8 h-8 object-contain rounded" />
            </div>

            <div className="min-w-0">
              <div className="text-sm font-medium truncate text-slate-900">{currentTrack.title}</div>
              <div className="text-xs text-slate-600 truncate">{currentTrack.artist}</div>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button onClick={prev} className="rounded-xl border border-slate-300 px-3 py-1 text-sm text-black hover:bg-slate-50">
                ⏮︎
              </button>
              <button
                onClick={togglePlay}
                className="rounded-xl border border-slate-300 px-3 py-1 text-sm text-black hover:bg-slate-50 font-medium"
              >
                {isPlaying ? "⏸︎" : "▶︎"}
              </button>
              <button onClick={next} className="rounded-xl border border-slate-300 px-3 py-1 text-sm text-black hover:bg-slate-50">
                ⏭︎
              </button>

              <button
                onClick={() => {
                  setSelectedForLicense({ title: currentTrack.title, artist: currentTrack.artist });
                  setLicenseOpen(true);
                }}
                className="ml-2 rounded-xl bg-black text-white px-3 py-1 text-sm font-medium hover:bg-slate-900"
              >
                License
              </button>

              <button
                onClick={() => {
                  setNowPlaying(null);
                  setIsPlaying(false);
                  setAudioError(null);
                  if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                  }
                }}
                className="ml-1 rounded-xl border border-slate-300 px-3 py-1 text-sm text-black hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>

          <audio ref={audioRef} preload="none" controls={false} />
        </footer>
      )}

      <LicenseModal open={licenseOpen} onClose={() => setLicenseOpen(false)} track={selectedForLicense} />
    </div>
  );
}
