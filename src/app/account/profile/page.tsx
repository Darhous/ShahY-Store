"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "@/lib/auth/client"
import StoreHeader from "@/components/store/StoreHeader"
import StoreFooter from "@/components/store/StoreFooter"

export default function ProfilePage() {
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const [recentOrders, setRecentOrders] = useState<{ order_number: string; status: string; total: number; created_at: string }[]>([])

  useEffect(() => {
    if (!isPending && !session) router.push("/signin")
  }, [session, isPending, router])

  useEffect(() => {
    if (session) {
      fetch("/api/account/orders?limit=3").then(r => r.json()).then(d => setRecentOrders(d.orders || [])).catch(() => {})
    }
  }, [session])

  async function handleSignOut() {
    await signOut()
    router.push("/")
  }

  const STATUS: Record<string, string> = { pending: "قيد الانتظار", confirmed: "مؤكد", shipped: "تم الشحن", delivered: "تم التسليم", cancelled: "ملغي" }
  const STATUS_C: Record<string, string> = { pending: "#eab308", confirmed: "#3b82f6", shipped: "#a855f7", delivered: "#22c55e", cancelled: "#ef4444" }

  if (isPending) return null

  return (
    <>
      <StoreHeader />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&family=Cinzel&display=swap'); * { box-sizing: border-box; } body { margin: 0; background: #0A0806; }`}</style>
      <main style={{ background: "#0A0806", minHeight: "100vh", paddingTop: 80, direction: "rtl" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontFamily: "Cinzel,serif", fontSize: 10, letterSpacing: "6px", color: "#C9A84C", opacity: 0.7, marginBottom: 12 }}>✦ &nbsp; ACCOUNT &nbsp; ✦</div>
            <h1 style={{ fontFamily: "Tajawal,sans-serif", fontSize: 32, fontWeight: 900, background: "linear-gradient(135deg,#C9A84C,#F0D882)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", margin: 0 }}>
              حسابي
            </h1>
          </div>

          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {/* Sidebar */}
            <div style={{ flex: "0 0 200px" }}>
              <div style={{ background: "linear-gradient(145deg,#0E0C09,#111009)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: 14, padding: "20px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
                {[
                  { href: "/account/profile", label: "بياناتي", icon: "👤" },
                  { href: "/account/orders", label: "طلباتي", icon: "📦" },
                  { href: "/wishlist", label: "المفضلة", icon: "❤️" },
                ].map(item => (
                  <Link key={item.href} href={item.href} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8,
                    fontFamily: "Tajawal,sans-serif", fontSize: 14, fontWeight: 700, color: "#F5EFE0",
                    textDecoration: "none", transition: "background 0.2s",
                    background: item.href === "/account/profile" ? "rgba(201,168,76,0.1)" : "transparent",
                  }}>
                    <span>{item.icon}</span> {item.label}
                  </Link>
                ))}
                <div style={{ height: 1, background: "rgba(201,168,76,0.1)", margin: "8px 0" }} />
                <button onClick={handleSignOut}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, background: "none", border: "none", fontFamily: "Tajawal,sans-serif", fontSize: 14, color: "#F5EFE0", opacity: 0.4, cursor: "pointer", textAlign: "right", width: "100%" }}>
                  تسجيل الخروج →
                </button>
              </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 280, display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Profile info */}
              <div style={{ background: "linear-gradient(145deg,#0E0C09,#111009)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: 14, padding: "24px" }}>
                <h2 style={{ fontFamily: "Tajawal,sans-serif", fontSize: 16, fontWeight: 700, color: "#F5EFE0", marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
                  بياناتي
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "Tajawal,sans-serif", fontSize: 13, color: "#F5EFE0", opacity: 0.5 }}>الاسم</span>
                    <span style={{ fontFamily: "Tajawal,sans-serif", fontSize: 13, color: "#F5EFE0", fontWeight: 700 }}>{session?.user?.name || "—"}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "Tajawal,sans-serif", fontSize: 13, color: "#F5EFE0", opacity: 0.5 }}>البريد الإلكتروني</span>
                    <span style={{ fontFamily: "Tajawal,sans-serif", fontSize: 13, color: "#F5EFE0", opacity: 0.7, direction: "ltr" }}>{session?.user?.email || "—"}</span>
                  </div>
                </div>
              </div>

              {/* Recent orders */}
              <div style={{ background: "linear-gradient(145deg,#0E0C09,#111009)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: 14, padding: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
                  <h2 style={{ fontFamily: "Tajawal,sans-serif", fontSize: 16, fontWeight: 700, color: "#F5EFE0", margin: 0 }}>آخر طلباتي</h2>
                  <Link href="/account/orders" style={{ fontFamily: "Tajawal,sans-serif", fontSize: 13, color: "#C9A84C", textDecoration: "none", opacity: 0.8 }}>عرض الكل ←</Link>
                </div>
                {recentOrders.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "20px 0" }}>
                    <p style={{ fontFamily: "Tajawal,sans-serif", fontSize: 14, color: "#F5EFE0", opacity: 0.3, marginBottom: 12 }}>لا توجد طلبات بعد</p>
                    <Link href="/#products" style={{ fontFamily: "Tajawal,sans-serif", fontSize: 13, color: "#C9A84C", textDecoration: "none", fontWeight: 700 }}>تصفّح المنتجات</Link>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {recentOrders.map(o => (
                      <div key={o.order_number} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <div>
                          <div style={{ fontFamily: "monospace", fontSize: 12, color: "#F5EFE0", opacity: 0.6 }}>{o.order_number}</div>
                          <div style={{ fontFamily: "Tajawal,sans-serif", fontSize: 12, color: "#F5EFE0", opacity: 0.35, marginTop: 2 }}>{new Date(o.created_at).toLocaleDateString("ar-EG")}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <span style={{ fontFamily: "Tajawal,sans-serif", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: `${STATUS_C[o.status]}20`, color: STATUS_C[o.status] }}>
                            {STATUS[o.status]}
                          </span>
                          <span style={{ fontFamily: "Tajawal,sans-serif", fontSize: 13, fontWeight: 700, color: "#C9A84C" }}>{Number(o.total).toLocaleString("ar-EG")} ج</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <StoreFooter />
    </>
  )
}
