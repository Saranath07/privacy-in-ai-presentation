import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Slide, SlideTitle } from '../../components/SlideLayout';

function GradientArrow({ x, y, length, clipped, delay }: {
  x: number; y: number; length: number; clipped: boolean; delay: number;
}) {
  const maxLen = clipped ? Math.min(length, 40) : length;
  const color = clipped ? '#4f8fff' : '#8b5cf6';

  return (
    <motion.g>
      <motion.line
        x1={x}
        y1={y}
        x2={x + maxLen}
        y2={y}
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay }}
      />
      <motion.polygon
        points={`${x + maxLen},${y - 4} ${x + maxLen + 8},${y} ${x + maxLen},${y + 4}`}
        fill={color}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.4 }}
      />
      {/* Clip line */}
      {clipped && length > 40 && (
        <motion.line
          x1={x + 40}
          y1={y - 8}
          x2={x + 40}
          y2={y + 8}
          stroke="#ef4444"
          strokeWidth={2}
          strokeDasharray="3,2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.6 }}
        />
      )}
    </motion.g>
  );
}

export function DPSGDSteps() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 4000),
      setTimeout(() => setStep(3), 7000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const gradientLengths = [65, 30, 80, 45, 70, 25];
  const yPositions = [25, 55, 85, 115, 145, 175];

  return (
    <Slide background="var(--slide-bg)">
      <SlideTitle gradient="linear-gradient(135deg, #4f8fff, #10b981)">
        DP-SGD: Training with Privacy
      </SlideTitle>

      <div style={{
        display: 'flex',
        gap: '2rem',
        width: '100%',
        maxWidth: 900,
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}>
        {/* Step indicators */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 200 }}>
          {/* Step 1: CLIP */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: step >= 1 ? 1 : 0.3, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              padding: '16px 20px',
              borderRadius: 14,
              background: step >= 1 ? 'rgba(239,68,68,0.1)' : 'var(--subtle-bg)',
              border: step >= 1 ? '1px solid #ef444460' : '1px solid var(--subtle-border)',
              transition: 'all 0.5s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: '1.2rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
                  <line x1="8.12" y1="15.88" x2="18" y2="6" />
                  <line x1="8.12" y1="8.12" x2="18" y2="18" />
                </svg>
              </span>
              <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '1rem' }}>CLIP</span>
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: 1.5 }}>
              Limit each example's influence
            </div>
          </motion.div>

          {/* Step 2: NOISE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: step >= 2 ? 1 : 0.3, x: 0 }}
            transition={{ duration: 0.5, delay: step >= 2 ? 0 : 0.2 }}
            style={{
              padding: '16px 20px',
              borderRadius: 14,
              background: step >= 2 ? 'rgba(139,92,246,0.1)' : 'var(--subtle-bg)',
              border: step >= 2 ? '1px solid #8b5cf660' : '1px solid var(--subtle-border)',
              transition: 'all 0.5s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
                <path d="M12 2l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z" />
              </svg>
              <span style={{ color: '#8b5cf6', fontWeight: 800, fontSize: '1rem' }}>NOISE</span>
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: 1.5 }}>
              Add calibrated noise
            </div>
          </motion.div>

          {/* Step 3: BUDGET */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: step >= 3 ? 1 : 0.3, x: 0 }}
            transition={{ duration: 0.5, delay: step >= 3 ? 0 : 0.4 }}
            style={{
              padding: '16px 20px',
              borderRadius: 14,
              background: step >= 3 ? 'rgba(234,179,8,0.1)' : 'var(--subtle-bg)',
              border: step >= 3 ? '1px solid #eab30860' : '1px solid var(--subtle-border)',
              transition: 'all 0.5s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span style={{ color: '#eab308', fontWeight: 800, fontSize: '1rem' }}>BUDGET</span>
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: 1.5 }}>
              Track privacy spending
            </div>
          </motion.div>
        </div>

        {/* Visualization area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            flex: 1,
            maxWidth: 500,
            minHeight: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg viewBox="0 0 350 220" width="100%">
            {/* Gradient arrows */}
            {gradientLengths.map((len, i) => (
              <GradientArrow
                key={i}
                x={30}
                y={yPositions[i]}
                length={len}
                clipped={step >= 1}
                delay={step >= 1 ? i * 0.1 : 0}
              />
            ))}

            {/* Noise particles overlay (step 2) */}
            {step >= 2 && Array.from({ length: 30 }).map((_, i) => {
              const baseX = 30 + Math.random() * 80;
              const baseY = 20 + Math.random() * 165;
              return (
                <motion.circle
                  key={`noise-${i}`}
                  cx={baseX}
                  cy={baseY}
                  r={1.5}
                  fill="#8b5cf6"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.7, 0],
                    cx: baseX + (Math.random() - 0.5) * 40,
                    cy: baseY + (Math.random() - 0.5) * 20,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.05,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              );
            })}

            {/* Budget gauge (step 3) */}
            {step >= 3 && (
              <motion.g
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Gauge background */}
                <rect x={180} y={40} width={140} height={20} rx={10}
                  fill="var(--input-bg)" stroke="var(--input-border)" strokeWidth={1} />
                {/* Gauge fill - depleting */}
                <motion.rect
                  x={182} y={42} height={16} rx={8}
                  fill="url(#gaugeGradient)"
                  initial={{ width: 136 }}
                  animate={{ width: [136, 100, 70, 50] }}
                  transition={{ duration: 3, ease: 'easeOut' }}
                />
                <text x={250} y={35} textAnchor="middle" fill="#eab308" fontSize={11} fontWeight={700}
                  fontFamily="Inter, sans-serif">
                  Privacy Budget
                </text>
                <text x={250} y={80} textAnchor="middle" fill="var(--text-secondary)" fontSize={9} fontFamily="Inter, sans-serif">
                  Each step spends a bit of budget
                </text>

                {/* Epsilon labels */}
                <motion.text
                  x={250} y={100}
                  textAnchor="middle"
                  fill="#eab308"
                  fontSize={22}
                  fontWeight={900}
                  fontFamily="JetBrains Mono, monospace"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {String.fromCharCode(949)} remaining
                </motion.text>

                <defs>
                  <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#eab308" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
              </motion.g>
            )}
          </svg>
        </motion.div>
      </div>
    </Slide>
  );
}
