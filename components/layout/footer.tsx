import Link from "next/link";
import { Container } from "@/components/ui/container";
import { categories } from "@/data/products";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-line)] bg-white pb-24 lg:pb-0">
      <Container className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <p className="text-2xl font-black text-[var(--color-brand)]">فالومو</p>
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
                <Link href={`/products?category=${cat.slug}`} className="hover:text-[var(--color-brand)]">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 font-bold">دسترسی سریع</p>
          <ul className="space-y-2 text-sm text-[var(--color-ink-soft)]">
            <li>
              <Link href="/products" className="hover:text-[var(--color-brand)]">
                همه محصولات
              </Link>
            </li>
            <li>
              <Link href="/products?tag=amazing" className="hover:text-[var(--color-brand)]">
                شگفت‌انگیزها
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-[var(--color-brand)]">
                سبد خرید
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="hover:text-[var(--color-brand)]">
                علاقه‌مندی‌ها
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 font-bold">ارتباط با ما</p>
          <ul className="space-y-2 text-sm text-[var(--color-ink-soft)]">
            <li>پشتیبانی: ۰۲۱-۹۱۰۰۰۰۰۰</li>
            <li>ایمیل: support@falomo.ir</li>
            <li>ساعات پاسخگویی: ۹ تا ۲۱</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-[var(--color-line)] py-4 text-center text-xs text-[var(--color-ink-muted)]">
        © ۱۴۰۴ فالومو — تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
}
