import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { Slide, SlideTitle, SlideSubtitle } from '../../components/SlideLayout';

const tokens = ['The', ' quick', ' brown', ' fox', ' jumps', ' over', ' the', ' lazy', ' dog'];

// Generate random dots for noise stages
function useDots(count: number) {
  return useMemo(() =>
    Array.from({ length: count }, () => ({
      x: Math.random() * 120,
      y: Math.random() * 120,
      size: 1.5 + Math.random() * 2.5,
    })),
    [count]
  );
}

// Cat silhouette path for the final stage
const catPath = 'M60,95 C35,95 20,80 20,65 C20,50 30,40 40,38 L35,20 L42,32 L50,28 L48,12 L55,25 C57,24.5 59,24.2 60,24 C61,24.2 63,24.5 65,25 L72,12 L70,28 L78,32 L85,20 L80,38 C90,40 100,50 100,65 C100,80 85,95 60,95 Z';

function DiffusionStages({ phase }: { phase: number }) {
  const noiseDots = useDots(80);

  const stageLabels = ['noise', 'denoising...', 'denoising...', 'denoising...', 'image'];
  const stageCount = 5;
  const stageWidth = 110;
  const gap = 14;
  const totalWidth = stageCount * stageWidth + (stageCount - 1) * gap;

  return (
    <div style={{ width: '100%' }}>
      <svg
        viewBox={`0 0 ${totalWidth} 160`}
        width="100%"
        style={{ maxWidth: '520px', display: 'block', margin: '0 auto' }}
      >
        {Array.from({ length: stageCount }).map((_, stageIdx) => {
          const xOff = stageIdx * (stageWidth + gap);
          const blend = stageIdx / (stageCount - 1); // 0 to 1
          const isActive = stageIdx <= phase;

          return (
            <g key={stageIdx}>
              {/* Stage box background */}
              <motion.rect
                x={xOff}
                y={0}
                width={stageWidth}
                height={stageWidth}
                rx={12}
                fill={isActive ? `rgba(139,92,246,${0.08 + blend * 0.12})` : 'var(--subtle-bg)'}
                stroke={isActive ? `rgba(139,92,246,${0.3 + blend * 0.4})` : 'var(--card-border)'}
                strokeWidth={1.5}
                animate={{
                  fill: isActive ? `rgba(139,92,246,${0.08 + blend * 0.12})` : 'var(--subtle-bg)',
                  stroke: isActive ? `rgba(139,92,246,${0.3 + blend * 0.4})` : 'var(--card-border)',
                }}
                transition={{ duration: 0.6 }}
              />

              {/* Stage content */}
              {stageIdx === 0 && (
                // Pure noise - scattered random dots
                <g>
                  {noiseDots.map((dot, di) => (
                    <motion.circle
                      key={di}
                      cx={xOff + 5 + (dot.x / 120) * (stageWidth - 10)}
                      cy={5 + (dot.y / 120) * (stageWidth - 10)}
                      r={dot.size}
                      fill={`hsl(${Math.random() * 360}, 30%, ${40 + Math.random() * 30}%)`}
                      animate={{ opacity: isActive ? 0.7 : 0.2 }}
                      transition={{ duration: 0.5 }}
                    />
                  ))}
                </g>
              )}

              {stageIdx === 1 && (
                // Slightly organized - dots clustering toward center
                <g>
                  {noiseDots.map((dot, di) => {
                    const cx = xOff + stageWidth / 2;
                    const cy = stageWidth / 2;
                    const rawX = xOff + 5 + (dot.x / 120) * (stageWidth - 10);
                    const rawY = 5 + (dot.y / 120) * (stageWidth - 10);
                    const pullX = rawX + (cx - rawX) * 0.25;
                    const pullY = rawY + (cy - rawY) * 0.25;
                    return (
                      <motion.circle
                        key={di}
                        cx={pullX}
                        cy={pullY}
                        r={dot.size * 0.9}
                        fill={`rgba(139,92,246,${0.3 + Math.random() * 0.3})`}
                        animate={{ opacity: isActive ? 0.6 : 0.15 }}
                        transition={{ duration: 0.5 }}
                      />
                    );
                  })}
                </g>
              )}

              {stageIdx === 2 && (
                // Blurry outline forming - use a blurred version of the cat
                <g>
                  <defs>
                    <filter id="blur2">
                      <feGaussianBlur stdDeviation="6" />
                    </filter>
                  </defs>
                  <motion.path
                    d={catPath}
                    transform={`translate(${xOff + 5}, ${2}) scale(${(stageWidth - 10) / 120})`}
                    fill="rgba(139,92,246,0.25)"
                    filter="url(#blur2)"
                    animate={{ opacity: isActive ? 0.8 : 0.15 }}
                    transition={{ duration: 0.6 }}
                  />
                  {/* Some remaining noise dots */}
                  {noiseDots.slice(0, 25).map((dot, di) => {
                    const cx = xOff + stageWidth / 2;
                    const cy = stageWidth / 2;
                    const rawX = xOff + 5 + (dot.x / 120) * (stageWidth - 10);
                    const rawY = 5 + (dot.y / 120) * (stageWidth - 10);
                    const pullX = rawX + (cx - rawX) * 0.5;
                    const pullY = rawY + (cy - rawY) * 0.5;
                    return (
                      <motion.circle
                        key={di}
                        cx={pullX}
                        cy={pullY}
                        r={dot.size * 0.6}
                        fill="rgba(139,92,246,0.2)"
                        animate={{ opacity: isActive ? 0.4 : 0.1 }}
                        transition={{ duration: 0.5 }}
                      />
                    );
                  })}
                </g>
              )}

              {stageIdx === 3 && (
                // Clearer outline
                <g>
                  <defs>
                    <filter id="blur3">
                      <feGaussianBlur stdDeviation="2.5" />
                    </filter>
                  </defs>
                  <motion.path
                    d={catPath}
                    transform={`translate(${xOff + 5}, ${2}) scale(${(stageWidth - 10) / 120})`}
                    fill="rgba(139,92,246,0.4)"
                    stroke="rgba(139,92,246,0.3)"
                    strokeWidth={1}
                    filter="url(#blur3)"
                    animate={{ opacity: isActive ? 1 : 0.15 }}
                    transition={{ duration: 0.6 }}
                  />
                </g>
              )}

              {stageIdx === 4 && (
                // Clean shape
                <g>
                  <motion.path
                    d={catPath}
                    transform={`translate(${xOff + 5}, ${2}) scale(${(stageWidth - 10) / 120})`}
                    fill="rgba(139,92,246,0.6)"
                    stroke="#8b5cf6"
                    strokeWidth={1.5}
                    animate={{ opacity: isActive ? 1 : 0.15 }}
                    transition={{ duration: 0.6 }}
                  />
                  {/* Eyes */}
                  <motion.circle
                    cx={xOff + stageWidth * 0.38}
                    cy={stageWidth * 0.42}
                    r={3}
                    fill="#eab308"
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  />
                  <motion.circle
                    cx={xOff + stageWidth * 0.62}
                    cy={stageWidth * 0.42}
                    r={3}
                    fill="#eab308"
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  />
                </g>
              )}

              {/* Arrow between stages */}
              {stageIdx < stageCount - 1 && (
                <motion.g
                  animate={{ opacity: stageIdx < phase ? 0.6 : 0.15 }}
                  transition={{ duration: 0.4 }}
                >
                  <line
                    x1={xOff + stageWidth + 2}
                    y1={stageWidth / 2}
                    x2={xOff + stageWidth + gap - 2}
                    y2={stageWidth / 2}
                    stroke="#8b5cf6"
                    strokeWidth={1.5}
                  />
                  <polygon
                    points={`${xOff + stageWidth + gap - 5},${stageWidth / 2 - 3} ${xOff + stageWidth + gap - 1},${stageWidth / 2} ${xOff + stageWidth + gap - 5},${stageWidth / 2 + 3}`}
                    fill="#8b5cf6"
                  />
                </motion.g>
              )}

              {/* Stage label */}
              <motion.text
                x={xOff + stageWidth / 2}
                y={stageWidth + 18}
                textAnchor="middle"
                fill={isActive ? '#8b5cf6' : 'var(--text-secondary)'}
                fontSize="11"
                fontFamily="JetBrains Mono, monospace"
                animate={{
                  fill: isActive ? '#8b5cf6' : 'var(--text-secondary)',
                }}
                transition={{ duration: 0.4 }}
              >
                {stageLabels[stageIdx]}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function GenerativeAI() {
  const [visibleTokens, setVisibleTokens] = useState(0);
  const [diffusionPhase, setDiffusionPhase] = useState(0);

  useEffect(() => {
    const tokenInterval = setInterval(() => {
      setVisibleTokens((prev) => {
        if (prev >= tokens.length) return prev;
        return prev + 1;
      });
    }, 400);

    const diffusionInterval = setInterval(() => {
      setDiffusionPhase((prev) => {
        if (prev >= 4) return prev;
        return prev + 1;
      });
    }, 1400);

    return () => {
      clearInterval(tokenInterval);
      clearInterval(diffusionInterval);
    };
  }, []);

  return (
    <Slide>
      <SlideTitle gradient="linear-gradient(135deg, #4f8fff, #8b5cf6, #ec4899)">
        Generative AI
      </SlideTitle>

      <div style={{
        display: 'flex',
        gap: '3rem',
        width: '100%',
        maxWidth: '1050px',
        marginTop: '1rem',
      }}>
        {/* LLM Side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <h3 style={{
            color: '#4f8fff',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            fontWeight: 700,
            margin: 0,
          }}>
            Large Language Model
          </h3>

          {/* Token display */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid #4f8fff25',
            borderRadius: 12,
            padding: '1.5rem',
            minHeight: 130,
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            gap: '0.2rem',
          }}>
            {tokens.map((token, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: i < visibleTokens ? 1 : 0,
                  y: i < visibleTokens ? 0 : 8,
                }}
                transition={{ duration: 0.15 }}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
                  padding: '2px 4px',
                  borderRadius: 4,
                  color: 'var(--text-primary)',
                  background: i === visibleTokens - 1 ? '#4f8fff30' : 'transparent',
                  borderBottom: i === visibleTokens - 1 ? '2px solid #4f8fff' : '2px solid transparent',
                }}
              >
                {token}
              </motion.span>
            ))}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
                color: '#4f8fff',
              }}
            >
              |
            </motion.span>
          </div>

          {/* Token probability hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 2 }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
              color: 'var(--text-secondary)',
            }}
          >
            P(next token | context)
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 0.3, scaleY: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            width: 1,
            background: 'linear-gradient(180deg, transparent, #8b5cf6, transparent)',
            alignSelf: 'stretch',
          }}
        />

        {/* Diffusion Side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            flex: 1.3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <h3 style={{
            color: '#8b5cf6',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            fontWeight: 700,
            margin: 0,
          }}>
            Diffusion Model
          </h3>

          {/* Noise to image stages */}
          <DiffusionStages phase={diffusionPhase} />
        </motion.div>
      </div>

      <SlideSubtitle delay={3}>
        Trained on <span style={{ color: '#ef4444', fontWeight: 700 }}>MASSIVE</span> datasets. They remember more than you'd think.
      </SlideSubtitle>
    </Slide>
  );
}
