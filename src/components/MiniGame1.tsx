import { useState, useEffect } from 'react';
import { Heart, Shuffle } from 'lucide-react';

interface MiniGame1Props {
  onComplete: () => void;
}

const WORD = 'BITTU';
const TARGET = 'BITTU';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MiniGame1({ onComplete }: MiniGame1Props) {
  const [tiles, setTiles] = useState<{ id: number; letter: string }[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [answer, setAnswer] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const letters = WORD.split('').map((l, i) => ({ id: i, letter: l }));
    setTiles(shuffle(letters));
    setSelected([]);
    setAnswer([]);
    setSuccess(false);
    setWrong(false);
  };

  const handleTile = (tile: { id: number; letter: string }) => {
    if (success) return;
    if (selected.includes(tile.id)) {
      // Deselect last only if it's the last added
      const idx = answer.indexOf(tile.letter);
      if (selected[selected.length - 1] === tile.id) {
        setSelected(s => s.filter(id => id !== tile.id));
        setAnswer(a => {
          const newA = [...a];
          newA.splice(idx, 1);
          return newA;
        });
      }
      return;
    }

    const newAnswer = [...answer, tile.letter];
    const newSelected = [...selected, tile.id];
    setAnswer(newAnswer);
    setSelected(newSelected);

    if (newAnswer.length === TARGET.length) {
      if (newAnswer.join('') === TARGET) {
        setSuccess(true);
        setTimeout(onComplete, 1500);
      } else {
        setWrong(true);
        setTimeout(() => {
          setSelected([]);
          setAnswer([]);
          setWrong(false);
        }, 700);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-5"
      style={{
        background: 'linear-gradient(160deg, #1a0a14 0%, #2d0c20 50%, #1a0814 100%)',
      }}
    >
      {/* Floating petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-400 animate-float-up"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 10 + 8}px`,
              animationDuration: `${Math.random() * 10 + 8}s`,
              animationDelay: `${Math.random() * 8}s`,
              opacity: 0,
              bottom: 0,
            }}
          >
            ✿
          </div>
        ))}
      </div>

      <div
        className="relative z-10 w-full max-w-sm rounded-3xl p-8"
        style={{
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(231,84,128,0.3)',
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-3xl mb-2 block">🎮</span>
          <h3 className="font-script text-3xl text-pink-300 mb-1">Mini Challenge</h3>
          <p className="text-pink-400/70 text-sm">Arrange the letters to spell her name</p>
        </div>

        {/* Answer display */}
        <div className={`flex justify-center gap-2 mb-6 ${wrong ? 'animate-wrong-shake' : ''}`}>
          {Array.from({ length: TARGET.length }).map((_, i) => (
            <div
              key={i}
              className="w-10 h-12 rounded-xl flex items-center justify-center text-lg font-bold border-2 transition-all duration-300"
              style={{
                background: answer[i]
                  ? success
                    ? 'rgba(74,222,128,0.2)'
                    : wrong
                    ? 'rgba(248,113,113,0.2)'
                    : 'rgba(231,84,128,0.2)'
                  : 'rgba(255,255,255,0.05)',
                borderColor: answer[i]
                  ? success
                    ? 'rgba(74,222,128,0.6)'
                    : wrong
                    ? 'rgba(248,113,113,0.6)'
                    : 'rgba(231,84,128,0.5)'
                  : 'rgba(255,255,255,0.15)',
                color: answer[i]
                  ? success
                    ? '#4ade80'
                    : wrong
                    ? '#f87171'
                    : '#f9a8d4'
                  : 'transparent',
              }}
            >
              {answer[i] || ''}
            </div>
          ))}
        </div>

        {/* Status */}
        {success && (
          <div className="text-center mb-4 animate-fade-in-scale">
            <p className="text-green-400 font-serif text-lg">✨ Perfect! Entering the next level...</p>
          </div>
        )}

        {/* Letter tiles */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {tiles.map(tile => (
            <button
              key={tile.id}
              onClick={() => handleTile(tile)}
              disabled={success}
              className={`w-12 h-12 rounded-xl text-lg font-bold transition-all duration-200 ${
                selected.includes(tile.id)
                  ? 'opacity-30 cursor-default scale-90'
                  : 'hover:scale-110 active:scale-95 cursor-pointer'
              }`}
              style={{
                background: selected.includes(tile.id)
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(231,84,128,0.25)',
                border: `2px solid ${selected.includes(tile.id) ? 'rgba(255,255,255,0.1)' : 'rgba(231,84,128,0.5)'}`,
                color: selected.includes(tile.id) ? 'rgba(255,255,255,0.3)' : '#f9a8d4',
              }}
            >
              {tile.letter}
            </button>
          ))}
        </div>

        {/* Reset */}
        {!success && (
          <button
            onClick={resetGame}
            className="w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-pink-400 text-sm transition-all hover:bg-white/10 active:bg-white/15"
            style={{ border: '1px solid rgba(231,84,128,0.25)' }}
          >
            <Shuffle size={14} />
            Shuffle again
          </button>
        )}

        <p className="text-center text-pink-500/40 text-xs mt-4">Hint: It's the most beautiful name 💕</p>
      </div>

      <Heart fill="#e75480" color="#e75480" size={24} className="mt-6 animate-pulse-heart opacity-60" />
    </div>
  );
}
