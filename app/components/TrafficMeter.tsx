"use client";

import * as React from "react";

function getVid() {
  const key = "pn_vid";
  let v = localStorage.getItem(key);
  if (!v) {
    v = crypto.randomUUID();
    localStorage.setItem(key, v);
  }
  return v;
}

export function TrafficMeter() {
  const [online, setOnline] = React.useState<number | null>(null);

  React.useEffect(() => {
    const vid = getVid();

    const ping = async () => {
      await fetch("/api/traffic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vid }),
      }).catch(() => {});
    };

    const pull = async () => {
      const res = await fetch("/api/traffic", { cache: "no-store" }).catch(
        () => null
      );
      if (!res?.ok) return;
      const data = await res.json();
      setOnline(typeof data.online === "number" ? data.online : null);
    };

    ping();
    pull();

    const pingTimer = setInterval(ping, 25000);
    const pullTimer = setInterval(pull, 15000);

    return () => {
      clearInterval(pingTimer);
      clearInterval(pullTimer);
    };
  }, []);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs bg-white/80 backdrop-blur">
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
      <span className="font-semibold">
        {online === null ? "—" : online} online
      </span>
    </div>
  );
}
