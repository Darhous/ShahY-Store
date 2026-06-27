export const dynamic = "force-dynamic";
import { db } from "@/lib/db/drizzle/connection";
import { shippingZones } from "@/lib/db/drizzle/schema";
import { asc } from "drizzle-orm";

export default async function ShippingPage() {
  const zones = await db.select().from(shippingZones).orderBy(asc(shippingZones.governorate_ar));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#F5EFE0]">تكاليف الشحن</h1>
        <p className="text-[#F5EFE0]/40 text-sm mt-1">شحن لكل المحافظات — يمكن تعديل التكلفة</p>
      </div>

      <div className="bg-[#0A0806] rounded-xl border border-[#C9A84C]/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#C9A84C]/10">
              <th className="text-right px-6 py-3 text-[#F5EFE0]/40 font-medium">المحافظة</th>
              <th className="text-right px-4 py-3 text-[#F5EFE0]/40 font-medium">التكلفة (جنيه)</th>
              <th className="text-right px-4 py-3 text-[#F5EFE0]/40 font-medium">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C9A84C]/5">
            {zones.map((z) => (
              <tr key={z.id}>
                <td className="px-6 py-3 text-[#F5EFE0]">{z.governorate_ar}</td>
                <td className="px-4 py-3 text-[#C9A84C] font-medium">
                  {Number(z.cost) === 0 ? "مجاني" : `${Number(z.cost)} ج`}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${z.is_active ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                    {z.is_active ? "مفعّل" : "معطّل"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
