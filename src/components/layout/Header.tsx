import { useFilterStore } from '../../store/filterStore';
import { SortSelect } from '../filters/SortSelect';

interface HeaderProps {
  onNewTask: () => void;
  taskCount: number;
}

export function Header({ onNewTask, taskCount }: HeaderProps) {
  const { filters, setFilter } = useFilterStore();

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center gap-4">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">🔍</span>
        <input
          type="text"
          value={filters.searchQuery}
          onChange={e => setFilter('searchQuery', e.target.value)}
          placeholder="Buscar tareas..."
          className="w-full pl-9 pr-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        {filters.searchQuery && (
          <button
            onClick={() => setFilter('searchQuery', '')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* Task count */}
      <span className="text-sm text-gray-500">
        {taskCount} {taskCount === 1 ? 'tarea' : 'tareas'}
      </span>

      {/* Sort */}
      <SortSelect />

      {/* New task */}
      <button
        onClick={onNewTask}
        className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
      >
        + Nueva tarea
      </button>
    </header>
  );
}
