"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Star } from "lucide-react";
import { FilterAccordion } from "@/components/plp/filter-accordion";
import { FilterCheckbox } from "@/components/plp/filter-checkbox";
import { PriceFilter } from "@/components/plp/price-filter";
import type { FilterFacets, PlpFilters } from "@/lib/plp/filters";
import { cn, toPersianDigits } from "@/lib/utils";

interface FilterSidebarProps {
  facets: FilterFacets;
  filters: PlpFilters;
  onChange: (next: PlpFilters) => void;
  onClear: () => void;
  className?: string;
  hideHeader?: boolean;
}

function toggleValue(list: string[], value: string, checked: boolean) {
  if (checked) return list.includes(value) ? list : [...list, value];
  return list.filter((item) => item !== value);
}

export function FilterSidebar({
  facets,
  filters,
  onChange,
  onClear,
  className,
  hideHeader = false,
}: FilterSidebarProps) {
  const [brandQuery, setBrandQuery] = useState("");
  const [searchDraft, setSearchDraft] = useState(filters.search ?? "");

  useEffect(() => {
    setSearchDraft(filters.search ?? "");
  }, [filters.search]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const next = searchDraft.trim() || undefined;
      if (next === (filters.search?.trim() || undefined)) return;
      onChange({ ...filters, search: next });
    }, 350);
    return () => window.clearTimeout(id);
    // intentionally only depend on searchDraft
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDraft]);

  const brands = useMemo(() => {
    const q = brandQuery.trim();
    if (!q) return facets.brands;
    return facets.brands.filter((b) => b.value.includes(q));
  }, [brandQuery, facets.brands]);

  const patch = (partial: Partial<PlpFilters>) => {
    onChange({ ...filters, ...partial });
  };

  return (
    <aside
      className={cn(
        "rounded-2xl border border-[var(--color-line)] bg-white",
        className,
      )}
    >
      {!hideHeader && (
        <div className="flex items-center justify-between border-b border-[var(--color-line)] px-4 py-3">
          <h2 className="text-sm font-bold">فیلترها</h2>
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-[var(--color-brand)] hover:underline"
          >
            حذف فیلترها
          </button>
        </div>
      )}

      <div className="max-h-[calc(100vh-10rem)] overflow-y-auto px-4 pb-4">
        <FilterAccordion title="جستجو در نتایج">
          <div className="relative">
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-ink-muted)]" />
            <input
              value={searchDraft}
              onChange={(e) => setSearchDraft(e.target.value)}
              placeholder="نام کالا یا برند..."
              className="h-10 w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] pr-10 pl-3 text-sm outline-none focus:border-[var(--color-brand)] focus:bg-white"
            />
          </div>
        </FilterAccordion>

        <FilterAccordion title="دسته‌بندی">
          <button
            type="button"
            onClick={() => patch({ category: "all" })}
            className={cn(
              "mb-1 w-full rounded-lg px-2 py-2 text-right text-sm transition",
              !filters.category || filters.category === "all"
                ? "bg-[var(--color-brand-soft)] font-medium text-[var(--color-brand)]"
                : "hover:bg-[var(--color-surface)]",
            )}
          >
            همه دسته‌ها
          </button>
          {facets.categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => patch({ category: cat.slug })}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm transition",
                filters.category === cat.slug
                  ? "bg-[var(--color-brand-soft)] font-medium text-[var(--color-brand)]"
                  : "text-[var(--color-ink-soft)] hover:bg-[var(--color-surface)]",
              )}
            >
              <span>{cat.name}</span>
              <span className="text-xs text-[var(--color-ink-muted)]">
                {toPersianDigits(cat.count)}
              </span>
            </button>
          ))}
        </FilterAccordion>

        <FilterAccordion title="برند">
          <div className="relative mb-2">
            <Search className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--color-ink-muted)]" />
            <input
              value={brandQuery}
              onChange={(e) => setBrandQuery(e.target.value)}
              placeholder="جستجوی برند"
              className="h-9 w-full rounded-lg border border-[var(--color-line)] bg-white pr-9 pl-3 text-xs outline-none focus:border-[var(--color-brand)]"
            />
          </div>
          <div className="max-h-48 space-y-0.5 overflow-y-auto">
            {brands.map((brand) => (
              <FilterCheckbox
                key={brand.value}
                label={brand.value}
                count={brand.count}
                checked={filters.brands.includes(brand.value)}
                onChange={(checked) =>
                  patch({
                    brands: toggleValue(filters.brands, brand.value, checked),
                  })
                }
              />
            ))}
          </div>
        </FilterAccordion>

        <FilterAccordion title="محدوده قیمت">
          <PriceFilter
            facets={facets}
            filters={filters}
            onChange={(minPrice, maxPrice) => patch({ minPrice, maxPrice })}
          />
        </FilterAccordion>

        <FilterAccordion title="رنگ">
          <div className="flex flex-wrap gap-2">
            {facets.colors.map((color) => {
              const active = filters.colors.includes(color.id);
              return (
                <button
                  key={color.id}
                  type="button"
                  title={color.name}
                  onClick={() =>
                    patch({
                      colors: toggleValue(filters.colors, color.id, !active),
                    })
                  }
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-2 py-1 text-xs transition",
                    active
                      ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)]"
                      : "border-[var(--color-line)] hover:border-[var(--color-brand)]",
                  )}
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full border border-black/10"
                    style={{ backgroundColor: color.hex }}
                  />
                  {color.name}
                </button>
              );
            })}
          </div>
        </FilterAccordion>

        <FilterAccordion title="سایز">
          <div className="flex flex-wrap gap-1.5">
            {facets.sizes.map((size) => {
              const active = filters.sizes.includes(size.value);
              return (
                <button
                  key={size.value}
                  type="button"
                  onClick={() =>
                    patch({
                      sizes: toggleValue(filters.sizes, size.value, !active),
                    })
                  }
                  className={cn(
                    "rounded-lg border px-2.5 py-1.5 text-xs transition",
                    active
                      ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
                      : "border-[var(--color-line)] hover:border-[var(--color-brand)]",
                  )}
                >
                  {size.value}
                  <span className="mr-1 text-[10px] text-[var(--color-ink-muted)]">
                    ({toPersianDigits(size.count)})
                  </span>
                </button>
              );
            })}
          </div>
        </FilterAccordion>

        <FilterAccordion title="امتیاز">
          {[4, 3].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() =>
                patch({
                  minRating: filters.minRating === rating ? undefined : rating,
                })
              }
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm transition",
                filters.minRating === rating
                  ? "bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
                  : "hover:bg-[var(--color-surface)]",
              )}
            >
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {toPersianDigits(rating)} به بالا
            </button>
          ))}
        </FilterAccordion>

        <FilterAccordion title="ویژگی‌ها" defaultOpen={false}>
          <div className="max-h-44 space-y-0.5 overflow-y-auto">
            {facets.features.map((feature) => (
              <FilterCheckbox
                key={feature.value}
                label={feature.value}
                count={feature.count}
                checked={filters.features.includes(feature.value)}
                onChange={(checked) =>
                  patch({
                    features: toggleValue(
                      filters.features,
                      feature.value,
                      checked,
                    ),
                  })
                }
              />
            ))}
          </div>
        </FilterAccordion>

        <FilterAccordion title="سایر فیلترها">
          <FilterCheckbox
            label="فقط کالاهای موجود"
            checked={!!filters.inStockOnly}
            onChange={(checked) => patch({ inStockOnly: checked || undefined })}
          />
          <FilterCheckbox
            label="فقط تخفیف‌دار"
            checked={!!filters.onlyDiscount}
            onChange={(checked) => patch({ onlyDiscount: checked || undefined })}
          />
          <FilterCheckbox
            label="پیشنهاد شگفت‌انگیز"
            checked={!!filters.onlyAmazing}
            onChange={(checked) => patch({ onlyAmazing: checked || undefined })}
          />
          <FilterCheckbox
            label="کالاهای جدید"
            checked={!!filters.onlyNew}
            onChange={(checked) => patch({ onlyNew: checked || undefined })}
          />
          <FilterCheckbox
            label="پرفروش‌ها"
            checked={!!filters.onlyBestSeller}
            onChange={(checked) =>
              patch({ onlyBestSeller: checked || undefined })
            }
          />
        </FilterAccordion>
      </div>
    </aside>
  );
}
