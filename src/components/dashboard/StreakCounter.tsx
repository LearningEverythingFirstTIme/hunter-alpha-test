import { motion } from 'framer-motion';
import { StreakFlame } from '../ui/StreakFlame';
import { useMeetingStore } from '../../store/meetingStore';
import { calculateStreak } from '../../utils/dates';

export function StreakCounter() {
  const getAttendedDates = useMeetingStore((s) => s.getAttendedDates);
  const streak = calculateStreak(getAttendedDates());

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-8"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      <div className="relative">
        <StreakFlame streak={streak} size="lg" />
        {streak > 0 && (
          <motion.div
            className="absolute -inset-4 rounded-full bg-ember-400/10 blur-xl"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </div>

      <motion.div
        className="mt-6 text-center"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 20 }}
      >
        <span className="font-serif text-7xl font-bold text-gradient-ember">
          {streak}
        </span>
        <p className="mt-2 text-cream/60 font-sans text-lg tracking-wide">
          {streak === 0
            ? 'Every journey starts with a single step'
            : streak === 1
              ? 'day streak'
              : 'day streak'}
        </p>
      </motion.div>
    </motion.div>
  );
}
