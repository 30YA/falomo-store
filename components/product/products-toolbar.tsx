"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/data/products";
import type { SortOption } from "@/types";
import { cn, toPersianDigits } from "@/lib/utils";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "relevant", label: "مرتبط‌ترین" },
  { value: "cheapest", label: "ارزان‌ترین" },
  { value: "expensive", label: "گران‌ترین" },
  { value: "best-selling", label: "پرفروش‌ترین" },
  { value: "newest", label: "جدیدترین" },
];

interface ProductsToolbarProps {
  resultCount: number;
}

export function ProductsToolbar({ resultCount }: ProductsToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") ?? "all";
  const currentSort = (searchParams.get("sort") as SortOption) || "relevant";
  const currentTag = searchParams.get("tag");
  const currentSearch = searchParams.get("search");

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "all" || value === "relevant") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="mb-5 space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">
            {currentTag === "amazing"
              ? "پیشنهادهای شگفت‌انگیز"
              : currentSearch
                ? `نتایج «${currentSearch}»`
                : "همه محصولات"}
          </h1>
          <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
            {toPersianDigits(resultCount)} کالا پیدا شد
          </p>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <span className="text-[var(--color-ink-muted)]">مرتب‌سازی</span>
          <select
            value={currentSort}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="h-10 rounded-xl border border-[var(--color-line)] bg-white px-3 outline-none focus:border-[var(--color-brand)]"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <button
          type="button"
          onClick={() => updateParam("category", "all")}
          className={cn(
            "shrink-0 rounded-full border px-3 py-1.5 text-sm transition",
            currentCategory === "all"
              ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
              : "border-[var(--color-line)] bg-white hover:border-[var(--color-brand)]",
          )}
        >
          همه
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => updateParam("category", cat.slug)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-sm transition",
              currentCategory === cat.slug
                ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
                : "border-[var(--color-line)] bg-white hover:border-[var(--color-brand)]",
            )}
          >
            {cat.name}
          </button>
        ))}
        <Link
          href="/products?tag=amazing"
          className={cn(
            "shrink-0 rounded-full border px-3 py-1.5 text-sm transition",
            currentTag === "amazing"
              ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
              : "border-[var(--color-line)] bg-white hover:border-[var(--color-brand)]",
          )}
        >
          شگفت‌انگیز
        </Link>
      </div>
    </div>
  );
}
