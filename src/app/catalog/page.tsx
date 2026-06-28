import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "كتالوج ShahY Store — دليل المتجر الشامل",
  description: "كتالوج شامل لجميع مميزات ومواصفات متجر ShahY Store الإلكتروني",
}

const FEATURES = [
  {
    icon: "👑",
    title: "صفحة رئيسية فاخرة",
    items: [
      "شاشة تحميل (Intro) متحركة بشعار المتجر",
      "كلمات دوارة ديناميكية قابلة للتخصيص من لوحة الإدارة",
      "خلفية متحركة بخطوط ذهبية وبرجندي",
      "أزرار الشراء والتواصل عبر واتساب",
      "مؤشر Scroll أسفل الصفحة",
    ],
  },
  {
    icon: "🛍️",
    title: "عرض المنتجات",
    items: [
      "شبكة منتجات قابلة للفلترة (حسب الجودة والسعر)",
      "صور المنتجات مع شارات الخصم التلقائية",
      "شارات الجودة: Premium / Ultra / Signature",
      "عرض السعر قبل وبعد الخصم",
      "تصفية فورية بدون إعادة تحميل الصفحة",
      "زر مسح الفلاتر",
    ],
  },
  {
    icon: "🔍",
    title: "البحث الذكي",
    items: [
      "بحث فوري بـ Debounce (250ms)",
      "نتائج مع صور المنتجات والأسعار",
      "إغلاق بمفتاح Escape أو النقر خارج النافذة",
      "رسالة واضحة عند عدم وجود نتائج",
    ],
  },
  {
    icon: "📦",
    title: "صفحة المنتج",
    items: [
      "معرض صور بأسهم تنقل ومؤشرات نقطية",
      "تنقل بالكيبورد (← →)",
      "زر إضافة للسلة مع تأثير بصري",
      "زر قائمة الأمنيات (❤️) مع مزامنة فورية",
      "قسم المنتجات المشاهدة مؤخراً",
      "مشاركة المنتج (Web Share API)",
    ],
  },
  {
    icon: "🛒",
    title: "سلة الشراء",
    items: [
      "حفظ السلة في المتصفح (localStorage)",
      "عداد المنتجات في الهيدر",
      "تعديل الكميات وحذف المنتجات",
      "ملخص الطلب مع الإجمالي",
      "تأكيد الطلب عبر WhatsApp برسالة جاهزة",
    ],
  },
  {
    icon: "❤️",
    title: "قائمة الأمنيات",
    items: [
      "حفظ المفضلة في المتصفح",
      "عداد المفضلة في الهيدر",
      "صفحة مخصصة لعرض المنتجات المحفوظة",
      "إضافة المنتج مباشرة من قائمة الأمنيات للسلة",
    ],
  },
  {
    icon: "🕐",
    title: "المنتجات المشاهدة مؤخراً",
    items: [
      "تتبع آخر 8 منتجات تم عرضها",
      "شريط أفقي قابل للتمرير أسفل صفحة المنتج",
      "يُستثنى المنتج الحالي من القائمة",
    ],
  },
  {
    icon: "🏷️",
    title: "صفحة العروض (Sale)",
    items: [
      "تظهر تلقائياً المنتجات التي لها سعر مخفوض",
      "مرتبة حسب نسبة الخصم (الأعلى أولاً)",
      "شارة النسبة المئوية على كل منتج",
      "لا تحتاج إدارة يدوية — تعمل تلقائياً",
    ],
  },
  {
    icon: "📍",
    title: "تتبع الطلبات",
    items: [
      "البحث برقم الطلب",
      "عرض مراحل الطلب بخطوات مرئية (Stepper)",
      "4 مراحل: استلام → تجهيز → شحن → تسليم",
      "عرض تفاصيل المنتجات المطلوبة",
      "زر التواصل مع الدعم عبر واتساب",
    ],
  },
  {
    icon: "🖼️",
    title: "البانرات الإعلانية",
    items: [
      "رفع بانرات بالصور",
      "ربط البانر بصفحة أو رابط خارجي",
      "تفعيل/تعطيل البانر بضغطة زر",
      "حذف البانرات غير المرغوبة",
      "ترتيب البانرات حسب الأولوية",
    ],
  },
  {
    icon: "⚙️",
    title: "لوحة الإدارة الشاملة",
    items: [
      "حماية بنظام تسجيل دخول آمن (Better Auth)",
      "إدارة المنتجات: إضافة / تعديل / حذف",
      "إدارة التصنيفات",
      "إدارة الطلبات مع تحديث الحالة",
      "إدارة المراجعات والتقييمات",
      "إدارة كودات الخصم",
      "إدارة إعدادات الشحن",
      "لوحة إحصاءات (Dashboard) مع الإيرادات والطلبات",
    ],
  },
  {
    icon: "🎛️",
    title: "إعدادات المتجر القابلة للتخصيص",
    items: [
      "اسم المتجر بالعربية",
      "رقم واتساب الطلبات",
      "روابط حسابات السوشيال ميديا",
      "كلمات صفحة البداية الدوارة",
      "نص وتفعيل الإعلان العلوي",
    ],
  },
  {
    icon: "📱",
    title: "تطبيق PWA",
    items: [
      "قابل للتثبيت على الهاتف كتطبيق",
      "اختصار مباشر لصفحة العروض",
      "اختصار مباشر لتتبع الطلبات",
      "Service Worker لسرعة التحميل",
    ],
  },
  {
    icon: "🔗",
    title: "شبكة التواصل الاجتماعي",
    items: [
      "زر واتساب عائم في كل الصفحات",
      "رسائل واتساب جاهزة ومخصصة",
      "روابط Instagram / Facebook / TikTok",
      "مجاني 100% (wa.me — بدون WhatsApp Business API)",
    ],
  },
  {
    icon: "🎨",
    title: "الهوية البصرية",
    items: [
      "نظام ألوان حصري: ذهبي / برجندي / عاجي / أسود",
      "خطوط فاخرة: Tajawal + Playfair Display + Cinzel",
      "تصميم Dark Mode بالكامل",
      "صورة OG تلقائية لمشاركة الروابط (1200×630)",
      "أيقونة المتجر (Favicon) مخصصة",
      "متجاوب مع جميع أحجام الشاشات",
    ],
  },
  {
    icon: "⚡",
    title: "الأداء والتقنية",
    items: [
      "Next.js 16 — App Router",
      "Supabase PostgreSQL عبر Drizzle ORM",
      "Vercel — نشر تلقائي",
      "TypeScript بالكامل",
      "SEO: Meta tags + Open Graph + Twitter Cards",
      "Edge Runtime للصور الديناميكية",
    ],
  },
]

