"use client";

import {
  BadgeCheck,
  Heart,
  Minus,
  Plus,
  RefreshCcw,
  ShieldCheck,
  ShoppingBag,
  Store,
  Truck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { ProductDetail } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { Rating } from "@/components/ui/rating";
import { toast } from "@/components/ui/toaster";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { useHasMounted } from "@/lib/hooks/use-has-mounted";
import { cn, toPersianDigits } from "@/lib/utils";

interface ProductBuyBoxProps {
  product: ProductDetail;
}

export function ProductBuyBox({ product }: ProductBuyBoxProps) {
  const mounted = useHasMounted();
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
    toast.addedToCart(product.title);
  };

  const handleWishlist = () => {
    const wasWishlisted = isWishlisted;
    toggleWishlist(product.id);
    if (wasWishlisted) toast.wishlistRemoved();
    else toast.wishlistAdded();
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {product.isAmazingOffer && <Badge>شگفت‌انگیز</Badge>}
          {product.isBestSeller && <Badge tone="warning">پرفروش</Badge>}
          {product.isNew && <Badge tone="success">جدید</Badge>}
          {!product.inStock && <Badge tone="neutral">ناموجود</Badge>}
        </div>

        <p className="text-sm text-[var(--color-ink-muted)]">
          برند:{" "}
          <span className="font-medium text-[var(--color-brand)]">
            {product.brand}
          </span>
        </p>

        <h1 className="text-xl font-bold leading-8 text-[var(--color-ink)] sm:text-2xl sm:leading-10">
          {product.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          <Rating value={product.rating} count={product.reviewCount} size="md" />
          <a
            href="#reviews"
            className="text-xs text-[var(--color-brand)] hover:underline"
          >
            مشاهده دیدگاه‌ها
          </a>
          <a
            href="#questions"
            className="text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-brand)]"
          >
            پرسش‌ها
          </a>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-line)] bg-white p-4">
        <Price
          price={product.price}
          originalPrice={product.originalPrice}
          discountPercent={product.discountPercent}
          size="lg"
        />
        {product.isAmazingOffer && (
          <p className="mt-2 text-xs text-[var(--color-brand)]">
            قیمت ویژه پیشنهاد شگفت‌انگیز
          </p>
        )}
      </div>

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
                  "flex items-center gap-2 rounded-xl border px-2.5 py-1.5 text-xs transition",
                  colorId === color.id
                    ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)]"
                    : "border-[var(--color-line)] hover:border-[var(--color-brand)]",
                )}
              >
                <span
                  className="h-4 w-4 rounded-full border border-black/10"
                  style={{ backgroundColor: color.hex }}
                />
                {color.name}
              </button>
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

      <div className="space-y-2 rounded-2xl border border-[var(--color-line)] bg-white p-4">
        <div className="flex items-start gap-3">
          <Store className="mt-0.5 h-4 w-4 text-[var(--color-brand)]" />
          <div>
            <p className="text-sm font-medium">{product.seller.name}</p>
            <p className="mt-0.5 text-xs text-[var(--color-ink-muted)]">
              {product.seller.performanceLabel} · رضایت{" "}
              {toPersianDigits(product.seller.rating.toFixed(1))} از ۵
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--color-ink-soft)]">
          <Truck className="h-3.5 w-3.5" />
          {product.seller.shippingLabel}
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--color-ink-soft)]">
          <ShieldCheck className="h-3.5 w-3.5" />
          {product.seller.warranty}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: Truck, label: "ارسال سریع" },
          { icon: RefreshCcw, label: "۷ روز بازگشت" },
          { icon: BadgeCheck, label: "ضمانت اصالت" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1.5 rounded-xl bg-[var(--color-surface)] px-2 py-3 text-center"
          >
            <Icon className="h-4 w-4 text-[var(--color-brand)]" />
            <span className="text-[10px] text-[var(--color-ink-soft)] sm:text-xs">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Desktop / tablet inline CTA */}
      <div className="hidden sm:block">
        <BuyActions
          qty={qty}
          setQty={setQty}
          onAdd={handleAdd}
          onWishlist={handleWishlist}
          inStock={product.inStock}
          isWishlisted={isWishlisted}
        />
      </div>

      {/*
        Mobile CTA is portaled to <body> with a high z-index so page sticky
        content (tabs, etc.) can never paint over it.
      */}
      {mounted &&
        createPortal(
          <div
            data-pdp-mobile-cta=""
            className="fixed inset-x-0 z-[60] border-t border-[var(--color-line)] bg-white px-4 py-3 shadow-[0_-8px_24px_-12px_rgba(15,23,42,0.25)] sm:hidden"
            style={{
              bottom:
                "calc(var(--bottom-nav-height) + env(safe-area-inset-bottom, 0px))",
            }}
          >
            <BuyActions
              qty={qty}
              setQty={setQty}
              onAdd={handleAdd}
              onWishlist={handleWishlist}
              inStock={product.inStock}
              isWishlisted={isWishlisted}
            />
          </div>,
          document.body,
        )}
    </div>
  );
}

function BuyActions({
  qty,
  setQty,
  onAdd,
  onWishlist,
  inStock,
  isWishlisted,
}: {
  qty: number;
  setQty: (updater: (q: number) => number) => void;
  onAdd: () => void;
  onWishlist: () => void;
  inStock: boolean;
  isWishlisted: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center rounded-xl border border-[var(--color-line)] bg-white">
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

      <Button
        onClick={onAdd}
        className="flex-1"
        size="lg"
        disabled={!inStock}
      >
        <ShoppingBag className="h-4 w-4" />
        {inStock ? "افزودن به سبد" : "ناموجود"}
      </Button>

      <Button
        variant="outline"
        size="icon"
        aria-label="علاقه‌مندی"
        onClick={onWishlist}
        className={cn(isWishlisted && "text-[var(--color-brand)]")}
      >
        <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
      </Button>
    </div>
  );
}
