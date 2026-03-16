import { motion } from 'framer-motion';
import { Slide, SlideTitle, SlideSubtitle } from '../../components/SlideLayout';
import { AnimatedText } from '../../components/AnimatedText';

export function NetflixChallengeIntro() {
  return (
    <Slide background="var(--slide-bg)">
      <SlideTitle gradient="linear-gradient(135deg, #ef4444, #f97316)">
        The Netflix Prize: A $1 Million Problem
      </SlideTitle>

      <SlideSubtitle delay={0.5}>
        In 2006, Netflix released a dataset of{' '}
        <span style={{ color: '#ef4444', fontWeight: 700 }}>500,000 users</span>{' '}
        and their movie ratings, challenging teams worldwide to improve their recommendation algorithm by 10%.
      </SlideSubtitle>

      {/* Netflix visual + prize badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.8, type: 'spring', bounce: 0.3 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.5rem',
          marginTop: '2rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Netflix logo text */}
        <motion.div
          style={{
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 900,
            color: '#e50914',
            letterSpacing: '-0.04em',
            textShadow: '0 0 40px rgba(229,9,20,0.4), 0 4px 20px rgba(0,0,0,0.5)',
            fontFamily: 'Arial Black, sans-serif',
          }}
        >
          NETFLIX
        </motion.div>

        {/* Prize badge */}
        <motion.div
          initial={{ rotate: -10, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 1.5, type: 'spring', bounce: 0.5 }}
          style={{
            background: 'linear-gradient(135deg, #eab308, #f97316)',
            borderRadius: '50%',
            width: 'clamp(120px, 15vw, 180px)',
            height: 'clamp(120px, 15vw, 180px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 40px rgba(234,179,8,0.4), 0 8px 32px rgba(0,0,0,0.3)',
            border: '4px solid rgba(255,255,255,0.2)',
          }}
        >
          <div style={{
            fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)',
            fontWeight: 700,
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            textShadow: '0 1px 3px rgba(0,0,0,0.4)',
          }}>
            PRIZE
          </div>
          <div style={{
            fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
            fontWeight: 900,
            color: '#fff',
            textShadow: '0 2px 4px rgba(0,0,0,0.4)',
            lineHeight: 1,
          }}>
            $1,000,000
          </div>
        </motion.div>
      </motion.div>

      {/* Key point */}
      <AnimatedText
        delay={2.0}
        variant="fadeUp"
        style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
          color: 'var(--text-primary)',
          textAlign: 'center',
          maxWidth: 800,
          lineHeight: 1.7,
          padding: '1rem 2rem',
          borderRadius: 16,
          background: 'var(--bg-card)',
          border: '1px solid var(--card-border)',
        }}
      >
        The data was <span style={{ color: '#4f8fff', fontWeight: 700 }}>"anonymized"</span> -- no names, just user IDs and their movie ratings.
      </AnimatedText>

      {/* Dramatic question */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.2, duration: 0.8 }}
        style={{
          marginTop: '1.5rem',
          fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
          fontWeight: 800,
          color: '#ef4444',
          textAlign: 'center',
          textShadow: '0 0 30px rgba(239,68,68,0.4)',
        }}
      >
        <motion.span
          animate={{
            textShadow: [
              '0 0 10px rgba(239,68,68,0.3)',
              '0 0 30px rgba(239,68,68,0.6)',
              '0 0 10px rgba(239,68,68,0.3)',
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          But was it really anonymous?
        </motion.span>
      </motion.div>
    </Slide>
  );
}
