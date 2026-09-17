"use client";

import { useMemo, useState } from "react";
import { Star, ThumbsUp } from "lucide-react";
import type { ProductDetail } from "@/types";
import { toPersianDigits } from "@/lib/utils";

interface ProductReviewsProps {
  product: ProductDetail;
}

type ReviewSort = "newest" | "helpful" | "highest";

export function ProductReviews({ product }: ProductReviewsProps) {
  const [sort, setSort] = useState<ReviewSort>("helpful");
  const total =
    product.ratingBreakdown[1] +
    product.ratingBreakdown[2] +
    product.ratingBreakdown[3] +
    product.ratingBreakdown[4] +
    product.ratingBreakdown[5];

  const reviews = useMemo(() => {
    const list = [...product.reviews];
    switch (sort) {
      case "highest":
        return list.sort((a, b) => b.rating - a.rating);
      case "newest":
        return list;
      default:
        return list.sort((a, b) => b.likes - a.likes);
    }
  }, [product.reviews, sort]);

  return (
    <section
      id="reviews"
      className="scroll-mt-40 rounded-2xl border border-[var(--color-line)] bg-white p-5 sm:p-6"
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">امتیاز و دیدگاه کاربران</h2>
          <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
            از مجموع {toPersianDigits(product.reviewCount)} دیدگاه
          </p>
        </div>
        <div className="flex gap-1 rounded-xl bg-[var(--color-surface)] p-1">
          {(
            [
              { value: "helpful", label: "مفیدترین" },
              { value: "newest", label: "جدیدترین" },
              { value: "highest", label: "بالاترین امتیاز" },
            ] as const
          ).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setSort(option.value)}
              className={`rounded-lg px-3 py-1.5 text-xs transition ${
                sort === option.value
                  ? "bg-white font-medium text-[var(--color-brand)] shadow-sm"
                  : "text-[var(--color-ink-muted)]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 grid gap-5 rounded-2xl bg-[var(--color-surface)] p-4 sm:grid-cols-[160px_1fr]">
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          <p className="text-4xl font-black text-[var(--color-ink)]">
            {toPersianDigits(product.rating.toFixed(1))}
          </p>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-zinc-300"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-[var(--color-ink-muted)]">از ۵</p>
        </div>

        <div className="space-y-2">
          {([5, 4, 3, 2, 1] as const).map((star) => {
            const count = product.ratingBreakdown[star];
            const percent = total ? Math.round((count / total) * 100) : 0;
            return (
              <div key={star} className="flex items-center gap-2 text-xs">
                <span className="w-10 text-[var(--color-ink-muted)]">
                  {toPersianDigits(star)} ستاره
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-amber-400"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-8 text-left text-[var(--color-ink-muted)]">
                  {toPersianDigits(percent)}٪
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="rounded-2xl border border-[var(--color-line)] p-4"
          >
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-zinc-300"
                      }`}
                    />
                  ))}
                </div>
                <h3 className="text-sm font-bold">{review.title}</h3>
              </div>
              <span className="text-xs text-[var(--color-ink-muted)]">
                {review.date}
              </span>
            </div>

            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-[var(--color-ink-muted)]">
              <span>{review.author}</span>
              {review.isBuyer && (
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700">
                  خریدار
                </span>
              )}
            </div>

            <p className="text-sm leading-7 text-[var(--color-ink-soft)]">
              {review.body}
            </p>

            {(review.pros?.length || review.cons?.length) && (
              <div className="mt-3 flex flex-wrap gap-4 text-xs">
                {review.pros && review.pros.length > 0 && (
                  <div>
                    <p className="mb-1 font-medium text-emerald-700">نقاط قوت</p>
                    <ul className="space-y-1 text-[var(--color-ink-soft)]">
                      {review.pros.map((pro) => (
                        <li key={pro}>+ {pro}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {review.cons && review.cons.length > 0 && (
                  <div>
                    <p className="mb-1 font-medium text-rose-600">نقاط ضعف</p>
                    <ul className="space-y-1 text-[var(--color-ink-soft)]">
                      {review.cons.map((con) => (
                        <li key={con}>- {con}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <button
              type="button"
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-[var(--color-ink-muted)] transition hover:text-[var(--color-brand)]"
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              مفید ({toPersianDigits(review.likes)})
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
