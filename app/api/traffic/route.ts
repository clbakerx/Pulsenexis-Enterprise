import { NextResponse } from "next/server";
import { createClient } from "redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // avoid Next caching

const REDIS_URL =
  process.env.REDIS_URL ||
  process.env.STORAGE_URL ||
  process.env.UPSTASH_REDIS_REST_URL; // (fallback if you ever switch)

let client: ReturnType<typeof createClient> | null = null;

async function redis() {
  if (!REDIS_URL) {
    throw new Error(
      "Missing Redis URL. Set REDIS_URL or STORAGE_URL in your environment variables."
    );
  }
  if (!client) {
    client = createClient({ url: REDIS_URL });
    client.on("error", (e) => console.error("Redis error:", e));
    await client.connect();
  }
  return client;
}

function dayKey(d = new Date()) {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Keys
const ONLINE_ZSET = "traffic:online"; // ZSET sid -> lastSeenMs
const TODAY_SET_PREFIX = "traffic:today:sids:"; // SET of sids per day
const TODAY_COUNT_PREFIX = "traffic:today:count:"; // optional counter

const ONLINE_WINDOW_MS = 60_000; // "online" = seen in last 60s

// GET => returns { online, today }
export async function GET() {
  try {
    const r = await redis();
    const now = Date.now();
    const cutoff = now - ONLINE_WINDOW_MS;

    // prune old sessions
    await r.zRemRangeByScore(ONLINE_ZSET, 0, cutoff);

    const online = await r.zCard(ONLINE_ZSET);

    const dk = dayKey();
    const todaySetKey = `${TODAY_SET_PREFIX}${dk}`;
    const today = await r.sCard(todaySetKey);

    return NextResponse.json(
      { online, today },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "traffic error" },
      { status: 500 }
    );
  }
}

// POST => ping { sid } (updates online + counts unique sid for today)
export async function POST(req: Request) {
  try {
    const r = await redis();
    const body = await req.json().catch(() => null);
    const sid = typeof body?.sid === "string" ? body.sid : "";

    if (!sid || sid.length < 8 || sid.length > 80) {
      return NextResponse.json({ error: "Invalid sid" }, { status: 400 });
    }

    const now = Date.now();
    const dk = dayKey();
    const todaySetKey = `${TODAY_SET_PREFIX}${dk}`;

    // Update "online now"
    await r.zAdd(ONLINE_ZSET, [{ score: now, value: sid }]);

    // Track unique visits for the day (by sid)
    const added = await r.sAdd(todaySetKey, sid);

    // Expire daily set after ~3 days so Redis stays clean
    await r.expire(todaySetKey, 60 * 60 * 24 * 3);

    // (Optional) if you want a simple counter too:
    if (added === 1) {
      const countKey = `${TODAY_COUNT_PREFIX}${dk}`;
      await r.incr(countKey);
      await r.expire(countKey, 60 * 60 * 24 * 3);
    }

    return NextResponse.json(
      { ok: true },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "traffic error" },
      { status: 500 }
    );
  }
}
