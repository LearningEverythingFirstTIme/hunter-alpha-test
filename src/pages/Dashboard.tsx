import { motion } from 'framer-motion';
import { StreakCounter } from '../components/dashboard/StreakCounter';
import { TodayCard } from '../components/dashboard/TodayCard';
import { AttendanceSummary } from '../components/dashboard/AttendanceSummary';
import { WeeklyChart } from '../components/dashboard/WeeklyChart';
import { MotivationalQuote } from '../components/dashboard/MotivationalQuote';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 180, damping: 22 } },
};

export function Dashboard() {
  return (
    <motion.div
      className="relative z-10 max-w-2xl mx-auto px-4 pb-12"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <div className="blob-bg blob-1" />
      <div className="blob-bg blob-2" />

      <motion.section variants={fadeUp}>
        <StreakCounter />
      </motion.section>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
        variants={fadeUp}
      >
        <TodayCard />
        <AttendanceSummary />
      </motion.div>

      <motion.section className="mt-6" variants={fadeUp}>
        <WeeklyChart />
      </motion.section>

      <motion.section className="mt-6" variants={fadeUp}>
        <MotivationalQuote />
      </motion.section>
    </motion.div>
  );
}
