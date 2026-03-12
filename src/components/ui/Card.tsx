import type { ReactNode, MouseEvent } from 'react';
import { motion } from 'framer-motion';

type CardVariant = 'default' | 'warm' | 'elevated';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'glass-card',
  warm: 'glass-card-warm',
  elevated: 'glass-card candle-glow',
};

export function Card({ children, className = '', variant = 'default', onClick }: CardProps) {
  return (
    <motion.div
      className={`${variantStyles[variant]} p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.01, y: -2 } : undefined}
      whileTap={onClick ? { scale: 0.99 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}
