import { useState } from 'react';
import type { Category } from '../../types';
import { useCategoryStore } from '../../store/categoryStore';
import { useFilterStore } from '../../store/filterStore';
import { useTaskStore } from '../../store/taskStore';
import { FilterPanel } from '../filters/FilterPanel';
import { CategoryForm } from '../categories/CategoryForm';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Modal } from '../ui/Modal';
import { countByStatus } from '../../utils/taskUtils';

export function Sidebar() {
  const categories = useCategoryStore(s => s.categories);
  const { addCategory, updateCategory, deleteCategory } = useCategoryStore();
  const { filters, toggleCategoryFilter } = useFilterStore();
  const tasks = useTaskStore(s => s.tasks);
  const counts = countByStatus(tasks);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const deletingCat = categories.find(c => c.id === deletingId);

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col h-screen overflow-hidden">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-gray-800">
        <h1 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="text-indigo-400">◈</span> TaskManager
        </h1>
      </div>

      {/* Stats */}
      <div className="px-4 py-3 border-b border-gray-800 grid grid-cols-3 gap-2">
        {[
          { label: 'Pendientes', count: counts.todo, color: 'text-gray-400' },
          { label: 'En curso', count: counts['in-progress'], color: 'text-blue-400' },
          { label: 'Hechas', count: counts.done, color: 'text-green-400' },
        ].map(s => (
          <div key={s.label} className="text-center">
            <div className={`text-xl font-bold ${s.color}`}>{s.count}</div>
            <div className="text-[10px] text-gray-500 leading-tight">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-4 space-y-6">
        {/* Categories */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Categorías</h3>
            <button
              onClick={() => setShowAddForm(true)}
              className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-indigo-400 transition-colors rounded"
              title="Nueva categoría"
            >
              +
            </button>
          </div>

          <div className="space-y-0.5">
            <button
              onClick={() => useFilterStore.getState().setFilter('categoryIds', [])}
              className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-colors ${
                filters.categoryIds.length === 0 ? 'bg-indigo-500/10 text-indigo-300' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-300'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />
              Todas
              <span className="ml-auto text-xs text-gray-600">{tasks.length}</span>
            </button>

            {categories.map(cat => {
              const active = filters.categoryIds.includes(cat.id);
              const count = tasks.filter(t => t.categoryId === cat.id).length;
              return (
                <div key={cat.id} className="group flex items-center gap-1">
                  <button
                    onClick={() => toggleCategoryFilter(cat.id)}
                    className={`flex-1 flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-colors ${
                      active ? 'bg-indigo-500/10 text-indigo-300' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-300'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                    <span className="truncate">{cat.name}</span>
                    <span className="ml-auto text-xs text-gray-600">{count}</span>
                  </button>
                  <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditingCategory(cat)}
                      className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-gray-300 text-xs"
                      title="Editar"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => setDeletingId(cat.id)}
                      className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-red-400 text-xs"
                      title="Eliminar"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Filtros</h3>
          <FilterPanel />
        </div>
      </div>

      {/* Modals */}
      {showAddForm && (
        <Modal title="Nueva categoría" onClose={() => setShowAddForm(false)} size="sm">
          <CategoryForm
            onSubmit={values => { addCategory(values); setShowAddForm(false); }}
            onCancel={() => setShowAddForm(false)}
          />
        </Modal>
      )}

      {editingCategory && (
        <Modal title="Editar categoría" onClose={() => setEditingCategory(null)} size="sm">
          <CategoryForm
            initialValues={editingCategory}
            onSubmit={values => { updateCategory(editingCategory.id, values); setEditingCategory(null); }}
            onCancel={() => setEditingCategory(null)}
          />
        </Modal>
      )}

      {deletingId && deletingCat && (
        <ConfirmDialog
          message={`¿Eliminar la categoría "${deletingCat.name}"? Las tareas asociadas quedarán sin categoría.`}
          confirmLabel="Eliminar"
          danger
          onConfirm={() => { deleteCategory(deletingId); setDeletingId(null); }}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </aside>
  );
}
