import { forwardRef } from "react";

type VinylProps = {
  size: number;
  isPlaying: boolean;
};

/**
 * The spinning "record" slot. The div this forwards a ref to is the portal
 * target the YouTube iframe gets mounted into — see RadioPlayer.tsx. Keeping
 * this at module scope (not defined inside RadioPlayer) is required: an
 * inline definition gets a new function identity every render, which remounts
 * this subtree and restarts the CSS spin from 0deg on every progress tick.
 */
const Vinyl = forwardRef<HTMLDivElement, VinylProps>(function Vinyl(
  { size, isPlaying },
  ref
) {
  return (
    <div
      className="relative shrink-0 self-start overflow-hidden rounded-full bg-black/70 ring-1 ring-white/15"
      style={{
        width: size,
        height: size,
        animation: "spin 8s linear infinite",
        animationPlayState: isPlaying ? "running" : "paused",
      }}
    >
      <div
        ref={ref}
        className="absolute inset-0 [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:object-cover [&>div]:h-full [&>div]:w-full"
      />
      <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 ring-2 ring-white/40" />
    </div>
  );
});

export default Vinyl;
