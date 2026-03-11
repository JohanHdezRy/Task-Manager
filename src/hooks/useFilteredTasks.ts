import { useMemo } from 'react';
import { useTaskStore } from '../store/taskStore';
import { useFilterStore } from '../store/filterStore';
import { filterTasks, sortTasks } from '../utils/taskUtils';

export function useFilteredTasks() {
  const tasks = useTaskStore(s => s.tasks);
  const { filters, sort } = useFilterStore();

  return useMemo(
    () => sortTasks(filterTasks(tasks, filters), sort),
    [tasks, filters, sort]
  );
}
