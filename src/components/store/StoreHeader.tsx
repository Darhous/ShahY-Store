"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useCart } from "@/contexts/CartContext"
import SearchOverlay from "./SearchOverlay"

export default function StoreHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [wlCount, setWlCount] = useState(0)
  const [announcement, setAnnouncement] = useState<{ text: string; active: boolean } | null>(null)
  const { count } = useCart()

  useEffect(() => {
    fetch("/api/announcement").then(r => r.json()).then(setAnnouncement).catch(() => {})
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    function syncWl() {
      try { setWlCount(JSON.parse(localStorage.getItem("shahy-wishlist") ?? "[]").length) } catch {}
    }
    syncWl()
    window.addEventListener("storage", syncWl)
    window.addEventListener("shahy-wl-change", syncWl)
    return () => { window.removeEventListener("storage", syncWl); window.removeEventListener("shahy-wl-change", syncWl) }
  }, [])

  const showAnnouncement = announcement?.active && !!announcement.text

  return (
    <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Cinzel:wght@400&family=Tajawal:wght@400;700&display=swap');
      .sh-icon-btn { position:relative; background:none; border:none; cursor:pointer; padding:6px; border-radius:8px; transition:background 0.2s; display:flex; align-items:center; color:#C9A84C; }
      .sh-icon-btn:hover { background:rgba(201,168,76,0.1); }
      .sh-badge { position:absolute; top:-2px; left:-2px; min-width:16px; height:16px; border-radius:8px; background:#7B1C2E; color:#fff; font-size:9px; font-weight:700; display:flex; align-items:center; justify-content:center; padding:0 4px; font-family:Tajawal,sans-serif; animation:badgePop 0.25s cubic-bezier(0.34,1.56,0.64,1); }
      @keyframes badgePop { from{transform:scale(0)} to{transform:scale(1)} }
      @keyframes announceFade { from{opacity:0;transform:translateY(-100%)} to{opacity:1;transform:translateY(0)} }
    `}</style>

    {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}

    {/* Announcement bar */}
    {showAnnouncement && (
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9001,
        background: "linear-gradient(135deg, #7B1C2E, #9B2E42)",
        borderBottom: "1px solid rgba(201,168,76,0.2)",
        padding: "8px 24px", textAlign: "center",
        animation: "announceFade 0.4s ease both",
      }}>
        <span style={{ fontFamily: "Tajawal, sans-serif", fontSize: 13, fontWeight: 700, color: "#F5EFE0", letterSpacing: "0.3px" }}>
          ✦ &nbsp; {announcement.text} &nbsp; ✦
        </span>
      </div>
    )}

    <header style={{
      position: "fixed", top: showAnnouncement ? 36 : 0, left: 0, right: 0, zIndex: 9000,
      background: scrolled ? "rgba(10,8,6,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(201,168,76,0.12)" : "1px solid transparent",
      transition: "top 0.3s ease, background 0.4s cubic-bezier(0.2,0,0.2,1), backdrop-filter 0.4s cubic-bezier(0.2,0,0.2,1), border-color 0.4s cubic-bezier(0.2,0,0.2,1)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 40px", height: 64,
    }}>
      {/* Logo */}
      <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
        <svg width="28" height="16" viewBox="0 0 120 64" fill="none">
          <path d="M5 60L18 18L38 42L60 5L82 42L102 18L115 60Z"
            stroke="url(#hGold)" strokeWidth="2.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <circle cx="60" cy="5" r="4" fill="#F0D882"/>
          <line x1="5" y1="60" x2="115" y2="60" stroke="url(#hGold)" strokeWidth="1.5"/>
          <defs>
            <linearGradient id="hGold" x1="0" y1="0" x2="120" y2="0">
              <stop offset="0%" stopColor="#8B6020"/>
              <stop offset="50%" stopColor="#F0D882"/>
              <stop offset="100%" stopColor="#8B6020"/>
            </linearGradient>
          </defs>
        </svg>
        <div>
          <span style={{
            fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700,
            background: "linear-gradient(135deg, #C9A84C, #F0D882, #C9A84C)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            letterSpacing: "1px",
          }}>ShahY</span>
          <span style={{ fontFamily: "Cinzel, serif", fontSize: 10, color: "#666", letterSpacing: "4px", display: "block", lineHeight: 1, marginTop: 1 }}>STORE</span>
        </div>
      </Link>

      {/* Nav links */}
      <nav style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <a href="/#products" style={{ fontFamily: "Tajawal, sans-serif", fontSize: 13, color: "#F5EFE0", opacity: 0.6, textDecoration: "none", transition: "opacity 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "1")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.6")}>المنتجات</a>

        <a href="/sale" style={{ fontFamily: "Tajawal, sans-serif", fontSize: 13, color: "#E8756A", opacity: 0.85, textDecoration: "none", transition: "opacity 0.2s", fontWeight: 700 }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "1")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.85")}>العروض</a>

        <a href="/track" style={{ fontFamily: "Tajawal, sans-serif", fontSize: 13, color: "#F5EFE0", opacity: 0.6, textDecoration: "none", transition: "opacity 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "1")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.6")}>تتبّع طلبك</a>

        <a href={`https://wa.me/201015835455?text=${encodeURIComponent("السلام عليكم، أريد الاستفسار عن منتجاتكم")}`}
          target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: "Tajawal, sans-serif", fontSize: 13, color: "#F5EFE0", opacity: 0.6, textDecoration: "none", transition: "opacity 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "1")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.6")}>تواصل معنا</a>

        {/* Search */}
        <button onClick={() => setSearchOpen(true)} className="sh-icon-btn" aria-label="بحث">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>

        {/* Wishlist */}
        <Link href="/wishlist" className="sh-icon-btn" aria-label="قائمة الأمنيات">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          {wlCount > 0 && <span className="sh-badge">{wlCount}</span>}
        </Link>

        {/* Cart */}
        <Link href="/cart" className="sh-icon-btn" aria-label="السلة">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {count > 0 && <span className="sh-badge">{count > 99 ? "99+" : count}</span>}
        </Link>

        <Link href="/admin/dashboard" style={{
          fontFamily: "Tajawal, sans-serif", fontSize: 12, fontWeight: 700, color: "#C9A84C",
          border: "1px solid rgba(201,168,76,0.35)", padding: "6px 16px", borderRadius: 6,
          textDecoration: "none", transition: "all 0.25s ease", background: "rgba(201,168,76,0.06)",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,0.15)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.7)" }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(201,168,76,0.06)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)" }}>
          ⚙ الأدمن
        </Link>
      </nav>
    </header>
    </>
  )
}
