import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  href?: string;
  actionLabel?: string;
  className?: string;
  trailing?: ReactNode;
}

export function SectionHeader({
  title,
  href,
  actionLabel = "مشاهده همه",
  className,
  trailing,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-4 flex items-center justify-between gap-3", className)}>
      <h2 className="text-lg font-bold text-[var(--color-ink)] sm:text-xl">
        {title}
      </h2>
      <div className="flex items-center gap-3">
        {trailing}
        {href && (
          <Link
            href={href}
            className="text-sm font-medium text-[var(--color-brand)] transition hover:opacity-80"
          >
            {actionLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
