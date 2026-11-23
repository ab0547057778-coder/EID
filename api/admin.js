// Admin only: read/write names + monthly amounts. Requires ADMIN_PASSWORD env var.
import crypto from "node:crypto";
import { load, save } from "./_store.js";

const MONTHS = ["nov", "dec", "jan", "feb", "mar"];

function authorized(req) {
  const expected = process.env.ADMIN_PASSWORD || "";
  const given = String(req.headers["x-admin-password"] || "");
  if (!expected) return false;
  const a = crypto.createHash("sha256").update(given).digest();
  const b = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

function clean(body) {
  if (!body || typeof body !== "object" || !Array.isArray(body.names)) return null;
  if (body.names.length > 500) return null;
  const names = [];
  const seen = new Set();
  for (const n of body.names) {
    const id = String(n?.id || "").slice(0, 40);
    const name = String(n?.name || "").trim().slice(0, 80);
    if (!id || !name || seen.has(id)) continue;
    seen.add(id);
    names.push({ id, name });
  }
  const pay = {};
  for (const { id } of names) {
    const src = (body.pay && body.pay[id]) || {};
    const row = {};
    for (const m of MONTHS) {
      const v = Number(src[m]);
      if (src[m] !== undefined && src[m] !== "" && Number.isFinite(v) && v >= 0 && v <= 100000) row[m] = v;
    }
    pay[id] = row;
  }
  return { names, pay };
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (!authorized(req)) return res.status(401).json({ error: "unauthorized" });
  try {
    if (req.method === "GET") return res.status(200).json(await load());
    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body;
      const data = clean(body);
      if (!data) return res.status(400).json({ error: "bad_request" });
      await save(data);
      return res.status(200).json({ ok: true });
    }
    return res.status(405).json({ error: "method_not_allowed" });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
