"use client";

import { SORT_OPTIONS, type PlpFilters } from "@/lib/plp/filters";
import type { SortOption } from "@/types";
import { cn } from "@/lib/utils";

interface SortBarProps {
  sort: SortOption;
  onChange: (sort: SortOption) => void;
  className?: string;
}

export function SortBar({ sort, onChange, className }: SortBarProps) {
  return (
    <div
      className={cn(
        "hidden items-center gap-1 overflow-x-auto lg:flex",
        className,
      )}
    >
      <span className="ml-2 shrink-0 text-xs text-[var(--color-ink-muted)]">
        مرتب‌سازی:
      </span>
      {SORT_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "shrink-0 rounded-lg px-3 py-1.5 text-sm transition",
            sort === option.value
              ? "bg-[var(--color-brand-soft)] font-medium text-[var(--color-brand)]"
              : "text-[var(--color-ink-soft)] hover:bg-[var(--color-surface)]",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

interface MobileSortSelectProps {
  filters: PlpFilters;
  onChange: (sort: SortOption) => void;
}

export function MobileSortSelect({ filters, onChange }: MobileSortSelectProps) {
  return (
    <label className="flex h-10 flex-1 items-center gap-2 rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm lg:hidden">
      <span className="text-[var(--color-ink-muted)]">مرتب‌سازی</span>
      <select
        value={filters.sort}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="min-w-0 flex-1 bg-transparent font-medium outline-none"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
