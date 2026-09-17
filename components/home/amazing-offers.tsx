"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/types";
import { ProductCard } from "@/components/product/product-card";
import { Container } from "@/components/ui/container";
import { toPersianDigits } from "@/lib/utils";
import { useHasMounted } from "@/lib/hooks/use-has-mounted";

interface AmazingOffersProps {
  products: Product[];
}

function useCountdown(hours = 8) {
  const [remaining, setRemaining] = useState(hours * 3600);
  const mounted = useHasMounted();

  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => {
      setRemaining((r) => (r > 0 ? r - 1 : hours * 3600));
    }, 1000);
    return () => clearInterval(id);
  }, [hours, mounted]);

  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;

  return {
    h: String(h).padStart(2, "0"),
    m: String(m).padStart(2, "0"),
    s: String(s).padStart(2, "0"),
  };
}

export function AmazingOffers({ products }: AmazingOffersProps) {
  const time = useCountdown(6);

  return (
    <section className="py-4 sm:py-6">
      <Container>
        <div className="overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#ef4056_0%,#c81e3a_55%,#9f1239_100%)] p-3 sm:rounded-3xl sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-3 text-white sm:mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-bold sm:text-xl">پیشنهاد شگفت‌انگیز</h2>
              <div className="flex items-center gap-1 font-mono text-sm" dir="ltr">
                {[time.h, time.m, time.s].map((part, i) => (
                  <span key={i} className="flex items-center gap-1">
                    {i > 0 && <span className="opacity-70">:</span>}
                    <span className="rounded-md bg-white/15 px-1.5 py-0.5 backdrop-blur">
                      {toPersianDigits(part)}
                    </span>
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="/products?tag=amazing"
              className="text-sm text-white/90 transition hover:text-white"
            >
              مشاهده همه
            </Link>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="w-[70vw] max-w-[240px] shrink-0 sm:w-auto sm:max-w-none">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
