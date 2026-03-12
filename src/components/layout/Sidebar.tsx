import { useLocation, useNavigate } from 'react-router-dom';
import { Flame, Calendar, BookOpen, Landmark, Settings, Sun } from 'lucide-react';
import { useMeetingStore } from '../../store/meetingStore';

const navItems = [
  { path: '/', label: 'Dashboard', icon: Sun },
  { path: '/meetings', label: 'Meetings', icon: Calendar },
  { path: '/treasury', label: 'Treasury', icon: Landmark },
  { path: '/library', label: 'Library', icon: BookOpen },
  { path: '/settings', label: 'Settings', icon: Settings },
];

function getStreak(attendedDates: string[]): number {
  if (attendedDates.length === 0) return 0;
  const unique = [...new Set(attendedDates)].sort().reverse();
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const yesterdayStr = new Date(today.getTime() - 86400000).toISOString().split('T')[0];

  if (unique[0] !== todayStr && unique[0] !== yesterdayStr) return 0;

  let streak = 1;
  for (let i = 0; i < unique.length - 1; i++) {
    const current = new Date(unique[i]);
    const next = new Date(unique[i + 1]);
    const diff = (current.getTime() - next.getTime()) / 86400000;
    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const meetings = useMeetingStore((s) => s.meetings);
  const attendedDates = meetings.filter((m) => m.attended).map((m) => m.date);
  const streak = getStreak(attendedDates);

  return (
    <aside className="hidden md:flex flex-col w-[240px] h-screen fixed left-0 top-0 z-40 border-r border-cream/8 bg-gradient-to-b from-sacred-900/95 to-sacred-950/95 backdrop-blur-xl">
      <div className="flex items-center gap-2.5 px-5 pt-7 pb-6">
        <Flame className="w-5 h-5 text-ember-400 flame-animate" />
        <span className="font-serif text-lg text-cream tracking-wide">One Day at a Time</span>
      </div>

      <nav className="flex-1 px-3 mt-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl mb-1 text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-ember-400 bg-ember-400/10 border-l-2 border-ember-400 -ml-[1px]'
                  : 'text-cream/60 hover:text-cream/90 hover:bg-cream/5 border-l-2 border-transparent'
              }`}
            >
              <item.icon className="w-[18px] h-[18px]" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-5 pb-6 flex items-center gap-2.5">
        <Flame className="w-5 h-5 text-ember-500 flame-animate" />
        <span className="font-hand text-lg text-candlelight">
          {streak} day{streak !== 1 ? 's' : ''} strong
        </span>
      </div>
    </aside>
  );
}
