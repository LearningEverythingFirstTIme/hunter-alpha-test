import { useState, useMemo } from 'react';
import { Search, ClipboardList } from 'lucide-react';
import { useMeetingStore } from '../../store/meetingStore';
import { MeetingCard } from './MeetingCard';
import { parseISO } from '../../utils/dates';

type FilterMode = 'all' | 'week' | 'month';

function isThisWeek(dateStr: string): boolean {
  const date = parseISO(dateStr);
  const now = new Date();
  const dayOfWeek = now.getDay();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  return date >= startOfWeek && date <= endOfWeek;
}

function isThisMonth(dateStr: string): boolean {
  const date = parseISO(dateStr);
  const now = new Date();
  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
}

export function MeetingList() {
  const meetings = useMeetingStore((s) => s.meetings);
  const [filter, setFilter] = useState<FilterMode>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let result = meetings;

    if (filter === 'week') {
      result = result.filter((m) => isThisWeek(m.date));
    } else if (filter === 'month') {
      result = result.filter((m) => isThisMonth(m.date));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.location.toLowerCase().includes(q)
      );
    }

    return [...result].sort((a, b) => {
      if (b.date !== a.date) return b.date.localeCompare(a.date);
      return b.time.localeCompare(a.time);
    });
  }, [meetings, filter, search]);

  const tabs: { label: string; value: FilterMode }[] = [
    { label: 'All', value: 'all' },
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/30"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search meetings..."
            className="w-full bg-sacred-900/60 border border-cream/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-cream font-sans placeholder:text-cream/30 focus:outline-none focus:border-ember-400/50 focus:ring-1 focus:ring-ember-400/30 transition-colors"
          />
        </div>
        <div className="flex gap-1 bg-sacred-900/60 rounded-xl p-1 border border-cream/10">
          {tabs.map((t) => (
            <button
              key={t.value}
              onClick={() => setFilter(t.value)}
              className={`px-3 py-1.5 text-xs font-sans rounded-lg transition-colors ${
                filter === t.value
                  ? 'bg-ember-400 text-sacred-950 font-semibold'
                  : 'text-cream/50 hover:text-cream'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-sacred-900/60 border border-cream/10 flex items-center justify-center mb-4">
            <ClipboardList size={28} className="text-cream/20" />
          </div>
          <h3 className="text-cream/50 font-serif text-lg mb-1">No meetings yet</h3>
          <p className="text-cream/30 text-sm font-sans max-w-xs">
            Start logging your meetings to track your journey and build your streak.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}
    </div>
  );
}
