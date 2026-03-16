import { motion } from 'framer-motion';
import { Slide } from '../../components/SlideLayout';

export function QASlide() {
  return (
    <Slide background="var(--slide-bg)">
      {/* Floating question mark */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '15%',
          right: '18%',
          fontSize: '6rem',
          color: '#4f8fff15',
          fontWeight: 900,
          userSelect: 'none',
        }}
      >
        ?
      </motion.div>

      <motion.div
        animate={{
          y: [8, -8, 8],
          rotate: [2, -2, 2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '15%',
          fontSize: '4rem',
          color: '#8b5cf610',
          fontWeight: 900,
          userSelect: 'none',
        }}
      >
        ?
      </motion.div>

      <motion.div
        animate={{
          y: [-6, 12, -6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '30%',
          left: '22%',
          fontSize: '3rem',
          color: '#10b98108',
          fontWeight: 900,
          userSelect: 'none',
        }}
      >
        ?
      </motion.div>

      {/* Main Q & A text */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, type: 'spring', bounce: 0.3 }}
        style={{
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #4f8fff, #8b5cf6, #10b981)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textAlign: 'center',
          letterSpacing: '0.05em',
          marginBottom: '1rem',
        }}
      >
        Q & A
      </motion.h1>

      {/* Subtle divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{
          width: 120,
          height: 3,
          borderRadius: 2,
          background: 'linear-gradient(90deg, #4f8fff, #8b5cf6)',
          marginBottom: '2rem',
        }}
      />

      {/* Thank you */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        style={{
          fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
          color: 'var(--text-primary)',
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        Thank you!
      </motion.p>
    </Slide>
  );
}
