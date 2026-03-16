import { motion } from 'framer-motion';
import { useState } from 'react';
import { Slide, SlideTitle } from '../../components/SlideLayout';

interface ScenarioProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
  delay: number;
}

function ScenarioCard({ icon, title, subtitle, color, delay }: ScenarioProps) {
  const [epsilon, setEpsilon] = useState(3);

  const privacyColor = epsilon <= 2 ? '#10b981' : epsilon <= 6 ? '#eab308' : '#ef4444';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, type: 'spring', bounce: 0.2 }}
      style={{
        flex: 1,
        padding: '1.5rem 1.2rem',
        borderRadius: 16,
        background: 'var(--bg-card)',
        border: `1px solid ${color}40`,
        boxShadow: `0 0 25px ${color}10`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.8rem',
        minWidth: 200,
      }}
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2, type: 'spring', bounce: 0.4 }}
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: `${color}15`,
          border: `2px solid ${color}40`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </motion.div>

      {/* Title */}
      <div style={{
        color: 'var(--text-primary)',
        fontWeight: 800,
        fontSize: '0.95rem',
        textAlign: 'center',
        lineHeight: 1.3,
      }}>
        {title}
      </div>

      {/* Subtitle */}
      <div style={{
        color: 'var(--text-secondary)',
        fontSize: '0.72rem',
        textAlign: 'center',
        lineHeight: 1.4,
      }}>
        {subtitle}
      </div>

      {/* Epsilon slider */}
      <div style={{ width: '100%', padding: '0 8px', marginTop: '0.3rem' }}>
        <div style={{
          textAlign: 'center',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '1rem',
          fontWeight: 800,
          color: privacyColor,
          marginBottom: 4,
          transition: 'color 0.3s',
        }}>
          {String.fromCharCode(949)} = {epsilon.toFixed(1)}
        </div>
        <input
          type="range"
          min={0.1}
          max={10}
          step={0.1}
          value={epsilon}
          onChange={(e) => setEpsilon(parseFloat(e.target.value))}
          style={{
            width: '100%',
            height: 6,
            borderRadius: 3,
            appearance: 'none',
            WebkitAppearance: 'none',
            background: `linear-gradient(90deg, #10b981, #eab308, #ef4444)`,
            outline: 'none',
            cursor: 'pointer',
          }}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.55rem',
          color: '#6b7280',
          marginTop: 3,
        }}>
          <span>Strong Privacy</span>
          <span>Weak Privacy</span>
        </div>
      </div>
    </motion.div>
  );
}

// Simple SVG icons
function HospitalIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4v18" />
      <path d="M19 21V11l-6-4" />
      <path d="M9 9h1" /><path d="M9 13h1" /><path d="M9 17h1" />
    </svg>
  );
}

function SocialIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4f8fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 2h4v4" /><path d="M3 22l18-18" />
      <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function UniversityIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
    </svg>
  );
}

export function WhereWouldYouSetTheDial() {
  return (
    <Slide background="var(--slide-bg)">
      <SlideTitle gradient="linear-gradient(135deg, #8b5cf6, #eab308)">
        Where Would You Set the Dial?
      </SlideTitle>

      <div style={{
        display: 'flex',
        gap: '1.5rem',
        width: '100%',
        maxWidth: 850,
        justifyContent: 'center',
        alignItems: 'stretch',
        flexWrap: 'wrap',
      }}>
        <ScenarioCard
          icon={<HospitalIcon />}
          title="Tumor Detection Model"
          subtitle="Training on patient scans"
          color="#ef4444"
          delay={0.4}
        />
        <ScenarioCard
          icon={<SocialIcon />}
          title="Recommendation Model"
          subtitle="Training on user posts"
          color="#4f8fff"
          delay={0.7}
        />
        <ScenarioCard
          icon={<UniversityIcon />}
          title="Plagiarism Detector"
          subtitle="Training on student submissions"
          color="#8b5cf6"
          delay={1.0}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0 }}
        style={{
          marginTop: '1.5rem',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          textAlign: 'center',
          fontStyle: 'italic',
        }}
      >
        No right answers. This is a <span style={{ color: '#eab308', fontWeight: 700 }}>policy decision</span>.
      </motion.div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--text-primary);
          cursor: pointer;
          box-shadow: 0 0 8px rgba(255,255,255,0.3);
          border: 2px solid #8b5cf6;
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--text-primary);
          cursor: pointer;
          border: 2px solid #8b5cf6;
        }
      `}</style>
    </Slide>
  );
}
