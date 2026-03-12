import type { SVGProps } from 'react';

type FlameSize = 'sm' | 'md' | 'lg';

interface StreakFlameProps extends SVGProps<SVGSVGElement> {
  streak: number;
  size?: FlameSize;
}

function getFlameLevel(streak: number): 'small' | 'medium' | 'large' | 'epic' {
  if (streak <= 7) return 'small';
  if (streak <= 30) return 'medium';
  if (streak <= 90) return 'large';
  return 'epic';
}

const sizeConfig: Record<FlameSize, { width: number; height: number }> = {
  sm: { width: 24, height: 32 },
  md: { width: 36, height: 48 },
  lg: { width: 48, height: 64 },
};

const glowConfig: Record<string, { filter: string; intensity: number }> = {
  small: { filter: 'none', intensity: 0 },
  medium: { filter: 'drop-shadow(0 0 6px rgba(255,159,67,0.4))', intensity: 1 },
  large: { filter: 'drop-shadow(0 0 12px rgba(255,159,67,0.6))', intensity: 2 },
  epic: { filter: 'drop-shadow(0 0 20px rgba(255,159,67,0.8)) drop-shadow(0 0 40px rgba(255,234,167,0.4))', intensity: 3 },
};

export function StreakFlame({ streak, size = 'md', className = '', ...props }: StreakFlameProps) {
  const level = getFlameLevel(streak);
  const { width, height } = sizeConfig[size];
  const glow = glowConfig[level];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`flame-animate ${className}`}
      style={{ filter: glow.filter }}
      {...props}
    >
      <defs>
        <linearGradient id="flameGradientOuter" x1="24" y1="58" x2="24" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF9F43" />
          <stop offset="50%" stopColor="#FFEAA7" />
          <stop offset="100%" stopColor="#FFF5E6" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="flameGradientInner" x1="24" y1="54" x2="24" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFC078" />
          <stop offset="60%" stopColor="#FFEAA7" />
          <stop offset="100%" stopColor="#FFF5E6" />
        </linearGradient>
        <linearGradient id="flameGradientCore" x1="24" y1="50" x2="24" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFEAA7" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <path
        d="M24 6C24 6 8 24 8 40C8 50 15 56 24 56C33 56 40 50 40 40C40 24 24 6 24 6Z"
        fill="url(#flameGradientOuter)"
        opacity="0.6"
      />

      <path
        d="M24 16C24 16 14 28 14 40C14 47 18 52 24 52C30 52 34 47 34 40C34 28 24 16 24 16Z"
        fill="url(#flameGradientInner)"
        opacity="0.85"
      />

      <path
        d="M24 28C24 28 20 35 20 42C20 46 22 48 24 48C26 48 28 46 28 42C28 35 24 28 24 28Z"
        fill="url(#flameGradientCore)"
      />
    </svg>
  );
}
