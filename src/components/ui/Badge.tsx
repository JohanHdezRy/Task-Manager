import type { ImportanceLevel, TaskStatus } from '../../types';
import { IMPORTANCE_CONFIG, STATUS_CONFIG } from '../../utils/constants';

interface ImportanceBadgeProps { level: ImportanceLevel; }
interface StatusBadgeProps { status: TaskStatus; }

export function ImportanceBadge({ level }: ImportanceBadgeProps) {
  const cfg = IMPORTANCE_CONFIG[level];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
      {cfg.label}
    </span>
  );
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.color} ${cfg.bg}`}>
      <span>{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}
