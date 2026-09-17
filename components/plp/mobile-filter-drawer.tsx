"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { FilterSidebar } from "@/components/plp/filter-sidebar";
import { useHasMounted } from "@/lib/hooks/use-has-mounted";
import type { FilterFacets, PlpFilters } from "@/lib/plp/filters";
import { cn } from "@/lib/utils";

interface MobileFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  facets: FilterFacets;
  filters: PlpFilters;
  onChange: (next: PlpFilters) => void;
  onClear: () => void;
  resultCount: number;
}

export function MobileFilterDrawer({
  open,
  onClose,
  facets,
  filters,
  onChange,
  onClear,
  resultCount,
}: MobileFilterDrawerProps) {
  const mounted = useHasMounted();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-[80] lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="بستن فیلتر"
        className={cn(
          "absolute inset-0 bg-black/45 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="فیلتر محصولات"
        className={cn(
          "absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-3xl bg-white shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-[var(--color-line)] px-4 py-3">
          <h2 className="text-base font-bold">فیلترها</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-black/5"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <FilterSidebar
            facets={facets}
            filters={filters}
            onChange={onChange}
            onClear={onClear}
            hideHeader
            className="rounded-none border-0"
          />
        </div>

        <div className="border-t border-[var(--color-line)] p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={onClose}
            className="flex h-12 w-full items-center justify-center rounded-xl bg-[var(--color-brand)] text-sm font-bold text-white"
          >
            مشاهده {resultCount.toLocaleString("fa-IR")} کالا
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
