import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";

export async function GET() {
  try {
    const p = join(process.cwd(), "public", "tracks.json");
    const raw = await readFile(p, "utf-8");
    const json = JSON.parse(raw);
    return NextResponse.json(json, { status: 200 });
  } catch {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
}
