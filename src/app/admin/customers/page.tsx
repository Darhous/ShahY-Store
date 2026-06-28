export const dynamic = "force-dynamic"
import { db } from "@/lib/db/drizzle/connection"
import { customers, orders } from "@/lib/db/drizzle/schema"
import { count, desc } from "drizzle-orm"

export default async function CustomersPage() {
  let rows: { id: string; name: string; phone: string; email: string | null; created_at: Date | null }[] = []
  let countMap: Record<string, number> = {}

  try {
    rows = await db.select({
      id: customers.id, name: customers.name, phone: customers.phone, email: customers.email, created_at: customers.created_at,
    }).from(customers).orderBy(desc(customers.created_at)).limit(200)

    const orderCounts = await db.select({ phone: orders.phone, count: count() }).from(orders).groupBy(orders.phone)
    countMap = Object.fromEntries(orderCounts.map(r => [r.phone, r.count]))
  } catch { /* empty */ }

  return (
    <div className="space-y-6" dir="rtl" style={{ fontFamily: "Tajawal,sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap');`}</style>

      <div>
        <h1 className="text-2xl font-bold text-[#F5EFE0]">العملاء</h1>
        <p className="text-[#F5EFE0]/40 text-sm mt-1">{rows.length} عميل مسجّل</p>
      </div>

      <div className="bg-[#0A0806] rounded-xl border border-[#C9A84C]/10 overflow-hidden">
        {rows.length === 0 ? (
          <div className="p-12 text-center text-[#F5EFE0]/25 text-sm">لا يوجد عملاء مسجّلين بعد</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#C9A84C]/10">
                <th className="text-right px-6 py-3 text-[#C9A84C]/70 font-bold text-xs tracking-widest">الاسم</th>
                <th className="text-right px-4 py-3 text-[#C9A84C]/70 font-bold text-xs tracking-widest">الهاتف</th>
                <th className="text-right px-4 py-3 text-[#C9A84C]/70 font-bold text-xs tracking-widest">البريد</th>
                <th className="text-right px-4 py-3 text-[#C9A84C]/70 font-bold text-xs tracking-widest">الطلبات</th>
                <th className="text-right px-4 py-3 text-[#C9A84C]/70 font-bold text-xs tracking-widest">انضم</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c, i) => (
                <tr key={c.id} style={{ borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
                  <td className="px-6 py-4 text-[#F5EFE0] font-medium">{c.name}</td>
                  <td className="px-4 py-4 text-[#F5EFE0]/60 font-mono text-xs" dir="ltr">{c.phone}</td>
                  <td className="px-4 py-4 text-[#F5EFE0]/50 text-xs" dir="ltr">{c.email || "—"}</td>
                  <td className="px-4 py-4">
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-[#C9A84C]/10 text-[#C9A84C]">
                      {countMap[c.phone] || 0} طلب
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[#F5EFE0]/30 text-xs">
                    {c.created_at ? new Date(c.created_at).toLocaleDateString("ar-EG") : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
