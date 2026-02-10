"use client";

import * as React from "react";

type Traffic = { online: number; today: number };

function getOrCreateSid() {
  const key = "pn_sid";
  try {
    let sid = localStorage.getItem(key);
    if (!sid) {
      sid =
        crypto?.randomUUID?.() ??
        `sid_${Math.random().toString(16).slice(2)}_${Date.now()}`;
      localStorage.setItem(key, sid);
    }
    return sid;
  } catch {
    return `sid_${Math.random().toString(16).slice(2)}_${Date.now()}`;
  }
}

export default function TrafficMeter() {
  const [data, setData] = React.useState<Traffic>({ online: 0, today: 0 });

  React.useEffect(() => {
    const sid = getOrCreateSid();
    let alive = true;

    async function tick() {
      try {
        await fetch(`/api/traffic?ts=${Date.now()}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
          body: JSON.stringify({ sid }),
        });

        const res = await fetch(`/api/traffic?ts=${Date.now()}`, {
          cache: "no-store",
        });

        const json = (await res.json()) as Partial<Traffic>;
        if (!alive) return;

        setData({
          online: Number(json?.online ?? 0),
          today: Number(json?.today ?? 0),
        });
      } catch {
        // ignore
      }
    }

    tick();
    const id = window.setInterval(tick, 15000);

    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, []);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs text-slate-700 shadow-sm">
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
      <span className="font-medium">{data.online} online</span>
      <span className="text-slate-400">•</span>
      <span className="text-slate-600">{data.today} today</span>
    </div>
  );
}
