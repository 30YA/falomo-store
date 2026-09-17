"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import type { Banner } from "@/types";
import { Container } from "@/components/ui/container";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface HeroSliderProps {
  banners: Banner[];
}

export function HeroSlider({ banners }: HeroSliderProps) {
  return (
    <section className="relative">
      <Container className="relative py-4 sm:py-6">
        {/* Single clipping frame — radius on all 4 corners */}
        <div className="hero-frame">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop={banners.length > 1}
            speed={600}
            autoplay={{
              delay: 4800,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              bulletClass: "hero-bullet",
              bulletActiveClass: "hero-bullet-active",
            }}
            className="hero-swiper"
          >
            {banners.map((banner, index) => (
              <SwiperSlide key={banner.id}>
                <Link href={banner.href} className="group relative block">
                  <div className="hero-slide-media">
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, 1200px"
                      className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/50 to-black/75" />
                    <div className="absolute inset-0 flex items-end justify-start p-5 pb-11 sm:items-center sm:p-10 sm:pb-12 lg:p-14">
                      <div className="max-w-lg space-y-2 text-white sm:space-y-3">
                        <p className="text-xs font-medium tracking-wide text-white/85 sm:text-sm">
                          فالومو · کالای خواب
                        </p>
                        <h1 className="text-2xl font-bold leading-tight drop-shadow-md sm:text-4xl lg:text-5xl">
                          {banner.title}
                        </h1>
                        <p className="text-sm text-white/90 drop-shadow-sm sm:text-base">
                          {banner.subtitle}
                        </p>
                        <span className="mt-2 inline-flex rounded-xl bg-[var(--color-brand)] px-4 py-2 text-sm font-medium shadow-lg transition group-hover:bg-[var(--color-brand-dark)]">
                          مشاهده محصولات
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
}
