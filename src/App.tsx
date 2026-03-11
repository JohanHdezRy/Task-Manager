import { useState } from 'react';
import type { Task } from './types';
import { useTaskStore } from './store/taskStore';
import { useFilterStore } from './store/filterStore';
import { useFilteredTasks } from './hooks/useFilteredTasks';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { TaskList } from './components/tasks/TaskList';
import { TaskForm } from './components/tasks/TaskForm';
import { FilterChips } from './components/filters/FilterChips';
import { Modal } from './components/ui/Modal';

export default function App() {
  const { addTask, updateTask } = useTaskStore();
  const filters = useFilterStore(s => s.filters);
  const filteredTasks = useFilteredTasks();

  const [showNewTask, setShowNewTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const hasFilters =
    filters.searchQuery !== '' ||
    filters.categoryIds.length > 0 ||
    filters.importanceLevels.length > 0 ||
    filters.statuses.length > 0 ||
    !!filters.dueDateFrom ||
    !!filters.dueDateTo;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-950">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onNewTask={() => setShowNewTask(true)}
          taskCount={filteredTasks.length}
        />

        <main className="flex-1 overflow-y-auto scrollbar-thin px-6 py-5">
          <FilterChips />
          <TaskList
            tasks={filteredTasks}
            onEdit={setEditingTask}
            hasFilters={hasFilters}
          />
        </main>
      </div>

      {showNewTask && (
        <Modal title="Nueva tarea" onClose={() => setShowNewTask(false)} size="lg">
          <TaskForm
            onSubmit={values => { addTask(values); setShowNewTask(false); }}
            onCancel={() => setShowNewTask(false)}
          />
        </Modal>
      )}

      {editingTask && (
        <Modal title="Editar tarea" onClose={() => setEditingTask(null)} size="lg">
          <TaskForm
            initialValues={{
              title: editingTask.title,
              description: editingTask.description,
              dueDate: editingTask.dueDate,
              importance: editingTask.importance,
              categoryId: editingTask.categoryId,
              status: editingTask.status,
            }}
            onSubmit={values => { updateTask(editingTask.id, values); setEditingTask(null); }}
            onCancel={() => setEditingTask(null)}
          />
        </Modal>
      )}
    </div>
  );
}
