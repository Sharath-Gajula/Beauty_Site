import { useState, useEffect, useRef } from 'react';
import { Heart, ChevronRight, Camera } from 'lucide-react';
import selfi from '../assets/selfi.jpeg'
interface StorySectionProps {
  onNext: () => void;
}

const storyParagraphs = [
  "Our story didn’t begin in 2023… it quietly started back in 2020, when we first knew each other. But maybe some stories take time to find their true beginning and ours truly began when we finally chose each other.",

  "In 2023, everything changed. What started unknowingly turned into something real a mix of laughter, silly jokes, endless teasing, and yes… a few fights too. Somehow, even in the chaos, we kept finding our way back to each other.",

  "We had our share of misunderstandings, moments where patience slipped, and times when things felt heavy. But the one thing that never changed was us because even when we fought, love never left the room.",

  "We didn’t have a perfect story… we had a real one. We learned, we grew, we held on. And somewhere between the laughter and the storms, you became my safe place the person I never want to lose.",
  "And maybe that’s what makes this special not perfect moments, but the way we stayed, understood, and kept choosing us in our own imperfect way."
];

export default function StorySection({ onNext }: StorySectionProps) {
  const [visible, setVisible] = useState(false);
  const [showSelfie, setShowSelfie] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-5"
      style={{
        background: 'linear-gradient(180deg, #fff5f7 0%, #fce4ec 50%, #ffd6e0 100%)',
      }}
    >
      {/* Section badge */}
      <div
        className={`flex items-center gap-2 mb-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <div className="h-px w-10 bg-pink-300" />
        <span className="text-pink-400 text-xs tracking-[0.3em] uppercase font-medium">Level 1</span>
        <div className="h-px w-10 bg-pink-300" />
      </div>

      <h2
        className={`font-script text-5xl sm:text-6xl text-pink-700 mb-2 text-center transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        Our Cute Story
      </h2>
      <p
        className={`text-pink-400 text-sm mb-10 text-center tracking-wide transition-all duration-700 delay-150 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        — how it all began —
      </p>

      {/* Story card */}
      <div
        className={`w-full max-w-md rounded-3xl p-7 shadow-xl mb-8 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(249,168,212,0.4)',
        }}
      >
        {/* Year badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
          style={{ background: 'linear-gradient(135deg, #fce4ec, #f8bbd0)' }}
        >
          <Heart fill="#e75480" color="#e75480" size={12} />
          <span className="font-serif italic text-pink-700 text-sm">Since 2023</span>
          <Heart fill="#e75480" color="#e75480" size={12} />
        </div>

        {storyParagraphs.map((para, i) => (
          <p
            key={i}
            className="text-gray-600 font-light leading-relaxed mb-4 last:mb-0 text-sm sm:text-base"
            style={{ transitionDelay: `${200 + i * 100}ms` }}
          >
            {para}
          </p>
        ))}

        {/* Timeline dots */}
        <div className="flex items-center justify-center gap-2 mt-6 pt-5 border-t border-pink-100">
          {['2023', '2024', '2025', 'Forever'].map((year, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`flex flex-col items-center gap-1 ${i <= 2 ? 'opacity-100' : 'opacity-50'}`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${i <= 2 ? 'bg-pink-500' : 'border-2 border-pink-300'}`}
                />
                <span className="text-pink-400 text-xs">{year}</span>
              </div>
              {i < 3 && <div className="w-6 h-px bg-pink-200 mb-4" />}
            </div>
          ))}
        </div>
      </div>

      {/* See Our Selfie */}
      <div className={`w-full max-w-md transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        {!showSelfie ? (
          <button
            onClick={() => setShowSelfie(true)}
            className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-white font-medium shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #f9a8d4, #e75480)',
              boxShadow: '0 8px 24px rgba(231,84,128,0.3)',
            }}
          >
            <Camera size={20} />
            <span>Our First Selfie 📸</span>
          </button>
        ) : (
          <div className="animate-fade-in-scale w-full rounded-3xl overflow-hidden shadow-2xl"
            style={{ border: '3px solid rgba(231,84,128,0.3)' }}
          >
            <div
              className="relative w-full aspect-[4/5] flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #f48fb1 100%)',
              }}
            >
              {/* Placeholder for selfie — Pexels couple photo */}
              <img
                 src={selfi}
                alt="Our beautiful memory"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(231,84,128,0.4) 0%, transparent 50%)' }}
              />
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="font-script text-white text-2xl drop-shadow-lg">Us ❤️</p>
                <p className="text-white/80 text-xs mt-1">2023 — The beginning of everything</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Next button */}
      <button
        onClick={onNext}
        className={`mt-8 flex items-center gap-2 px-7 py-3 rounded-full text-white font-medium shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        style={{
          background: 'linear-gradient(135deg, #e75480, #c62a47)',
          boxShadow: '0 6px 20px rgba(231,84,128,0.35)',
        }}
      >
        <span>Next</span>
        <ChevronRight size={18} />
        <span className="text-pink-200 text-sm">Level 2</span>
      </button>

      {/* Decorative hearts */}
      <div className="absolute top-16 left-4 opacity-20 text-5xl text-pink-300 animate-sway pointer-events-none">♥</div>
      <div className="absolute bottom-16 right-4 opacity-20 text-4xl text-pink-300 animate-sway pointer-events-none" style={{ animationDelay: '1s' }}>♥</div>
    </section>
  );
}
