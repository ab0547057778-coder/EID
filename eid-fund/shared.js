// Shared constants for both pages
window.EID = (function () {
  const MONTHS = [["nov", "نوفمبر"], ["dec", "ديسمبر"], ["jan", "يناير"], ["feb", "فبراير"], ["mar", "مارس"]];
  const MIN = 25;
  const ADMIN_WA = "966566144055";
  const METHODS = [
    { key: "stc", name: "STC Pay", color: "#5b1a8f", rows: [["رقم الجوال", "0566144055"]] },
    { key: "barq", name: "برق", color: "#7a3fd0", rows: [["رقم الجوال", "0566144055"]] },
    { key: "rajhi", name: "مصرف الراجحي", color: "#2a63c9", rows: [["الآيبان", "SA1680000664608016104629"], ["رقم الحساب", "664000010006086104629"]] },
    { key: "riyad", name: "بنك الرياض", color: "#1f8a5a", rows: [["الآيبان", "SA0320000003542500739940"], ["رقم الحساب", "3542500739940"]] },
    { key: "ahli", name: "البنك الأهلي", color: "#2aa36b", rows: [["الآيبان", "SA7810000011100097279601"], ["رقم الحساب", "11100097279601"]] },
  ];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmt = (n) => Number(n || 0).toLocaleString("ar-SA");
  const curMonth = () => ({ 10: "nov", 11: "dec", 0: "jan", 1: "feb", 2: "mar" }[new Date().getMonth()] || "nov");
  const monthName = (k) => (MONTHS.find((m) => m[0] === k) || ["", ""])[1];
  function flash(btn, t) {
    const o = btn.dataset.label || btn.textContent;
    btn.dataset.label = o;
    btn.textContent = t;
    btn.classList.add("done");
    setTimeout(() => { btn.textContent = o; btn.classList.remove("done"); }, 1600);
  }
  async function copyText(text, btn) {
    try { await navigator.clipboard.writeText(text); flash(btn, "تم النسخ"); }
    catch (e) {
      const code = btn.parentElement.querySelector("code");
      if (code) { const r = document.createRange(); r.selectNodeContents(code); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
      flash(btn, "محدد، انسخه");
    }
  }
  function hero(extra) {
    return `<header class="hero"><div class="wrap ${extra ? "wide" : ""}">
      <div class="topbar"><span class="eyebrow">مبادرة العائلة · ١٤٤٧هـ</span>${extra || ""}</div>
      <h1>صندوق <span>العيد</span></h1>
      <div class="facts"><span>جمعة ثاني أيام عيد الفطر</span><span>٢٤ ساعة مع بعض</span><span>نوفمبر ← مارس</span><span>الحد الأدنى ${fmt(MIN)} ريال شهرياً</span></div>
    </div></header>`;
  }
  return { MONTHS, MIN, ADMIN_WA, METHODS, esc, fmt, curMonth, monthName, flash, copyText, hero };
})();
