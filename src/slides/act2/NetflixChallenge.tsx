import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Slide, SlideTitle } from '../../components/SlideLayout';

const netflixData = [
  { movie: 'Enthiran', rating: 4, date: '2005-11-12', poster: '/images/enthiran.jpeg', review: '"Watched near Sathyam theatre, T. Nagar with college friends"' },
  { movie: 'The Dark Knight', rating: 5, date: '2005-12-03', poster: '/images/dark-night.jpeg', review: '"Best villain ever. Rewatched at my hostel in MCC campus"' },
  { movie: 'Vada Chennai', rating: 5, date: '2006-01-15', poster: '/images/vada-chennai.jpeg', review: '"North Madras representation! I live near Royapuram"' },
  { movie: 'Inception', rating: 4, date: '2006-02-20', poster: '/images/inception.jpeg', review: '"My data science prof would love the math in this"' },
  { movie: 'Ghilli', rating: 5, date: '2006-03-08', poster: '/images/ghilli.jpeg', review: '"Thalapathy fan since school days at Don Bosco"' },
  { movie: 'Interstellar', rating: 4, date: '2006-04-11', poster: '/images/interstellar.jpeg', review: '"Cried at the bookshelf scene. Alone at home in 600004"' },
];

const imdbData = [
  { user: 'movie_buff_chennai', movie: 'Enthiran', rating: 4, date: '2005-11-12', review: '"Rajini sir mass! Robot scenes were insane 🤖"', match: true },
  { user: 'movie_buff_chennai', movie: 'The Dark Knight', rating: 5, date: '2005-12-03', review: '"Heath Ledger deserved 10 Oscars for this"', match: true },
  { user: 'cinephile_mcc', movie: 'Kabali', rating: 3, date: '2006-01-10', review: '"Decent but expected more from Thalaivar"', match: false },
  { user: 'movie_buff_chennai', movie: 'Vada Chennai', rating: 5, date: '2006-01-15', review: '"Dhanush at his best. North Madras vibes 🔥"', match: true },
  { user: 'movie_buff_chennai', movie: 'Inception', rating: 4, date: '2006-02-20', review: '"Still thinking about the ending..."', match: true },
  { user: 'movie_buff_chennai', movie: 'Ghilli', rating: 5, date: '2006-03-08', review: '"Vijay + Trisha = blockbuster formula 💯"', match: true },
];

function Stars({ count, color = '#e50914', dimColor = '#444' }: { count: number; color?: string; dimColor?: string }) {
  return (
    <span style={{ fontSize: '0.8rem', letterSpacing: 2 }}>
      <span style={{ color }}>{'★'.repeat(count)}</span>
      <span style={{ color: dimColor }}>{'★'.repeat(5 - count)}</span>
    </span>
  );
}

