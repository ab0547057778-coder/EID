// Shared storage helper (Upstash Redis over REST — added from Vercel Marketplace)
const KEY = "eid-fund:data";

function creds() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("storage_not_configured");
  return { url, token };
}

export async function load() {
  const { url, token } = creds();
  const r = await fetch(`${url}/get/${encodeURIComponent(KEY)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!r.ok) throw new Error("storage_read_failed");
  const { result } = await r.json();
  if (!result) return { names: [], pay: {} };
  try {
    const d = JSON.parse(result);
    return { names: Array.isArray(d.names) ? d.names : [], pay: d.pay && typeof d.pay === "object" ? d.pay : {} };
  } catch {
    return { names: [], pay: {} };
  }
}

export async function save(data) {
  const { url, token } = creds();
  const r = await fetch(`${url}/set/${encodeURIComponent(KEY)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error("storage_write_failed");
}
