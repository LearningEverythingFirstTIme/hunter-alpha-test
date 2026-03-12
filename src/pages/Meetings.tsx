import { useState } from 'react';
import { CalendarDays, List, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { CalendarView } from '../components/meetings/CalendarView';
import { MeetingList } from '../components/meetings/MeetingList';
import { MeetingLog } from '../components/meetings/MeetingLog';

type TabMode = 'calendar' | 'list';

export function Meetings() {
  const [activeTab, setActiveTab] = useState<TabMode>('calendar');
  const [logOpen, setLogOpen] = useState(false);

  const tabs: { label: string; value: TabMode; icon: typeof CalendarDays }[] = [
    { label: 'Calendar', value: 'calendar', icon: CalendarDays },
    { label: 'List', value: 'list', icon: List },
  ];

  return (
    <div className="min-h-screen p-4 pb-24 space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif text-cream font-bold">Meetings</h1>
        <div className="flex gap-1 bg-sacred-900/60 rounded-xl p-1 border border-cream/10">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.value}
                onClick={() => setActiveTab(t.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans rounded-lg transition-colors ${
                  activeTab === t.value
                    ? 'bg-ember-400 text-sacred-950 font-semibold'
                    : 'text-cream/50 hover:text-cream'
                }`}
              >
                <Icon size={14} />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === 'calendar' ? (
        <CalendarView onDayClick={() => {}} />
      ) : (
        <MeetingList />
      )}

      <motion.button
        onClick={() => setLogOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-ember-400 to-ember-500 text-sacred-950 shadow-lg shadow-ember-500/30 flex items-center justify-center z-40"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <Plus size={26} strokeWidth={2.5} />
      </motion.button>

      <MeetingLog open={logOpen} onClose={() => setLogOpen(false)} />
    </div>
  );
}
