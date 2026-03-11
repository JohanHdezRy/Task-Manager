import type { ImportanceLevel, TaskStatus } from '../../types';
import { useFilterStore } from '../../store/filterStore';
import { useCategoryStore } from '../../store/categoryStore';
import { IMPORTANCE_CONFIG, STATUS_CONFIG } from '../../utils/constants';

export function FilterPanel() {
  const { filters, setFilter, clearAll } = useFilterStore();
  const categories = useCategoryStore(s => s.categories);

  const hasFilters =
    filters.categoryIds.length > 0 ||
    filters.importanceLevels.length > 0 ||
    filters.statuses.length > 0 ||
    filters.dueDateFrom ||
    filters.dueDateTo;

  function toggleArray<T>(arr: T[], item: T): T[] {
    return arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];
  }

  return (
    <div className="space-y-5">
      {/* Status */}
      <div>
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Estado</h4>
        <div className="space-y-1">
          {(['todo', 'in-progress', 'done'] as TaskStatus[]).map(s => {
            const cfg = STATUS_CONFIG[s];
            const active = filters.statuses.includes(s);
            return (
              <label key={s} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => setFilter('statuses', toggleArray(filters.statuses, s))}
                  className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-indigo-500 focus:ring-indigo-500"
                />
                <span className={`text-sm transition-colors ${active ? cfg.color : 'text-gray-400 group-hover:text-gray-300'}`}>
                  {cfg.icon} {cfg.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Importance */}
      <div>
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Importancia</h4>
        <div className="space-y-1">
          {(['low', 'medium', 'high', 'critical'] as ImportanceLevel[]).map(level => {
            const cfg = IMPORTANCE_CONFIG[level];
            const active = filters.importanceLevels.includes(level);
            return (
              <label key={level} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => setFilter('importanceLevels', toggleArray(filters.importanceLevels, level))}
                  className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-indigo-500 focus:ring-indigo-500"
                />
                <span className={`text-sm transition-colors ${active ? cfg.color : 'text-gray-400 group-hover:text-gray-300'}`}>
                  {cfg.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Categorías</h4>
          <div className="space-y-1">
            {categories.map(cat => {
              const active = filters.categoryIds.includes(cat.id);
              return (
                <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => setFilter('categoryIds', toggleArray(filters.categoryIds, cat.id))}
                    className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className={`text-sm transition-colors ${active ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>
                    {cat.name}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Date range */}
      <div>
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Fecha límite</h4>
        <div className="space-y-2">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Desde</label>
            <input
              type="date"
              value={filters.dueDateFrom ?? ''}
              onChange={e => setFilter('dueDateFrom', e.target.value || null)}
              className="w-full px-2 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Hasta</label>
            <input
              type="date"
              value={filters.dueDateTo ?? ''}
              onChange={e => setFilter('dueDateTo', e.target.value || null)}
              className="w-full px-2 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 [color-scheme:dark]"
            />
          </div>
        </div>
      </div>

      {hasFilters && (
        <button
          onClick={clearAll}
          className="w-full py-1.5 text-xs font-medium text-gray-400 border border-gray-700 rounded-lg hover:border-gray-600 hover:text-gray-300 transition-colors"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
