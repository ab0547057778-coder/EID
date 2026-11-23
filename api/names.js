// Public: returns participant names only (no amounts)
import { load } from "./_store.js";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "method_not_allowed" });
  try {
    const { names } = await load();
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ names: names.map((n) => ({ id: n.id, name: n.name })) });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
