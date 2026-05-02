import { useState, useRef, useCallback, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface PatternGameProps {
  onComplete: () => void;
}

// Correct pattern: positions 0,1,2,5,8,7,6 (L-shape or love path)
// Grid positions:
// 0 1 2
// 3 4 5
// 6 7 8
const CORRECT_PATTERN = [2,1,0,3,4,5,8,7,6]; // X pattern — sweet like a kiss

const DOT_POSITIONS = [
  [0, 0], [1, 0], [2, 0],
  [0, 1], [1, 1], [2, 1],
  [0, 2], [1, 2], [2, 2],
];

interface Line {
  x1: number; y1: number;
  x2: number; y2: number;
}

export default function PatternGame({ onComplete }: PatternGameProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [activeLine, setActiveLine] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct'>('idle');
  const [shake, setShake] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  const getCenter = useCallback((idx: number) => {
    const el = dotsRef.current[idx];
    const svg = svgRef.current;
    if (!el || !svg) return null;
    const rect = el.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - svgRect.left,
      y: rect.top + rect.height / 2 - svgRect.top,
    };
  }, []);

  const getClientPos = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: (e as React.MouseEvent).clientX, y: (e as React.MouseEvent).clientY };
  };

  const getNearestDot = useCallback((clientX: number, clientY: number): number | null => {
    const svg = svgRef.current;
    if (!svg) return null;
    const svgRect = svg.getBoundingClientRect();
    const x = clientX - svgRect.left;
    const y = clientY - svgRect.top;
    for (let i = 0; i < 9; i++) {
      const c = getCenter(i);
      if (!c) continue;
      const dist = Math.sqrt((c.x - x) ** 2 + (c.y - y) ** 2);
      if (dist < 28) return i;
    }
    return null;
  }, [getCenter]);

  const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent, idx: number) => {
    e.preventDefault();
    setSelected([idx]);
    setLines([]);
    setActiveLine(null);
    setDrawing(true);
    setStatus('idle');
  }, []);

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!drawing) return;
    const { x: cx, y: cy } = getClientPos(e);
    const svg = svgRef.current;
    if (!svg) return;
    const svgRect = svg.getBoundingClientRect();
    const mx = cx - svgRect.left;
    const my = cy - svgRect.top;

    if (selected.length > 0) {
      const lastDot = getCenter(selected[selected.length - 1]);
      if (lastDot) {
        setActiveLine({ x1: lastDot.x, y1: lastDot.y, x2: mx, y2: my });
      }
    }

    const nearest = getNearestDot(cx, cy);
    if (nearest !== null && !selected.includes(nearest)) {
      const lastDot = getCenter(selected[selected.length - 1]);
      const newDot = getCenter(nearest);
      if (lastDot && newDot) {
        setLines(l => [...l, { x1: lastDot.x, y1: lastDot.y, x2: newDot.x, y2: newDot.y }]);
      }
      setSelected(s => [...s, nearest]);
    }
  }, [drawing, selected, getCenter, getNearestDot]);

  const handleEnd = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!drawing) return;
    setDrawing(false);
    setActiveLine(null);

    if (selected.length >= 3) {
      const correct = selected.length === CORRECT_PATTERN.length &&
        selected.every((v, i) => v === CORRECT_PATTERN[i]);
      if (correct) {
        setStatus('correct');
        setTimeout(onComplete, 1400);
      } else {
        setStatus('wrong');
        setShake(true);
        setTimeout(() => {
          setSelected([]);
          setLines([]);
          setStatus('idle');
          setShake(false);
        }, 900);
      }
    } else {
      setSelected([]);
      setLines([]);
    }
  }, [drawing, selected, onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-5"
      style={{
        background: 'linear-gradient(160deg, #1a0a14 0%, #2d0c20 50%, #1a0814 100%)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-400 animate-float-up"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 12 + 8}px`,
              animationDuration: `${Math.random() * 10 + 8}s`,
              animationDelay: `${Math.random() * 8}s`,
              opacity: 0,
              bottom: 0,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      <div
        className="relative z-10 w-full max-w-xs rounded-3xl p-7"
        style={{
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(231,84,128,0.3)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="text-center mb-6">
          <span className="text-3xl mb-2 block">🔐</span>
          <h3 className="font-script text-3xl text-pink-300 mb-1">Pattern Unlock</h3>
          <p className="text-pink-400/70 text-sm">
            {status === 'correct'
              ? '✨ Pattern unlocked! Entering...'
              : status === 'wrong'
              ? 'Incorrect pattern, try again 💕'
              : 'Draw the pattern to unlock the final level'}
          </p>
        </div>

        {/* Pattern grid */}
        <div
          className={`relative w-full aspect-square max-w-[240px] mx-auto mb-4 select-none ${shake ? 'animate-wrong-shake' : ''}`}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        >
          {/* SVG for lines */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            {lines.map((line, i) => (
              <line
                key={i}
                x1={line.x1} y1={line.y1}
                x2={line.x2} y2={line.y2}
                stroke={status === 'wrong' ? 'rgba(248,113,113,0.7)' : status === 'correct' ? 'rgba(74,222,128,0.7)' : 'rgba(231,84,128,0.7)'}
                strokeWidth="3"
                strokeLinecap="round"
              />
            ))}
            {activeLine && (
              <line
                x1={activeLine.x1} y1={activeLine.y1}
                x2={activeLine.x2} y2={activeLine.y2}
                stroke="rgba(231,84,128,0.5)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="4 2"
              />
            )}
          </svg>

          {/* Dots */}
          <div className="grid grid-cols-3 gap-0 w-full h-full relative" style={{ zIndex: 2 }}>
            {Array.from({ length: 9 }).map((_, i) => {
              const isSelected = selected.includes(i);
              return (
                <div
                  key={i}
                  className="flex items-center justify-center"
                  onMouseDown={e => handleMouseDown(e, i)}
                  onTouchStart={e => handleMouseDown(e, i)}
                >
                  <div
                    ref={el => { dotsRef.current[i] = el; }}
                    className={`pattern-dot w-9 h-9 rounded-full cursor-pointer ${isSelected ? 'selected' : ''}`}
                    style={{
                      background: isSelected
                        ? status === 'wrong'
                          ? 'rgba(248,113,113,0.8)'
                          : status === 'correct'
                          ? 'rgba(74,222,128,0.8)'
                          : 'linear-gradient(135deg, #e75480, #ff6b9d)'
                        : 'rgba(255,255,255,0.15)',
                      border: `2px solid ${isSelected ? 'transparent' : 'rgba(255,255,255,0.25)'}`,
                      boxShadow: isSelected ? '0 0 14px rgba(231,84,128,0.6)' : 'none',
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-center text-pink-500/40 text-xs mt-2">
          Hint: Connect the corners through the center 💕
        </p>
      </div>

      <Heart fill="#e75480" color="#e75480" size={24} className="mt-6 animate-pulse-heart opacity-60" />
    </div>
  );
}
