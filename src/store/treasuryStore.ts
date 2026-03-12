import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';
import type { Transaction } from '../types/treasury';

interface TreasuryState {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  getBalance: () => number;
  getIncomeTotal: () => number;
  getExpenseTotal: () => number;
}

export const useTreasuryStore = create<TreasuryState>()(
  persist(
    (set, get) => ({
      transactions: [],

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [{ ...transaction, id: uuid() }, ...state.transactions],
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      getBalance: () => {
        return get().transactions.reduce((sum, t) => sum + t.amount, 0);
      },

      getIncomeTotal: () => {
        return get()
          .transactions.filter((t) => t.amount > 0)
          .reduce((sum, t) => sum + t.amount, 0);
      },

      getExpenseTotal: () => {
        return get()
          .transactions.filter((t) => t.amount < 0)
          .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      },
    }),
    {
      name: 'aa-treasury',
    }
  )
);
