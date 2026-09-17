import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ProductsListing } from "@/components/plp/products-listing";

export const metadata: Metadata = {
  title: "محصولات",
  description: "لیست کامل کالای خواب فالومو با فیلتر برند، قیمت، رنگ و سایز",
};

function ProductsFallback() {
  return (
    <div className="space-y-4 py-6">
      <div className="h-10 w-48 animate-pulse rounded-xl bg-[var(--color-surface)]" />
      <div className="h-12 animate-pulse rounded-2xl bg-[var(--color-surface)]" />
      <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="hidden h-[32rem] animate-pulse rounded-2xl bg-[var(--color-surface)] lg:block" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] animate-pulse rounded-2xl bg-[var(--color-surface)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Container className="py-5 sm:py-6">
      <Suspense fallback={<ProductsFallback />}>
        <ProductsListing />
      </Suspense>
    </Container>
  );
}
