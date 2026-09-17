"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="space-y-3">
      <Swiper
        modules={[FreeMode, Navigation, Thumbs]}
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className="overflow-hidden rounded-2xl bg-[var(--color-surface)]"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <div className="relative aspect-square">
              <Image
                src={image}
                alt={alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {images.length > 1 && (
        <Swiper
          modules={[FreeMode, Thumbs]}
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView={4.2}
          freeMode
          watchSlidesProgress
          className="gallery-thumbs"
        >
          {images.map((image, index) => (
            <SwiperSlide key={image}>
              <div
                className={cn(
                  "thumb-frame relative aspect-square overflow-hidden rounded-xl border-2 border-transparent bg-[var(--color-surface)]",
                )}
              >
                <Image
                  src={image}
                  alt={`${alt} - تصویر ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
