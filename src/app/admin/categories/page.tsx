export const dynamic = "force-dynamic";
import { db } from "@/lib/db/drizzle/connection";
import { categories } from "@/lib/db/drizzle/schema";
import { asc } from "drizzle-orm";

export default async function CategoriesPage() {
  const cats = await db.select().from(categories).orderBy(asc(categories.sort_order));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#F5EFE0]">الأقسام</h1>
        <p className="text-[#F5EFE0]/40 text-sm mt-1">{cats.length} قسم</p>
      </div>

      <div className="bg-[#0A0806] rounded-xl border border-[#C9A84C]/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#C9A84C]/10">
              <th className="text-right px-6 py-3 text-[#F5EFE0]/40 font-medium">الاسم</th>
              <th className="text-right px-4 py-3 text-[#F5EFE0]/40 font-medium">Slug</th>
              <th className="text-right px-4 py-3 text-[#F5EFE0]/40 font-medium">الترتيب</th>
              <th className="text-right px-4 py-3 text-[#F5EFE0]/40 font-medium">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C9A84C]/5">
            {cats.map((c) => (
              <tr key={c.id}>
                <td className="px-6 py-4 text-[#F5EFE0] font-medium">{c.name_ar}</td>
                <td className="px-4 py-4 text-[#F5EFE0]/50 font-mono text-xs">{c.slug}</td>
                <td className="px-4 py-4 text-[#F5EFE0]/50">{c.sort_order}</td>
                <td className="px-4 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${c.is_active ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                    {c.is_active ? "نشط" : "مخفي"}
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
