import { banners, categories, products } from "@/data/products";
import type {
  Banner,
  Category,
  Product,
  ProductCategory,
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

  searchProducts(filters: ProductFilters = {}): Product[] {
    let result = [...products];

    if (filters.category && filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.tag) {
      result = result.filter((p) => p.tags.includes(filters.tag!));
    }

    if (filters.search?.trim()) {
      const q = filters.search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.shortTitle.toLowerCase().includes(q),
      );
    }

    if (filters.minPrice != null) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice != null) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }

    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    switch (filters.sort) {
      case "cheapest":
        result.sort((a, b) => a.price - b.price);
        break;
      case "expensive":
        result.sort((a, b) => b.price - a.price);
        break;
      case "best-selling":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "newest":
        result.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      default:
        break;
    }

    return result;
  },
};
