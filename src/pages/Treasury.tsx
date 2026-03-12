import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { BalanceCard } from '../components/treasury/BalanceCard';
import { MonthlyReport } from '../components/treasury/MonthlyReport';
import { TransactionList } from '../components/treasury/TransactionList';
import { TransactionForm } from '../components/treasury/TransactionForm';
import { Button } from '../components/ui/Button';

export function Treasury() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="min-h-screen pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto px-4 py-6 space-y-6"
      >
        <h1 className="text-3xl font-serif text-cream font-bold">Treasury</h1>

        <BalanceCard />

        <MonthlyReport />

        <div>
          <h2 className="text-xl font-serif text-cream/80 mb-4">Transactions</h2>
          <TransactionList />
        </div>
      </motion.div>

      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.3 }}
      >
        <Button
          onClick={() => setFormOpen(true)}
          size="lg"
          className="!rounded-full !p-4 shadow-xl shadow-ember-500/30"
        >
          <Plus size={24} />
        </Button>
      </motion.div>

      <TransactionForm open={formOpen} onClose={() => setFormOpen(false)} />
    </div>
  );
}
