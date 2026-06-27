"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function StoreHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Cinzel:wght@400&family=Tajawal:wght@400;700&display=swap');`}</style>
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 9000,
      background: scrolled ? "rgba(10,8,6,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(201,168,76,0.12)" : "1px solid transparent",
      transition: "all 0.4s cubic-bezier(0.2,0,0.2,1)",
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
          <span style={{
            fontFamily: "Cinzel, serif", fontSize: 10, color: "#666",
            letterSpacing: "4px", display: "block", lineHeight: 1, marginTop: 1,
          }}>STORE</span>
        </div>
      </Link>

      {/* Nav links */}
      <nav style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <a href="/#products" style={{
          fontFamily: "Tajawal, sans-serif", fontSize: 13, color: "#F5EFE0",
          opacity: 0.6, textDecoration: "none", transition: "opacity 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "0.6")}
        >المنتجات</a>

        <a href={`https://wa.me/201015835455?text=${encodeURIComponent("السلام عليكم، أريد الاستفسار عن منتجاتكم")}`}
          target="_blank" rel="noopener noreferrer"
          style={{
            fontFamily: "Tajawal, sans-serif", fontSize: 13, color: "#F5EFE0",
            opacity: 0.6, textDecoration: "none", transition: "opacity 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "0.6")}
        >تواصل معنا</a>

        <Link href="/admin/dashboard" style={{
          fontFamily: "Tajawal, sans-serif", fontSize: 12, fontWeight: 700,
          color: "#C9A84C", border: "1px solid rgba(201,168,76,0.35)",
          padding: "6px 16px", borderRadius: 6, textDecoration: "none",
          transition: "all 0.25s ease", letterSpacing: "0.5px",
          background: "rgba(201,168,76,0.06)",
        }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(201,168,76,0.15)"
            e.currentTarget.style.borderColor = "rgba(201,168,76,0.7)"
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(201,168,76,0.06)"
            e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)"
          }}
        >⚙ الأدمن</Link>
      </nav>
    </header>
    </>
  )
}
