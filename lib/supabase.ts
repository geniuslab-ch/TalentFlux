import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Storage no-op : évite tout accès à localStorage côté serveur (Node.js)
// Safe pour SSR, CSR, et Edge Functions
const noopStorage = {
  getItem: (_key: string): string | null => null,
  setItem: (_key: string, _value: string): void => {},
  removeItem: (_key: string): void => {},
};

export const supabase = createClient(
  url || "https://placeholder.supabase.co",
  key || "placeholder-anon-key",
  {
    auth: {
      persistSession:      false, // pas de stockage de session
      autoRefreshToken:    false, // pas de refresh automatique
      detectSessionInUrl:  false, // pas de lecture de l'URL
      storage:             noopStorage, // JAMAIS localStorage
    },
  }
);
