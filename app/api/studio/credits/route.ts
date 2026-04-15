import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// GET — return current credit balance
export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data } = await supabaseAdmin
    .from("users")
    .select("credits")
    .eq("clerk_user_id", userId)
    .single();

  return NextResponse.json({ credits: data?.credits ?? 0 });
}