export function NetflixChallenge() {
  const [step, setStep] = useState(0);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if ((e.key === 'ArrowRight' || e.key === ' ') && step < 2) {
      e.stopPropagation();
      setStep((s) => s + 1);
    }
  }, [step]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey, true);
    return () => window.removeEventListener('keydown', handleKey, true);
  }, [handleKey]);

  return (
    <Slide background="var(--slide-bg)" style={{ padding: '20px 36px' }}>
      <SlideTitle gradient="linear-gradient(135deg, #ef4444, #f97316)">
        The Netflix De-Anonymization
      </SlideTitle>

      <div style={{
        display: 'flex',
        gap: '1rem',
        width: '100%',
        maxWidth: 1350,
        flex: 1,
        minHeight: 0,
        alignItems: 'stretch',
      }}>
        {/* LEFT: Netflix panel */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            flex: step >= 1 ? 1 : 1.5,
            borderRadius: 12,
            overflow: 'hidden',
            background: '#141414',
            boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            transition: 'flex 0.6s ease',
          }}
        >
          {/* Netflix header bar */}
          <div style={{
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: '#000',
            borderBottom: '2px solid #e50914',
            flexShrink: 0,
          }}>
            <span style={{
              color: '#e50914', fontWeight: 900, fontSize: '1.1rem',
              letterSpacing: '-0.03em', fontFamily: 'Arial Black, sans-serif',
            }}>NETFLIX</span>
            <span style={{ color: '#808080', fontSize: '0.65rem' }}>Anonymized Dataset</span>
            <span style={{
              marginLeft: 'auto', color: '#e50914',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
              fontWeight: 700, background: '#e5091420', padding: '2px 10px', borderRadius: 4,
            }}>User #4829</span>
          </div>

          {/* Section label */}
          <div style={{ padding: '10px 16px 4px', color: '#fff', fontSize: '0.9rem', fontWeight: 700 }}>
            Ratings & Reviews by #4829
          </div>

          {/* Movie cards - horizontal scroll row */}
          <div style={{
            flex: 1,
            padding: '4px 12px 10px',
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            overflowY: 'hidden',
            alignItems: 'flex-start',
          }}>
            {netflixData.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.12 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                style={{
                  flexShrink: 0,
                  width: step >= 1 ? 130 : 170,
                  borderRadius: 8,
                  overflow: 'hidden',
                  background: '#1e1e1e',
                  cursor: 'pointer',
                  transition: 'width 0.6s ease, box-shadow 0.3s',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                }}
              >
                {/* Poster */}
                <div style={{
                  width: '100%',
                  aspectRatio: '2/3',
                  background: '#2a2a2a',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <img
                    src={row.poster}
                    alt={row.movie}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  {/* Rating overlay */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                    padding: '16px 6px 4px',
                  }}>
                    <Stars count={row.rating} />
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '6px 8px 8px' }}>
                  <div style={{ color: '#fff', fontSize: '0.72rem', fontWeight: 700, lineHeight: 1.2 }}>{row.movie}</div>
                  <div style={{ color: '#666', fontSize: '0.58rem', marginTop: 2, fontFamily: 'JetBrains Mono, monospace' }}>{row.date}</div>
                  <div style={{
                    color: '#bbb', fontSize: '0.58rem', marginTop: 4,
                    fontStyle: 'italic', lineHeight: 1.3,
                    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {row.review}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Prompt */}
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              style={{
                padding: '8px 16px', textAlign: 'center',
                borderTop: '1px solid #333', flexShrink: 0,
              }}
            >
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ color: '#999', fontSize: '0.8rem', fontStyle: 'italic' }}
              >
                No real names — just User #4829. How would you find who this is?
              </motion.span>
            </motion.div>
          )}
        </motion.div>

        {/* RIGHT: IMDb panel (step >= 1) */}
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              flex: 1,
              borderRadius: 12,
              overflow: 'hidden',
              background: '#1a1a1a',
              boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* IMDb header */}
            <div style={{
              background: 'linear-gradient(180deg, #1f1f1f, #121212)',
              padding: '8px 16px',
              display: 'flex', alignItems: 'center', gap: 10,
              borderBottom: '3px solid #f5c518',
              flexShrink: 0,
            }}>
              <div style={{
                background: '#f5c518', borderRadius: 4, padding: '2px 8px',
                fontWeight: 900, fontSize: '0.95rem', color: '#000',
              }}>IMDb</div>
              <span style={{ color: '#999', fontSize: '0.65rem' }}>Public User Reviews</span>
            </div>

            {/* Reviews list */}
            <div style={{ flex: 1, overflow: 'auto', padding: '4px 0' }}>
              {imdbData.map((row, i) => {
                const highlighted = step >= 2 && row.match;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    style={{
                      padding: '10px 14px',
                      borderBottom: '1px solid #222',
                      borderLeft: highlighted ? '3px solid #f5c518' : '3px solid transparent',
                      background: highlighted ? 'rgba(245,197,24,0.06)' : 'transparent',
                      transition: 'all 0.5s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        width: 26, height: 26, borderRadius: '50%',
                        background: '#2a3a5a', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.6rem', color: '#5799ef', fontWeight: 700, flexShrink: 0,
                      }}>{row.user[0].toUpperCase()}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
                          <span style={{ color: '#5799ef', fontSize: '0.72rem', fontWeight: 600 }}>{row.user}</span>
                          <span style={{ color: '#555', fontSize: '0.6rem' }}>reviewed</span>
                          <span style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 600 }}>{row.movie}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                          <Stars count={row.rating} color="#f5c518" dimColor="#3a3a1a" />
                          <span style={{ color: '#555', fontSize: '0.6rem', fontFamily: 'JetBrains Mono, monospace' }}>{row.date}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{
                      marginTop: 4, marginLeft: 34,
                      fontSize: '0.68rem', color: '#aaa', fontStyle: 'italic', lineHeight: 1.4,
                    }}>{row.review}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Match badge (step 2) */}
      {step >= 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', bounce: 0.5 }}
          style={{
            marginTop: '0.6rem', padding: '8px 24px', borderRadius: 12,
            background: 'rgba(239,68,68,0.12)', border: '2px solid #ef4444',
            boxShadow: '0 0 30px rgba(239,68,68,0.2)',
            display: 'flex', alignItems: 'center', gap: '0.8rem',
          }}
        >
          <motion.span
            animate={{ textShadow: ['0 0 10px rgba(239,68,68,0.5)', '0 0 25px rgba(239,68,68,0.8)', '0 0 10px rgba(239,68,68,0.5)'] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ fontSize: '1.1rem', fontWeight: 900, color: '#ef4444', letterSpacing: '0.08em' }}
          >MATCH FOUND</motion.span>
          <span style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 600 }}>
            <span style={{ color: '#e50914', fontFamily: 'JetBrains Mono, monospace' }}>#4829</span>
            {' = '}
            <span style={{ color: '#5799ef', fontFamily: 'JetBrains Mono, monospace' }}>movie_buff_chennai</span>
          </span>
        </motion.div>
      )}
      {step >= 2 && (
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ef4444', textAlign: 'center', marginTop: '0.4rem' }}
        >
          Same movies + same ratings + same dates = identity revealed.
        </motion.p>
      )}

      {/* Step dots */}
      <div style={{ position: 'absolute', bottom: 16, right: 24, display: 'flex', gap: 6 }}>
        {[0, 1, 2].map((s) => (
          <div key={s} style={{
            width: 8, height: 8, borderRadius: '50%',
            background: s <= step ? '#ef4444' : 'var(--card-border)', transition: 'background 0.3s',
          }} />
        ))}
      </div>
    </Slide>
  );
}
