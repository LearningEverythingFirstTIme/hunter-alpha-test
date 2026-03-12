import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { useMeetingStore, getAttendedDates } from '../../store/meetingStore';
import { getWeekDays, isAttendedOnDate } from '../../utils/dates';

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { value: number }[] }) {
  if (!active || !payload?.length) return null;
  const attended = payload[0].value > 0;
  return (
    <div className="glass-card px-3 py-2 text-sm">
      <span className={attended ? 'text-ember-300' : 'text-cream/40'}>
        {attended ? 'Attended' : 'No meeting'}
      </span>
    </div>
  );
}

export function WeeklyChart() {
  const meetings = useMeetingStore((s) => s.meetings);
  const attendedDates = useMemo(() => getAttendedDates(meetings), [meetings]);

  const data = useMemo(() => {
    const days = getWeekDays();
    return days.map((day) => ({
      day: format(day, 'EEE'),
      attended: isAttendedOnDate(attendedDates, day) ? 1 : 0,
    }));
  }, [attendedDates]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, type: 'spring', stiffness: 150, damping: 20 }}
    >
      <Card variant="warm" className="p-6">
        <h3 className="font-serif text-lg text-cream mb-4">This Week</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={28} barCategoryGap="20%">
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255,245,230,0.4)', fontSize: 12 }}
              />
              <YAxis hide domain={[0, 1]} />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Bar dataKey="attended" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.attended > 0 ? '#FF9F43' : 'rgba(255,159,67,0.15)'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}
