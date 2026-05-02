import { Heart } from 'lucide-react';

interface NavbarProps {
  currentSection: number;
}

const sections = ['Story', 'Letter', 'Memories', 'Forever'];

export default function Navbar({ currentSection }: NavbarProps) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-3"
      style={{
        background: 'rgba(255, 245, 247, 0.88)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(249, 168, 212, 0.3)',
      }}
    >
      <div className="flex items-center gap-2">
        <Heart fill="#e75480" color="#e75480" size={18} className="animate-pulse-heart" />
        <span className="font-script text-2xl text-pink-600">Our World</span>
      </div>

      <div className="hidden sm:flex items-center gap-1">
        {sections.map((s, i) => (
          <div
            key={s}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
              currentSection - 1 === i
                ? 'bg-pink-500 text-white shadow-md'
                : currentSection - 1 > i
                ? 'bg-pink-100 text-pink-500'
                : 'text-pink-300'
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      {/* Mobile: current level indicator */}
      <div className="sm:hidden flex items-center gap-1">
        {sections.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              currentSection - 1 === i
                ? 'w-5 h-2 bg-pink-500'
                : currentSection - 1 > i
                ? 'w-2 h-2 bg-pink-300'
                : 'w-2 h-2 bg-pink-100'
            }`}
          />
        ))}
      </div>
    </nav>
  );
}
