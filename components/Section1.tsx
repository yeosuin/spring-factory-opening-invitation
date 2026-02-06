
import React from 'react';

const Section1: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center items-center px-6 bg-[#0b5d8a]" style={{ minHeight: '100dvh' }}>
      {/* Background Image - Cherry Blossoms */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&q=80&w=2070")',
            filter: 'brightness(1.05) saturate(0.95)'
        }}
      />

      {/* Soft spring overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center px-6">
        <div className="text-center space-y-12 -mt-20">
          {/* Logo */}
          <img src="/IMG_0415.PNG" alt="JK Materials" className="h-10 mx-auto" style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }} />

          {/* Grand Opening */}
          <div className="relative inline-block mt-4">
            <h1 className="font-luxury text-6xl tracking-tight leading-none py-2 relative z-10 text-white font-semibold" style={{ textShadow: '0 2px 15px rgba(192,192,192,0.7), 0 0 30px rgba(255,255,255,0.4), 0 1px 3px rgba(0,0,0,0.3)' }}>
              GRAND<br />OPENING
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-pink-200/30 blur-3xl rounded-full -z-10"></div>
          </div>

          {/* Date */}
          <div className="space-y-3 mt-6">
            <div className="w-16 h-px bg-white/50 mx-auto"></div>
            <p className="font-luxury text-2xl tracking-[0.1em] text-white/90 font-semibold">2026. 03. 12</p>
            <p className="font-inter text-[11px] tracking-[0.5em] text-white/60 uppercase font-semibold">Thursday | 2:00 PM</p>
          </div>
        </div>
      </div>

      {/* Elegant Aesthetic Accents */}
      <div className="absolute top-10 left-10 right-10 bottom-10 border border-white/40 pointer-events-none z-10"></div>
      <div className="absolute top-8 left-8 w-8 h-8 border-l border-t border-white/30 z-10"></div>
      <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-white/30 z-10"></div>
    </div>
  );
};

export default Section1;
