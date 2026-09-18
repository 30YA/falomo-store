import type { Metadata } from "next";
import { ContentPage } from "@/components/content/content-page";
import { ContentSection } from "@/components/content/content-section";
import { privacySections } from "@/data/site-content";

export const metadata: Metadata = {
  title: "حریم خصوصی",
  description: "نحوه جمع‌آوری و استفاده از اطلاعات کاربران در فالومو",
};

export default function PrivacyPage() {
  return (
    <ContentPage
      title="حریم خصوصی"
      description="حفظ اطلاعات شما برای ما مهم است."
    >
      <div>
        {privacySections.map((section) => (
          <ContentSection key={section.title} title={section.title}>
            <p>{section.body}</p>
          </ContentSection>
        ))}
      </div>
    </ContentPage>
  );
}
