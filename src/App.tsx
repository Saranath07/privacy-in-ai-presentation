import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import './styles/global.css';

// ACT 1: Hook + Foundations
import { TitleSlide } from './slides/act1/TitleSlide';
import { GPT2ExtractionDemo } from './slides/act1/GPT2ExtractionDemo';
import { WhatIsML } from './slides/act1/WhatIsML';
import { SupervisedLearning } from './slides/act1/SupervisedLearning';
import { UnsupervisedLearning } from './slides/act1/UnsupervisedLearning';
import { ReinforcementLearning } from './slides/act1/ReinforcementLearning';
import { MLBranchesOverview } from './slides/act1/MLBranchesOverview';
import { DeepLearning } from './slides/act1/DeepLearning';
import { GenerativeAI } from './slides/act1/GenerativeAI';
import { GradientDescent } from './slides/act1/GradientDescent';
import { GradientFingerprint } from './slides/act1/GradientFingerprint';
import { BridgeToPrivacy } from './slides/act1/BridgeToPrivacy';

// ACT 2: The Privacy Problem
import { AIArtOrStolenPhoto } from './slides/act2/AIArtOrStolenPhoto';
import { NetflixChallengeIntro } from './slides/act2/NetflixChallengeIntro';
import { NetflixChallenge } from './slides/act2/NetflixChallenge';
import { DeAnonymizationGame } from './slides/act2/DeAnonymizationGame';
import { DeAnonymizationReveal } from './slides/act2/DeAnonymizationReveal';

// ACT 3: Attacks
import { TwoTypesOfAttacks } from './slides/act3/TwoTypesOfAttacks';
import { MembershipInferenceGame } from './slides/act3/MembershipInferenceGame';
import { WhyModelsMemorize } from './slides/act3/WhyModelsMemorize';

// ACT 4: Defense
import { CoinFlipIntro } from './slides/act4/CoinFlipIntro';
import { CoinFlipCalculator } from './slides/act4/CoinFlipCalculator';
import { DPCoreConcept } from './slides/act4/DPCoreConcept';
import { EpsilonDial } from './slides/act4/EpsilonDial';
import { NoiseAddition } from './slides/act4/NoiseAddition';

// ACT 5: Solution
import { DPSGDSteps } from './slides/act5/DPSGDSteps';
import { AttackComparison } from './slides/act5/AttackComparison';
import { PrivacyUtilityTradeoff } from './slides/act5/PrivacyUtilityTradeoff';
import { WhereWouldYouSetTheDial } from './slides/act5/WhereWouldYouSetTheDial';

// ACT 6: Wrap-up
import { NarrativeTimeline } from './slides/act6/NarrativeTimeline';
import { QASlide } from './slides/act6/QASlide';

const slides = [
  TitleSlide,
  GPT2ExtractionDemo,
  WhatIsML,
  SupervisedLearning,
  UnsupervisedLearning,
  ReinforcementLearning,
  MLBranchesOverview,
  DeepLearning,
  GenerativeAI,
  GradientDescent,
  GradientFingerprint,
  BridgeToPrivacy,
  AIArtOrStolenPhoto,
  NetflixChallengeIntro,
  NetflixChallenge,
  DeAnonymizationGame,
  DeAnonymizationReveal,
  TwoTypesOfAttacks,
  MembershipInferenceGame,
  WhyModelsMemorize,
  CoinFlipIntro,
  CoinFlipCalculator,
  DPCoreConcept,
  EpsilonDial,
  NoiseAddition,
  DPSGDSteps,
  AttackComparison,
  PrivacyUtilityTradeoff,
  WhereWouldYouSetTheDial,
  NarrativeTimeline,
  QASlide,
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightMode, setLightMode] = useState(false);

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  const toggleLightMode = useCallback(() => {
    setLightMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('light', next);
      return next;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture keys when typing in inputs
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'l' || e.key === 'L') {
        e.preventDefault();
        toggleLightMode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, toggleFullscreen, toggleLightMode]);

  const CurrentSlideComponent = slides[currentSlide];

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <AnimatePresence mode="wait">
        <CurrentSlideComponent key={currentSlide} />
      </AnimatePresence>

      {/* Controls row */}
      <div style={{
        position: 'fixed', bottom: 16, right: 24,
        display: 'flex', gap: 12, alignItems: 'center',
        zIndex: 100, userSelect: 'none',
      }}>
        {/* Light/dark toggle */}
        <button
          onClick={toggleLightMode}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--card-border)',
            borderRadius: 8,
            padding: '4px 10px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            opacity: 0.6,
          }}
          title="Toggle light/dark mode (L)"
        >
          {lightMode ? '🌙' : '☀️'}
        </button>
        {/* Slide counter */}
        <span style={{
          fontSize: '0.9rem', color: 'var(--text-secondary)',
          opacity: 0.5, fontFamily: 'JetBrains Mono, monospace',
        }}>
          {currentSlide + 1} / {slides.length}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, height: 3,
        background: 'var(--gradient-primary)',
        width: `${((currentSlide + 1) / slides.length) * 100}%`,
        transition: 'width 0.4s ease', zIndex: 100,
      }} />
    </div>
  );
}

export default App;
