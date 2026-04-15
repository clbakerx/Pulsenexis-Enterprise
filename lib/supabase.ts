import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Browser / client-component client
export const supabase = createClient(url, anonKey);

// Server-side admin client (API routes, webhooks)
export const supabaseAdmin = createClient(url, serviceKey);
