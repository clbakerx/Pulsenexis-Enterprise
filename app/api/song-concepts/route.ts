import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Accept the request body even if we don't use it yet
  const body = await req.json();

  // Return empty ideas so the fallback runs
  return NextResponse.json({ ideas: [] });
}
