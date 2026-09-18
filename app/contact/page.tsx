import type { Metadata } from "next";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { ContentPage } from "@/components/content/content-page";
import { ContactForm } from "@/components/content/contact-form";
import { siteContact } from "@/data/site-content";

export const metadata: Metadata = {
  title: "ارتباط با ما",
  description: "تماس با پشتیبانی فالومو؛ تلفن، ایمیل و فرم پیام",
};

export default function ContactPage() {
  return (
    <ContentPage
      wide
      title="ارتباط با ما"
      description="سوال، پیشنهاد یا پیگیری سفارش؟ از راه‌های زیر با ما در تماس باشید."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {[
            {
              icon: Phone,
              label: "پشتیبانی تلفنی",
              value: siteContact.phone,
              href: siteContact.phoneHref,
            },
            {
              icon: Mail,
              label: "ایمیل",
              value: siteContact.email,
              href: siteContact.emailHref,
            },
            {
              icon: Clock3,
              label: "ساعات پاسخگویی",
              value: siteContact.hours,
            },
            {
              icon: MapPin,
              label: "آدرس",
              value: siteContact.address,
            },
          ].map(({ icon: Icon, label, value, href }) => (
            <div
              key={label}
              className="rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5"
            >
              <div className="mb-2 flex items-center gap-2 text-[var(--color-brand)]">
                <Icon className="h-4 w-4" />
                <span className="text-xs font-medium text-[var(--color-ink-muted)]">
                  {label}
                </span>
              </div>
              {href ? (
                <a
                  href={href}
                  className="text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-brand)]"
                >
                  {value}
                </a>
              ) : (
                <p className="text-sm font-medium leading-7 text-[var(--color-ink)]">
                  {value}
                </p>
              )}
            </div>
          ))}
        </div>

        <div>
          <h2 className="mb-3 text-base font-bold lg:text-lg">ارسال پیام</h2>
          <ContactForm />
        </div>
      </div>
    </ContentPage>
  );
}
