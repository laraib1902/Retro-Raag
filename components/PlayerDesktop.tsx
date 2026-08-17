import { forwardRef } from "react";
import type { Track } from "@/lib/tracks";
import { formatTime } from "@/lib/format";
import Vinyl from "./Vinyl";
import SeekBar from "./SeekBar";
import Transport from "./Transport";

type PlayerDesktopProps = {
  track: Track;
  isPlaying: boolean;
  progress: number;
  duration: number;
  onSeek: (seconds: number) => void;
  onPrev: () => void;
  onPlayPause: () => void;
  onNext: () => void;
};

const GLASS =
  "border border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.055] backdrop-blur-3xl backdrop-saturate-[1.7] shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)]";

const PlayerDesktop = forwardRef<HTMLDivElement, PlayerDesktopProps>(function PlayerDesktop(
  { track, isPlaying, progress, duration, onSeek, onPrev, onPlayPause, onNext },
  vinylMountRef
) {
  return (
    <div className={`hidden items-center gap-3 rounded-full p-2 pr-4 sm:flex ${GLASS}`}>
      <Vinyl ref={vinylMountRef} size={60} isPlaying={isPlaying} />

      <div className="min-w-0 flex-1">
        <p className="truncate font-body text-[14px] font-semibold text-paper">{track.title}</p>
        <p className="truncate text-[11.5px] text-paper/70">
          {track.artist} · {track.film}
        </p>
        <SeekBar progress={progress} duration={duration} onSeek={onSeek} className="mt-1" />
        <div className="flex justify-between font-mono text-[10px] tabular-nums text-paper/60">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration || track.duration)}</span>
        </div>
      </div>

      <Transport variant="desktop" isPlaying={isPlaying} onPrev={onPrev} onPlayPause={onPlayPause} onNext={onNext} />
    </div>
  );
});

export default PlayerDesktop;
