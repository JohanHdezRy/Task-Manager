import type { ImportanceLevel, TaskStatus } from '../types';

export const IMPORTANCE_CONFIG: Record<ImportanceLevel, { label: string; color: string; bg: string; border: string }> = {
  low:      { label: 'Baja',     color: 'text-green-400',  bg: 'bg-green-400/10',  border: 'border-green-400/30' },
  medium:   { label: 'Media',    color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30' },
  high:     { label: 'Alta',     color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/30' },
  critical: { label: 'Crítica',  color: 'text-red-400',    bg: 'bg-red-400/10',    border: 'border-red-400/30' },
};

export const STATUS_CONFIG: Record<TaskStatus, { label: string; color: string; bg: string; icon: string }> = {
  'todo':        { label: 'Pendiente',    color: 'text-gray-400',  bg: 'bg-gray-400/10',  icon: '○' },
  'in-progress': { label: 'En progreso',  color: 'text-blue-400',  bg: 'bg-blue-400/10',  icon: '◑' },
  'done':        { label: 'Completada',   color: 'text-green-400', bg: 'bg-green-400/10', icon: '●' },
};

export const IMPORTANCE_ORDER: Record<ImportanceLevel, number> = {
  low: 0, medium: 1, high: 2, critical: 3,
};

export const PRESET_COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#ef4444',
  '#f97316', '#eab308', '#22c55e', '#10b981',
  '#14b8a6', '#06b6d4', '#3b82f6', '#6b7280',
];

export const DEFAULT_CATEGORIES = [
  { id: 'cat-work',     name: 'Trabajo',   color: '#6366f1' },
  { id: 'cat-personal', name: 'Personal',  color: '#22c55e' },
  { id: 'cat-health',   name: 'Salud',     color: '#ec4899' },
  { id: 'cat-study',    name: 'Estudio',   color: '#eab308' },
];
