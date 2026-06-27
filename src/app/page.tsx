import type { Metadata } from "next"
import { db } from "@/lib/db/drizzle/connection"
import { products, productImages, categories } from "@/lib/db/drizzle/schema"
import { eq, and } from "drizzle-orm"
import LoadingIntro from "@/components/store/LoadingIntro"
import ProductGrid, { type StoreProduct } from "@/components/store/ProductGrid"
import StoreHeader from "@/components/store/StoreHeader"
import StoreFooter from "@/components/store/StoreFooter"
import FloatingWA from "@/components/store/FloatingWA"
import HeroSection from "@/components/store/HeroSection"

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
      <HeroSection />

      {/* Products */}
      <div id="products">
        <ProductGrid initialProducts={initialProducts} />
      </div>
      <StoreFooter />
      <FloatingWA />
    </>
  )
}
