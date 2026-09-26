// app/api/free-sample/route.ts
// Saves the email locally (data/free-sample-leads.json), optionally mirrors it
// to Brevo, and returns a free sample. Same email always gets the same track.

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { FREE_SAMPLES } from "@/lib/freeSamples";

export const runtime = "nodejs";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "free-sample-leads.json");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Lead = {
  email: string;
  sampleId: string;
  createdAt: string;
  source: string;
};

async function readLeads(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(LEADS_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeLeads(leads: Lead[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf8");
}

// Optional: keeps your Brevo list in sync. Remove BREVO_API_KEY to go fully local.
async function mirrorToBrevo(email: string) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return;
  try {
    await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [Number(process.env.BREVO_LIST_ID || 5)],
        updateEnabled: true,
      }),
    });
  } catch (err) {
    console.error("[free-sample] Brevo sync failed:", err);
  }
}

export async function POST(req: Request) {
  let body: { email?: string; company?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled in = bot. Pretend success, save nothing.
  if (body.company) {
    return NextResponse.json({ sample: FREE_SAMPLES[0] });
  }

  const email = (body.email || "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (FREE_SAMPLES.length === 0) {
    return NextResponse.json(
      { error: "No samples are available right now." },
      { status: 503 }
    );
  }

  const leads = await readLeads();
  const existing = leads.find((l) => l.email === email);

  // Returning email gets the same track; new email gets a random one.
  const sample =
    (existing && FREE_SAMPLES.find((s) => s.id === existing.sampleId)) ||
    FREE_SAMPLES[Math.floor(Math.random() * FREE_SAMPLES.length)];

  if (!existing) {
    leads.push({
      email,
      sampleId: sample.id,
      createdAt: new Date().toISOString(),
      source: "free-sample-page",
    });
    try {
      await writeLeads(leads);
    } catch (err) {
      // Read-only filesystem (e.g. Vercel). Still deliver the sample.
      console.error("[free-sample] Could not save lead locally:", err, email);
    }
    await mirrorToBrevo(email);
  }

  return NextResponse.json({ sample });
}
