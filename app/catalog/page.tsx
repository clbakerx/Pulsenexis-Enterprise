"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import Image from "next/image";

// Base URL for your audio files
const AUDIO_BASE_URL = "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/";

// Track interface based on your manifest.json structure
interface Track {
  title: string;
  artist: string;
  streamPath: string;
  id: number;
  genre: string[];
  mood: string[];
  duration?: string;
  album?: string;
  year?: number;
}

// Function to categorize tracks by title keywords
function categorizeTrack(title: string): { genre: string[], mood: string[] } {
  const titleLower = title.toLowerCase();
  const genres: string[] = [];
  const moods: string[] = [];

  // Simple genre detection based on title keywords
  if (titleLower.includes('love') || titleLower.includes('heart') || titleLower.includes('baby') || titleLower.includes('you')) {
    genres.push('R&B');
    moods.push('Romantic');
  }
  if (titleLower.includes('dance') || titleLower.includes('move') || titleLower.includes('fire') || titleLower.includes('ignite')) {
    genres.push('Dance');
    moods.push('Energetic');
  }
  if (titleLower.includes('chill') || titleLower.includes('relax') || titleLower.includes('smooth')) {
    moods.push('Chill');
  }
  if (titleLower.includes('crazy') || titleLower.includes('wild') || titleLower.includes('party')) {
    genres.push('Pop');
    moods.push('Energetic');
  }

  // Default categorization
  if (genres.length === 0) genres.push('R&B');
  if (moods.length === 0) moods.push('Smooth');

  return { genre: genres, mood: moods };
}

// We'll load this from manifest.json
let TRACKS: Track[] = [];

// Dynamic genre and mood lists
const ALL_GENRES = ["R&B", "Pop", "Dance", "Rap"];
const ALL_MOODS = ["Romantic", "Smooth", "Warm", "Energetic", "Chill"];

