export type MeetingType =
  | 'open'
  | 'closed'
  | 'discussion'
  | 'speaker'
  | 'step'
  | 'big_book'
  | 'tradition'
  | 'beginners';

export interface Meeting {
  id: string;
  date: string; // ISO date YYYY-MM-DD
  time: string; // HH:mm
  name: string;
  location: string;
  type: MeetingType;
  duration: number; // minutes
  notes: string;
  attended: boolean;
}

export const MEETING_TYPE_LABELS: Record<MeetingType, string> = {
  open: 'Open',
  closed: 'Closed',
  discussion: 'Discussion',
  speaker: 'Speaker',
  step: 'Step Meeting',
  big_book: 'Big Book',
  tradition: 'Tradition',
  beginners: 'Beginners',
};

export const MEETING_TYPE_COLORS: Record<MeetingType, string> = {
  open: 'bg-sage/20 text-sage border-sage/30',
  closed: 'bg-ember-500/20 text-ember-400 border-ember-400/30',
  discussion: 'bg-healing/20 text-healing border-healing/30',
  speaker: 'bg-candlelight/20 text-candlelight border-candlelight/30',
  step: 'bg-ember-300/20 text-ember-300 border-ember-300/30',
  big_book: 'bg-ember-600/20 text-ember-500 border-ember-500/30',
  tradition: 'bg-ember-200/20 text-ember-200 border-ember-200/30',
  beginners: 'bg-cream/20 text-cream border-cream/30',
};
