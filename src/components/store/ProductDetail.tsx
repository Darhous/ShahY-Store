"use client"

import { useCallback, useRef, useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { useCart } from "@/contexts/CartContext"

const WA = "201015835455"

const QUALITY_LABELS: Record<string, string> = { hi_copy: "نسخة عالية", mirror: "ميرور", original: "أصلي" }
const QUALITY_COLORS: Record<string, string> = { hi_copy: "#4a4a4a", mirror: "#7B1C2E", original: "#C9A84C" }
const QUALITY_DESC: Record<string, string> = {
  hi_copy:  "جودة عالية، تشطيب ممتاز، مواد مطابقة للأصل",
  mirror:   "طبق الأصل، لا يمكن تمييزه عن الأورجنال",
  original: "منتج أصلي بضمان كامل",
}

interface RelatedProduct {
  id: string; slug: string; name_ar: string; price: number
  compare_at_price: number | null; quality_tier: string
  image: { url: string; alt_ar: string | null } | null
}

interface ProductDetailProps {
  product: {
    id: string; slug: string; name_ar: string; description_ar: string | null
    price: number; compare_at_price: number | null; quality_tier: string
    is_featured: boolean; category_name: string | null
  }
  images: { id: string; url: string; alt_ar: string | null; sort_order: number }[]
  related?: RelatedProduct[]
}

export default function ProductDetail({ product, images, related = [] }: ProductDetailProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0, gx: 50, gy: 50 })
  const [hovered, setHovered] = useState(false)
  const [shimmer, setShimmer] = useState(false)
  const [adding, setAdding] = useState(false)
  const raf = useRef<number>(0)
  const { addItem } = useCart()

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width
    const ny = (e.clientY - r.top) / r.height
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() =>
      setTilt({ x: (ny - 0.5) * -12, y: (nx - 0.5) * 12, gx: nx * 100, gy: ny * 100 })
    )
  }, [])

  const onEnter = () => {
    setHovered(true)
    setShimmer(false)
    setTimeout(() => setShimmer(true), 20)
    setTimeout(() => setShimmer(false), 700)
  }
  const onLeave = () => { setHovered(false); setTilt({ x: 0, y: 0, gx: 50, gy: 50 }) }

  const handleAddToCart = () => {
    setAdding(true)
    addItem({
      id: product.id, slug: product.slug, name_ar: product.name_ar,
      price: product.price, image: images[0]?.url ?? null, quality_tier: product.quality_tier,
    })
    toast.success("تمت الإضافة للسلة!", {
      description: product.name_ar, duration: 2500,
      action: { label: "عرض السلة", onClick: () => window.location.href = "/cart" },
    })
    setTimeout(() => setAdding(false), 700)
  }

  const handleShare = () => {
    const url = window.location.href
    const text = `شوف المنتج ده من ShahY Store 🛍️\n${product.name_ar} — ${product.price.toLocaleString("ar-EG")} ج.م\n${url}`
    if (navigator.share) {
      navigator.share({ title: product.name_ar, text, url }).catch(() => {})
    } else {
      const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
      window.open(waUrl, "_blank")
    }
  }

  const activeImg = images[activeIdx]
  const qColor = QUALITY_COLORS[product.quality_tier] ?? "#4a4a4a"
  const waText = encodeURIComponent(`السلام عليكم، أريد الاستفسار عن: ${product.name_ar}\nالسعر: ${product.price.toLocaleString("ar-EG")} ج.م`)
  const waHref = `https://wa.me/${WA}?text=${waText}`

  return (
    <div style={{ background: "#0A0806", minHeight: "100vh", paddingTop: 80, direction: "rtl" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;700;900&family=Playfair+Display:ital,wght@0,700;1,400&family=Cinzel:wght@400&family=Cormorant+Garamond:ital,wght@1,300&display=swap');
        @keyframes pdShimmer { from{background-position:200% center} to{background-position:-200% center} }
        .pd-thumb { cursor:pointer; border-radius:8px; overflow:hidden; transition:all 0.25s ease; }
        .pd-thumb:hover { border-color:rgba(201,168,76,0.6)!important; }
        .pd-cart-btn:hover { background:linear-gradient(135deg,#B89440,#D4B060)!important; transform:translateY(-1px); box-shadow:0 12px 40px rgba(201,168,76,0.35)!important; }
        .pd-wa-btn:hover { background:rgba(37,160,85,0.25)!important; border-color:rgba(37,160,85,0.6)!important; transform:translateY(-1px); }
        .pd-share-btn:hover { background:rgba(201,168,76,0.12)!important; border-color:rgba(201,168,76,0.4)!important; }
        .pd-rel-card { transition:all 0.3s ease; }
        .pd-rel-card:hover { border-color:rgba(201,168,76,0.3)!important; transform:translateY(-3px); box-shadow:0 12px 40px rgba(0,0,0,0.5)!important; }
        .pd-rel-img { transition:transform 0.5s ease; }
        .pd-rel-card:hover .pd-rel-img { transform:scale(1.06); }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 40px 80px" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36 }}>
          <Link href="/" style={{ fontFamily: "Tajawal,sans-serif", fontSize: 13, color: "#F5EFE0", opacity: 0.4, textDecoration: "none" }}>الرئيسية</Link>
          <span style={{ color: "#C9A84C", opacity: 0.4, fontSize: 10 }}>›</span>
          <Link href="/#products" style={{ fontFamily: "Tajawal,sans-serif", fontSize: 13, color: "#F5EFE0", opacity: 0.4, textDecoration: "none" }}>{product.category_name ?? "المنتجات"}</Link>
          <span style={{ color: "#C9A84C", opacity: 0.4, fontSize: 10 }}>›</span>
          <span style={{ fontFamily: "Tajawal,sans-serif", fontSize: 13, color: "#C9A84C", opacity: 0.8 }}>{product.name_ar}</span>
        </div>

        {/* Main layout */}
        <div style={{ display: "flex", gap: 64, flexWrap: "wrap", alignItems: "flex-start" }}>

          {/* ── Left: Image gallery ── */}
          <div style={{ flex: "1 1 420px", minWidth: 320 }}>
            <div
              onMouseMove={onMove} onMouseEnter={onEnter} onMouseLeave={onLeave}
              style={{
                borderRadius: 20, overflow: "hidden", position: "relative", paddingBottom: "100%",
                transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.02 : 1})`,
                transition: hovered ? "transform 0.1s ease" : "transform 0.6s cubic-bezier(0.2,0,0.2,1)",
                boxShadow: hovered ? "0 32px 80px rgba(201,168,76,0.2),0 12px 40px rgba(0,0,0,0.8)" : "0 8px 40px rgba(0,0,0,0.6)",
                border: `1px solid ${hovered ? "rgba(201,168,76,0.3)" : "rgba(201,168,76,0.08)"}`,
                willChange: "transform", cursor: "pointer", background: "#111009",
              }}
            >
              <div style={{
                position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
                background: `radial-gradient(ellipse 240px 200px at ${tilt.gx}% ${tilt.gy}%,rgba(201,168,76,0.1) 0%,transparent 70%)`,
                opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
              }} />
              <div style={{
                position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none",
                background: "linear-gradient(105deg,transparent 25%,rgba(240,216,130,0.15) 50%,transparent 75%)",
                transform: `translateX(${shimmer ? "130%" : "-130%"})`,
                transition: shimmer ? "transform 0.6s cubic-bezier(0.4,0,0.2,1)" : "none",
              }} />
              {activeImg?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={activeImg.url} alt={activeImg.alt_ar ?? product.name_ar}
                  style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
                    transform: hovered ? "scale(1.04)" : "scale(1)",
                    transition: "transform 0.65s cubic-bezier(0.2,0,0.2,1)",
                  }} />
              ) : (
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#1a1510,#2a2015)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80, opacity: 0.2 }}>👜</div>
              )}
              <div style={{ position: "absolute", top: 16, right: 16, zIndex: 5, background: qColor, color: "#fff", fontFamily: "Tajawal,sans-serif", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 20 }}>
                {QUALITY_LABELS[product.quality_tier] ?? product.quality_tier}
              </div>
            </div>

            {images.length > 1 && (
              <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
                {images.map((img, i) => (
                  <div key={img.id} className="pd-thumb"
                    onClick={() => setActiveIdx(i)}
                    style={{ width: 72, height: 72, flexShrink: 0, position: "relative", border: `2px solid ${i === activeIdx ? "rgba(201,168,76,0.7)" : "rgba(201,168,76,0.15)"}` }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt={img.alt_ar ?? product.name_ar} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    {i === activeIdx && <div style={{ position: "absolute", inset: 0, background: "rgba(201,168,76,0.12)" }} />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Product info ── */}
          <div style={{ flex: "1 1 360px", minWidth: 300, paddingTop: 8 }}>
            <div style={{ fontFamily: "Cinzel,serif", fontSize: 10, letterSpacing: "4px", color: "#C9A84C", textTransform: "uppercase", opacity: 0.8, marginBottom: 12 }}>
              ✦ &nbsp; {product.category_name ?? ""}
            </div>
            <h1 style={{ fontFamily: "Tajawal,sans-serif", fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, color: "#F5EFE0", lineHeight: 1.3, margin: "0 0 20px" }}>
              {product.name_ar}
            </h1>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 24 }}>
              <span style={{
                fontFamily: "Tajawal,sans-serif", fontSize: 36, fontWeight: 900, color: "#C9A84C",
                background: "linear-gradient(135deg,#C9A84C,#F0D882)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                animation: "pdShimmer 6s linear infinite", backgroundSize: "300% auto",
              }}>{product.price.toLocaleString("ar-EG")} ج.م</span>
              {product.compare_at_price && (
                <span style={{ fontFamily: "Tajawal,sans-serif", fontSize: 18, color: "#555", textDecoration: "line-through" }}>
                  {product.compare_at_price.toLocaleString("ar-EG")} ج.م
                </span>
              )}
              {product.compare_at_price && (
                <span style={{ fontFamily: "Tajawal,sans-serif", fontSize: 12, fontWeight: 700, color: "#fff", background: "#7B1C2E", padding: "3px 10px", borderRadius: 20 }}>
                  خصم {Math.round((1 - product.price / product.compare_at_price) * 100)}%
                </span>
              )}
            </div>

            <div style={{ height: 1, background: "linear-gradient(90deg,#C9A84C44,transparent)", marginBottom: 24 }} />

            {product.description_ar && (
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontFamily: "Tajawal,sans-serif", fontSize: 13, fontWeight: 700, color: "#C9A84C", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>تفاصيل المنتج</h3>
                <p style={{ fontFamily: "Tajawal,sans-serif", fontSize: 15, color: "#F5EFE0", opacity: 0.65, lineHeight: 2, whiteSpace: "pre-wrap" }}>
                  {product.description_ar}
                </p>
              </div>
            )}

            <div style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: 12, padding: "16px 20px", marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: qColor, flexShrink: 0 }} />
                <span style={{ fontFamily: "Tajawal,sans-serif", fontSize: 14, fontWeight: 700, color: "#F5EFE0" }}>{QUALITY_LABELS[product.quality_tier] ?? product.quality_tier}</span>
              </div>
              <p style={{ fontFamily: "Tajawal,sans-serif", fontSize: 13, color: "#F5EFE0", opacity: 0.5, margin: 0 }}>{QUALITY_DESC[product.quality_tier] ?? ""}</p>
            </div>

            {/* Dual CTAs */}
            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <button onClick={handleAddToCart} disabled={adding} className="pd-cart-btn"
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  background: adding ? "linear-gradient(135deg,#C9A84C,#F0D882)" : "linear-gradient(135deg,#C9A84C,#D4B060)",
                  color: "#0A0806", fontFamily: "Tajawal,sans-serif", fontWeight: 700, fontSize: 16,
                  padding: "15px 20px", borderRadius: 10, border: "none", cursor: "pointer",
                  boxShadow: "0 8px 32px rgba(201,168,76,0.25)", transition: "all 0.3s cubic-bezier(0.2,0,0.2,1)",
                }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                {adding ? "✓ تمت الإضافة!" : "أضف للسلة"}
              </button>

              <a href={waHref} target="_blank" rel="noopener noreferrer" className="pd-wa-btn"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  background: "rgba(37,160,85,0.12)", border: "1px solid rgba(37,160,85,0.35)",
                  color: "#25D366", fontFamily: "Tajawal,sans-serif", fontWeight: 700, fontSize: 15,
                  padding: "15px 20px", borderRadius: 10, textDecoration: "none",
                  transition: "all 0.3s ease", whiteSpace: "nowrap",
                }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
                </svg>
                واتساب
              </a>
            </div>

            {/* Share button */}
            <button onClick={handleShare} className="pd-share-btn"
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                background: "transparent", border: "1px solid rgba(201,168,76,0.15)",
                color: "#F5EFE0", fontFamily: "Tajawal,sans-serif", fontSize: 13, opacity: 0.55,
                padding: "11px 20px", borderRadius: 10, cursor: "pointer",
                transition: "all 0.25s ease",
              }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              شارك المنتج
            </button>

            {/* Trust signals */}
            <div style={{ display: "flex", gap: 20, marginTop: 24, flexWrap: "wrap" }}>
              {[{ icon: "🚚", text: "توصيل لكل محافظات مصر" }, { icon: "✅", text: "جودة مضمونة" }, { icon: "💬", text: "دعم فوري على واتساب" }].map(({ icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  <span style={{ fontFamily: "Tajawal,sans-serif", fontSize: 12, color: "#F5EFE0", opacity: 0.4 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <div style={{ marginTop: 80 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
              <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.2))" }} />
              <span style={{ fontFamily: "Cinzel,serif", fontSize: 10, letterSpacing: "5px", color: "#C9A84C", opacity: 0.7, textTransform: "uppercase", whiteSpace: "nowrap" }}>
                ✦ منتجات مشابهة ✦
              </span>
              <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg,rgba(201,168,76,0.2),transparent)" }} />
            </div>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {related.map(rel => (
                <Link key={rel.id} href={`/products/${rel.slug}`} style={{ textDecoration: "none", flex: "1 1 200px", maxWidth: 240 }}>
                  <div className="pd-rel-card" style={{
                    background: "linear-gradient(145deg,#0E0C09,#111009)",
                    border: "1px solid rgba(201,168,76,0.1)",
                    borderRadius: 14, overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                  }}>
                    <div style={{ paddingBottom: "100%", position: "relative", overflow: "hidden" }}>
                      {rel.image?.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={rel.image.url} alt={rel.image.alt_ar ?? rel.name_ar}
                          className="pd-rel-img"
                          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, opacity: 0.2 }}>👜</div>
                      )}
                    </div>
                    <div style={{ padding: "14px 14px 16px", direction: "rtl" }}>
                      <p style={{ fontFamily: "Tajawal,sans-serif", fontSize: 14, fontWeight: 700, color: "#F5EFE0", margin: "0 0 6px", lineHeight: 1.4 }}>{rel.name_ar}</p>
                      <span style={{ fontFamily: "Tajawal,sans-serif", fontSize: 15, fontWeight: 900, color: "#C9A84C" }}>
                        {rel.price.toLocaleString("ar-EG")} ج.م
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
