"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Grid2X2,
  Heart,
  Home,
  ShoppingCart,
  Tags,
} from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { cn, toPersianDigits } from "@/lib/utils";
import { useHasMounted } from "@/lib/hooks/use-has-mounted";

const items = [
  { href: "/", label: "خانه", icon: Home },
  { href: "/categories", label: "دسته‌بندی", icon: Grid2X2 },
  { href: "/products", label: "محصولات", icon: Tags },
  { href: "/cart", label: "سبد خرید", icon: ShoppingCart },
  { href: "/wishlist", label: "علاقه‌مندی", icon: Heart },
];

export function BottomNav() {
  const pathname = usePathname();
  const mounted = useHasMounted();
  const cartCount = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const shownCart = mounted ? cartCount : 0;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-line)] bg-white/95 backdrop-blur lg:hidden pb-[env(safe-area-inset-bottom)]">
      <ul className="mx-auto flex h-[var(--bottom-nav-height)] max-w-lg items-center justify-between px-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  "relative flex h-full flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-[10px] transition",
                  active
                    ? "text-[var(--color-brand)]"
                    : "text-[var(--color-ink-muted)]",
                )}
              >
                <Icon className={cn("h-5 w-5", active && "stroke-[2.25]")} />
                <span>{label}</span>
                {href === "/cart" && shownCart > 0 && (
                  <span className="absolute top-1 left-1/2 flex h-4 min-w-4 -translate-x-1/2 translate-x-3 items-center justify-center rounded-full bg-[var(--color-brand)] px-1 text-[9px] font-bold text-white">
                    {toPersianDigits(shownCart)}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
