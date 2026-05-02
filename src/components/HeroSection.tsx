import { useEffect, useState } from 'react';
import { Heart, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onContinue: () => void;
}

export default function HeroSection({ onContinue }: HeroSectionProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #fff0f5 0%, #fce4ec 40%, #ffd6e0 70%, #fff5f7 100%)',
      }}
    >
      {/* Large background name watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ zIndex: 0 }}
      >
        <span
          className="font-script text-center leading-none"
          style={{
            fontSize: 'clamp(80px, 22vw, 220px)',
            color: 'rgba(231, 84, 128, 0.07)',
            letterSpacing: '-2px',
          }}
        >
          Anvitha
        </span>
      </div>

      {/* Heart pattern background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-pink-200"
            style={{
              fontSize: `${Math.random() * 18 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
              transform: `rotate(${Math.random() * 40 - 20}deg)`,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
        {/* Pulsing heart */}
        <div
          className={`mb-6 transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
        >
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full animate-ping-slow"
              style={{ background: 'rgba(231,84,128,0.25)' }}
            />
            <Heart
              fill="#e75480"
              color="#e75480"
              size={64}
              className="relative animate-pulse-heart drop-shadow-[0_0_20px_rgba(231,84,128,0.6)]"
            />
          </div>
        </div>

        <p
          className={`text-pink-400 tracking-[0.25em] uppercase text-xs font-medium mb-3 transition-all duration-700 delay-100 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          A gift just for you
        </p>

        <h1
          className={`font-script text-5xl sm:text-6xl text-pink-700 mb-4 leading-tight drop-shadow-sm transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Welcome to your world
        </h1>

        <div
          className={`flex items-center gap-2 mb-6 transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-pink-300" />
          <h2
            className="font-serif text-3xl sm:text-4xl italic font-semibold"
            style={{
              background: 'linear-gradient(135deg, #e75480, #c62a47, #ff6b9d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Anvitha
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-pink-300" />
        </div>

        <p
          className={`text-pink-500 font-light text-base sm:text-lg leading-relaxed mb-10 transition-all duration-700 delay-400 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          This is a little universe built entirely for you<br />
          filled with love, shaped by memories,<br />
          and held together by how much you mean to me. ❤️
        </p>

        <button
          onClick={onContinue}
          className={`group relative px-8 py-4 rounded-full text-white font-medium tracking-wide shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-700 delay-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            background: 'linear-gradient(135deg, #e75480, #c62a47)',
            boxShadow: '0 8px 32px rgba(231,84,128,0.4)',
          }}
        >
          <span className="flex items-center gap-2">
            <Heart fill="white" color="white" size={16} />
            Begin Our Story
            <Heart fill="white" color="white" size={16} />
          </span>
        </button>

        {/* Scroll cue */}
        <div className="mt-12 animate-bounce-gentle opacity-50">
          <ChevronDown size={24} className="text-pink-400" />
        </div>
      </div>

      {/* Decorative circles */}
      <div
        className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(231,84,128,0.12), transparent)',
          transform: 'translate(-40%, 40%)',
        }}
      />
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(231,84,128,0.1), transparent)',
          transform: 'translate(40%, -40%)',
        }}
      />
    </section>
  );
}
