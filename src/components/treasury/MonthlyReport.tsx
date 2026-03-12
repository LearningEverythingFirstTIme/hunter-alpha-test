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
import { format, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';
import { useTreasuryStore } from '../../store/treasuryStore';
import { getMonthsBack } from '../../utils/dates';
import { formatCurrency } from '../../utils/currency';
import { Card } from '../ui/Card';

interface MonthData {
  month: string;
  income: number;
  expenses: number;
}

export function MonthlyReport() {
  const transactions = useTreasuryStore((s) => s.transactions);

  const data = useMemo((): MonthData[] => {
    const months = getMonthsBack(6);

    return months.map((monthDate) => {
      const start = startOfMonth(monthDate);
      const end = endOfMonth(monthDate);
      const monthLabel = format(monthDate, 'MMM');

      let income = 0;
      let expenses = 0;

      for (const t of transactions) {
        const tDate = parseISO(t.date);
        if (isWithinInterval(tDate, { start, end })) {
          if (t.amount > 0) {
            income += t.amount;
          } else {
            expenses += Math.abs(t.amount);
          }
        }
      }

      return { month: monthLabel, income, expenses };
    });
  }, [transactions]);

  return (
    <Card variant="warm">
      <h3 className="text-lg font-serif text-cream/80 mb-4">Monthly Overview</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,248,230,0.4)', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,248,230,0.4)', fontSize: 12 }}
              tickFormatter={(v: number) => `$${v}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(17,13,7,0.95)',
                border: '1px solid rgba(255,248,230,0.1)',
                borderRadius: '12px',
                color: '#fff8e6',
                fontFamily: 'sans-serif',
                fontSize: '13px',
              }}
              formatter={(value) => formatCurrency(Number(value))}
            />
            <Bar dataKey="income" radius={[6, 6, 0, 0]} maxBarSize={32}>
              {data.map((_, index) => (
                <Cell key={`income-${index}`} fill="#7d9a6f" />
              ))}
            </Bar>
            <Bar dataKey="expenses" radius={[6, 6, 0, 0]} maxBarSize={32}>
              {data.map((_, index) => (
                <Cell key={`expense-${index}`} fill="#e17055" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 mt-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-sage" />
          <span className="text-xs text-cream/50 font-sans">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-ember-500" />
          <span className="text-xs text-cream/50 font-sans">Expenses</span>
        </div>
      </div>
    </Card>
  );
}
