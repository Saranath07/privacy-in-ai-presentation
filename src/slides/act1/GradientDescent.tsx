import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Slide, SlideTitle } from '../../components/SlideLayout';
import { AnimatedText } from '../../components/AnimatedText';

const steps = [
  { label: 'Start with random weights', color: '#4f8fff' },
  { label: 'Compute the error', color: '#ef4444' },
  { label: 'Calculate gradient', color: '#f97316' },
  { label: 'Update weights', color: '#10b981' },
  { label: 'Repeat until minimum', color: '#8b5cf6' },
];

// Contour ellipses - from outer (high loss, red) to inner (low loss, green)
const contours = [
  { rx: 240, ry: 180, color: '#ef4444', opacity: 0.25, label: 'high loss' },
  { rx: 195, ry: 145, color: '#f97316', opacity: 0.25, label: '' },
  { rx: 150, ry: 110, color: '#eab308', opacity: 0.25, label: '' },
  { rx: 105, ry: 78, color: '#10b981', opacity: 0.3, label: '' },
  { rx: 60, ry: 45, color: '#10b981', opacity: 0.4, label: 'low loss' },
  { rx: 25, ry: 18, color: '#4f8fff', opacity: 0.5, label: 'minimum' },
];

// Ball positions for each step (cx, cy relative to center 300,180)
const ballPositions = [
  { x: 300 - 200, y: 180 - 110 },  // step 0: outer region (top-left)
  { x: 300 - 200, y: 180 - 110 },  // step 1: same, showing error
  { x: 300 - 200, y: 180 - 110 },  // step 2: same, showing gradient
  { x: 300 - 80, y: 180 - 40 },    // step 3: moved inward
  { x: 300 + 5, y: 180 + 5 },      // step 4: at minimum
];

