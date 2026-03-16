import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Slide, SlideTitle } from '../../components/SlideLayout';

function DotVisualization({ total }: { total: number }) {
  const dots = useMemo(() => {
    const result: { color: string; label: string }[] = [];
    for (let i = 0; i < total; i++) {
      const firstFlip = Math.random() < 0.5;
      if (firstFlip) {
        const truth = Math.random() < 0.3;
        result.push({
          color: truth ? '#10b981' : '#6b7280',
          label: truth ? 'truth-yes' : 'truth-no',
        });
      } else {
        const secondFlip = Math.random() < 0.5;
        result.push({
          color: secondFlip ? '#4f8fff' : '#6b7280',
          label: secondFlip ? 'forced-yes' : 'forced-no',
        });
      }
    }
    return result;
  }, [total]);

  const raised = dots.filter((d) => d.color !== '#6b7280').length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ marginTop: '1rem' }}
    >
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 5,
        justifyContent: 'center',
        maxWidth: 600,
        margin: '0 auto',
      }}>
        {dots.map((dot, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.006, duration: 0.2 }}
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: dot.color,
              boxShadow: dot.color !== '#6b7280' ? `0 0 8px ${dot.color}60` : 'none',
            }}
          />
        ))}
      </div>
      <div style={{
        display: 'flex',
        gap: '2rem',
        justifyContent: 'center',
        marginTop: '1rem',
        fontSize: '0.95rem',
        color: 'var(--text-secondary)',
      }}>
        <span><span style={{ color: '#10b981' }}>●</span> Truthful Yes</span>
        <span><span style={{ color: '#4f8fff' }}>●</span> Forced Yes</span>
        <span><span style={{ color: '#6b7280' }}>●</span> No / Hand Down</span>
      </div>
      <div style={{ textAlign: 'center', marginTop: '0.5rem', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700 }}>
        Hands raised: <strong style={{ color: '#10b981' }}>{raised}</strong> / {total}
      </div>
    </motion.div>
  );
}

