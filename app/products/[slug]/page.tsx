import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ProductDetails } from "@/components/product/product-details";
import { ProductSection } from "@/components/home/product-section";
import { catalogRepository } from "@/lib/catalog";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return catalogRepository.getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = catalogRepository.getProductBySlug(slug);
  if (!product) return { title: "محصول یافت نشد" };
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = catalogRepository.getProductBySlug(slug);
  if (!product) notFound();

  const related = catalogRepository.getRelatedProducts(product);

  return (
    <>
      <Container className="py-6">
        <ProductDetails product={product} />
      </Container>
      {related.length > 0 && (
        <ProductSection title="محصولات مرتبط" products={related} href="/products" />
      )}
    </>
  );
}
