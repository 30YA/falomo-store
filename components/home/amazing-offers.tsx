"use client";

import { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import type { NavigationOptions } from "swiper/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/types";
import { ProductCard } from "@/components/product/product-card";
import { Container } from "@/components/ui/container";
import { CountdownTimer } from "@/components/ui/countdown-timer";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

interface AmazingOffersProps {
  products: Product[];
}

export function AmazingOffers({ products }: AmazingOffersProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="py-4 sm:py-6">
      <Container>
        <div className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white p-3 sm:rounded-3xl sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-3 text-[var(--color-ink)] sm:mb-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h2 className="text-base font-bold sm:text-xl">
                پیشنهاد شگفت‌انگیز
              </h2>
              <CountdownTimer
                cycleHours={6}
                digitClassName="bg-white text-[var(--color-brand)] shadow-sm"
                separatorClassName="text-[var(--color-brand)]"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-1 sm:flex">
                <button
                  ref={prevRef}
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--background)] text-[var(--color-ink-soft)] transition hover:text-[var(--color-ink)]"
                  aria-label="قبلی"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  ref={nextRef}
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--background)] text-[var(--color-ink-soft)] transition hover:text-[var(--color-ink)]"
                  aria-label="بعدی"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>
              <Link
                href="/products?tag=amazing"
                className="text-sm text-[var(--color-brand)] transition hover:text-[var(--color-brand-dark)]"
              >
                مشاهده همه
              </Link>
            </div>
          </div>

          <Swiper
            modules={[FreeMode, Navigation]}
            dir="rtl"
            freeMode
            spaceBetween={12}
            slidesPerView={1.35}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              const navigation = swiper.params.navigation as NavigationOptions;
              navigation.prevEl = prevRef.current;
              navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              480: { slidesPerView: 1.8, spaceBetween: 12 },
              640: { slidesPerView: 2.4, spaceBetween: 14 },
              768: { slidesPerView: 3.1, spaceBetween: 14 },
              1024: { slidesPerView: 4, spaceBetween: 16 },
            }}
            className="amazing-swiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="!h-auto">
                <ProductCard product={product} className="h-full" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
}
