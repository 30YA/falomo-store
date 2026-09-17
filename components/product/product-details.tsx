"use client";

import { useMemo, useState } from "react";
import { Heart, Minus, Plus, ShoppingBag, Truck } from "lucide-react";
import type { Product } from "@/types";
import { ProductGallery } from "./product-gallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { Rating } from "@/components/ui/rating";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { cn, toPersianDigits } from "@/lib/utils";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [colorId, setColorId] = useState(product.colors[0]?.id);
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));

  const selectedColor = useMemo(
    () => product.colors.find((c) => c.id === colorId),
    [colorId, product.colors],
  );

  const handleAdd = () => {
    addItem({
      productId: product.id,
      colorId,
      size,
      quantity: qty,
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <ProductGallery images={product.images} alt={product.title} />

      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {product.isAmazingOffer && <Badge>شگفت‌انگیز</Badge>}
            {product.isBestSeller && <Badge tone="warning">پرفروش</Badge>}
            {product.isNew && <Badge tone="success">جدید</Badge>}
          </div>
          <p className="text-sm text-[var(--color-ink-muted)]">{product.brand}</p>
          <h1 className="text-xl font-bold leading-8 text-[var(--color-ink)] sm:text-2xl sm:leading-10">
            {product.title}
          </h1>
          <Rating value={product.rating} count={product.reviewCount} size="md" />
        </div>

        <Price
          price={product.price}
          originalPrice={product.originalPrice}
          discountPercent={product.discountPercent}
          size="lg"
        />

        <p className="text-sm leading-7 text-[var(--color-ink-soft)]">
          {product.description}
        </p>

        {product.colors.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">
              رنگ:{" "}
              <span className="text-[var(--color-ink-muted)]">
                {selectedColor?.name}
              </span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setColorId(color.id)}
                  className={cn(
                    "h-9 w-9 rounded-full border-2 transition",
                    colorId === color.id
                      ? "border-[var(--color-brand)] scale-105"
                      : "border-transparent",
                  )}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>
        )}

        {product.sizes.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">سایز</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSize(item)}
                  className={cn(
                    "rounded-xl border px-3 py-2 text-sm transition",
                    size === item
                      ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
                      : "border-[var(--color-line)] hover:border-[var(--color-brand)]",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {product.features.map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs text-[var(--color-ink-soft)]"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-sky-50 px-3 py-2.5 text-sm text-sky-800">
          <Truck className="h-4 w-4 shrink-0" />
          ارسال سریع به سراسر کشور · موجود در انبار فالومو
        </div>

        <div className="sticky bottom-20 z-20 -mx-4 border-t border-[var(--color-line)] bg-white/95 p-4 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none lg:bottom-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-xl border border-[var(--color-line)]">
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="کاهش تعداد"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-8 text-center font-medium">
                {toPersianDigits(qty)}
              </span>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center"
                onClick={() => setQty((q) => q + 1)}
                aria-label="افزایش تعداد"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button onClick={handleAdd} className="flex-1" size="lg">
              <ShoppingBag className="h-4 w-4" />
              افزودن به سبد
            </Button>

            <Button
              variant="outline"
              size="icon"
              aria-label="علاقه‌مندی"
              onClick={() => toggleWishlist(product.id)}
              className={cn(isWishlisted && "text-[var(--color-brand)]")}
            >
              <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
