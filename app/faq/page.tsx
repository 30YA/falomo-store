import type { Metadata } from "next";
import { ContentPage } from "@/components/content/content-page";
import { FaqList } from "@/components/content/faq-list";
import { faqItems } from "@/data/site-content";

export const metadata: Metadata = {
  title: "سوالات متداول",
  description: "پاسخ سوالات رایج درباره سفارش، ارسال، سایز و مرجوعی در فالومو",
};

export default function FaqPage() {
  return (
    <ContentPage
      title="سوالات متداول"
      description="پرتکرارترین پرسش‌های خریداران کالای خواب را اینجا جمع کرده‌ایم."
    >
      <FaqList items={faqItems} />
    </ContentPage>
  );
}
