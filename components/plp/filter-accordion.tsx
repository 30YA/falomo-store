"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterAccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function FilterAccordion({
  title,
  children,
  defaultOpen = true,
  className,
}: FilterAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className={cn("border-b border-[var(--color-line)] py-3", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 py-1 text-right"
        aria-expanded={open}
      >
        <span className="text-sm font-bold text-[var(--color-ink)]">{title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-[var(--color-ink-muted)] transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open && <div className="mt-3 space-y-2">{children}</div>}
    </section>
  );
}
