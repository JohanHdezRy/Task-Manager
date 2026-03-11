import { useFilterStore } from '../../store/filterStore';
import { useCategoryStore } from '../../store/categoryStore';
import { IMPORTANCE_CONFIG, STATUS_CONFIG } from '../../utils/constants';
import { formatDate } from '../../utils/dateUtils';

export function FilterChips() {
  const { filters, setFilter, clearAll } = useFilterStore();
  const categories = useCategoryStore(s => s.categories);

  const chips: { label: string; onRemove: () => void }[] = [];

  filters.statuses.forEach(s => chips.push({
    label: STATUS_CONFIG[s].label,
    onRemove: () => setFilter('statuses', filters.statuses.filter(x => x !== s)),
  }));

  filters.importanceLevels.forEach(level => chips.push({
    label: `Importancia: ${IMPORTANCE_CONFIG[level].label}`,
    onRemove: () => setFilter('importanceLevels', filters.importanceLevels.filter(x => x !== level)),
  }));

  filters.categoryIds.forEach(id => {
    const cat = categories.find(c => c.id === id);
    if (cat) chips.push({
      label: cat.name,
      onRemove: () => setFilter('categoryIds', filters.categoryIds.filter(x => x !== id)),
    });
  });

  if (filters.dueDateFrom) chips.push({
    label: `Desde: ${formatDate(filters.dueDateFrom)}`,
    onRemove: () => setFilter('dueDateFrom', null),
  });

  if (filters.dueDateTo) chips.push({
    label: `Hasta: ${formatDate(filters.dueDateTo)}`,
    onRemove: () => setFilter('dueDateTo', null),
  });

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-xs text-gray-500">Filtros:</span>
      {chips.map((chip, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs rounded-full"
        >
          {chip.label}
          <button
            onClick={chip.onRemove}
            className="hover:text-white transition-colors leading-none"
          >
            ✕
          </button>
        </span>
      ))}
      <button
        onClick={clearAll}
        className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
      >
        Limpiar todo
      </button>
    </div>
  );
}
