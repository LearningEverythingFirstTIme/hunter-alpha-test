import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, BookOpen, Landmark, Settings, Sun } from 'lucide-react';

const tabs = [
  { path: '/', label: 'Dashboard', icon: Sun },
  { path: '/meetings', label: 'Meetings', icon: Calendar },
  { path: '/treasury', label: 'Treasury', icon: Landmark },
  { path: '/library', label: 'Library', icon: BookOpen },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-cream/8 bg-sacred-900/90 backdrop-blur-xl">
      <div className="flex items-center justify-around h-16 px-1">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-all duration-200 relative cursor-pointer ${
                isActive ? 'text-ember-400' : 'text-cream/40 hover:text-cream/70'
              }`}
            >
              {isActive && (
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-ember-400" />
              )}
              <tab.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
