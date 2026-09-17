"use client";

import { cn, toPersianDigits } from "@/lib/utils";

interface FilterCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  count?: number;
  className?: string;
}

export function FilterCheckbox({
  label,
  checked,
  onChange,
  count,
  className,
}: FilterCheckboxProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-2.5 rounded-lg px-1 py-1.5 text-sm transition hover:bg-[var(--color-surface)]",
        className,
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition",
          checked
            ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
            : "border-[var(--color-line)] bg-white",
        )}
        aria-hidden
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 fill-none stroke-current stroke-[2.5]">
            <path d="M2.5 6.5 4.8 8.8 9.5 3.5" />
          </svg>
        )}
      </span>
      <span className="min-w-0 flex-1 truncate text-[var(--color-ink-soft)]">
        {label}
      </span>
      {count != null && (
        <span className="text-xs text-[var(--color-ink-muted)]">
          {toPersianDigits(count)}
        </span>
      )}
    </label>
  );
}
