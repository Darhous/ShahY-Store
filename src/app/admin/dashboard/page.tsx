export const dynamic = "force-dynamic";
import { db } from "@/lib/db/drizzle/connection";
import { orders, products, customers } from "@/lib/db/drizzle/schema";
import { eq, count, sum, desc } from "drizzle-orm";

async function getStats() {
  const [totalOrders] = await db.select({ count: count() }).from(orders);
  const [pendingOrders] = await db
    .select({ count: count() })
    .from(orders)
    .where(eq(orders.status, "pending"));
  const [totalProducts] = await db
    .select({ count: count() })
    .from(products)
    .where(eq(products.status, "active"));
  const [totalRevenue] = await db
    .select({ sum: sum(orders.total) })
    .from(orders)
    .where(eq(orders.status, "delivered"));

  const recentOrders = await db
    .select()
    .from(orders)
    .orderBy(desc(orders.created_at))
    .limit(5);

  return {
    totalOrders: totalOrders.count,
    pendingOrders: pendingOrders.count,
    totalProducts: totalProducts.count,
    totalRevenue: Number(totalRevenue.sum || 0),
    recentOrders,
  };
}

const STATUS_LABELS: Record<string, string> = {
  pending: "قيد الانتظار",
  confirmed: "مؤكد",
  shipped: "تم الشحن",
  delivered: "تم التسليم",
  cancelled: "ملغي",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400",
  confirmed: "bg-blue-500/20 text-blue-400",
  shipped: "bg-purple-500/20 text-purple-400",
  delivered: "bg-green-500/20 text-green-400",
  cancelled: "bg-red-500/20 text-red-400",
};

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#F5EFE0]">الداشبورد</h1>
        <p className="text-[#F5EFE0]/40 text-sm mt-1">نظرة عامة على المتجر</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="إجمالي الطلبات"
          value={stats.totalOrders.toString()}
          icon="🧾"
        />
        <StatCard
          label="طلبات معلّقة"
          value={stats.pendingOrders.toString()}
          icon="⏳"
          highlight
        />
        <StatCard
          label="منتجات نشطة"
          value={stats.totalProducts.toString()}
          icon="📦"
        />
        <StatCard
          label="إجمالي المبيعات"
          value={`${stats.totalRevenue.toLocaleString("ar-EG")} ج`}
          icon="💰"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-[#0A0806] rounded-xl border border-[#C9A84C]/10 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#C9A84C]/10">
          <h2 className="font-semibold text-[#F5EFE0]">آخر الطلبات</h2>
          <a href="/admin/orders" className="text-xs text-[#C9A84C] hover:underline">
            عرض الكل ←
          </a>
        </div>
        <div className="divide-y divide-[#C9A84C]/5">
          {stats.recentOrders.length === 0 ? (
            <p className="text-center text-[#F5EFE0]/30 py-8 text-sm">
              لا توجد طلبات بعد
            </p>
          ) : (
            stats.recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between px-6 py-3"
              >
                <div>
                  <p className="text-sm text-[#F5EFE0]">{order.customer_name}</p>
                  <p className="text-xs text-[#F5EFE0]/40">{order.order_number}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[order.status]}`}
                  >
                    {STATUS_LABELS[order.status]}
                  </span>
                  <span className="text-sm text-[#C9A84C] font-medium">
                    {Number(order.total).toLocaleString("ar-EG")} ج
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  highlight,
}: {
  label: string;
  value: string;
  icon: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        highlight
          ? "bg-[#C9A84C]/10 border-[#C9A84C]/30"
          : "bg-[#0A0806] border-[#C9A84C]/10"
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{icon}</span>
        <span className="text-xs text-[#F5EFE0]/40">{label}</span>
      </div>
      <p className="text-2xl font-bold text-[#F5EFE0]">{value}</p>
    </div>
  );
}
