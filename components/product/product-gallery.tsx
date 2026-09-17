"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[var(--color-surface)]">
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover animate-fade-in"
          key={images[active]}
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActive(index)}
            className={cn(
              "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition",
              active === index
                ? "border-[var(--color-brand)]"
                : "border-transparent opacity-70 hover:opacity-100",
            )}
          >
            <Image src={image} alt="" fill className="object-cover" sizes="64px" />
          </button>
        ))}
      </div>
    </div>
  );
}
