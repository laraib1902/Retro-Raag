"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { track as trackAnalyticsEvent } from "@vercel/analytics";
import { playlists } from "@/lib/tracks";
import { loadYouTubeIframeAPI } from "@/lib/youtube";
import PlayerDesktop from "./PlayerDesktop";
import PlayerMobile from "./PlayerMobile";
import PlaylistTabs from "./PlaylistTabs";

/** True at and above Tailwind's `sm` breakpoint (640px). */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export default function RadioPlayer() {
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // starts muted so autoplay is allowed

  const isDesktop = useIsDesktop();

  const playerRef = useRef<YT.Player | null>(null);
  const loadedVideoIdRef = useRef<string | null>(null);
  const rafRef = useRef<number | null>(null);
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  // These stay fresh across re-renders so the YT event handlers registered
  // once (in the init effect below) never close over stale playlist/track
  // state — e.g. after the user switches playlists.
  const goNextRef = useRef<() => void>(() => {});
  const currentTrackRef = useRef(playlists[0].tracks[0]);
  const wantsUnmuteRef = useRef(false);

  // The single, real host element the YT.Player attaches to. Created once and
  // reused for the whole session; only its *portal destination* changes when
  // the layout switches between the desktop pill and the mobile card, so the
  // iframe (and playback) never gets torn down.
  const [hostEl] = useState<HTMLDivElement | null>(() =>
    typeof document !== "undefined" ? document.createElement("div") : null
  );

  const desktopSlotRef = useRef<HTMLDivElement | null>(null);
  const mobileSlotRef = useRef<HTMLDivElement | null>(null);

  const currentPlaylist = playlists[playlistIndex];
  const currentTrack = currentPlaylist.tracks[trackIndex];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Unmute on the very first interaction anywhere on the page. Muted
  // autoplay starts the station instantly; this makes it audible the moment
  // the person clicks, taps, or presses a key — no separate "unmute" button.
  useEffect(() => {
    const handleFirstInteraction = () => {
      wantsUnmuteRef.current = true;
      playerRef.current?.unMute();
      setIsMuted(false);
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
    window.addEventListener("pointerdown", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);
    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, []);

  const stopProgressLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const startProgressLoop = useCallback(() => {
    stopProgressLoop();
    const tick = () => {
      const player = playerRef.current;
      if (player) {
        setProgress(player.getCurrentTime());
      }
      if (isPlayingRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [stopProgressLoop]);

  const goNext = useCallback(() => {
    setTrackIndex((i) => (i + 1) % currentPlaylist.tracks.length);
  }, [currentPlaylist.tracks.length]);
  goNextRef.current = goNext;
  currentTrackRef.current = currentTrack;

  // Initialize the YouTube player exactly once.
  useEffect(() => {
    if (!hostEl) return;
    let cancelled = false;

    loadYouTubeIframeAPI().then((YT) => {
      if (cancelled) return;
      const inner = document.createElement("div");
      hostEl.appendChild(inner);

      const player = new YT.Player(inner, {
        videoId: currentTrack.videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          playsinline: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          // Browsers block unmuted autoplay without a user gesture — muted
          // autoplay is allowed everywhere, so we start muted and unmute the
          // instant the person interacts with the page (see the effect below).
          autoplay: 1,
          mute: 1,
        },
        events: {
          onReady: () => {
            // If the user navigated to a different track while the API/player
            // was still loading, `currentTrack` (captured when this effect
            // ran) is stale — reconcile against the live ref instead of
            // trusting the closure.
            const wanted = currentTrackRef.current.videoId;
            loadedVideoIdRef.current = wanted;
            if (wanted !== currentTrack.videoId) {
              player.cueVideoById(wanted);
            }
            setDuration(player.getDuration());
            // Autoplay can be blocked outright in some browsers even when
            // muted — nudge it explicitly rather than assuming it started.
            player.playVideo();
            if (wantsUnmuteRef.current) {
              player.unMute();
            }
          },
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              setDuration(player.getDuration());
              startProgressLoop();
            } else if (e.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
              setDuration(player.getDuration());
              stopProgressLoop();
            } else if (e.data === window.YT.PlayerState.ENDED) {
              stopProgressLoop();
              goNextRef.current();
            } else if (
              e.data === window.YT.PlayerState.CUED ||
              e.data === window.YT.PlayerState.BUFFERING
            ) {
              // A cued/buffering video often already knows its duration even
              // before the user presses play — grab it as soon as it's
              // available instead of leaving the display stuck at 0:00.
              const d = player.getDuration();
              if (d > 0) setDuration(d);
            }
          },
          onError: (e) => {
            // Videos can get deleted or have embedding switched off after we
            // ship — skip to the next track instead of stalling the station.
            trackAnalyticsEvent("youtube_playback_error", {
              code: String(e.data),
              videoId: currentTrackRef.current.videoId,
            });
            goNextRef.current();
          },
        },
      });

      playerRef.current = player;
    });

    return () => {
      cancelled = true;
      stopProgressLoop();
      playerRef.current?.destroy();
      playerRef.current = null;
    };
    // Intentionally run once: track/playlist changes are handled by the
    // effect below via loadVideoById, not by recreating the player.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hostEl]);

  // Load a new video whenever the selected track changes (playlist switch or
  // next/prev), without recreating the player instance.
  useEffect(() => {
    const player = playerRef.current;
    if (!player || loadedVideoIdRef.current === null) return;
    if (loadedVideoIdRef.current === currentTrack.videoId) return;

    loadedVideoIdRef.current = currentTrack.videoId;
    setProgress(0);
    setDuration(0); // avoid showing the previous track's duration for a beat
    if (isPlayingRef.current) {
      player.loadVideoById(currentTrack.videoId);
    } else {
      player.cueVideoById(currentTrack.videoId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack.videoId]);

  const handlePlayPause = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    // Never gate this on a "canplay"-style readiness check — iOS Safari
    // won't fire it before a user gesture, which would leave the button dead.
    if (isPlayingRef.current) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }, []);

  const handleSeek = useCallback((seconds: number) => {
    playerRef.current?.seekTo(seconds, true);
    setProgress(seconds);
  }, []);

  const handlePrev = useCallback(() => {
    setTrackIndex((i) => (i - 1 + currentPlaylist.tracks.length) % currentPlaylist.tracks.length);
  }, [currentPlaylist.tracks.length]);

  const handleSelectPlaylist = useCallback((index: number) => {
    setPlaylistIndex(index);
    setTrackIndex(0); // switching playlist always restarts at track 1
  }, []);

  const activeSlot = isDesktop ? desktopSlotRef.current : mobileSlotRef.current;

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-2">
      <PlaylistTabs playlists={playlists} activeId={currentPlaylist.id} onSelect={handleSelectPlaylist} />

      {isMuted && isPlaying && (
        <p className="animate-pulse rounded-full bg-black/40 px-3 py-1 font-mono text-[10px] text-paper/80 backdrop-blur-sm">
          🔇 Tap anywhere to unmute
        </p>
      )}

      <div className="w-full">
        <PlayerDesktop
          ref={desktopSlotRef}
          track={currentTrack}
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          onSeek={handleSeek}
          onPrev={handlePrev}
          onPlayPause={handlePlayPause}
          onNext={goNext}
        />
        <PlayerMobile
          ref={mobileSlotRef}
          track={currentTrack}
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          onSeek={handleSeek}
          onPrev={handlePrev}
          onPlayPause={handlePlayPause}
          onNext={goNext}
        />
      </div>

      {mounted && hostEl && activeSlot ? <PortalHost hostEl={hostEl} target={activeSlot} /> : null}
    </div>
  );
}

/**
 * Moves the real host element (containing the live YT iframe) into whichever
 * slot is currently visible, using a plain DOM `appendChild` rather than a
 * React portal. Because the iframe's subtree is never managed by React (it's
 * handed off to the YT.Player instance after creation), this reparenting
 * doesn't trigger any React reconciliation on it — the iframe, and playback,
 * survive the desktop/mobile layout switch untouched.
 *
 * Defined at module scope on purpose — see the note in Vinyl.tsx about why
 * sub-components must never be declared inline inside the parent.
 */
function PortalHost({ hostEl, target }: { hostEl: HTMLDivElement; target: HTMLDivElement }) {
  useEffect(() => {
    target.appendChild(hostEl);
    hostEl.className = "h-full w-full";
  }, [hostEl, target]);
  return null;
}
