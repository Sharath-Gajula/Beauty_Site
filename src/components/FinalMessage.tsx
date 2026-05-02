import { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';

export default function FinalMessage() {
  const [visible, setVisible] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setHeartBurst(true), 800);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 px-5"
    >
      {/* Full background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="background"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(160deg, rgba(139,26,74,0.82) 0%, rgba(45,12,32,0.88) 40%, rgba(26,8,20,0.92) 100%)',
          }}
        />
        {/* Soft pink glow overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(231,84,128,0.25) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Burst hearts */}
      {heartBurst && Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-pink-400 pointer-events-none animate-float-up"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '0%',
            fontSize: `${Math.random() * 20 + 10}px`,
            animationDuration: `${Math.random() * 6 + 5}s`,
            animationDelay: `${Math.random() * 4}s`,
            opacity: 0,
          }}
        >
          {['♥','❤','💕','💗','💓','💖'][Math.floor(Math.random()*6)]}
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md">

        {/* Section badge */}
        <div className={`flex items-center gap-2 mb-6 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          <div className="h-px w-10 bg-pink-400/40" />
          <span className="text-pink-400 text-xs tracking-[0.3em] uppercase font-medium">Final Level</span>
          <div className="h-px w-10 bg-pink-400/40" />
        </div>

        {/* Giant heart */}
        <div className={`mb-6 transition-all duration-700 delay-100 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'rgba(231,84,128,0.2)',
                filter: 'blur(20px)',
                transform: 'scale(1.5)',
              }}
            />
            <Heart
              fill="#e75480"
              color="#e75480"
              size={80}
              className="relative animate-pulse-heart drop-shadow-[0_0_30px_rgba(231,84,128,0.9)]"
            />
          </div>
        </div>

        {/* Title */}
        <h2
          className={`font-script text-5xl sm:text-6xl text-pink-300 mb-3 drop-shadow-lg transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          My Sweetest Bittu
        </h2>

        {/* Decorative divider */}
        <div
          className={`flex items-center gap-3 mb-6 w-full justify-center transition-all duration-700 delay-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(to right, transparent, rgba(249,168,212,0.6))' }} />
          <span className="text-pink-400 text-lg">♥ ♥ ♥</span>
          <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(to left, transparent, rgba(249,168,212,0.6))' }} />
        </div>

        {/* Main message card */}
        <div
          className={`rounded-3xl p-7 mb-6 w-full transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(231,84,128,0.3)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}
        >
          <p className="text-white/90 font-light leading-relaxed text-sm sm:text-base mb-4">
            Today, on this special day, I just want you to know —
            every breath feels more meaningful because of you,
            every dream feels possible because you're in it.
          </p>
          <p className="text-white/90 font-light leading-relaxed text-sm sm:text-base mb-5">
            Happy Birthday, my love. 🎂 May this year bring you
            all the joy, laughter, and magic that you so effortlessly
            bring into my life every single day.
          </p>
          <div
            className="rounded-2xl py-4 px-5"
            style={{ background: 'rgba(231,84,128,0.2)', border: '1px solid rgba(231,84,128,0.3)' }}
          >
            <p className="font-serif italic text-pink-200 text-base sm:text-lg leading-relaxed">
              You’re not just part of my life…<br />
you’ve become someone I end up missing even in small moments❤️"
            </p>
          </div>
        </div>

        {/* Birthday wish */}
        <div
          className={`w-full rounded-2xl py-5 px-6 mb-6 text-center transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{
            background: 'linear-gradient(135deg, rgba(231,84,128,0.3), rgba(198,42,71,0.2))',
            border: '1px solid rgba(231,84,128,0.35)',
          }}
        >
          <p className="text-pink-200 text-xs tracking-widest uppercase mb-2">🎂 Birthday Message</p>
          <p className="font-script text-3xl text-pink-300 mb-1">Happy Birthday</p>
          <p className="font-script text-4xl text-white drop-shadow-lg">Bittuu</p>
          <div className="flex justify-center gap-2 mt-3 text-2xl">
            🎉 🎂 🌸 💕 ✨
          </div>
        </div>

        {/* Signature */}
        <div className={`text-center transition-all duration-700 delay-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-pink-400/70 text-xs tracking-wider mb-2">Made with every piece of my heart</p>
          <p className="font-script text-3xl text-pink-300">Forever yours ❤️</p>
          <div className="flex justify-center gap-1 mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Heart
                key={i}
                fill="#e75480"
                color="#e75480"
                size={16}
                className="animate-pulse-heart"
                style={{ animationDelay: `${i * 200}ms`, opacity: 0.6 + i * 0.08 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom decorative glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(231,84,128,0.15), transparent)',
        }}
      />
    </section>
  );
}
