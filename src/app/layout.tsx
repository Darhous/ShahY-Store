import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "شاهي — لوحة الإدارة",
  description: "لوحة تحكم متجر شاهي للمنتجات الفاخرة",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={GeistSans.className}>
        {children}
        <Toaster position="bottom-left" richColors />
      </body>
    </html>
  );
}
