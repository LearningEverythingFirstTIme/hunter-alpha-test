import { useState } from 'react';
import { motion } from 'framer-motion';
import type { TransactionCategory } from '../../types/treasury';
import { CATEGORY_LABELS } from '../../types/treasury';
import { useTreasuryStore } from '../../store/treasuryStore';
import { today } from '../../utils/dates';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface TransactionFormProps {
  open: boolean;
  onClose: () => void;
}

export function TransactionForm({ open, onClose }: TransactionFormProps) {
  const addTransaction = useTreasuryStore((s) => s.addTransaction);
  const [date, setDate] = useState(today());
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<TransactionCategory>('seventh_tradition');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount === 0) return;

    addTransaction({
      date,
      amount: parsedAmount,
      category,
      description,
    });

    setDate(today());
    setAmount('');
    setCategory('seventh_tradition');
    setDescription('');
    onClose();
  };

  const categories = Object.entries(CATEGORY_LABELS) as [TransactionCategory, string][];

  return (
    <Modal open={open} title="Add Transaction" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Date"
          type="date"
          value={date}
          onChange={setDate}
          required
        />
        <Input
          label="Amount"
          type="number"
          placeholder="Enter positive for income, negative for expense"
          value={amount}
          onChange={setAmount}
          step="0.01"
          required
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-cream/70">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as TransactionCategory)}
            className="w-full rounded-xl border bg-cream/5 text-cream border-cream/10 px-4 py-2.5 outline-none transition-all duration-200 focus:border-ember-400 focus:shadow-[0_0_0_3px_rgba(255,159,67,0.15)]"
          >
            {categories.map(([value, label]) => (
              <option key={value} value={value} className="bg-sacred-900">
                {label}
              </option>
            ))}
          </select>
        </div>
        <Input
          label="Description"
          placeholder="Brief description"
          value={description}
          onChange={setDescription}
        />
        <motion.div
          className="flex gap-3 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button type="button" variant="ghost" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Add Transaction
          </Button>
        </motion.div>
      </form>
    </Modal>
  );
}