export function CoinFlipCalculator() {
  const [totalPeople, setTotalPeople] = useState<string>('');
  const [handsRaised, setHandsRaised] = useState<string>('');
  const [showSim, setShowSim] = useState(false);

  const total = parseInt(totalPeople) || 0;
  const hands = parseInt(handsRaised) || 0;
  const hasInput = total > 0 && hands >= 0;

  const forcedYes = total / 4;
  const truthfulPool = total / 2;
  const estimatedTrue = truthfulPool > 0 ? ((hands - forcedYes) / truthfulPool) * 100 : 0;
  const clampedEstimate = Math.max(0, Math.min(100, estimatedTrue));

  // Visual bar widths
  const barWidth = 100;
  const headsWidth = barWidth / 2;
  const forcedYesWidth = headsWidth / 2;
  const forcedNoWidth = headsWidth / 2;

  const inputStyle: React.CSSProperties = {
    background: 'var(--input-bg)',
    border: '2px solid rgba(79,143,255,0.4)',
    borderRadius: 14,
    padding: '14px 20px',
    color: 'var(--text-primary)',
    fontSize: '1.4rem',
    fontFamily: 'JetBrains Mono, monospace',
    fontWeight: 700,
    width: 150,
    textAlign: 'center',
    outline: 'none',
  };

  return (
    <Slide background="var(--slide-bg)">
      <SlideTitle gradient="linear-gradient(135deg, #4f8fff, #10b981)">
        Randomized Response Calculator
      </SlideTitle>

      {/* Input row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          display: 'flex',
          gap: '2.5rem',
          marginBottom: '1.5rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: 6, fontWeight: 600 }}>Total People</div>
          <input
            type="number"
            value={totalPeople}
            onChange={(e) => setTotalPeople(e.target.value)}
            placeholder="40"
            style={inputStyle}
            min={1}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: 6, fontWeight: 600 }}>Hands Raised</div>
          <input
            type="number"
            value={handsRaised}
            onChange={(e) => setHandsRaised(e.target.value)}
            placeholder="18"
            style={inputStyle}
            min={0}
          />
        </div>
      </motion.div>

      <AnimatePresence>
        {hasInput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              width: '100%',
              maxWidth: 1000,
              display: 'flex',
              gap: '2rem',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}
          >
            {/* LEFT: Visual bar walkthrough */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              style={{ flex: 1, maxWidth: 500 }}
            >
              {/* Full bar: All People */}
              <div style={{ marginBottom: '1.2rem' }}>
                <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: 6, fontWeight: 600 }}>
                  All {total} people
                </div>
                <div style={{
                  width: '100%',
                  height: 44,
                  borderRadius: 10,
                  background: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${headsWidth}%` }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{
                      height: '100%',
                      background: 'rgba(16,185,129,0.25)',
                      borderRight: '3px solid #10b981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      style={{ color: '#10b981', fontWeight: 800, fontSize: '1rem' }}
                    >
                      Heads: Truth
                    </motion.span>
                  </motion.div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${headsWidth}%` }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    style={{
                      height: '100%',
                      background: 'rgba(234,179,8,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.0 }}
                      style={{ color: '#eab308', fontWeight: 800, fontSize: '1rem' }}
                    >
                      Tails: Flip Again
                    </motion.span>
                  </motion.div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ color: '#10b981', fontSize: '1rem', fontWeight: 700 }}>{Math.round(total / 2)} people</span>
                  <span style={{ color: '#eab308', fontSize: '1rem', fontWeight: 700 }}>{Math.round(total / 2)} people</span>
                </div>
              </div>

              {/* Second split: Tails group */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                style={{ marginBottom: '1.2rem', paddingLeft: '50%' }}
              >
                <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: 6, fontWeight: 600 }}>
                  Tails group flips again:
                </div>
                <div style={{
                  width: '100%',
                  height: 44,
                  borderRadius: 10,
                  background: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  display: 'flex',
                  overflow: 'hidden',
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${forcedYesWidth * 2}%` }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                    style={{
                      height: '100%',
                      background: 'rgba(79,143,255,0.25)',
                      borderRight: '3px solid #4f8fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8 }}
                      style={{ color: '#4f8fff', fontWeight: 800, fontSize: '0.95rem' }}
                    >
                      Forced Yes
                    </motion.span>
                  </motion.div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${forcedNoWidth * 2}%` }}
                    transition={{ delay: 1.7, duration: 0.6 }}
                    style={{
                      height: '100%',
                      background: 'rgba(107,114,128,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.0 }}
                      style={{ color: '#6b7280', fontWeight: 800, fontSize: '0.95rem' }}
                    >
                      Forced No
                    </motion.span>
                  </motion.div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ color: '#4f8fff', fontSize: '1rem', fontWeight: 700 }}>{Math.round(total / 4)}</span>
                  <span style={{ color: '#6b7280', fontSize: '1rem', fontWeight: 700 }}>{Math.round(total / 4)}</span>
                </div>
              </motion.div>

              {/* Estimated circle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5, type: 'spring', bounce: 0.4 }}
                style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}
              >
                <div style={{
                  width: 140,
                  height: 140,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(79,143,255,0.15))',
                  border: '3px solid #10b981',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 40px rgba(16,185,129,0.2)',
                }}>
                  <div style={{
                    fontSize: '2.8rem',
                    fontWeight: 900,
                    fontFamily: 'JetBrains Mono, monospace',
                    background: 'linear-gradient(135deg, #10b981, #4f8fff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1,
                  }}>
                    ~{clampedEstimate.toFixed(0)}%
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: 4 }}>
                    estimated true rate
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT: Badges + simulation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              style={{ flex: 0, minWidth: 340, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
            >
              {/* Formula */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                style={{
                  padding: '16px 20px',
                  borderRadius: 14,
                  background: 'var(--subtle-bg)',
                  border: '1px solid var(--card-border)',
                }}
              >
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 600, marginBottom: 8 }}>Formula:</div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1.1rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.8,
                }}>
                  <span style={{ color: '#ef4444' }}>Hands</span> - <span style={{ color: '#f97316' }}>Forced Yes</span>
                  <br />
                  <span style={{ color: 'var(--text-secondary)' }}>────────────────</span>
                  <br />
                  <span style={{ color: '#8b5cf6' }}>Truthful Pool</span>
                  <br />
                  <span style={{ color: '#ef4444' }}>{hands}</span> - <span style={{ color: '#f97316' }}>{forcedYes.toFixed(0)}</span>
                  {' / '}
                  <span style={{ color: '#8b5cf6' }}>{truthfulPool.toFixed(0)}</span>
                  {' = '}
                  <span style={{ color: '#10b981', fontWeight: 900 }}>{clampedEstimate.toFixed(1)}%</span>
                </div>
              </motion.div>

              {/* Plausible Deniability badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, type: 'spring' }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '18px 24px',
                  borderRadius: 14,
                  background: 'rgba(139,92,246,0.12)',
                  border: '2px solid rgba(139,92,246,0.4)',
                }}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <div>
                  <div style={{ color: '#8b5cf6', fontWeight: 900, fontSize: '1.2rem' }}>Plausible Deniability</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>No one can prove YOUR answer was real</div>
                </div>
              </motion.div>

              {/* Key insight */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                style={{
                  padding: '20px 24px',
                  borderRadius: 14,
                  background: 'rgba(16,185,129,0.08)',
                  border: '2px solid rgba(16,185,129,0.3)',
                }}
              >
                <div style={{
                  color: '#10b981',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  lineHeight: 1.6,
                  textAlign: 'center',
                  textShadow: '0 0 20px rgba(16,185,129,0.2)',
                }}>
                  Hide the individual.
                  <br />
                  Preserve the population statistic.
                </div>
              </motion.div>

              {/* Simulate button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSim((v) => !v)}
                style={{
                  background: 'linear-gradient(135deg, #4f8fff, #8b5cf6)',
                  border: 'none',
                  borderRadius: 14,
                  padding: '14px 28px',
                  color: '#fff',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 24px rgba(79,143,255,0.3)',
                  alignSelf: 'center',
                }}
              >
                {showSim ? 'Hide Simulation' : 'Simulate 100 People'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSim && <DotVisualization total={100} />}
      </AnimatePresence>
    </Slide>
  );
}
