interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circle' | 'rectangle';
}

const variantStyles: Record<string, string> = {
  text: 'h-4 rounded-md',
  circle: 'rounded-full',
  rectangle: 'rounded-xl',
};

export function Skeleton({ className = '', variant = 'rectangle' }: SkeletonProps) {
  return (
    <div
      className={`bg-gradient-to-r from-cream/5 via-cream/10 to-cream/5 bg-[200%_100%] ${variantStyles[variant]} ${className}`}
      style={{
        animation: 'skeleton-shimmer 2s ease-in-out infinite',
      }}
    />
  );
}
