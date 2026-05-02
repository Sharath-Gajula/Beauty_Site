import { useMemo } from 'react';

const SYMBOLS = ['♥', '❤', '💕', '💗', '💓', '✿', '♡'];

export default function FloatingHearts() {
  const hearts = useMemo(() =>
    Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      left: Math.random() * 100,
      size: Math.random() * 16 + 8,
      duration: Math.random() * 14 + 10,
      delay: Math.random() * 12,
      color: ['#f9a8d4','#fb7185','#fda4af','#fecdd3','#e75480','#ff6b9d'][Math.floor(Math.random()*6)],
    }))
  , []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map(h => (
        <div
          key={h.id}
          className="absolute animate-float-up"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            color: h.color,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: 0,
            bottom: '-5%',
          }}
        >
          {h.symbol}
        </div>
      ))}
    </div>
  );
}
