"use client";

import * as React from "react";

function getVid() {
  const key = "pn_vid";
  let v = typeof window !== "undefined" ? localStorage.getItem(key) : null;
  if (!v && typeof window !== "undefined") {
    v = crypto.randomUUID();
    localStorage.setItem(key, v);
  }
  return v ?? "anonymous";
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
      const data = await res.json().catch(() => ({}));
      setOnline(typeof data?.online === "number" ? data.online : null);
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
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500 bg-white/40 backdrop-blur">
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
      <span className="font-semibold">{online === null ? "—" : online}</span>
      <span className="text-slate-500">online</span>
    </div>
  );
}

// ✅ ALSO export default so either import style works
export default TrafficMeter;
