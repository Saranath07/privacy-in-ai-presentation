import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Slide, SlideTitle } from '../../components/SlideLayout';
import { AnimatedText } from '../../components/AnimatedText';

const layers = [
  { neurons: 4, label: 'Input' },
  { neurons: 6, label: '' },
  { neurons: 8, label: '' },
  { neurons: 6, label: '' },
  { neurons: 3, label: 'Output' },
];

const features = ['edges', 'shapes', 'objects'];
const LAYER_GAP = 130;
const NEURON_GAP = 42;

export function DeepLearning() {
  const [phase, setPhase] = useState<'closed' | 'open' | 'forward'>('closed');
  const [litLayer, setLitLayer] = useState(-1);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('open'), 1200);
    const t2 = setTimeout(() => {
      setPhase('forward');
      let layer = 0;
      const interval = setInterval(() => {
        setLitLayer(layer);
        layer++;
        if (layer >= layers.length) clearInterval(interval);
      }, 600);
    }, 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const totalWidth = (layers.length - 1) * LAYER_GAP;
  const maxNeurons = Math.max(...layers.map((l) => l.neurons));
  const totalHeight = (maxNeurons - 1) * NEURON_GAP + 40;
  const svgWidth = totalWidth + 80;
  const svgHeight = totalHeight + 60;

  const getNeuronPos = (layerIdx: number, neuronIdx: number) => {
    const layer = layers[layerIdx];
    const x = 40 + layerIdx * LAYER_GAP;
    const layerHeight = (layer.neurons - 1) * NEURON_GAP;
    const yOffset = (totalHeight - layerHeight) / 2;
    const y = 30 + yOffset + neuronIdx * NEURON_GAP;
    return { x, y };
  };

  return (
    <Slide background="var(--slide-bg)">
      <SlideTitle gradient="linear-gradient(135deg, #4f8fff, #8b5cf6)">
        Deep Learning
      </SlideTitle>

      {/* Black box / Neural network */}
      <div style={{ position: 'relative', marginTop: '0.5rem' }}>
        {/* Black box overlay */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: phase === 'closed' ? 1 : 0,
            scale: phase === 'closed' ? 1 : 1.1,
          }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--bg-primary)',
            border: '2px solid var(--card-border)',
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: phase === 'closed' ? 10 : -1,
            pointerEvents: 'none',
          }}
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1.5rem',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.2em',
            }}
          >
            BLACK BOX
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase !== 'closed' ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
            {/* Connections */}
            {layers.map((_, li) => {
              if (li === layers.length - 1) return null;
              const nextLayer = layers[li + 1];
              return layers[li].neurons > 0 && Array.from({ length: layers[li].neurons }).map((__, ni) =>
                Array.from({ length: nextLayer.neurons }).map((___, nj) => {
                  const from = getNeuronPos(li, ni);
                  const to = getNeuronPos(li + 1, nj);
                  const isLit = litLayer >= li + 1;
                  return (
                    <motion.line
                      key={`${li}-${ni}-${nj}`}
                      x1={from.x} y1={from.y}
                      x2={to.x} y2={to.y}
                      stroke={isLit ? '#4f8fff' : 'var(--text-primary)'}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: isLit ? 0.4 : 0.08,
                        strokeWidth: isLit ? 1.5 : 0.5,
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  );
                })
              );
            })}

            {/* Neurons */}
            {layers.map((layer, li) =>
              Array.from({ length: layer.neurons }).map((_, ni) => {
                const pos = getNeuronPos(li, ni);
                const isLit = litLayer >= li;
                const color = isLit ? '#4f8fff' : '#ffffff';
                return (
                  <motion.circle
                    key={`n-${li}-${ni}`}
                    cx={pos.x}
                    cy={pos.y}
                    r={8}
                    fill={isLit ? `${color}30` : 'var(--subtle-bg)'}
                    stroke={color}
                    strokeWidth={isLit ? 1.5 : 0.5}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      filter: isLit ? `drop-shadow(0 0 6px ${color}80)` : 'none',
                    }}
                    transition={{
                      opacity: { duration: 0.3, delay: li * 0.1 + ni * 0.03 },
                      scale: { duration: 0.3, delay: li * 0.1 + ni * 0.03 },
                      filter: { duration: 0.3 },
                    }}
                  />
                );
              })
            )}

            {/* Layer labels */}
            {layers.map((layer, li) => {
              if (!layer.label) return null;
              const x = 40 + li * LAYER_GAP;
              return (
                <motion.text
                  key={`label-${li}`}
                  x={x}
                  y={svgHeight - 5}
                  textAnchor="middle"
                  fill="var(--text-secondary)"
                  fontSize="11"
                  fontFamily="JetBrains Mono, monospace"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: 1.5 }}
                >
                  {layer.label}
                </motion.text>
              );
            })}

            {/* Forward pass arrow (data entering) */}
            {phase === 'forward' && (
              <motion.g>
                <motion.circle
                  cx={0}
                  cy={svgHeight / 2}
                  r={4}
                  fill="#10b981"
                  initial={{ cx: -20 }}
                  animate={{ cx: [- 20, 40], opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
                />
              </motion.g>
            )}
          </svg>
        </motion.div>
      </div>

      {/* Feature extraction labels */}
      {phase === 'forward' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            display: 'flex',
            gap: '2rem',
            marginTop: '0.5rem',
            alignItems: 'center',
          }}
        >
          {features.map((f, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 + i * 0.4 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.85rem',
                color: ['#4f8fff', '#8b5cf6', '#10b981'][i],
              }}>
                {f}
              </span>
              {i < features.length - 1 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 2.5 + i * 0.4 }}
                  style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}
                >
                  →
                </motion.span>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      <AnimatedText
        variant="fadeUp"
        delay={4}
        style={{
          marginTop: '1.5rem',
          fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)',
          color: 'var(--text-secondary)',
          textAlign: 'center',
        }}
      >
        Deep learning works across <span style={{ color: '#4f8fff', fontWeight: 700 }}>ALL</span> three branches
      </AnimatedText>
    </Slide>
  );
}
