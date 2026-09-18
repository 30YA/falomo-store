import type { Metadata } from "next";
import { ContentPage } from "@/components/content/content-page";
import { ContentSection } from "@/components/content/content-section";

export const metadata: Metadata = {
  title: "درباره ما",
  description:
    "آشنایی با فروشگاه تخصصی کالای خواب فالومو؛ کیفیت خواب و زیبایی اتاق خواب",
};

export default function AboutPage() {
  return (
    <ContentPage
      title="درباره فالومو"
      description="آرامش، از خانه شروع می‌شود."
    >
      <div>
        <ContentSection title="داستان ما">
          <p>
            فالومو با تمرکز روی کالای خواب شکل گرفته تا انتخاب روتختی، ملحفه،
            بالش، تشک و پتو ساده‌تر، شفاف‌تر و مطمئن‌تر باشد. ما باور داریم خواب
            خوب، شروع یک روز بهتر است.
          </p>
        </ContentSection>
        <ContentSection title="چه چیزی ما را متمایز می‌کند؟">
          <p>
            انتخاب محصولات با کیفیت دوخت و پارچه، توضیحات شفاف درباره سایز و
            جنس، ارسال سریع و پشتیبانی پاسخ‌گو از اصول کار ماست. تجربه خرید را
            الهام‌گرفته از فروشگاه‌های بزرگ ایرانی، اما با هویت گرم و اختصاصی
            فالومو طراحی کرده‌ایم.
          </p>
        </ContentSection>
        <ContentSection title="تعهد ما">
          <p>
            اصالت کالا، قیمت‌گذاری منصفانه و احترام به زمان شما. اگر چیزی مطابق
            انتظار نبود، مسیر مرجوعی و پشتیبانی کنار شماست.
          </p>
        </ContentSection>
      </div>
    </ContentPage>
  );
}
