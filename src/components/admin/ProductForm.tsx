"use client";
import { useCallback, useEffect, useRef, useState } from "react";
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

type ImageRow = { id: string; url: string; alt_ar: string | null; sort_order: number };

const QUALITY_OPTIONS = [
  { value: "hi_copy",  label: "هاي كوبي" },
  { value: "mirror",   label: "ميرو" },
  { value: "original", label: "أورجنال" },
];
const STATUS_OPTIONS = [
  { value: "active",   label: "نشط" },
  { value: "draft",    label: "مسودة" },
  { value: "archived", label: "مؤرشف" },
];

// ── Image manager (only shown when editing existing product) ─────────────────
function ImageManager({ productId }: { productId: string }) {
  const [images, setImages]       = useState<ImageRow[]>([]);
  const [urlInput, setUrlInput]   = useState("");
  const [altInput, setAltInput]   = useState("");
  const [uploading, setUploading] = useState(false);
  const [adding, setAdding]       = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    const r = await fetch(`/api/admin/products/${productId}/images`);
    if (r.ok) setImages(await r.json());
  }, [productId]);

  useEffect(() => { load(); }, [load]);

  async function uploadFile(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await r.json();
    setUploading(false);
    if (!r.ok) { toast.error(data.error || "فشل الرفع"); return; }
    setUrlInput(data.url);
    toast.success("تم رفع الصورة — اضغط إضافة لحفظها");
  }

  async function addImage() {
    if (!urlInput.trim()) { toast.error("أدخل رابط الصورة"); return; }
    setAdding(true);
    const r = await fetch(`/api/admin/products/${productId}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: urlInput.trim(), alt_ar: altInput.trim() || null, sort_order: images.length }),
    });
    setAdding(false);
    if (!r.ok) { toast.error("فشل إضافة الصورة"); return; }
    setUrlInput(""); setAltInput("");
    toast.success("تمت إضافة الصورة");
    load();
  }

  async function deleteImage(imgId: string) {
    if (!confirm("حذف هذه الصورة؟")) return;
    await fetch(`/api/admin/products/${productId}/images`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_id: imgId }),
    });
    toast.success("تم الحذف");
    load();
  }

  return (
    <div className="bg-[#0A0806] rounded-xl border border-[#C9A84C]/10 p-6 space-y-5">
      <h2 className="font-semibold text-[#F5EFE0] border-b border-[#C9A84C]/10 pb-3">
        صور المنتج
      </h2>

      {/* Existing images */}
      {images.length > 0 ? (
        <div className="flex gap-3 flex-wrap">
          {images.map((img, i) => (
            <div key={img.id} className="relative group" style={{ width: 100, height: 100 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.alt_ar ?? ""} className="w-full h-full object-cover rounded-lg border border-[#C9A84C]/15" />
              {i === 0 && (
                <span className="absolute top-1 right-1 text-[9px] font-bold bg-[#C9A84C] text-[#0A0806] px-1.5 py-0.5 rounded">
                  رئيسية
                </span>
              )}
              <button
                type="button"
                onClick={() => deleteImage(img.id)}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity text-red-400 text-xs font-bold"
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[#F5EFE0]/30">لا توجد صور حتى الآن</p>
      )}

      {/* Add image section */}
      <div className="space-y-3 pt-2 border-t border-[#C9A84C]/10">
        <p className="text-xs text-[#F5EFE0]/40 font-semibold uppercase tracking-widest">إضافة صورة</p>

        {/* Upload file */}
        <div className="flex items-center gap-3">
          <input ref={fileRef} type="file" accept="image/*" className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) uploadFile(f); e.target.value = ""; }}
          />
          <button type="button" disabled={uploading}
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-[#C9A84C]/25 text-[#C9A84C] rounded-lg hover:bg-[#C9A84C]/10 transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <><span className="inline-block w-3 h-3 border border-[#C9A84C]/40 border-t-[#C9A84C] rounded-full animate-spin"/>جاري الرفع...</>
            ) : (
              <><span>↑</span> رفع صورة</>
            )}
          </button>
          <span className="text-xs text-[#F5EFE0]/25">أو</span>
        </div>

        {/* URL input */}
        <div className="flex gap-2">
          <input
            type="url" placeholder="رابط الصورة https://..."
            value={urlInput} onChange={e => setUrlInput(e.target.value)}
            className={inputCls + " flex-1"}
          />
          <input
            type="text" placeholder="وصف (اختياري)"
            value={altInput} onChange={e => setAltInput(e.target.value)}
            className={inputCls + " w-36"}
          />
          <button type="button" disabled={adding || !urlInput.trim()}
            onClick={addImage}
            className="px-4 py-2 bg-[#C9A84C] hover:bg-[#B89440] disabled:opacity-40 text-[#0A0806] font-bold text-sm rounded-lg transition-colors whitespace-nowrap"
          >
            {adding ? "..." : "إضافة"}
          </button>
        </div>

        {/* Preview */}
        {urlInput.trim() && (
          <div className="flex items-center gap-3 mt-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={urlInput} alt="" className="w-16 h-16 object-cover rounded-lg border border-[#C9A84C]/20"
              onError={e => (e.currentTarget.style.display = "none")}
              onLoad={e => (e.currentTarget.style.display = "block")}
              style={{ display: "none" }}
            />
            <p className="text-xs text-[#F5EFE0]/30">معاينة الصورة</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main form ────────────────────────────────────────────────────────────────
export default function ProductForm({ categories, product }: { categories: Category[]; product?: ProductRow }) {
  const router  = useRouter();
  const isEdit  = !!product;
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form     = e.currentTarget;
    const getValue = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value;
    const getChecked = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement)?.checked;

    const compare_at = getValue("compare_at_price");
    const data = {
      name_ar:         getValue("name_ar"),
      slug:            getValue("slug"),
      description_ar:  getValue("description_ar"),
      category_id:     getValue("category_id"),
      quality_tier:    getValue("quality_tier"),
      price:           getValue("price"),
      compare_at_price: compare_at || null,
      status:          getValue("status"),
      is_featured:     getChecked("is_featured"),
    };

    const url    = isEdit ? `/api/admin/products/${product!.id}` : "/api/admin/products";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      toast.error(err.error || "حدث خطأ");
      setLoading(false);
      return;
    }

    // For new product, get the returned id and redirect to edit page so user can add images
    if (!isEdit) {
      const created = await res.json();
      toast.success("تم إضافة المنتج — يمكنك إضافة الصور الآن");
      router.push(`/admin/products/${created.id}/edit`);
      return;
    }

    toast.success("تم تحديث المنتج");
    router.push("/admin/products");
    router.refresh();
  }

  function autoSlug(name: string) {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 60);
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#0A0806] rounded-xl border border-[#C9A84C]/10 p-6 space-y-5">
          <h2 className="font-semibold text-[#F5EFE0] border-b border-[#C9A84C]/10 pb-3">المعلومات الأساسية</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>اسم المنتج *</label>
              <input name="name_ar" required defaultValue={product?.name_ar} placeholder="مثال: شنطة جلد طبيعي"
                onChange={e => {
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
              <input name="slug" required defaultValue={product?.slug} placeholder="leather-handbag" className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>الوصف التفصيلي</label>
            <textarea name="description_ar" defaultValue={product?.description_ar || ""} rows={5}
              placeholder={`مثال:\nالخامة: جلد طبيعي فاخر\nالمقاس: 30×20×10 سم\nاللون: بيج / أسود\nمميزات: مقاومة للماء، يُثبّت على الكتف\nملاحظات: متوفر بألوان متعددة`}
              className={`${inputCls} resize-y min-h-[120px]`}
            />
            <p className="text-xs text-[#F5EFE0]/25 mt-1">اكتب كل التفاصيل: الخامة، المقاس، الألوان، المميزات</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>القسم *</label>
              <select name="category_id" required defaultValue={product?.category_id} className={inputCls}>
                <option value="">اختر قسم</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name_ar}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>درجة الجودة *</label>
              <select name="quality_tier" required defaultValue={product?.quality_tier || "hi_copy"} className={inputCls}>
                {QUALITY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>الحالة</label>
              <select name="status" defaultValue={product?.status || "draft"} className={inputCls}>
                {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>السعر (جنيه) *</label>
              <input name="price" type="number" required min="1" step="0.01"
                defaultValue={product?.price ? String(product.price) : ""} placeholder="1200" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>السعر قبل الخصم (اختياري)</label>
              <input name="compare_at_price" type="number" min="1" step="0.01"
                defaultValue={product?.compare_at_price ? String(product.compare_at_price) : ""} placeholder="1600" className={inputCls} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" name="is_featured" id="is_featured"
              defaultChecked={product?.is_featured} className="w-4 h-4 accent-[#C9A84C]" />
            <label htmlFor="is_featured" className="text-sm text-[#F5EFE0]/60">
              منتج مميّز (يظهر في الصفحة الرئيسية)
            </label>
          </div>
        </div>

        {!isEdit && (
          <div className="bg-[#0A0806] rounded-xl border border-[#C9A84C]/10 p-5">
            <p className="text-sm text-[#F5EFE0]/40">
              💡 بعد حفظ المنتج ستُنقل تلقائياً لصفحة التعديل حيث يمكنك إضافة الصور.
            </p>
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <button type="button" onClick={() => router.back()}
            className="px-5 py-2.5 text-sm text-[#F5EFE0]/50 hover:text-[#F5EFE0] border border-[#C9A84C]/20 rounded-lg transition-colors">
            إلغاء
          </button>
          <button type="submit" disabled={loading}
            className="px-6 py-2.5 bg-[#C9A84C] hover:bg-[#B89440] disabled:opacity-50 text-[#0A0806] font-bold text-sm rounded-lg transition-colors">
            {loading ? "جاري الحفظ..." : isEdit ? "حفظ التعديلات" : "إضافة المنتج"}
          </button>
        </div>
      </form>

      {/* Image manager — only when editing */}
      {isEdit && <ImageManager productId={product!.id} />}
    </div>
  );
}

const labelCls = "block text-sm text-[#F5EFE0]/60 mb-1.5";
const inputCls = "w-full bg-[#1A1310] border border-[#C9A84C]/20 rounded-lg px-4 py-2.5 text-[#F5EFE0] text-sm placeholder:text-[#F5EFE0]/20 focus:outline-none focus:border-[#C9A84C]/60 transition-colors";
