import type { Playlist } from "@/lib/tracks";

type PlaylistTabsProps = {
  playlists: Playlist[];
  activeId: string;
  onSelect: (index: number) => void;
};

export default function PlaylistTabs({ playlists, activeId, onSelect }: PlaylistTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Playlists"
      className="flex items-center gap-1 rounded-full border border-white/10 bg-black/30 p-0.5 backdrop-blur-md"
    >
      {playlists.map((p, i) => {
        const active = p.id === activeId;
        return (
          <button
            key={p.id}
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(i)}
            className={`rounded-full px-2.5 py-0.5 text-[11px] transition ${
              active ? "bg-amber text-night font-semibold" : "text-paper/70 hover:text-paper"
            }`}
          >
            {p.name}
          </button>
        );
      })}
    </div>
  );
}
