import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Toaster } from "@/components/ui/toaster";
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
  applicationName: "فالومو",
  openGraph: {
    title: "فالومو | فروشگاه تخصصی کالای خواب",
    description: "آرامش، از خانه شروع می‌شود",
    siteName: "فالومو",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "/brand/logo.png",
        width: 1024,
        height: 682,
        alt: "لوگوی فالومو",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "فالومو | فروشگاه تخصصی کالای خواب",
    description: "آرامش، از خانه شروع می‌شود",
    images: ["/brand/app-icon.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className={`${vazir.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="flex-1 pb-[calc(var(--bottom-nav-height)+env(safe-area-inset-bottom,0px))] lg:pb-4">
          {children}
        </main>
        <Footer />
        <BottomNav />
        <Toaster />
      </body>
    </html>
  );
}
