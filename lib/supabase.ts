let _supabase: any = null;

function getClient() {
  if (_supabase) return _supabase;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (url && key && url.startsWith("https://") && key.startsWith("eyJ")) {
    try {
      const { createClient } = require("@supabase/supabase-js");
      _supabase = createClient(url, key);
      return _supabase;
    } catch (e) {
      console.error("[TalentFlux] createClient failed:", e);
    }
  }

  const noop = () => Promise.resolve({ data: null, error: { message: "Supabase non configuré" } });
  const chain: any = new Proxy({}, {
    get: (_t, prop) => {
      if (prop === "then") return undefined;
      return () => chain;
    },
  });
  _supabase = {
    from: () => chain,
    rpc: noop,
    storage: { from: () => ({ upload: noop, getPublicUrl: () => ({ data: { publicUrl: "" } }) }) },
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      signInWithPassword: noop,
      signOut: noop,
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
  };
  return _supabase;
}

export const supabase = new Proxy({} as any, {
  get: (_t, prop) => {
    const client = getClient();
    const val = client[prop];
    return typeof val === "function" ? val.bind(client) : val;
  },
});
