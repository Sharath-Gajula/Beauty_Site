import { useState, useEffect } from 'react';
import { Heart, Delete } from 'lucide-react';

const CORRECT_PIN = '0021';

interface PinLockProps {
  onUnlock: () => void;
}

export default function PinLock({ onUnlock }: PinLockProps) {
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct'>('idle');
  const [unlocking, setUnlocking] = useState(false);
  const [shake, setShake] = useState(false);

  const handleKey = (val: string) => {
    if (pin.length >= 4 || status === 'correct') return;
    const newPin = pin + val;
    setPin(newPin);
    setStatus('idle');

    if (newPin.length === 4) {
      setTimeout(() => {
        if (newPin === CORRECT_PIN) {
          setStatus('correct');
          setUnlocking(true);
          setTimeout(() => onUnlock(), 1400);
        } else {
          setStatus('wrong');
          setShake(true);
          setTimeout(() => {
            setPin('');
            setStatus('idle');
            setShake(false);
          }, 900);
        }
      }, 300);
    }
  };

  const handleDelete = () => {
    if (status === 'correct') return;
    setPin(p => p.slice(0, -1));
    setStatus('idle');
  };

  const keys = ['1','2','3','4','5','6','7','8','9','','0','del'];

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center z-50 transition-all duration-700 ${
        unlocking ? 'animate-unlock-burst pointer-events-none' : ''
      }`}
      style={{
        background: 'linear-gradient(160deg, #1a0a14 0%, #2d0c20 30%, #4a0e2c 60%, #1a0814 100%)',
      }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-400 animate-float-up"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 14 + 8}px`,
              animationDuration: `${Math.random() * 10 + 8}s`,
              animationDelay: `${Math.random() * 8}s`,
              opacity: 0,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      {/* Glowing orb */}
      <div
        className="absolute rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{
          width: 340,
          height: 340,
          background: 'radial-gradient(circle, #e75480, #8b1a4a)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Lock Card */}
      <div className="relative z-10 flex flex-col items-center px-8 py-10 rounded-3xl glass w-full max-w-xs mx-4"
        style={{ border: '1px solid rgba(231,84,128,0.3)', background: 'rgba(255,255,255,0.06)' }}
      >
        {/* Heart icon */}
        <div className="mb-4 animate-pulse-heart">
          <Heart
            fill={status === 'correct' ? '#e75480' : '#e75480'}
            color="#e75480"
            size={44}
            className="drop-shadow-[0_0_12px_rgba(231,84,128,0.9)]"
          />
        </div>

        <h1 className="font-script text-4xl text-pink-300 mb-1 drop-shadow-lg">Enter the code</h1>
        <p className="text-pink-400 text-sm mb-8 font-light tracking-widest uppercase">
          {status === 'correct' ? '✨ Welcome, Love ✨' : status === 'wrong' ? 'Try again, sweetheart' : 'Unlock Your World'}
        </p>

        {/* PIN dots */}
        <div className={`flex gap-5 mb-8 ${shake ? 'animate-wrong-shake' : ''}`}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                i < pin.length
                  ? status === 'wrong'
                    ? 'bg-red-400 scale-110 shadow-[0_0_10px_rgba(248,113,113,0.8)]'
                    : status === 'correct'
                    ? 'bg-green-400 scale-110 shadow-[0_0_10px_rgba(74,222,128,0.8)]'
                    : 'bg-pink-400 scale-110 shadow-[0_0_10px_rgba(231,84,128,0.8)]'
                  : 'bg-white/20 border border-white/30'
              }`}
            />
          ))}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {keys.map((key, idx) => {
            if (key === '') {
              return <div key={idx} />;
            }
            if (key === 'del') {
              return (
                <button
                  key={idx}
                  onClick={handleDelete}
                  className="pin-key h-14 rounded-2xl flex items-center justify-center text-pink-300 hover:bg-white/10 active:bg-white/20 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <Delete size={20} />
                </button>
              );
            }
            return (
              <button
                key={idx}
                onClick={() => handleKey(key)}
                className="pin-key h-14 rounded-2xl flex items-center justify-center text-white text-xl font-light hover:bg-white/15 active:bg-white/25 transition-colors"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)' }}
              >
                {key}
              </button>
            );
          })}
        </div>

        {/* Hint */}
        <p className="mt-6 text-pink-500/50 text-xs tracking-wider">
          Hint: Urs date of Birth💕
        </p>
      </div>
    </div>
  );
}
