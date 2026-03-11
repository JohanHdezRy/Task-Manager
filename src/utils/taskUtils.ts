import type { Task, FilterState, SortState } from '../types';
import { IMPORTANCE_ORDER } from './constants';

export function filterTasks(tasks: Task[], filters: FilterState): Task[] {
  return tasks.filter(task => {
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      if (!task.title.toLowerCase().includes(q) && !task.description.toLowerCase().includes(q)) return false;
    }
    if (filters.categoryIds.length > 0) {
      if (!task.categoryId || !filters.categoryIds.includes(task.categoryId)) return false;
    }
    if (filters.importanceLevels.length > 0) {
      if (!filters.importanceLevels.includes(task.importance)) return false;
    }
    if (filters.statuses.length > 0) {
      if (!filters.statuses.includes(task.status)) return false;
    }
    if (filters.dueDateFrom && task.dueDate && task.dueDate < filters.dueDateFrom) return false;
    if (filters.dueDateTo && task.dueDate && task.dueDate > filters.dueDateTo) return false;
    return true;
  });
}

export function sortTasks(tasks: Task[], sort: SortState): Task[] {
  const arr = [...tasks];
  arr.sort((a, b) => {
    let cmp = 0;
    switch (sort.field) {
      case 'title':
        cmp = a.title.localeCompare(b.title);
        break;
      case 'createdAt':
        cmp = a.createdAt.localeCompare(b.createdAt);
        break;
      case 'dueDate': {
        const da = a.dueDate ?? '9999-99-99';
        const db = b.dueDate ?? '9999-99-99';
        cmp = da.localeCompare(db);
        break;
      }
      case 'importance':
        cmp = IMPORTANCE_ORDER[a.importance] - IMPORTANCE_ORDER[b.importance];
        break;
    }
    return sort.direction === 'asc' ? cmp : -cmp;
  });
  return arr;
}

export function countByStatus(tasks: Task[]) {
  return {
    todo: tasks.filter(t => t.status === 'todo').length,
    'in-progress': tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  };
}
