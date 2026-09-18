"use client";

import Link from "next/link";
import { useWishlistStore } from "@/stores/wishlist-store";
import { catalogRepository } from "@/lib/catalog";
import { ProductGrid } from "@/components/product/product-grid";
import { useHasMounted } from "@/lib/hooks/use-has-mounted";

export function WishlistView() {
  const mounted = useHasMounted();
  const productIds = useWishlistStore((s) => s.productIds);
  const products = (mounted ? productIds : [])
    .map((id) => catalogRepository.getProductById(id))
    .filter(Boolean) as NonNullable<
    ReturnType<typeof catalogRepository.getProductById>
  >[];

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-[var(--color-line)] bg-white px-6 py-16 text-center">
        <p className="text-[var(--color-ink-muted)]">در حال بارگذاری...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--color-line)] bg-white px-6 py-16 text-center">
        <p className="mb-4 text-[var(--color-ink-muted)]">
          هنوز کالایی به علاقه‌مندی‌ها اضافه نکرده‌اید.
        </p>
        <Link
          href="/products"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--color-brand)] px-5 text-sm font-medium text-white hover:bg-[var(--color-brand-dark)]"
        >
          مشاهده محصولات
        </Link>
      </div>
    );
  }

  return <ProductGrid products={products} />;
}
