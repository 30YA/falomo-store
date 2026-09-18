"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqListProps {
  items: readonly FaqItem[];
}

export function FaqList({ items }: FaqListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]/50">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div
            key={item.question}
            className="border-b border-[var(--color-line)] last:border-b-0"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-3 px-4 py-4 text-right transition hover:bg-[var(--color-surface)]/60 sm:px-5"
            >
              <span className="text-sm font-bold text-[var(--color-ink)] sm:text-[15px]">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-[var(--color-ink-muted)] transition-transform",
                  open && "rotate-180 text-[var(--color-brand)]",
                )}
              />
            </button>
            {open ? (
              <p className="px-4 pb-4 text-sm leading-7 text-[var(--color-ink-soft)] sm:px-5">
                {item.answer}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
