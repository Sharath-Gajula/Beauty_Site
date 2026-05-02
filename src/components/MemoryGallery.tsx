import { useState, useEffect, useRef } from 'react';
import { Heart, ChevronRight, X } from 'lucide-react';

import cake from "../assets/cakee.jpeg";
import child from "../assets/child.jpeg";
import her from "../assets/her.jpeg";
import herrr from "../assets/herrrr.jpeg";
import hotel from "../assets/hotell.jpeg";
import traditional from "../assets/traditional.png";

interface MemoryGalleryProps {
  onNext: () => void;
}

const PHOTOS = [
  {
    url: cake,
    caption: 'Cute Cake vs U💕',
    date: '2023',
  },
  {
    url: herrr,
    caption: 'First Temple Visit Together 🛕',
    date: '2023',
  },
  {
    url: child,
    caption: 'Childish Behaviour✨',
    date: '',
  },
  {
    url: her,
    caption: '😊',
    date: '',
  },
  {
    url: hotel,
    caption: 'Every moment is precious 💖',
    date: '2026',
  },
  {
    url: traditional,
    caption: 'Forever & always 🌺',
    date: '2026',
  },
];

export default function MemoryGallery({ onNext }: MemoryGalleryProps) {
  const [visible, setVisible] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-5"
      style={{
        background: 'linear-gradient(180deg, #fff5f7 0%, #fce4ec 40%, #ffd6e0 80%, #fff0f5 100%)',
      }}
    >
      {/* Section badge */}
      <div className={`flex items-center gap-2 mb-4 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
        <div className="h-px w-10 bg-pink-300" />
        <span className="text-pink-400 text-xs tracking-[0.3em] uppercase font-medium">Level 3</span>
        <div className="h-px w-10 bg-pink-300" />
      </div>

      <h2 className={`font-script text-5xl sm:text-6xl text-pink-700 mb-2 text-center transition-all duration-700 delay-100 ${visible ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
        Our Cute Memories
      </h2>

      <p className={`text-pink-400 text-sm mb-10 text-center italic transition-all duration-700 delay-200 ${visible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
        "Every moment with you is special" 💕
      </p>

      {/* Gallery grid */}
      <div className={`w-full max-w-md grid grid-cols-2 gap-3 mb-8 transition-all duration-700 delay-300 ${visible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
        {PHOTOS.map((photo, i) => (
          <div
            key={i}
            className="memory-card relative rounded-2xl overflow-hidden cursor-pointer group"
            style={{
              boxShadow: '0 8px 24px rgba(231,84,128,0.15)',
              border: '2px solid rgba(249,168,212,0.3)',
              animationDelay: `${i * 80}ms`,
            }}
            onClick={() => setLightbox(i)}
          >
            <div className="aspect-square">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            {/* Overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-3"
              style={{ background: 'linear-gradient(to top, rgba(231,84,128,0.75) 0%, transparent 60%)' }}
            >
              <p className="text-white text-xs font-medium text-center drop-shadow-md leading-snug">
                {photo.caption}
              </p>
              <p className="text-pink-200 text-xs mt-0.5">{photo.date}</p>
            </div>
            {/* Heart badge */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Heart fill="white" color="white" size={14} className="drop-shadow-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Caption */}
      <div
        className={`w-full max-w-md text-center py-4 px-6 rounded-2xl mb-8 transition-all duration-700 delay-400 ${visible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(249,168,212,0.35)',
        }}
      >
        <p className="font-script text-2xl text-pink-600 mb-1">Each photo holds a piece of my heart</p>
        <p className="text-pink-400 text-sm font-light">Tap a photo to relive the memory 📸</p>
      </div>

      {/* Next button */}
      <button
        onClick={onNext}
        className={`flex items-center gap-2 px-7 py-3 rounded-full text-white font-medium shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-700 delay-500 ${visible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
        style={{
          background: 'linear-gradient(135deg, #e75480, #c62a47)',
          boxShadow: '0 6px 20px rgba(231,84,128,0.35)',
        }}
      >
        <span>Next</span>
        <ChevronRight size={18} />
        <span className="text-pink-200 text-sm">Final Level</span>
      </button>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-5 animate-fade-in-scale"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full"
            style={{ background: 'rgba(255,255,255,0.15)' }}
            onClick={() => setLightbox(null)}
          >
            <X size={22} />
          </button>
          <div
            className="max-w-sm w-full rounded-3xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={PHOTOS[lightbox].url.replace('w=400', 'w=600')}
              alt={PHOTOS[lightbox].caption}
              className="w-full object-cover"
            />
            <div
              className="p-4 text-center"
              style={{ background: 'rgba(255,255,255,0.95)' }}
            >
              <p className="font-serif italic text-pink-700 text-lg">{PHOTOS[lightbox].caption}</p>
              <p className="text-pink-400 text-sm mt-1">{PHOTOS[lightbox].date}</p>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-20 left-4 opacity-15 text-5xl text-pink-200 animate-sway pointer-events-none">📷</div>
      <div className="absolute bottom-20 right-4 opacity-15 text-5xl text-pink-200 animate-bounce-gentle pointer-events-none">🌸</div>
    </section>
  );
}
