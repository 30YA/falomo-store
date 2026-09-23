import { cn } from "@/lib/utils";

type BrandLogoVariant = "mark" | "logotype" | "full" | "onDark";

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  className?: string;
  priority?: boolean;
}

function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <rect width="64" height="64" rx="18" fill="#9FCEEA" />
      <circle cx="27" cy="36" r="15" fill="#FFFFFF" />
      <circle cx="36.5" cy="30" r="12.2" fill="#9FCEEA" />
      <circle cx="49" cy="16" r="3.2" fill="#5EB0DC" />
    </svg>
  );
}

export function BrandLogo({
  variant = "logotype",
  className,
}: BrandLogoProps) {
  if (variant === "mark") {
    return (
      <span
        className={cn("inline-flex aspect-square", className)}
        role="img"
        aria-label="رویان"
      >
        <Mark className="h-full w-full" />
      </span>
    );
  }

  const onDark = variant === "onDark";
  const withTagline = variant === "full" || onDark;

  return (
    <span
      className={cn("inline-flex items-center gap-2", className)}
      role="img"
      aria-label={withTagline ? "رویان — فروشگاه کالای خواب" : "رویان"}
    >
      <Mark className={withTagline ? "h-12 w-12" : "aspect-square h-full"} />
      <span
        className={cn(
          "flex flex-col leading-none",
          onDark ? "text-white" : "text-[var(--color-ink)]",
        )}
      >
        <span
          className={cn(
            "font-extrabold tracking-tight",
            withTagline ? "text-2xl" : "text-[1.35rem]",
            !onDark && "text-[var(--color-brand)]",
          )}
        >
          رویان
        </span>
        {withTagline && (
          <span
            className={cn(
              "mt-1 text-[11px] font-medium",
              onDark ? "text-[#D7EEFB]" : "text-[var(--color-ink-muted)]",
            )}
          >
            کالای خواب
          </span>
        )}
      </span>
    </span>
  );
}
