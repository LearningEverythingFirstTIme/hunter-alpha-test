import type { ReactNode, MouseEvent } from 'react';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-ember-400 to-ember-500 text-sacred-950 font-semibold shadow-lg shadow-ember-500/20 hover:shadow-ember-500/30',
  secondary:
    'glass-card text-cream border border-cream/10 hover:border-cream/20',
  ghost:
    'text-cream/70 hover:text-cream hover:bg-cream/5',
  danger:
    'bg-ember-600 text-cream hover:bg-ember-700',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-base rounded-xl',
  lg: 'px-7 py-3.5 text-lg rounded-xl',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  asChild = false,
}: ButtonProps) {
  const baseClasses = `${variantStyles[variant]} ${sizeStyles[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} inline-flex items-center justify-center gap-2 font-sans transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ember-400/50`;

  if (asChild) {
    return (
      <motion.span
        className={baseClasses}
        whileTap={disabled ? undefined : { scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <motion.button
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      {children}
    </motion.button>
  );
}
