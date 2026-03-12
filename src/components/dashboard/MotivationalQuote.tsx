import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomQuote } from '../../data/quotes';

export function MotivationalQuote() {
  const [quote, setQuote] = useState(() => getRandomQuote());

  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(getRandomQuote());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="text-center py-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={quote.text}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-serif italic text-xl md:text-2xl text-cream/80 leading-relaxed max-w-2xl mx-auto">
            &ldquo;{quote.text}&rdquo;
          </p>
          <footer className="mt-4 text-cream/40 text-sm font-sans">
            &mdash; {quote.author}
          </footer>
        </motion.blockquote>
      </AnimatePresence>
    </motion.div>
  );
}
