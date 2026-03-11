export type ImportanceLevel = 'low' | 'medium' | 'high' | 'critical';
export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type SortField = 'dueDate' | 'createdAt' | 'importance' | 'title';
export type SortDirection = 'asc' | 'desc';

export interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;
  importance: ImportanceLevel;
  categoryId: string | null;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface FilterState {
  categoryIds: string[];
  importanceLevels: ImportanceLevel[];
  statuses: TaskStatus[];
  dueDateFrom: string | null;
  dueDateTo: string | null;
  searchQuery: string;
}

export interface SortState {
  field: SortField;
  direction: SortDirection;
}

export type TaskFormValues = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
export type CategoryFormValues = Omit<Category, 'id' | 'createdAt'>;
