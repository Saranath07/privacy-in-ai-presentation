import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Slide, SlideTitle } from '../../components/SlideLayout';

const modelSizes = [
  { label: '125M', rate: 15 },
  { label: '350M', rate: 25 },
  { label: '1.3B', rate: 42 },
  { label: '2.7B', rate: 58 },
  { label: '6.7B', rate: 78 },
];

const epochData = [
  { epoch: 1, rate: 8 },
  { epoch: 2, rate: 18 },
  { epoch: 3, rate: 32 },
  { epoch: 5, rate: 48 },
  { epoch: 10, rate: 65 },
  { epoch: 20, rate: 78 },
  { epoch: 50, rate: 88 },
];

function BarChart() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const maxRate = 100;
  const barMaxHeight = 200;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        style={{
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          fontWeight: 600,
          marginBottom: '0.5rem',
          letterSpacing: '0.05em',
        }}
      >
        MODEL SIZE vs MEMORIZATION
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '1.2rem',
          height: barMaxHeight + 40,
          padding: '0 1rem',
        }}
      >
        {/* Y-axis label */}
        <div
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontSize: '0.6rem',
            color: 'var(--text-secondary)',
            marginRight: -4,
          }}
        >
          Memorization Rate (%)
        </div>

        {modelSizes.map((model, idx) => {
          const barHeight = (model.rate / maxRate) * barMaxHeight;
          const hue = 0 + idx * 15; // red to orange range
          const color = `hsl(${hue}, 80%, 55%)`;

          return (
            <div
              key={model.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              {/* Rate label */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={animate ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 + idx * 0.2 }}
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color,
                }}
              >
                {model.rate}%
              </motion.span>

              {/* Bar */}
              <motion.div
                initial={{ height: 0 }}
                animate={animate ? { height: barHeight } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + idx * 0.15,
                  ease: 'easeOut',
                }}
                style={{
                  width: 44,
                  borderRadius: '6px 6px 2px 2px',
                  background: `linear-gradient(180deg, ${color}, ${color}80)`,
                  boxShadow: `0 0 15px ${color}30`,
                  position: 'relative',
                }}
              >
                {/* Glow effect on top */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    borderRadius: '6px 6px 0 0',
                    background: `${color}`,
                    boxShadow: `0 0 8px ${color}80`,
                  }}
                />
              </motion.div>

              {/* Label */}
              <span
                style={{
                  fontSize: '0.65rem',
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  marginTop: 2,
                }}
              >
                {model.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* X-axis label */}
      <div
        style={{
          fontSize: '0.6rem',
          color: 'var(--text-secondary)',
          marginTop: 8,
        }}
      >
        Model Parameters
      </div>
    </div>
  );
}

function EpochLine() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const chartWidth = 280;
  const chartHeight = 140;
  const padding = { top: 10, right: 15, bottom: 25, left: 35 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const maxEpoch = 50;
  const maxRate = 100;

  const points = epochData.map((d) => ({
    x: padding.left + (d.epoch / maxEpoch) * innerWidth,
    y: padding.top + innerHeight - (d.rate / maxRate) * innerHeight,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        style={{
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          fontWeight: 600,
          marginBottom: '0.5rem',
          letterSpacing: '0.05em',
        }}
      >
        TRAINING EPOCHS vs MEMORIZATION
      </div>
      <svg width={chartWidth} height={chartHeight}>
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((val) => {
          const y = padding.top + innerHeight - (val / maxRate) * innerHeight;
          return (
            <g key={val}>
              <line
                x1={padding.left}
                y1={y}
                x2={chartWidth - padding.right}
                y2={y}
                stroke="var(--card-border)"
                strokeWidth="0.5"
              />
              <text
                x={padding.left - 5}
                y={y + 3}
                textAnchor="end"
                fill="var(--text-secondary)"
                fontSize="7"
              >
                {val}%
              </text>
            </g>
          );
        })}

        {/* Axes */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + innerHeight}
          stroke="#444"
          strokeWidth="1"
        />
        <line
          x1={padding.left}
          y1={padding.top + innerHeight}
          x2={chartWidth - padding.right}
          y2={padding.top + innerHeight}
          stroke="#444"
          strokeWidth="1"
        />

        {/* Axis labels */}
        <text
          x={chartWidth / 2}
          y={chartHeight - 2}
          textAnchor="middle"
          fill="var(--text-secondary)"
          fontSize="7"
        >
          Training Epochs
        </text>

        {/* The animated line */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#epochGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={animate ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 4px rgba(139,92,246,0.4))' }}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="epochGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f8fff" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>

        {/* Data points */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3"
            fill="var(--text-primary)"
            stroke="#8b5cf6"
            strokeWidth="1.5"
            initial={{ opacity: 0, scale: 0 }}
            animate={animate ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 2.0 + i * 0.15 }}
          />
        ))}
      </svg>
    </div>
  );
}

export function WhyModelsMemorize() {
  return (
    <Slide background="var(--slide-bg)">
      <SlideTitle gradient="linear-gradient(135deg, #ef4444, #8b5cf6)">
        Why Models Memorize
      </SlideTitle>

      <div
        style={{
          display: 'flex',
          gap: '3rem',
          width: '100%',
          maxWidth: 900,
          marginTop: '1.5rem',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        {/* Bar chart: model size */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            background: 'var(--bg-card)',
            borderRadius: 16,
            padding: '1.5rem',
            border: '1px solid var(--card-border)',
          }}
        >
          <BarChart />
        </motion.div>

        {/* Line chart: epochs */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            background: 'var(--bg-card)',
            borderRadius: 16,
            padding: '1.5rem',
            border: '1px solid var(--card-border)',
          }}
        >
          <EpochLine />
        </motion.div>
      </div>

      {/* Insight arrows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        style={{
          display: 'flex',
          gap: '2rem',
          marginTop: '1.5rem',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
          }}
        >
          <span style={{ color: '#ef4444', fontSize: '1.2rem' }}>+</span>
          Bigger model
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
          }}
        >
          <span style={{ color: '#ef4444', fontSize: '1.2rem' }}>+</span>
          More epochs
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
          }}
        >
          <span style={{ color: '#ef4444', fontSize: '1.2rem' }}>=</span>
          <span style={{ color: '#ef4444', fontWeight: 700 }}>More memorization</span>
        </div>
      </motion.div>

      {/* Final message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4.2, duration: 0.8 }}
        style={{
          marginTop: '1.5rem',
          textAlign: 'center',
        }}
      >
        <motion.h3
          animate={{
            textShadow: [
              '0 0 10px rgba(139,92,246,0.2)',
              '0 0 25px rgba(139,92,246,0.5)',
              '0 0 10px rgba(139,92,246,0.2)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
            fontWeight: 900,
            color: '#8b5cf6',
          }}
        >
          This is fundamental. Not a bug.
        </motion.h3>
      </motion.div>
    </Slide>
  );
}
