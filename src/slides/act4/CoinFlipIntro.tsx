import { motion } from 'framer-motion';
import { Slide, SlideTitle } from '../../components/SlideLayout';
import { AnimatedText } from '../../components/AnimatedText';

function CoinFace({ label, x, y, delay }: { label: 'H' | 'T'; x: number; y: number; delay: number }) {
  const isHeads = label === 'H';
  return (
    <motion.g transform={`translate(${x}, ${y})`}>
      <motion.circle
        cx={0}
        cy={0}
        r={22}
        fill="none"
        stroke="#eab308"
        strokeWidth={3}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay, duration: 0.4, type: 'spring', bounce: 0.4 }}
      />
      <motion.circle
        cx={0}
        cy={0}
        r={18}
        fill={isHeads ? 'rgba(234,179,8,0.15)' : 'rgba(234,179,8,0.08)'}
        stroke="none"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.1 }}
      />
      <motion.text
        x={0}
        y={7}
        textAnchor="middle"
        fill="#eab308"
        fontSize={18}
        fontWeight={900}
        fontFamily="Inter, sans-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
      >
        {label}
      </motion.text>
    </motion.g>
  );
}

function TreeLine({ x1, y1, x2, y2, delay }: { x1: number; y1: number; x2: number; y2: number; delay: number }) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="rgba(79,143,255,0.35)"
      strokeWidth={3.5}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    />
  );
}

function TreeNode({
  x, y, text, color, delay, width = 200, height = 50,
}: {
  x: number; y: number; text: string; color: string; delay: number; width?: number; height?: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, type: 'spring', bounce: 0.3 }}
    >
      <rect
        x={x - width / 2}
        y={y - height / 2}
        width={width}
        height={height}
        rx={12}
        fill={`${color}18`}
        stroke={color}
        strokeWidth={2.5}
      />
      <text
        x={x}
        y={y + 7}
        textAnchor="middle"
        fill={color}
        fontSize={17}
        fontWeight={800}
        fontFamily="Inter, sans-serif"
      >
        {text}
      </text>
    </motion.g>
  );
}

function BranchLabel({ x, y, text, delay }: { x: number; y: number; text: string; delay: number }) {
  return (
    <motion.text
      x={x}
      y={y}
      textAnchor="middle"
      fill="var(--text-secondary)"
      fontSize={16}
      fontWeight={700}
      fontFamily="Inter, sans-serif"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
    >
      {text}
    </motion.text>
  );
}

export function CoinFlipIntro() {
  const cx = 450;
  const topY = 40;
  const splitY = 170;
  const midLabelY = 115;
  const bottomY = 310;
  const subMidY = 245;

  return (
    <Slide background="var(--slide-bg)">
      <SlideTitle gradient="linear-gradient(135deg, #eab308, #f97316)">
        The Coin Flip Survey
      </SlideTitle>

      <AnimatedText delay={0.4} style={{
        fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
        color: 'var(--text-primary)',
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: '0.3rem',
        maxWidth: 700,
      }}>
        "With Tamil Nadu elections coming up... Did you vote for TVK?"
      </AnimatedText>

      <AnimatedText delay={0.7} style={{
        fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
        color: 'var(--text-secondary)',
        textAlign: 'center',
        marginBottom: '1rem',
        maxWidth: 600,
      }}>
        (Tamilaga Vettri Kazhagam -- a political party in Tamil Nadu)
      </AnimatedText>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        style={{ width: '100%', maxWidth: 900, display: 'flex', justifyContent: 'center' }}
      >
        <svg viewBox="0 0 900 380" width="100%" style={{ maxHeight: '48vh' }}>
          {/* Step 1: Flip Coin node */}
          <CoinFace label="H" x={cx - 130} y={topY + 20} delay={1.2} />
          <CoinFace label="T" x={cx + 130} y={topY + 20} delay={1.3} />
          <TreeNode x={cx} y={topY + 20} text="Flip a Coin" color="#eab308" delay={1.2} width={220} height={52} />

          {/* Branches from flip coin */}
          <TreeLine x1={cx - 70} y1={topY + 48} x2={cx - 190} y2={splitY - 26} delay={1.9} />
          <TreeLine x1={cx + 70} y1={topY + 48} x2={cx + 190} y2={splitY - 26} delay={1.9} />

          {/* Labels */}
          <BranchLabel x={cx - 160} y={midLabelY} text="HEADS" delay={2.1} />
          <BranchLabel x={cx + 160} y={midLabelY} text="TAILS" delay={2.1} />

          {/* HEADS -> Tell the truth */}
          <TreeNode x={cx - 190} y={splitY} text="Answer Truthfully" color="#10b981" delay={2.4} width={220} height={52} />

          {/* TAILS -> Flip again */}
          <CoinFace label="H" x={cx + 70} y={splitY} delay={2.6} />
          <CoinFace label="T" x={cx + 310} y={splitY} delay={2.7} />
          <TreeNode x={cx + 190} y={splitY} text="Flip Again" color="#eab308" delay={2.6} width={200} height={52} />

          {/* Branches from flip again */}
          <TreeLine x1={cx + 130} y1={splitY + 28} x2={cx + 70} y2={bottomY - 28} delay={3.3} />
          <TreeLine x1={cx + 250} y1={splitY + 28} x2={cx + 320} y2={bottomY - 28} delay={3.3} />

          <BranchLabel x={cx + 70} y={subMidY} text="HEADS" delay={3.5} />
          <BranchLabel x={cx + 320} y={subMidY} text="TAILS" delay={3.5} />

          {/* HEADS -> Say Yes */}
          <TreeNode x={cx + 70} y={bottomY} text='Say "Yes"' color="#4f8fff" delay={3.7} width={170} height={50} />

          {/* TAILS -> Say No */}
          <TreeNode x={cx + 320} y={bottomY} text='Say "No"' color="#6b7280" delay={3.7} width={170} height={50} />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 4.5, duration: 0.7, type: 'spring', bounce: 0.3 }}
        style={{
          fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
          fontWeight: 900,
          color: '#eab308',
          textAlign: 'center',
          textShadow: '0 0 40px rgba(234,179,8,0.4)',
          marginTop: '0.5rem',
          padding: '0.6rem 2rem',
          borderRadius: 16,
          background: 'rgba(234,179,8,0.08)',
          border: '2px solid rgba(234,179,8,0.25)',
        }}
      >
        Everyone grab a coin!
      </motion.div>
    </Slide>
  );
}
