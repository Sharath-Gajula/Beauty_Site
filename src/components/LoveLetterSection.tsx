import { useState, useEffect, useRef } from 'react';
import { Heart, ChevronRight } from 'lucide-react';

interface LoveLetterSectionProps {
  onNext: () => void;
}

const FULL_LETTER = `My dearest Bittu,

At first, you might seem like a simple, regular girl and I’ll agree with that. But the more I got to know you, the more I realized there’s something rare about you… a genuinely beautiful heart that stands out in its own way.

And Bittu… those chubby cheeks of yours every time I touch them and they turn slightly reddish, you somehow look even more adorable.

The way you carry yourself, your nature, your behavior… everything about it just feels right, effortless, and comforting.

last one and most important, ne eyes untai choodu the most attractive thing in you thagakunna ne eyes chooste mathu ekkude

And honestly… I shouldn’t praise you too much, or I might end up casting a nazar on you.

Yours Bujjuu❤️`;

const REASONS = [
  "Because your smile lights up the whole room 🌸",
  "Because you care deeply about everything that matters 💕",
  "Because your laugh is the most beautiful sound I know 🎵",
  "Because you make even the ordinary feel magical ✨",
  "Because your heart is the kindest I've ever known 🌺",
  "Because you believed in me when I needed it most 🌟",
];

export default function LoveLetterSection({ onNext }: LoveLetterSectionProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [reasonIndex, setReasonIndex] = useState(0);
  const [showReason, setShowReason] = useState(false);
  const [reasonVisible, setReasonVisible] = useState(true);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setIsTyping(true), 600);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isTyping) return;
    let i = 0;
    const speed = 22;
    const interval = setInterval(() => {
      setDisplayedText(FULL_LETTER.slice(0, i + 1));
      i++;
      if (i >= FULL_LETTER.length) {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [isTyping]);

  const handleReasonClick = () => {
    setReasonVisible(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setReasonIndex(r => (r + 1) % REASONS.length);
      setShowReason(true);
      setReasonVisible(true);
    }, 300);
  };

  useEffect(() => {
    if (typingDone) setShowReason(true);
  }, [typingDone]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-5"
      style={{
        background: 'linear-gradient(160deg, #ffd6e0 0%, #fce4ec 50%, #fff5f7 100%)',
      }}
    >
      {/* Section badge */}
      <div className={`flex items-center gap-2 mb-4 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
        <div className="h-px w-10 bg-pink-300" />
        <span className="text-pink-400 text-xs tracking-[0.3em] uppercase font-medium">Level 2</span>
        <div className="h-px w-10 bg-pink-300" />
      </div>

      <h2 className={`font-script text-5xl sm:text-6xl text-pink-700 mb-2 text-center transition-all duration-700 delay-100 ${visible ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
        A Letter For You
      </h2>

      {/* Flower decoration */}
      <div className={`flex gap-2 mb-8 text-2xl transition-all duration-700 delay-200 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        🌸 💌 🌸
      </div>

      {/* Letter card */}
      <div
        className={`w-full max-w-md rounded-3xl p-7 shadow-xl mb-6 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(249,168,212,0.4)',
          boxShadow: '0 20px 60px rgba(231,84,128,0.12)',
        }}
      >
        {/* Paper lines effect */}
        <div
          className="absolute inset-0 rounded-3xl opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(249,168,212,0.4) 27px, rgba(249,168,212,0.4) 28px)',
            backgroundSize: '100% 28px',
            backgroundPosition: '0 40px',
          }}
        />

        <div className="relative">
          <div className="text-2xl text-center mb-4">💌</div>
          <pre
            className="text-gray-600 font-light text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-sans"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            {displayedText}
            {isTyping && !typingDone && (
              <span
                className="inline-block w-0.5 h-4 bg-pink-500 ml-0.5 align-middle"
                style={{ animation: 'blinkCursor 0.7s infinite' }}
              />
            )}
          </pre>
        </div>
      </div>

      {/* Reason click */}
      {showReason && (
        <div
          className={`w-full max-w-md mb-6 transition-all duration-700 delay-100 ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
          <button
            onClick={handleReasonClick}
            className="w-full rounded-2xl p-5 text-center transition-all duration-300 hover:scale-[1.02] active:scale-98"
            style={{
              background: 'linear-gradient(135deg, rgba(252,228,236,0.9), rgba(248,187,208,0.9))',
              border: '1px solid rgba(231,84,128,0.3)',
              boxShadow: '0 8px 24px rgba(231,84,128,0.15)',
            }}
          >
            <p className="text-pink-400 text-xs tracking-wider uppercase mb-2 font-medium">
              Every click = one reason I love you 💕
            </p>
            <p
              className={`text-pink-700 font-serif italic text-base sm:text-lg transition-all duration-300 ${
                reasonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              {REASONS[reasonIndex]}
            </p>
            <p className="text-pink-300 text-xs mt-2">Tap to discover the next reason →</p>
          </button>
        </div>
      )}

      {/* Stickers */}
      {typingDone && (
        <div className="flex gap-3 text-3xl mb-6 animate-fade-in-up">
          🌺 💕 🌸 💗 🌷
        </div>
      )}

      {/* Next button */}
      {typingDone && (
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-7 py-3 rounded-full text-white font-medium shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 animate-fade-in-up"
          style={{
            background: 'linear-gradient(135deg, #e75480, #c62a47)',
            boxShadow: '0 6px 20px rgba(231,84,128,0.35)',
          }}
        >
          <span>Next</span>
          <ChevronRight size={18} />
          <span className="text-pink-200 text-sm">Level 3</span>
        </button>
      )}

      <style>{`
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <div className="absolute top-20 right-4 opacity-15 text-6xl text-pink-300 animate-bounce-gentle pointer-events-none">🌸</div>
      <div className="absolute bottom-20 left-4 opacity-15 text-5xl text-pink-300 animate-bounce-gentle pointer-events-none" style={{ animationDelay: '1.2s' }}>💕</div>
    </section>
  );
}
