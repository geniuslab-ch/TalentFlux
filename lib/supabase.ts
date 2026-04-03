import { createClient } from "@supabase/supabase-js";

// Next.js : les variables NEXT_PUBLIC_ sont exposées côté client ET serveur
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client singleton (browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
