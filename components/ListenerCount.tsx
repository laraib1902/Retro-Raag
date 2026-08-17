"use client";

import { useEffect, useState } from "react";

const STARTING_COUNT = 214;

export default function ListenerCount() {
  const [count, setCount] = useState(STARTING_COUNT);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => {
        const step = Math.floor(Math.random() * 5) - 2; // -2..+2
        const next = prev + step;
        return next < 40 ? 40 : next;
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1 backdrop-blur-sm">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber/70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
      </span>
      <span className="font-mono text-xs tabular-nums text-paper/85">
        {count.toLocaleString("en-IN")} tuning in
      </span>
    </div>
  );
}
