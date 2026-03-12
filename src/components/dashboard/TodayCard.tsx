import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useMeetingStore } from '../../store/meetingStore';
import { today } from '../../utils/dates';

export function TodayCard() {
  const meetings = useMeetingStore((s) => s.meetings);
  const quickLogToday = useMeetingStore((s) => s.quickLogToday);
  const todayStr = today();
  const loggedToday = meetings.some((m) => m.date === todayStr && m.attended);

  return (
    <Card variant="warm" className="flex flex-col items-center justify-center min-h-[240px] text-center">
      <AnimatePresence mode="wait">
        {loggedToday ? (
          <motion.div
            key="logged"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="flex flex-col items-center gap-3"
          >
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            >
              <CheckCircle2 size={56} className="text-sage" strokeWidth={1.5} />
            </motion.div>
            <p className="font-serif text-2xl text-cream">You showed up today</p>
            <p className="text-cream/50 text-sm">One day at a time</p>
          </motion.div>
        ) : (
          <motion.div
            key="prompt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <p className="font-serif text-2xl text-cream leading-snug">
              Did you attend<br />a meeting today?
            </p>
            <div className="flex gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={quickLogToday}
              >
                Yes, I was there
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-cream/40"
              >
                Not yet
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
