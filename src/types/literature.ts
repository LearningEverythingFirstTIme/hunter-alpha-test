export type LiteratureCategory =
  | 'steps'
  | 'traditions'
  | 'promises'
  | 'prayers'
  | 'readings'
  | 'other';

export interface LiteraturePiece {
  id: string;
  title: string;
  category: LiteratureCategory;
  content: string;
  source: string;
  icon: string;
}

export const LITERATURE_CATEGORY_LABELS: Record<LiteratureCategory, string> = {
  steps: 'The Steps',
  traditions: 'The Traditions',
  promises: 'The Promises',
  prayers: 'Prayers',
  readings: 'Readings',
  other: 'Other',
};
