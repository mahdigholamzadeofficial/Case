import { create } from "zustand";
import { IProduct } from "../../features/Product/services/types/get-product-list-response.type";

interface IProductsState {
  products: IProduct[];
  filteredProducts: IProduct[];
  addProducts: (productList: IProduct[]) => void;
  setProducts: (productList: IProduct[]) => void;
}

export const useProductsStore = create<IProductsState>((set) => ({
  products: [],
  filteredProducts: [],
  addProducts: (productList) =>
    set((state) => ({ products: [...state.products, ...productList] })),

  setProducts: (productList) => set(() => ({ products: [...productList] })),
}));
