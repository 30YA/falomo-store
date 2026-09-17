"use client";

import { X } from "lucide-react";
import type { FilterFacets, PlpFilters } from "@/lib/plp/filters";
import { formatPrice, toPersianDigits } from "@/lib/utils";

interface ActiveFilterChipsProps {
  filters: PlpFilters;
  facets: FilterFacets;
  onChange: (next: PlpFilters) => void;
  onClear: () => void;
}

export function ActiveFilterChips({
  filters,
  facets,
  onChange,
  onClear,
}: ActiveFilterChipsProps) {
  const chips: { key: string; label: string; clear: () => void }[] = [];

  if (filters.category && filters.category !== "all") {
    const name =
      facets.categories.find((c) => c.slug === filters.category)?.name ??
      filters.category;
    chips.push({
      key: "category",
      label: name,
      clear: () => onChange({ ...filters, category: "all" }),
    });
  }

  if (filters.search?.trim()) {
    chips.push({
      key: "search",
      label: `جستجو: ${filters.search}`,
      clear: () => onChange({ ...filters, search: undefined }),
    });
  }

  for (const brand of filters.brands) {
    chips.push({
      key: `brand-${brand}`,
      label: brand,
      clear: () =>
        onChange({
          ...filters,
          brands: filters.brands.filter((b) => b !== brand),
        }),
    });
  }

  for (const colorId of filters.colors) {
    const color = facets.colors.find((c) => c.id === colorId);
    chips.push({
      key: `color-${colorId}`,
      label: color?.name ?? colorId,
      clear: () =>
        onChange({
          ...filters,
          colors: filters.colors.filter((c) => c !== colorId),
        }),
    });
  }

  for (const size of filters.sizes) {
    chips.push({
      key: `size-${size}`,
      label: size,
      clear: () =>
        onChange({
          ...filters,
          sizes: filters.sizes.filter((s) => s !== size),
        }),
    });
  }

  for (const feature of filters.features) {
    chips.push({
      key: `feature-${feature}`,
      label: feature,
      clear: () =>
        onChange({
          ...filters,
          features: filters.features.filter((f) => f !== feature),
        }),
    });
  }

  if (filters.minPrice != null || filters.maxPrice != null) {
    const min = filters.minPrice != null ? formatPrice(filters.minPrice) : "…";
    const max = filters.maxPrice != null ? formatPrice(filters.maxPrice) : "…";
    chips.push({
      key: "price",
      label: `${min} تا ${max}`,
      clear: () =>
        onChange({ ...filters, minPrice: undefined, maxPrice: undefined }),
    });
  }

  if (filters.minRating != null) {
    chips.push({
      key: "rating",
      label: `امتیاز از ${toPersianDigits(filters.minRating)}`,
      clear: () => onChange({ ...filters, minRating: undefined }),
    });
  }

  if (filters.inStockOnly) {
    chips.push({
      key: "stock",
      label: "فقط موجود",
      clear: () => onChange({ ...filters, inStockOnly: undefined }),
    });
  }
  if (filters.onlyDiscount) {
    chips.push({
      key: "discount",
      label: "تخفیف‌دار",
      clear: () => onChange({ ...filters, onlyDiscount: undefined }),
    });
  }
  if (filters.onlyAmazing) {
    chips.push({
      key: "amazing",
      label: "شگفت‌انگیز",
      clear: () => onChange({ ...filters, onlyAmazing: undefined }),
    });
  }
  if (filters.onlyNew) {
    chips.push({
      key: "new",
      label: "جدید",
      clear: () => onChange({ ...filters, onlyNew: undefined }),
    });
  }
  if (filters.onlyBestSeller) {
    chips.push({
      key: "best",
      label: "پرفروش",
      clear: () => onChange({ ...filters, onlyBestSeller: undefined }),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.clear}
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-brand)]/30 bg-[var(--color-brand-soft)] px-2.5 py-1 text-xs text-[var(--color-brand)] transition hover:bg-[var(--color-brand)] hover:text-white"
        >
          {chip.label}
          <X className="h-3 w-3" />
        </button>
      ))}
      <button
        type="button"
        onClick={onClear}
        className="text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-brand)]"
      >
        پاک کردن همه
      </button>
    </div>
  );
}
