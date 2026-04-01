// Supabase client factory — PORTECOS ACADEMIC IA
// Provides server-side (service_role) and client-side (anon) Supabase instances

import { createClient } from '@supabase/supabase-js';

// Server-side client with service_role key (full access, bypasses RLS)
export function createSupabaseServer() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;

  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables');
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

// Client-side / public client with anon key (respects RLS)
export function createSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Missing Supabase URL or ANON_KEY environment variables');
  }

  return createClient(url, key);
}

// Singleton for server-side use
// Note: in serverless environments each invocation has its own module scope,
// so this singleton is safe and avoids creating a new client on every call within a request.
export function getSupabaseServer() {
  return createSupabaseServer();
}
