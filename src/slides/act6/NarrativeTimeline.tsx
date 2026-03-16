import { motion } from 'framer-motion';
import { Slide, SlideTitle } from '../../components/SlideLayout';

interface Milestone {
  icon: React.ReactNode;
  text: string;
  color: string;
}

const milestones: Milestone[] = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round">
        <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
    text: 'Model leaked a real address',
    color: '#ef4444',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    text: 'You de-anonymized records in 4 minutes',
    color: '#f97316',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    text: 'You attacked with just confidence scores',
    color: '#eab308',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><text x="12" y="16" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="800" stroke="none">$</text>
      </svg>
    ),
    text: 'You invented DP with a coin flip',
    color: '#8b5cf6',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#10b981" stroke="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    text: 'The attack failed on a DP model',
    color: '#10b981',
  },
];

export function NarrativeTimeline() {
  const totalWidth = 900;
  const spacing = totalWidth / (milestones.length - 1);

  return (
    <Slide background="var(--slide-bg)">
      <SlideTitle gradient="linear-gradient(135deg, #ef4444, #10b981)">
        Your Journey
      </SlideTitle>

      <div style={{
        width: '100%',
        maxWidth: totalWidth + 60,
        position: 'relative',
        padding: '0 30px',
        marginTop: '1rem',
      }}>
        {/* Timeline line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: 45,
            left: 30,
            right: 30,
            height: 3,
            background: 'linear-gradient(90deg, #ef4444, #f97316, #eab308, #8b5cf6, #10b981)',
            transformOrigin: 'left center',
            borderRadius: 2,
          }}
        />

        {/* Milestones */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative',
        }}>
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.5 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: spacing,
                maxWidth: 160,
              }}
            >
              {/* Dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + i * 0.5, type: 'spring', bounce: 0.5 }}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: m.color,
                  boxShadow: `0 0 15px ${m.color}60`,
                  marginBottom: 8,
                  zIndex: 2,
                }}
              />

              {/* Connector line */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 25 }}
                transition={{ delay: 0.8 + i * 0.5 + 0.2, duration: 0.3 }}
                style={{
                  width: 2,
                  background: `${m.color}60`,
                  marginBottom: 8,
                }}
              />

              {/* Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.5 + 0.3, type: 'spring' }}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `${m.color}12`,
                  border: `1px solid ${m.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                }}
              >
                {m.icon}
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.5 + 0.4 }}
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  lineHeight: 1.4,
                  maxWidth: 140,
                }}
              >
                {m.text}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Final quote */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4.5, duration: 1 }}
        style={{
          marginTop: '2.5rem',
          maxWidth: 700,
          textAlign: 'center',
        }}
      >
        <motion.p
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.35rem)',
            fontWeight: 700,
            lineHeight: 1.7,
            color: 'var(--text-primary)',
          }}
        >
          The question is no longer{' '}
          <span style={{ color: '#ef4444' }}>whether AI leaks data</span>. It does.
          <br />
          The question is whether we{' '}
          <span style={{ color: '#10b981' }}>choose to do something about it</span>.
        </motion.p>
      </motion.div>
    </Slide>
  );
}
