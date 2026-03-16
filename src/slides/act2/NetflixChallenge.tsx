import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Slide, SlideTitle } from '../../components/SlideLayout';
import { images } from '../../assets/images';

const netflixData = [
  { movie: 'Enthiran', rating: 4, date: '2005-11-12', poster: images.enthiran, review: '"Watched near Sathyam theatre, T. Nagar with college friends"' },
  { movie: 'The Dark Knight', rating: 5, date: '2005-12-03', poster: images.darkKnight, review: '"Best villain ever. Rewatched at my hostel in MCC campus"' },
  { movie: 'Vada Chennai', rating: 5, date: '2006-01-15', poster: images.vadaChennai, review: '"North Madras representation! I live near Royapuram"' },
  { movie: 'Inception', rating: 4, date: '2006-02-20', poster: images.inception, review: '"My data science prof would love the math in this"' },
  { movie: 'Ghilli', rating: 5, date: '2006-03-08', poster: images.ghilli, review: '"Thalapathy fan since school days at Don Bosco"' },
  { movie: 'Interstellar', rating: 4, date: '2006-04-11', poster: images.interstellar, review: '"Cried at the bookshelf scene. Alone at home in 600004"' },
];

const imdbData = [
  { user: 'movie_buff_chennai', movie: 'Enthiran', rating: 4, date: '2005-11-12', review: '"Rajini sir mass! Robot scenes were insane"', match: true },
  { user: 'movie_buff_chennai', movie: 'The Dark Knight', rating: 5, date: '2005-12-03', review: '"Heath Ledger deserved 10 Oscars for this"', match: true },
  { user: 'cinephile_mcc', movie: 'Kabali', rating: 3, date: '2006-01-10', review: '"Decent but expected more from Thalaivar"', match: false },
  { user: 'movie_buff_chennai', movie: 'Vada Chennai', rating: 5, date: '2006-01-15', review: '"Dhanush at his best. North Madras vibes"', match: true },
  { user: 'movie_buff_chennai', movie: 'Inception', rating: 4, date: '2006-02-20', review: '"Still thinking about the ending..."', match: true },
  { user: 'movie_buff_chennai', movie: 'Ghilli', rating: 5, date: '2006-03-08', review: '"Vijay + Trisha = blockbuster formula"', match: true },
];

