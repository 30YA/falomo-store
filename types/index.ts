export type ProductCategory =
  | "duvet-cover"
  | "sheet"
  | "pillow"
  | "mattress"
  | "blanket"
  | "pillowcase";

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
}

export interface ProductSpec {
  label: string;
  value: string;
  group?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  likes: number;
  isBuyer: boolean;
  pros?: string[];
  cons?: string[];
}

export interface ProductQuestion {
  id: string;
  author: string;
  question: string;
  answer?: string;
  date: string;
}

export interface ProductSeller {
  name: string;
  rating: number;
  performanceLabel: string;
  shippingLabel: string;
  warranty: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: ProductCategory;
  brand: string;
  images: string[];
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  colors: ProductColor[];
  sizes: string[];
  tags: string[];
  inStock: boolean;
  isAmazingOffer?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  features: string[];
}

/** Enriched PDP payload — derived from mock catalog for now. */
export interface ProductDetail extends Product {
  longDescription: string[];
  specs: ProductSpec[];
  reviews: ProductReview[];
  questions: ProductQuestion[];
  seller: ProductSeller;
  ratingBreakdown: Record<1 | 2 | 3 | 4 | 5, number>;
}

export interface Category {
  id: string;
  slug: ProductCategory;
  name: string;
  image: string;
  productCount: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
  tone: "warm" | "cool" | "soft";
}

export interface CartItem {
  productId: string;
  quantity: number;
  colorId?: string;
  size?: string;
}

export type SortOption =
  | "relevant"
  | "cheapest"
  | "expensive"
  | "best-selling"
  | "newest";
