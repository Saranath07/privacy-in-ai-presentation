import { motion } from 'framer-motion';
import { Slide, SlideTitle } from '../../components/SlideLayout';
import { AnimatedText } from '../../components/AnimatedText';

function DrippingDrop({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.div
      initial={{ y: 0, opacity: 0.8 }}
      animate={{ y: [0, 80, 80], opacity: [0.8, 0.8, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay,
        ease: 'easeIn',
      }}
      style={{
        position: 'absolute',
        bottom: -10,
        left: x,
        width: 6,
        height: 10,
        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
        background: 'linear-gradient(180deg, #ef4444, #ef444400)',
      }}
    />
  );
}

export function TwoTypesOfAttacks() {
  return (
    <Slide background="var(--slide-bg)">
      <SlideTitle gradient="linear-gradient(135deg, #ef4444, #f97316)">
        Two Types of Privacy Attacks
      </SlideTitle>

      <div
        style={{
          display: 'flex',
          gap: '2rem',
          width: '100%',
          maxWidth: 1000,
          marginTop: '2rem',
          justifyContent: 'center',
        }}
      >
        {/* Left: Data Extraction */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{
            flex: 1,
            background: 'var(--bg-card)',
            borderRadius: 20,
            padding: '2rem',
            border: '1px solid #ef444440',
            boxShadow: '0 8px 40px rgba(239,68,68,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {/* Model icon (box/brain) with dripping data */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: 'spring', bounce: 0.4 }}
            style={{ position: 'relative', marginBottom: '2rem' }}
          >
            {/* Brain/model box */}
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
            >
              {/* Box shape */}
              <rect
                x="15"
                y="15"
                width="70"
                height="70"
                rx="12"
                fill="var(--bg-card)"
                stroke="#ef4444"
                strokeWidth="2"
              />
              {/* Neural network inside */}
              <circle cx="35" cy="35" r="4" fill="#ef4444" opacity="0.6" />
              <circle cx="65" cy="35" r="4" fill="#ef4444" opacity="0.6" />
              <circle cx="50" cy="50" r="5" fill="#ef4444" opacity="0.8" />
              <circle cx="35" cy="65" r="4" fill="#ef4444" opacity="0.6" />
              <circle cx="65" cy="65" r="4" fill="#ef4444" opacity="0.6" />
              <line x1="35" y1="35" x2="50" y2="50" stroke="#ef4444" strokeWidth="1" opacity="0.4" />
              <line x1="65" y1="35" x2="50" y2="50" stroke="#ef4444" strokeWidth="1" opacity="0.4" />
              <line x1="50" y1="50" x2="35" y2="65" stroke="#ef4444" strokeWidth="1" opacity="0.4" />
              <line x1="50" y1="50" x2="65" y2="65" stroke="#ef4444" strokeWidth="1" opacity="0.4" />
              {/* Label */}
              <text x="50" y="92" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
                MODEL
              </text>
            </svg>

            {/* Dripping drops */}
            <DrippingDrop delay={0} x={25} />
            <DrippingDrop delay={0.7} x={45} />
            <DrippingDrop delay={1.4} x={65} />
            <DrippingDrop delay={0.3} x={35} />
            <DrippingDrop delay={1.0} x={55} />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            style={{
              fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
              fontWeight: 800,
              color: '#ef4444',
              marginBottom: '0.75rem',
            }}
          >
            Data Extraction
          </motion.h3>

          <AnimatedText
            delay={1.5}
            variant="fadeIn"
            style={{
              fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}
          >
            The model literally spits out training data
          </AnimatedText>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            width: 1,
            background: 'linear-gradient(180deg, transparent, #4f8fff40, transparent)',
            alignSelf: 'stretch',
          }}
        />

        {/* Right: Membership Inference */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          style={{
            flex: 1,
            background: 'var(--bg-card)',
            borderRadius: 20,
            padding: '2rem',
            border: '1px solid #4f8fff40',
            boxShadow: '0 8px 40px rgba(79,143,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Detective magnifying glass */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.0, type: 'spring', bounce: 0.4 }}
            style={{ position: 'relative', marginBottom: '2rem' }}
          >
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
            >
              {/* Magnifying glass */}
              <circle
                cx="42"
                cy="42"
                r="24"
                stroke="#4f8fff"
                strokeWidth="3"
                fill="rgba(79,143,255,0.05)"
              />
              <line
                x1="59"
                y1="59"
                x2="82"
                y2="82"
                stroke="#4f8fff"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Eye inside */}
              <ellipse cx="42" cy="42" rx="12" ry="8" stroke="#4f8fff" strokeWidth="1.5" opacity="0.6" />
              <circle cx="42" cy="42" r="4" fill="#4f8fff" opacity="0.8" />

              {/* Floating output indicators */}
              <motion.g
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <rect x="70" y="20" width="20" height="3" rx="1.5" fill="#4f8fff" opacity="0.4" />
                <rect x="72" y="27" width="16" height="3" rx="1.5" fill="#4f8fff" opacity="0.3" />
                <rect x="74" y="34" width="12" height="3" rx="1.5" fill="#4f8fff" opacity="0.2" />
              </motion.g>
            </svg>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{
              fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
              fontWeight: 800,
              color: '#4f8fff',
              marginBottom: '0.75rem',
            }}
          >
            Membership Inference
          </motion.h3>

          <AnimatedText
            delay={1.7}
            variant="fadeIn"
            style={{
              fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}
          >
            Can you tell if someone's data was used to train this?
          </AnimatedText>
        </motion.div>
      </div>
    </Slide>
  );
}
