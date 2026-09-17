"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Clock3,
  Search,
  Tag,
  TrendingUp,
} from "lucide-react";
import type { SearchSuggestions } from "@/lib/search/suggest";
import { formatCompactPrice, toPersianDigits } from "@/lib/utils";

interface SearchDropdownProps {
  query: string;
  suggestions: SearchSuggestions;
  recentSearches: string[];
  popularQueries: string[];
  activeIndex: number;
  onHoverIndex: (index: number) => void;
  onSelectQuery: (query: string) => void;
  onClearRecent: () => void;
  onViewAll: () => void;
  onClose: () => void;
  plpHref: string;
}

export function SearchDropdown({
  query,
  suggestions,
  recentSearches,
  popularQueries,
  activeIndex,
  onHoverIndex,
  onSelectQuery,
  onClearRecent,
  onViewAll,
  onClose,
  plpHref,
}: SearchDropdownProps) {
  const hasQuery = query.trim().length > 0;

  return (
    <div
      role="listbox"
      className="absolute inset-x-0 top-[calc(100%+0.4rem)] z-50 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-[0_24px_60px_-28px_rgba(15,23,42,0.45)] animate-fade-in"
    >
      <div className="max-h-[min(70vh,520px)] overflow-y-auto">
        {!hasQuery && recentSearches.length > 0 && (
          <section className="border-b border-[var(--color-line)] p-3">
            <div className="mb-2 flex items-center justify-between px-1">
              <p className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-ink-muted)]">
                <Clock3 className="h-3.5 w-3.5" />
                جستجوهای اخیر
              </p>
              <button
                type="button"
                onClick={onClearRecent}
                className="text-[11px] text-[var(--color-brand)] hover:underline"
              >
                پاک کردن
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {recentSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => onSelectQuery(item)}
                  className="rounded-full border border-[var(--color-line)] px-2.5 py-1 text-xs text-[var(--color-ink-soft)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                >
                  {item}
                </button>
              ))}
            </div>
          </section>
        )}

        {!hasQuery && (
          <section className="border-b border-[var(--color-line)] p-3">
            <p className="mb-2 flex items-center gap-1.5 px-1 text-xs font-medium text-[var(--color-ink-muted)]">
              <TrendingUp className="h-3.5 w-3.5" />
              جستجوهای پرطرفدار
            </p>
            <div className="space-y-0.5">
              {popularQueries.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => onSelectQuery(item)}
                  className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-right text-sm text-[var(--color-ink-soft)] transition hover:bg-[var(--color-surface)] hover:text-[var(--color-brand)]"
                >
                  <Search className="h-3.5 w-3.5 shrink-0 opacity-60" />
                  {item}
                </button>
              ))}
            </div>
          </section>
        )}

        {suggestions.categories.length > 0 && (
          <section className="border-b border-[var(--color-line)] p-3">
            <p className="mb-2 px-1 text-xs font-medium text-[var(--color-ink-muted)]">
              دسته‌بندی‌ها
            </p>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}`}
                  onClick={onClose}
                  className="rounded-full bg-[var(--color-surface)] px-2.5 py-1 text-xs text-[var(--color-ink-soft)] transition hover:bg-[var(--color-brand-soft)] hover:text-[var(--color-brand)]"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {suggestions.brands.length > 0 && (
          <section className="border-b border-[var(--color-line)] p-3">
            <p className="mb-2 flex items-center gap-1.5 px-1 text-xs font-medium text-[var(--color-ink-muted)]">
              <Tag className="h-3.5 w-3.5" />
              برندها
            </p>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.brands.map((brand) => (
                <Link
                  key={brand}
                  href={`/products?brand=${encodeURIComponent(brand)}`}
                  onClick={onClose}
                  className="rounded-full border border-[var(--color-line)] px-2.5 py-1 text-xs transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                >
                  {brand}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="p-2">
          <p className="mb-1 px-2 pt-1 text-xs font-medium text-[var(--color-ink-muted)]">
            {hasQuery ? "کالاها" : "پیشنهادهای منتخب"}
          </p>

          {suggestions.products.length === 0 ? (
            <p className="px-2 py-6 text-center text-sm text-[var(--color-ink-muted)]">
              نتیجه‌ای برای «{query}» پیدا نشد
            </p>
          ) : (
            <ul className="space-y-0.5">
              {suggestions.products.map((product, index) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.slug}`}
                    role="option"
                    aria-selected={activeIndex === index}
                    onMouseEnter={() => onHoverIndex(index)}
                    onClick={onClose}
                    className={`flex items-center gap-3 rounded-xl p-2 transition ${
                      activeIndex === index
                        ? "bg-[var(--color-brand-soft)]"
                        : "hover:bg-[var(--color-surface)]"
                    }`}
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[var(--color-surface)]">
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm leading-6 text-[var(--color-ink)]">
                        {product.title}
                      </p>
                      <p className="mt-0.5 text-xs text-[var(--color-ink-muted)]">
                        {product.brand}
                      </p>
                    </div>
                    <div className="shrink-0 text-left">
                      <p className="text-sm font-bold text-[var(--color-ink)]">
                        {formatCompactPrice(product.price)}
                      </p>
                      <p className="text-[10px] text-[var(--color-ink-muted)]">
                        تومان
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {hasQuery && (
        <Link
          href={plpHref}
          onClick={onViewAll}
          className="flex items-center justify-between border-t border-[var(--color-line)] bg-[var(--color-surface)]/80 px-4 py-3 text-sm font-medium text-[var(--color-brand)] transition hover:bg-[var(--color-brand-soft)]"
        >
          <span>
            مشاهده همه نتایج
            {suggestions.totalProducts > 0 && (
              <span className="mr-1 font-normal text-[var(--color-ink-muted)]">
                ({toPersianDigits(suggestions.totalProducts)} کالا)
              </span>
            )}
          </span>
          <ArrowLeft className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
