import { Trash2, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Meeting } from '../../types/meeting';
import { useMeetingStore } from '../../store/meetingStore';
import { formatDisplay } from '../../utils/dates';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface MeetingCardProps {
  meeting: Meeting;
}

export function MeetingCard({ meeting }: MeetingCardProps) {
  const deleteMeeting = useMeetingStore((s) => s.deleteMeeting);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <Card
        className={`relative group ${meeting.attended ? 'border-l-3 border-l-sage' : ''}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-cream/40 font-sans uppercase tracking-wider mb-1">
              {formatDisplay(meeting.date)}
              {meeting.time && (
                <span className="ml-2 normal-case tracking-normal">
                  {meeting.time}
                </span>
              )}
            </p>
            <h3 className="text-lg font-serif text-cream font-semibold truncate">
              {meeting.name}
            </h3>
            {meeting.location && (
              <div className="flex items-center gap-1.5 mt-1 text-sm text-cream/50 font-sans">
                <MapPin size={13} />
                <span className="truncate">{meeting.location}</span>
              </div>
            )}
            <div className="flex items-center gap-2 mt-2.5 flex-wrap">
              <Badge type={meeting.type} />
              <span className="inline-flex items-center gap-1 text-xs text-cream/40 font-sans">
                <Clock size={12} />
                {meeting.duration} min
              </span>
            </div>
            {meeting.notes && (
              <p className="mt-2.5 text-sm text-cream/45 font-sans line-clamp-2">
                {meeting.notes}
              </p>
            )}
          </div>
          <button
            onClick={() => deleteMeeting(meeting.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-cream/30 hover:text-ember-500 rounded-lg hover:bg-ember-500/10"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </Card>
    </motion.div>
  );
}
