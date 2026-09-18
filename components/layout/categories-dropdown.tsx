"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, LayoutGrid } from "lucide-react";
import { categories } from "@/data/products";
import { cn } from "@/lib/utils";

export function CategoriesDropdown() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition",
          open
            ? "bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
            : "text-[var(--color-ink)] hover:bg-black/5",
        )}
      >
        <LayoutGrid className="h-4 w-4" />
        دسته‌بندی‌ها
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
        />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute top-[calc(100%+0.4rem)] right-0 z-50 w-64 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-[0_20px_50px_-24px_rgba(15,23,42,0.4)] animate-fade-in"
        >
          <div className="grid grid-cols-1 p-2">
            <Link
              href="/categories"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
            >
              همه دسته‌بندی‌ها
            </Link>
            <div className="my-1 border-t border-[var(--color-line)]" />
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
