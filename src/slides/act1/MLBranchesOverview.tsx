import { motion } from 'framer-motion';
import { Slide, SlideTitle } from '../../components/SlideLayout';

const branches = [
  {
    title: 'Supervised',
    description: 'Learn from labeled examples',
    color: '#4f8fff',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4f8fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="3" />
      </svg>
    ),
  },
  {
    title: 'Unsupervised',
    description: 'Discover hidden patterns',
    color: '#8b5cf6',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="12" cy="14" r="4" fill="#8b5cf680" stroke="#8b5cf6" strokeWidth="1" />
        <circle cx="28" cy="12" r="4" fill="#8b5cf680" stroke="#8b5cf6" strokeWidth="1" />
        <circle cx="20" cy="28" r="4" fill="#8b5cf680" stroke="#8b5cf6" strokeWidth="1" />
        <circle cx="10" cy="16" r="2" fill="#8b5cf650" />
        <circle cx="30" cy="14" r="2" fill="#8b5cf650" />
        <circle cx="18" cy="30" r="2" fill="#8b5cf650" />
      </svg>
    ),
  },
  {
    title: 'Reinforcement',
    description: 'Learn by trial and error',
    color: '#f97316',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="16" r="8" stroke="#f97316" strokeWidth="1.5" fill="#f9731620" />
        <circle cx="17" cy="14" r="1.5" fill="#f97316" />
        <circle cx="23" cy="14" r="1.5" fill="#f97316" />
        <path d="M16 19 Q20 23 24 19" stroke="#f97316" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <line x1="20" y1="24" x2="20" y2="32" stroke="#f97316" strokeWidth="1.5" />
        <line x1="20" y1="28" x2="14" y2="25" stroke="#f97316" strokeWidth="1.5" />
        <line x1="20" y1="28" x2="26" y2="25" stroke="#f97316" strokeWidth="1.5" />
        <line x1="20" y1="32" x2="15" y2="37" stroke="#f97316" strokeWidth="1.5" />
        <line x1="20" y1="32" x2="25" y2="37" stroke="#f97316" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export function MLBranchesOverview() {
  return (
    <Slide background="var(--slide-bg)">
      <SlideTitle gradient="linear-gradient(135deg, #4f8fff, #8b5cf6, #f97316)">
        Three Ways Machines Learn
      </SlideTitle>

      <div style={{
        display: 'flex',
        gap: '2rem',
        marginTop: '2rem',
        width: '100%',
        maxWidth: '900px',
        justifyContent: 'center',
      }}>
        {branches.map((branch, i) => (
          <motion.div
            key={branch.title}
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.3 + i * 0.25,
              type: 'spring',
              bounce: 0.3,
            }}
            whileHover={{ scale: 1.05, y: -5 }}
            style={{
              flex: 1,
              background: `linear-gradient(180deg, ${branch.color}10 0%, ${branch.color}05 100%)`,
              border: `1px solid ${branch.color}30`,
              borderRadius: 20,
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.2rem',
              cursor: 'default',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Glow effect at top */}
            <div style={{
              position: 'absolute',
              top: -40,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 100,
              height: 80,
              borderRadius: '50%',
              background: `${branch.color}15`,
              filter: 'blur(30px)',
            }} />

            {/* Icon */}
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut',
              }}
              style={{
                width: 70,
                height: 70,
                borderRadius: '50%',
                background: `${branch.color}12`,
                border: `1px solid ${branch.color}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {branch.icon}
            </motion.div>

            {/* Title */}
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: 700,
              color: branch.color,
              fontFamily: 'Inter, sans-serif',
              margin: 0,
            }}>
              {branch.title}
            </h3>

            {/* Description */}
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--text-secondary)',
              textAlign: 'center',
              margin: 0,
              lineHeight: 1.5,
              fontFamily: 'Inter, sans-serif',
            }}>
              {branch.description}
            </p>

            {/* Bottom accent line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              transition={{ duration: 0.8, delay: 0.8 + i * 0.25 }}
              style={{
                height: 2,
                background: `linear-gradient(90deg, transparent, ${branch.color}, transparent)`,
                borderRadius: 1,
                marginTop: 'auto',
              }}
            />
          </motion.div>
        ))}
      </div>
    </Slide>
  );
}
