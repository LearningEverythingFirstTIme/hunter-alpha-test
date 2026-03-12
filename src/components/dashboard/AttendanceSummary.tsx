import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { useMeetingStore } from '../../store/meetingStore';
import { getWeekDays, getMonthDays } from '../../utils/dates';

interface StatCardProps {
  label: string;
  value: string;
  delay: number;
}

function StatCard({ label, value, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 200, damping: 22 }}
    >
      <Card className="text-center py-5 px-4">
        <p className="font-serif text-3xl md:text-4xl font-bold text-gradient-ember">
          {value}
        </p>
        <p className="mt-1 text-cream/50 text-sm font-sans tracking-wide">
          {label}
        </p>
      </Card>
    </motion.div>
  );
}

export function AttendanceSummary() {
  const meetings = useMeetingStore((s) => s.meetings);

  const stats = useMemo(() => {
    const dates = meetings.filter((m) => m.attended).map((m) => m.date);
    const weekDates = getWeekDays().map((d) => d.toISOString().split('T')[0]);
    const monthDates = getMonthDays().map((d) => d.toISOString().split('T')[0]);

    const thisWeek = dates.filter((d) => weekDates.includes(d)).length;
    const thisMonth = dates.filter((d) => monthDates.includes(d)).length;

    return {
      week: `${thisWeek}/7`,
      month: `${thisMonth}/${monthDates.length}`,
      allTime: dates.length.toString(),
    };
  }, [meetings]);

  return (
    <div className="grid grid-cols-3 gap-3">
      <StatCard label="This Week" value={stats.week} delay={0.25} />
      <StatCard label="This Month" value={stats.month} delay={0.35} />
      <StatCard label="All Time" value={stats.allTime} delay={0.45} />
    </div>
  );
}
