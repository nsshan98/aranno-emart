import { Products } from "@/zod/product-schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  stock: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (product: Products) => void;
  removeItem: (productId: string) => void;
  increaseQty: (productId: string) => void;
  decreaseQty: (productId: string) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Products) => {
        const items = get().items;
        const exist = items.find((item) => item.id === product.id);

        if (exist) {
          if (exist.quantity + 1 > product.stock_quantity) {
            return;
          }
          return set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        }

        const price = product.discounted_sell_price ?? product.sell_price ?? 0;

        set({
          items: [
            ...items,
            {
              id: product.id,
              name: product.name,
              quantity: 1,
              price: price,
              stock: product.stock_quantity,
            },
          ],
        });
      },

      removeItem: (productId: string) =>
        set({
          items: get().items.filter((item) => item.id !== productId),
        }),

      increaseQty: (productId: string) =>
        set({
          items: get().items.map((item) =>
            item.id === productId && item.quantity < item.stock
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }),

      decreaseQty: (productId: string) =>
        set({
          items: get()
            .items.map((item) =>
              item.id === productId
                ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
                : item
            )
            .filter((item) => item.quantity > 0),
        }),
    }),
    { name: "cart" }
  )
);
