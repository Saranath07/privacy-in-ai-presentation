import { motion } from 'framer-motion';
import { Slide, SlideTitle } from '../../components/SlideLayout';

function NoiseParticle({ delay, x, y }: { delay: number; x: number; y: number }) {
  const dx = (Math.random() - 0.5) * 80;
  const dy = (Math.random() - 0.5) * 80;
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={2}
      fill="#8b5cf6"
      initial={{ opacity: 0, cx: x, cy: y }}
      animate={{
        opacity: [0, 0.8, 0],
        cx: x + dx,
        cy: y + dy,
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 1,
      }}
    />
  );
}

export function NoiseAddition() {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    x: 500 + (Math.random() - 0.5) * 30,
    y: 120 + (Math.random() - 0.5) * 30,
    delay: 2.5 + i * 0.08,
  }));

  return (
    <Slide background="var(--slide-bg)">
      <SlideTitle gradient="linear-gradient(135deg, #8b5cf6, #4f8fff)">
        Calibrated Noise
      </SlideTitle>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ width: '100%', maxWidth: 750, display: 'flex', justifyContent: 'center' }}
      >
        <svg viewBox="0 0 700 280" width="100%" style={{ maxHeight: '45vh' }}>
          {/* LEFT: Coin flip */}
          <motion.g
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* Coin icon */}
            <circle cx={120} cy={80} r={30} fill="none" stroke="#eab308" strokeWidth={2.5} />
            <text x={120} y={86} textAnchor="middle" fill="#eab308" fontSize={20} fontWeight={800}>$</text>
            <text x={120} y={130} textAnchor="middle" fill="var(--text-primary)" fontSize={12} fontWeight={700} fontFamily="Inter, sans-serif">
              Coin Flip
            </text>
            <text x={120} y={148} textAnchor="middle" fill="var(--text-secondary)" fontSize={10} fontFamily="Inter, sans-serif">
              Noise to your answer
            </text>
          </motion.g>

          {/* Arrow */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.line
              x1={200} y1={90} x2={330} y2={90}
              stroke="#4f8fff40" strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            />
            <polygon points="330,84 345,90 330,96" fill="#4f8fff60" />
            <text x={272} y={80} textAnchor="middle" fill="var(--text-secondary)" fontSize={20} fontFamily="Inter, sans-serif">
              {String.fromCharCode(8594)}
            </text>
          </motion.g>

          {/* "Same idea" text */}
          <motion.text
            x={350} y={55}
            textAnchor="middle"
            fill="#8b5cf6"
            fontSize={13}
            fontWeight={800}
            fontFamily="Inter, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Same idea, different scale
          </motion.text>

          {/* RIGHT: Algorithm with noise */}
          <motion.g
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 }}
          >
            {/* Algorithm box */}
            <rect x={460} y={58} width={80} height={50} rx={10}
              fill="rgba(79,143,255,0.12)" stroke="#4f8fff" strokeWidth={2} />
            <text x={500} y={87} textAnchor="middle" fill="#4f8fff" fontSize={11} fontWeight={700} fontFamily="Inter, sans-serif">
              Algorithm
            </text>
            <text x={500} y={130} textAnchor="middle" fill="var(--text-primary)" fontSize={12} fontWeight={700} fontFamily="Inter, sans-serif">
              DP Mechanism
            </text>
            <text x={500} y={148} textAnchor="middle" fill="var(--text-secondary)" fontSize={10} fontFamily="Inter, sans-serif">
              Noise to the output
            </text>

            {/* Noise particles */}
            {particles.map((p, i) => (
              <NoiseParticle key={i} x={p.x} y={p.y} delay={p.delay} />
            ))}
          </motion.g>

          {/* Sensitivity section */}
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
          >
            <rect x={120} y={190} width={460} height={70} rx={12}
              fill="rgba(249,115,22,0.08)" stroke="#f9731640" strokeWidth={1} />

            <text x={350} y={215} textAnchor="middle" fill="#f97316" fontSize={14} fontWeight={800}
              fontFamily="Inter, sans-serif">
              Sensitivity: How much can one person move the answer?
            </text>

            {/* Animated displacement arrow */}
            <motion.line
              x1={220} y1={242} x2={320} y2={242}
              stroke="#f97316" strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 2.8 }}
            />
            <motion.polygon
              points="320,237 335,242 320,247"
              fill="#f97316"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.4 }}
            />
            <motion.circle
              cx={220} cy={242} r={4} fill="#10b981"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6 }}
            />
            <motion.text
              x={370} y={247} fill="var(--text-secondary)" fontSize={11} fontFamily="Inter, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.0 }}
            >
              Max displacement
            </motion.text>
          </motion.g>
        </svg>
      </motion.div>
    </Slide>
  );
}
