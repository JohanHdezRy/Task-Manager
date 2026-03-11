import { create } from 'zustand';
import type { FilterState, SortState } from '../types';

const defaultFilters: FilterState = {
  categoryIds: [],
  importanceLevels: [],
  statuses: [],
  dueDateFrom: null,
  dueDateTo: null,
  searchQuery: '',
};

interface FilterStore {
  filters: FilterState;
  sort: SortState;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  clearFilter: (key: keyof FilterState) => void;
  clearAll: () => void;
  setSort: (sort: Partial<SortState>) => void;
  toggleCategoryFilter: (id: string) => void;
}

export const useFilterStore = create<FilterStore>()((set) => ({
  filters: defaultFilters,
  sort: { field: 'createdAt', direction: 'desc' },

  setFilter: (key, value) => set((state) => ({
    filters: { ...state.filters, [key]: value },
  })),

  clearFilter: (key) => set((state) => ({
    filters: { ...state.filters, [key]: defaultFilters[key] },
  })),

  clearAll: () => set({ filters: defaultFilters }),

  setSort: (sort) => set((state) => ({
    sort: { ...state.sort, ...sort },
  })),

  toggleCategoryFilter: (id) => set((state) => {
    const current = state.filters.categoryIds;
    const next = current.includes(id) ? current.filter(x => x !== id) : [...current, id];
    return { filters: { ...state.filters, categoryIds: next } };
  }),
}));
