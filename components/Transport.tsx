function PrevIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
      <path d="M6 5a1 1 0 0 1 1 1v12a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1m3.4 6.15 9.3-6.02A1 1 0 0 1 20.3 6v12a1 1 0 0 1-1.6.87l-9.3-6.02a1 1 0 0 1 0-1.7" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
      <path d="M18 5a1 1 0 0 1 1 1v12a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1m-3.4 6.15L5.3 5.13A1 1 0 0 0 3.7 6v12a1 1 0 0 0 1.6.87l9.3-6.02a1 1 0 0 0 0-1.7" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-current">
      <path d="M8 5.6a1 1 0 0 1 1.5-.87l10 6.4a1 1 0 0 1 0 1.74l-10 6.4A1 1 0 0 1 8 18.27z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M7 5a1.5 1.5 0 0 1 1.5 1.5v11a1.5 1.5 0 0 1-3 0v-11A1.5 1.5 0 0 1 7 5m10 0a1.5 1.5 0 0 1 1.5 1.5v11a1.5 1.5 0 0 1-3 0v-11A1.5 1.5 0 0 1 17 5" />
    </svg>
  );
}

type TransportProps = {
  isPlaying: boolean;
  onPrev: () => void;
  onPlayPause: () => void;
  onNext: () => void;
  variant: "desktop" | "mobile";
};

export default function Transport({ isPlaying, onPrev, onPlayPause, onNext, variant }: TransportProps) {
  const isMobile = variant === "mobile";
  const playSize = isMobile ? "h-[52px] w-[52px]" : "h-9 w-9";
  const sideTarget = isMobile ? "h-11 w-11" : "h-8 w-8";

  return (
    <div className={`flex items-center ${isMobile ? "justify-center gap-6" : "gap-0.5"}`}>
      <button
        type="button"
        aria-label="Previous track"
        onClick={onPrev}
        className={`flex items-center justify-center rounded-full text-paper/80 transition hover:text-amber active:scale-95 ${sideTarget}`}
      >
        <PrevIcon />
      </button>
      <button
        type="button"
        aria-label={isPlaying ? "Pause" : "Play"}
        onClick={onPlayPause}
        className={`flex items-center justify-center rounded-full bg-gradient-to-b from-amber to-amber-2 text-night ring-1 ring-white/25 transition active:scale-95 ${playSize} shadow-[0_6px_18px_-4px_rgba(232,163,61,0.7)]`}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button
        type="button"
        aria-label="Next track"
        onClick={onNext}
        className={`flex items-center justify-center rounded-full text-paper/80 transition hover:text-amber active:scale-95 ${sideTarget}`}
      >
        <NextIcon />
      </button>
    </div>
  );
}
