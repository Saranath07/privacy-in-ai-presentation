import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Slide, SlideTitle } from '../../components/SlideLayout';

const examples = [
  {
    id: 1,
    title: 'AI reproduced a real person',
    aiImage: '/images/diffusion-generated-image.png',
    realImage: '/images/diffusion-training-image.png',
    aiLabel: 'AI Generated',
    realLabel: 'Training Data',
    caption: 'Stable Diffusion output vs. the exact training photo it memorized',
  },
  {
    id: 2,
    title: 'Watermark baked into the model',
    aiImage: '/images/getyyyy.png',
    realImage: null,
    aiLabel: '"Gettyyyyyyyyy"',
    realLabel: null,
    caption: 'The model learned Getty\'s watermark because it trained on their photos',
  },
  {
    id: 3,
    title: 'More watermark leaks',
    aiImage: '/images/soccer-getty-image.png',
    realImage: '/images/image.png',
    aiLabel: 'AI Output',
    realLabel: 'AI Output',
    caption: 'Getty watermarks appear in completely unrelated AI generations',
  },
];

export function AIArtOrStolenPhoto() {
  const [activeExample, setActiveExample] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const current = examples[activeExample];

  const goNext = () => {
    if (!revealed) {
      setRevealed(true);
    } else if (activeExample < examples.length - 1) {
      setActiveExample((prev) => prev + 1);
      setRevealed(false);
    }
  };

  return (
    <Slide background="var(--slide-bg)">
      <SlideTitle gradient="linear-gradient(135deg, #4f8fff, #8b5cf6)">
        AI Art or Stolen Photo?
      </SlideTitle>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem' }}>
        {examples.map((_, i) => (
          <motion.div
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: i === activeExample ? '#8b5cf6' : 'var(--card-border)',
              cursor: 'pointer',
            }}
            whileHover={{ scale: 1.3 }}
            onClick={() => { setActiveExample(i); setRevealed(false); }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.4 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            width: '100%',
            maxWidth: 900,
          }}
        >
          {/* Example title */}
          <motion.div
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
              color: 'var(--text-secondary)',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            {current.title}
          </motion.div>

          {/* Image area */}
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* AI Image */}
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                flex: 1,
                maxWidth: current.realImage ? 350 : 400,
              }}
            >
              <div
                style={{
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: '2px solid #8b5cf660',
                  boxShadow: '0 8px 30px rgba(139,92,246,0.2)',
                  width: '100%',
                  aspectRatio: '1',
                  position: 'relative',
                  background: 'var(--bg-card)',
                }}
              >
                <img
                  src={current.aiImage}
                  alt="AI generated"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    padding: '4px 12px',
                    borderRadius: 20,
                    background: 'rgba(139,92,246,0.85)',
                    color: '#fff',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {current.aiLabel}
                </motion.div>
              </div>
            </motion.div>

            {/* Arrow or VS */}
            {current.realImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: revealed ? 1 : 0.3, scale: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  color: revealed ? '#ef4444' : 'var(--text-secondary)',
                  flexShrink: 0,
                }}
              >
                {revealed ? '=' : 'vs'}
              </motion.div>
            )}

            {/* Real Image (revealed) */}
            {current.realImage && (
              <motion.div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  flex: 1,
                  maxWidth: 350,
                }}
              >
                <div
                  onClick={goNext}
                  style={{
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: revealed ? '2px solid #ef444460' : '2px solid var(--card-border)',
                    boxShadow: revealed ? '0 8px 30px rgba(239,68,68,0.2)' : 'none',
                    width: '100%',
                    aspectRatio: '1',
                    position: 'relative',
                    cursor: 'pointer',
                    background: 'var(--bg-card)',
                    transition: 'border 0.3s, box-shadow 0.3s',
                  }}
                >
                  {!revealed ? (
                    <motion.div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'var(--bg-secondary)',
                      }}
                    >
                      <motion.span
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                          fontSize: '3rem',
                          fontWeight: 800,
                          color: 'var(--text-secondary)',
                        }}
                      >
                        ?
                      </motion.span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                        Click to reveal
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, rotateY: 90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      transition={{ duration: 0.5, type: 'spring' }}
                      style={{ width: '100%', height: '100%' }}
                    >
                      <img
                        src={current.realImage}
                        alt="Training data"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        style={{
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          padding: '4px 12px',
                          borderRadius: 20,
                          background: 'rgba(239,68,68,0.85)',
                          color: '#fff',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          letterSpacing: '0.05em',
                          backdropFilter: 'blur(4px)',
                        }}
                      >
                        {current.realLabel}
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Caption */}
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                  color: 'var(--text-secondary)',
                  textAlign: 'center',
                  marginTop: '0.5rem',
                  lineHeight: 1.5,
                }}
              >
                {current.caption}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Click prompt for single-image examples */}
          {!current.realImage && !revealed && (
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              onClick={goNext}
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                marginTop: '0.5rem',
              }}
            >
              Click to see why this matters
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bottom punchline - shows after last example is revealed */}
      <AnimatePresence>
        {activeExample === examples.length - 1 && revealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{
              marginTop: '1.5rem',
              textAlign: 'center',
            }}
          >
            <motion.p
              style={{
                fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                fontWeight: 800,
                color: '#ef4444',
                textShadow: '0 0 20px rgba(239,68,68,0.3)',
              }}
            >
              The model didn't create — it copied.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </Slide>
  );
}
