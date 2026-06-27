"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import StoreHeader from "@/components/store/StoreHeader"
import StoreFooter from "@/components/store/StoreFooter"

function ConfirmContent() {
  const params = useSearchParams()
  const orderNumber = params.get("order") ?? ""

  return (
    <div style={{ textAlign: "center", padding: "80px 24px" }}>
      <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
      <div style={{ fontFamily: "Cinzel,serif", fontSize: 10, letterSpacing: "6px", color: "#C9A84C", opacity: 0.7, marginBottom: 16 }}>
        ✦ &nbsp; ORDER CONFIRMED &nbsp; ✦
      </div>
      <h1 style={{
        fontFamily: "Tajawal,sans-serif", fontSize: "clamp(26px,5vw,40px)", fontWeight: 800,
        background: "linear-gradient(135deg,#C9A84C,#F0D882)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        margin: "0 0 16px",
      }}>
        تم تأكيد طلبك!
      </h1>
      {orderNumber && (
        <div style={{
          fontFamily: "Tajawal,sans-serif", fontSize: 15, color: "#F5EFE0", opacity: 0.5, marginBottom: 32,
        }}>
          رقم الطلب: <span style={{ color: "#C9A84C", fontWeight: 700, opacity: 1 }}>{orderNumber}</span>
        </div>
      )}
      <div style={{
        background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.12)",
        borderRadius: 14, padding: "24px 28px", maxWidth: 420, margin: "0 auto 40px",
      }}>
        <p style={{ fontFamily: "Tajawal,sans-serif", fontSize: 15, color: "#F5EFE0", opacity: 0.6, lineHeight: 1.9, margin: 0 }}>
          سنتواصل معك قريباً على رقمك لتأكيد الطلب وتحديد موعد التوصيل.
          إذا لم تتلقَّ ردًّا خلال ساعة، يمكنك التواصل معنا مباشرةً على واتساب.
        </p>
      </div>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
        <a href={`https://wa.me/201015835455?text=${encodeURIComponent(`السلام عليكم، أريد الاستفسار عن طلبي رقم ${orderNumber}`)}`}
          target="_blank" rel="noopener noreferrer"
          style={{
            fontFamily: "Tajawal,sans-serif", fontWeight: 700, fontSize: 14,
            padding: "12px 28px", borderRadius: 8, textDecoration: "none",
            background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.35)",
            color: "#25D366",
          }}>
          📱 تواصل على واتساب
        </a>
        <Link href="/" style={{
          fontFamily: "Tajawal,sans-serif", fontWeight: 700, fontSize: 14,
          padding: "12px 28px", borderRadius: 8, textDecoration: "none",
          background: "linear-gradient(135deg,#C9A84C,#F0D882)", color: "#0A0806",
        }}>
          متابعة التسوق
        </Link>
      </div>
    </div>
  )
}

export default function OrderConfirmedPage() {
  return (
    <>
      <StoreHeader />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800;900&family=Cinzel:wght@400&display=swap');
        * { box-sizing: border-box; } body { margin: 0; background: #0A0806; }
      `}</style>
      <main style={{ background: "#0A0806", minHeight: "100vh", paddingTop: 80, direction: "rtl", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Suspense fallback={<div style={{ fontFamily: "Tajawal,sans-serif", color: "#C9A84C", textAlign: "center", padding: 60 }}>...</div>}>
          <ConfirmContent />
        </Suspense>
      </main>
      <StoreFooter />
    </>
  )
}
