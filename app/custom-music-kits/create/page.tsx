import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic validation
    if (!body?.name || !body?.email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    // ✅ TODO: Replace this with your real destination:
    // - Email via Resend
    // - Save to Firebase / DB
    // - Send to a webhook (Zapier/Make)
    console.log("✅ Custom kit request received:", body);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
