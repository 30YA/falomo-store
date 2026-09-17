"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[];
    if (slides.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = slides.indexOf(visible.target as HTMLDivElement);
        if (index >= 0) setActive(index);
      },
      {
        root: scrollerRef.current,
        threshold: 0.6,
      },
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [images.length]);

  const goTo = (index: number) => {
    slideRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
    setActive(index);
  };

  if (images.length === 0) return null;

  return (
    <div className="w-full min-w-0 max-w-full space-y-3">
      <div className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]">
        <div
          ref={scrollerRef}
          dir="ltr"
          className="flex aspect-square w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scrollbar-hide"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {images.map((image, index) => (
            <div
              key={image}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              className="relative aspect-square w-full min-w-full max-w-full shrink-0 snap-center basis-full"
            >
              <Image
                src={image}
                alt={`${alt} - تصویر ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 480px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-center gap-1.5">
          {images.map((image, index) => (
            <button
              key={`dot-${image}`}
              type="button"
              aria-label={`تصویر ${index + 1}`}
              onClick={() => goTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                active === index
                  ? "w-5 bg-[var(--color-brand)]"
                  : "w-1.5 bg-zinc-300",
              )}
            />
          ))}
        </div>
      )}

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => goTo(index)}
              className={cn(
                "relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 bg-[var(--color-surface)] transition sm:h-16 sm:w-16",
                active === index
                  ? "border-[var(--color-brand)]"
                  : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
