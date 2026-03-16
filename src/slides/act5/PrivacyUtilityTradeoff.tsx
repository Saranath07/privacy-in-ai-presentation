import { motion } from 'framer-motion';
import { Slide, SlideTitle } from '../../components/SlideLayout';
import { AnimatedText } from '../../components/AnimatedText';

export function PrivacyUtilityTradeoff() {
  // Chart dimensions
  const w = 600;
  const h = 300;
  const pad = { top: 30, right: 70, bottom: 50, left: 70 };
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;

  // Epsilon values (0.1 to 10)
  const epsilons = [0.1, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Model loss: higher when epsilon is small (more privacy = more loss)
  // Roughly: loss = 3.5 / (epsilon + 0.3) + 0.8
  const lossData = epsilons.map((e) => ({
    x: e,
    y: 3.5 / (e + 0.3) + 0.8,
  }));

  // Memorization rate: high when epsilon is large, drops sharply when epsilon is small
  // Roughly: mem = 90 * (1 - exp(-0.4 * epsilon))
  const memData = epsilons.map((e) => ({
    x: e,
    y: 90 * (1 - Math.exp(-0.4 * e)),
  }));

  const maxLoss = 12;
  const maxMem = 100;

  function scaleX(val: number): number {
    return pad.left + ((val - 0.1) / (10 - 0.1)) * plotW;
  }
  function scaleYLoss(val: number): number {
    return pad.top + plotH - (val / maxLoss) * plotH;
  }
  function scaleYMem(val: number): number {
    return pad.top + plotH - (val / maxMem) * plotH;
  }

  const lossPath = lossData.map((p, i) => `${i === 0 ? 'M' : 'L'}${scaleX(p.x)},${scaleYLoss(p.y)}`).join(' ');
  const memPath = memData.map((p, i) => `${i === 0 ? 'M' : 'L'}${scaleX(p.x)},${scaleYMem(p.y)}`).join(' ');

  // X-axis ticks
  const xTicks = [0.1, 1, 2, 5, 10];
  // Y-axis ticks for loss
  const yTicksLoss = [1, 3, 6, 9, 12];
  const yTicksMem = [0, 25, 50, 75, 100];

  return (
    <Slide background="var(--slide-bg)">
      <SlideTitle gradient="linear-gradient(135deg, #4f8fff, #ef4444)">
        The Privacy-Utility Tradeoff
      </SlideTitle>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ width: '100%', maxWidth: 700, display: 'flex', justifyContent: 'center' }}
      >
        <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ maxHeight: '50vh' }}>
          {/* Grid lines */}
          {xTicks.map((t) => (
            <line
              key={`xg-${t}`}
              x1={scaleX(t)} y1={pad.top} x2={scaleX(t)} y2={pad.top + plotH}
              stroke="var(--subtle-border)" strokeWidth={1}
            />
          ))}

          {/* X-axis */}
          <line x1={pad.left} y1={pad.top + plotH} x2={pad.left + plotW} y2={pad.top + plotH}
            stroke="var(--subtle-border)" strokeWidth={1} />
          {xTicks.map((t) => (
            <text key={`xl-${t}`} x={scaleX(t)} y={pad.top + plotH + 20}
              textAnchor="middle" fill="var(--text-secondary)" fontSize={10} fontFamily="JetBrains Mono, monospace">
              {t}
            </text>
          ))}
          <text x={pad.left + plotW / 2} y={h - 5}
            textAnchor="middle" fill="var(--text-secondary)" fontSize={11} fontWeight={600} fontFamily="Inter, sans-serif">
            Epsilon ({String.fromCharCode(949)}) - Privacy Budget
          </text>

          {/* Left Y-axis (Loss) */}
          <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + plotH}
            stroke="#4f8fff30" strokeWidth={1} />
          {yTicksLoss.map((t) => (
            <text key={`yl-${t}`} x={pad.left - 10} y={scaleYLoss(t) + 4}
              textAnchor="end" fill="#4f8fff" fontSize={9} fontFamily="JetBrains Mono, monospace">
              {t}
            </text>
          ))}
          <text x={15} y={pad.top + plotH / 2}
            textAnchor="middle" fill="#4f8fff" fontSize={10} fontWeight={700} fontFamily="Inter, sans-serif"
            transform={`rotate(-90, 15, ${pad.top + plotH / 2})`}>
            Model Loss
          </text>

          {/* Right Y-axis (Memorization) */}
          <line x1={pad.left + plotW} y1={pad.top} x2={pad.left + plotW} y2={pad.top + plotH}
            stroke="#ef444430" strokeWidth={1} />
          {yTicksMem.map((t) => (
            <text key={`yr-${t}`} x={pad.left + plotW + 10} y={scaleYMem(t) + 4}
              textAnchor="start" fill="#ef4444" fontSize={9} fontFamily="JetBrains Mono, monospace">
              {t}%
            </text>
          ))}
          <text x={w - 12} y={pad.top + plotH / 2}
            textAnchor="middle" fill="#ef4444" fontSize={10} fontWeight={700} fontFamily="Inter, sans-serif"
            transform={`rotate(90, ${w - 12}, ${pad.top + plotH / 2})`}>
            Memorization %
          </text>

          {/* Loss line (blue) - draws itself */}
          <motion.path
            d={lossPath}
            fill="none"
            stroke="#4f8fff"
            strokeWidth={3}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.8, ease: 'easeOut' }}
          />

          {/* Memorization line (red) - draws itself */}
          <motion.path
            d={memPath}
            fill="none"
            stroke="#ef4444"
            strokeWidth={3}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 1.2, ease: 'easeOut' }}
          />

          {/* Legend dots */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.0 }}>
            <circle cx={pad.left + 20} cy={pad.top + 10} r={5} fill="#4f8fff" />
            <text x={pad.left + 32} y={pad.top + 14} fill="#4f8fff" fontSize={10} fontWeight={600}
              fontFamily="Inter, sans-serif">Model Loss</text>
            <circle cx={pad.left + 120} cy={pad.top + 10} r={5} fill="#ef4444" />
            <text x={pad.left + 132} y={pad.top + 14} fill="#ef4444" fontSize={10} fontWeight={600}
              fontFamily="Inter, sans-serif">Memorization</text>
          </motion.g>

          {/* Sweet spot annotation */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5 }}
          >
            <circle cx={scaleX(1)} cy={scaleYMem(memData[2].y)} r={20}
              fill="none" stroke="#eab308" strokeWidth={1.5} strokeDasharray="4,3" />
            <text x={scaleX(1) + 25} y={scaleYMem(memData[2].y) - 5}
              fill="#eab308" fontSize={9} fontWeight={700} fontFamily="Inter, sans-serif">
              Sweet spot
            </text>
          </motion.g>
        </svg>
      </motion.div>

      <AnimatedText delay={3.8} style={{
        fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)',
        fontWeight: 700,
        textAlign: 'center',
        marginTop: '0.5rem',
      }}>
        <span style={{ color: '#4f8fff' }}>Slightly worse model</span>
        <span style={{ color: 'var(--text-secondary)' }}>, </span>
        <span style={{ color: '#ef4444' }}>dramatically less memorization</span>
      </AnimatedText>
    </Slide>
  );
}
