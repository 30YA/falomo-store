import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { ProductDetail } from "@/types";
import { categories } from "@/data/products";

interface ProductBreadcrumbProps {
  product: ProductDetail;
}

export function ProductBreadcrumb({ product }: ProductBreadcrumbProps) {
  const category = categories.find((c) => c.slug === product.category);

  const items = [
    { href: "/", label: "خانه" },
    { href: "/products", label: "محصولات" },
    category
      ? { href: `/products?category=${category.slug}`, label: category.name }
      : null,
    { href: null, label: product.shortTitle },
  ].filter(Boolean) as { href: string | null; label: string }[];

  return (
    <nav aria-label="مسیر صفحه" className="mb-4 overflow-x-auto">
      <ol className="flex min-w-max items-center gap-1 text-xs text-[var(--color-ink-muted)] sm:text-sm">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-1">
            {index > 0 && <ChevronLeft className="h-3.5 w-3.5 opacity-50" />}
            {item.href ? (
              <Link
                href={item.href}
                className="transition hover:text-[var(--color-brand)]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="max-w-[200px] truncate text-[var(--color-ink-soft)] sm:max-w-xs">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
