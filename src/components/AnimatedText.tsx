import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface AnimatedTextProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
  variant?: 'fadeUp' | 'fadeIn' | 'typewriter' | 'scaleIn' | 'slideRight';
}

export function AnimatedText({ children, delay = 0, duration = 0.6, style, variant = 'fadeUp' }: AnimatedTextProps) {
  const variants = {
    fadeUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
    },
    slideRight: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
    },
    typewriter: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
  };

  const v = variants[variant];

  return (
    <motion.div
      initial={v.initial}
      animate={v.animate}
      transition={{ duration, delay, ease: 'easeOut' }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function TypewriterText({ text, delay = 0, speed = 40, style, onComplete }: {
  text: string;
  delay?: number;
  speed?: number;
  style?: React.CSSProperties;
  onComplete?: () => void;
}) {
  return (
    <motion.span
      style={{ ...style, display: 'inline' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + i * (speed / 1000) }}
          onAnimationComplete={i === text.length - 1 ? onComplete : undefined}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function GlowText({ children, color = 'var(--accent-blue)', style }: {
  children: ReactNode;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={{
        color,
        textShadow: `0 0 20px ${color}40, 0 0 40px ${color}20`,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function PulsingText({ children, color = 'var(--accent-red)', style }: {
  children: ReactNode;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.span
      animate={{
        textShadow: [
          `0 0 10px ${color}40`,
          `0 0 30px ${color}80`,
          `0 0 10px ${color}40`,
        ],
      }}
      transition={{ duration: 2, repeat: Infinity }}
      style={{ color, ...style }}
    >
      {children}
    </motion.span>
  );
}
