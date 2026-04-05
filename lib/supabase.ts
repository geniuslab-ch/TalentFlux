const getUrl = () => process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const getKey = () => process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const headers = () => ({ "apikey": getKey(), "Authorization": `Bearer ${getKey()}`, "Content-Type": "application/json" });
const fromTable = (table: string) => ({
  insert: async (rows: object | object[]) => {
    const body = Array.isArray(rows) ? rows[0] : rows;
    try {
      const res = await fetch(`${getUrl()}/rest/v1/${table}`, { method: "POST", headers: { ...headers(), "Prefer": "return=minimal" }, body: JSON.stringify(body) });
      if (!res.ok) return { data: null, error: { message: await res.text(), code: String(res.status) } };
      return { data: null, error: null };
    } catch (e: any) { return { data: null, error: { message: e.message } }; }
  },
  select: async (columns = "*") => {
    try {
      const res = await fetch(`${getUrl()}/rest/v1/${table}?select=${columns}`, { headers: headers() });
      if (!res.ok) return { data: null, error: { message: await res.text() } };
      return { data: await res.json(), error: null };
    } catch (e: any) { return { data: null, error: { message: e.message } }; }
  },
  update: (payload: object) => ({ eq: async (col: string, val: any) => {
    try {
      const res = await fetch(`${getUrl()}/rest/v1/${table}?${col}=eq.${val}`, { method: "PATCH", headers: { ...headers(), "Prefer": "return=minimal" }, body: JSON.stringify(payload) });
      if (!res.ok) return { data: null, error: { message: await res.text() } };
      return { data: null, error: null };
    } catch (e: any) { return { data: null, error: { message: e.message } }; }
  }}),
  order: (_col: string) => fromTable(table),
  eq: (_col: string, _val: any) => fromTable(table),
});
const fromStorage = (bucket: string) => ({
  upload: async (path: string, file: Blob | File, opts?: { contentType?: string }) => {
    try {
      const res = await fetch(`${getUrl()}/storage/v1/object/${bucket}/${path}`, { method: "POST", headers: { "apikey": getKey(), "Authorization": `Bearer ${getKey()}`, ...(opts?.contentType ? { "Content-Type": opts.contentType } : {}) }, body: file });
      if (!res.ok) return { data: null, error: { message: await res.text() } };
      return { data: { path }, error: null };
    } catch (e: any) { return { data: null, error: { message: e.message } }; }
  },
  getPublicUrl: (path: string) => ({ data: { publicUrl: `${getUrl()}/storage/v1/object/public/${bucket}/${path}` } }),
});
export const supabase = {
  from: fromTable,
  storage: { from: fromStorage },
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: async (_c: any) => ({ data: null, error: null }),
    signOut: async () => ({ error: null }),
  },
};
