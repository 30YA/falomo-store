"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Banner } from "@/types";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

interface HeroSliderProps {
  banners: Banner[];
}

export function HeroSlider({ banners }: HeroSliderProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const current = banners[index];

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(239,64,86,0.12),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(61,90,128,0.1),_transparent_50%)]" />
      <Container className="relative py-4 sm:py-6">
        <Link
          href={current.href}
          className="group relative block overflow-hidden rounded-2xl sm:rounded-3xl"
        >
          <div className="relative aspect-[16/9] sm:aspect-[21/9]">
            <Image
              src={current.image}
              alt={current.title}
              fill
              priority
              sizes="100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/45 to-black/75" />
            <div className="absolute inset-0 flex items-end justify-start p-5 sm:items-center sm:p-10 lg:p-14">
              <div className="max-w-lg animate-fade-up space-y-2 text-white sm:space-y-3">
                <p className="text-xs font-medium tracking-wide text-white/85 sm:text-sm">
                  فالومو · کالای خواب
                </p>
                <h1 className="text-2xl font-bold leading-tight drop-shadow-md sm:text-4xl lg:text-5xl">
                  {current.title}
                </h1>
                <p className="text-sm text-white/90 drop-shadow-sm sm:text-base">
                  {current.subtitle}
                </p>
                <span className="mt-2 inline-flex rounded-xl bg-[var(--color-brand)] px-4 py-2 text-sm font-medium shadow-lg transition group-hover:bg-[var(--color-brand-dark)]">
                  مشاهده محصولات
                </span>
              </div>
            </div>
          </div>
        </Link>

        <div className="mt-3 flex justify-center gap-1.5">
          {banners.map((banner, i) => (
            <button
              key={banner.id}
              type="button"
              aria-label={`اسلاید ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index
                  ? "w-6 bg-[var(--color-brand)]"
                  : "w-1.5 bg-zinc-300 hover:bg-zinc-400",
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