export function GradientDescent() {
  const [activeStep, setActiveStep] = useState(0);

  const W = 600;
  const H = 360;
  const cx = W / 2;
  const cy = H / 2;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const ball = ballPositions[activeStep];

  // Gradient arrow: points from ball toward center
  const arrowDx = cx - ball.x;
  const arrowDy = cy - ball.y;
  const arrowLen = Math.sqrt(arrowDx * arrowDx + arrowDy * arrowDy);
  const arrowNx = arrowLen > 0 ? arrowDx / arrowLen : 0;
  const arrowNy = arrowLen > 0 ? arrowDy / arrowLen : 0;
  const arrowEndX = ball.x + arrowNx * Math.min(60, arrowLen * 0.4);
  const arrowEndY = ball.y + arrowNy * Math.min(60, arrowLen * 0.4);

  // Loss value based on distance from center
  const dist = Math.sqrt((ball.x - cx) ** 2 + (ball.y - cy) ** 2);
  const maxDist = Math.sqrt(240 ** 2 + 180 ** 2);
  const lossValue = (dist / maxDist * 3.5 + 0.02).toFixed(2);

  return (
    <Slide>
      <SlideTitle gradient="linear-gradient(135deg, #f97316, #eab308)">
        Gradient Descent: The Engine That Powers It All
      </SlideTitle>

      <AnimatedText
        delay={0.3}
        style={{
          fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
          color: 'var(--text-secondary)',
          marginBottom: '1rem',
          textAlign: 'center',
          fontStyle: 'italic',
        }}
      >
        "The ball rolls downhill to find the best weights"
      </AnimatedText>

      {/* Contour map SVG */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        style={{ position: 'relative' }}
      >
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ maxWidth: '100%' }}>
          <defs>
            <radialGradient id="contourBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.03" />
            </radialGradient>
            <radialGradient id="ballGlow">
              <stop offset="0%" stopColor="#eab308" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
            </radialGradient>
            <marker id="gradArrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
            </marker>
          </defs>

          {/* Background */}
          <rect x="0" y="0" width={W} height={H} fill="url(#contourBg)" rx="16" />

          {/* Contour ellipses */}
          {contours.map((c, i) => (
            <motion.ellipse
              key={i}
              cx={cx}
              cy={cy}
              rx={c.rx}
              ry={c.ry}
              fill="none"
              stroke={c.color}
              strokeWidth={1.5}
              strokeDasharray={i % 2 === 0 ? 'none' : '6 4'}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: c.opacity, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
            />
          ))}

          {/* Contour labels */}
          <motion.text
            x={cx + contours[0].rx - 5}
            y={cy - 8}
            fill="#ef4444"
            fontSize="12"
            fontFamily="JetBrains Mono, monospace"
            opacity={0.6}
            textAnchor="end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1 }}
          >
            high loss
          </motion.text>
          <motion.text
            x={cx}
            y={cy + contours[5].ry + 16}
            fill="#4f8fff"
            fontSize="12"
            fontFamily="JetBrains Mono, monospace"
            opacity={0.7}
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.2 }}
          >
            minimum
          </motion.text>

          {/* Path trail (dotted line showing the descent path) */}
          {activeStep >= 3 && (
            <motion.path
              d={`M${ballPositions[0].x},${ballPositions[0].y} Q${(ballPositions[0].x + ballPositions[3].x) / 2 + 30},${(ballPositions[0].y + ballPositions[3].y) / 2 - 20} ${ballPositions[3].x},${ballPositions[3].y}`}
              fill="none"
              stroke="#eab30860"
              strokeWidth={2}
              strokeDasharray="5 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 0.8 }}
            />
          )}
          {activeStep >= 4 && (
            <motion.path
              d={`M${ballPositions[3].x},${ballPositions[3].y} Q${(ballPositions[3].x + ballPositions[4].x) / 2 + 15},${(ballPositions[3].y + ballPositions[4].y) / 2 - 10} ${ballPositions[4].x},${ballPositions[4].y}`}
              fill="none"
              stroke="#eab30860"
              strokeWidth={2}
              strokeDasharray="5 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 0.8 }}
            />
          )}

          {/* Gradient arrow (step 2+) */}
          {activeStep >= 2 && arrowLen > 15 && (
            <motion.line
              x1={ball.x}
              y1={ball.y}
              x2={arrowEndX}
              y2={arrowEndY}
              stroke="#f97316"
              strokeWidth={2.5}
              markerEnd="url(#gradArrow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ duration: 0.5 }}
            />
          )}

          {/* Ball glow */}
          <motion.circle
            animate={{ cx: ball.x, cy: ball.y }}
            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
            r={30}
            fill="url(#ballGlow)"
          />

          {/* Ball */}
          <motion.circle
            animate={{ cx: ball.x, cy: ball.y }}
            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
            r={10}
            fill="#eab308"
            stroke="#fff"
            strokeWidth={2}
          />

          {/* Loss label */}
          {activeStep >= 1 && (
            <motion.text
              initial={{ opacity: 0, x: ball.x + 18, y: ball.y - 18 }}
              animate={{ opacity: 1, x: ball.x + 18, y: ball.y - 18 }}
              transition={{ type: 'spring', stiffness: 50, damping: 15 }}
              fill="#ef4444"
              fontSize="14"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="600"
            >
              loss = {lossValue}
            </motion.text>
          )}

          {/* Axis labels */}
          <text x={W / 2} y={H - 6} textAnchor="middle" fill="var(--text-secondary)" fontSize="13" fontFamily="JetBrains Mono, monospace" opacity={0.4}>
            weight 1
          </text>
          <text x={14} y={H / 2} textAnchor="middle" fill="var(--text-secondary)" fontSize="13" fontFamily="JetBrains Mono, monospace" opacity={0.4} transform={`rotate(-90, 14, ${H / 2})`}>
            weight 2
          </text>
        </svg>
      </motion.div>

      {/* Steps */}
      <div style={{
        display: 'flex',
        gap: '0.6rem',
        marginTop: '1.5rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '800px',
      }}>
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: i <= activeStep ? 1 : 0.2,
              y: 0,
              scale: i === activeStep ? 1.08 : 1,
            }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: 10,
              background: i === activeStep ? `${step.color}15` : 'transparent',
              border: `1px solid ${i === activeStep ? `${step.color}50` : 'transparent'}`,
            }}
          >
            <div style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: i <= activeStep ? step.color : 'var(--card-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
              fontFamily: 'JetBrains Mono, monospace',
              color: i <= activeStep ? 'var(--bg-primary)' : 'var(--text-secondary)',
              fontWeight: 700,
            }}>
              {i + 1}
            </div>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
              color: i <= activeStep ? step.color : 'var(--text-secondary)',
              fontWeight: i === activeStep ? 600 : 400,
            }}>
              {step.label}
            </span>
          </motion.div>
        ))}
      </div>
    </Slide>
  );
}
