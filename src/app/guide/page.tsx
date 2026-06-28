"use client"
import { useEffect } from "react"

export default function GuidePage() {
  useEffect(() => {
    document.title = "دليل الاستخدام — ShahY Store"
  }, [])

  return (
    <div className="guide-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;700;800;900&family=Cinzel:wght@400;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .guide-root {
          font-family: 'Tajawal', sans-serif;
          background: #0A0806;
          color: #F5EFE0;
          direction: rtl;
          min-height: 100vh;
        }

        /* ── PRINT BUTTON ── */
        .pdf-fab {
          position: fixed;
          bottom: 32px;
          left: 32px;
          z-index: 9999;
          background: linear-gradient(135deg, #C9A84C, #F0D882);
          color: #0A0806;
          border: none;
          border-radius: 50px;
          padding: 14px 28px;
          font-family: 'Tajawal', sans-serif;
          font-weight: 800;
          font-size: 15px;
          cursor: pointer;
          box-shadow: 0 8px 32px rgba(201,168,76,0.4);
          display: flex;
          align-items: center;
          gap: 10px;
          transition: transform 0.2s, box-shadow 0.2s;
          letter-spacing: 0.5px;
        }
        .pdf-fab:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(201,168,76,0.55);
        }

        /* ── SCREEN LAYOUT ── */
        .g-cover {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 80px 40px;
          background: radial-gradient(ellipse 80% 60% at 50% 20%, #1C0A0A 0%, #0A0806 70%);
          position: relative;
          overflow: hidden;
        }
        .g-section {
          max-width: 860px;
          margin: 0 auto;
          padding: 64px 40px;
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }
        .g-section:last-child { border-bottom: none; }

        .g-section-title {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
        }
        .g-num {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cinzel', serif;
          font-size: 18px;
          color: #C9A84C;
          flex-shrink: 0;
        }
        .g-section-title h2 {
          font-size: 26px;
          font-weight: 800;
          color: #F5EFE0;
        }
        .g-section-title .g-emoji {
          font-size: 28px;
        }

        .g-step {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
          align-items: flex-start;
        }
        .g-step-num {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #C9A84C;
          color: #0A0806;
          font-weight: 800;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .g-step-body {
          flex: 1;
        }
        .g-step-body strong {
          display: block;
          color: #F5EFE0;
          font-weight: 700;
          font-size: 15px;
          margin-bottom: 4px;
        }
        .g-step-body p {
          color: rgba(245,239,224,0.55);
          font-size: 14px;
          line-height: 1.7;
        }
        .g-step-body code {
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 4px;
          padding: 1px 8px;
          font-family: monospace;
          font-size: 13px;
          color: #C9A84C;
          direction: ltr;
          display: inline-block;
        }

        .g-tip {
          background: rgba(201,168,76,0.06);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 10px;
          padding: 16px 20px;
          margin: 20px 0;
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .g-tip-icon { font-size: 20px; flex-shrink: 0; }
        .g-tip-body { font-size: 13px; color: rgba(245,239,224,0.65); line-height: 1.7; }
        .g-tip-body strong { color: #C9A84C; display: block; margin-bottom: 2px; }

        .g-warn {
          background: rgba(123,28,46,0.08);
          border: 1px solid rgba(123,28,46,0.25);
          border-radius: 10px;
          padding: 16px 20px;
          margin: 20px 0;
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .g-warn-body { font-size: 13px; color: rgba(245,239,224,0.6); line-height: 1.7; }
        .g-warn-body strong { color: #E05A70; display: block; margin-bottom: 2px; }

        .g-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent);
          margin: 28px 0;
        }

        .g-subsection {
          margin-bottom: 36px;
        }
        .g-subsection-title {
          font-size: 17px;
          font-weight: 700;
          color: #C9A84C;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .g-subsection-title::before {
          content: '';
          display: inline-block;
          width: 3px;
          height: 18px;
          background: #C9A84C;
          border-radius: 2px;
        }

        .g-field-row {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .g-field-label {
          font-weight: 700;
          color: #F5EFE0;
          font-size: 14px;
          min-width: 160px;
          flex-shrink: 0;
        }
        .g-field-desc {
          color: rgba(245,239,224,0.5);
          font-size: 13px;
          line-height: 1.6;
        }

        .g-badge {
          display: inline-block;
          padding: 2px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          margin-right: 6px;
        }
        .g-badge-gold { background: rgba(201,168,76,0.15); color: #C9A84C; border: 1px solid rgba(201,168,76,0.3); }
        .g-badge-red  { background: rgba(123,28,46,0.15);  color: #E05A70; border: 1px solid rgba(123,28,46,0.3); }
        .g-badge-green{ background: rgba(37,211,102,0.1);  color: #25D366; border: 1px solid rgba(37,211,102,0.25);}

        .g-url-box {
          background: #0E0C09;
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 8px;
          padding: 12px 18px;
          margin: 12px 0;
          font-family: monospace;
          font-size: 14px;
          color: #C9A84C;
          direction: ltr;
          text-align: left;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .g-url-box .g-url-icon { font-size: 16px; }

        .g-toc-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px dashed rgba(201,168,76,0.1);
          text-decoration: none;
          color: rgba(245,239,224,0.6);
          font-size: 15px;
          transition: color 0.2s;
        }
        .g-toc-item:hover { color: #C9A84C; }
        .g-toc-num {
          font-family: 'Cinzel', serif;
          font-size: 12px;
          color: #C9A84C;
          opacity: 0.6;
          min-width: 24px;
        }

        /* ── PRINT STYLES ── */
        @media print {
          @page {
            size: A4;
            margin: 18mm 16mm 18mm 16mm;
          }
          .pdf-fab { display: none !important; }
          .guide-root {
            background: white !important;
            color: #1a1612 !important;
          }
          .g-cover {
            background: white !important;
            min-height: auto !important;
            padding: 40px 0 !important;
            page-break-after: always;
          }
          .g-section {
            page-break-inside: avoid;
            padding: 32px 0;
            border-bottom: 1px solid #e8e0d0 !important;
          }
          .g-step-body strong { color: #1a1612 !important; }
          .g-step-body p { color: #555 !important; }
          .g-step-body code {
            background: #f5f0e8 !important;
            border-color: #C9A84C !important;
            color: #8B6820 !important;
          }
          .g-section-title h2 { color: #1a1612 !important; }
          .g-tip {
            background: #fdf8ee !important;
            border-color: #C9A84C !important;
          }
          .g-tip-body { color: #555 !important; }
          .g-warn {
            background: #fdf0f2 !important;
            border-color: #E05A70 !important;
          }
          .g-warn-body { color: #555 !important; }
          .g-url-box {
            background: #f5f0e8 !important;
            border-color: #C9A84C !important;
          }
          .g-field-desc { color: #666 !important; }
          .g-subsection-title { color: #8B6820 !important; }
          .g-subsection-title::before { background: #8B6820 !important; }
          .g-toc-item { color: #444 !important; border-color: #e0d8c8 !important; }
          .g-toc-num { color: #8B6820 !important; }
          .g-num {
            background: #f5f0e8 !important;
            border-color: #C9A84C !important;
          }
          .g-divider { background: #e8e0d0 !important; }
          .g-badge-gold { background: #f5f0e8 !important; color: #8B6820 !important; }
          .g-badge-red  { background: #fdf0f2 !important; color: #c0394f !important; }
          .g-badge-green{ background: #f0fdf4 !important; color: #16a34a !important; }
          h1, h2, h3 { color: #1a1612 !important; }
          p, span, li { color: #444 !important; }
        }

        @keyframes shimmer {
          from { background-position: 200% center; }
          to { background-position: -200% center; }
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      {/* ── PDF FAB ── */}
      <button className="pdf-fab" onClick={() => window.print()}>
        <span>⬇</span>
        تحميل PDF
      </button>

      {/* ══════════════════════════════════════════
          COVER PAGE
      ══════════════════════════════════════════ */}
      <div className="g-cover">
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <line x1="-50" y1="200" x2="800" y2="50" stroke="#7B1C2E" strokeWidth="0.6" opacity="0.12" />
          <line x1="600" y1="900" x2="1500" y2="300" stroke="#7B1C2E" strokeWidth="0.6" opacity="0.1" />
          <line x1="200" y1="-20" x2="1100" y2="600" stroke="#C9A84C" strokeWidth="0.4" opacity="0.08" />
          <line x1="-80" y1="600" x2="900" y2="350" stroke="#C9A84C" strokeWidth="0.3" opacity="0.06" />
        </svg>

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Crown */}
          <div style={{ animation: "float 4s ease-in-out infinite", display: "inline-block", marginBottom: 28 }}>
            <svg width="96" height="52" viewBox="0 0 120 64" fill="none">
              <path d="M5 60L18 18L38 42L60 5L82 42L102 18L115 60Z"
                stroke="url(#guideGold)" strokeWidth="2.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
              <circle cx="60" cy="5" r="4" fill="#F0D882"/>
              <circle cx="38" cy="42" r="2.5" fill="#C9A84C" opacity="0.7"/>
              <circle cx="82" cy="42" r="2.5" fill="#C9A84C" opacity="0.7"/>
              <line x1="5" y1="60" x2="115" y2="60" stroke="url(#guideGold)" strokeWidth="1.5"/>
              <defs>
                <linearGradient id="guideGold" x1="0" y1="0" x2="120" y2="0">
                  <stop offset="0%" stopColor="#8B6020"/>
                  <stop offset="50%" stopColor="#F0D882"/>
                  <stop offset="100%" stopColor="#8B6020"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div style={{ fontFamily: "Cinzel, serif", fontSize: 10, letterSpacing: "8px", color: "#C9A84C", opacity: 0.6, marginBottom: 20 }}>
            OFFICIAL USER GUIDE — 2025
          </div>

          <h1 style={{
            fontFamily: "Playfair Display, serif", fontSize: "clamp(52px, 9vw, 96px)", fontWeight: 700,
            lineHeight: 1, letterSpacing: "-1px",
            background: "linear-gradient(135deg, #A07030, #C9A84C, #F0D882, #C9A84C, #A07030)",
            backgroundSize: "300% auto",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            animation: "shimmer 5s linear infinite",
            marginBottom: 12,
          }}>ShahY Store</h1>

          <div style={{ fontFamily: "Cinzel, serif", fontSize: 14, letterSpacing: "8px", color: "#9B8040", marginBottom: 40 }}>
            دليل الاستخدام الشامل
          </div>

          <div style={{ width: 120, height: 1, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", margin: "0 auto 40px" }}/>

          <div style={{ display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Cinzel, serif", fontSize: 8, letterSpacing: "4px", color: "#C9A84C", opacity: 0.5, marginBottom: 8 }}>صاحبة المتجر</div>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: 22, color: "#F5EFE0" }}>Shahenda Souliman</div>
            </div>
            <div style={{ width: 1, background: "rgba(201,168,76,0.15)" }}/>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Cinzel, serif", fontSize: 8, letterSpacing: "4px", color: "#C9A84C", opacity: 0.5, marginBottom: 8 }}>تصميم وتطوير</div>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: 22, color: "#F5EFE0" }}>Ahmed Darhous</div>
            </div>
          </div>

          <div className="g-url-box" style={{ justifyContent: "center", maxWidth: 400, margin: "0 auto" }}>
            <span className="g-url-icon">🌐</span>
            shah-y-store.vercel.app
          </div>

          <p style={{ fontFamily: "Tajawal, sans-serif", fontSize: 13, color: "rgba(245,239,224,0.25)", marginTop: 48, letterSpacing: "1px" }}>
            2025 — النسخة الأولى
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          TABLE OF CONTENTS
      ══════════════════════════════════════════ */}
      <div className="g-section" id="toc">
        <div className="g-section-title">
          <div className="g-num">📋</div>
          <h2>فهرس المحتويات</h2>
        </div>
        {[
          [1, "الدخول إلى لوحة الإدارة", "login"],
          [2, "لوحة الإحصاءات (Dashboard)", "dashboard"],
          [3, "إدارة المنتجات", "products"],
          [4, "إدارة التصنيفات", "categories"],
          [5, "إدارة الطلبات", "orders"],
          [6, "البانرات الإعلانية", "banners"],
          [7, "أكواد الخصم", "discounts"],
          [8, "إعدادات الشحن", "shipping"],
          [9, "إعدادات المتجر", "settings"],
          [10, "التقييمات والمراجعات", "reviews"],
          [11, "إدارة المسؤولين", "admins"],
          [12, "نصائح وتنبيهات مهمة", "tips"],
          [13, "معلومات الدعم الفني", "support"],
        ].map(([n, title, id]) => (
          <a key={id as string} href={`#${id}`} className="g-toc-item">
            <span className="g-toc-num">{n}.</span>
            <span>{title as string}</span>
          </a>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          1. LOGIN
      ══════════════════════════════════════════ */}
      <div className="g-section" id="login">
        <div className="g-section-title">
          <div className="g-num">1</div>
          <span className="g-emoji">🔐</span>
          <h2>الدخول إلى لوحة الإدارة</h2>
        </div>

        <div className="g-step">
          <div className="g-step-num">1</div>
          <div className="g-step-body">
            <strong>افتحي المتصفح</strong>
            <p>استخدمي أي متصفح (Chrome / Safari / Firefox) وافتحي الرابط التالي:</p>
            <div className="g-url-box"><span>🔗</span> shah-y-store.vercel.app/admin</div>
          </div>
        </div>

        <div className="g-step">
          <div className="g-step-num">2</div>
          <div className="g-step-body">
            <strong>صفحة تسجيل الدخول</strong>
            <p>هتظهر لك صفحة فيها خانتين: <strong>الإيميل</strong> و<strong>كلمة المرور</strong>. أدخلي البيانات اللي اتبعتهالك من المطور.</p>
          </div>
        </div>

        <div className="g-step">
          <div className="g-step-num">3</div>
          <div className="g-step-body">
            <strong>اضغطي "تسجيل الدخول"</strong>
            <p>بعد الضغط هتدخلي تلقائياً للوحة التحكم.</p>
          </div>
        </div>

        <div className="g-tip">
          <span className="g-tip-icon">💡</span>
          <div className="g-tip-body">
            <strong>نصيحة</strong>
            لو نسيتي كلمة المرور، تواصلي مع المطور أحمد درهوس على واتساب: +201030002331
          </div>
        </div>

        <div className="g-warn">
          <span>⚠️</span>
          <div className="g-warn-body">
            <strong>تنبيه أمان</strong>
            لا تشاركي البيانات مع أحد غير الأشخاص اللي بتثقي فيهم. ولو حسيتي أن حد دخل على اللوحة بدونك، تواصلي مع المطور فوراً.
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          2. DASHBOARD
      ══════════════════════════════════════════ */}
      <div className="g-section" id="dashboard">
        <div className="g-section-title">
          <div className="g-num">2</div>
          <span className="g-emoji">📊</span>
          <h2>لوحة الإحصاءات</h2>
        </div>

        <p style={{ color: "rgba(245,239,224,0.55)", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
          بعد الدخول، أول حاجة هتشوفيها هي لوحة الإحصاءات. دي نظرة عامة سريعة على المتجر.
        </p>

        {[
          ["إجمالي المبيعات", "الرقم اللي دخل المتجر في الفترة المحددة"],
          ["عدد الطلبات", "كام طلب اتعمل"],
          ["المنتجات النشطة", "عدد المنتجات الظاهرة على المتجر"],
          ["أحدث الطلبات", "آخر 5 طلبات لحد دلوقتي"],
        ].map(([label, desc], i) => (
          <div key={i} className="g-field-row">
            <span className="g-field-label">{label}</span>
            <span className="g-field-desc">{desc}</span>
          </div>
        ))}

        <div className="g-divider"/>

        <p style={{ color: "rgba(245,239,224,0.45)", fontSize: 13, lineHeight: 1.7 }}>
          من القايمة الجانبية على اليسار هتلاقي كل أقسام لوحة التحكم — اضغطي على أي قسم للدخول إليه.
        </p>
      </div>

      {/* ══════════════════════════════════════════
          3. PRODUCTS
      ══════════════════════════════════════════ */}
      <div className="g-section" id="products">
        <div className="g-section-title">
          <div className="g-num">3</div>
          <span className="g-emoji">🛍️</span>
          <h2>إدارة المنتجات</h2>
        </div>

        {/* 3A: ADD */}
        <div className="g-subsection">
          <div className="g-subsection-title">إضافة منتج جديد</div>

          <div className="g-step">
            <div className="g-step-num">1</div>
            <div className="g-step-body">
              <strong>افتحي صفحة المنتجات</strong>
              <p>من القايمة الجانبية اضغطي على <code>المنتجات</code> ← ثم اضغطي زر <code>+ منتج جديد</code> في أعلى الصفحة.</p>
            </div>
          </div>

          <div className="g-step">
            <div className="g-step-num">2</div>
            <div className="g-step-body">
              <strong>أدخلي اسم المنتج</strong>
              <p>اكتبي اسم المنتج بالعربي بشكل واضح — مثلاً: <em>"شنطة جلد ليزر بني"</em></p>
            </div>
          </div>

          <div className="g-step">
            <div className="g-step-num">3</div>
            <div className="g-step-body">
              <strong>اختاري التصنيف</strong>
              <p>اختاري من القايمة: شنط / محافظ / شوزات — لازم تحددي تصنيف واحد على الأقل.</p>
            </div>
          </div>

          <div className="g-step">
            <div className="g-step-num">4</div>
            <div className="g-step-body">
              <strong>حددي السعر ودرجة الجودة</strong>
              <p>في خانة <strong>السعر</strong> اكتبي السعر الحالي بالجنيه. وفي <strong>السعر قبل الخصم</strong> لو المنتج عليه خصم اكتبي السعر الأصلي (الأعلى) — ده هيظهر خط عليه تلقائياً ويظهر نسبة الخصم.</p>
              <p style={{ marginTop: 8 }}>درجة الجودة:</p>
              <p><span className="g-badge g-badge-gold">Premium</span> الجودة العالية</p>
              <p style={{ marginTop: 4 }}><span className="g-badge g-badge-gold">Ultra</span> فوق الممتاز</p>
              <p style={{ marginTop: 4 }}><span className="g-badge g-badge-gold">Signature</span> حصري ومميز</p>
            </div>
          </div>

          <div className="g-step">
            <div className="g-step-num">5</div>
            <div className="g-step-body">
              <strong>اكتبي الوصف</strong>
              <p>اكتبي وصف المنتج — المقاسات، المواد، اللون، الحجم. كل تفصيلة بتساعد العميلة تقرر.</p>
            </div>
          </div>

          <div className="g-step">
            <div className="g-step-num">6</div>
            <div className="g-step-body">
              <strong>ارفعي الصور</strong>
              <p>اضغطي على <strong>"إضافة صورة"</strong> — ارفعي أول صورة (هي اللي هتظهر في الشبكة). ممكن ترفعي أكتر من صورة لمعرض الصور الداخلي.</p>
            </div>
          </div>

          <div className="g-step">
            <div className="g-step-num">7</div>
            <div className="g-step-body">
              <strong>احفظي المنتج</strong>
              <p>اضغطي <code>حفظ المنتج</code> — هيظهر فوراً على الموقع.</p>
            </div>
          </div>

          <div className="g-tip">
            <span className="g-tip-icon">📸</span>
            <div className="g-tip-body">
              <strong>نصيحة الصور</strong>
              استخدمي صور بخلفية بيضا أو بيج وإضاءة كويسة — ده بيخلي المنتج يبان أحلى بكتير.
            </div>
          </div>
        </div>

        <div className="g-divider"/>

        {/* 3B: EDIT */}
        <div className="g-subsection">
          <div className="g-subsection-title">تعديل منتج موجود</div>

          <div className="g-step">
            <div className="g-step-num">1</div>
            <div className="g-step-body">
              <strong>ابحثي عن المنتج</strong>
              <p>من صفحة المنتجات، ابحثي بالاسم أو تصفحي القايمة.</p>
            </div>
          </div>

          <div className="g-step">
            <div className="g-step-num">2</div>
            <div className="g-step-body">
              <strong>اضغطي أيقونة القلم ✏️</strong>
              <p>في جانب المنتج هتلاقي أيقونة تعديل — اضغطيها.</p>
            </div>
          </div>

          <div className="g-step">
            <div className="g-step-num">3</div>
            <div className="g-step-body">
              <strong>عدّلي وحفظي</strong>
              <p>غيّري اللي عايزاه — السعر، الوصف، الصور — واضغطي حفظ.</p>
            </div>
          </div>
        </div>

        <div className="g-divider"/>

        {/* 3C: DELETE/ARCHIVE */}
        <div className="g-subsection">
          <div className="g-subsection-title">إخفاء أو حذف منتج</div>

          <div className="g-step">
            <div className="g-step-num">1</div>
            <div className="g-step-body">
              <strong>الفرق بين الإخفاء والحذف</strong>
              <p><span className="g-badge g-badge-gold">إخفاء</span> يوقف ظهور المنتج على الموقع بس يفضل محفوظ — الأفضل دايماً.</p>
              <p style={{ marginTop: 6 }}><span className="g-badge g-badge-red">حذف</span> يمسح المنتج نهائياً ومش هيتعاد.</p>
            </div>
          </div>

          <div className="g-step">
            <div className="g-step-num">2</div>
            <div className="g-step-body">
              <strong>الإخفاء: غيّري الحالة</strong>
              <p>ادخلي على المنتج، غيّري <strong>الحالة</strong> من "نشط" لـ"غير نشط" أو "مسودة"، واحفظي.</p>
            </div>
          </div>

          <div className="g-warn">
            <span>⚠️</span>
            <div className="g-warn-body">
              <strong>تحذير</strong>
              الحذف نهائي — مفيش تراجع. دايماً فضّلي الإخفاء عن الحذف.
            </div>
          </div>
        </div>

        <div className="g-divider"/>

        {/* 3D: SALE */}
        <div className="g-subsection">
          <div className="g-subsection-title">عمل خصم على منتج (صفحة العروض تلقائية)</div>

          <div className="g-step">
            <div className="g-step-num">1</div>
            <div className="g-step-body">
              <strong>ادخلي على تعديل المنتج</strong>
              <p>اختاري المنتج اللي عايزاه يبقى عليه خصم.</p>
            </div>
          </div>

          <div className="g-step">
            <div className="g-step-num">2</div>
            <div className="g-step-body">
              <strong>أدخلي سعرين</strong>
              <p><strong>السعر:</strong> السعر الجديد (بعد الخصم) — مثلاً 350 ج</p>
              <p><strong>السعر قبل الخصم:</strong> السعر الأصلي (الأعلى) — مثلاً 500 ج</p>
            </div>
          </div>

          <div className="g-step">
            <div className="g-step-num">3</div>
            <div className="g-step-body">
              <strong>الموقع يعمل الباقي تلقائياً ✨</strong>
              <p>هيحسب نسبة الخصم (30%) ويعرضها على المنتج، وهيضيفه تلقائياً لصفحة العروض <code>/sale</code></p>
            </div>
          </div>

          <div className="g-tip">
            <span className="g-tip-icon">✨</span>
            <div className="g-tip-body">
              <strong>مميزة تلقائية</strong>
              مش محتاجة تعملي حاجة تاني! أي منتج عنده سعر قبل الخصم أعلى من السعر الحالي — بيظهر تلقائياً في صفحة العروض.
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          4. CATEGORIES
      ══════════════════════════════════════════ */}
      <div className="g-section" id="categories">
        <div className="g-section-title">
          <div className="g-num">4</div>
          <span className="g-emoji">🗂️</span>
          <h2>إدارة التصنيفات</h2>
        </div>

        <p style={{ color: "rgba(245,239,224,0.55)", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
          التصنيفات هي الأقسام الرئيسية للمتجر — مثل: شنط، محافظ، شوزات.
        </p>

        <div className="g-step">
          <div className="g-step-num">1</div>
          <div className="g-step-body">
            <strong>من القايمة، اضغطي "التصنيفات"</strong>
            <p>هتشوفي قايمة بالتصنيفات الموجودة.</p>
          </div>
        </div>

        <div className="g-step">
          <div className="g-step-num">2</div>
          <div className="g-step-body">
            <strong>اضغطي "+ تصنيف جديد"</strong>
            <p>أدخلي اسم التصنيف بالعربي واضغطي حفظ.</p>
          </div>
        </div>

        <div className="g-step">
          <div className="g-step-num">3</div>
          <div className="g-step-body">
            <strong>التعديل والحذف</strong>
            <p>نفس أيقونة القلم للتعديل، وأيقونة الحذف لمسح التصنيف.</p>
          </div>
        </div>

        <div className="g-warn">
          <span>⚠️</span>
          <div className="g-warn-body">
            <strong>تنبيه</strong>
            لو حذفتي تصنيف فيه منتجات، المنتجات دي مش هتتحذف — بس التصنيف هيختفي منها. ارجعي للمنتجات دي وحددي لها تصنيف جديد.
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          5. ORDERS
      ══════════════════════════════════════════ */}
      <div className="g-section" id="orders">
        <div className="g-section-title">
          <div className="g-num">5</div>
          <span className="g-emoji">📦</span>
          <h2>إدارة الطلبات</h2>
        </div>

        <p style={{ color: "rgba(245,239,224,0.55)", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
          الطلبات بتيجي من العملاء على واتساب — بعد ما العميل يبعتلك واتساب، انتي بتدخليه يدوياً في النظام وتتابعيه.
        </p>

        <div className="g-subsection">
          <div className="g-subsection-title">حالات الطلب الأربعة</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              ["استلام الطلب", "الطلب وصلك ولسه ما جهزتيهوش", "g-badge-gold"],
              ["قيد التجهيز", "بتجمعي المنتجات وبتجهزيها للشحن", "g-badge-gold"],
              ["تم الشحن", "اتبعت مع المندوب", "g-badge-green"],
              ["تم التسليم", "وصل للعميلة وخلصت", "g-badge-green"],
            ].map(([status, desc, badge], i) => (
              <div key={i} className="g-field-row">
                <span className={`g-badge ${badge}`} style={{ minWidth: 100, textAlign: "center" }}>{status}</span>
                <span className="g-field-desc">{desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="g-divider"/>

        <div className="g-step">
          <div className="g-step-num">1</div>
          <div className="g-step-body">
            <strong>ادخلي على "الطلبات" من القايمة</strong>
            <p>هتشوفي قايمة بكل الطلبات مرتبة بالأحدث.</p>
          </div>
        </div>

        <div className="g-step">
          <div className="g-step-num">2</div>
          <div className="g-step-body">
            <strong>اضغطي على رقم الطلب</strong>
            <p>هتدخلي لتفاصيل الطلب الكاملة — اسم العميل، عنوانها، المنتجات، الإجمالي.</p>
          </div>
        </div>

        <div className="g-step">
          <div className="g-step-num">3</div>
          <div className="g-step-body">
            <strong>حدّثي حالة الطلب</strong>
            <p>من القايمة المنسدلة اختاري الحالة الجديدة واضغطي حفظ. العميلة تقدر تتابع طلبها من صفحة <code>/track</code> برقم الطلب.</p>
          </div>
        </div>

        <div className="g-tip">
          <span className="g-tip-icon">💬</span>
          <div className="g-tip-body">
            <strong>تواصل مع العميلة</strong>
            بعد تحديث الحالة، ابعتيلها رسالة واتساب على الرقم اللي في الطلب وقوليلها إن طلبها اتشحن وكاسف ليها رقم التتبع لو عندك.
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          6. BANNERS
      ══════════════════════════════════════════ */}
      <div className="g-section" id="banners">
        <div className="g-section-title">
          <div className="g-num">6</div>
          <span className="g-emoji">🖼️</span>
          <h2>البانرات الإعلانية</h2>
        </div>

        <p style={{ color: "rgba(245,239,224,0.55)", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
          البانرات هي الصور الإعلانية الكبيرة اللي ممكن تظهر على الموقع — زي عروض المواسم أو المجموعات الجديدة.
        </p>

        <div className="g-step">
          <div className="g-step-num">1</div>
          <div className="g-step-body">
            <strong>افتحي "البانرات" من القايمة</strong>
            <p>هتشوفي البانرات الموجودة وزر "إضافة بانر جديد".</p>
          </div>
        </div>

        <div className="g-step">
          <div className="g-step-num">2</div>
          <div className="g-step-body">
            <strong>ارفعي الصورة</strong>
            <p>اختاري صورة عالية الجودة (عريضة — تقريباً 1200 × 400). ممكن تبعتيها من موبايلك.</p>
          </div>
        </div>

        <div className="g-step">
          <div className="g-step-num">3</div>
          <div className="g-step-body">
            <strong>أضيفي العنوان والرابط (اختياري)</strong>
            <p>ممكن تكتبي عنوان للبانر، وممكن تربطيه برابط معين — مثلاً: <code>/sale</code> أو صفحة منتج معين.</p>
          </div>
        </div>

        <div className="g-step">
          <div className="g-step-num">4</div>
          <div className="g-step-body">
            <strong>تفعيل وتعطيل البانر</strong>
            <p>في قايمة البانرات، في زر تبديل (toggle) جنب كل بانر — فعّليه أو عطّليه بضغطة واحدة.</p>
          </div>
        </div>

        <div className="g-tip">
          <span className="g-tip-icon">🎨</span>
          <div className="g-tip-body">
            <strong>نصيحة التصميم</strong>
            استخدمي صور بجودة عالية وعليها نص مقروء. تجنبي الصور الكثيرة التفاصيل اللي بيضيع فيها النص.
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          7. DISCOUNTS
      ══════════════════════════════════════════ */}
      <div className="g-section" id="discounts">
        <div className="g-section-title">
          <div className="g-num">7</div>
          <span className="g-emoji">🏷️</span>
          <h2>أكواد الخصم</h2>
        </div>

        <p style={{ color: "rgba(245,239,224,0.55)", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
          أكواد الخصم هي كودات تعطيها للعملاء يكتبوها وقت الطلب يأخذوا خصم عليه.
        </p>

        <div className="g-step">
          <div className="g-step-num">1</div>
          <div className="g-step-body">
            <strong>من القايمة، اضغطي "الخصومات"</strong>
            <p>هتشوفي الأكواد الموجودة وزر "+ كود جديد".</p>
          </div>
        </div>

        <div className="g-step">
          <div className="g-step-num">2</div>
          <div className="g-step-body">
            <strong>اكتبي الكود</strong>
            <p>مثلاً: <code>SUMMER25</code> أو <code>SHAHENDA10</code> — بالإنجليزي وبالحروف الكبيرة.</p>
          </div>
        </div>

        <div className="g-step">
          <div className="g-step-num">3</div>
          <div className="g-step-body">
            <strong>حددي نوع الخصم والقيمة</strong>
            <p><span className="g-badge g-badge-gold">نسبة مئوية</span> مثلاً 10% — يُطبَّق على إجمالي الطلب</p>
            <p style={{ marginTop: 6 }}><span className="g-badge g-badge-gold">مبلغ ثابت</span> مثلاً 50 جنيه خصم</p>
          </div>
        </div>

        <div className="g-step">
          <div className="g-step-num">4</div>
          <div className="g-step-body">
            <strong>حددي تاريخ الانتهاء (اختياري)</strong>
            <p>لو الكود ليه فترة معينة — مثلاً رمضان فقط — حددي تاريخ انتهاء.</p>
          </div>
        </div>

        <div className="g-step">
          <div className="g-step-num">5</div>
          <div className="g-step-body">
            <strong>احفظي وابعتي الكود للعميلات</strong>
            <p>ابعتي الكود على واتساب أو انستاجرام وقولي للعملاء يكتبوه في صفحة المراجعة.</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          8. SHIPPING
      ══════════════════════════════════════════ */}
      <div className="g-section" id="shipping">
        <div className="g-section-title">
          <div className="g-num">8</div>
          <span className="g-emoji">🚚</span>
          <h2>إعدادات الشحن</h2>
        </div>

        <p style={{ color: "rgba(245,239,224,0.55)", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
          من هنا بتحددي تكلفة الشحن لكل محافظة. الإعدادات الافتراضية:
        </p>

        {[
          ["بورسعيد", "مجاني (0 ج)"],
          ["القاهرة والإسكندرية ومدن الوجه البحري", "50 ج"],
          ["الوجه القبلي (الصعيد)", "100 ج"],
        ].map(([place, price], i) => (
          <div key={i} className="g-field-row">
            <span className="g-field-label">{place}</span>
            <span className="g-field-desc">{price}</span>
          </div>
        ))}

        <div className="g-divider"/>

        <div className="g-step">
          <div className="g-step-num">1</div>
          <div className="g-step-body">
            <strong>من القايمة، اضغطي "الشحن"</strong>
            <p>هتشوفي جدول بكل محافظات مصر وأسعار الشحن.</p>
          </div>
        </div>

        <div className="g-step">
          <div className="g-step-num">2</div>
          <div className="g-step-body">
            <strong>عدّلي أي سعر مباشرة</strong>
            <p>اضغطي على الخانة، غيّري الرقم، واضغطي ✓ للحفظ.</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          9. SETTINGS
      ══════════════════════════════════════════ */}
      <div className="g-section" id="settings">
        <div className="g-section-title">
          <div className="g-num">9</div>
          <span className="g-emoji">⚙️</span>
          <h2>إعدادات المتجر</h2>
        </div>

        <p style={{ color: "rgba(245,239,224,0.55)", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
          من هنا بتتحكمي في كل إعدادات المتجر — من القايمة اضغطي "الإعدادات".
        </p>

        {[
          ["اسم المتجر", "الاسم اللي بيظهر في العنوان والرسائل — الافتراضي: شاهي"],
          ["رقم الواتساب", "رقم الطلبات — ده الرقم اللي بيوصله الطلبات من العملاء"],
          ["إنستاجرام", "رابط حساب الإنستاجرام — مثلاً: https://instagram.com/shah.ystore"],
          ["فيسبوك", "رابط صفحة الفيسبوك"],
          ["تيك توك", "رابط حساب التيك توك"],
          ["كلمات الصفحة الرئيسية", "الكلمات الدوارة في أعلى الصفحة — مفصولة بفواصل — مثلاً: شُعوراً, هويّتكِ, قوّتكِ"],
          ["نص الإعلان العلوي", "شريط إعلان صغير فوق الموقع — اتركيه فاضي لو مش عايزاه"],
          ["تفعيل الإعلان", "صندوق صح/غلط لإظهار أو إخفاء الإعلان"],
        ].map(([label, desc], i) => (
          <div key={i} className="g-field-row">
            <span className="g-field-label">{label}</span>
            <span className="g-field-desc">{desc}</span>
          </div>
        ))}

        <div className="g-tip">
          <span className="g-tip-icon">📱</span>
          <div className="g-tip-body">
            <strong>رقم الواتساب</strong>
            اكتبيه بالصيغة الدولية: <code>+201015835455</code> — بدون مسافات.
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          10. REVIEWS
      ══════════════════════════════════════════ */}
      <div className="g-section" id="reviews">
        <div className="g-section-title">
          <div className="g-num">10</div>
          <span className="g-emoji">⭐</span>
          <h2>التقييمات والمراجعات</h2>
        </div>

        <p style={{ color: "rgba(245,239,224,0.55)", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
          العملاء ممكن يكتبوا تقييمات على المنتجات — من هنا بتراجعيها وتقرري تظهر أو لأ.
        </p>

        <div className="g-step">
          <div className="g-step-num">1</div>
          <div className="g-step-body">
            <strong>من القايمة، اضغطي "المراجعات"</strong>
            <p>هتشوفي كل التقييمات اللي اتكتبت — الاسم والتقييم والتعليق.</p>
          </div>
        </div>

        <div className="g-step">
          <div className="g-step-num">2</div>
          <div className="g-step-body">
            <strong>اعتمادي أو ارفضي التقييم</strong>
            <p>التقييمات المعتمدة بس هي اللي بتظهر للزوار على صفحة المنتج.</p>
          </div>
        </div>

        <div className="g-tip">
          <span className="g-tip-icon">💬</span>
          <div className="g-tip-body">
            <strong>طلبي تقييمات</strong>
            بعد كل طلب يتسلم، ابعتي للعميلة رسالة واتساب وطلبي منها تكتب تقييم على المنتج — التقييمات بتزود ثقة العملاء الجدد.
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          11. ADMINS
      ══════════════════════════════════════════ */}
      <div className="g-section" id="admins">
        <div className="g-section-title">
          <div className="g-num">11</div>
          <span className="g-emoji">👤</span>
          <h2>إدارة المسؤولين</h2>
        </div>

        <p style={{ color: "rgba(245,239,224,0.55)", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
          لو عندك واحدة تانية بتساعدك في إدارة المتجر، ممكن تعمليلها حساب أدمن.
        </p>

        <div className="g-step">
          <div className="g-step-num">1</div>
          <div className="g-step-body">
            <strong>من القايمة، اضغطي "المسؤولون"</strong>
            <p>هتشوفي قايمة الأكاونتات اللي عندها صلاحية دخول اللوحة.</p>
          </div>
        </div>

        <div className="g-step">
          <div className="g-step-num">2</div>
          <div className="g-step-body">
            <strong>اضغطي "+ إضافة مسؤول"</strong>
            <p>أدخلي الاسم والإيميل وكلمة مرور — الشخص ده هيقدر يدخل اللوحة بنفس الصلاحيات.</p>
          </div>
        </div>

        <div className="g-warn">
          <span>⚠️</span>
          <div className="g-warn-body">
            <strong>انتبهي</strong>
            الأدمن الجديد هيقدر يشوف كل حاجة ويغير أي حاجة — اديها الصلاحية دي لأشخاص تثقي فيهم بس.
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          12. TIPS
      ══════════════════════════════════════════ */}
      <div className="g-section" id="tips">
        <div className="g-section-title">
          <div className="g-num">12</div>
          <span className="g-emoji">💎</span>
          <h2>نصائح وتنبيهات مهمة</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="g-tip">
            <span className="g-tip-icon">📸</span>
            <div className="g-tip-body">
              <strong>جودة الصور = مبيعات أكتر</strong>
              استثمري في صور كويسة للمنتجات — صورة واضحة بإضاءة طبيعية بتبيع أكتر من أي إعلان.
            </div>
          </div>

          <div className="g-tip">
            <span className="g-tip-icon">⚡</span>
            <div className="g-tip-body">
              <strong>سرعة الاستجابة على واتساب</strong>
              العميلة اللي بتتجاوب معاها في دقايق أسرع بكتير في الشراء من اللي بتستنى ساعات. حاولي تردي في خلال 30 دقيقة.
            </div>
          </div>

          <div className="g-tip">
            <span className="g-tip-icon">🔄</span>
            <div className="g-tip-body">
              <strong>حدّثي المخزون دايماً</strong>
              المنتج اللي خلص — غيّري حالته لـ"غير نشط" فوراً. العميلة اللي بتطلب حاجة مش موجودة بتزعل وبتاخد تجربة سلبية.
            </div>
          </div>

          <div className="g-tip">
            <span className="g-tip-icon">📊</span>
            <div className="g-tip-body">
              <strong>اتفرجي على الإحصاءات أسبوعياً</strong>
              الداشبورد بيقولك إيه أكتر منتج بيتباع وإيه الوقت الأكتر في الطلبات — ده بيساعدك تعرفي إيه اللي لازم تركزي عليه.
            </div>
          </div>

          <div className="g-warn">
            <span>⚠️</span>
            <div className="g-warn-body">
              <strong>حافظي على بياناتك</strong>
              لا تشاركي رابط لوحة التحكم أو كلمة المرور على السوشيال ميديا أو مع أشخاص مش مصرح ليهم.
            </div>
          </div>

          <div className="g-warn">
            <span>⚠️</span>
            <div className="g-warn-body">
              <strong>لا تمسحي المنتجات نهائياً</strong>
              دايماً استخدمي "إخفاء" أو غيّري الحالة لـ"غير نشط" — الحذف النهائي مفيش تراجع.
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          13. SUPPORT
      ══════════════════════════════════════════ */}
      <div className="g-section" id="support">
        <div className="g-section-title">
          <div className="g-num">13</div>
          <span className="g-emoji">🛠️</span>
          <h2>الدعم الفني — تواصلي مع المطور</h2>
        </div>

        <p style={{ color: "rgba(245,239,224,0.55)", fontSize: 14, lineHeight: 1.8, marginBottom: 28 }}>
          لو في أي مشكلة تقنية أو عايزة تضيفي ميزة جديدة أو تغييري في الموقع:
        </p>

        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <div style={{
            flex: "1 1 220px",
            background: "#0E0C09",
            border: "1px solid rgba(201,168,76,0.15)",
            borderRadius: 12,
            padding: "24px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>📱</div>
            <div style={{ fontFamily: "Cinzel, serif", fontSize: 10, letterSpacing: "3px", color: "#C9A84C", opacity: 0.6, marginBottom: 8 }}>WHATSAPP</div>
            <div style={{ fontFamily: "Tajawal, sans-serif", fontSize: 18, fontWeight: 700, color: "#F5EFE0", direction: "ltr" }}>+201030002331</div>
            <div style={{ fontSize: 12, color: "rgba(245,239,224,0.35)", marginTop: 6 }}>أحمد درهوس</div>
          </div>

          <div style={{
            flex: "1 1 220px",
            background: "#0E0C09",
            border: "1px solid rgba(201,168,76,0.15)",
            borderRadius: 12,
            padding: "24px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>📸</div>
            <div style={{ fontFamily: "Cinzel, serif", fontSize: 10, letterSpacing: "3px", color: "#C9A84C", opacity: 0.6, marginBottom: 8 }}>INSTAGRAM</div>
            <div style={{ fontFamily: "Tajawal, sans-serif", fontSize: 18, fontWeight: 700, color: "#F5EFE0", direction: "ltr" }}>@darhous</div>
            <div style={{ fontSize: 12, color: "rgba(245,239,224,0.35)", marginTop: 6 }}>ahmed darhous</div>
          </div>

          <div style={{
            flex: "1 1 220px",
            background: "#0E0C09",
            border: "1px solid rgba(201,168,76,0.15)",
            borderRadius: 12,
            padding: "24px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>💼</div>
            <div style={{ fontFamily: "Cinzel, serif", fontSize: 10, letterSpacing: "3px", color: "#C9A84C", opacity: 0.6, marginBottom: 8 }}>LINKEDIN</div>
            <div style={{ fontFamily: "Tajawal, sans-serif", fontSize: 18, fontWeight: 700, color: "#F5EFE0", direction: "ltr" }}>in/darhous</div>
            <div style={{ fontSize: 12, color: "rgba(245,239,224,0.35)", marginTop: 6 }}>linkedin.com/in/darhous</div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{
        background: "#060504",
        borderTop: "1px solid #151210",
        padding: "40px",
        textAlign: "center",
      }}>
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", marginBottom: 24 }}/>

        <div style={{ fontFamily: "Playfair Display, serif", fontSize: 24, fontWeight: 700, color: "#C9A84C", marginBottom: 8 }}>ShahY Store</div>
        <div style={{ fontFamily: "Tajawal, sans-serif", fontSize: 14, color: "rgba(245,239,224,0.35)", marginBottom: 4 }}>
          صاحبة المتجر: شاهندة سليمان
        </div>
        <div style={{ fontFamily: "Tajawal, sans-serif", fontSize: 13, color: "rgba(245,239,224,0.2)" }}>
          تصميم وتطوير: أحمد درهوس — © 2025
        </div>
      </div>
    </div>
  )
}
