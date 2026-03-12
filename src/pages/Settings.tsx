import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, Trash2, Moon } from 'lucide-react';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import { useSettingsStore } from '../store/settingsStore';
import { useMeetingStore } from '../store/meetingStore';
import { useTreasuryStore } from '../store/treasuryStore';
import { exportData } from '../utils/storage';
import { formatDisplay } from '../utils/dates';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export function Settings() {
  const {
    userName,
    homeGroup,
    sobrietyDate,
    reminderTime,
    updateSettings,
  } = useSettingsStore();

  const meetings = useMeetingStore((s) => s.meetings);
  const transactions = useTreasuryStore((s) => s.transactions);

  const [name, setName] = useState(userName);
  const [group, setGroup] = useState(homeGroup);
  const [sobriety, setSobriety] = useState(sobrietyDate);
  const [reminder, setReminder] = useState(reminderTime);

  const handleBlur = () => {
    updateSettings({
      userName: name,
      homeGroup: group,
      sobrietyDate: sobriety,
      reminderTime: reminder,
    });
  };

  const handleExport = () => {
    exportData({ meetings, transactions }, 'aa-tracker-export.json');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const soberDays = sobrietyDate
    ? differenceInCalendarDays(new Date(), parseISO(sobrietyDate))
    : null;

  return (
    <div className="min-h-screen pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto px-4 py-6 space-y-6"
      >
        <h1 className="text-3xl font-serif text-cream font-bold">Settings</h1>

        {sobrietyDate && soberDays !== null && (
          <Card variant="warm" className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Moon size={18} className="text-candlelight" />
              <p className="text-sm font-sans text-cream/50 uppercase tracking-widest">
                Sober since
              </p>
            </div>
            <p className="text-2xl font-serif text-candlelight font-bold">
              {formatDisplay(sobrietyDate)}
            </p>
            <p className="text-lg text-cream/70 font-sans mt-1">
              {soberDays} {soberDays === 1 ? 'day' : 'days'}
            </p>
          </Card>
        )}

        <Card>
          <Input
            label="Name"
            value={name}
            onChange={setName}
            onBlur={handleBlur}
            placeholder="Your name"
          />
        </Card>

        <Card>
          <Input
            label="Home Group"
            value={group}
            onChange={setGroup}
            onBlur={handleBlur}
            placeholder="Your home group"
          />
        </Card>

        <Card>
          <Input
            label="Sobriety Date"
            type="date"
            value={sobriety}
            onChange={setSobriety}
            onBlur={handleBlur}
            icon={<Calendar size={16} />}
          />
        </Card>

        <Card>
          <Input
            label="Reminder Time"
            type="time"
            value={reminder}
            onChange={setReminder}
            onBlur={handleBlur}
          />
        </Card>

        <div className="flex flex-col gap-3 pt-4">
          <Button variant="secondary" onClick={handleExport}>
            <Download size={18} />
            Export Data
          </Button>
          <Button variant="danger" onClick={handleReset}>
            <Trash2 size={18} />
            Reset All Data
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
