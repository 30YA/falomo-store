"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { useUiStore } from "@/stores/ui-store";
import { categories } from "@/data/products";
import { toPersianDigits } from "@/lib/utils";
import { useHasMounted } from "@/lib/hooks/use-has-mounted";

export function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const mounted = useHasMounted();
  const cartCount = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const wishlistCount = useWishlistStore((s) => s.productIds.length);
  const shownCart = mounted ? cartCount : 0;
  const shownWishlist = mounted ? wishlistCount : 0;
  const { isMobileMenuOpen, openMobileMenu, closeMobileMenu } = useUiStore();

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/products?search=${encodeURIComponent(q)}` : "/products");
    closeMobileMenu();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-white/90 backdrop-blur-md">
      <div className="bg-[var(--color-ink)] py-1.5 text-center text-xs text-white/90">
        ارسال رایگان برای سفارش‌های بالای ۵ میلیون تومان
      </div>

      <Container className="py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-black/5 lg:hidden"
            onClick={openMobileMenu}
            aria-label="منو"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" className="shrink-0">
            <span className="font-display text-2xl font-black tracking-tight text-[var(--color-brand)]">
              فالومو
            </span>
          </Link>

          <form onSubmit={onSearch} className="relative hidden flex-1 md:block">
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-ink-muted)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجو در کالای خواب..."
              className="h-11 w-full rounded-xl border border-transparent bg-[var(--color-surface)] pr-10 pl-4 text-sm outline-none transition focus:border-[var(--color-brand)] focus:bg-white"
            />
          </form>

          <div className="mr-auto flex items-center gap-1 sm:gap-2">
            <Link
              href="/wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-black/5"
              aria-label="علاقه‌مندی‌ها"
            >
              <Heart className="h-5 w-5" />
              {shownWishlist > 0 && (
                <span className="absolute -top-0.5 -left-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-brand)] px-1 text-[10px] font-bold text-white">
                  {toPersianDigits(shownWishlist)}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-black/5"
              aria-label="سبد خرید"
            >
              <ShoppingCart className="h-5 w-5" />
              {shownCart > 0 && (
                <span className="absolute -top-0.5 -left-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-brand)] px-1 text-[10px] font-bold text-white">
                  {toPersianDigits(shownCart)}
                </span>
              )}
            </Link>
          </div>
        </div>

        <form onSubmit={onSearch} className="relative mt-3 md:hidden">
          <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-ink-muted)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو در کالای خواب..."
            className="h-11 w-full rounded-xl border border-transparent bg-[var(--color-surface)] pr-10 pl-4 text-sm outline-none focus:border-[var(--color-brand)] focus:bg-white"
          />
        </form>

        <nav className="mt-3 hidden items-center gap-1 overflow-x-auto lg:flex">
          <Link
            href="/categories"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-[var(--color-ink)] hover:bg-black/5"
          >
            دسته‌بندی‌ها
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="rounded-lg px-3 py-1.5 text-sm text-[var(--color-ink-soft)] hover:bg-black/5 hover:text-[var(--color-ink)]"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/products?tag=amazing"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-[var(--color-brand)] hover:bg-[var(--color-brand-soft)]"
          >
            شگفت‌انگیزها
          </Link>
        </nav>
      </Container>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 transition lg:hidden"
          onClick={closeMobileMenu}
        >
          <aside
            className="absolute inset-y-0 right-0 w-[82%] max-w-xs translate-x-0 bg-white p-5 shadow-xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xl font-black text-[var(--color-brand)]">فالومو</span>
              <button type="button" onClick={closeMobileMenu} aria-label="بستن">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <Link
                href="/categories"
                onClick={closeMobileMenu}
                className="rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-[var(--color-surface)]"
              >
                همه دسته‌بندی‌ها
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}`}
                  onClick={closeMobileMenu}
                  className="rounded-xl px-3 py-2.5 text-sm hover:bg-[var(--color-surface)]"
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                href="/products?tag=amazing"
                onClick={closeMobileMenu}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--color-brand)] hover:bg-[var(--color-brand-soft)]"
              >
                پیشنهادهای شگفت‌انگیز
              </Link>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
