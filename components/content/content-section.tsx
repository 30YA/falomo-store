import type { ReactNode } from "react";

interface ContentSectionProps {
  title: string;
  children: ReactNode;
}

export function ContentSection({ title, children }: ContentSectionProps) {
  return (
    <section className="border-b border-[var(--color-line)] py-5 last:border-b-0 sm:py-6">
      <h2 className="mb-2 text-base font-bold text-[var(--color-ink)] sm:text-lg">
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-7 text-[var(--color-ink-soft)] sm:text-[15px] sm:leading-8">
        {children}
      </div>
    </section>
  );
}
