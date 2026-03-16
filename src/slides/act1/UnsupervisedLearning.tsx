import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { Slide, SlideTitle, SlideSubtitle } from '../../components/SlideLayout';

const CLUSTER_COLORS = ['#4f8fff', '#8b5cf6', '#10b981'];
const NUM_DOTS = 36;
const ANOMALY_INDEX = 15;

const W = 700;
const H = 400;

const clusterCenters = [
  { x: 170, y: 160 },
  { x: 420, y: 140 },
  { x: 300, y: 310 },
];

interface DotData {
  cluster: number;
  randomX: number;
  randomY: number;
  clusterX: number;
  clusterY: number;
}

function generateDots(): DotData[] {
  return Array.from({ length: NUM_DOTS }, (_, i) => {
    const cluster = i % 3;
    const center = clusterCenters[cluster];
    return {
      cluster,
      randomX: 40 + Math.random() * (W - 80),
      randomY: 30 + Math.random() * (H - 60),
      clusterX: center.x + (Math.random() - 0.5) * 90,
      clusterY: center.y + (Math.random() - 0.5) * 70,
    };
  });
}

export function UnsupervisedLearning() {
  const dots = useMemo(() => generateDots(), []);
  const [phase, setPhase] = useState<'scattered' | 'clustered' | 'anomaly'>('scattered');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('clustered'), 2000);
    const t2 = setTimeout(() => setPhase('anomaly'), 4500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const clustered = phase === 'clustered' || phase === 'anomaly';
  const CIRCLE_R = 70;

  return (
    <Slide background="var(--slide-bg)">
      <SlideTitle gradient="linear-gradient(135deg, #8b5cf6, #10b981)">
        Unsupervised Learning
      </SlideTitle>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 700, margin: '0.5rem auto' }}>
        {/* Cluster circles */}
        {clustered && clusterCenters.map((c, i) => (
          <motion.circle
            key={`ring-${i}`}
            cx={c.x}
            cy={c.y}
            r={CIRCLE_R}
            fill={`${CLUSTER_COLORS[i]}10`}
            stroke={CLUSTER_COLORS[i]}
            strokeWidth={1.5}
            strokeDasharray="6,4"
            initial={{ opacity: 0, r: 20 }}
            animate={{ opacity: 0.6, r: CIRCLE_R }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
        ))}

        {/* Dots */}
        {dots.map((dot, i) => {
          const isAnomaly = phase === 'anomaly' && i === ANOMALY_INDEX;
          const tx = isAnomaly ? 600 : (clustered ? dot.clusterX : dot.randomX);
          const ty = isAnomaly ? 60 : (clustered ? dot.clusterY : dot.randomY);
          const color = isAnomaly ? '#ef4444' : CLUSTER_COLORS[dot.cluster];
          const r = isAnomaly ? 7 : 4.5;

          return (
            <motion.circle
              key={i}
              r={r}
              fill={color}
              initial={{ cx: dot.randomX, cy: dot.randomY, opacity: 0 }}
              animate={{
                cx: tx,
                cy: ty,
                opacity: 1,
              }}
              transition={{
                cx: { duration: 1.2, ease: 'easeInOut', delay: i * 0.02 },
                cy: { duration: 1.2, ease: 'easeInOut', delay: i * 0.02 },
                opacity: { duration: 0.5, delay: i * 0.03 },
              }}
            />
          );
        })}

        {/* Anomaly glow */}
        {phase === 'anomaly' && (
          <>
            <motion.circle
              cx={600} cy={60} r={14}
              fill="none"
              stroke="#ef4444"
              strokeWidth={1.5}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0], r: [10, 20, 10] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.text
              x={600} y={30}
              textAnchor="middle"
              fill="#ef4444"
              fontSize={13}
              fontFamily="JetBrains Mono, monospace"
              fontWeight={700}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ANOMALY
            </motion.text>
          </>
        )}

        {/* Cluster labels */}
        {clustered && clusterCenters.map((c, i) => (
          <motion.text
            key={`label-${i}`}
            x={c.x}
            y={c.y - CIRCLE_R - 8}
            textAnchor="middle"
            fill={CLUSTER_COLORS[i]}
            fontSize={12}
            fontFamily="Inter, sans-serif"
            fontWeight={600}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.2 }}
          >
            Cluster {i + 1}
          </motion.text>
        ))}
      </svg>

      <SlideSubtitle delay={0.6}>
        No labels. The model discovers patterns on its own.
      </SlideSubtitle>
    </Slide>
  );
}
