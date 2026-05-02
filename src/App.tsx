import { useState, useEffect } from 'react';
import PinLock from './components/PinLock';
import FloatingHearts from './components/FloatingHearts';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import MiniGame1 from './components/MiniGame1';
import LoveLetterSection from './components/LoveLetterSection';
import MemoryGallery from './components/MemoryGallery';
import PatternGame from './components/PatternGame';
import FinalMessage from './components/FinalMessage';

type Stage =
  | 'pin'
  | 'hero'
  | 'story'
  | 'game1'
  | 'letter'
  | 'gallery'
  | 'game2'
  | 'final';

const SECTION_MAP: Record<Stage, number> = {
  pin: 0,
  hero: 0,
  story: 1,
  game1: 1,
  letter: 2,
  gallery: 3,
  game2: 3,
  final: 4,
};

export default function App() {
  const [stage, setStage] = useState<Stage>('pin');
  const [unlocked, setUnlocked] = useState(false);
  const [revealMain, setRevealMain] = useState(false);

  const handleUnlock = () => {
    setUnlocked(true);
    setTimeout(() => {
      setRevealMain(true);
      setStage('hero');
    }, 400);
  };

  useEffect(() => {
    if (stage !== 'pin') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [stage]);

  const currentSection = SECTION_MAP[stage];

  return (
    <>
      {/* PIN Lock Screen */}
      {!unlocked && <PinLock onUnlock={handleUnlock} />}

      {/* Main App */}
      {revealMain && (
        <div
          className="min-h-screen relative animate-page-reveal"
          style={{ background: '#fff5f7' }}
        >
          <FloatingHearts />
          <Navbar currentSection={currentSection} />

          {/* Hero */}
          {stage === 'hero' && (
            <div className="pt-14">
              <HeroSection onContinue={() => setStage('story')} />
            </div>
          )}

          {/* Story Section */}
          {stage === 'story' && (
            <div className="pt-14">
              <StorySection onNext={() => setStage('game1')} />
            </div>
          )}

          {/* Mini Game 1 */}
          {stage === 'game1' && (
            <MiniGame1 onComplete={() => setStage('letter')} />
          )}

          {/* Love Letter */}
          {stage === 'letter' && (
            <div className="pt-14">
              <LoveLetterSection onNext={() => setStage('gallery')} />
            </div>
          )}

          {/* Memory Gallery */}
          {stage === 'gallery' && (
            <div className="pt-14">
              <MemoryGallery onNext={() => setStage('game2')} />
            </div>
          )}

          {/* Pattern Game */}
          {stage === 'game2' && (
            <PatternGame onComplete={() => setStage('final')} />
          )}

          {/* Final Message */}
          {stage === 'final' && (
            <div className="pt-14">
              <FinalMessage />
            </div>
          )}
        </div>
      )}
    </>
  );
}
