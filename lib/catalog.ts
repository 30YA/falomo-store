import { banners, categories, products } from "@/data/products";
import {
  applyPlpFilters,
  buildFacets,
  type FilterFacets,
  type PlpFilters,
} from "@/lib/plp/filters";
import { enrichProduct } from "@/lib/pdp/enrich";
import type {
  Banner,
  Category,
  Product,
  ProductCategory,
  ProductDetail,
  SortOption,
} from "@/types";

export interface ProductFilters {
  category?: ProductCategory | "all";
  tag?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sort?: SortOption;
}

/**
 * Catalog repository — mock today, swap for API later without touching UI.
 */
export const catalogRepository = {
  getAllProducts(): Product[] {
    return products;
  },

  getProductBySlug(slug: string): Product | undefined {
    return products.find((p) => p.slug === slug);
  },

  getProductById(id: string): Product | undefined {
    return products.find((p) => p.id === id);
  },

  getCategories(): Category[] {
    return categories;
  },

  getCategoryBySlug(slug: string): Category | undefined {
    return categories.find((c) => c.slug === slug);
  },

  getBanners(): Banner[] {
    return banners;
  },

  getAmazingOffers(): Product[] {
    return products.filter((p) => p.isAmazingOffer);
  },

  getBestSellers(): Product[] {
    return products.filter((p) => p.isBestSeller);
  },

  getNewArrivals(): Product[] {
    return products.filter((p) => p.isNew);
  },

  getRelatedProducts(product: Product, limit = 4): Product[] {
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, limit);
  },

  getProductDetail(slug: string): ProductDetail | undefined {
    const product = products.find((p) => p.slug === slug);
    if (!product) return undefined;
    return enrichProduct(product);
  },

  getFacets(): FilterFacets {
    const names = Object.fromEntries(categories.map((c) => [c.slug, c.name]));
    return buildFacets(products, names);
  },

  searchByPlpFilters(filters: PlpFilters): Product[] {
    return applyPlpFilters(products, filters);
  },

  searchProducts(filters: ProductFilters = {}): Product[] {
    return applyPlpFilters(products, {
      category: filters.category,
      search: filters.search,
      brands: [],
      colors: [],
      sizes: [],
      features: [],
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      inStockOnly: filters.inStockOnly,
      onlyAmazing: filters.tag === "amazing",
      sort: filters.sort ?? "relevant",
    });
  },
};
