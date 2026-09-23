import type { Metadata } from "next";
import { ContentPage } from "@/components/content/content-page";
import { ContentSection } from "@/components/content/content-section";
import { shippingSections } from "@/data/site-content";

export const metadata: Metadata = {
  title: "ارسال و بازگشت",
  description: "شرایط ارسال، هزینه پست و مرجوعی کالا در رویان",
};

export default function ShippingPage() {
  return (
    <ContentPage
      title="ارسال و بازگشت"
      description="از ثبت سفارش تا رسیدن به درب منزل و امکان مرجوعی."
    >
      <div>
        {shippingSections.map((section) => (
          <ContentSection key={section.title} title={section.title}>
            <p>{section.body}</p>
          </ContentSection>
        ))}
      </div>
    </ContentPage>
  );
}
