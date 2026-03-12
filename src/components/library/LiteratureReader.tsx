import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { LiteraturePiece } from '../../types/literature';
import { LITERATURE_CATEGORY_LABELS } from '../../types/literature';
import { Button } from '../ui/Button';

const categoryBadgeColors: Record<string, string> = {
  steps: 'bg-ember-500/20 text-ember-300 border-ember-500/30',
  traditions: 'bg-sage/20 text-sage border-sage/30',
  promises: 'bg-candlelight/20 text-candlelight border-candlelight/30',
  prayers: 'bg-healing/20 text-healing border-healing/30',
  readings: 'bg-ember-300/20 text-ember-300 border-ember-300/30',
  other: 'bg-cream/15 text-cream/80 border-cream/20',
};

interface LiteratureReaderProps {
  piece: LiteraturePiece;
  onBack: () => void;
}

export function LiteratureReader({ piece, onBack }: LiteratureReaderProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-sacred-950 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-2xl mx-auto px-5 py-8">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 28 }}
        >
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft size={18} />
            <span>Back to Library</span>
          </Button>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 24 }}
        >
          <span className="text-5xl block mb-5 select-none">{piece.icon}</span>
          <h1 className="font-serif text-3xl md:text-4xl text-cream leading-tight mb-3">
            {piece.title}
          </h1>
          <p className="text-sm text-cream/40 font-sans mb-4">{piece.source}</p>
          <span
            className={`inline-block text-xs font-sans px-3 py-1 rounded-full border ${categoryBadgeColors[piece.category]}`}
          >
            {LITERATURE_CATEGORY_LABELS[piece.category]}
          </span>
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, type: 'spring', stiffness: 200, damping: 24 }}
        >
          <div
            className="text-cream/80 font-sans whitespace-pre-wrap leading-relaxed"
            style={{ fontSize: '1.1rem', lineHeight: '1.85', maxWidth: '65ch' }}
          >
            {piece.content}
          </div>
        </motion.div>

        <div className="h-16" />
      </div>
    </motion.div>
  );
}
