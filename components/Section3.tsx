
import React, { useState, useRef, useEffect, useCallback } from 'react';

const galleryImages = [
  { url: "/gallery/0.jpg" },
  { url: "/gallery/1.jpg" },
  { url: "/gallery/2.jpg" },
  { url: "/gallery/3.jpg" },
  { url: "/gallery/4.jpg" },
  { url: "/gallery/5.jpeg" },
  { url: "/gallery/6.jpg" },
  { url: "/gallery/7.jpg" },
  { url: "/gallery/8.jpg" },
  { url: "/gallery/9.jpg" },
  { url: "/gallery/IMG_0426.PNG" },
  { url: "/gallery/IMG_0420.PNG" },
  { url: "/gallery/IMG_0422.PNG" },
  { url: "/gallery/IMG_0424.JPG" },
];

const Section3: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [paused, setPaused] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const swiping = useRef(false);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  }, []);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  }, []);

  const goTo = (idx: number) => {
    setCurrent(idx);
  };

  // Auto sliding - 3초 간격
  useEffect(() => {
    if (lightbox || paused) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }
    autoPlayRef.current = setInterval(() => {
      goNext();
    }, 3000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [current, lightbox, paused, goNext]);

  const handleUserInteraction = () => {
    setPaused(true);
    setTimeout(() => setPaused(false), 5000);
  };

  // 터치 스와이프 (가로만 처리, 세로는 페이지 스크롤)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    swiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    // 가로 이동이 세로보다 크면 스와이프로 판단
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
      swiping.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!swiping.current) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    handleUserInteraction();
    if (dx < -50) {
      goNext();
    } else if (dx > 50) {
      goPrev();
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-start bg-[#0b5d8a] pt-16 pb-12 overflow-hidden" style={{ minHeight: '100dvh' }}>
      <div className="px-8 mb-6 space-y-2">
        <span className="font-inter text-[10px] tracking-[0.5em] text-rose-300 uppercase">Archive</span>
        <h2 className="font-luxury text-4xl text-white">THE GALLERY</h2>
      </div>

      {/* Slide Carousel */}
      <div
        className="w-full mb-6 relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="w-full px-6 relative overflow-hidden" style={{ height: '45vh' }}>
          <div className="flex items-center justify-center h-full">
            {galleryImages.map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                alt={`Photo ${idx + 1}`}
                className={`absolute max-h-full max-w-[85%] object-contain rounded-sm cursor-pointer transition-all duration-500 ${
                  idx === current
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95 pointer-events-none'
                }`}
                onClick={() => { setCurrent(idx); setLightbox(true); }}
                loading="lazy"
              />
            ))}
          </div>
        </div>

        {/* Prev / Next */}
        <button onClick={() => { handleUserInteraction(); goPrev(); }} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/30 rounded-full text-white/80 active:bg-black/50 z-10">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button onClick={() => { handleUserInteraction(); goNext(); }} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/30 rounded-full text-white/80 active:bg-black/50 z-10">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

      {/* Thumbnail Grid */}
      <div className="w-full px-6">
        <div className="grid grid-cols-6 gap-1.5">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => { handleUserInteraction(); goTo(idx); }}
              className={`relative aspect-square overflow-hidden rounded-sm cursor-pointer transition-all duration-300 ${idx === current ? 'ring-2 ring-rose-300 opacity-100' : 'opacity-50'}`}
            >
              <img
                src={img.url}
                alt={`Thumb ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Counter */}
      <div className="w-full px-6 mt-4 text-center">
        <p className="font-inter text-xs text-white/30">{current + 1} / {galleryImages.length}</p>
      </div>

      {/* Lightbox - Original Size */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={() => setLightbox(false)}>
          <button onClick={() => setLightbox(false)} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/80 text-2xl z-10">
            &times;
          </button>
          <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white/80 active:bg-white/20 z-10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <img
            src={galleryImages[current].url}
            alt={`Photo ${current + 1}`}
            className="max-w-[95vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white/80 active:bg-white/20 z-10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </button>
          <p className="absolute bottom-6 text-white/50 font-inter text-xs">{current + 1} / {galleryImages.length}</p>
        </div>
      )}
    </div>
  );
};

export default Section3;
