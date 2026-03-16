import { motion } from 'framer-motion';
import { Slide } from '../../components/SlideLayout';
import { images } from '../../assets/images';

export function TitleSlide() {
  return (
    <Slide background="var(--slide-bg)">
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: i % 2 === 0 ? 'var(--accent-blue)' : 'var(--accent-purple)',
            opacity: 0.3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Lock icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
        style={{ fontSize: '4rem', marginBottom: '1.5rem' }}
      >
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="url(#lockGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="lockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f8fff" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #4f8fff, #8b5cf6, #ec4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textAlign: 'center',
          lineHeight: 1.1,
        }}
      >
        Privacy in
        <br />
        Generative AI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        style={{
          fontSize: 'clamp(1rem, 2vw, 1.4rem)',
          color: 'var(--text-secondary)',
          marginTop: '1.5rem',
          textAlign: 'center',
          lineHeight: 1.6,
        }}
      >
        How AI models learn, what they remember,
        <br />
        and how we can protect your data.
      </motion.p>

      {/* Author info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          marginTop: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <img
          src={images.iitmLogo}
          alt="IIT Madras"
          style={{ height: 50, objectFit: 'contain' }}
        />
        <div style={{ textAlign: 'left' }}>
          <div style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
          }}>
            Saranath P
          </div>
          <div style={{
            fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
            color: 'var(--text-secondary)',
          }}>
            MS (by Research), Dept. of Data Science and AI
          </div>
          <div style={{
            fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)',
            color: 'var(--text-secondary)',
            opacity: 0.8,
          }}>
            IIT Madras
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{
          marginTop: '2rem',
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
          color: 'var(--text-secondary)',
          opacity: 0.5,
          fontSize: '0.9rem',
        }}
      >
        Press <kbd style={{
          background: 'var(--bg-card)',
          padding: '2px 8px',
          borderRadius: 4,
          border: '1px solid var(--card-border)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.8rem',
        }}>→</kbd> to continue
      </motion.div>
    </Slide>
  );
}
