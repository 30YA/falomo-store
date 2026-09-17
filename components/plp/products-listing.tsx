"use client";

import { useCallback, useMemo, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, ListFilter, SlidersHorizontal } from "lucide-react";
import { ProductGrid } from "@/components/product/product-grid";
import { FilterSidebar } from "@/components/plp/filter-sidebar";
import { ActiveFilterChips } from "@/components/plp/active-filter-chips";
import { MobileFilterDrawer } from "@/components/plp/mobile-filter-drawer";
import { MobileSortSelect, SortBar } from "@/components/plp/sort-bar";
import { catalogRepository } from "@/lib/catalog";
import {
  DEFAULT_PLP_FILTERS,
  applyPlpFilters,
  countActiveFilters,
  parsePlpSearchParams,
  plpFiltersToSearchParams,
  type PlpFilters,
} from "@/lib/plp/filters";
import type { SortOption } from "@/types";
import { cn, toPersianDigits } from "@/lib/utils";

function pageTitle(filters: PlpFilters) {
  if (filters.onlyAmazing) return "پیشنهادهای شگفت‌انگیز";
  if (filters.search?.trim()) return `نتایج «${filters.search.trim()}»`;
  if (filters.category && filters.category !== "all") {
    const cat = catalogRepository.getCategoryBySlug(filters.category);
    return cat?.name ?? "محصولات";
  }
  return "همه محصولات کالای خواب";
}

export function ProductsListing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [filterOpen, setFilterOpen] = useState(false);
  const [dense, setDense] = useState(false);

  const facets = useMemo(() => catalogRepository.getFacets(), []);
  const allProducts = useMemo(() => catalogRepository.getAllProducts(), []);

  const filters = useMemo(
    () => parsePlpSearchParams(searchParams),
    [searchParams],
  );

  const products = useMemo(
    () => applyPlpFilters(allProducts, filters),
    [allProducts, filters],
  );

  const activeCount = countActiveFilters(filters);

  const commit = useCallback(
    (next: PlpFilters) => {
      const params = plpFiltersToSearchParams(next);
      const qs = params.toString();
      startTransition(() => {
        router.push(qs ? `/products?${qs}` : "/products", { scroll: false });
      });
    },
    [router],
  );

  const clearAll = useCallback(() => {
    commit({ ...DEFAULT_PLP_FILTERS });
  }, [commit]);

  const setSort = (sort: SortOption) => {
    commit({ ...filters, sort });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">{pageTitle(filters)}</h1>
          <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
            {toPersianDigits(products.length)} کالا
            {activeCount > 0 && (
              <span>
                {" "}
                · {toPersianDigits(activeCount)} فیلتر فعال
              </span>
            )}
          </p>
        </div>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="relative flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm font-medium lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            فیلتر
            {activeCount > 0 && (
              <span className="absolute -top-1.5 -left-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-brand)] px-1 text-[10px] font-bold text-white">
                {toPersianDigits(activeCount)}
              </span>
            )}
          </button>
          <MobileSortSelect filters={filters} onChange={setSort} />
          <button
            type="button"
            onClick={() => setDense((v) => !v)}
            className="hidden h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-line)] bg-white lg:flex"
            aria-label="تغییر نمایش"
            title="تغییر تراکم گرید"
          >
            {dense ? (
              <ListFilter className="h-4 w-4" />
            ) : (
              <LayoutGrid className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-line)] bg-white px-3 py-2">
        <SortBar sort={filters.sort} onChange={setSort} />
        <div className="lg:hidden">
          <p className="px-1 py-1 text-xs text-[var(--color-ink-muted)]">
            برای فیلترهای پیشرفته از دکمه فیلتر استفاده کنید
          </p>
        </div>
      </div>

      <ActiveFilterChips
        filters={filters}
        facets={facets}
        onChange={commit}
        onClear={clearAll}
      />

      <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <FilterSidebar
          facets={facets}
          filters={filters}
          onChange={commit}
          onClear={clearAll}
          className="sticky top-28 hidden self-start lg:block"
        />

        <div className="min-w-0">
          <ProductGrid
            products={products}
            className={cn(
              dense
                ? "md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
                : "md:grid-cols-3 lg:grid-cols-3",
            )}
          />
        </div>
      </div>

      <MobileFilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        facets={facets}
        filters={filters}
        onChange={commit}
        onClear={clearAll}
        resultCount={products.length}
      />
    </div>
  );
}
