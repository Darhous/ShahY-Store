import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";
import { CartProvider } from "@/contexts/CartContext";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "ShahY Store — إكسسوارات فاخرة مستوردة",
  description: "أرقى الشنط والمحافظ والشوزات النسائية المستوردة — ShahY Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={GeistSans.className}>
        <CartProvider>
          {children}
        </CartProvider>
        <Toaster position="bottom-left" richColors />
      </body>
    </html>
  );
}
