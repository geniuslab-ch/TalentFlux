import { createClient } from "@supabase/supabase-js";

// URL hardcodée en fallback — visible dans les network requests de toute façon
const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://aaknzniigmmrdjlakiry.supabase.co").trim();

// JWT minimal valide pour éviter le crash à l'init si la clé est vide
// Supabase valide la signature uniquement sur les vrais appels API, pas à l'init
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZha2UiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYwMDAwMDAwMCwiZXhwIjo5OTk5OTk5OTk5fQ.ok";
const key = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || fallbackKey).trim();

export const supabase = createClient(url, key);
