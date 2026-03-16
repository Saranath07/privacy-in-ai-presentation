import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Slide, SlideTitle } from '../../components/SlideLayout';

interface DataPoint {
  text: string;
  confidence: number;
  inTraining: boolean;
}

const round1: DataPoint[] = [
  { text: 'The movie was absolutely brilliant and captivating', confidence: 94, inTraining: true },
  { text: 'I found the restaurant ambiance quite pleasant', confidence: 61, inTraining: false },
  { text: 'This product completely changed my morning routine', confidence: 97, inTraining: true },
  { text: 'The hotel room was decent for the price', confidence: 55, inTraining: false },
];

const round2: DataPoint[] = [
  { text: 'The acting was phenomenal, especially the lead', confidence: 92, inTraining: true },
  { text: 'Delivery was on time and packaging was fine', confidence: 58, inTraining: false },
  { text: 'Best pizza I have ever had in my entire life', confidence: 96, inTraining: true },
];

const allItems = [...round1, ...round2];

function ConfidenceBar({ confidence }: { confidence: number }) {
  const color =
    confidence >= 90 ? '#ef4444' : confidence >= 70 ? '#f97316' : '#10b981';

  return (
    <div style={{ width: '100%', marginTop: '0.5rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.7rem',
          color: 'var(--text-secondary)',
          marginBottom: 4,
        }}
      >
        <span>Model Confidence</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ fontWeight: 700, color }}
        >
          {confidence}%
        </motion.span>
      </div>
      <div
        style={{
          height: 10,
          borderRadius: 5,
          background: 'var(--card-border)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${confidence}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          style={{
            height: '100%',
            borderRadius: 5,
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            boxShadow: `0 0 12px ${color}40`,
          }}
        />
      </div>
    </div>
  );
}

export function MembershipInferenceGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);

  const currentItem = allItems[currentIndex];
  const isRound2 = currentIndex >= round1.length;
  const roundLabel = isRound2
    ? `Round 2 - Competition (${currentIndex - round1.length + 1}/${round2.length})`
    : `Round 1 - Calibration (${currentIndex + 1}/${round1.length})`;

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleNext = () => {
    if (currentIndex >= allItems.length - 1) {
      setFinished(true);
    } else {
      setRevealed(false);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <Slide background="var(--slide-bg)">
      <SlideTitle gradient="linear-gradient(135deg, #4f8fff, #10b981)">
        Can You Spot the Training Data?
      </SlideTitle>

      {!finished ? (
        <>
          {/* Round indicator */}
          <motion.div
            key={roundLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontSize: '0.8rem',
              color: isRound2 ? '#f97316' : '#4f8fff',
              fontWeight: 700,
              letterSpacing: '0.05em',
              marginBottom: '1.5rem',
              padding: '4px 16px',
              borderRadius: 20,
              background: isRound2 ? 'rgba(249,115,22,0.1)' : 'rgba(79,143,255,0.1)',
              border: `1px solid ${isRound2 ? '#f9731640' : '#4f8fff40'}`,
            }}
          >
            {roundLabel}
          </motion.div>

          {/* Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'var(--bg-card)',
                borderRadius: 16,
                padding: '2rem 2.5rem',
                maxWidth: 650,
                width: '100%',
                border: revealed
                  ? currentItem.inTraining
                    ? '2px solid #10b981'
                    : '2px solid #ef4444'
                  : '1px solid var(--card-border)',
                boxShadow: revealed
                  ? currentItem.inTraining
                    ? '0 0 30px rgba(16,185,129,0.15)'
                    : '0 0 30px rgba(239,68,68,0.15)'
                  : '0 8px 32px rgba(0,0,0,0.3)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border 0.3s, box-shadow 0.3s',
              }}
            >
              {/* Quote marks */}
              <span
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 16,
                  fontSize: '3rem',
                  color: 'var(--subtle-border)',
                  fontFamily: 'Georgia, serif',
                  lineHeight: 1,
                }}
              >
                "
              </span>

              {/* Sentence text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                  fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
                  color: 'var(--text-primary)',
                  textAlign: 'center',
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                  margin: '0.5rem 0 1rem',
                }}
              >
                "{currentItem.text}"
              </motion.p>

              {/* Confidence bar */}
              <ConfidenceBar
                confidence={currentItem.confidence}
              />

              {/* Reveal badge */}
              <AnimatePresence>
                {revealed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                    style={{
                      marginTop: '1rem',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        padding: '8px 24px',
                        borderRadius: 30,
                        fontSize: '0.9rem',
                        fontWeight: 800,
                        letterSpacing: '0.05em',
                        background: currentItem.inTraining
                          ? 'rgba(16,185,129,0.15)'
                          : 'rgba(239,68,68,0.15)',
                        border: currentItem.inTraining
                          ? '2px solid #10b981'
                          : '2px solid #ef4444',
                        color: currentItem.inTraining ? '#10b981' : '#ef4444',
                      }}
                    >
                      {currentItem.inTraining
                        ? 'IN TRAINING DATA'
                        : 'NOT IN TRAINING DATA'}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1.5rem',
            }}
          >
            {!revealed ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReveal}
                style={{
                  background: 'linear-gradient(135deg, #4f8fff, #8b5cf6)',
                  border: 'none',
                  borderRadius: 12,
                  padding: '12px 32px',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(79,143,255,0.3)',
                }}
              >
                REVEAL
              </motion.button>
            ) : (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                style={{
                  background: 'linear-gradient(135deg, #10b981, #4f8fff)',
                  border: 'none',
                  borderRadius: 12,
                  padding: '12px 32px',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(16,185,129,0.3)',
                }}
              >
                {currentIndex >= allItems.length - 1 ? 'FINISH' : 'NEXT'}
              </motion.button>
            )}
          </motion.div>

          {/* Progress dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              display: 'flex',
              gap: 6,
              marginTop: '1rem',
            }}
          >
            {allItems.map((_, idx) => (
              <div
                key={idx}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background:
                    idx < currentIndex
                      ? '#4f8fff'
                      : idx === currentIndex
                      ? 'var(--text-primary)'
                      : 'var(--input-border)',
                  transition: 'background 0.3s',
                }}
              />
            ))}
          </motion.div>
        </>
      ) : (
        /* Finished state */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', maxWidth: 600 }}
        >
          {/* Pattern display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              display: 'flex',
              gap: '0.5rem',
              justifyContent: 'center',
              marginBottom: '2rem',
              flexWrap: 'wrap',
            }}
          >
            {allItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.1, type: 'spring' }}
                style={{
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  background: item.inTraining
                    ? 'rgba(16,185,129,0.15)'
                    : 'rgba(239,68,68,0.15)',
                  border: item.inTraining
                    ? '1px solid #10b981'
                    : '1px solid #ef4444',
                  color: item.inTraining ? '#10b981' : '#ef4444',
                }}
              >
                {item.confidence}% {item.inTraining ? 'IN' : 'OUT'}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              marginBottom: '1rem',
              lineHeight: 1.6,
            }}
          >
            High confidence = likely memorized. Low confidence = likely not seen.
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, type: 'spring' }}
            style={{
              fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #ef4444, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            You attacked a model with nothing but its output.
          </motion.h2>
        </motion.div>
      )}
    </Slide>
  );
}
