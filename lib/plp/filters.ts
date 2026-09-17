import type { Product, ProductCategory, SortOption } from "@/types";

export interface PlpFilters {
  category?: ProductCategory | "all";
  search?: string;
  brands: string[];
  colors: string[];
  sizes: string[];
  features: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStockOnly?: boolean;
  onlyDiscount?: boolean;
  onlyAmazing?: boolean;
  onlyNew?: boolean;
  onlyBestSeller?: boolean;
  sort: SortOption;
}

export interface FilterFacets {
  brands: { value: string; count: number }[];
  colors: { id: string; name: string; hex: string; count: number }[];
  sizes: { value: string; count: number }[];
  features: { value: string; count: number }[];
  categories: { slug: ProductCategory; name: string; count: number }[];
  priceRange: { min: number; max: number };
}

export const DEFAULT_PLP_FILTERS: PlpFilters = {
  brands: [],
  colors: [],
  sizes: [],
  features: [],
  sort: "relevant",
};

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevant", label: "پربازدیدترین" },
  { value: "newest", label: "جدیدترین" },
  { value: "best-selling", label: "پرفروش‌ترین" },
  { value: "cheapest", label: "ارزان‌ترین" },
  { value: "expensive", label: "گران‌ترین" },
];

function splitCsv(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export function parsePlpSearchParams(
  params: URLSearchParams | Record<string, string | string[] | undefined>,
): PlpFilters {
  const get = (key: string): string | null => {
    if (params instanceof URLSearchParams) return params.get(key);
    const raw = params[key];
    if (Array.isArray(raw)) return raw[0] ?? null;
    return raw ?? null;
  };

  const minPrice = get("minPrice");
  const maxPrice = get("maxPrice");
  const rating = get("rating");
  const category = get("category");
  const sort = (get("sort") as SortOption) || "relevant";

  return {
    category: (category as ProductCategory) || "all",
    search: get("search") ?? undefined,
    brands: splitCsv(get("brand")),
    colors: splitCsv(get("color")),
    sizes: splitCsv(get("size")),
    features: splitCsv(get("feature")),
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    minRating: rating ? Number(rating) : undefined,
    inStockOnly: get("stock") === "1",
    onlyDiscount: get("discount") === "1",
    onlyAmazing: get("tag") === "amazing" || get("amazing") === "1",
    onlyNew: get("new") === "1",
    onlyBestSeller: get("best") === "1",
    sort,
  };
}

export function plpFiltersToSearchParams(filters: PlpFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.category && filters.category !== "all") {
    params.set("category", filters.category);
  }
  if (filters.search?.trim()) params.set("search", filters.search.trim());
  if (filters.brands.length) params.set("brand", filters.brands.join(","));
  if (filters.colors.length) params.set("color", filters.colors.join(","));
  if (filters.sizes.length) params.set("size", filters.sizes.join(","));
  if (filters.features.length) params.set("feature", filters.features.join(","));
  if (filters.minPrice != null) params.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice != null) params.set("maxPrice", String(filters.maxPrice));
  if (filters.minRating != null) params.set("rating", String(filters.minRating));
  if (filters.inStockOnly) params.set("stock", "1");
  if (filters.onlyDiscount) params.set("discount", "1");
  if (filters.onlyAmazing) params.set("amazing", "1");
  if (filters.onlyNew) params.set("new", "1");
  if (filters.onlyBestSeller) params.set("best", "1");
  if (filters.sort && filters.sort !== "relevant") params.set("sort", filters.sort);

  return params;
}

export function countActiveFilters(filters: PlpFilters): number {
  let count = 0;
  if (filters.category && filters.category !== "all") count += 1;
  if (filters.search?.trim()) count += 1;
  count += filters.brands.length;
  count += filters.colors.length;
  count += filters.sizes.length;
  count += filters.features.length;
  if (filters.minPrice != null || filters.maxPrice != null) count += 1;
  if (filters.minRating != null) count += 1;
  if (filters.inStockOnly) count += 1;
  if (filters.onlyDiscount) count += 1;
  if (filters.onlyAmazing) count += 1;
  if (filters.onlyNew) count += 1;
  if (filters.onlyBestSeller) count += 1;
  return count;
}

function bump<T extends string>(map: Map<T, number>, key: T) {
  map.set(key, (map.get(key) ?? 0) + 1);
}

export function buildFacets(
  products: Product[],
  categoryNames: Record<string, string>,
): FilterFacets {
  const brands = new Map<string, number>();
  const sizes = new Map<string, number>();
  const features = new Map<string, number>();
  const categories = new Map<ProductCategory, number>();
  const colors = new Map<string, { id: string; name: string; hex: string; count: number }>();

  let min = Number.POSITIVE_INFINITY;
  let max = 0;

  for (const product of products) {
    bump(brands, product.brand);
    bump(categories, product.category);
    min = Math.min(min, product.price);
    max = Math.max(max, product.price);

    for (const size of product.sizes) bump(sizes, size);
    for (const feature of product.features) bump(features, feature);
    for (const color of product.colors) {
      const prev = colors.get(color.id);
      if (prev) prev.count += 1;
      else colors.set(color.id, { ...color, count: 1 });
    }
  }

  return {
    brands: [...brands.entries()]
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count),
    colors: [...colors.values()].sort((a, b) => b.count - a.count),
    sizes: [...sizes.entries()]
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count),
    features: [...features.entries()]
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count),
    categories: [...categories.entries()]
      .map(([slug, count]) => ({
        slug,
        name: categoryNames[slug] ?? slug,
        count,
      }))
      .sort((a, b) => b.count - a.count),
    priceRange: {
      min: Number.isFinite(min) ? min : 0,
      max,
    },
  };
}

export function applyPlpFilters(
  products: Product[],
  filters: PlpFilters,
): Product[] {
  let result = [...products];

  if (filters.category && filters.category !== "all") {
    result = result.filter((p) => p.category === filters.category);
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

  if (filters.brands.length) {
    result = result.filter((p) => filters.brands.includes(p.brand));
  }

  if (filters.colors.length) {
    result = result.filter((p) =>
      p.colors.some((c) => filters.colors.includes(c.id)),
    );
  }

  if (filters.sizes.length) {
    result = result.filter((p) =>
      p.sizes.some((s) => filters.sizes.includes(s)),
    );
  }

  if (filters.features.length) {
    result = result.filter((p) =>
      filters.features.every((f) => p.features.includes(f)),
    );
  }

  if (filters.minPrice != null) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice != null) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters.minRating != null) {
    result = result.filter((p) => p.rating >= filters.minRating!);
  }

  if (filters.inStockOnly) {
    result = result.filter((p) => p.inStock);
  }

  if (filters.onlyDiscount) {
    result = result.filter(
      (p) => (p.discountPercent ?? 0) > 0 || (p.originalPrice ?? 0) > p.price,
    );
  }

  if (filters.onlyAmazing) {
    result = result.filter((p) => p.isAmazingOffer);
  }

  if (filters.onlyNew) {
    result = result.filter((p) => p.isNew);
  }

  if (filters.onlyBestSeller) {
    result = result.filter((p) => p.isBestSeller);
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
      result.sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.reviewCount - a.reviewCount);
      break;
    default:
      result.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
  }

  return result;
}
