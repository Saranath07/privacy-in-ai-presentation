import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Slide, SlideTitle } from '../../components/SlideLayout';

const records = [
  { id: 1, age: '25-30', gender: 'F', zip: '600', occupation: 'Tech', children: 0, genre: 'Horror' },
  { id: 2, age: '35-40', gender: 'M', zip: '110', occupation: 'Finance', children: 2, genre: 'Thriller' },
  { id: 3, age: '45-50', gender: 'M', zip: '560', occupation: 'Healthcare', children: 3, genre: 'Drama' },
  { id: 4, age: '20-25', gender: 'F', zip: '700', occupation: 'Student', children: 0, genre: 'Sci-Fi' },
  { id: 5, age: '30-35', gender: 'F', zip: '400', occupation: 'Marketing', children: 1, genre: 'Romance' },
  { id: 6, age: '55-60', gender: 'M', zip: '600', occupation: 'Retired', children: 2, genre: 'Documentary' },
  { id: 7, age: '25-30', gender: 'M', zip: '110', occupation: 'Tech', children: 0, genre: 'Action' },
  { id: 8, age: '40-45', gender: 'F', zip: '560', occupation: 'Education', children: 2, genre: 'Comedy' },
  { id: 9, age: '30-35', gender: 'M', zip: '700', occupation: 'Engineering', children: 1, genre: 'Sci-Fi' },
  { id: 10, age: '20-25', gender: 'F', zip: '400', occupation: 'Student', children: 0, genre: 'K-Drama' },
];

const bios = [
  {
    name: 'Priya',
    description: '28F, works in tech, lives in 600xxx area, no children, loves horror movies.',
    matchId: 1,
    color: '#4f8fff',
  },
  {
    name: 'Rahul',
    description: '37M, banker in Delhi (110xxx), married with 2 kids, loves thrillers.',
    matchId: 2,
    color: '#8b5cf6',
  },
  {
    name: 'Dr. Suresh',
    description: '47M, works in a hospital in Bangalore (560xxx), 3 kids, prefers dramas.',
    matchId: 3,
    color: '#10b981',
  },
  {
    name: 'Ananya',
    description: '22F, student from Hyderabad (400xxx), no children, into K-Drama.',
    matchId: 10,
    color: '#f97316',
  },
  {
    name: 'Vikram',
    description: '33M, engineer in 700xxx area, 1 child, big sci-fi fan.',
    matchId: 9,
    color: '#ef4444',
  },
];

const TOTAL_SECONDS = 4 * 60; // 4 minutes

const colStyle: React.CSSProperties = {
  padding: '6px 10px',
  fontSize: '0.7rem',
  color: 'var(--text-primary)',
  whiteSpace: 'nowrap',
};

const headerStyle: React.CSSProperties = {
  ...colStyle,
  color: 'var(--text-secondary)',
  fontWeight: 700,
  fontSize: '0.65rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  borderBottom: '1px solid var(--card-border)',
};

