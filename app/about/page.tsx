import type { Metadata } from "next";
import { ContentPage } from "@/components/content/content-page";
import { ContentSection } from "@/components/content/content-section";

export const metadata: Metadata = {
  title: "درباره ما",
  description:
    "آشنایی با رویان؛ فروشگاه کالای خواب با برندهای ایرانی و خارجی و یک فروشنده",
};

export default function AboutPage() {
  return (
    <ContentPage title="درباره رویان" description="خواب آرام، از رویان.">
      <div>
        <ContentSection title="داستان ما">
          <p>
            رویان فروشگاه کالای خواب است. فقط روتختی، ملحفه، بالش، تشک، پتو و
            روبالشی می‌فروشیم و این کالاها را از برندهای ایرانی و خارجی کنار هم
            آورده‌ایم. فروشنده و تأمین‌کننده، خود رویان است.
          </p>
        </ContentSection>
        <ContentSection title="چه چیزی ما را متمایز می‌کند؟">
          <p>
            به‌جای چند فروشنده، یک طرف حساب دارید: رویان. انتخاب پارچه و دوخت،
            توضیح شفاف سایز و جنس، ارسال از انبار خودمان و پشتیبانی یک مجموعه،
            مسیر خرید را ساده‌تر می‌کند.
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
