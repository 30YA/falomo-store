import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductsToolbar } from "@/components/product/products-toolbar";
import { catalogRepository } from "@/lib/catalog";
import type { ProductCategory, SortOption } from "@/types";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    tag?: string;
    search?: string;
    sort?: SortOption;
  }>;
}

async function ProductsContent({
  searchParams,
}: {
  searchParams: ProductsPageProps["searchParams"];
}) {
  const params = await searchParams;
  const products = catalogRepository.searchProducts({
    category: (params.category as ProductCategory | "all") || "all",
    tag: params.tag,
    search: params.search,
    sort: params.sort || "relevant",
  });

  return (
    <>
      <ProductsToolbar resultCount={products.length} />
      <ProductGrid products={products} />
    </>
  );
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <Container className="py-6">
      <Suspense
        fallback={
          <div className="py-20 text-center text-[var(--color-ink-muted)]">
            در حال بارگذاری...
          </div>
        }
      >
        <ProductsContent searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}
