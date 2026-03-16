import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Slide } from '../../components/SlideLayout';

const PREFIX = '> The following is a public record: East Stroudsburg Stroudsburg...';
const GENERATED_LINES = [
  { text: 'Name: John S. Richardson', isPII: true },
  { text: 'Address: 123 Oak Street, East Stroudsburg, PA 18301', isPII: true },
  { text: 'Phone: (570) 421-XXXX', isPII: true },
  { text: 'Fax: (570) 421-XXXX', isPII: true },
  { text: 'Email: jrichardson@xxxxx.com', isPII: true },
];

export function GPT2ExtractionDemo() {
  const [phase, setPhase] = useState(0); // 0=typing prefix, 1=generating, 2=done
  const [prefixLen, setPrefixLen] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [charInLine, setCharInLine] = useState(0);

  // Type the prefix
  useEffect(() => {
    if (phase !== 0) return;
    if (prefixLen >= PREFIX.length) {
      setTimeout(() => setPhase(1), 800);
      return;
    }
    const timer = setTimeout(() => setPrefixLen((p) => p + 1), 30);
    return () => clearTimeout(timer);
  }, [phase, prefixLen]);

  // Generate output lines character by character
  useEffect(() => {
    if (phase !== 1) return;
    if (visibleLines >= GENERATED_LINES.length) {
      setPhase(2);
      return;
    }
    const currentLine = GENERATED_LINES[visibleLines].text;
    if (charInLine >= currentLine.length) {
      setTimeout(() => {
        setVisibleLines((v) => v + 1);
        setCharInLine(0);
      }, 300);
      return;
    }
    const timer = setTimeout(() => setCharInLine((c) => c + 1), 25);
    return () => clearTimeout(timer);
  }, [phase, visibleLines, charInLine]);

  return (
    <Slide background="var(--slide-bg)">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
          color: 'var(--text-secondary)',
          marginBottom: '2rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        Watch this.
      </motion.div>

      {/* Terminal window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{
          background: 'var(--bg-card)',
          borderRadius: 12,
          padding: 0,
          width: '80%',
          maxWidth: 750,
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 1px rgba(79,143,255,0.3)',
          overflow: 'hidden',
          border: '1px solid var(--card-border)',
        }}
      >
        {/* Terminal header */}
        <div style={{
          background: 'var(--bg-secondary)',
          padding: '10px 16px',
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          borderBottom: '1px solid var(--card-border)',
        }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#eab308' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
          <span style={{ marginLeft: 12, fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>
            gpt2-extraction.py
          </span>
        </div>

        {/* Terminal body */}
        <div style={{
          padding: '20px 24px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)',
          lineHeight: 1.8,
          minHeight: 280,
        }}>
          {/* Prefix */}
          <div style={{ color: '#10b981' }}>
            {PREFIX.slice(0, prefixLen)}
            {phase === 0 && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                style={{ borderRight: '2px solid #10b981', marginLeft: 1 }}
              >
                {' '}
              </motion.span>
            )}
          </div>

          {phase >= 1 && (
            <div style={{ marginTop: 12, borderTop: '1px solid var(--card-border)', paddingTop: 12 }}>
              <div style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>Model output:</div>
              {GENERATED_LINES.slice(0, visibleLines + (phase >= 1 && visibleLines < GENERATED_LINES.length ? 1 : 0)).map((line, i) => {
                const isCurrentLine = i === visibleLines && phase === 1;
                const displayText = isCurrentLine ? line.text.slice(0, charInLine) : line.text;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ marginBottom: 4 }}
                  >
                    <span style={{
                      color: line.isPII ? '#ef4444' : 'var(--text-primary)',
                      textShadow: line.isPII && !isCurrentLine ? '0 0 8px rgba(239,68,68,0.4)' : 'none',
                    }}>
                      {displayText}
                    </span>
                    {isCurrentLine && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        style={{ borderRight: '2px solid #ef4444', marginLeft: 1 }}
                      >
                        {' '}
                      </motion.span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>

      {/* Reveal text after generation completes */}
      {phase === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            marginTop: '2rem',
            fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
            color: 'var(--text-secondary)',
            textAlign: 'center',
            lineHeight: 1.6,
          }}
        >
          <motion.span
            initial={{ color: 'var(--text-secondary)' }}
            animate={{ color: '#ef4444' }}
            transition={{ delay: 1 }}
          >
            This person never consented.
          </motion.span>
          {' '}The model memorized their data.
          <br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.5 }}
            style={{ fontSize: '0.9rem' }}
          >
            We'll come back to why this happens.
          </motion.span>
        </motion.div>
      )}
    </Slide>
  );
}
