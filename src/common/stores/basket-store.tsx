import { create } from "zustand";
import { IProduct } from "../../features/Product/services/types/get-product-list-response.type";
import { LocalStorage } from "../utils/LocalStorage";

type BasketProduct = IProduct & { quantity: number };

interface BasketState {
  items: BasketProduct[];
  addToBasket: (product: IProduct) => void;
  removeFromBasket: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearBasket: () => void;
}
const STORAGE_KEY = "basket";

export const useBasketStore = create<BasketState>((set, get) => ({
  items: LocalStorage.get<BasketProduct[]>(STORAGE_KEY) || [],

  addToBasket: (product) => {
    const updatedItems = [...get().items, { ...product, quantity: 1 }];
    LocalStorage.set(STORAGE_KEY, updatedItems);
    set({ items: updatedItems });
  },

  removeFromBasket: (productId) => {
    const updatedItems = get().items.filter((item) => item.id !== productId);
    LocalStorage.set(STORAGE_KEY, updatedItems);
    set({ items: updatedItems });
  },

  increaseQuantity: (productId) => {
    const updatedItems = get().items.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    LocalStorage.set(STORAGE_KEY, updatedItems);
    set({ items: updatedItems });
  },

  decreaseQuantity: (productId) => {
    let updatedItems = get().items.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    );

    updatedItems = updatedItems.filter((item) => item.quantity > 0);

    LocalStorage.set(STORAGE_KEY, updatedItems);
    set({ items: updatedItems });
  },

  clearBasket: () => {
    LocalStorage.remove(STORAGE_KEY);
    set({ items: [] });
  },
}));
