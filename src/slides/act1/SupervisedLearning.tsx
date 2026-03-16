import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Slide, SlideTitle } from '../../components/SlideLayout';
import { AnimatedText } from '../../components/AnimatedText';

const examples = [
  { input: 'Email', output: 'Spam / Not Spam', color: '#4f8fff', icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6' },
  { input: 'Image', output: 'Cat / Dog', color: '#8b5cf6', icon: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
  { input: 'Patient Scan', output: 'Diagnosis', color: '#10b981', icon: 'M22 12h-4l-3 9L9 3l-3 9H2' },
];

export function SupervisedLearning() {
  const [step, setStep] = useState(0);
  const maxSteps = 4; // 0=layout, 1-3=examples, 4=prompt

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (step < maxSteps) {
          e.stopPropagation();
          setStep(s => s + 1);
        }
      }
    };
    window.addEventListener('keydown', handler, true); // capture phase
    return () => window.removeEventListener('keydown', handler, true);
  }, [step]);

  const modelLabel = step >= 1 ? 'f(x)' : '?';

  return (
    <Slide>
      <SlideTitle gradient="linear-gradient(135deg, #4f8fff, #8b5cf6)">
        Supervised Learning
      </SlideTitle>

      {/* Main flow layout */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        width: '100%',
        maxWidth: '900px',
        marginTop: '0.5rem',
      }}>
        {/* Input -> Model -> Output header labels */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          width: '100%',
        }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)',
              color: 'var(--text-secondary)',
              fontFamily: 'JetBrains Mono, monospace',
              width: '180px',
              textAlign: 'center',
            }}
          >
            INPUT
          </motion.span>
          <div style={{ width: '60px' }} />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.4 }}
            style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)',
              color: 'var(--text-secondary)',
              fontFamily: 'JetBrains Mono, monospace',
              width: '140px',
              textAlign: 'center',
            }}
          >
            MODEL
          </motion.span>
          <div style={{ width: '60px' }} />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.5 }}
            style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)',
              color: 'var(--text-secondary)',
              fontFamily: 'JetBrains Mono, monospace',
              width: '180px',
              textAlign: 'center',
            }}
          >
            OUTPUT
          </motion.span>
        </div>

        {/* The model black box (always visible) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          position: 'relative',
        }}>
          {/* Spacer for input side */}
          <div style={{ width: '180px' }} />
          <div style={{ width: '60px' }} />

          {/* Model box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{
              opacity: 1,
              scale: 1,
              boxShadow: step >= 1
                ? '0 0 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.1)'
                : '0 0 15px rgba(139, 92, 246, 0.15)',
            }}
            transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
            style={{
              width: '140px',
              height: '100px',
              borderRadius: 18,
              background: 'var(--bg-card)',
              border: '2px solid #8b5cf650',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.3rem',
              position: 'relative',
              zIndex: 5,
            }}
          >
            <motion.span
              key={modelLabel}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                fontWeight: 700,
                color: '#8b5cf6',
              }}
            >
              {modelLabel}
            </motion.span>
          </motion.div>

          <div style={{ width: '60px' }} />
          <div style={{ width: '180px' }} />
        </div>

        {/* Examples - each one flows through */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '100%',
          marginTop: '0.5rem',
        }}>
          {examples.map((ex, i) => {
            const exStep = i + 1;
            const isVisible = step >= exStep;

            return (
              <AnimatePresence key={i}>
                {isVisible && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0',
                      width: '100%',
                    }}
                  >
                    {/* Input box */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0 }}
                      style={{
                        width: '180px',
                        padding: '0.7rem 1rem',
                        borderRadius: 12,
                        background: `${ex.color}12`,
                        border: `1px solid ${ex.color}40`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ex.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={ex.icon} />
                      </svg>
                      <span style={{
                        color: 'var(--text-primary)',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)',
                        fontWeight: 500,
                      }}>
                        {ex.input}
                      </span>
                    </motion.div>

                    {/* Arrow with traveling dot: input -> model */}
                    <svg width="60" height="24" viewBox="0 0 60 24" style={{ flexShrink: 0 }}>
                      <motion.line
                        x1="2" y1="12" x2="45" y2="12"
                        stroke={ex.color}
                        strokeWidth="2"
                        strokeOpacity="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      />
                      <motion.polygon
                        points="42,7 54,12 42,17"
                        fill={ex.color}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: 0.4 }}
                      />
                      <motion.circle
                        r="3" cy="12" fill={ex.color}
                        initial={{ cx: 2, opacity: 0 }}
                        animate={{ cx: [2, 50], opacity: [1, 0] }}
                        transition={{ delay: 0.5, duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
                      />
                    </svg>

                    {/* Model placeholder (invisible spacer - model is positioned above) */}
                    <div style={{ width: '140px', flexShrink: 0 }} />

                    {/* Arrow with traveling dot: model -> output */}
                    <svg width="60" height="24" viewBox="0 0 60 24" style={{ flexShrink: 0 }}>
                      <motion.line
                        x1="2" y1="12" x2="45" y2="12"
                        stroke={ex.color}
                        strokeWidth="2"
                        strokeOpacity="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                      />
                      <motion.polygon
                        points="42,7 54,12 42,17"
                        fill={ex.color}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: 0.8 }}
                      />
                      <motion.circle
                        r="3" cy="12" fill={ex.color}
                        initial={{ cx: 2, opacity: 0 }}
                        animate={{ cx: [2, 50], opacity: [1, 0] }}
                        transition={{ delay: 0.9, duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
                      />
                    </svg>

                    {/* Output box */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                      style={{
                        width: '180px',
                        padding: '0.7rem 1rem',
                        borderRadius: 12,
                        background: `${ex.color}08`,
                        border: `1px solid ${ex.color}30`,
                        textAlign: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <span style={{
                        color: ex.color,
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                        fontWeight: 600,
                      }}>
                        {ex.output}
                      </span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>

        {/* Prompt after all examples */}
        <AnimatePresence>
          {step >= maxSteps && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatedText
                variant="fadeUp"
                delay={0.2}
                style={{
                  marginTop: '1rem',
                  fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                  color: 'var(--text-secondary)',
                  fontStyle: 'italic',
                  textAlign: 'center',
                }}
              >
                What other examples can you think of?
              </AnimatedText>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Slide>
  );
}
