import { motion } from 'framer-motion';
import type { LiteraturePiece, LiteratureCategory } from '../../types/literature';
import { LITERATURE_CATEGORY_LABELS } from '../../types/literature';
import { Card } from '../ui/Card';

const categoryGradients: Record<LiteratureCategory, string> = {
  steps: 'from-ember-500/20 to-ember-600/10',
  traditions: 'from-sage/20 to-sage/5',
  promises: 'from-candlelight/20 to-candlelight/5',
  prayers: 'from-healing/20 to-healing/5',
  readings: 'from-ember-300/20 to-ember-300/5',
  other: 'from-cream/15 to-cream/5',
};

const categoryBadgeColors: Record<LiteratureCategory, string> = {
  steps: 'bg-ember-500/20 text-ember-300 border-ember-500/30',
  traditions: 'bg-sage/20 text-sage border-sage/30',
  promises: 'bg-candlelight/20 text-candlelight border-candlelight/30',
  prayers: 'bg-healing/20 text-healing border-healing/30',
  readings: 'bg-ember-300/20 text-ember-300 border-ember-300/30',
  other: 'bg-cream/15 text-cream/80 border-cream/20',
};

const categoryGlow: Record<LiteratureCategory, string> = {
  steps: 'hover:shadow-ember-500/10',
  traditions: 'hover:shadow-sage/10',
  promises: 'hover:shadow-candlelight/10',
  prayers: 'hover:shadow-healing/10',
  readings: 'hover:shadow-ember-300/10',
  other: 'hover:shadow-cream/5',
};

interface LiteratureCardProps {
  piece: LiteraturePiece;
  onClick: (piece: LiteraturePiece) => void;
  index: number;
}

export function LiteratureCard({ piece, onClick, index }: LiteratureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 24,
        delay: index * 0.06,
      }}
    >
      <Card
        onClick={() => onClick(piece)}
        className={`group relative overflow-hidden bg-gradient-to-br ${categoryGradients[piece.category]} border-cream/5 hover:border-cream/15 transition-all duration-300 hover:shadow-lg ${categoryGlow[piece.category]} hover:-translate-y-1`}
      >
        <div className="flex flex-col items-center text-center">
          <span className="text-4xl mb-3 select-none">{piece.icon}</span>
          <h3 className="font-serif text-lg text-cream leading-snug mb-2 group-hover:text-gradient-candle transition-all duration-300">
            {piece.title}
          </h3>
          <span
            className={`inline-block text-xs font-sans px-2.5 py-0.5 rounded-full border ${categoryBadgeColors[piece.category]}`}
          >
            {LITERATURE_CATEGORY_LABELS[piece.category]}
          </span>
          <p className="text-xs text-cream/40 font-sans mt-2.5 line-clamp-1">
            {piece.source}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
