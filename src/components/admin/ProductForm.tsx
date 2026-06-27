"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Category } from "@/lib/db/drizzle/schema";

type ProductRow = {
  id: string;
  name_ar: string;
  slug: string;
  description_ar: string | null;
  category_id: string;
  quality_tier: "hi_copy" | "mirror" | "original";
  price: string | number;
  compare_at_price: string | number | null;
  status: "active" | "draft" | "archived";
  is_featured: boolean;
};

const QUALITY_OPTIONS = [
  { value: "hi_copy", label: "هاي كوبي" },
  { value: "mirror", label: "ميرو" },
  { value: "original", label: "أورجنال" },
];

const STATUS_OPTIONS = [
  { value: "active", label: "نشط" },
  { value: "draft", label: "مسودة" },
  { value: "archived", label: "مؤرشف" },
];

export default function ProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product?: ProductRow;
}) {
  const router = useRouter();
  const isEdit = !!product;
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const getValue = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value;
    const getChecked = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement)?.checked;

    const compare_at = getValue("compare_at_price");
    const data = {
      name_ar: getValue("name_ar"),
      slug: getValue("slug"),
      description_ar: getValue("description_ar"),
      category_id: getValue("category_id"),
      quality_tier: getValue("quality_tier"),
      price: getValue("price"),
      compare_at_price: compare_at || null,
      status: getValue("status"),
      is_featured: getChecked("is_featured"),
    };

    const url = isEdit ? `/api/admin/products/${product!.id}` : "/api/admin/products";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      toast.error(err.error || "حدث خطأ");
      setLoading(false);
      return;
    }

    toast.success(isEdit ? "تم تحديث المنتج" : "تم إضافة المنتج");
    router.push("/admin/products");
    router.refresh();
  }

  function autoSlug(name: string) {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 60);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-[#0A0806] rounded-xl border border-[#C9A84C]/10 p-6 space-y-5">
        <h2 className="font-semibold text-[#F5EFE0] border-b border-[#C9A84C]/10 pb-3">
          المعلومات الأساسية
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>اسم المنتج *</label>
            <input
              name="name_ar"
              required
              defaultValue={product?.name_ar}
              placeholder="مثال: شنطة جلد طبيعي"
              onChange={(e) => {
                if (!isEdit) {
                  const slugEl = e.currentTarget.form?.elements.namedItem("slug") as HTMLInputElement;
                  if (slugEl) slugEl.value = autoSlug(e.currentTarget.value);
                }
              }}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Slug (URL) *</label>
            <input
              name="slug"
              required
              defaultValue={product?.slug}
              placeholder="leather-handbag"
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>الوصف</label>
          <textarea
            name="description_ar"
            defaultValue={product?.description_ar || ""}
            rows={3}
            placeholder="وصف المنتج..."
            className={`${inputCls} resize-none`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>القسم *</label>
            <select name="category_id" required defaultValue={product?.category_id} className={inputCls}>
              <option value="">اختر قسم</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name_ar}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>درجة الجودة *</label>
            <select name="quality_tier" required defaultValue={product?.quality_tier || "hi_copy"} className={inputCls}>
              {QUALITY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>الحالة</label>
            <select name="status" defaultValue={product?.status || "draft"} className={inputCls}>
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>السعر (جنيه) *</label>
            <input
              name="price"
              type="number"
              required
              min="1"
              step="0.01"
              defaultValue={product?.price ? String(product.price) : ""}
              placeholder="1200"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>السعر قبل الخصم (اختياري)</label>
            <input
              name="compare_at_price"
              type="number"
              min="1"
              step="0.01"
              defaultValue={product?.compare_at_price ? String(product.compare_at_price) : ""}
              placeholder="1600"
              className={inputCls}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="is_featured"
            id="is_featured"
            defaultChecked={product?.is_featured}
            className="w-4 h-4 accent-[#C9A84C]"
          />
          <label htmlFor="is_featured" className="text-sm text-[#F5EFE0]/60">
            منتج مميّز (يظهر في الصفحة الرئيسية)
          </label>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2.5 text-sm text-[#F5EFE0]/50 hover:text-[#F5EFE0] border border-[#C9A84C]/20 rounded-lg transition-colors"
        >
          إلغاء
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-[#C9A84C] hover:bg-[#B89440] disabled:opacity-50 text-[#0A0806] font-bold text-sm rounded-lg transition-colors"
        >
          {loading ? "جاري الحفظ..." : isEdit ? "حفظ التعديلات" : "إضافة المنتج"}
        </button>
      </div>
    </form>
  );
}

const labelCls = "block text-sm text-[#F5EFE0]/60 mb-1.5";
const inputCls =
  "w-full bg-[#1A1310] border border-[#C9A84C]/20 rounded-lg px-4 py-2.5 text-[#F5EFE0] text-sm placeholder:text-[#F5EFE0]/20 focus:outline-none focus:border-[#C9A84C]/60 transition-colors";
