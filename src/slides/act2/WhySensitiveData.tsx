import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Slide, SlideTitle } from '../../components/SlideLayout';
import { AnimatedText } from '../../components/AnimatedText';

const cards = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v18H3z" />
        <path d="M12 8v4M12 16h.01" />
        <path d="M8 12h8" />
        <rect x="7" y="7" width="10" height="10" rx="1" />
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      </svg>
    ),
    title: 'Hospital needs tumor detection AI',
    subtitle: 'Medical imaging AI requires massive labeled datasets',
    color: '#ef4444',
    badge: null,
    iconLabel: 'Hospital',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    title: 'Best training data? Real patient scans.',
    subtitle: 'Synthetic data cannot capture rare pathologies',
    color: '#f97316',
    badge: 'HIPAA / GDPR',
    iconLabel: 'Database',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10" />
        <path d="M12 20V4" />
        <path d="M6 20v-6" />
      </svg>
    ),
    title: 'Off-the-shelf data = poor accuracy',
    subtitle: 'Generic models miss critical edge cases',
    color: '#8b5cf6',
    badge: null,
    iconLabel: 'Chart',
    showAccuracyBar: true,
  },
];

function AccuracyBar() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ marginTop: '0.75rem', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.7rem',
          color: 'var(--text-secondary)',
          marginBottom: 4,
        }}
      >
        <span>Accuracy</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ color: '#ef4444', fontWeight: 700 }}
        >
          42%
        </motion.span>
      </div>
      <div
        style={{
          height: 8,
          borderRadius: 4,
          background: 'var(--input-border)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: '92%' }}
          animate={animate ? { width: '42%' } : {}}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{
            height: '100%',
            borderRadius: 4,
            background: 'linear-gradient(90deg, #ef4444, #f97316)',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.6rem',
          color: 'var(--text-secondary)',
          marginTop: 2,
        }}
      >
        <span>Generic data</span>
        <span>Real patient data would be 94%</span>
      </div>
    </div>
  );
}

export function WhySensitiveData() {
  return (
    <Slide background="var(--slide-bg)">
      <SlideTitle gradient="linear-gradient(135deg, #ef4444, #f97316, #8b5cf6)">
        The Data Dilemma
      </SlideTitle>

      <div
        style={{
          display: 'flex',
          gap: '1.5rem',
          width: '100%',
          maxWidth: 1000,
          marginTop: '1.5rem',
          justifyContent: 'center',
        }}
      >
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 60, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              delay: 0.5 + idx * 0.6,
              duration: 0.7,
              type: 'spring',
              bounce: 0.3,
            }}
            style={{
              flex: 1,
              background: 'var(--bg-card)',
              borderRadius: 16,
              padding: '1.5rem',
              border: `1px solid ${card.color}33`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 20px ${card.color}10`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Glow effect at top */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: 2,
                background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
              }}
            />

            {/* Step number */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + idx * 0.6, type: 'spring' }}
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: `${card.color}20`,
                border: `1px solid ${card.color}50`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: card.color,
                marginBottom: '0.75rem',
              }}
            >
              {idx + 1}
            </motion.div>

            {/* Icon */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 + idx * 0.6 }}
              style={{ marginBottom: '1rem' }}
            >
              {card.icon}
            </motion.div>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 + idx * 0.6 }}
              style={{
                fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
                lineHeight: 1.3,
              }}
            >
              {card.title}
            </motion.h3>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 + idx * 0.6 }}
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
              }}
            >
              {card.subtitle}
            </motion.p>

            {/* HIPAA/GDPR Badge */}
            {card.badge && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, type: 'spring', bounce: 0.5 }}
                style={{
                  marginTop: '0.75rem',
                  padding: '4px 12px',
                  borderRadius: 6,
                  background: 'rgba(239,68,68,0.15)',
                  border: '1px solid rgba(239,68,68,0.4)',
                  color: '#fca5a5',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                }}
              >
                {card.badge}
              </motion.div>
            )}

            {/* Accuracy bar for card 3 */}
            {card.showAccuracyBar && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                style={{ width: '100%' }}
              >
                <AccuracyBar />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Final message */}
      <AnimatedText
        delay={3.0}
        variant="fadeUp"
        style={{
          marginTop: '2rem',
          textAlign: 'center',
          maxWidth: 700,
        }}
      >
        <p
          style={{
            fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)',
            color: 'var(--text-primary)',
            lineHeight: 1.7,
          }}
        >
          You cannot build good medical AI without medical data.
          <br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5 }}
            style={{
              color: '#ef4444',
              fontWeight: 700,
              textShadow: '0 0 15px rgba(239,68,68,0.3)',
            }}
          >
            And medical data is private.
          </motion.span>
        </p>
      </AnimatedText>
    </Slide>
  );
}
