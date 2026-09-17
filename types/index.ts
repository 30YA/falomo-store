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
