"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string, colorId?: string, size?: string) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    colorId?: string,
    size?: string,
  ) => void;
  clearCart: () => void;
  getTotalCount: () => number;
}

function sameLine(
  a: CartItem,
  productId: string,
  colorId?: string,
  size?: string,
) {
  return (
    a.productId === productId &&
    a.colorId === colorId &&
    a.size === size
  );
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: ({ productId, colorId, size, quantity = 1 }) => {
        set((state) => {
          const existing = state.items.find((i) =>
            sameLine(i, productId, colorId, size),
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                sameLine(i, productId, colorId, size)
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }
          return {
            items: [...state.items, { productId, colorId, size, quantity }],
          };
        });
      },

      removeItem: (productId, colorId, size) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !sameLine(i, productId, colorId, size),
          ),
        }));
      },

      updateQuantity: (productId, quantity, colorId, size) => {
        if (quantity <= 0) {
          get().removeItem(productId, colorId, size);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            sameLine(i, productId, colorId, size) ? { ...i, quantity } : i,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: "royan-cart" },
  ),
);