export function DeAnonymizationGame() {
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [timesUp, setTimesUp] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!started || timesUp) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setTimesUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [started, timesUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = timeLeft / TOTAL_SECONDS;

  const timerColor = progress > 0.5 ? '#10b981' : progress > 0.2 ? '#f97316' : '#ef4444';

  return (
    <Slide
      background="var(--slide-bg)"
      style={{ padding: '30px 50px' }}
    >
      <SlideTitle gradient="linear-gradient(135deg, #f97316, #ef4444)">
        Can You De-Anonymize This?
      </SlideTitle>

      {/* Timer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        {!started ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStarted(true)}
            style={{
              background: 'linear-gradient(135deg, #4f8fff, #8b5cf6)',
              border: 'none',
              borderRadius: 12,
              padding: '10px 28px',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(79,143,255,0.3)',
            }}
          >
            Start Timer (4:00)
          </motion.button>
        ) : (
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            {/* Timer display */}
            <motion.div
              animate={
                timesUp
                  ? { scale: [1, 1.2, 1], color: '#ef4444' }
                  : {}
              }
              transition={{ duration: 0.5 }}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '2rem',
                fontWeight: 800,
                color: timerColor,
                textShadow: `0 0 20px ${timerColor}40`,
                minWidth: 120,
                textAlign: 'center',
              }}
            >
              {timesUp ? "TIME'S UP!" : `${minutes}:${seconds.toString().padStart(2, '0')}`}
            </motion.div>

            {/* Progress bar */}
            {!timesUp && (
              <div
                style={{
                  width: 200,
                  height: 6,
                  borderRadius: 3,
                  background: 'var(--input-border)',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  style={{
                    height: '100%',
                    borderRadius: 3,
                    background: timerColor,
                    width: `${progress * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Main content: table + bios */}
      <div
        style={{
          display: 'flex',
          gap: '1.5rem',
          width: '100%',
          maxWidth: 1200,
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* Left: Table */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            flex: 1.4,
            background: 'var(--bg-card)',
            borderRadius: 12,
            border: '1px solid var(--card-border)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              padding: '10px 14px',
              borderBottom: '1px solid var(--card-border)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#f97316',
              }}
            />
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '0.05em',
              }}
            >
              "ANONYMIZED" RECORDS
            </span>
          </div>

          <div style={{ overflow: 'auto', flex: 1 }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.7rem',
              }}
            >
              <thead>
                <tr>
                  <th style={headerStyle}>ID</th>
                  <th style={headerStyle}>Age</th>
                  <th style={headerStyle}>Gender</th>
                  <th style={headerStyle}>Zip</th>
                  <th style={headerStyle}>Occupation</th>
                  <th style={headerStyle}># Kids</th>
                  <th style={headerStyle}>Fav Genre</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r, idx) => (
                  <motion.tr
                    key={r.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.05 }}
                    style={{
                      background:
                        idx % 2 === 0 ? 'var(--subtle-bg)' : 'transparent',
                      borderBottom: '1px solid var(--card-border)',
                    }}
                  >
                    <td style={{ ...colStyle, color: '#4f8fff', fontWeight: 700 }}>
                      {r.id}
                    </td>
                    <td style={colStyle}>{r.age}</td>
                    <td style={colStyle}>{r.gender}</td>
                    <td style={colStyle}>{r.zip}xxx</td>
                    <td style={colStyle}>{r.occupation}</td>
                    <td style={colStyle}>{r.children}</td>
                    <td style={colStyle}>{r.genre}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Right: Bio cards */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            overflow: 'auto',
          }}
        >
          <div
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--text-secondary)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '0.25rem',
            }}
          >
            Target Profiles — Match to a Record
          </div>

          {bios.map((bio, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + idx * 0.15, duration: 0.4 }}
              style={{
                background: 'var(--bg-card)',
                borderRadius: 10,
                padding: '0.75rem 1rem',
                borderLeft: `3px solid ${bio.color}`,
                boxShadow: `0 4px 12px rgba(0,0,0,0.2)`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontWeight: 800,
                    color: bio.color,
                    fontSize: '0.85rem',
                  }}
                >
                  {bio.name}
                </span>
                <span
                  style={{
                    fontSize: '0.6rem',
                    color: 'var(--text-secondary)',
                    background: 'var(--input-bg)',
                    padding: '1px 6px',
                    borderRadius: 4,
                  }}
                >
                  #{idx + 1}
                </span>
              </div>
              <p
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {bio.description}
              </p>

              {/* Show match after time's up */}
              <AnimatePresence>
                {timesUp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: idx * 0.3, duration: 0.4 }}
                    style={{
                      marginTop: 6,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: idx * 0.3 + 0.2,
                        type: 'spring',
                        bounce: 0.5,
                      }}
                      style={{
                        background: `${bio.color}25`,
                        border: `1px solid ${bio.color}`,
                        borderRadius: 6,
                        padding: '2px 10px',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        color: bio.color,
                      }}
                    >
                      Match: Record #{bio.matchId}
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Time's up overlay */}
      <AnimatePresence>
        {timesUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: [0, 1.3, 1], rotate: [-10, 5, 0] }}
              transition={{ duration: 0.6, times: [0, 0.6, 1] }}
              style={{
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                fontWeight: 900,
                color: '#ef4444',
                textShadow: '0 0 40px rgba(239,68,68,0.5)',
                opacity: 0.15,
              }}
            >
              TIME'S UP!
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Slide>
  );
}
