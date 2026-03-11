import type { SortField } from '../../types';
import { useFilterStore } from '../../store/filterStore';

const SORT_OPTIONS: { value: SortField; label: string }[] = [
  { value: 'createdAt',  label: 'Fecha de creación' },
  { value: 'dueDate',    label: 'Fecha límite' },
  { value: 'importance', label: 'Importancia' },
  { value: 'title',      label: 'Título' },
];

export function SortSelect() {
  const { sort, setSort } = useFilterStore();

  return (
    <div className="flex items-center gap-2">
      <select
        value={sort.field}
        onChange={e => setSort({ field: e.target.value as SortField })}
        className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-indigo-500 transition-colors"
      >
        {SORT_OPTIONS.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <button
        onClick={() => setSort({ direction: sort.direction === 'asc' ? 'desc' : 'asc' })}
        className="px-2.5 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-gray-600 transition-colors"
        title={sort.direction === 'asc' ? 'Ascendente' : 'Descendente'}
      >
        {sort.direction === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
}
