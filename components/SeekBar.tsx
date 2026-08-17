"use client";

import { useCallback, useRef, useState } from "react";
import { formatTime } from "@/lib/format";

type SeekBarProps = {
  progress: number;
  duration: number;
  onSeek: (seconds: number) => void;
  className?: string;
};

export default function SeekBar({ progress, duration, onSeek, className = "" }: SeekBarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hoverRatio, setHoverRatio] = useState(0);

  const ratio = duration > 0 ? Math.min(1, Math.max(0, progress / duration)) : 0;

  const ratioFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  }, []);

  const seekFromClientX = useCallback(
    (clientX: number) => {
      if (duration <= 0) return;
      onSeek(ratioFromClientX(clientX) * duration);
    },
    [duration, onSeek, ratioFromClientX]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    seekFromClientX(e.clientX);

    const handleMove = (ev: PointerEvent) => seekFromClientX(ev.clientX);
    const handleUp = () => {
      setDragging(false);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  };

  // Hover preview: moving the cursor along the bar (without clicking) shows
  // the timestamp you'd land on — click or drag to actually commit the seek.
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return; // no hover state on touch
    setHoverRatio(ratioFromClientX(e.clientX));
  };

  return (
    // 24px invisible hit area around a 3px visible rail, per spec.
    <div
      ref={trackRef}
      role="slider"
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={Math.round(duration)}
      aria-valuenow={Math.round(progress)}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          onSeek(Math.min(duration, progress + 5));
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          onSeek(Math.max(0, progress - 5));
        }
      }}
      className={`group relative flex h-6 w-full cursor-pointer touch-none items-center ${className}`}
    >
      {hovering && !dragging && duration > 0 && (
        <div
          className="pointer-events-none absolute bottom-full mb-1.5 -translate-x-1/2 rounded bg-black/80 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-paper"
          style={{ left: `${hoverRatio * 100}%` }}
        >
          {formatTime(hoverRatio * duration)}
        </div>
      )}
      <div className="relative h-[3px] w-full rounded-full bg-white/15">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-amber shadow-[0_0_8px_1px_rgba(232,163,61,0.6)]"
          style={{ width: `${ratio * 100}%` }}
        />
        <div
          className={`absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber shadow-[0_1px_4px_rgba(0,0,0,0.6)] transition-opacity ${
            hovering || dragging ? "opacity-100" : "opacity-0"
          }`}
          style={{ left: `${ratio * 100}%` }}
        />
      </div>
    </div>
  );
}
