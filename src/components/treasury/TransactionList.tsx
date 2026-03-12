import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import type { Transaction } from '../../types/treasury';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '../../types/treasury';
import { useTreasuryStore } from '../../store/treasuryStore';
import { formatCurrency } from '../../utils/currency';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface GroupedTransactions {
  month: string;
  label: string;
  transactions: Transaction[];
}

function groupByMonth(transactions: Transaction[]): GroupedTransactions[] {
  const groups = new Map<string, Transaction[]>();

  for (const t of transactions) {
    const monthKey = format(parseISO(t.date), 'yyyy-MM');
    if (!groups.has(monthKey)) {
      groups.set(monthKey, []);
    }
    groups.get(monthKey)!.push(t);
  }

  return Array.from(groups.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([month, txns]) => ({
      month,
      label: format(parseISO(`${month}-01`), 'MMMM yyyy'),
      transactions: txns.sort((a, b) => b.date.localeCompare(a.date)),
    }));
}

export function TransactionList() {
  const transactions = useTreasuryStore((s) => s.transactions);
  const deleteTransaction = useTreasuryStore((s) => s.deleteTransaction);

  const grouped = useMemo(() => groupByMonth(transactions), [transactions]);

  if (transactions.length === 0) {
    return (
      <Card className="text-center py-12">
        <p className="text-cream/40 font-sans text-sm">
          No transactions yet. Add your first one to get started.
        </p>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <AnimatePresence mode="popLayout">
        {grouped.map((group) => (
          <motion.div
            key={group.month}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-serif text-cream/80 mb-3">{group.label}</h3>
            <Card className="!p-0 overflow-hidden">
              <AnimatePresence>
                {group.transactions.map((t, i) => (
                  <motion.div
                    key={t.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    className={`flex items-center gap-3 px-4 py-3 ${
                      i > 0 ? 'border-t border-cream/5' : ''
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {t.amount > 0 ? (
                        <ArrowUpRight size={18} className="text-sage" />
                      ) : (
                        <ArrowDownRight size={18} className="text-ember-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-cream/90 truncate font-sans">
                        {t.description || CATEGORY_LABELS[t.category]}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-cream/40 font-sans">
                          {format(parseISO(t.date), 'MMM d')}
                        </span>
                        <span
                          className={`text-xs font-sans ${CATEGORY_COLORS[t.category]}`}
                        >
                          {CATEGORY_LABELS[t.category]}
                        </span>
                      </div>
                    </div>
                    <p
                      className={`text-sm font-semibold font-sans ${
                        t.amount > 0 ? 'text-sage' : 'text-ember-400'
                      }`}
                    >
                      {t.amount > 0 ? '+' : ''}
                      {formatCurrency(t.amount)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTransaction(t.id)}
                      className="!p-1.5 flex-shrink-0"
                    >
                      <Trash2 size={14} className="text-cream/30 hover:text-ember-500" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
