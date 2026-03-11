import type { Task } from '../../types';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  hasFilters: boolean;
}

export function TaskList({ tasks, onEdit, hasFilters }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-5xl mb-4">{hasFilters ? '🔍' : '📋'}</div>
        <h3 className="text-lg font-medium text-gray-300 mb-2">
          {hasFilters ? 'Sin resultados' : 'No hay tareas aún'}
        </h3>
        <p className="text-sm text-gray-500">
          {hasFilters
            ? 'Intenta ajustar los filtros para encontrar lo que buscas.'
            : 'Crea tu primera tarea con el botón "Nueva tarea".'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} />
      ))}
    </div>
  );
}
