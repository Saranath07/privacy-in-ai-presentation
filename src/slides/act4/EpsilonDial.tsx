import { motion } from 'framer-motion';
import { useState } from 'react';
import { Slide, SlideTitle } from '../../components/SlideLayout';

function generateGaussianPath(cx: number, cy: number, width: number, height: number, offset: number = 0): string {
  const points: string[] = [];
  const steps = 100;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * 2 - 1;
    const x = cx + offset + t * (width / 2);
    const y = cy - Math.exp(-t * t * 3.5) * height;
    points.push(`${i === 0 ? 'M' : 'L'}${x},${y}`);
  }
  return points.join(' ');
}

function generateOverlapPath(cx: number, cy: number, width: number, height: number, separation: number): string {
  // Generate the overlapping region between two Gaussians
  const steps = 100;
  const topPoints: [number, number][] = [];
  const bottomPoints: [number, number][] = [];

  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * 2 - 1;
    const x = cx + t * (width / 2);
    const y1 = cy - Math.exp(-((t + separation / width) * (t + separation / width)) * 3.5) * height;
    const y2 = cy - Math.exp(-((t - separation / width) * (t - separation / width)) * 3.5) * height;
    // Overlap = minimum height at each point
    const minY = Math.max(y1, y2); // max because y is inverted
    topPoints.push([x, minY]);
    bottomPoints.push([x, cy]);
  }

  let d = `M${topPoints[0][0]},${cy}`;
  for (const [x, y] of topPoints) {
    d += ` L${x},${y}`;
  }
  d += ` L${topPoints[topPoints.length - 1][0]},${cy} Z`;
  return d;
}

export function EpsilonDial() {
  const [epsilon, setEpsilon] = useState(1.0);

  const separation = epsilon * 22;
  const curveHeight = 180;
  const curveWidth = 380;
  const centerX = 400;
  const centerY = 220;

  const path1 = generateGaussianPath(centerX, centerY, curveWidth, curveHeight, -separation / 2);
  const path2 = generateGaussianPath(centerX, centerY, curveWidth, curveHeight, separation / 2);

  const fillPath1 = path1 + ` L${centerX - separation / 2 + curveWidth / 2},${centerY} L${centerX - separation / 2 - curveWidth / 2},${centerY} Z`;
  const fillPath2 = path2 + ` L${centerX + separation / 2 + curveWidth / 2},${centerY} L${centerX + separation / 2 - curveWidth / 2},${centerY} Z`;

  const overlapPath = generateOverlapPath(centerX, centerY, curveWidth, curveHeight, separation);

  const isStrong = epsilon <= 1;
  const isMedium = epsilon > 1 && epsilon <= 5;
  const privacyLabel = isStrong ? 'STRONG PRIVACY' : isMedium ? 'MODERATE PRIVACY' : 'WEAK PRIVACY';
  const privacyColor = isStrong ? '#10b981' : isMedium ? '#eab308' : '#ef4444';
  const overlapColor = isStrong ? '#10b98150' : isMedium ? '#eab30830' : '#ef444415';

  return (
    <Slide background="var(--slide-bg)">
      <SlideTitle gradient="linear-gradient(135deg, #8b5cf6, #ef4444)">
        The Privacy Dial
      </SlideTitle>

      {/* Privacy label with pulsing glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ textAlign: 'center', marginBottom: '0.3rem' }}
      >
        <motion.span
          animate={{
            textShadow: [
              `0 0 10px ${privacyColor}40`,
              `0 0 35px ${privacyColor}80`,
              `0 0 10px ${privacyColor}40`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
            fontWeight: 900,
            color: privacyColor,
            letterSpacing: '0.1em',
            transition: 'color 0.3s',
          }}
        >
          {privacyLabel}
        </motion.span>
      </motion.div>

      {/* Curves - MUCH LARGER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ width: '100%', maxWidth: 850, display: 'flex', justifyContent: 'center' }}
      >
        <svg viewBox="0 0 800 280" width="100%" style={{ maxHeight: '45vh' }}>
          {/* Filled areas */}
          <path d={fillPath1} fill="#10b981" opacity={0.08} />
          <path d={fillPath2} fill="#4f8fff" opacity={0.08} />

          {/* Overlap zone highlight */}
          <path d={overlapPath} fill={overlapColor} style={{ transition: 'fill 0.3s' }} />

          {/* Curves */}
          <path d={path1} fill="none" stroke="#10b981" strokeWidth={4} />
          <path d={path2} fill="none" stroke="#4f8fff" strokeWidth={4} />

          {/* Curve labels - LARGER */}
          <text
            x={centerX - separation / 2 - 30}
            y={centerY + 35}
            textAnchor="middle"
            fill="#10b981"
            fontSize={16}
            fontWeight={700}
            fontFamily="Inter, sans-serif"
          >
            With your data
          </text>
          <text
            x={centerX + separation / 2 + 30}
            y={centerY + 35}
            textAnchor="middle"
            fill="#4f8fff"
            fontSize={16}
            fontWeight={700}
            fontFamily="Inter, sans-serif"
          >
            Without your data
          </text>

          {/* Baseline */}
          <line x1={30} y1={centerY} x2={770} y2={centerY} stroke="var(--card-border)" strokeWidth={1.5} />
        </svg>
      </motion.div>

      {/* Epsilon value display - HUGE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ textAlign: 'center', marginBottom: '0.5rem' }}
      >
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 900,
          color: privacyColor,
          textShadow: `0 0 40px ${privacyColor}50`,
          transition: 'color 0.3s',
          lineHeight: 1.2,
        }}>
          {String.fromCharCode(949)} = {epsilon.toFixed(1)}
        </span>
      </motion.div>

      {/* Slider - BIGGER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{
          width: '100%',
          maxWidth: 600,
          padding: '0 24px',
        }}
      >
        <input
          type="range"
          min={0.1}
          max={10}
          step={0.1}
          value={epsilon}
          onChange={(e) => setEpsilon(parseFloat(e.target.value))}
          style={{
            width: '100%',
            height: 12,
            borderRadius: 6,
            appearance: 'none',
            WebkitAppearance: 'none',
            background: 'linear-gradient(90deg, #10b981, #eab308, #ef4444)',
            outline: 'none',
            cursor: 'pointer',
          }}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          color: 'var(--text-secondary)',
          fontSize: '1rem',
          marginTop: 8,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
        }}>
          <span style={{ color: '#10b981' }}>Strong Privacy (small {String.fromCharCode(949)})</span>
          <span style={{ color: '#ef4444' }}>Weak Privacy (large {String.fromCharCode(949)})</span>
        </div>
      </motion.div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--text-primary);
          cursor: pointer;
          box-shadow: 0 0 20px rgba(255,255,255,0.3), 0 0 40px ${privacyColor}40;
          border: 4px solid ${privacyColor};
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        input[type="range"]::-moz-range-thumb {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--text-primary);
          cursor: pointer;
          box-shadow: 0 0 20px rgba(255,255,255,0.3), 0 0 40px ${privacyColor}40;
          border: 4px solid ${privacyColor};
        }
      `}</style>
    </Slide>
  );
}
