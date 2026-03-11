import { useState } from 'react';
import type { TaskFormValues, ImportanceLevel, TaskStatus } from '../../types';
import { useCategoryStore } from '../../store/categoryStore';
import { IMPORTANCE_CONFIG, STATUS_CONFIG } from '../../utils/constants';
import { todayISO } from '../../utils/dateUtils';

interface TaskFormProps {
  initialValues?: Partial<TaskFormValues>;
  onSubmit: (values: TaskFormValues) => void;
  onCancel: () => void;
}

const defaultValues: TaskFormValues = {
  title: '',
  description: '',
  dueDate: null,
  importance: 'medium',
  categoryId: null,
  status: 'todo',
};

export function TaskForm({ initialValues, onSubmit, onCancel }: TaskFormProps) {
  const categories = useCategoryStore(s => s.categories);
  const [form, setForm] = useState<TaskFormValues>({ ...defaultValues, ...initialValues });
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) { setError('El título es obligatorio.'); return; }
    onSubmit({ ...form, title: form.title.trim(), description: form.description.trim() });
  }

  function set<K extends keyof TaskFormValues>(key: K, value: TaskFormValues[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
    setError('');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Título *</label>
        <input
          type="text"
          value={form.title}
          onChange={e => set('title', e.target.value)}
          placeholder="¿Qué hay que hacer?"
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Descripción</label>
        <textarea
          value={form.description}
          onChange={e => set('description', e.target.value)}
          rows={3}
          placeholder="Detalles adicionales..."
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Fecha límite</label>
          <input
            type="date"
            value={form.dueDate ?? ''}
            min={todayISO()}
            onChange={e => set('dueDate', e.target.value || null)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors [color-scheme:dark]"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Categoría</label>
          <select
            value={form.categoryId ?? ''}
            onChange={e => set('categoryId', e.target.value || null)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
          >
            <option value="">Sin categoría</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Importance */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Importancia</label>
        <div className="flex gap-2 flex-wrap">
          {(['low', 'medium', 'high', 'critical'] as ImportanceLevel[]).map(level => {
            const cfg = IMPORTANCE_CONFIG[level];
            const active = form.importance === level;
            return (
              <button
                key={level}
                type="button"
                onClick={() => set('importance', level)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                  active
                    ? `${cfg.color} ${cfg.bg} ${cfg.border}`
                    : 'text-gray-500 bg-transparent border-gray-700 hover:border-gray-600'
                }`}
              >
                {cfg.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Estado</label>
        <div className="flex gap-2">
          {(['todo', 'in-progress', 'done'] as TaskStatus[]).map(s => {
            const cfg = STATUS_CONFIG[s];
            const active = form.status === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => set('status', s)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  active ? `${cfg.color} ${cfg.bg}` : 'text-gray-500 bg-transparent hover:bg-gray-800'
                }`}
              >
                {cfg.icon} {cfg.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
        >
          {initialValues ? 'Guardar cambios' : 'Crear tarea'}
        </button>
      </div>
    </form>
  );
}
