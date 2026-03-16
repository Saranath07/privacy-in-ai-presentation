import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Slide, SlideTitle } from '../../components/SlideLayout';

interface BarData {
  label: string;
  value: number;
  inTraining: boolean;
}

const standardData: BarData[] = [
  { label: 'A', value: 92, inTraining: true },
  { label: 'B', value: 88, inTraining: true },
  { label: 'C', value: 95, inTraining: true },
  { label: 'D', value: 55, inTraining: false },
  { label: 'E', value: 52, inTraining: false },
  { label: 'F', value: 58, inTraining: false },
];

const dpData: BarData[] = [
  { label: 'A', value: 65, inTraining: true },
  { label: 'B', value: 62, inTraining: true },
  { label: 'C', value: 68, inTraining: true },
  { label: 'D', value: 60, inTraining: false },
  { label: 'E', value: 66, inTraining: false },
  { label: 'F', value: 63, inTraining: false },
];

function BarChart({ data, delay, borderColor }: { data: BarData[]; delay: number; borderColor: string }) {
  const maxVal = 100;
  const barWidth = 36;
  const barGap = 8;
  const chartHeight = 180;

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: barGap, height: chartHeight, padding: '0 8px' }}>
      {data.map((d, i) => {
        const height = (d.value / maxVal) * chartHeight;
        const color = d.inTraining
          ? (borderColor === '#ef4444' ? '#ef4444' : '#10b981')
          : (borderColor === '#ef4444' ? '#6b7280' : '#6b7280');
        return (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.8 + i * 0.1 }}
              style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}
            >
              {d.value}%
            </motion.div>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height, opacity: 1 }}
              transition={{ duration: 0.8, delay: delay + i * 0.12, ease: 'easeOut' }}
              style={{
                width: barWidth,
                borderRadius: '6px 6px 0 0',
                background: `${color}30`,
                border: `1px solid ${color}60`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: '100%' }}
                transition={{ duration: 0.8, delay: delay + i * 0.12 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  background: `linear-gradient(180deg, ${color}60, ${color}20)`,
                }}
              />
            </motion.div>
            <span style={{
              fontSize: '0.6rem',
              color: d.inTraining ? 'var(--text-primary)' : '#6b7280',
              fontWeight: 600,
            }}>
              {d.inTraining ? 'Train' : 'Non'}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function AttackComparison() {
  const [showDetective, setShowDetective] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowDetective(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Slide background="var(--slide-bg)">
      <SlideTitle gradient="linear-gradient(135deg, #ef4444, #10b981)">
        The Attack Fails
      </SlideTitle>

      <div style={{
        display: 'flex',
        gap: '2.5rem',
        width: '100%',
        maxWidth: 850,
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
        {/* Standard Model */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            flex: 1,
            padding: '1.5rem',
            borderRadius: 16,
            background: 'var(--bg-card)',
            border: '2px solid #ef444460',
            boxShadow: '0 0 30px rgba(239,68,68,0.1)',
            textAlign: 'center',
          }}
        >
          <div style={{
            fontSize: '1rem',
            fontWeight: 800,
            color: '#ef4444',
            marginBottom: '1rem',
          }}>
            Standard Model
          </div>

          <BarChart data={standardData} delay={0.5} borderColor="#ef4444" />

          {/* Gap indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
            style={{
              marginTop: '0.8rem',
              fontSize: '0.7rem',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10">
              <line x1="1" y1="2" x2="9" y2="2" stroke="#ef4444" strokeWidth="1.5" />
              <line x1="5" y1="2" x2="5" y2="8" stroke="#ef4444" strokeWidth="1.5" />
              <line x1="1" y1="8" x2="9" y2="8" stroke="#ef4444" strokeWidth="1.5" />
            </svg>
            Clear gap between groups
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              boxShadow: ['0 0 10px rgba(239,68,68,0.2)', '0 0 25px rgba(239,68,68,0.4)', '0 0 10px rgba(239,68,68,0.2)'],
            }}
            transition={{
              opacity: { delay: 2.5 },
              scale: { delay: 2.5, type: 'spring' },
              boxShadow: { delay: 2.5, duration: 2, repeat: Infinity },
            }}
            style={{
              marginTop: '1rem',
              display: 'inline-block',
              padding: '6px 18px',
              borderRadius: 20,
              background: 'rgba(239,68,68,0.15)',
              border: '1px solid #ef4444',
              color: '#ef4444',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
            }}
          >
            VULNERABLE
          </motion.div>

          {/* Detective result */}
          {showDetective && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                marginTop: '1rem',
                fontSize: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 700 }}>Attack succeeds</span>
            </motion.div>
          )}
        </motion.div>

        {/* DP Model */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            flex: 1,
            padding: '1.5rem',
            borderRadius: 16,
            background: 'var(--bg-card)',
            border: '2px solid #10b98160',
            boxShadow: '0 0 30px rgba(16,185,129,0.1)',
            textAlign: 'center',
          }}
        >
          <div style={{
            fontSize: '1rem',
            fontWeight: 800,
            color: '#10b981',
            marginBottom: '1rem',
          }}>
            DP Model
          </div>

          <BarChart data={dpData} delay={0.8} borderColor="#10b981" />

          {/* No gap indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3 }}
            style={{
              marginTop: '0.8rem',
              fontSize: '0.7rem',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10">
              <line x1="1" y1="5" x2="9" y2="5" stroke="#10b981" strokeWidth="2" />
            </svg>
            No visible gap
          </motion.div>

          {/* Shield badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.8, type: 'spring' }}
            style={{
              marginTop: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 18px',
              borderRadius: 20,
              background: 'rgba(16,185,129,0.15)',
              border: '1px solid #10b981',
              color: '#10b981',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#10b981" stroke="none">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            PROTECTED
          </motion.div>

          {/* Detective result */}
          {showDetective && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                marginTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ fontSize: '1.3rem', color: 'var(--text-secondary)' }}
              >
                ???
              </motion.span>
              <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 700 }}>Attack fails</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Slide>
  );
}
