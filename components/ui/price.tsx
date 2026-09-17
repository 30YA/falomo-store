import { formatCompactPrice, toPersianDigits } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";

interface PriceProps {
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Price({
  price,
  originalPrice,
  discountPercent,
  className,
  size = "md",
}: PriceProps) {
  const priceSize =
    size === "lg" ? "text-xl" : size === "sm" ? "text-sm" : "text-base";

  return (
    <div className={cn("flex flex-col items-start gap-1", className)}>
      <div className="flex items-center gap-2">
        {discountPercent != null && discountPercent > 0 && (
          <Badge>{toPersianDigits(discountPercent)}٪</Badge>
        )}
        {originalPrice != null && originalPrice > price && (
          <span className="text-xs text-[var(--color-ink-muted)] line-through">
            {formatCompactPrice(originalPrice)}
          </span>
        )}
      </div>
      <div className={cn("flex items-baseline gap-1 font-bold", priceSize)}>
        <span>{formatCompactPrice(price)}</span>
        <span className="text-xs font-medium text-[var(--color-ink-muted)]">
          تومان
        </span>
      </div>
    </div>
  );
}
