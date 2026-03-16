import { motion } from 'framer-motion';
import { Slide } from '../../components/SlideLayout';
import { AnimatedText } from '../../components/AnimatedText';

export function DeAnonymizationReveal() {
  return (
    <Slide background="var(--slide-bg)">
      {/* Newspaper-style headline */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
        style={{
          background: '#f5f0e8',
          padding: '2.5rem 4rem',
          borderRadius: 6,
          maxWidth: 900,
          width: '85%',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 0 30px rgba(0,0,0,0.05)',
          position: 'relative',
          transform: 'rotate(-1deg)',
        }}
      >
        {/* Newspaper header */}
        <div style={{
          borderBottom: '3px double #333',
          paddingBottom: '0.6rem',
          marginBottom: '1rem',
        }}>
          <div style={{
            fontSize: '0.85rem',
            color: '#666',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            marginBottom: 4,
          }}>
            The Privacy Times
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ fontSize: '0.75rem', color: '#999' }}
          >
            1997 Edition
          </motion.div>
        </div>

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 900,
            color: '#1a1a1a',
            lineHeight: 1.15,
            fontFamily: 'Georgia, serif',
            marginBottom: '0.5rem',
          }}
        >
          LATANYA SWEENEY
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{
            fontSize: 'clamp(1.1rem, 2.2vw, 1.7rem)',
            fontWeight: 400,
            color: '#333',
            fontFamily: 'Georgia, serif',
            marginBottom: '1rem',
          }}
        >
          Re-identifies Governor of Massachusetts
        </motion.h3>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          style={{
            fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)',
            color: '#444',
            lineHeight: 1.7,
            fontFamily: 'Georgia, serif',
            borderTop: '1px solid #ccc',
            paddingTop: '1rem',
            maxWidth: 700,
            margin: '0 auto',
          }}
        >
          Using just <strong>zip code</strong>, <strong>birthdate</strong>, and{' '}
          <strong>gender</strong> from "anonymized" hospital records, researcher
          identifies the governor's personal medical data from a public dataset.
        </motion.p>

        {/* Three data points */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '1.2rem',
          }}
        >
          {['Zip Code', 'Birthdate', 'Gender'].map((item, idx) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 + idx * 0.2 }}
              style={{
                background: '#ef4444',
                color: '#fff',
                padding: '6px 18px',
                borderRadius: 6,
                fontSize: '0.9rem',
                fontWeight: 700,
                letterSpacing: '0.02em',
              }}
            >
              {item}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Key insight */}
      <AnimatedText
        delay={2.5}
        variant="fadeUp"
        style={{
          marginTop: '2rem',
          textAlign: 'center',
          maxWidth: 800,
        }}
      >
        <p style={{
          fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
        }}>
          In high-dimensional data,{' '}
          <motion.span
            initial={{ color: 'var(--text-secondary)' }}
            animate={{ color: '#8b5cf6' }}
            transition={{ delay: 3.0 }}
            style={{ fontWeight: 700 }}
          >
            your behavior IS your identity
          </motion.span>
          .
        </p>
      </AnimatedText>

      {/* Bold conclusion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.5, duration: 0.8, type: 'spring' }}
        style={{ marginTop: '1.2rem', textAlign: 'center' }}
      >
        <motion.h2
          animate={{
            textShadow: [
              '0 0 10px rgba(239,68,68,0.3)',
              '0 0 30px rgba(239,68,68,0.6)',
              '0 0 10px rgba(239,68,68,0.3)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            fontWeight: 900,
            color: '#ef4444',
            lineHeight: 1.2,
          }}
        >
          Stripping names is NOT anonymization.
        </motion.h2>
      </motion.div>
    </Slide>
  );
}
