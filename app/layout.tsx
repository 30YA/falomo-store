import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";
import "./globals.css";

const vazir = Vazirmatn({
  variable: "--font-vazir",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "فالومو | فروشگاه تخصصی کالای خواب",
    template: "%s | فالومو",
  },
  description:
    "خرید آنلاین روتختی، ملحفه، بالش، تشک و پتو با بهترین کیفیت و ارسال سریع",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className={`${vazir.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="flex-1 pb-4">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