function classNames(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

const Cover = ({ title }: { title: string }) => (
  <div className="aspect-square w-full rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
    {/* HoneyDrip Logo Image */}
    <div className="flex flex-col items-center justify-center h-full">
      {/* Actual Logo Image */}
      <div className="relative mb-3 flex-shrink-0">
        <Image 
          src="/HoneyDrip Logo.jpg" 
          alt="HoneyDrip Records"
          width={64}
          height={64}
          className="w-16 h-16 object-contain rounded-lg"
          onError={(e) => {
            // Fallback if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.nextElementSibling?.classList.remove('hidden');
          }}
        />
        {/* Fallback honey drop icon (hidden by default) */}
        <div className="hidden w-16 h-16 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full relative">
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
            <div className="w-4 h-5 bg-gradient-to-b from-amber-500 to-amber-700 rounded-b-full"></div>
          </div>
          <div className="absolute top-3 left-5 w-2 h-2 bg-white/40 rounded-full"></div>
        </div>
      </div>
      
      {/* Record Label Text */}
      <div className="text-center mb-2">
        <div className="text-xs font-bold text-amber-800 tracking-wider">HONEY DRIP RECORDS</div>
      </div>
      
      {/* Track Title */}
      <div className="text-center">
        <div className="text-xs text-amber-600 font-medium line-clamp-2 leading-tight">{title}</div>
      </div>
    </div>
  </div>
);

export default function CatalogPage() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort] = useState<"title" | "id">("title"); // Keep but don't use setter
  const [genre, setGenre] = useState<string | null>(null);
  const [mood, setMood] = useState<string | null>(null);
  const [nowPlaying, setNowPlaying] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [tracksLoaded, setTracksLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDebug, setShowDebug] = useState(false);
  const [useProxy, setUseProxy] = useState(false);
  const [trackDurations, setTrackDurations] = useState<{ [key: number]: string }>({});
  const audioRef = useRef<HTMLAudioElement>(null);

  const TRACKS_PER_PAGE = 20;

  // Get track duration from manifest or dynamic data
  const getTrackDuration = (track: Track): string => {
    // First try manifest data
    if (track.duration) {
      return track.duration;
    }
    // Then try dynamic data
    if (trackDurations[track.id]) {
      return trackDurations[track.id];
    }
    // Default fallback
    return 'Unknown';
  };

  // Utility function to format time
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Load tracks from manifest.json on component mount
  useEffect(() => {
    async function loadTracks() {
      try {
        const response = await fetch('/manifest.json');
        const manifestData = await response.json();
        
        TRACKS = manifestData.map((track: Omit<Track, 'id' | 'genre' | 'mood'>, index: number) => {
          const categories = categorizeTrack(track.title);
          return {
            ...track,
            id: index + 1,
            genre: categories.genre,
            mood: categories.mood
          };
        });
        
        setTracksLoaded(true);
      } catch (error) {
        console.error('Failed to load tracks:', error);
      }
    }
    
    loadTracks();
  }, []);

  const playTrack = (trackId: number) => {
    const track = TRACKS.find(t => t.id === trackId);
    if (!track) return;

    console.log(`🎵 Play button clicked for: ${track.title}`);
    
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    // Reset state
    setIsPlaying(false);
    setAudioError(null);
    
    // Set the new track as now playing (this will trigger useEffect to load the new audio)
    setNowPlaying(trackId);
  };
  
  const currentIndex = useMemo(
    () => TRACKS.findIndex(t => t.id === nowPlaying),
    [nowPlaying]
  );
  const currentTrack = currentIndex >= 0 ? TRACKS[currentIndex] : null;
  
  const prev = () => {
    const currentIndex = filtered.findIndex(track => track.id === nowPlaying);
    if (currentIndex > 0) {
      setNowPlaying(filtered[currentIndex - 1].id);
    } else {
      // Loop to last track
      setNowPlaying(filtered[filtered.length - 1].id);
    }
  };
  
  const next = () => {
    const currentIndex = filtered.findIndex(track => track.id === nowPlaying);
    if (currentIndex < filtered.length - 1) {
      setNowPlaying(filtered[currentIndex + 1].id);
    } else {
      // Loop back to first track
      setNowPlaying(filtered[0].id);
    }
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
    } catch (error) {
      console.error('❌ Play failed:', error);
      setAudioError(`Playback failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsPlaying(false);
    }
  };

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    let audioUrl;
    
    if (useProxy) {
      audioUrl = `/api/proxy-audio?url=${encodeURIComponent(AUDIO_BASE_URL + currentTrack.streamPath)}`;
    } else {
      audioUrl = `${AUDIO_BASE_URL}${encodeURIComponent(currentTrack.streamPath)}`;
    }
    
    // Loading audio - reduced logging for performance
    
    // Reset audio element
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setAudioError(null);
    
    // Enhanced audio element configuration for better performance
    audio.crossOrigin = useProxy ? null : "anonymous";
    audio.preload = "auto"; // Changed from "metadata" to "auto" for faster playback
    
    // Detect audio format from file extension
    const fileExtension = currentTrack.streamPath.toLowerCase().split('.').pop();
    const supportedFormats = ['mp3', 'wav', 'ogg', 'm4a', 'aac'];
    
    if (fileExtension && !supportedFormats.includes(fileExtension)) {
      console.warn(`⚠️ Unsupported audio format: ${fileExtension}`);
    }
    
    audio.src = audioUrl;
    
    const handleLoadedData = () => {
      // Reduced logging for performance
      setAudioError(null);
      
      // Store duration if we don't have it and it's valid
      if (audio.duration && isFinite(audio.duration) && currentTrack && !currentTrack.duration) {
        const formattedDuration = formatTime(audio.duration);
        setTrackDurations(prev => ({
          ...prev,
          [currentTrack.id]: formattedDuration
        }));
      }
      // Track is loaded and ready to play, but won't auto-play
    };
    
    const handleLoadedMetadata = () => {
      // Reduced logging for performance - only log metadata load
      
      // Also store duration from metadata event
      if (audio.duration && isFinite(audio.duration) && currentTrack && !currentTrack.duration) {
        const formattedDuration = formatTime(audio.duration);
        setTrackDurations(prev => ({
          ...prev,
          [currentTrack.id]: formattedDuration
        }));
      }
    };
    
    const handleError = () => {
      const error = audio.error;
      const errorCode = error?.code || 'unknown';
      const errorMessage = error?.message || 'Unknown error';
      
      if (!useProxy) {
        console.log('🔄 Switching to proxy mode due to error...');
        setUseProxy(true);
      } else {
        const detailedError = `Cannot load "${currentTrack.title}": ${errorMessage} (Code: ${errorCode})`;
        setAudioError(detailedError);
        console.error('💥 Proxy mode also failed:', detailedError);
      }
      setIsPlaying(false);
    };
    
    const handleCanPlay = () => {
      // Audio ready to play - no logging for performance
    };
    
    const handlePlay = () => {
      setIsPlaying(true);
    };
    
    const handlePause = () => {
      setIsPlaying(false);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      // Track ended - user can manually choose next track
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    // Try to load
    audio.load();

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, useProxy]);

  const filtered = useMemo(() => {
    if (!tracksLoaded) return [];
    let list = [...TRACKS];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(t => t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q));
    }
    if (genre) list = list.filter(t => t.genre.includes(genre));
    if (mood) list = list.filter(t => t.mood.includes(mood));
    list.sort((a, b) => (sort === "title" ? a.title.localeCompare(b.title) : a.id - b.id));
    return list;
  }, [query, sort, genre, mood, tracksLoaded]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / TRACKS_PER_PAGE);
  const paginatedTracks = useMemo(() => {
    const startIndex = (currentPage - 1) * TRACKS_PER_PAGE;
    return filtered.slice(startIndex, startIndex + TRACKS_PER_PAGE);
  }, [filtered, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [query, genre, mood]);

  // Show loading state
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
              <p className="text-xs text-slate-600">Browse • Filter • Preview</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden md:block text-xs text-slate-600 font-medium">
              {filtered.length} tracks {filtered.length !== TRACKS.length && `of ${TRACKS.length} total`}
            </div>
            <a 
              href="https://app.pulsenexis.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm font-medium transition-colors"
            >
              Join PulseNexis
            </a>
            <button 
              onClick={() => setShowDebug(!showDebug)} 
              className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
            >
              {showDebug ? 'Hide Debug' : 'Debug'}
            </button>
            <button onClick={() => setView(view === "grid" ? "list" : "grid")} className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50">
              {view === "grid" ? "List view" : "Grid view"}
            </button>
          </div>
        </div>
      </header>

      {/* Debug Section - Toggle visibility */}
      {showDebug && (
        <section className="max-w-6xl mx-auto px-4 py-6 bg-yellow-50 border border-yellow-200 rounded-xl mb-6">
          <h3 className="text-sm font-semibold text-yellow-800 mb-2">🐛 Debug Info - File Locations</h3>
          <div className="mb-4 flex items-center gap-4">
            <p className="text-xs text-yellow-700">
              The app is looking for files at: <code className="bg-yellow-100 px-1 rounded">{AUDIO_BASE_URL}</code>
            </p>
            <button
              onClick={() => setUseProxy(!useProxy)}
              className={`text-xs px-3 py-1 rounded-lg border ${
                useProxy 
                  ? 'bg-green-100 border-green-300 text-green-800' 
                  : 'bg-gray-100 border-gray-300 text-gray-700'
              }`}
            >
              {useProxy ? '✓ Using Proxy' : 'Use Proxy Mode'}
            </button>
            <button
              onClick={() => {
                const testAudio = new Audio(`${AUDIO_BASE_URL}A%20Crazy%20Ride.mp3`);
                testAudio.play().then(() => {
                  console.log('✅ Direct Audio() test successful!');
                }).catch(err => {
                  console.error('❌ Direct Audio() test failed:', err);
                });
              }}
              className="text-xs px-3 py-1 rounded-lg border bg-blue-100 border-blue-300 text-blue-800"
            >
              Test Direct Audio
            </button>
          </div>
          <div className="grid gap-2 text-xs">
            {TRACKS.slice(0, 10).map(track => (
              <div key={track.id} className="flex items-center gap-2 bg-white/50 p-2 rounded">
                <span className="font-medium">{track.title}:</span>
                <code className="bg-yellow-100 px-1 rounded text-xs">{track.streamPath}</code>
                <span className="text-yellow-600">→</span>
                <a 
                  href={`${AUDIO_BASE_URL}${encodeURIComponent(track.streamPath)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-xs"
                >
                  Direct Link
                </a>
                <button 
                  onClick={() => playTrack(track.id)}
                  className="text-green-600 hover:underline text-xs ml-2"
                >
                  Test Play
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-yellow-700 mt-3">
            <strong>Direct Link</strong>: Opens the MP3 file directly in a new tab<br/>
            <strong>Test Play</strong>: Tries to play through the audio player<br/>
            <strong>Proxy Mode</strong>: Routes audio through server to bypass CORS restrictions<br/>
            Showing first 10 tracks - {TRACKS.length} total tracks loaded.
          </p>
        </section>
      )}

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid gap-3 md:grid-cols-12">
          <div className="md:col-span-6">
            <label className="block text-xs font-medium text-slate-600 mb-1">Search</label>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by title or artist…"
              className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-xs font-medium text-slate-600 mb-1">Genre</label>
            <div className="flex gap-2 flex-wrap">
              <button className={classNames("rounded-full border px-3 py-1 text-sm", !genre && "bg-slate-900 text-white border-slate-900")} onClick={() => setGenre(null)}>
                All
              </button>
              {ALL_GENRES.map(g => (
                <button key={g} onClick={() => setGenre(g)} className={classNames("rounded-full border px-3 py-1 text-sm hover:bg-slate-50", genre === g && "bg-slate-900 text-white border-slate-900")}>
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div className="md:col-span-3">
            <label className="block text-xs font-medium text-slate-600 mb-1">Mood</label>
            <div className="flex gap-2 flex-wrap">
              <button className={classNames("rounded-full border px-3 py-1 text-sm", !mood && "bg-slate-900 text-white border-slate-900")} onClick={() => setMood(null)}>
                All
              </button>
              {ALL_MOODS.map(m => (
                <button key={m} onClick={() => setMood(m)} className={classNames("rounded-full border px-3 py-1 text-sm hover:bg-slate-50", mood === m && "bg-slate-900 text-white border-slate-900")}>
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Song Grid/List */}
      <main className="max-w-6xl mx-auto px-4 pb-24">
        {view === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {paginatedTracks.map(t => (
              <article key={t.id} className="group rounded-2xl border p-3 hover:shadow-sm transition">
                <Cover title={t.title} />
                <div className="mt-3">
                  <h3 className="font-semibold leading-snug line-clamp-1 text-slate-900">{t.title}</h3>
                  <p className="text-sm text-slate-600 line-clamp-1">{t.artist}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-slate-500">#{t.id} • {getTrackDuration(t)}</span>
                    <button onClick={() => playTrack(t.id)} className="rounded-xl border border-slate-300 px-3 py-1 text-sm text-slate-900 hover:bg-slate-50 hover:text-black font-medium">
                      Play
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="divide-y border rounded-2xl overflow-hidden">
            {paginatedTracks.map(t => (
              <article key={t.id} className="grid grid-cols-12 items-center gap-3 p-3">
                <div className="col-span-1">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 flex items-center justify-center">
                    {/* Mini HoneyDrip Logo */}
                    <Image 
                      src="/HoneyDrip Logo.jpg" 
                      alt="HoneyDrip Records"
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain rounded"
                      onError={(e) => {
                        // Fallback if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    {/* Fallback mini honey drop (hidden by default) */}
                    <div className="hidden relative">
                      <div className="w-6 h-6 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full relative">
                        <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2">
                          <div className="w-1.5 h-2 bg-gradient-to-b from-amber-500 to-amber-700 rounded-b-full"></div>
                        </div>
                        <div className="absolute top-1 left-1.5 w-1 h-1 bg-white/40 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-6">
                  <h3 className="font-medium leading-tight text-slate-900">{t.title}</h3>
                  <p className="text-sm text-slate-600">{t.artist}</p>
                </div>
                <div className="col-span-3 text-sm text-slate-600">{t.genre.join(", ")}</div>
                <div className="col-span-1 text-sm text-slate-500">{getTrackDuration(t)}</div>
                <div className="col-span-1 flex justify-end">
                  <button onClick={() => playTrack(t.id)} className="rounded-xl border border-slate-300 px-3 py-1 text-sm text-slate-900 hover:bg-slate-50 hover:text-black font-medium">
                    Play
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
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={classNames(
                      "rounded-xl border px-3 py-2 text-sm hover:bg-slate-50",
                      currentPage === pageNum && "bg-slate-900 text-white border-slate-900"
                    )}
                  >
                    {pageNum}
                  </button>
                );
              })}
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

      {/* Now Playing */}
      {nowPlaying && (
        <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[min(92%,60rem)]">
          {audioError && (
            <div className="mb-2 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              <strong>Audio Error:</strong> {audioError}
              <br />
              <span className="text-xs opacity-75">
                Trying to load: {AUDIO_BASE_URL}{currentTrack?.streamPath}
              </span>
            </div>
          )}
          
          <div className="rounded-2xl border bg-white shadow-lg p-3 flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 flex items-center justify-center">
              {/* Mini HoneyDrip Logo for Now Playing */}
              <Image 
                src="/HoneyDrip Logo.jpg" 
                alt="HoneyDrip Records"
                width={32}
                height={32}
                className="w-8 h-8 object-contain rounded"
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              {/* Fallback mini honey drop (hidden by default) */}
              <div className="hidden relative">
                <div className="w-6 h-6 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full relative">
                  <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2">
                    <div className="w-1.5 h-2 bg-gradient-to-b from-amber-500 to-amber-700 rounded-b-full"></div>
                  </div>
                  <div className="absolute top-1 left-1.5 w-1 h-1 bg-white/40 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium truncate text-slate-900">{currentTrack?.title}</div>
              <div className="text-xs text-slate-600 truncate">{currentTrack?.artist}</div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button onClick={prev} disabled={currentIndex <= 0} className="rounded-xl border border-slate-300 px-3 py-1 text-sm text-black hover:bg-slate-50 disabled:opacity-50 disabled:text-slate-400">⏮︎</button>
              <button onClick={togglePlay} className="rounded-xl border border-slate-300 px-3 py-1 text-sm text-black hover:bg-slate-50 font-medium">
                {isPlaying ? "⏸︎" : "▶︎"}
              </button>
              <button onClick={next} disabled={currentIndex >= TRACKS.length - 1} className="rounded-xl border border-slate-300 px-3 py-1 text-sm text-black hover:bg-slate-50 disabled:opacity-50 disabled:text-slate-400">⏭︎</button>
              <button onClick={() => setNowPlaying(null)} className="ml-2 rounded-xl border border-slate-300 px-3 py-1 text-sm text-black hover:bg-slate-50">
                Close
              </button>
            </div>
          </div>
          
          {/* Hidden audio element */}
          <audio 
            ref={audioRef} 
            preload="none"
            controls={false}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />
        </footer>
      )}
    </div>
  );
}
