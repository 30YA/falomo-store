"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { MainNav } from "@/components/layout/main-nav";
import { categories } from "@/data/products";
import { useUiStore } from "@/stores/ui-store";
import { useHasMounted } from "@/lib/hooks/use-has-mounted";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const mounted = useHasMounted();
  const pathname = usePathname();
  const { isMobileMenuOpen, closeMobileMenu } = useUiStore();

  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobileMenu();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  if (!mounted || !isMobileMenuOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[80] lg:hidden" role="presentation">
      <button
        type="button"
        aria-label="بستن منو"
        className="absolute inset-0 bg-black/45 animate-fade-in"
        onClick={closeMobileMenu}
      />

      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="منوی موبایل"
        className={cn(
          "absolute inset-y-0 right-0 flex w-[min(86vw,320px)] flex-col bg-white shadow-2xl",
          "animate-fade-in",
        )}
      >
        <div className="flex items-center justify-between border-b border-[var(--color-line)] px-5 py-4">
          <BrandLogo variant="logotype" className="h-10" />
          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label="بستن"
            className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-black/5"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <MainNav variant="list" onNavigate={closeMobileMenu} />
          <div className="my-2 border-t border-[var(--color-line)]" />
          <div className="flex flex-col gap-1">
            <Link
              href="/categories"
              onClick={closeMobileMenu}
              className="rounded-xl px-3 py-3 text-sm font-medium text-[var(--color-ink-soft)] hover:bg-black/[0.04] hover:text-[var(--color-ink)]"
            >
              همه دسته‌بندی‌ها
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                onClick={closeMobileMenu}
                className="rounded-xl px-3 py-3 text-sm text-[var(--color-ink-soft)] hover:bg-black/[0.04] hover:text-[var(--color-ink)]"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/products?amazing=1"
              onClick={closeMobileMenu}
              className="rounded-xl px-3 py-3 text-sm text-[var(--color-ink-soft)] hover:bg-black/[0.04] hover:text-[var(--color-ink)]"
            >
              پیشنهادهای شگفت‌انگیز
            </Link>
            <div className="my-2 border-t border-[var(--color-line)]" />
            {[
              { href: "/about", label: "درباره ما" },
              { href: "/contact", label: "ارتباط با ما" },
              { href: "/faq", label: "سوالات متداول" },
              { href: "/shipping", label: "ارسال و بازگشت" },
              { href: "/terms", label: "قوانین و مقررات" },
              { href: "/privacy", label: "حریم خصوصی" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="rounded-xl px-3 py-3 text-sm text-[var(--color-ink-soft)] hover:bg-black/[0.04] hover:text-[var(--color-ink)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </aside>
    </div>,
    document.body,
  );
}
