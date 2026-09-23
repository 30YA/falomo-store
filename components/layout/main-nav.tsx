"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Grid2X2,
  Heart,
  Home,
  ShoppingCart,
  Tags,
  type LucideIcon,
} from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { cn, toPersianDigits } from "@/lib/utils";
import { useHasMounted } from "@/lib/hooks/use-has-mounted";

export const mainNavItems: {
  href: string;
  label: string;
  icon: LucideIcon;
}[] = [
  { href: "/", label: "خانه", icon: Home },
  { href: "/categories", label: "دسته‌بندی", icon: Grid2X2 },
  { href: "/products", label: "محصولات", icon: Tags },
  { href: "/cart", label: "سبد خرید", icon: ShoppingCart },
  { href: "/wishlist", label: "علاقه‌مندی", icon: Heart },
];

export function isMainNavActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function MainNav({
  variant,
  onNavigate,
}: {
  variant: "bar" | "list";
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const mounted = useHasMounted();
  const cartCount = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const shownCart = mounted ? cartCount : 0;

  return (
    <ul
      className={cn(
        variant === "bar"
          ? "mx-auto flex h-[var(--bottom-nav-height)] max-w-lg items-center justify-between px-2"
          : "flex flex-col gap-1",
      )}
    >
      {mainNavItems.map(({ href, label, icon: Icon }) => {
        const active = isMainNavActive(pathname, href);
        return (
          <li
            key={href}
            className={
              variant === "bar" ? "flex h-full flex-1 items-center" : undefined
            }
          >
            <Link
              href={href}
              onClick={() => {
                if (href === "/" && variant === "bar") {
                  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
                }
                onNavigate?.();
              }}
              className={cn(
                "relative transition",
                variant === "bar"
                  ? "flex w-full flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px]"
                  : "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm",
                active
                  ? "bg-[var(--color-brand-soft)] font-medium text-[var(--color-brand)]"
                  : variant === "bar"
                    ? "text-[var(--color-ink-muted)]"
                    : "text-[var(--color-ink-soft)] hover:bg-black/[0.04] hover:text-[var(--color-ink)]",
              )}
            >
              <Icon className={cn("h-5 w-5", active && "stroke-[2.25]")} />
              <span>{label}</span>
              {href === "/cart" && shownCart > 0 && (
                <span
                  className={cn(
                    "flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-brand)] px-1.5 text-[9px] font-bold text-white",
                    variant === "bar"
                      ? "absolute top-1 left-1/2 -translate-x-1/2 translate-x-3"
                      : "mr-auto",
                  )}
                >
                  {toPersianDigits(shownCart)}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