export default function CatalogPage() {
  return (
    <div style={{
      background: "#0A0806", minHeight: "100vh", direction: "rtl",
      fontFamily: "Tajawal, sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;700;800&family=Cinzel:wght@400;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0A0806; }

        @keyframes shimmer {
          from { background-position: 200% center; }
          to { background-position: -200% center; }
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cat-card {
          background: #0E0C09;
          border: 1px solid rgba(201,168,76,0.12);
          border-radius: 16px;
          padding: 28px;
          transition: border-color 0.3s, box-shadow 0.3s;
          animation: fadeUp 0.5s ease both;
        }
        .cat-card:hover {
          border-color: rgba(201,168,76,0.3);
          box-shadow: 0 8px 40px rgba(201,168,76,0.08);
        }
        .cat-item::before {
          content: '✦';
          color: #C9A84C;
          font-size: 8px;
          margin-left: 8px;
          flex-shrink: 0;
        }
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
          .cat-card { break-inside: avoid; }
        }
      `}</style>

      {/* Top gradient bar */}
      <div style={{ height: 3, background: "linear-gradient(90deg, transparent, #C9A84C, #F0D882, #C9A84C, transparent)" }} />

      {/* Header */}
      <div style={{
        textAlign: "center", padding: "80px 40px 60px",
        background: "radial-gradient(ellipse 80% 50% at 50% 0%, #1C0A0A 0%, transparent 70%)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Background SVG lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          viewBox="0 0 1440 500" preserveAspectRatio="xMidYMid slice">
          <line x1="-50" y1="180" x2="800" y2="30" stroke="#7B1C2E" strokeWidth="0.6" opacity="0.12" />
          <line x1="600" y1="500" x2="1500" y2="100" stroke="#7B1C2E" strokeWidth="0.6" opacity="0.1" />
          <line x1="200" y1="-20" x2="1100" y2="380" stroke="#C9A84C" strokeWidth="0.4" opacity="0.08" />
        </svg>

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Crown logo */}
          <div style={{ animation: "float 4s ease-in-out infinite", display: "inline-block", marginBottom: 24 }}>
            <svg width="80" height="44" viewBox="0 0 120 64" fill="none">
              <path d="M5 60L18 18L38 42L60 5L82 42L102 18L115 60Z"
                stroke="url(#catGold)" strokeWidth="2.5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
              <circle cx="60" cy="5" r="4" fill="#F0D882" />
              <circle cx="38" cy="42" r="2.5" fill="#C9A84C" opacity="0.7" />
              <circle cx="82" cy="42" r="2.5" fill="#C9A84C" opacity="0.7" />
              <line x1="5" y1="60" x2="115" y2="60" stroke="url(#catGold)" strokeWidth="1.5" />
              <defs>
                <linearGradient id="catGold" x1="0" y1="0" x2="120" y2="0">
                  <stop offset="0%" stopColor="#8B6020" />
                  <stop offset="50%" stopColor="#F0D882" />
                  <stop offset="100%" stopColor="#8B6020" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div style={{ fontFamily: "Cinzel, serif", fontSize: 10, letterSpacing: "8px", color: "#C9A84C", opacity: 0.6, marginBottom: 16, textTransform: "uppercase" }}>
            OFFICIAL CATALOG — 2025
          </div>

          <h1 style={{
            fontFamily: "Playfair Display, serif", fontWeight: 700,
            fontSize: "clamp(48px, 8vw, 88px)", lineHeight: 1,
            background: "linear-gradient(135deg, #A07030, #C9A84C, #F0D882, #C9A84C, #A07030)",
            backgroundSize: "300% auto",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            animation: "shimmer 5s linear infinite",
            marginBottom: 8,
          }}>ShahY Store</h1>

          <div style={{ fontFamily: "Cinzel, serif", fontSize: 13, letterSpacing: "10px", color: "#9B8040", marginBottom: 32 }}>
            دليل المتجر الشامل
          </div>

          <div style={{ width: 120, height: 1, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", margin: "0 auto 32px" }} />

          <p style={{ fontFamily: "Tajawal, sans-serif", fontSize: 18, color: "#F5EFE0", opacity: 0.55, letterSpacing: "1px", marginBottom: 8 }}>
            أرقى الإكسسوارات النسائية المستوردة
          </p>
          <p style={{ fontFamily: "Tajawal, sans-serif", fontSize: 14, color: "#C9A84C", opacity: 0.6 }}>
            شنط · محافظ · شوزات
          </p>
        </div>
      </div>

      {/* Store owner + designer strip */}
      <div style={{
        background: "#0E0C09",
        borderTop: "1px solid rgba(201,168,76,0.08)",
        borderBottom: "1px solid rgba(201,168,76,0.08)",
        padding: "40px 40px",
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", gap: 48, flexWrap: "wrap", justifyContent: "center" }}>

          {/* Store owner */}
          <div style={{ textAlign: "center", flex: "1 1 280px" }}>
            <div style={{ fontFamily: "Cinzel, serif", fontSize: 8, letterSpacing: "4px", color: "#C9A84C", opacity: 0.5, marginBottom: 12, textTransform: "uppercase" }}>صاحبة المتجر</div>
            <div style={{ fontFamily: "Playfair Display, serif", fontSize: 28, fontWeight: 700, color: "#F5EFE0", marginBottom: 8 }}>Shahenda Souliman</div>
            <div style={{ fontFamily: "Tajawal, sans-serif", fontSize: 15, color: "#F5EFE0", opacity: 0.4, marginBottom: 16 }}>شاهندة سليمان</div>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://www.instagram.com/shah.ystore/" style={{ fontFamily: "Tajawal, sans-serif", fontSize: 13, color: "#C9A84C", textDecoration: "none", opacity: 0.7 }}>
                📸 @shah.ystore
              </a>
              <a href="https://wa.me/201015835455" style={{ fontFamily: "Tajawal, sans-serif", fontSize: 13, color: "#C9A84C", textDecoration: "none", opacity: 0.7 }}>
                💬 +201015835455
              </a>
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: 1, background: "rgba(201,168,76,0.12)", flexShrink: 0 }} />

          {/* Designer */}
          <div style={{ textAlign: "center", flex: "1 1 280px" }}>
            <div style={{ fontFamily: "Cinzel, serif", fontSize: 8, letterSpacing: "4px", color: "#C9A84C", opacity: 0.5, marginBottom: 12, textTransform: "uppercase" }}>تصميم وتطوير</div>
            <div style={{ fontFamily: "Playfair Display, serif", fontSize: 28, fontWeight: 700, color: "#F5EFE0", marginBottom: 8 }}>Ahmed Darhous</div>
            <div style={{ fontFamily: "Tajawal, sans-serif", fontSize: 15, color: "#F5EFE0", opacity: 0.4, marginBottom: 16 }}>أحمد دارهوس — مطور ومصمم</div>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://www.instagram.com/darhous/" style={{ fontFamily: "Tajawal, sans-serif", fontSize: 13, color: "#C9A84C", textDecoration: "none", opacity: 0.7 }}>
                📸 @darhous
              </a>
              <a href="https://wa.me/201030002331" style={{ fontFamily: "Tajawal, sans-serif", fontSize: 13, color: "#C9A84C", textDecoration: "none", opacity: 0.7 }}>
                💬 +201030002331
              </a>
              <a href="https://www.linkedin.com/in/darhous/" style={{ fontFamily: "Tajawal, sans-serif", fontSize: 13, color: "#C9A84C", textDecoration: "none", opacity: 0.7 }}>
                💼 LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Live URL banner */}
      <div style={{ textAlign: "center", padding: "32px 40px", borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
        <div style={{ fontFamily: "Cinzel, serif", fontSize: 9, letterSpacing: "4px", color: "#C9A84C", opacity: 0.5, marginBottom: 8 }}>الموقع المباشر</div>
        <a href="https://shah-y-store.vercel.app" target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: "Cinzel, serif", fontSize: 20, color: "#C9A84C", textDecoration: "none", letterSpacing: "2px" }}>
          shah&#8209;y&#8209;store.vercel.app
        </a>
      </div>

      {/* Features grid */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 40px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontFamily: "Cinzel, serif", fontSize: 9, letterSpacing: "6px", color: "#C9A84C", opacity: 0.5, marginBottom: 12, textTransform: "uppercase" }}>
            مميزات المتجر
          </div>
          <h2 style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 800, fontSize: 32, color: "#F5EFE0", marginBottom: 16 }}>
            كل ما يملكه ShahY Store
          </h2>
          <div style={{ width: 80, height: 1, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", margin: "0 auto" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="cat-card" style={{ animationDelay: `${i * 0.05}s` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: "rgba(201,168,76,0.08)",
                  border: "1px solid rgba(201,168,76,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, flexShrink: 0,
                }}>{f.icon}</div>
                <h3 style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 700, fontSize: 17, color: "#F5EFE0" }}>{f.title}</h3>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {f.items.map((item, j) => (
                  <li key={j} className="cat-item" style={{ display: "flex", alignItems: "flex-start", fontFamily: "Tajawal, sans-serif", fontSize: 13, color: "#F5EFE0", opacity: 0.65, lineHeight: 1.6 }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div style={{ background: "#0E0C09", borderTop: "1px solid rgba(201,168,76,0.08)", padding: "48px 40px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontFamily: "Cinzel, serif", fontSize: 9, letterSpacing: "6px", color: "#C9A84C", opacity: 0.5, marginBottom: 8, textTransform: "uppercase" }}>التقنيات المستخدمة</div>
            <h2 style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 800, fontSize: 24, color: "#F5EFE0" }}>Stack التقني</h2>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            {[
              "Next.js 16", "TypeScript", "Drizzle ORM", "Supabase PostgreSQL",
              "Better Auth", "Vercel", "Tailwind CSS", "PWA / Service Worker",
              "Edge Runtime", "next/og", "Sonner Toasts", "Framer Design",
            ].map((tech, i) => (
              <span key={i} style={{
                fontFamily: "Cinzel, serif", fontSize: 10, letterSpacing: "2px",
                color: "#C9A84C", padding: "8px 16px",
                border: "1px solid rgba(201,168,76,0.2)",
                borderRadius: 6, background: "rgba(201,168,76,0.04)",
              }}>{tech}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Design system */}
      <div style={{ padding: "48px 40px", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontFamily: "Cinzel, serif", fontSize: 9, letterSpacing: "6px", color: "#C9A84C", opacity: 0.5, marginBottom: 8, textTransform: "uppercase" }}>نظام التصميم</div>
          <h2 style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 800, fontSize: 24, color: "#F5EFE0" }}>الهوية البصرية</h2>
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 32 }}>
          {[
            { name: "ذهبي فاخر", hex: "#C9A84C", label: "#C9A84C" },
            { name: "برجندي", hex: "#7B1C2E", label: "#7B1C2E" },
            { name: "أسود العاج", hex: "#0A0806", label: "#0A0806" },
            { name: "عاجي", hex: "#F5EFE0", label: "#F5EFE0" },
            { name: "ذهبي فاتح", hex: "#F0D882", label: "#F0D882" },
          ].map((c, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                width: 64, height: 64, borderRadius: 12,
                background: c.hex,
                border: "1px solid rgba(201,168,76,0.15)",
                margin: "0 auto 8px",
                boxShadow: `0 4px 20px ${c.hex}40`,
              }} />
              <div style={{ fontFamily: "Tajawal, sans-serif", fontSize: 12, color: "#F5EFE0", opacity: 0.7 }}>{c.name}</div>
              <div style={{ fontFamily: "Cinzel, serif", fontSize: 9, color: "#C9A84C", opacity: 0.5, letterSpacing: "1px" }}>{c.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { name: "Tajawal", use: "النصوص العربية", sample: "أناقة لا مثيل لها" },
            { name: "Playfair Display", use: "العناوين الكبرى", sample: "ShahY Store" },
            { name: "Cinzel", use: "التسميات والشعارات", sample: "LUXURY" },
          ].map((f, i) => (
            <div key={i} style={{
              flex: "1 1 200px", padding: "20px 24px",
              background: "#0E0C09", border: "1px solid rgba(201,168,76,0.1)", borderRadius: 12, textAlign: "center",
            }}>
              <div style={{ fontFamily: "Cinzel, serif", fontSize: 8, letterSpacing: "3px", color: "#C9A84C", opacity: 0.5, marginBottom: 8 }}>{f.name}</div>
              <div style={{ fontSize: 20, color: "#F5EFE0", marginBottom: 6, fontFamily: f.name }}>{f.sample}</div>
              <div style={{ fontFamily: "Tajawal, sans-serif", fontSize: 11, color: "#F5EFE0", opacity: 0.35 }}>{f.use}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom footer */}
      <div style={{
        background: "#060504",
        borderTop: "1px solid #151210",
        padding: "32px 40px",
        textAlign: "center",
      }}>
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", marginBottom: 24 }} />
        <p style={{ fontFamily: "Cinzel, serif", fontSize: 8, letterSpacing: "4px", color: "#3a3530", textTransform: "uppercase" }}>
          © 2025 ShahY Store — Designed &amp; Developed by Ahmed Darhous — All rights reserved
        </p>
      </div>
    </div>
  )
}
