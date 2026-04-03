import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Client factice — absorbe tous les appels, ne crashe jamais
function makeMockClient(): SupabaseClient {
  const warn = (method: string) => {
    console.warn(`[TalentFlux] Supabase.${method}() ignoré — variables NEXT_PUBLIC_ manquantes`);
    return Promise.resolve({ data: null, error: { message: "Supabase non configuré" } });
  };
  const mockChain: any = new Proxy({}, {
    get: (_t, prop) => {
      if (prop === "then") return undefined; // pas une Promise
      if (["eq","neq","gt","lt","order","limit","single","maybeSingle"].includes(String(prop)))
        return () => mockChain;
      return () => warn(String(prop));
    },
  });
  return {
    from: (_table: string) => mockChain,
    storage: {
      from: (_bucket: string) => ({
        upload: () => warn("storage.upload"),
        getPublicUrl: () => ({ data: { publicUrl: "" } }),
      }),
    },
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signIn: () => warn("auth.signIn"),
      signOut: () => warn("auth.signOut"),
    },
  } as unknown as SupabaseClient;
}

function createSafeClient(): SupabaseClient {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key || url.trim() === "" || key.trim() === "") {
      if (typeof window !== "undefined") {
        console.error(
          "[TalentFlux] ⚠️ Supabase non configuré\n" +
          "→ Vercel → Settings → Environment Variables\n" +
          "→ Ajouter NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY\n" +
          "→ Puis Redeploy"
        );
      }
      return makeMockClient();
    }

    return createClient(url.trim(), key.trim());
  } catch (err) {
    console.error("[TalentFlux] createClient() a crashé :", err);
    return makeMockClient();
  }
}

export const supabase = createSafeClient();
