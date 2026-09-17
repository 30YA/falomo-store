import { HeroSlider } from "@/components/home/hero-slider";
import { CategoryGrid } from "@/components/home/category-grid";
import { AmazingOffers } from "@/components/home/amazing-offers";
import { ProductSection } from "@/components/home/product-section";
import { TrustBar } from "@/components/home/trust-bar";
import { catalogRepository } from "@/lib/catalog";

export default function HomePage() {
  const banners = catalogRepository.getBanners();
  const categories = catalogRepository.getCategories();
  const amazing = catalogRepository.getAmazingOffers();
  const bestSellers = catalogRepository.getBestSellers();
  const newArrivals = catalogRepository.getNewArrivals();

  return (
    <>
      <HeroSlider banners={banners} />
      <CategoryGrid categories={categories} />
      <AmazingOffers products={amazing} />
      <ProductSection
        title="پرفروش‌ترین‌ها"
        products={bestSellers}
        href="/products?sort=best-selling"
      />
      <ProductSection
        title="تازه‌های کالای خواب"
        products={newArrivals}
        href="/products?sort=newest"
      />
      <TrustBar />
    </>
  );
}
