import type { ProductDetail } from "@/types";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductBreadcrumb } from "@/components/pdp/product-breadcrumb";
import { ProductBuyBox } from "@/components/pdp/product-buy-box";
import { ProductTabs } from "@/components/pdp/product-tabs";
import { ProductDescription } from "@/components/pdp/product-description";
import { ProductSpecs } from "@/components/pdp/product-specs";
import { ProductReviews } from "@/components/pdp/product-reviews";
import { ProductQuestions } from "@/components/pdp/product-questions";

interface ProductPageViewProps {
  product: ProductDetail;
}

export function ProductPageView({ product }: ProductPageViewProps) {
  return (
    <div>
      <ProductBreadcrumb product={product} />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ProductGallery images={product.images} alt={product.title} />
        </div>
        <ProductBuyBox product={product} />
      </div>

      <div className="mt-10">
        <ProductTabs />
        <div className="space-y-5">
          <ProductDescription product={product} />
          <ProductSpecs product={product} />
          <ProductReviews product={product} />
          <ProductQuestions product={product} />
        </div>
      </div>
    </div>
  );
}
