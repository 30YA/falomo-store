import { catalogRepository } from "@/lib/catalog";
import type { Category, Product } from "@/types";

export interface SearchSuggestions {
  query: string;
  products: Product[];
  categories: Category[];
  brands: string[];
  totalProducts: number;
}

const POPULAR_QUERIES = [
  "روتختی دونفره",
  "ملحفه کتان",
  "بالش مموری فوم",
  "تشک ارتوپدیک",
  "پتو",
];

export function getPopularQueries(): string[] {
  return POPULAR_QUERIES;
}

export function getSearchSuggestions(
  rawQuery: string,
  options: { productLimit?: number } = {},
): SearchSuggestions {
  const productLimit = options.productLimit ?? 6;
  const query = rawQuery.trim().toLowerCase();

  if (!query) {
    return {
      query: "",
      products: catalogRepository.getBestSellers().slice(0, 4),
      categories: catalogRepository.getCategories().slice(0, 4),
      brands: [],
      totalProducts: catalogRepository.getAllProducts().length,
    };
  }

  const all = catalogRepository.getAllProducts();

  const scored = all
    .map((product) => {
      const title = product.title.toLowerCase();
      const short = product.shortTitle.toLowerCase();
      const brand = product.brand.toLowerCase();
      let score = 0;

      if (title.startsWith(query) || short.startsWith(query)) score += 40;
      if (brand.startsWith(query)) score += 35;
      if (title.includes(query)) score += 20;
      if (short.includes(query)) score += 15;
      if (brand.includes(query)) score += 12;
      if (product.tags.some((t) => t.toLowerCase().includes(query))) score += 8;
      if (product.features.some((f) => f.toLowerCase().includes(query))) score += 5;
      if (product.isBestSeller) score += 3;
      if (product.isAmazingOffer) score += 2;

      return { product, score };
    })
    .filter((item) => item.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score || b.product.reviewCount - a.product.reviewCount,
    );

  const brands = [
    ...new Set(
      all
        .map((p) => p.brand)
        .filter((brand) => brand.toLowerCase().includes(query)),
    ),
  ].slice(0, 4);

  const categories = catalogRepository
    .getCategories()
    .filter(
      (cat) =>
        cat.name.includes(rawQuery.trim()) ||
        cat.slug.includes(query) ||
        scored.some((s) => s.product.category === cat.slug),
    )
    .slice(0, 4);

  return {
    query: rawQuery.trim(),
    products: scored.slice(0, productLimit).map((s) => s.product),
    categories,
    brands,
    totalProducts: scored.length,
  };
}

const RECENT_KEY = "falomo-recent-searches";
const RECENT_LIMIT = 6;

export function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

export function saveRecentSearch(query: string) {
  if (typeof window === "undefined") return;
  const q = query.trim();
  if (!q) return;
  const next = [q, ...getRecentSearches().filter((item) => item !== q)].slice(
    0,
    RECENT_LIMIT,
  );
  window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}

export function clearRecentSearches() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(RECENT_KEY);
}
