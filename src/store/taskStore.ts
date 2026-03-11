import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, TaskFormValues, TaskStatus } from '../types';

interface TaskStore {
  tasks: Task[];
  addTask: (values: TaskFormValues) => void;
  updateTask: (id: string, values: Partial<TaskFormValues>) => void;
  deleteTask: (id: string) => void;
  setStatus: (id: string, status: TaskStatus) => void;
  nullifyCategoryTasks: (categoryId: string) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],

      addTask: (values) => set((state) => ({
        tasks: [...state.tasks, {
          ...values,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }],
      })),

      updateTask: (id, values) => set((state) => ({
        tasks: state.tasks.map(t =>
          t.id === id ? { ...t, ...values, updatedAt: new Date().toISOString() } : t
        ),
      })),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id),
      })),

      setStatus: (id, status) => set((state) => ({
        tasks: state.tasks.map(t =>
          t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t
        ),
      })),

      nullifyCategoryTasks: (categoryId) => set((state) => ({
        tasks: state.tasks.map(t =>
          t.categoryId === categoryId ? { ...t, categoryId: null, updatedAt: new Date().toISOString() } : t
        ),
      })),
    }),
    { name: 'tm-tasks-v1' }
  )
);
