"use client";

import { useEffect, useState } from "react";
import { formatCompactPrice } from "@/lib/utils";
import type { FilterFacets, PlpFilters } from "@/lib/plp/filters";

interface PriceFilterProps {
  facets: FilterFacets;
  filters: PlpFilters;
  onChange: (min?: number, max?: number) => void;
}

export function PriceFilter({ facets, filters, onChange }: PriceFilterProps) {
  const [minInput, setMinInput] = useState(
    filters.minPrice != null ? String(filters.minPrice) : "",
  );
  const [maxInput, setMaxInput] = useState(
    filters.maxPrice != null ? String(filters.maxPrice) : "",
  );

  useEffect(() => {
    setMinInput(filters.minPrice != null ? String(filters.minPrice) : "");
    setMaxInput(filters.maxPrice != null ? String(filters.maxPrice) : "");
  }, [filters.minPrice, filters.maxPrice]);

  const apply = () => {
    const min = minInput ? Number(minInput.replace(/,/g, "")) : undefined;
    const max = maxInput ? Number(maxInput.replace(/,/g, "")) : undefined;
    onChange(
      Number.isFinite(min) ? min : undefined,
      Number.isFinite(max) ? max : undefined,
    );
  };

  const presets = [
    { label: "تا ۲ میلیون", max: 2_000_000 },
    { label: "۲ تا ۵ میلیون", min: 2_000_000, max: 5_000_000 },
    { label: "۵ تا ۱۰ میلیون", min: 5_000_000, max: 10_000_000 },
    { label: "بالای ۱۰ میلیون", min: 10_000_000 },
  ];

  return (
    <div className="space-y-3">
      <p className="text-xs text-[var(--color-ink-muted)]">
        از {formatCompactPrice(facets.priceRange.min)} تا{" "}
        {formatCompactPrice(facets.priceRange.max)} تومان
      </p>

      <div className="grid grid-cols-2 gap-2">
        <label className="space-y-1">
          <span className="text-[11px] text-[var(--color-ink-muted)]">حداقل</span>
          <input
            inputMode="numeric"
            value={minInput}
            onChange={(e) => setMinInput(e.target.value)}
            placeholder="مثلاً ۱۰۰۰۰۰۰"
            className="h-10 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm outline-none focus:border-[var(--color-brand)]"
          />
        </label>
        <label className="space-y-1">
          <span className="text-[11px] text-[var(--color-ink-muted)]">حداکثر</span>
          <input
            inputMode="numeric"
            value={maxInput}
            onChange={(e) => setMaxInput(e.target.value)}
            placeholder="مثلاً ۵۰۰۰۰۰۰"
            className="h-10 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm outline-none focus:border-[var(--color-brand)]"
          />
        </label>
      </div>

      <button
        type="button"
        onClick={apply}
        className="h-9 w-full rounded-xl bg-[var(--color-brand-soft)] text-sm font-medium text-[var(--color-brand)] transition hover:bg-[var(--color-brand)] hover:text-white"
      >
        اعمال قیمت
      </button>

      <div className="flex flex-wrap gap-1.5">
        {presets.map((preset) => {
          const active =
            filters.minPrice === preset.min && filters.maxPrice === preset.max;
          return (
            <button
              key={preset.label}
              type="button"
              onClick={() => onChange(preset.min, preset.max)}
              className={`rounded-full border px-2.5 py-1 text-[11px] transition ${
                active
                  ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
                  : "border-[var(--color-line)] bg-white text-[var(--color-ink-soft)] hover:border-[var(--color-brand)]"
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
