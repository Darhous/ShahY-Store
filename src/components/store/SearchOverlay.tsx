"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

interface Result { id: string; slug: string; name_ar: string; price: number; category_name: string | null; image: string | null }

export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("")
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => { inputRef.current?.focus() }, [])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose?.() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)
    if (q.trim().length < 2) { setResults([]); return }
    setLoading(true)
    timer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`)
        const data = await res.json()
        setResults(data)
      } finally { setLoading(false) }
    }, 250)
  }, [q])

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        paddingTop: 80,
      }}
    >
      <div style={{
        background: "#0E0C09", border: "1px solid rgba(201,168,76,0.2)",
        borderRadius: 16, width: "min(640px, 92vw)", overflow: "hidden",
        boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
      }}>
        {/* Input */}
        <div style={{ display: "flex", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)}
            placeholder="ابحثي عن منتج..."
            style={{
              flex: 1, background: "none", border: "none", outline: "none",
              fontFamily: "Tajawal,sans-serif", fontSize: 16, color: "#F5EFE0",
              padding: "0 14px", direction: "rtl",
            }}
          />
          {loading && <div style={{ width: 16, height: 16, border: "2px solid rgba(201,168,76,0.3)", borderTopColor: "#C9A84C", borderRadius: "50%", animation: "searchSpin 0.7s linear infinite", flexShrink: 0 }} />}
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#F5EFE0", opacity: 0.4, fontSize: 18, padding: "0 4px", marginRight: 8 }}>✕</button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div style={{ maxHeight: 420, overflowY: "auto" }}>
            {results.map(r => (
              <Link key={r.id} href={`/products/${r.slug}`} onClick={onClose}
                style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 14, padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(201,168,76,0.06)")}
                onMouseLeave={e => (e.currentTarget.style.background = "")}>
                <div style={{ width: 48, height: 48, borderRadius: 8, overflow: "hidden", flexShrink: 0, background: "#1a1a1a" }}>
                  {r.image && <img src={r.image} alt={r.name_ar} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "Tajawal,sans-serif", fontSize: 14, fontWeight: 700, color: "#F5EFE0" }}>{r.name_ar}</div>
                  {r.category_name && <div style={{ fontFamily: "Tajawal,sans-serif", fontSize: 11, color: "rgba(245,239,224,0.35)", marginTop: 2 }}>{r.category_name}</div>}
                </div>
                <div style={{ fontFamily: "Tajawal,sans-serif", fontSize: 14, fontWeight: 700, color: "#C9A84C", flexShrink: 0 }}>
                  {r.price.toLocaleString("ar-EG")} ج.م
                </div>
              </Link>
            ))}
          </div>
        )}

        {q.length >= 2 && !loading && results.length === 0 && (
          <div style={{ textAlign: "center", padding: "28px 20px", fontFamily: "Tajawal,sans-serif", fontSize: 14, color: "rgba(245,239,224,0.3)" }}>
            لا توجد نتائج لـ &quot;{q}&quot;
          </div>
        )}

        {q.length < 2 && (
          <div style={{ textAlign: "center", padding: "28px 20px", fontFamily: "Tajawal,sans-serif", fontSize: 13, color: "rgba(245,239,224,0.2)" }}>
            اكتبي اسم المنتج للبحث...
          </div>
        )}
      </div>
      <style>{`@keyframes searchSpin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
