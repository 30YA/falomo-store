import type { Product } from "@/types";
import { ProductGrid } from "@/components/product/product-grid";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

interface ProductSectionProps {
  title: string;
  products: Product[];
  href?: string;
}

export function ProductSection({ title, products, href }: ProductSectionProps) {
  return (
    <section className="py-4 sm:py-6">
      <Container>
        <SectionHeader title={title} href={href} />
        <ProductGrid products={products} />
      </Container>
    </section>
  );
}
