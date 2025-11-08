/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Create Supabase client lazily only when env vars are present so build won't fail in dev
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  : null;

export async function POST(req: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase not configured (set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY)' }, { status: 500 });
    }
    const body = await req.json(); // { email?: string, title?: string, data: {...} }
    const { data, error } = await supabase
      .from("blueprints")
      .insert([{ user_email: body.email ?? null, title: body.title ?? null, payload: body.data }])
      .select("id")
      .single();
    if (error) throw error;
    return NextResponse.json({ id: data.id }, { status: 201 });
  } catch (e: any) {
    const msg = (e && typeof e === 'object' && 'message' in e) ? (e as any).message : String(e);
    return NextResponse.json({ error: msg ?? "Save failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase not configured (set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY)' }, { status: 500 });
    }
    const email = req.nextUrl.searchParams.get("email");
    const query = supabase.from("blueprints").select("*").order("created_at", { ascending: false }).limit(50);
    const { data, error } = email ? await query.eq("user_email", email) : await query;
    if (error) throw error;
    return NextResponse.json(data, { status: 200 });
  } catch (e: any) {
    const msg = (e && typeof e === 'object' && 'message' in e) ? (e as any).message : String(e);
    return NextResponse.json({ error: msg ?? "Fetch failed" }, { status: 500 });
  }
}
