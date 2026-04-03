import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (typeof window !== "undefined" && (!supabaseUrl || !supabaseAnonKey)) {
  console.error(
    "[TalentFlux] ⚠️ Variables Supabase manquantes.\n" +
    "Vérifier Vercel → Settings → Environment Variables :\n" +
    "  NEXT_PUBLIC_SUPABASE_URL =", supabaseUrl || "❌ vide\n",
    " NEXT_PUBLIC_SUPABASE_ANON_KEY =", supabaseAnonKey ? "✅" : "❌ vide"
  );
}

// ?? "" évite le crash si les vars sont undefined
// Le vrai crash se produira uniquement lors d'un appel DB
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);
