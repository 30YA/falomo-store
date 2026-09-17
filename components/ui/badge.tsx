import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  tone?: "brand" | "success" | "neutral" | "warning";
  className?: string;
}

const tones = {
  brand: "bg-[var(--color-brand)] text-white",
  success: "bg-emerald-500 text-white",
  neutral: "bg-zinc-100 text-zinc-700",
  warning: "bg-amber-100 text-amber-800",
};

export function Badge({ children, tone = "brand", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-bold leading-none",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
