import { motion } from 'framer-motion';
import { Slide } from '../../components/SlideLayout';
import { AnimatedText } from '../../components/AnimatedText';

export function GradientFingerprint() {
  return (
    <Slide background="var(--slide-bg)">
      {/* Main visual container */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
      }}>
        {/* Gradient arrow with fingerprint */}
        <div style={{ position: 'relative', width: 500, height: 200 }}>
          {/* Large gradient arrow */}
          <svg width="500" height="200" viewBox="0 0 500 200">
            <defs>
              <linearGradient id="gradArrow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4f8fff" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Arrow body */}
            <motion.rect
              x={60} y={75} width={320} height={50} rx={8}
              fill="url(#gradArrow)"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 0.8, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ transformOrigin: 'left center' }}
            />

            {/* Arrow head */}
            <motion.polygon
              points="380,60 440,100 380,140"
              fill="url(#gradArrow)"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            />

            {/* "nabla" symbol on left */}
            <motion.text
              x={25} y={108}
              fill="#4f8fff"
              fontSize="32"
              fontFamily="serif"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              ∇
            </motion.text>

            {/* Fingerprint SVG on the arrow */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.6, type: 'spring' }}
              style={{ transformOrigin: '220px 100px' }}
            >
              {/* Fingerprint rings */}
              {[18, 14, 10, 6].map((r, i) => (
                <motion.ellipse
                  key={i}
                  cx={220}
                  cy={100}
                  rx={r}
                  ry={r * 1.3}
                  fill="none"
                  stroke="#eab308"
                  strokeWidth={1.2}
                  opacity={0.7 - i * 0.1}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 1.6 + i * 0.15 }}
                />
              ))}
              {/* Center dot */}
              <motion.circle
                cx={220} cy={100} r={2}
                fill="#eab308"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.2 }}
              />
            </motion.g>
          </svg>

          {/* Pulsing glow around fingerprint */}
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px #eab30800',
                '0 0 40px #eab30840',
                '0 0 20px #eab30800',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 2 }}
            style={{
              position: 'absolute',
              left: 190,
              top: 65,
              width: 60,
              height: 70,
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />

          {/* Data identity label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
            style={{
              position: 'absolute',
              left: 180,
              bottom: -5,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              color: '#eab308',
              textAlign: 'center',
              width: 80,
            }}
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              identity
            </motion.span>
          </motion.div>
        </div>

        {/* Main text */}
        <AnimatedText
          variant="fadeUp"
          delay={2.8}
          style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          Each gradient is a{' '}
          <span style={{
            color: '#eab308',
            textShadow: '0 0 20px #eab30840',
          }}>
            fingerprint
          </span>
          {' '}of the training data.
        </AnimatedText>

        {/* Remember this */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.8, duration: 0.6 }}
          style={{
            marginTop: '0.5rem',
            padding: '0.6rem 1.5rem',
            border: '1px solid #ef444450',
            borderRadius: 8,
            background: '#ef444410',
          }}
        >
          <motion.span
            animate={{
              color: ['#ef4444', '#ff6b6b', '#ef4444'],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '1rem',
              fontWeight: 700,
            }}
          >
            Remember this.
          </motion.span>
        </motion.div>
      </div>
    </Slide>
  );
}