function Stars({ count, color = '#e50914', dimColor = '#444', size = '1rem' }: { count: number; color?: string; dimColor?: string; size?: string }) {
  return (
    <span style={{ fontSize: size, letterSpacing: 2 }}>
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
    <Slide background="var(--slide-bg)" style={{ padding: '16px 28px' }}>
      <SlideTitle gradient="linear-gradient(135deg, #ef4444, #f97316)">
        The Netflix De-Anonymization
      </SlideTitle>

      <div style={{
        display: 'flex',
        gap: '1.2rem',
        width: '100%',
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
            flex: step >= 1 ? 1 : 1.8,
            borderRadius: 14,
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
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            background: '#000',
            borderBottom: '3px solid #e50914',
            flexShrink: 0,
          }}>
            <span style={{
              color: '#e50914', fontWeight: 900, fontSize: '1.4rem',
              letterSpacing: '-0.03em', fontFamily: 'Arial Black, sans-serif',
            }}>NETFLIX</span>
            <span style={{ color: '#808080', fontSize: '0.8rem' }}>Anonymized Dataset</span>
            <span style={{
              marginLeft: 'auto', color: '#e50914',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem',
              fontWeight: 700, background: '#e5091420', padding: '4px 14px', borderRadius: 6,
            }}>User #4829</span>
          </div>

          {/* Section label */}
          <div style={{ padding: '12px 20px 6px', color: '#fff', fontSize: '1.1rem', fontWeight: 700 }}>
            Ratings & Reviews by #4829
          </div>

          {/* Movie cards - vertical list for bigger display */}
          <div style={{
            flex: 1,
            padding: '6px 14px 10px',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}>
            {netflixData.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  background: '#1e1e1e',
                  borderRadius: 10,
                  padding: '8px 12px',
                  flexShrink: 0,
                }}
              >
                {/* Poster thumbnail */}
                <div style={{
                  width: 50,
                  height: 70,
                  borderRadius: 6,
                  overflow: 'hidden',
                  flexShrink: 0,
                  background: '#2a2a2a',
                }}>
                  <img
                    src={row.poster}
                    alt={row.movie}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span style={{ color: '#fff', fontSize: '1rem', fontWeight: 700 }}>{row.movie}</span>
                    <Stars count={row.rating} size="0.9rem" />
                    <span style={{ color: '#777', fontSize: '0.8rem', fontFamily: 'JetBrains Mono, monospace' }}>{row.date}</span>
                  </div>
                  <div style={{
                    color: '#ccc', fontSize: '0.85rem', marginTop: 4,
                    fontStyle: 'italic', lineHeight: 1.4,
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
                padding: '10px 20px', textAlign: 'center',
                borderTop: '1px solid #333', flexShrink: 0,
              }}
            >
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ color: '#999', fontSize: '0.95rem', fontStyle: 'italic' }}
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
              borderRadius: 14,
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
              padding: '10px 20px',
              display: 'flex', alignItems: 'center', gap: 12,
              borderBottom: '3px solid #f5c518',
              flexShrink: 0,
            }}>
              <div style={{
                background: '#f5c518', borderRadius: 6, padding: '4px 12px',
                fontWeight: 900, fontSize: '1.2rem', color: '#000',
              }}>IMDb</div>
              <span style={{ color: '#999', fontSize: '0.85rem' }}>Public User Reviews</span>
            </div>

            {/* Reviews list */}
            <div style={{ flex: 1, overflow: 'auto', padding: '6px 0' }}>
              {imdbData.map((row, i) => {
                const highlighted = step >= 2 && row.match;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    style={{
                      padding: '12px 18px',
                      borderBottom: '1px solid #2a2a2a',
                      borderLeft: highlighted ? '4px solid #f5c518' : '4px solid transparent',
                      background: highlighted ? 'rgba(245,197,24,0.08)' : 'transparent',
                      transition: 'all 0.5s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: '50%',
                        background: '#2a3a5a', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.8rem', color: '#5799ef', fontWeight: 700, flexShrink: 0,
                      }}>{row.user[0].toUpperCase()}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                          <span style={{ color: '#5799ef', fontSize: '0.95rem', fontWeight: 700 }}>{row.user}</span>
                          <span style={{ color: '#666', fontSize: '0.8rem' }}>reviewed</span>
                          <span style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 700 }}>{row.movie}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }}>
                          <Stars count={row.rating} color="#f5c518" dimColor="#3a3a1a" size="0.95rem" />
                          <span style={{ color: '#666', fontSize: '0.8rem', fontFamily: 'JetBrains Mono, monospace' }}>{row.date}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{
                      marginTop: 6, marginLeft: 44,
                      fontSize: '0.9rem', color: '#bbb', fontStyle: 'italic', lineHeight: 1.5,
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
            marginTop: '0.8rem', padding: '10px 28px', borderRadius: 14,
            background: 'rgba(239,68,68,0.12)', border: '2px solid #ef4444',
            boxShadow: '0 0 30px rgba(239,68,68,0.2)',
            display: 'flex', alignItems: 'center', gap: '1rem',
          }}
        >
          <motion.span
            animate={{ textShadow: ['0 0 10px rgba(239,68,68,0.5)', '0 0 25px rgba(239,68,68,0.8)', '0 0 10px rgba(239,68,68,0.5)'] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ fontSize: '1.3rem', fontWeight: 900, color: '#ef4444', letterSpacing: '0.08em' }}
          >MATCH FOUND</motion.span>
          <span style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 600 }}>
            <span style={{ color: '#e50914', fontFamily: 'JetBrains Mono, monospace' }}>#4829</span>
            {' = '}
            <span style={{ color: '#5799ef', fontFamily: 'JetBrains Mono, monospace' }}>movie_buff_chennai</span>
          </span>
        </motion.div>
      )}
      {step >= 2 && (
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ef4444', textAlign: 'center', marginTop: '0.5rem' }}
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
