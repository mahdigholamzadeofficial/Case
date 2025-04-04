import { create } from "zustand";

interface IFilters {
  searchText: string;
  categories: Set<string>;
  page: number;
}
interface IFilterState extends IFilters {
  setPage: (page: number) => void;
  setSearchText: (text: string) => void;
  setCategories: (category: Set<string>) => void;
  setFilters: (newFilters: Partial<IFilters>) => void;
}

export const useFilterStore = create<IFilterState>((set) => ({
  searchText: "",
  categories: new Set([]),
  page: 1,
  setPage: (page) => set((state) => ({ ...state, page })),
  setSearchText: (text) => set((state) => ({ ...state, searchText: text })),
  setCategories: (categories) =>
    set((state) => ({ ...state, categories: categories })),
  setFilters: (newFilters) => {
    set((state) => ({ ...state, ...newFilters }));
  },
}));
