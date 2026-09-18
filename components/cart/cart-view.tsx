"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { catalogRepository } from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import { useHasMounted } from "@/lib/hooks/use-has-mounted";
import { formatPrice, toPersianDigits } from "@/lib/utils";

export function CartView() {
  const mounted = useHasMounted();
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();

  const lines = (mounted ? items : []).flatMap((item) => {
    const product = catalogRepository.getProductById(item.productId);
    if (!product) return [];
    const color = product.colors.find((c) => c.id === item.colorId);
    return [{ item, product, color }];
  });

  const total = lines.reduce(
    (sum, line) => sum + line.product.price * line.item.quantity,
    0,
  );

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-[var(--color-line)] bg-white px-6 py-16 text-center">
        <p className="text-[var(--color-ink-muted)]">در حال بارگذاری...</p>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--color-line)] bg-white px-6 py-16 text-center">
        <p className="mb-4 text-[var(--color-ink-muted)]">سبد خرید شما خالی است.</p>
        <Link
          href="/products"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--color-brand)] px-5 text-sm font-medium text-white hover:bg-[var(--color-brand-dark)]"
        >
          مشاهده محصولات
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">سبد خرید</h1>
          <button
            type="button"
            onClick={clearCart}
            className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-brand)]"
          >
            پاک کردن سبد
          </button>
        </div>

        {lines.map(({ item, product, color }) => (
          <div
            key={`${item.productId}-${item.colorId}-${item.size}`}
            className="flex gap-3 rounded-2xl border border-[var(--color-line)] bg-white p-3"
          >
            <Link
              href={`/products/${product.slug}`}
              className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[var(--color-surface)]"
            >
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className="object-cover"
                sizes="96px"
              />
            </Link>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <Link
                href={`/products/${product.slug}`}
                className="line-clamp-2 text-sm font-medium leading-6"
              >
                {product.title}
              </Link>
              <p className="text-xs text-[var(--color-ink-muted)]">
                {color?.name && `رنگ: ${color.name}`}
                {color?.name && item.size && " · "}
                {item.size && `سایز: ${item.size}`}
              </p>
              <div className="mt-auto flex items-center justify-between gap-2">
                <p className="text-sm font-bold">
                  {formatPrice(product.price * item.quantity)}
                </p>
                <div className="flex items-center gap-1">
                  <div className="flex items-center rounded-lg border border-[var(--color-line)]">
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center"
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.quantity - 1,
                          item.colorId,
                          item.size,
                        )
                      }
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-6 text-center text-sm">
                      {toPersianDigits(item.quantity)}
                    </span>
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center"
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.quantity + 1,
                          item.colorId,
                          item.size,
                        )
                      }
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    aria-label="حذف"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-ink-muted)] hover:bg-red-50 hover:text-red-600"
                    onClick={() =>
                      removeItem(item.productId, item.colorId, item.size)
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <aside className="h-fit rounded-2xl border border-[var(--color-line)] bg-white p-5 lg:sticky lg:top-[var(--header-offset)]">
        <h2 className="mb-4 font-bold">خلاصه سفارش</h2>
        <div className="mb-4 flex items-center justify-between text-sm">
          <span className="text-[var(--color-ink-muted)]">جمع کل</span>
          <span className="font-bold">{formatPrice(total)}</span>
        </div>
        <Button fullWidth size="lg">
          ادامه و ثبت سفارش
        </Button>
        <p className="mt-3 text-center text-xs text-[var(--color-ink-muted)]">
          در این فاز، پرداخت به‌صورت دمو است.
        </p>
      </aside>
    </div>
  );
}
