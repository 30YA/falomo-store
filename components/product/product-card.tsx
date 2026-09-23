"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { Rating } from "@/components/ui/rating";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { toast } from "@/components/ui/toaster";
import { useHasMounted } from "@/lib/hooks/use-has-mounted";
import { cn, toPersianDigits } from "@/lib/utils";

export type ProductCardLayout = "grid" | "list";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
  layout?: ProductCardLayout;
}

export function ProductCard({
  product,
  className,
  priority,
  layout = "grid",
}: ProductCardProps) {
  const mounted = useHasMounted();
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const storedWishlisted = useWishlistStore((s) => s.has(product.id));
  const isWishlisted = mounted && storedWishlisted;

  const handleWishlist = () => {
    const wasWishlisted = isWishlisted;
    toggleWishlist(product.id);
    if (wasWishlisted) toast.wishlistRemoved();
    else toast.wishlistAdded();
  };

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      colorId: product.colors[0]?.id,
      size: product.sizes[0],
    });
    toast.addedToCart(product.title);
  };

  if (layout === "list") {
    return (
      <article
        className={cn(
          "group relative flex gap-3 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white p-3 transition hover:shadow-[0_12px_40px_-20px_rgba(15,23,42,0.3)] sm:gap-4 sm:p-4",
          className,
        )}
      >
        <Link
          href={`/products/${product.slug}`}
          className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-[var(--color-surface)] sm:h-36 sm:w-36"
        >
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="144px"
            className="object-cover transition duration-500 group-hover:scale-105"
            priority={priority}
          />
          {(product.isAmazingOffer || product.isNew) && (
            <div className="absolute right-2.5 top-2.5">
              {product.isAmazingOffer ? (
                <Badge>شگفت‌انگیز</Badge>
              ) : (
                <Badge tone="success">جدید</Badge>
              )}
            </div>
          )}
        </Link>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/products/${product.slug}`} className="min-w-0 space-y-1.5">
              <p className="line-clamp-2 text-sm font-medium leading-6 text-[var(--color-ink)] sm:text-[15px]">
                {product.title}
              </p>
              <Rating value={product.rating} count={product.reviewCount} />
            </Link>
            <button
              type="button"
              aria-label="علاقه‌مندی"
              onClick={handleWishlist}
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] bg-white transition hover:scale-105",
                isWishlisted && "text-[var(--color-brand)]",
              )}
            >
              <Heart
                className={cn("h-4 w-4", isWishlisted && "fill-current")}
              />
            </button>
          </div>

          {product.colors.length > 1 && (
            <div className="flex items-center gap-1.5">
              {product.colors.slice(0, 5).map((color) => (
                <span
                  key={color.id}
                  title={color.name}
                  className="h-3.5 w-3.5 rounded-full border border-black/10"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
              {product.colors.length > 5 && (
                <span className="text-[10px] text-[var(--color-ink-muted)]">
                  +{toPersianDigits(product.colors.length - 5)}
                </span>
              )}
            </div>
          )}

          <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-1">
            <Price
              price={product.price}
              originalPrice={product.originalPrice}
              discountPercent={product.discountPercent}
              size="sm"
            />
            <Button
              size="sm"
              aria-label="افزودن به سبد"
              onClick={handleAddToCart}
              className="shrink-0"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">افزودن به سبد</span>
            </Button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-20px_rgba(15,23,42,0.35)]",
        className,
      )}
    >
      <Link href={`/products/${product.slug}`} className="relative block">
        <div className="relative aspect-square overflow-hidden bg-[var(--color-surface)]">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            priority={priority}
          />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3.5">
            <div className="flex flex-col gap-1">
              {product.isAmazingOffer && <Badge>شگفت‌انگیز</Badge>}
              {product.isNew && !product.isAmazingOffer && (
                <Badge tone="success">جدید</Badge>
              )}
            </div>
          </div>
        </div>
      </Link>

      <button
        type="button"
        aria-label="علاقه‌مندی"
        onClick={handleWishlist}
        className={cn(
          "absolute left-2.5 top-2.5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-105",
          isWishlisted && "text-[var(--color-brand)]",
        )}
      >
        <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
      </button>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-3.5">
        <Link href={`/products/${product.slug}`} className="space-y-1.5">
          <p className="line-clamp-2 min-h-[2.5rem] text-sm leading-6 text-[var(--color-ink)]">
            {product.title}
          </p>
          <Rating value={product.rating} count={product.reviewCount} />
        </Link>

        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <Price
            price={product.price}
            originalPrice={product.originalPrice}
            discountPercent={product.discountPercent}
            size="sm"
          />
          <Button
            size="icon"
            aria-label="افزودن به سبد"
            onClick={handleAddToCart}
            className="shrink-0"
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>

        {product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 pt-1">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color.id}
                title={color.name}
                className="h-3.5 w-3.5 rounded-full border border-black/10"
                style={{ backgroundColor: color.hex }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-[var(--color-ink-muted)]">
                +{toPersianDigits(product.colors.length - 4)}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
