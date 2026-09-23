"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CategoriesDropdown } from "@/components/layout/categories-dropdown";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/products", label: "محصولات", match: "products" as const },
  {
    href: "/products?amazing=1",
    label: "شگفت‌انگیزها",
    match: "amazing" as const,
  },
  { href: "/faq", label: "سوالات متداول", match: "path" as const },
  { href: "/shipping", label: "ارسال و بازگشت", match: "path" as const },
  { href: "/about", label: "درباره ما", match: "path" as const },
  { href: "/contact", label: "ارتباط با ما", match: "path" as const },
];

function DesktopNavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAmazing = searchParams.get("amazing") === "1";

  return (
    <>
      {navLinks.map((link) => {
        const active =
          link.match === "amazing"
            ? pathname === "/products" && isAmazing
            : link.match === "products"
              ? pathname === "/products" && !isAmazing
              : pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm transition",
              active
                ? "bg-[var(--color-brand-soft)] font-medium text-[var(--color-brand)]"
                : "text-[var(--color-ink-soft)] hover:bg-black/[0.04] hover:text-[var(--color-ink)]",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}

export function DesktopNav() {
  return (
    <nav className="mt-3 hidden items-center gap-0.5 lg:flex">
      <CategoriesDropdown />
      <Suspense fallback={null}>
        <DesktopNavLinks />
      </Suspense>
    </nav>
  );
}
