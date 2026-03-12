import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, getDay, addMonths, subMonths } from 'date-fns';
import { useMeetingStore } from '../../store/meetingStore';
import { getMonthDays, isAttendedOnDate, isToday as checkIsToday } from '../../utils/dates';

interface CalendarViewProps {
  onDayClick?: (date: string) => void;
  onLogClick?: (date: string) => void;
}

export function CalendarView({ onDayClick, onLogClick }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const meetings = useMeetingStore((s) => s.meetings);
  const attendedDates = useMeetingStore((s) => s.getAttendedDates());

  const days = useMemo(() => getMonthDays(currentMonth), [currentMonth]);
  const startDay = getDay(startOfMonth(currentMonth));

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const meetingsByDate = useMemo(() => {
    const map = new Map<string, number>();
    for (const m of meetings) {
      if (m.attended) {
        map.set(m.date, (map.get(m.date) || 0) + 1);
      }
    }
    return map;
  }, [meetings]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-serif text-cream font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-1">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 text-cream/50 hover:text-cream hover:bg-cream/5 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 text-cream/50 hover:text-cream hover:bg-cream/5 rounded-lg transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="glass-card-warm rounded-2xl p-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((d) => (
            <div
              key={d}
              className="text-center text-xs font-sans text-cream/30 uppercase tracking-wider py-1"
            >
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {days.map((day) => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const attended = isAttendedOnDate(attendedDates, day);
            const today = checkIsToday(day);
            const count = meetingsByDate.get(dateStr) || 0;

            return (
              <button
                key={dateStr}
                onClick={() => {
                  onDayClick?.(dateStr);
                  onLogClick?.(dateStr);
                }}
                className={`aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-sans transition-colors relative ${
                  today
                    ? 'border-2 border-ember-400 text-ember-400 font-semibold'
                    : 'text-cream/60 hover:bg-cream/5'
                }`}
              >
                <span className="text-sm">{format(day, 'd')}</span>
                {count > 0 && (
                  <div className="flex gap-0.5 mt-0.5">
                    {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-sage"
                      />
                    ))}
                  </div>
                )}
                {attended && count === 0 && (
                  <div className="w-1.5 h-1.5 rounded-full bg-sage absolute bottom-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {meetings.length > 0 && (
        <div className="flex items-center gap-2 text-xs text-cream/30 font-sans">
          <div className="w-2 h-2 rounded-full bg-sage" />
          <span>Meeting attended</span>
        </div>
      )}
    </div>
  );
}
