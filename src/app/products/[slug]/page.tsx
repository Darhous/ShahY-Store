import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { db } from "@/lib/db/drizzle/connection"
import { products, productImages, categories } from "@/lib/db/drizzle/schema"
import { eq, and, asc } from "drizzle-orm"
import ProductDetail from "@/components/store/ProductDetail"
import StoreHeader from "@/components/store/StoreHeader"
import StoreFooter from "@/components/store/StoreFooter"

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const rows = await db
    .select({ name_ar: products.name_ar, description_ar: products.description_ar })
    .from(products).where(eq(products.slug, slug)).limit(1)
  if (!rows[0]) return { title: "المنتج غير موجود" }
  return {
    title: `${rows[0].name_ar} — ShahY Store`,
    description: rows[0].description_ar ?? undefined,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params

  const rows = await db
    .select({
      id: products.id, slug: products.slug,
      name_ar: products.name_ar, description_ar: products.description_ar,
      price: products.price, compare_at_price: products.compare_at_price,
      quality_tier: products.quality_tier, is_featured: products.is_featured,
      status: products.status, category_name: categories.name_ar,
    })
    .from(products)
    .leftJoin(categories, eq(products.category_id, categories.id))
    .where(and(eq(products.slug, slug), eq(products.status, "active")))
    .limit(1)

  if (!rows[0]) notFound()
  const product = { ...rows[0], price: Number(rows[0].price), compare_at_price: rows[0].compare_at_price ? Number(rows[0].compare_at_price) : null }

  const imgs = await db
    .select({ id: productImages.id, url: productImages.url, alt_ar: productImages.alt_ar, sort_order: productImages.sort_order })
    .from(productImages)
    .where(eq(productImages.product_id, product.id))
    .orderBy(asc(productImages.sort_order))

  return (
    <>
      <StoreHeader />
      <ProductDetail product={product} images={imgs} />
      <StoreFooter />
    </>
  )
}
