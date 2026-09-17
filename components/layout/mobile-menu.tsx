"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { X } from "lucide-react";
import { categories } from "@/data/products";
import { useUiStore } from "@/stores/ui-store";
import { useHasMounted } from "@/lib/hooks/use-has-mounted";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const mounted = useHasMounted();
  const { isMobileMenuOpen, closeMobileMenu } = useUiStore();

  useEffect(() => {
    if (!isMobileMenuOpen) return;

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

  if (!mounted) return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-[80] lg:hidden",
        isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!isMobileMenuOpen}
    >
      <button
        type="button"
        aria-label="بستن منو"
        className={cn(
          "absolute inset-0 bg-black/45 transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100" : "opacity-0",
        )}
        onClick={closeMobileMenu}
      />

      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="منوی موبایل"
        className={cn(
          "absolute inset-y-0 right-0 flex w-[min(86vw,320px)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-[var(--color-line)] px-5 py-4">
          <span className="text-xl font-black text-[var(--color-brand)]">
            فالومو
          </span>
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
          <div className="flex flex-col gap-1">
            <Link
              href="/categories"
              onClick={closeMobileMenu}
              className="rounded-xl px-3 py-3 text-sm font-medium hover:bg-[var(--color-surface)]"
            >
              همه دسته‌بندی‌ها
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                onClick={closeMobileMenu}
                className="rounded-xl px-3 py-3 text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/products?tag=amazing"
              onClick={closeMobileMenu}
              className="rounded-xl px-3 py-3 text-sm font-medium text-[var(--color-brand)] hover:bg-[var(--color-brand-soft)]"
            >
              پیشنهادهای شگفت‌انگیز
            </Link>
          </div>
        </nav>
      </aside>
    </div>,
    document.body,
  );
}
