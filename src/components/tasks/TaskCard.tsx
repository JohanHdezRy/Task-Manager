import { useState } from 'react';
import type { Task, TaskStatus } from '../../types';
import { useTaskStore } from '../../store/taskStore';
import { useCategoryStore } from '../../store/categoryStore';
import { ImportanceBadge, StatusBadge } from '../ui/Badge';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { formatDate, isOverdue, isDueToday } from '../../utils/dateUtils';
import { STATUS_CONFIG } from '../../utils/constants';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const STATUS_CYCLE: Record<TaskStatus, TaskStatus> = {
  'todo': 'in-progress',
  'in-progress': 'done',
  'done': 'todo',
};

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const { setStatus, deleteTask } = useTaskStore();
  const categories = useCategoryStore(s => s.categories);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const category = categories.find(c => c.id === task.categoryId);
  const overdue = isOverdue(task.dueDate) && task.status !== 'done';
  const today = isDueToday(task.dueDate) && task.status !== 'done';

  return (
    <>
      <div className={`group bg-gray-900 border rounded-xl p-4 transition-all hover:border-gray-700 ${
        task.status === 'done' ? 'border-gray-800 opacity-60' : 'border-gray-800'
      }`}>
        {/* Top row */}
        <div className="flex items-start gap-3">
          {/* Status toggle button */}
          <button
            onClick={() => setStatus(task.id, STATUS_CYCLE[task.status])}
            className={`mt-0.5 w-5 h-5 flex-shrink-0 rounded-full border-2 transition-all hover:scale-110 ${
              task.status === 'done'
                ? 'bg-green-500 border-green-500'
                : task.status === 'in-progress'
                ? 'border-blue-400 bg-blue-400/20'
                : 'border-gray-600 hover:border-gray-400'
            }`}
            title={`Cambiar a: ${STATUS_CONFIG[STATUS_CYCLE[task.status]].label}`}
          >
            {task.status === 'done' && <span className="flex items-center justify-center text-white text-xs">✓</span>}
            {task.status === 'in-progress' && <span className="flex items-center justify-center text-blue-400 text-xs">◑</span>}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className={`text-sm font-medium leading-snug ${task.status === 'done' ? 'line-through text-gray-500' : 'text-white'}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="mt-1 text-xs text-gray-500 line-clamp-2">{task.description}</p>
            )}
          </div>

          {/* Actions (visible on hover) */}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(task)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-gray-800 transition-colors text-sm"
              title="Editar"
            >
              ✎
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors text-sm"
              title="Eliminar"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Bottom row: meta info */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <ImportanceBadge level={task.importance} />
          <StatusBadge status={task.status} />

          {category && (
            <span
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-300"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }} />
              {category.name}
            </span>
          )}

          {task.dueDate && (
            <span className={`inline-flex items-center gap-1 text-xs font-medium ${
              overdue ? 'text-red-400' : today ? 'text-orange-400' : 'text-gray-500'
            }`}>
              {overdue ? '⚠' : '📅'} {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>

      {confirmDelete && (
        <ConfirmDialog
          message={`¿Eliminar la tarea "${task.title}"? Esta acción no se puede deshacer.`}
          confirmLabel="Eliminar"
          danger
          onConfirm={() => { deleteTask(task.id); setConfirmDelete(false); }}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </>
  );
}
