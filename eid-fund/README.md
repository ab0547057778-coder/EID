# صندوق العيد

- `/` صفحة الأفراد: يختار اسمه والمبلغ ويشوف طرق التحويل.
- `/admin` صفحة المسؤول: محمية بكلمة مرور، فيها الأسماء وجدول المبالغ الشهرية.

الأفراد ما يوصلهم إلا قائمة الأسماء (`/api/names`). المبالغ ما تطلع إلا بكلمة مرور المسؤول (`/api/admin`).

## خطوات النشر على Vercel

1. ارفع المجلد على GitHub واعمل له Import في Vercel (Framework: Other، بدون Build Command).
2. من صفحة المشروع في Vercel: **Storage → Marketplace → Upstash for Redis → Create**، واربطه بالمشروع.
   هذا يضيف تلقائياً `KV_REST_API_URL` و `KV_REST_API_TOKEN`.
3. من **Settings → Environment Variables** أضف:
   - `ADMIN_PASSWORD` = كلمة مرور قوية تختارها.
4. اعمل **Redeploy**.
5. ادخل `/admin` وأضف الأسماء واضغط حفظ.

شارك رابط الصفحة الرئيسية فقط مع الأفراد.
