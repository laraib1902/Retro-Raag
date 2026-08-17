import { forwardRef } from "react";
import type { Track } from "@/lib/tracks";
import { formatTime } from "@/lib/format";
import Vinyl from "./Vinyl";
import SeekBar from "./SeekBar";
import Transport from "./Transport";

type PlayerMobileProps = {
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

const PlayerMobile = forwardRef<HTMLDivElement, PlayerMobileProps>(function PlayerMobile(
  { track, isPlaying, progress, duration, onSeek, onPrev, onPlayPause, onNext },
  vinylMountRef
) {
  return (
    <div className={`flex w-full flex-col gap-2 rounded-[22px] p-3 sm:hidden ${GLASS}`}>
      <div className="flex items-center gap-3">
        <Vinyl ref={vinylMountRef} size={52} isPlaying={isPlaying} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-body text-[15px] font-semibold text-paper">{track.title}</p>
          <p className="truncate text-[12.5px] text-paper/70">
            {track.artist} · {track.film}
          </p>
        </div>
      </div>

      <SeekBar progress={progress} duration={duration} onSeek={onSeek} />

      <div className="relative flex items-center">
        <span className="font-mono text-[10.5px] tabular-nums text-paper/60">
          {formatTime(progress)} / {formatTime(duration || track.duration)}
        </span>
        <div className="absolute left-1/2 -translate-x-1/2">
          <Transport variant="mobile" isPlaying={isPlaying} onPrev={onPrev} onPlayPause={onPlayPause} onNext={onNext} />
        </div>
      </div>
    </div>
  );
});

export default PlayerMobile;
