import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Slide, SlideTitle, SlideSubtitle } from '../../components/SlideLayout';

const GRID_SIZE = 5;
const CELL = 64;
const GAP = 2;

const path = [
  { r: 0, c: 0 },
  { r: 0, c: 1 },
  { r: 0, c: 2 },
  { r: 1, c: 2 },
  { r: 2, c: 2 },
  { r: 2, c: 3 },
  { r: 3, c: 3 },
  { r: 3, c: 4 },
  { r: 4, c: 4 },
];

const rewards: Record<string, number> = {
  '0,1': 0, '0,2': 0, '1,2': -1, '2,2': 0, '2,3': +1, '3,3': 0, '3,4': +1, '4,4': +10,
};

const obstacles = new Set(['1,1', '3,0', '2,4', '0,4']);

const loopSteps = ['OBSERVE', 'ACT', 'REWARD', 'LEARN'] as const;

export function ReinforcementLearning() {
  const [step, setStep] = useState(0);
  const [activeLoop, setActiveLoop] = useState(0);
  const [totalReward, setTotalReward] = useState(0);
  const [showReward, setShowReward] = useState<{ value: number; key: number } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev >= path.length - 1) return prev;
        const next = prev + 1;
        const pos = path[next];
        const key = `${pos.r},${pos.c}`;
        const r = rewards[key] ?? 0;
        if (r !== 0) {
          setShowReward({ value: r, key: Date.now() });
          setTotalReward((t) => t + r);
        }
        return next;
      });
      setActiveLoop((prev) => (prev + 1) % 4);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const agentPos = path[step];
  const gridWidth = GRID_SIZE * (CELL + GAP);

  return (
    <Slide background="var(--slide-bg)">
      <SlideTitle gradient="linear-gradient(135deg, #f97316, #eab308)">
        Reinforcement Learning
      </SlideTitle>

      <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', marginTop: '0.5rem' }}>
        {/* Grid */}
        <div style={{
          position: 'relative',
          width: gridWidth,
          height: gridWidth,
        }}>
          {Array.from({ length: GRID_SIZE }).map((_, r) =>
            Array.from({ length: GRID_SIZE }).map((_, c) => {
              const isGoal = r === GRID_SIZE - 1 && c === GRID_SIZE - 1;
              const isObstacle = obstacles.has(`${r},${c}`);
              return (
                <motion.div
                  key={`${r}-${c}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + (r * GRID_SIZE + c) * 0.02 }}
                  style={{
                    position: 'absolute',
                    left: c * (CELL + GAP),
                    top: r * (CELL + GAP),
                    width: CELL,
                    height: CELL,
                    borderRadius: 8,
                    background: isObstacle ? '#ef444420' : isGoal ? '#eab30815' : 'var(--subtle-bg)',
                    border: `1px solid ${isObstacle ? '#ef444440' : isGoal ? '#eab30850' : 'var(--subtle-border)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isGoal && (
                    <motion.svg
                      width="28" height="28" viewBox="0 0 24 24"
                      animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <polygon
                        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                        fill="#eab308"
                        opacity={0.8}
                      />
                    </motion.svg>
                  )}
                  {isObstacle && (
                    <span style={{ color: '#ef4444', fontSize: '1.2rem', opacity: 0.6 }}>X</span>
                  )}
                </motion.div>
              );
            })
          )}

          {/* Agent */}
          <motion.div
            animate={{
              left: agentPos.c * (CELL + GAP) + CELL / 2 - 14,
              top: agentPos.r * (CELL + GAP) + CELL / 2 - 14,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{
              position: 'absolute',
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4f8fff, #8b5cf6)',
              boxShadow: '0 0 15px #4f8fff80',
              zIndex: 10,
            }}
          />

          {/* Floating reward */}
          <AnimatePresence>
            {showReward && (
              <motion.div
                key={showReward.key}
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{ opacity: 0, y: -40, scale: 1.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  position: 'absolute',
                  left: agentPos.c * (CELL + GAP) + CELL / 2,
                  top: agentPos.r * (CELL + GAP) - 10,
                  transform: 'translateX(-50%)',
                  color: showReward.value > 0 ? '#10b981' : '#ef4444',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  zIndex: 20,
                  pointerEvents: 'none',
                }}
              >
                {showReward.value > 0 ? '+' : ''}{showReward.value}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Loop diagram */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {loopSteps.map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.15 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
              }}
            >
              <motion.div
                animate={{
                  background: i === activeLoop
                    ? 'linear-gradient(135deg, #f97316, #eab308)'
                    : 'var(--subtle-border)',
                  scale: i === activeLoop ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: i === activeLoop ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  fontWeight: 700,
                  border: `1px solid ${i === activeLoop ? '#f97316' : 'var(--subtle-border)'}`,
                }}
              >
                {i + 1}
              </motion.div>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.85rem',
                color: i === activeLoop ? '#eab308' : 'var(--text-secondary)',
                fontWeight: i === activeLoop ? 700 : 400,
                transition: 'color 0.3s',
              }}>
                {label}
              </span>
              {i < loopSteps.length - 1 && (
                <motion.div
                  style={{
                    position: 'absolute',
                    left: 18,
                    marginTop: 40,
                    width: 1,
                    height: 12,
                    background: 'var(--input-border)',
                  }}
                />
              )}
            </motion.div>
          ))}

          {/* Total reward */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            style={{
              marginTop: '1rem',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
            }}
          >
            Total reward:{' '}
            <motion.span
              key={totalReward}
              initial={{ scale: 1.5, color: '#10b981' }}
              animate={{ scale: 1, color: totalReward >= 0 ? '#10b981' : '#ef4444' }}
              style={{ fontWeight: 700 }}
            >
              {totalReward >= 0 ? '+' : ''}{totalReward}
            </motion.span>
          </motion.div>
        </div>
      </div>

      <SlideSubtitle delay={0.8}>
        No fixed dataset. The model learns by trial and error.
      </SlideSubtitle>
    </Slide>
  );
}
