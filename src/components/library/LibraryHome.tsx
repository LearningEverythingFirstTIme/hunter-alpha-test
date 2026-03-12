import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import type { LiteraturePiece, LiteratureCategory } from '../../types/literature';
import { LITERATURE_CATEGORY_LABELS } from '../../types/literature';
import { literatureData } from '../../data/literature';
import { LiteratureCard } from './LiteratureCard';
import { LiteratureReader } from './LiteratureReader';

const categories: (LiteratureCategory | 'all')[] = [
  'all',
  'steps',
  'traditions',
  'promises',
  'prayers',
  'readings',
  'other',
];

const pillColors: Record<string, string> = {
  all: 'bg-ember-400/20 text-ember-300 border-ember-400/40',
  steps: 'bg-ember-500/20 text-ember-300 border-ember-500/30',
  traditions: 'bg-sage/20 text-sage border-sage/30',
  promises: 'bg-candlelight/20 text-candlelight border-candlelight/30',
  prayers: 'bg-healing/20 text-healing border-healing/30',
  readings: 'bg-ember-300/20 text-ember-300 border-ember-300/30',
  other: 'bg-cream/15 text-cream/80 border-cream/20',
};

const pillInactive = 'bg-cream/5 text-cream/40 border-cream/10 hover:bg-cream/10 hover:text-cream/60';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 180, damping: 22 } },
};

export function LibraryHome() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<LiteratureCategory | 'all'>('all');
  const [selectedPiece, setSelectedPiece] = useState<LiteraturePiece | null>(null);

  const filtered = useMemo(() => {
    return literatureData.filter((piece) => {
      const matchesCategory = activeCategory === 'all' || piece.category === activeCategory;
      const query = search.toLowerCase();
      const matchesSearch =
        !query ||
        piece.title.toLowerCase().includes(query) ||
        piece.content.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  if (selectedPiece) {
    return (
      <AnimatePresence mode="wait">
        <LiteratureReader
          key={selectedPiece.id}
          piece={selectedPiece}
          onBack={() => setSelectedPiece(null)}
        />
      </AnimatePresence>
    );
  }

  return (
    <motion.div
      className="relative z-10 max-w-4xl mx-auto px-4 pb-12"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <div className="blob-bg blob-1" />
      <div className="blob-bg blob-2" />

      <motion.div className="pt-6 pb-2" variants={fadeUp}>
        <h1 className="font-serif text-3xl text-cream mb-1">Library</h1>
        <p className="text-cream/50 font-sans text-sm">
          Words to carry with you on the journey
        </p>
      </motion.div>

      <motion.div className="relative mt-5" variants={fadeUp}>
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/30 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search literature..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm"
        />
      </motion.div>

      <motion.div className="flex flex-wrap gap-2 mt-4" variants={fadeUp}>
        {categories.map((cat) => {
          const label = cat === 'all' ? 'All' : LITERATURE_CATEGORY_LABELS[cat];
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-sans px-3 py-1.5 rounded-full border transition-all duration-200 ${
                isActive ? pillColors[cat] : pillInactive
              }`}
            >
              {label}
            </button>
          );
        })}
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-7"
        variants={stagger}
      >
        {filtered.map((piece, index) => (
          <LiteratureCard
            key={piece.id}
            piece={piece}
            onClick={setSelectedPiece}
            index={index}
          />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-cream/30 font-sans text-sm">
            No literature found matching your search.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
