import type { Metadata } from "next";
import { ContentPage } from "@/components/content/content-page";
import { ContentSection } from "@/components/content/content-section";
import { termsSections } from "@/data/site-content";

export const metadata: Metadata = {
  title: "قوانین و مقررات",
  description: "شرایط استفاده از فروشگاه اینترنتی فالومو",
};

export default function TermsPage() {
  return (
    <ContentPage
      title="قوانین و مقررات"
      description="استفاده از فروشگاه فالومو به معنای پذیرش شرایط زیر است."
    >
      <div>
        {termsSections.map((section) => (
          <ContentSection key={section.title} title={section.title}>
            <p>{section.body}</p>
          </ContentSection>
        ))}
      </div>
    </ContentPage>
  );
}
