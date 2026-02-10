import { NextResponse } from "next/server";
import { createClient } from "redis";

export const runtime = "nodejs";

const REDIS_URL = process.env.REDIS_URL;
if (!REDIS_URL) {
  throw new Error("Missing REDIS_URL (check Vercel Redis connection/env vars)");
}

// Cache the client across hot reloads
declare global {
  // eslint-disable-next-line no-var
  var __pnRedis: ReturnType<typeof createClient> | undefined;
}

const redis =
  global.__pnRedis ??
  createClient({
    url: REDIS_URL,
  });

global.__pnRedis = redis;

async function ensureConnected() {
  if (!redis.isOpen) await redis.connect();
}

const ONLINE_WINDOW_SECONDS = 5 * 60; // 5 minutes
const ONLINE_KEY = "traffic:online:zset";

function todayKey() {
  const d = new Date();
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `traffic:today:set:${yyyy}-${mm}-${dd}`;
}

export async function POST(req: Request) {
  await ensureConnected();

  const { vid } = (await req.json().catch(() => ({}))) as { vid?: string };
  if (!vid || typeof vid !== "string") {
    return NextResponse.json({ error: "Missing vid" }, { status: 400 });
  }

  const now = Date.now();
  const cutoff = now - ONLINE_WINDOW_SECONDS * 1000;

  // Mark visitor online (zset score = timestamp)
  await redis.zAdd(ONLINE_KEY, [{ score: now, value: vid }]);

  // Keep zset tidy
  await redis.zRemRangeByScore(ONLINE_KEY, 0, cutoff);

  // Daily uniques
  const tKey = todayKey();
  await redis.sAdd(tKey, vid);
  await redis.expire(tKey, 2 * 24 * 60 * 60); // 2 days buffer

  return NextResponse.json({ ok: true });
}

export async function GET() {
  await ensureConnected();

  const now = Date.now();
  const cutoff = now - ONLINE_WINDOW_SECONDS * 1000;

  await redis.zRemRangeByScore(ONLINE_KEY, 0, cutoff);
  const online = await redis.zCard(ONLINE_KEY);
  const today = await redis.sCard(todayKey());

  return NextResponse.json({ online, today });
}
