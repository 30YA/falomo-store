import { Star } from "lucide-react";
import { toPersianDigits } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  count?: number;
  className?: string;
  size?: "sm" | "md";
}

export function Rating({ value, count, className, size = "sm" }: RatingProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 text-[var(--color-ink-muted)]",
        size === "sm" ? "text-xs" : "text-sm",
        className,
      )}
    >
      <Star
        className={cn(
          "fill-amber-400 text-amber-400",
          size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4",
        )}
      />
      <span className="font-medium text-[var(--color-ink)]">
        {toPersianDigits(value.toFixed(1))}
      </span>
      {count != null && (
        <span className="text-[var(--color-ink-muted)]">
          ({toPersianDigits(count)})
        </span>
      )}
    </div>
  );
}
