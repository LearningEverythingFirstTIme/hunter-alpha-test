export type TransactionCategory =
  | 'seventh_tradition'
  | 'prudent_reserve'
  | 'literature'
  | 'rent'
  | 'coffee_supplies'
  | 'donation'
  | 'other';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: TransactionCategory;
  description: string;
}

export const CATEGORY_LABELS: Record<TransactionCategory, string> = {
  seventh_tradition: '7th Tradition',
  prudent_reserve: 'Prudent Reserve',
  literature: 'Literature',
  rent: 'Rent',
  coffee_supplies: 'Coffee & Supplies',
  donation: 'Donation',
  other: 'Other',
};

export const CATEGORY_COLORS: Record<TransactionCategory, string> = {
  seventh_tradition: 'text-sage',
  prudent_reserve: 'text-ember-300',
  literature: 'text-healing',
  rent: 'text-ember-500',
  coffee_supplies: 'text-candlelight',
  donation: 'text-ember-400',
  other: 'text-cream/60',
};
