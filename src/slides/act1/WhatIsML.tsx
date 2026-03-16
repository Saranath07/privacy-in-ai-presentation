import { motion } from 'framer-motion';
import { Slide, SlideTitle } from '../../components/SlideLayout';
import { AnimatedText } from '../../components/AnimatedText';

const branches = [
  { label: 'Supervised', icon: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2 M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 M9 14l2 2 4-4', color: '#4f8fff' },
  { label: 'Unsupervised', icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4z M6 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4z M18 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4z', color: '#8b5cf6' },
  { label: 'Reinforcement', icon: 'M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z', color: '#10b981' },
];

export function WhatIsML() {
  return (
    <Slide>
      <SlideTitle gradient="linear-gradient(135deg, #4f8fff, #8b5cf6)">
        What is Machine Learning?
      </SlideTitle>

      {/* Central definition */}
      <AnimatedText
        delay={0.4}
        style={{
          fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)',
          color: 'var(--text-secondary)',
          textAlign: 'center',
          maxWidth: '800px',
          marginBottom: '2.5rem',
          lineHeight: 1.6,
          fontStyle: 'italic',
        }}
      >
        "Algorithms that learn from <span style={{ color: '#4f8fff', fontWeight: 700 }}>data</span> without being explicitly programmed"
      </AnimatedText>

      {/* Traditional vs ML comparison */}
      <div style={{
        display: 'flex',
        gap: '3rem',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '900px',
        marginBottom: '2.5rem',
        flexWrap: 'wrap',
      }}>
        {/* Traditional Programming */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.8rem',
          }}
        >
          <span style={{
            fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            fontFamily: 'JetBrains Mono, monospace',
          }}>
            Traditional Programming
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <motion.div style={{
              padding: '0.6rem 1rem',
              borderRadius: 10,
              background: '#4f8fff18',
              border: '1px solid #4f8fff40',
              fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)',
              color: '#4f8fff',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 600,
            }}>
              Rules + Data
            </motion.div>
            {/* Animated arrow */}
            <svg width="60" height="24" viewBox="0 0 60 24">
              <motion.line
                x1="0" y1="12" x2="45" y2="12"
                stroke="#4f8fff"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              />
              <motion.polygon
                points="42,6 54,12 42,18"
                fill="#4f8fff"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              />
              <motion.circle
                r="3" cy="12" fill="#4f8fff"
                initial={{ cx: 0, opacity: 0 }}
                animate={{ cx: [0, 45], opacity: [1, 0] }}
                transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatDelay: 2 }}
              />
            </svg>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: 10,
                background: '#f9731618',
                border: '1px solid #f9731640',
                fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)',
                color: '#f97316',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 600,
              }}
            >
              Output
            </motion.div>
          </div>
        </motion.div>

        {/* VS divider */}
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: 'spring' }}
          style={{
            fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
            fontWeight: 800,
            color: 'var(--text-secondary)',
            opacity: 0.5,
          }}
        >
          vs
        </motion.span>

        {/* Machine Learning */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.8rem',
          }}
        >
          <span style={{
            fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)',
            color: '#10b981',
            fontWeight: 600,
            fontFamily: 'JetBrains Mono, monospace',
          }}>
            Machine Learning
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <motion.div style={{
              padding: '0.6rem 1rem',
              borderRadius: 10,
              background: '#10b98118',
              border: '1px solid #10b98140',
              fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)',
              color: '#10b981',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 600,
            }}>
              Data + Output
            </motion.div>
            <svg width="60" height="24" viewBox="0 0 60 24">
              <motion.line
                x1="0" y1="12" x2="45" y2="12"
                stroke="#10b981"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              />
              <motion.polygon
                points="42,6 54,12 42,18"
                fill="#10b981"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              />
              <motion.circle
                r="3" cy="12" fill="#10b981"
                initial={{ cx: 0, opacity: 0 }}
                animate={{ cx: [0, 45], opacity: [1, 0] }}
                transition={{ delay: 1.7, duration: 1, repeat: Infinity, repeatDelay: 2 }}
              />
            </svg>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: 10,
                background: '#8b5cf618',
                border: '1px solid #8b5cf640',
                fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)',
                color: '#8b5cf6',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 700,
              }}
            >
              Rules!
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Three branches */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.7 }}
        style={{
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {branches.map((branch, i) => (
          <motion.div
            key={branch.label}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 2.5 + i * 0.2, duration: 0.5, type: 'spring' }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 1.5rem',
              borderRadius: 14,
              background: `${branch.color}10`,
              border: `1px solid ${branch.color}30`,
              minWidth: '160px',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={branch.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d={branch.icon} />
            </svg>
            <span style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)',
              color: branch.color,
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif',
            }}>
              {branch.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </Slide>
  );
}
