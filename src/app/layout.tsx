import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";
import { CartProvider } from "@/contexts/CartContext";
import ScrollToTop from "@/components/store/ScrollToTop";
import CartDrawer from "@/components/store/CartDrawer";
import "@/styles/globals.css";

const SITE_URL = "https://shah-y-store.vercel.app"
const OG_IMAGE = `${SITE_URL}/og-image.jpg`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ShahY Store — إكسسوارات فاخرة مستوردة",
    template: "%s — ShahY Store",
  },
  description: "أرقى الشنط والمحافظ والشوزات النسائية المستوردة — تشكيلات حصرية بأفضل الأسعار",
  keywords: ["شنط مستوردة", "محافظ فاخرة", "شوزات نسائية", "هاي كوبي", "ميرور", "ShahY Store"],
  authors: [{ name: "ShahY Store" }],
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: SITE_URL,
    siteName: "ShahY Store",
    title: "ShahY Store — إكسسوارات فاخرة مستوردة",
    description: "أرقى الشنط والمحافظ والشوزات النسائية المستوردة — تشكيلات حصرية",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "ShahY Store" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ShahY Store — إكسسوارات فاخرة مستوردة",
    description: "أرقى الشنط والمحافظ والشوزات النسائية المستوردة",
    images: [OG_IMAGE],
  },
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/icon-192.png", sizes: "192x192" }],
    apple: "/icon-192.png",
  },
  themeColor: "#C9A84C",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
          }
        `}} />
      </head>
      <body className={GeistSans.className}>
        <CartProvider>
          {children}
          <ScrollToTop />
          <CartDrawer />
        </CartProvider>
        <Toaster position="bottom-left" richColors />
      </body>
    </html>
  );
}
