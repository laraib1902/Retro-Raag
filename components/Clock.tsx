"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export default function Clock() {
  // null on first render so the server-rendered markup and the first client
  // render match; the real time fills in a tick after mount.
  const [parts, setParts] = useState<{ time: string; meridiem: string } | null>(null);

  useEffect(() => {
    const update = () => {
      const formatted = formatter.format(new Date()); // e.g. "11:47 PM"
      const [time, meridiem] = formatted.split(" ");
      setParts({ time, meridiem });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const [hh, mm] = parts ? parts.time.split(":") : ["--", "--"];

  return (
    <div
      className="font-mono text-sm text-paper/90 tabular-nums drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
      aria-label={parts ? `${parts.time} ${parts.meridiem} Indian Standard Time` : undefined}
    >
      <span>{hh}</span>
      <span className="animate-blink">:</span>
      <span>{mm}</span>
      {parts && <span className="ml-1 text-xs text-paper/60">{parts.meridiem} IST</span>}
    </div>
  );
}
