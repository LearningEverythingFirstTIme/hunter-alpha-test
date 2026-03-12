import { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useTreasuryStore } from '../../store/treasuryStore';
import { formatCurrency } from '../../utils/currency';
import { Card } from '../ui/Card';

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 80, damping: 20 });
  const display = useTransform(spring, (current) => formatCurrency(current));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    const unsubscribe = display.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = latest;
      }
    });
    return unsubscribe;
  }, [display]);

  return <span ref={ref}>{formatCurrency(0)}</span>;
}

export function BalanceCard() {
  const getBalance = useTreasuryStore((s) => s.getBalance);
  const getIncomeTotal = useTreasuryStore((s) => s.getIncomeTotal);
  const getExpenseTotal = useTreasuryStore((s) => s.getExpenseTotal);

  const balance = getBalance();
  const income = getIncomeTotal();
  const expenses = getExpenseTotal();

  return (
    <Card variant="warm" className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm font-sans text-cream/50 uppercase tracking-widest mb-2">
          Current Balance
        </p>
        <div className="text-5xl md:text-6xl font-bold font-serif bg-gradient-to-r from-candlelight to-ember-300 bg-clip-text text-transparent leading-tight">
          <AnimatedNumber value={balance} />
        </div>
        <div className="flex items-center justify-center gap-8 mt-6">
          <div>
            <p className="text-xs font-sans text-sage/70 uppercase tracking-wide">Income</p>
            <p className="text-lg font-semibold text-sage font-sans">
              {formatCurrency(income)}
            </p>
          </div>
          <div className="w-px h-8 bg-cream/10" />
          <div>
            <p className="text-xs font-sans text-ember-400/70 uppercase tracking-wide">Expenses</p>
            <p className="text-lg font-semibold text-ember-400 font-sans">
              {formatCurrency(expenses)}
            </p>
          </div>
        </div>
      </motion.div>
    </Card>
  );
}
