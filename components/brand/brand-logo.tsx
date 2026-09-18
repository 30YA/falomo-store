import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoVariant = "mark" | "logotype" | "full" | "onDark";

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  className?: string;
  priority?: boolean;
}

const ASSETS: Record<
  BrandLogoVariant,
  { src: string; alt: string; width: number; height: number }
> = {
  mark: {
    src: "/brand/mark.png",
    alt: "فالومو",
    width: 1024,
    height: 1024,
  },
  logotype: {
    src: "/brand/logotype.png",
    alt: "فالومو",
    width: 739,
    height: 371,
  },
  full: {
    src: "/brand/logo.png",
    alt: "فالومو — آرامش، از خانه شروع می‌شود",
    width: 1024,
    height: 682,
  },
  onDark: {
    src: "/brand/logo-on-dark.png",
    alt: "فالومو — آرامش، از خانه شروع می‌شود",
    width: 1024,
    height: 682,
  },
};

export function BrandLogo({
  variant = "logotype",
  className,
  priority,
}: BrandLogoProps) {
  const asset = ASSETS[variant];

  return (
    <span
      className={cn("relative inline-block overflow-hidden", className)}
      style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        priority={priority}
        sizes="(max-width: 640px) 160px, 200px"
        className="object-contain object-right"
      />
    </span>
  );
}
