
import React, { useState, useMemo } from 'react';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import Section4 from './components/Section4';

const SpringPetals: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 6 + 5}px`,
      delay: `${Math.random() * 15}s`,
      duration: `${Math.random() * 8 + 10}s`,
      opacity: Math.random() * 0.3 + 0.4
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="petal-particle"
          style={{
            left: p.left,
            top: '-20px',
            width: p.size,
            height: `calc(${p.size} * 1.3)`,
            opacity: p.opacity,
            animation: `petal-drift ${p.duration} linear infinite`,
            animationDelay: p.delay
          }}
        />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollPos = e.currentTarget.scrollTop;
    const height = window.innerHeight;
    const sectionIndex = Math.round(scrollPos / height);
    if (sectionIndex !== activeSection) {
      setActiveSection(sectionIndex);
    }
  };

  return (
    <div className="bg-[#0b5d8a] text-white selection:bg-amber-200 selection:text-black w-full max-w-[430px] mx-auto relative">
      <SpringPetals />



      <div className="snap-container" onScroll={handleScroll}>
        <section className="snap-section">
          <Section1 />
        </section>
        <section className="snap-section">
          <Section2 />
        </section>
        <section className="snap-section">
          <Section3 />
        </section>
        <section className="snap-section">
          <Section4 />
        </section>
      </div>

      {/* Navigation Dot Indicators */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-4 z-40">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-1 transition-all duration-700 rounded-full ${i === activeSection ? 'bg-pink-400 h-8' : 'bg-slate-200 h-1.5'}`}
          />
        ))}
      </div>

    </div>
  );
};

export default App;
