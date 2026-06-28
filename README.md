# ShahY Store — متجر شاهي

> متجر إلكتروني فاخر للإكسسوارات النسائية المستوردة — شنط، محافظ، وشوزات

**الموقع المباشر:** [shah-y-store.vercel.app](https://shah-y-store.vercel.app)
**كتالوج المتجر:** [shah-y-store.vercel.app/catalog](https://shah-y-store.vercel.app/catalog)

---

## نبذة عن المتجر

ShahY Store متجر مصري فاخر متخصص في بيع الإكسسوارات النسائية المستوردة عبر الإنترنت. يجمع بين هوية بصرية راقية (ذهبي × برجندي × أسود) وتجربة تسوق سلسة تعتمد على WhatsApp للطلبات.

- **صاحبة المتجر:** شاهندة سليمان — [@shah.ystore](https://www.instagram.com/shah.ystore/) — +201015835455
- **تصميم وتطوير:** أحمد دارهوس — [@darhous](https://www.instagram.com/darhous/) — +201030002331

---

## مميزات المتجر

### 🏪 واجهة المتجر
- **صفحة رئيسية فاخرة** — شاشة تحميل متحركة، كلمات دوارة ديناميكية، خلفية بخطوط ذهبية وبرجندي
- **شبكة منتجات** مع فلترة حسب الجودة والسعر، وشارات خصم تلقائية
- **بحث فوري** مع Debounce، نتائج بالصور، وإغلاق بـ Escape
- **صفحة المنتج** — معرض صور بأسهم ومؤشرات، تنقل بالكيبورد، مشاركة المنتج
- **سلة الشراء** — localStorage، تعديل الكميات، تأكيد الطلب عبر واتساب
- **قائمة الأمنيات** — حفظ محلي، عداد في الهيدر، صفحة مستقلة
- **المشاهدة مؤخراً** — آخر 8 منتجات، شريط أفقي أسفل صفحة المنتج

### 🏷️ صفحات خاصة
- **صفحة العروض `/sale`** — تلقائية، مرتبة حسب نسبة الخصم
- **تتبع الطلبات `/track`** — 4 مراحل مرئية، بحث برقم الطلب
- **قائمة الأمنيات `/wishlist`** — إدارة المفضلة
- **كتالوج المتجر `/catalog`** — دليل شامل بكل المميزات والتصميم

### ⚙️ لوحة الإدارة
- **حماية كاملة** بـ Better Auth مع صلاحية الأدمن
- **إدارة المنتجات** — إضافة / تعديل / حذف / رفع الصور
- **إدارة الطلبات** — عرض وتحديث الحالة
- **البانرات الإعلانية** — رفع، تفعيل، ترتيب، حذف
- **إعدادات المتجر** — اسم المتجر، واتساب، سوشيال، كلمات الهيرو، إعلان علوي
- **التصنيفات / الخصومات / الشحن / المراجعات / الأدمنز**
- **لوحة إحصاءات** — إيرادات، طلبات، منتجات

### 📱 تقني
- **PWA** — قابل للتثبيت على الهاتف مع اختصارات للعروض وتتبع الطلبات
- **SEO** — Meta tags + Open Graph + Twitter Cards
- **OG Image** تلقائية 1200×630 بهوية المتجر (Edge Runtime)
- **WhatsApp مجاني** — wa.me deep links، بدون WhatsApp Business API

---

## التقنيات المستخدمة (Stack)

| التقنية | الدور |
|---------|-------|
| **Next.js 16** | App Router، Server + Client Components |
| **TypeScript** | كود مضمون النوع بالكامل |
| **Drizzle ORM** | قواعد البيانات (type-safe) |
| **Supabase PostgreSQL** | قاعدة البيانات |
| **Better Auth** | المصادقة وإدارة الجلسات |
| **Vercel** | نشر تلقائي وبيئة الإنتاج |
| **Tailwind CSS** | التصميم في لوحة الإدارة |
| **next/og** | صور OG ديناميكية (Edge) |
| **PWA** | manifest.json + Service Worker |

---

## الهوية البصرية

| العنصر | القيمة |
|--------|--------|
| الذهبي الرئيسي | `#C9A84C` |
| البرجندي | `#7B1C2E` |
| الخلفية الداكنة | `#0A0806` |
| العاجي | `#F5EFE0` |
| الذهبي الفاتح | `#F0D882` |
| الخطوط | Tajawal · Playfair Display · Cinzel · Cormorant Garamond |

---

## البدء السريع

```bash
# تثبيت الاعتمادات
npm install

# إنشاء ملف البيئة
cp .env.example .env.local
# (أضف متغيرات البيئة — انظر أدناه)

# إعداد قاعدة البيانات
npm run db:push

# تشغيل محلي
npm run dev
```

## متغيرات البيئة

```env
# التطبيق
NEXT_PUBLIC_APP_URL=http://localhost:3000

# قاعدة البيانات (Supabase)
DATABASE_URL=postgresql://...

# Better Auth
BETTER_AUTH_SECRET=your_secret_here
```

> **مهم:** لا تضع الأسرار أبداً في Git. استخدم `.env.local` محلياً وVercel Environment Variables في الإنتاج.

---

## هيكل المشروع

```
src/
  app/
    (store pages)       ← الصفحات العامة: / , /products, /sale, /track, /wishlist, /catalog
    admin/              ← لوحة الإدارة بكل صفحاتها
    api/                ← API Routes (admin + public)
  components/
    store/              ← مكونات الواجهة: Header, Footer, HeroSection, ProductGrid...
    admin/              ← مكونات الإدارة: Forms, Tables, Dashboards
  lib/
    auth/               ← Better Auth + middleware
    db/drizzle/         ← Schema + Connection
  app/opengraph-image.tsx  ← صورة OG تلقائية
  public/
    manifest.json       ← PWA manifest
    sw.js               ← Service Worker
```

---

## الأوامر المهمة

```bash
npm run dev          # تطوير محلي
npm run build        # بناء للإنتاج
npm run typecheck    # فحص الأنواع
npm run lint         # فحص الكود
npm run db:push      # مزامنة Schema مع قاعدة البيانات
npm run db:studio    # واجهة إدارة قاعدة البيانات
```

---

## قواعد الأمان

- ✅ Supabase عبر API فقط — لا SDK مباشر في الكلاينت
- ✅ الأسرار في `.env.local` فقط — لا تُكمِّت أبداً
- ✅ WhatsApp مجاني — wa.me deep links لا WhatsApp Business API
- ✅ Better Auth مع صلاحية Admin لحماية لوحة الإدارة

---

*© 2025 ShahY Store — Designed & Developed by [Ahmed Darhous](https://www.instagram.com/darhous/)*
