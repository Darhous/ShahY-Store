"use client"

import { useCallback, useRef, useState } from "react"
import Link from "next/link"

const WA = "201015835455"

const QUALITY_LABELS: Record<string, string> = { hi_copy: "نسخة عالية", mirror: "ميرور", original: "أصلي" }
const QUALITY_COLORS: Record<string, string> = { hi_copy: "#4a4a4a", mirror: "#7B1C2E", original: "#C9A84C" }
const QUALITY_DESC: Record<string, string> = {
  hi_copy:  "جودة عالية، تشطيب ممتاز، مواد مطابقة للأصل",
  mirror:   "طبق الأصل، لا يمكن تمييزه عن الأورجنال",
  original: "منتج أصلي بضمان كامل",
}

interface ProductDetailProps {
  product: {
    id: string; slug: string; name_ar: string; description_ar: string | null
    price: number; compare_at_price: number | null; quality_tier: string
    is_featured: boolean; category_name: string | null
  }
  images: { id: string; url: string; alt_ar: string | null; sort_order: number }[]
}

export default function ProductDetail({ product, images }: ProductDetailProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0, gx: 50, gy: 50 })
  const [hovered, setHovered] = useState(false)
  const [shimmer, setShimmer] = useState(false)
  const raf = useRef<number>(0)

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
            {/* Main image with 3D tilt */}
            <div
              onMouseMove={onMove} onMouseEnter={onEnter} onMouseLeave={onLeave}
              style={{
                borderRadius: 20, overflow: "hidden", position: "relative",
                paddingBottom: "100%",
                transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.02 : 1})`,
                transition: hovered ? "transform 0.1s ease" : "transform 0.6s cubic-bezier(0.2,0,0.2,1)",
                boxShadow: hovered
                  ? "0 32px 80px rgba(201,168,76,0.2),0 12px 40px rgba(0,0,0,0.8)"
                  : "0 8px 40px rgba(0,0,0,0.6)",
                border: `1px solid ${hovered ? "rgba(201,168,76,0.3)" : "rgba(201,168,76,0.08)"}`,
                willChange: "transform",
                cursor: "pointer",
                background: "#111009",
              }}
            >
              {/* Gold light follow */}
              <div style={{
                position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
                background: `radial-gradient(ellipse 240px 200px at ${tilt.gx}% ${tilt.gy}%,rgba(201,168,76,0.1) 0%,transparent 70%)`,
                opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
              }} />
              {/* Shimmer sweep */}
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
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(135deg,#1a1510,#2a2015)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 80, opacity: 0.2,
                }}>👜</div>
              )}

              {/* Quality badge */}
              <div style={{
                position: "absolute", top: 16, right: 16, zIndex: 5,
                background: qColor, color: "#fff",
                fontFamily: "Tajawal,sans-serif", fontSize: 11, fontWeight: 700,
                padding: "4px 14px", borderRadius: 20,
              }}>{QUALITY_LABELS[product.quality_tier] ?? product.quality_tier}</div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
                {images.map((img, i) => (
                  <div key={img.id} className="pd-thumb"
                    onClick={() => setActiveIdx(i)}
                    style={{
                      width: 72, height: 72, flexShrink: 0, position: "relative",
                      border: `2px solid ${i === activeIdx ? "rgba(201,168,76,0.7)" : "rgba(201,168,76,0.15)"}`,
                    }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt={img.alt_ar ?? product.name_ar}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    {i === activeIdx && (
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "rgba(201,168,76,0.12)",
                      }} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Product info ── */}
          <div style={{ flex: "1 1 360px", minWidth: 300, paddingTop: 8 }}>
            {/* Category */}
            <div style={{
              fontFamily: "Cinzel,serif", fontSize: 10, letterSpacing: "4px",
              color: "#C9A84C", textTransform: "uppercase", opacity: 0.8, marginBottom: 12,
            }}>
              ✦ &nbsp; {product.category_name ?? ""}
            </div>

            {/* Name */}
            <h1 style={{
              fontFamily: "Tajawal,sans-serif", fontSize: "clamp(26px,4vw,38px)",
              fontWeight: 800, color: "#F5EFE0", lineHeight: 1.3, margin: "0 0 20px",
            }}>{product.name_ar}</h1>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 24 }}>
              <span style={{
                fontFamily: "Tajawal,sans-serif", fontSize: 36, fontWeight: 900, color: "#C9A84C",
                background: "linear-gradient(135deg,#C9A84C,#F0D882)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                animation: "pdShimmer 6s linear infinite", backgroundSize: "300% auto",
              }}>
                {product.price.toLocaleString("ar-EG")} ج.م
              </span>
              {product.compare_at_price && (
                <span style={{ fontFamily: "Tajawal,sans-serif", fontSize: 18, color: "#555", textDecoration: "line-through" }}>
                  {product.compare_at_price.toLocaleString("ar-EG")} ج.م
                </span>
              )}
              {product.compare_at_price && (
                <span style={{
                  fontFamily: "Tajawal,sans-serif", fontSize: 12, fontWeight: 700,
                  color: "#fff", background: "#7B1C2E", padding: "3px 10px", borderRadius: 20,
                }}>
                  خصم {Math.round((1 - product.price / product.compare_at_price) * 100)}%
                </span>
              )}
            </div>

            {/* Gold divider */}
            <div style={{ height: 1, background: "linear-gradient(90deg,#C9A84C44,transparent)", marginBottom: 24 }} />

            {/* Description */}
            {product.description_ar && (
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontFamily: "Tajawal,sans-serif", fontSize: 13, fontWeight: 700, color: "#C9A84C", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>
                  تفاصيل المنتج
                </h3>
                <p style={{
                  fontFamily: "Tajawal,sans-serif", fontSize: 15, color: "#F5EFE0",
                  opacity: 0.65, lineHeight: 2, whiteSpace: "pre-wrap",
                }}>
                  {product.description_ar}
                </p>
              </div>
            )}

            {/* Quality info */}
            <div style={{
              background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.12)",
              borderRadius: 12, padding: "16px 20px", marginBottom: 28,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: qColor, flexShrink: 0 }} />
                <span style={{ fontFamily: "Tajawal,sans-serif", fontSize: 14, fontWeight: 700, color: "#F5EFE0" }}>
                  {QUALITY_LABELS[product.quality_tier] ?? product.quality_tier}
                </span>
              </div>
              <p style={{ fontFamily: "Tajawal,sans-serif", fontSize: 13, color: "#F5EFE0", opacity: 0.5, margin: 0 }}>
                {QUALITY_DESC[product.quality_tier] ?? ""}
              </p>
            </div>

            {/* CTA */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href={waHref} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  background: "linear-gradient(135deg,#1a6c3a,#25a055)",
                  color: "#fff", fontFamily: "Tajawal,sans-serif", fontWeight: 700, fontSize: 16,
                  padding: "15px 24px", borderRadius: 10, textDecoration: "none",
                  boxShadow: "0 8px 32px rgba(37,160,85,0.3)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 12px 40px rgba(37,160,85,0.45)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,160,85,0.3)")}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
                </svg>
                اطلب عبر واتساب
              </a>

              <a href={`https://wa.me/${WA}?text=${encodeURIComponent(`السلام عليكم، لدي استفسار عن: ${product.name_ar}`)}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  background: "transparent", border: "1px solid rgba(201,168,76,0.25)",
                  color: "#F5EFE0", fontFamily: "Tajawal,sans-serif", fontWeight: 400, fontSize: 14,
                  padding: "12px 24px", borderRadius: 10, textDecoration: "none",
                  opacity: 0.7, transition: "all 0.3s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)" }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "0.7"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)" }}
              >
                استفسر عن المنتج
              </a>
            </div>

            {/* Trust signals */}
            <div style={{ display: "flex", gap: 20, marginTop: 28, flexWrap: "wrap" }}>
              {[
                { icon: "🚚", text: "توصيل لكل محافظات مصر" },
                { icon: "✅", text: "جودة مضمونة" },
                { icon: "💬", text: "دعم فوري على واتساب" },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  <span style={{ fontFamily: "Tajawal,sans-serif", fontSize: 12, color: "#F5EFE0", opacity: 0.4 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
