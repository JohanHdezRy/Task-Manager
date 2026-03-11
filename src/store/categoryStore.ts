import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Category, CategoryFormValues } from '../types';
import { DEFAULT_CATEGORIES } from '../utils/constants';
import { useTaskStore } from './taskStore';

interface CategoryStore {
  categories: Category[];
  addCategory: (values: CategoryFormValues) => void;
  updateCategory: (id: string, values: Partial<CategoryFormValues>) => void;
  deleteCategory: (id: string) => void;
}

const initialCategories: Category[] = DEFAULT_CATEGORIES.map(c => ({
  ...c,
  createdAt: new Date().toISOString(),
}));

export const useCategoryStore = create<CategoryStore>()(
  persist(
    (set) => ({
      categories: initialCategories,

      addCategory: (values) => set((state) => ({
        categories: [...state.categories, {
          ...values,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        }],
      })),

      updateCategory: (id, values) => set((state) => ({
        categories: state.categories.map(c =>
          c.id === id ? { ...c, ...values } : c
        ),
      })),

      deleteCategory: (id) => {
        useTaskStore.getState().nullifyCategoryTasks(id);
        set((state) => ({
          categories: state.categories.filter(c => c.id !== id),
        }));
      },
    }),
    { name: 'tm-categories-v1' }
  )
);
