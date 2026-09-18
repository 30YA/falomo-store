import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { HomeLink } from "@/components/brand/home-link";
import { Container } from "@/components/ui/container";
import { categories } from "@/data/products";
import { siteContact } from "@/data/site-content";

const infoLinks = [
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "ارتباط با ما" },
  { href: "/faq", label: "سوالات متداول" },
  { href: "/shipping", label: "ارسال و بازگشت" },
  { href: "/terms", label: "قوانین و مقررات" },
  { href: "/privacy", label: "حریم خصوصی" },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-line)] bg-white pb-24 lg:pb-0">
      <Container className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <HomeLink aria-label="فالومو" className="inline-block">
            <BrandLogo variant="full" className="h-auto w-40 sm:w-48" />
          </HomeLink>
          <p className="text-sm leading-7 text-[var(--color-ink-muted)]">
            فروشگاه تخصصی کالای خواب؛ روتختی، ملحفه، بالش، تشک و پتو با تمرکز روی
            کیفیت خواب و زیبایی اتاق.
          </p>
        </div>

        <div>
          <p className="mb-3 font-bold">دسته‌بندی‌ها</p>
          <ul className="space-y-2 text-sm text-[var(--color-ink-soft)]">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="hover:text-[var(--color-brand)]"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 font-bold">خدمات مشتریان</p>
          <ul className="space-y-2 text-sm text-[var(--color-ink-soft)]">
            {infoLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-[var(--color-brand)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 font-bold">ارتباط با ما</p>
          <ul className="space-y-2 text-sm text-[var(--color-ink-soft)]">
            <li>
              <a
                href={siteContact.phoneHref}
                className="hover:text-[var(--color-brand)]"
              >
                پشتیبانی: {siteContact.phone}
              </a>
            </li>
            <li>
              <a
                href={siteContact.emailHref}
                className="hover:text-[var(--color-brand)]"
              >
                ایمیل: {siteContact.email}
              </a>
            </li>
            <li>ساعات پاسخگویی: {siteContact.hours}</li>
            <li className="leading-7">{siteContact.address}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-[var(--color-line)] py-4 text-center text-xs text-[var(--color-ink-muted)]">
        © ۱۴۰۴ فالومو — تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
}
