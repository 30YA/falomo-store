"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "intro", label: "معرفی" },
  { id: "specs", label: "مشخصات" },
  { id: "reviews", label: "دیدگاه‌ها" },
  { id: "questions", label: "پرسش‌ها" },
] as const;

export function ProductTabs() {
  const [active, setActive] = useState<string>("intro");

  useEffect(() => {
    const sections = TABS.map((t) => document.getElementById(t.id)).filter(
      Boolean,
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.4, 0.7] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "mb-6 border-y border-[var(--color-line)] bg-white",
        // Mobile: never sticky — avoids covering the fixed buy bar
        "relative z-0",
        // Desktop: sticky under header is fine
        "sm:sticky sm:top-28 sm:z-10 sm:rounded-2xl sm:border sm:bg-white/95 sm:backdrop-blur",
      )}
    >
      <div className="flex gap-1 overflow-x-auto px-2 py-2 scrollbar-hide">
        {TABS.map((tab) => (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            onClick={(event) => {
              event.preventDefault();
              setActive(tab.id);
              document.getElementById(tab.id)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className={cn(
              "shrink-0 rounded-xl px-4 py-2 text-sm transition",
              active === tab.id
                ? "bg-[var(--color-brand-soft)] font-bold text-[var(--color-brand)]"
                : "text-[var(--color-ink-soft)] hover:bg-[var(--color-surface)]",
            )}
          >
            {tab.label}
          </a>
        ))}
      </div>
    </div>
  );
}
