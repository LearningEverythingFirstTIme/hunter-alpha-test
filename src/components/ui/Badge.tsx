import { MEETING_TYPE_COLORS, MEETING_TYPE_LABELS } from '../../types/meeting';
import type { MeetingType } from '../../types/meeting';

interface BadgeProps {
  type: MeetingType;
  className?: string;
}

const colorClasses: Record<MeetingType, string> = MEETING_TYPE_COLORS;
const labels: Record<MeetingType, string> = MEETING_TYPE_LABELS;

export function Badge({ type, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClasses[type]} ${className}`}
    >
      {labels[type]}
    </span>
  );
}
