import { motion } from 'framer-motion';
import { Slide, SlideTitle } from '../../components/SlideLayout';

function DatabaseBox({ x, y, label, hasYou, delay }: {
  x: number; y: number; label: string; hasYou: boolean; delay: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, type: 'spring' }}
    >
      {/* Database rectangle */}
      <rect
        x={x - 70}
        y={y - 45}
        width={140}
        height={90}
        rx={14}
        fill={hasYou ? 'rgba(16,185,129,0.1)' : 'rgba(79,143,255,0.1)'}
        stroke={hasYou ? '#10b981' : '#4f8fff'}
        strokeWidth={2.5}
      />
      {/* Data rows */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={x - 50}
          y={y - 30 + i * 16}
          width={100}
          height={10}
          rx={3}
          fill={hasYou && i === 1 ? '#10b98140' : 'var(--input-bg)'}
          stroke={hasYou && i === 1 ? '#10b981' : 'none'}
          strokeWidth={hasYou && i === 1 ? 1.5 : 0}
        />
      ))}
      {/* "You" marker */}
      {hasYou && (
        <motion.g
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <circle cx={x + 60} cy={y - 14} r={6} fill="#10b981" />
          <text x={x + 60} y={y - 24} textAnchor="middle" fill="#10b981" fontSize={13} fontWeight={800} fontFamily="Inter, sans-serif">
            You
          </text>
        </motion.g>
      )}
      {/* Label */}
      <text
        x={x}
        y={y + 62}
        textAnchor="middle"
        fill={hasYou ? '#10b981' : '#4f8fff'}
        fontSize={15}
        fontWeight={700}
        fontFamily="Inter, sans-serif"
      >
        {label}
      </text>
    </motion.g>
  );
}

function AlgorithmBox({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring' }}
    >
      <rect
        x={x - 55}
        y={y - 25}
        width={110}
        height={50}
        rx={12}
        fill="rgba(139,92,246,0.15)"
        stroke="#8b5cf6"
        strokeWidth={2.5}
      />
      {/* Gear icon paths */}
      <text x={x} y={y + 8} textAnchor="middle" fill="#8b5cf6" fontSize={16} fontWeight={800} fontFamily="Inter, sans-serif">
        Algorithm
      </text>
    </motion.g>
  );
}

function GaussianCurve({ cx, cy, color, delay, width = 180, height = 100, fillOpacity = 0.08 }: {
  cx: number; cy: number; color: string; delay: number; width?: number; height?: number; fillOpacity?: number;
}) {
  const points: string[] = [];
  const steps = 80;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * 2 - 1;
    const x = cx + t * (width / 2);
    const y = cy - Math.exp(-t * t * 4) * height;
    points.push(`${i === 0 ? 'M' : 'L'}${x},${y}`);
  }
  const d = points.join(' ');
  const fillD = d + ` L${cx + width / 2},${cy} L${cx - width / 2},${cy} Z`;

  return (
    <motion.g>
      <motion.path
        d={fillD}
        fill={color}
        opacity={fillOpacity}
        initial={{ opacity: 0 }}
        animate={{ opacity: fillOpacity }}
        transition={{ duration: 0.8, delay }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={3.5}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay, ease: 'easeOut' }}
      />
    </motion.g>
  );
}

function Arrow({ x1, y1, x2, y2, delay }: { x1: number; y1: number; x2: number; y2: number; delay: number }) {
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="rgba(139,92,246,0.5)"
      strokeWidth={2.5}
      strokeLinecap="round"
      markerEnd="url(#arrowDP)"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay }}
    />
  );
}

export function DPCoreConcept() {
  const leftX = 130;
  const rightX = 670;
  const topY = 60;
  const algoY = 60;
  const curveY = 280;

  return (
    <Slide background="var(--slide-bg)">
      <SlideTitle gradient="linear-gradient(135deg, #8b5cf6, #4f8fff)">
        Differential Privacy: The Core Idea
      </SlideTitle>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ width: '100%', maxWidth: 900, display: 'flex', justifyContent: 'center' }}
      >
        <svg viewBox="0 0 800 420" width="100%" style={{ maxHeight: '55vh' }}>
          <defs>
            <marker id="arrowDP" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" opacity={0.7} />
            </marker>
          </defs>

          {/* Scenario A label */}
          <motion.text
            x={leftX + 130} y={topY - 30}
            textAnchor="middle" fill="#10b981" fontSize={16} fontWeight={800} fontFamily="Inter, sans-serif"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          >
            Scenario A
          </motion.text>

          {/* Scenario B label */}
          <motion.text
            x={rightX - 130} y={topY - 30}
            textAnchor="middle" fill="#4f8fff" fontSize={16} fontWeight={800} fontFamily="Inter, sans-serif"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          >
            Scenario B
          </motion.text>

          {/* Database A: WITH your data */}
          <DatabaseBox x={leftX} y={topY + 20} label="WITH your data" hasYou={true} delay={0.6} />

          {/* Database B: WITHOUT your data */}
          <DatabaseBox x={rightX} y={topY + 20} label="WITHOUT your data" hasYou={false} delay={0.8} />

          {/* Single shared Algorithm box in center */}
          <AlgorithmBox x={400} y={algoY + 20} delay={1.4} />

          {/* Arrows: DB -> Algorithm */}
          <Arrow x1={leftX + 75} y1={topY + 20} x2={340} y2={algoY + 20} delay={1.1} />
          <Arrow x1={rightX - 75} y1={topY + 20} x2={460} y2={algoY + 20} delay={1.2} />

          {/* Arrows: Algorithm -> Output */}
          <Arrow x1={370} y1={algoY + 48} x2={320} y2={curveY - 110} delay={1.8} />
          <Arrow x1={430} y1={algoY + 48} x2={480} y2={curveY - 110} delay={1.9} />

          {/* Output label A */}
          <motion.text
            x={280} y={curveY - 115}
            textAnchor="middle" fill="#10b981" fontSize={14} fontWeight={700} fontFamily="Inter, sans-serif"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
          >
            Distribution A
          </motion.text>

          {/* Output label B */}
          <motion.text
            x={520} y={curveY - 115}
            textAnchor="middle" fill="#4f8fff" fontSize={14} fontWeight={700} fontFamily="Inter, sans-serif"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
          >
            Distribution B
          </motion.text>

          {/* Nearly-overlapping Gaussian curves */}
          <motion.g
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <GaussianCurve cx={400} cy={curveY + 20} color="#10b981" delay={2.4} width={280} height={110} fillOpacity={0.06} />
            <GaussianCurve cx={410} cy={curveY + 22} color="#4f8fff" delay={2.6} width={275} height={105} fillOpacity={0.06} />
          </motion.g>

          {/* Approx equal sign */}
          <motion.text
            x={405} y={curveY + 70}
            textAnchor="middle"
            fill="var(--text-primary)"
            fontSize={40}
            fontWeight={900}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.2, type: 'spring', bounce: 0.4 }}
          >
            {'\u2248'}
          </motion.text>
        </svg>
      </motion.div>

      {/* Key insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 0.7 }}
        style={{
          fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
          color: 'var(--text-primary)',
          textAlign: 'center',
          fontWeight: 800,
          marginTop: '0.5rem',
          padding: '12px 32px',
          borderRadius: 14,
          background: 'rgba(139,92,246,0.08)',
          border: '1px solid rgba(139,92,246,0.2)',
        }}
      >
        Adding or removing <span style={{ color: '#10b981' }}>ONE person</span> barely changes the output
      </motion.div>
    </Slide>
  );
}
