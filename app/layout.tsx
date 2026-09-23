import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
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
    default: "رویان | فروشگاه کالای خواب",
    template: "%s | رویان",
  },
  description:
    "خرید کالای خواب از برندهای ایرانی و خارجی؛ روتختی، ملحفه، بالش، تشک و پتو. فروشنده و تأمین‌کننده: رویان.",
  applicationName: "رویان",
  openGraph: {
    title: "رویان | فروشگاه کالای خواب",
    description: "خواب آرام، از رویان",
    siteName: "رویان",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "رویان | فروشگاه کالای خواب",
    description: "خواب آرام، از رویان",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className={`${vazir.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <ScrollToTop />
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
