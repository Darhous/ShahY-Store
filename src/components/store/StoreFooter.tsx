export default function StoreFooter() {
  return (
    <footer style={{
      background: "#060504", borderTop: "1px solid #151210",
      padding: "64px 40px 40px", direction: "rtl",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;700&family=Cinzel:wght@400&family=Playfair+Display:wght@700&display=swap');
        .sf-link { color: #F5EFE0; opacity: 0.45; text-decoration: none; transition: opacity 0.2s; display: flex; align-items: center; gap: 8px; font-family: Tajawal, sans-serif; font-size: 14px; }
        .sf-link:hover { opacity: 0.9; }
        .sf-social { display: flex; align-items: center; gap: 10px; text-decoration: none; transition: opacity 0.2s; }
        .sf-social:hover { opacity: 0.85; }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 80, flexWrap: "wrap", marginBottom: 56 }}>

          {/* Brand column */}
          <div style={{ flex: "0 0 260px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <svg width="32" height="18" viewBox="0 0 120 64" fill="none">
                <path d="M5 60L18 18L38 42L60 5L82 42L102 18L115 60Z"
                  stroke="url(#fGold)" strokeWidth="2.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
                <circle cx="60" cy="5" r="4" fill="#F0D882"/>
                <line x1="5" y1="60" x2="115" y2="60" stroke="url(#fGold)" strokeWidth="1.5"/>
                <defs>
                  <linearGradient id="fGold" x1="0" y1="0" x2="120" y2="0">
                    <stop offset="0%" stopColor="#8B6020"/>
                    <stop offset="50%" stopColor="#F0D882"/>
                    <stop offset="100%" stopColor="#8B6020"/>
                  </linearGradient>
                </defs>
              </svg>
              <div>
                <span style={{
                  fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700,
                  background: "linear-gradient(135deg,#C9A84C,#F0D882,#C9A84C)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>ShahY</span>
                <span style={{ fontFamily: "Cinzel, serif", fontSize: 10, color: "#666", letterSpacing: "4px", display: "block", lineHeight: 1, marginTop: 1 }}>STORE</span>
              </div>
            </div>
            <p style={{ fontFamily: "Tajawal, sans-serif", fontSize: 13, color: "#F5EFE0", opacity: 0.35, lineHeight: 1.8, marginBottom: 24 }}>
              أرقى الإكسسوارات النسائية المستوردة — شنط، محافظ، وشوزات بأفضل الأسعار.
            </p>
            {/* ShahY Store socials */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href="https://www.instagram.com/shah.ystore/" target="_blank" rel="noopener noreferrer" className="sf-social"
                style={{ opacity: 0.55 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#C9A84C" }}>
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
                <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: 13, color: "#F5EFE0" }}>@shah.ystore</span>
              </a>
              <a href="https://wa.me/201015835455" target="_blank" rel="noopener noreferrer" className="sf-social"
                style={{ opacity: 0.55 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#C9A84C" }}>
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
                  <path d="M9 10c0 5 3.5 7.5 7.5 7.5"/>
                </svg>
                <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: 13, color: "#F5EFE0" }}>+201015835455</span>
              </a>
            </div>
          </div>

          {/* Links column */}
          <div style={{ flex: "0 0 160px" }}>
            <h4 style={{ fontFamily: "Tajawal, sans-serif", fontSize: 12, fontWeight: 700, color: "#C9A84C", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 20 }}>
              المتجر
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href="/#products" className="sf-link">المنتجات</a>
              <a href={`https://wa.me/201015835455?text=${encodeURIComponent("السلام عليكم، أريد الاستفسار عن منتجاتكم")}`}
                target="_blank" rel="noopener noreferrer" className="sf-link">تواصل معنا</a>
            </div>
          </div>

          {/* Designer column */}
          <div style={{ flex: "0 0 220px", marginRight: "auto" }}>
            <h4 style={{ fontFamily: "Tajawal, sans-serif", fontSize: 12, fontWeight: 700, color: "#C9A84C", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 20 }}>
              تصميم وتطوير
            </h4>
            <p style={{ fontFamily: "Tajawal, sans-serif", fontSize: 12, color: "#F5EFE0", opacity: 0.35, marginBottom: 16 }}>
              Ahmed Darhous
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href="https://www.instagram.com/darhous/" target="_blank" rel="noopener noreferrer" className="sf-social"
                style={{ opacity: 0.45 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#888" }}>
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
                <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: 12, color: "#F5EFE0", opacity: 0.6 }}>@darhous</span>
              </a>
              <a href="https://www.facebook.com/ahmed.darhous" target="_blank" rel="noopener noreferrer" className="sf-social"
                style={{ opacity: 0.45 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#888" }}>
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: 12, color: "#F5EFE0", opacity: 0.6 }}>ahmed.darhous</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid #151210", paddingTop: 28,
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ fontFamily: "Cinzel, serif", fontSize: 8, letterSpacing: "4px", color: "#2a2520", textTransform: "uppercase" }}>
            © 2025 ShahY Store — All rights reserved
          </p>
          <p style={{ fontFamily: "Tajawal, sans-serif", fontSize: 11, color: "#2a2520" }}>
            designed & developed by Ahmed Darhous
          </p>
        </div>
      </div>
    </footer>
  )
}
