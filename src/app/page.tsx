import type { Metadata } from "next"
import { db } from "@/lib/db/drizzle/connection"
import { products, productImages, categories } from "@/lib/db/drizzle/schema"
import { eq, and } from "drizzle-orm"
import LoadingIntro from "@/components/store/LoadingIntro"
import ProductGrid, { type StoreProduct } from "@/components/store/ProductGrid"
import StoreHeader from "@/components/store/StoreHeader"
import StoreFooter from "@/components/store/StoreFooter"

export const metadata: Metadata = {
  title: "ShahY Store — إكسسوارات فاخرة مستوردة",
  description: "أرقى الشنط والمحافظ والشوزات النسائية المستوردة — تشكيلات حصرية بأفضل الأسعار",
}

async function getProducts(): Promise<StoreProduct[]> {
  try {
    const rows = await db
      .select({
        id: products.id,
        slug: products.slug,
        name_ar: products.name_ar,
        description_ar: products.description_ar,
        price: products.price,
        compare_at_price: products.compare_at_price,
        quality_tier: products.quality_tier,
        is_featured: products.is_featured,
        category_name: categories.name_ar,
      })
      .from(products)
      .leftJoin(categories, eq(products.category_id, categories.id))
      .where(and(eq(products.status, "active")))
      .limit(50)

    const ids = rows.map(r => r.id)
    const images = ids.length > 0
      ? await db
          .select({ product_id: productImages.product_id, url: productImages.url, alt_ar: productImages.alt_ar })
          .from(productImages)
          .where(eq(productImages.sort_order, 0))
      : []

    const imageMap = Object.fromEntries(images.map(i => [i.product_id, i]))

    return rows.map(r => ({
      ...r,
      price: Number(r.price),
      compare_at_price: r.compare_at_price ? Number(r.compare_at_price) : null,
      image: imageMap[r.id] ?? null,
    }))
  } catch {
    return []
  }
}

export default async function StorePage() {
  const initialProducts = await getProducts()

  return (
    <>
      <StoreHeader />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;700;800;900&family=Playfair+Display:ital,wght@1,400&family=Cormorant+Garamond:ital,wght@1,300&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #0A0806; }
        main { padding: 0 !important; min-height: unset !important; }
      `}</style>

      <LoadingIntro />

      {/* Hero */}
      <section style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 20%, #1C0A0A 0%, #0A0806 70%)",
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "120px 40px 80px",
        direction: "rtl", position: "relative", overflow: "hidden",
      }}>
        {/* Decorative lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
          <line x1="-50" y1="200" x2="800" y2="50" stroke="#7B1C2E" strokeWidth="0.6" opacity="0.15" />
          <line x1="600" y1="850" x2="1500" y2="300" stroke="#7B1C2E" strokeWidth="0.6" opacity="0.12" />
          <line x1="200" y1="-20" x2="1100" y2="600" stroke="#C9A84C" strokeWidth="0.4" opacity="0.1" />
          <line x1="-100" y1="600" x2="700" y2="350" stroke="#C9A84C" strokeWidth="0.3" opacity="0.08" />
        </svg>

        {/* Ambient glow */}
        <div style={{
          position: "absolute", top: "20%", left: "50%", transform: "translate(-50%,-50%)",
          width: 600, height: 400, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(123,28,46,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
          <div style={{
            fontFamily: "Tajawal, sans-serif", fontSize: 12, letterSpacing: "6px",
            color: "#C9A84C", opacity: 0.8, marginBottom: 32, textTransform: "uppercase",
          }}>
            ✦ &nbsp; منتجات مستوردة فاخرة &nbsp; ✦
          </div>

          <h1 style={{
            fontFamily: "Tajawal, sans-serif", margin: 0,
            fontSize: "clamp(42px, 7vw, 88px)", fontWeight: 200,
            color: "#F5EFE0", lineHeight: 1.2, marginBottom: 8,
          }}>
            حين يُصبح الأناقة
          </h1>

          <h2 style={{
            fontFamily: "Tajawal, sans-serif", margin: 0,
            fontSize: "clamp(48px, 8vw, 104px)", fontWeight: 800,
            color: "#C9A84C", lineHeight: 1.1, marginBottom: 32,
          }}>
            أُسلوبَ حياة.
          </h2>

          <p style={{
            fontFamily: "Cormorant Garamond, serif", fontStyle: "italic",
            fontSize: "clamp(16px, 2.5vw, 22px)", color: "#F5EFE0",
            opacity: 0.55, letterSpacing: "1px", marginBottom: 48, margin: "0 auto 48px",
            maxWidth: 500,
          }}>
            شنط · محافظ · شوزات · تشكيلات حصرية
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#products"
              style={{
                fontFamily: "Tajawal, sans-serif", fontWeight: 700, fontSize: 15,
                padding: "14px 36px", borderRadius: 8, textDecoration: "none",
                background: "linear-gradient(135deg, #C9A84C, #F0D882)",
                color: "#0A0806", letterSpacing: "0.5px",
                boxShadow: "0 8px 32px rgba(201,168,76,0.3)",
              }}>
              تسوّق الآن
            </a>
            <a href={`https://wa.me/201015835455?text=${encodeURIComponent("السلام عليكم، أريد الاستفسار عن منتجاتكم")}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: "Tajawal, sans-serif", fontWeight: 700, fontSize: 15,
                padding: "14px 36px", borderRadius: 8, textDecoration: "none",
                background: "transparent", color: "#F5EFE0",
                border: "1px solid rgba(201,168,76,0.3)", letterSpacing: "0.5px",
              }}>
              📱 تواصل معنا
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          opacity: 0.4, animation: "heroFloat 2s ease-in-out infinite",
        }}>
          <style>{`@keyframes heroFloat{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(6px)}}`}</style>
          <div style={{ fontFamily: "Tajawal,sans-serif", fontSize: 10, letterSpacing: "3px", color: "#C9A84C" }}>SCROLL</div>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #C9A84C, transparent)" }} />
        </div>
      </section>

      {/* Products */}
      <div id="products">
        <ProductGrid initialProducts={initialProducts} />
      </div>
      <StoreFooter />
    </>
  )
}
