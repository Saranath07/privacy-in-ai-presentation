import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Slide } from '../../components/SlideLayout';
import { AnimatedText } from '../../components/AnimatedText';

const layers = [
  { neurons: 4 },
  { neurons: 6 },
  { neurons: 8 },
  { neurons: 6 },
  { neurons: 3 },
];

const LAYER_GAP = 120;
const NEURON_GAP = 38;

const personalData = [
  'SSN: 432-**-7891',
  'john@email.com',
  'DOB: 03/15/1987',
  'Card: 4532-****',
];

export function BridgeToPrivacy() {
  const [phase, setPhase] = useState<'network' | 'fingerprints' | 'zoom' | 'question'>('network');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fingerprints'), 1500);
    const t2 = setTimeout(() => setPhase('zoom'), 3500);
    const t3 = setTimeout(() => setPhase('question'), 5500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const maxNeurons = Math.max(...layers.map((l) => l.neurons));
  const totalWidth = (layers.length - 1) * LAYER_GAP;
  const totalHeight = (maxNeurons - 1) * NEURON_GAP + 40;
  const svgW = totalWidth + 80;
  const svgH = totalHeight + 40;

  const getNeuronPos = (li: number, ni: number) => {
    const layer = layers[li];
    const x = 40 + li * LAYER_GAP;
    const layerH = (layer.neurons - 1) * NEURON_GAP;
    const yOff = (totalHeight - layerH) / 2;
    const y = 20 + yOff + ni * NEURON_GAP;
    return { x, y };
  };

  // Pick some neurons to show fingerprints on
  const fingerprintNeurons = [
    { li: 1, ni: 2 }, { li: 2, ni: 3 }, { li: 2, ni: 5 },
    { li: 3, ni: 1 }, { li: 3, ni: 4 }, { li: 1, ni: 4 },
    { li: 2, ni: 1 }, { li: 2, ni: 6 },
  ];

  // The neuron that zooms

  return (
    <Slide background="var(--slide-bg)">
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Neural network */}
        <motion.div
          animate={{
            scale: phase === 'zoom' || phase === 'question' ? 0.85 : 1,
            opacity: phase === 'question' ? 0.4 : 1,
          }}
          transition={{ duration: 1 }}
        >
          <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`}>
            {/* Connections */}
            {layers.map((layer, li) => {
              if (li === layers.length - 1) return null;
              const next = layers[li + 1];
              return Array.from({ length: layer.neurons }).map((_, ni) =>
                Array.from({ length: next.neurons }).map((__, nj) => {
                  const from = getNeuronPos(li, ni);
                  const to = getNeuronPos(li + 1, nj);
                  return (
                    <line
                      key={`c-${li}-${ni}-${nj}`}
                      x1={from.x} y1={from.y}
                      x2={to.x} y2={to.y}
                      stroke="var(--text-primary)"
                      strokeWidth={0.5}
                      opacity={0.08}
                    />
                  );
                })
              );
            })}

            {/* Neurons */}
            {layers.map((layer, li) =>
              Array.from({ length: layer.neurons }).map((_, ni) => {
                const pos = getNeuronPos(li, ni);
                const hasFP = phase !== 'network' &&
                  fingerprintNeurons.some((f) => f.li === li && f.ni === ni);
                return (
                  <g key={`n-${li}-${ni}`}>
                    {/* Glow for fingerprint neurons */}
                    {hasFP && (
                      <motion.circle
                        cx={pos.x} cy={pos.y} r={16}
                        fill="none"
                        stroke="#eab308"
                        strokeWidth={1}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 0.6, 0],
                          scale: [0.5, 1.2, 0.5],
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
                      />
                    )}
                    <motion.circle
                      cx={pos.x} cy={pos.y} r={7}
                      fill={hasFP ? '#eab30830' : 'var(--subtle-bg)'}
                      stroke={hasFP ? '#eab308' : 'var(--subtle-border)'}
                      strokeWidth={hasFP ? 1.5 : 0.5}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: li * 0.1 + ni * 0.03 }}
                    />
                    {/* Mini fingerprint */}
                    {hasFP && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        transition={{ delay: 0.5 }}
                      >
                        {[4, 3, 2].map((r, ri) => (
                          <ellipse
                            key={ri}
                            cx={pos.x} cy={pos.y}
                            rx={r * 0.6} ry={r * 0.8}
                            fill="none"
                            stroke="#eab308"
                            strokeWidth={0.5}
                            opacity={0.5 - ri * 0.1}
                          />
                        ))}
                      </motion.g>
                    )}
                  </g>
                );
              })
            )}
          </svg>
        </motion.div>

        {/* Zoom-in panel showing personal data */}
        {(phase === 'zoom' || phase === 'question') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            style={{
              position: 'absolute',
              top: '15%',
              right: '5%',
              background: 'var(--bg-secondary)',
              border: '1px solid #eab30850',
              borderRadius: 16,
              padding: '1.2rem 1.5rem',
              boxShadow: '0 0 40px #eab30820',
              zIndex: 20,
            }}
          >
            {/* Magnifier line connecting to neuron */}
            <div style={{
              position: 'absolute',
              left: -30,
              top: '50%',
              width: 30,
              height: 1,
              background: '#eab30850',
            }} />

            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              color: '#eab308',
              marginBottom: '0.6rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}>
              Memorized Data
            </div>

            {personalData.map((data, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.2 }}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.8rem',
                  color: '#ef4444',
                  padding: '0.2rem 0',
                  borderBottom: i < personalData.length - 1 ? '1px solid var(--subtle-border)' : 'none',
                }}
              >
                {data}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Question text */}
        {phase === 'question' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              marginTop: '1rem',
              textAlign: 'center',
            }}
          >
            <AnimatedText
              variant="fadeUp"
              delay={0.5}
              style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.7rem)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.4,
              }}
            >
              The model{' '}
              <span style={{ color: '#ef4444', textShadow: '0 0 20px #ef444440' }}>
                memorized
              </span>
              {' '}real data.
            </AnimatedText>

            <AnimatedText
              variant="fadeUp"
              delay={1.2}
              style={{
                fontSize: 'clamp(1.3rem, 3vw, 2.2rem)',
                fontWeight: 800,
                marginTop: '0.8rem',
              }}
            >
              <motion.span
                animate={{ color: ['#8b5cf6', '#4f8fff', '#8b5cf6'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Can we stop this?
              </motion.span>
            </AnimatedText>
          </motion.div>
        )}
      </div>
    </Slide>
  );
}
