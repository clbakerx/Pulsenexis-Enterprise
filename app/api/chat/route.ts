import { NextRequest, NextResponse } from "next/server";
import { buildNovaSystemPrompt } from "@/lib/site-content";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "No key" }, { status: 500 });
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model: "claude-sonnet-4-5", max_tokens: 1000, system: buildNovaSystemPrompt(), messages }),
  });
  const data = await res.json();
  console.log("Anthropic response:", JSON.stringify(data));
  return NextResponse.json({ text: data.content?.[0]?.text ?? "" });
}
