import type { Product } from "@/types";
import { ProductCard, type ProductCardLayout } from "./product-card";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  className?: string;
  layout?: ProductCardLayout;
}

export function ProductGrid({
  products,
  className,
  layout = "grid",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--color-line)] bg-white px-6 py-16 text-center">
        <p className="text-[var(--color-ink-muted)]">کالایی پیدا نشد.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        layout === "list"
          ? "flex flex-col gap-3"
          : "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          layout={layout}
          priority={index < 4}
        />
      ))}
    </div>
  );
}
