import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const slideBase: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '48px 64px',
  position: 'relative',
  overflow: 'hidden',
};

export function Slide({ children, background, style }: {
  children: ReactNode;
  background?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        ...slideBase,
        background: background || 'var(--bg-primary)',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

export function SlideTitle({ children, gradient }: { children: ReactNode; gradient?: string }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      style={{
        fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
        fontWeight: 800,
        background: gradient || 'var(--gradient-primary)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textAlign: 'center',
        marginBottom: '1.5rem',
        lineHeight: 1.2,
      }}
    >
      {children}
    </motion.h1>
  );
}

export function SlideSubtitle({ children, delay = 0.4 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      style={{
        fontSize: 'clamp(1.1rem, 2.2vw, 1.7rem)',
        color: 'var(--text-secondary)',
        textAlign: 'center',
        maxWidth: '900px',
        lineHeight: 1.6,
      }}
    >
      {children}
    </motion.p>
  );
}

export function AnimatedList({ items, startDelay = 0.5 }: { items: ReactNode[]; startDelay?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '900px' }}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: startDelay + i * 0.2 }}
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
            color: 'var(--text-primary)',
            lineHeight: 1.6,
          }}
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
}
