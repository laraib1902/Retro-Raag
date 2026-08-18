import Clock from "@/components/Clock";
import ListenerCount from "@/components/ListenerCount";
import SocialLinks from "@/components/SocialLinks";
import RadioPlayer from "@/components/RadioPlayer";

const GRAIN_SVG = `<svg xmlns='https://laraib1902.github.io/Retro-Raag/bg/scene-wide.png'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>`;

export default function Home() {
  return (
    <main className="relative isolate flex min-h-dvh flex-1 flex-col items-center justify-end overflow-hidden">
      {/* Background scene */}
      <div className="fixed inset-0 -z-20 hero-bg bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/80" />
      </div>

      {/* Film grain */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,${GRAIN_SVG}")`,
          mixBlendMode: "overlay",
          opacity: 0.3,
        }}
        aria-hidden="true"
      />

      {/* Top row */}
      <div
        className="fixed left-0 right-0 top-0 z-10 flex items-start justify-between"
        style={{
          paddingTop: "max(1rem, env(safe-area-inset-top))",
          paddingLeft: "max(1rem, env(safe-area-inset-left))",
          paddingRight: "max(1rem, env(safe-area-inset-right))",
        }}
      >
        <Clock />
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <ListenerCount />
        </div>
        <SocialLinks />
      </div>

      {/* Player */}
      <div
        className="z-10 flex w-full flex-col items-center gap-2 px-4"
        style={{
          paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
          paddingLeft: "max(1rem, env(safe-area-inset-left))",
          paddingRight: "max(1rem, env(safe-area-inset-right))",
        }}
      >
        <RadioPlayer />
        <p className="max-w-md text-center font-mono text-[9px] leading-snug text-paper/40">
          Audio streams through YouTube&apos;s embedded player — nothing is hosted here, and
          all rights stay with the original labels, composers and performers. Hold the
          rights to a track here and want it removed?{" "}
          <a href="mailto:hello@example.com" className="underline decoration-white/30 hover:text-paper/70">
            Email us
          </a>{" "}
          and it comes down.
        </p>
      </div>
    </main>
  );
}
