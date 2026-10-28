import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL?.trim()
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

export const isSupabaseConfigured = Boolean(url && anonKey)

export function createPublicSupabaseClient(): SupabaseClient | undefined {
  if (!url || !anonKey) return undefined
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}