import type { ReactNode, InputHTMLAttributes, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  icon?: ReactNode;
  error?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function Input({
  label,
  icon,
  error,
  onChange,
  className = '',
  id,
  ...inputProps
}: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={inputId} className="text-sm font-medium text-cream/70">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/30 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          onChange={handleChange}
          className={`w-full rounded-xl border bg-cream/5 text-cream placeholder:text-cream/30 outline-none transition-all duration-200 ${icon ? 'pl-10 pr-4 py-2.5' : 'px-4 py-2.5'} ${
            error
              ? 'border-ember-500 focus:border-ember-500 focus:shadow-[0_0_0_3px_rgba(225,112,85,0.15)]'
              : 'border-cream/10 focus:border-ember-400 focus:shadow-[0_0_0_3px_rgba(255,159,67,0.15)]'
          }`}
          {...inputProps}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            className="text-sm text-ember-400"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
