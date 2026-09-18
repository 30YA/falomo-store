"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Heart, Menu, ShoppingCart } from "lucide-react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { HomeLink } from "@/components/brand/home-link";
import { Container } from "@/components/ui/container";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { SearchBox } from "@/components/search/search-box";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { useUiStore } from "@/stores/ui-store";
import { toPersianDigits } from "@/lib/utils";
import { useHasMounted } from "@/lib/hooks/use-has-mounted";

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const mounted = useHasMounted();
  const cartCount = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const wishlistCount = useWishlistStore((s) => s.productIds.length);
  const shownCart = mounted ? cartCount : 0;
  const shownWishlist = mounted ? wishlistCount : 0;
  const { isMobileMenuOpen, openMobileMenu, closeMobileMenu } = useUiStore();

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const syncOffset = () => {
      const gap = 8;
      const height = Math.ceil(el.getBoundingClientRect().height) + gap;
      document.documentElement.style.setProperty(
        "--header-offset",
        `${height}px`,
      );
    };

    syncOffset();
    const observer = new ResizeObserver(syncOffset);
    observer.observe(el);
    window.addEventListener("resize", syncOffset);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncOffset);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-white/90 backdrop-blur-md"
    >
      <div className="bg-[var(--color-ink)] py-1.5 text-center text-xs text-white/90">
        ارسال رایگان برای سفارش‌های بالای ۵ میلیون تومان
      </div>

      <Container className="py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl text-[var(--color-ink)] hover:bg-black/5 lg:hidden"
            onClick={() =>
              isMobileMenuOpen ? closeMobileMenu() : openMobileMenu()
            }
            aria-label={isMobileMenuOpen ? "بستن منو" : "باز کردن منو"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="h-5 w-5" strokeWidth={2.25} />
          </button>

          <HomeLink
            className="flex shrink-0 items-center"
            aria-label="فالومو — صفحه اصلی"
          >
            <BrandLogo
              variant="logotype"
              priority
              className="h-10 sm:h-11"
            />
          </HomeLink>

          <SearchBox className="mx-2 hidden min-w-0 max-w-sm flex-1 basis-0 md:block lg:mx-4" />

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

        <SearchBox className="mt-3 md:hidden" />

        <DesktopNav />
      </Container>

      <MobileMenu />
    </header>
  );
}
