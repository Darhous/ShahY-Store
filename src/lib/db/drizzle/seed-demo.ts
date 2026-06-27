import { config } from "dotenv";
config({ path: ".env.local" });

import pg from "pg";
const pool = new pg.Pool({ connectionString: process.env.MIGRATION_DATABASE_URL });

const DEMO_PRODUCTS = [
  // شنط
  {
    name_ar: "شنطة شانيل كلاسيك",
    slug: "chanel-classic-bag",
    description_ar: "شنطة جلد إيطالي فاخر، مبطنة من الداخل، سلسلة ذهبية",
    category_slug: "bags",
    quality_tier: "mirror",
    price: 2800,
    compare_at_price: 3500,
    is_featured: true,
    image_url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
  },
  {
    name_ar: "شنطة لويس فيتون مونوجرام",
    slug: "lv-monogram-bag",
    description_ar: "شنطة قماش مونوجرام أصلي مع تفاصيل جلدية",
    category_slug: "bags",
    quality_tier: "original",
    price: 5500,
    compare_at_price: null,
    is_featured: true,
    image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
  },
  {
    name_ar: "شنطة جوتشي ميني",
    slug: "gucci-mini-bag",
    description_ar: "شنطة صغيرة أنيقة بلوجو جوتشي مطرز",
    category_slug: "bags",
    quality_tier: "hi_copy",
    price: 1200,
    compare_at_price: 1600,
    is_featured: false,
    image_url: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
  },
  {
    name_ar: "شنطة ديور ليدي",
    slug: "dior-lady-bag",
    description_ar: "الشنطة الأيقونية من ديور بخيوط يدوية دقيقة",
    category_slug: "bags",
    quality_tier: "mirror",
    price: 3200,
    compare_at_price: 4000,
    is_featured: true,
    image_url: "https://images.unsplash.com/photo-1590739293931-a67a134e5c7c?w=800&q=80",
  },
  // محافظ وكلتشات
  {
    name_ar: "محفظة شانيل كاميليا",
    slug: "chanel-camellia-wallet",
    description_ar: "محفظة جلد ناعم مع تطريز الكاميليا الذهبي",
    category_slug: "wallets",
    quality_tier: "mirror",
    price: 950,
    compare_at_price: 1200,
    is_featured: false,
    image_url: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
  },
  {
    name_ar: "كلتش بالينسياجا فيلفيت",
    slug: "balenciaga-velvet-clutch",
    description_ar: "كلتش مخمل فاخر مع حلقة ذهبية أنيقة",
    category_slug: "wallets",
    quality_tier: "hi_copy",
    price: 780,
    compare_at_price: 950,
    is_featured: true,
    image_url: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
  },
  {
    name_ar: "محفظة بوتيجا فينيتا",
    slug: "bottega-veneta-wallet",
    description_ar: "جلد منسوج يدوياً بالأسلوب الإيطالي الأصيل",
    category_slug: "wallets",
    quality_tier: "original",
    price: 2100,
    compare_at_price: null,
    is_featured: false,
    image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
  },
  // أحذية
  {
    name_ar: "كعب لوبوتان كريستال",
    slug: "louboutin-crystal-heels",
    description_ar: "كعب 10 سم مزيّن بكريستال سواروفسكي، نعل أحمر أيقوني",
    category_slug: "shoes",
    quality_tier: "mirror",
    price: 1800,
    compare_at_price: 2200,
    is_featured: true,
    image_url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
  },
  {
    name_ar: "بالرينا شانيل كلاسيك",
    slug: "chanel-ballet-flats",
    description_ar: "بالرينا جلد حملي مع شعار CC الذهبي",
    category_slug: "shoes",
    quality_tier: "mirror",
    price: 1400,
    compare_at_price: 1700,
    is_featured: false,
    image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  },
  {
    name_ar: "صندل أكواتزورا فراشة",
    slug: "aquazzura-butterfly-sandal",
    description_ar: "صندل سباغيتي رفيع مع فراشات مرصعة، أنيق ومريح",
    category_slug: "shoes",
    quality_tier: "hi_copy",
    price: 950,
    compare_at_price: 1200,
    is_featured: true,
    image_url: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=800&q=80",
  },
];

async function seedDemo() {
  const client = await pool.connect();
  try {
    console.log("🌱 Seeding demo products...");

    // Get category IDs
    const { rows: cats } = await client.query(`SELECT id, slug FROM categories WHERE is_active = true`);
    const catMap: Record<string, string> = Object.fromEntries(cats.map((c: any) => [c.slug, c.id]));

    let created = 0;
    for (const p of DEMO_PRODUCTS) {
      const catId = catMap[p.category_slug];
      if (!catId) { console.warn(`  ⚠ Category not found: ${p.category_slug}`); continue; }

      // Insert product
      const { rows: [product] } = await client.query(
        `INSERT INTO products (id, name_ar, slug, description_ar, category_id, quality_tier, price, compare_at_price, is_featured, status, created_at, updated_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, 'active', now(), now())
         ON CONFLICT (slug) DO NOTHING
         RETURNING id`,
        [p.name_ar, p.slug, p.description_ar, catId, p.quality_tier, p.price, p.compare_at_price, p.is_featured]
      );

      if (product?.id) {
        await client.query(
          `INSERT INTO product_images (id, product_id, url, alt_ar, sort_order, created_at)
           VALUES (gen_random_uuid(), $1, $2, $3, 0, now())
           ON CONFLICT DO NOTHING`,
          [product.id, p.image_url, p.name_ar]
        );
        created++;
        console.log(`  ✓ ${p.name_ar}`);
      }
    }

    console.log(`✅ Done! ${created} منتج تجريبي تم إضافته.`);
  } finally {
    client.release();
    await pool.end();
  }
}

seedDemo().catch((e) => { console.error("❌", e.message); process.exit(1); });
