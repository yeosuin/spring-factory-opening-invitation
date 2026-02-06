
import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    naver: any;
  }
}

const LOCATION = {
  lat: 36.703786,
  lng: 127.213251,
  name: 'JK머트리얼즈 세종캠퍼스',
  address: '세종특별자치시 전의면 산단길 21-33',
};

const Section4: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    const clientId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID as string | undefined;

    const loadNaverMapsScript = () =>
      new Promise<void>((resolve, reject) => {
        if (window.naver && window.naver.maps) {
          resolve();
          return;
        }

        const existing = document.getElementById('naver-maps-script') as HTMLScriptElement | null;
        if (existing) {
          existing.addEventListener('load', () => resolve());
          existing.addEventListener('error', () => reject(new Error('script-load-failed')));
          return;
        }

        if (!clientId) {
          reject(new Error('missing-client-id'));
          return;
        }

        const script = document.createElement('script');
        script.id = 'naver-maps-script';
        script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('script-load-failed'));
        document.head.appendChild(script);
      });

    const initMap = async () => {
      try {
        await loadNaverMapsScript();
        if (!window.naver || !window.naver.maps) {
          setMapError('네이버 지도 스크립트가 로드되지 않았습니다.');
          return;
        }

        const position = new window.naver.maps.LatLng(LOCATION.lat, LOCATION.lng);

        const map = new window.naver.maps.Map(mapRef.current!, {
          center: position,
          zoom: 16,
          minZoom: 10,
          zoomControl: true,
          zoomControlOptions: {
            position: window.naver.maps.Position.TOP_RIGHT,
          },
        });

        new window.naver.maps.Marker({
          position,
          map,
          title: LOCATION.name,
        });
      } catch (e) {
        if (e instanceof Error && e.message === 'missing-client-id') {
          setMapError('네이버 지도 Client ID가 설정되지 않았습니다.');
          return;
        }
        if (e instanceof Error && e.message === 'script-load-failed') {
          setMapError('네이버 지도 스크립트를 불러올 수 없습니다. Client ID를 확인해주세요.');
          return;
        }
        console.error('Map initialization error:', e);
        setMapError('지도 생성 중 오류가 발생했습니다.');
      }
    };

    initMap();
  }, []);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(LOCATION.address);
      alert('주소가 복사되었습니다.');
    } catch {
      alert('주소 복사에 실패했습니다.');
    }
  };

  const handleNav = () => {
    window.open(`https://map.naver.com/v5/search/${encodeURIComponent(LOCATION.address)}`, '_blank');
  };

  const handleKakaoShare = async () => {
    const shareData = {
      title: 'JK머트리얼즈 세종캠퍼스 준공식 초대장',
      text: 'JK머트리얼즈 세종캠퍼스 준공식에 귀하를 초대합니다.',
      url: 'https://jkmaterialsinvitation.vercel.app',
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share failed', err);
      }
    } else {
      alert('공유하기를 지원하지 않는 브라우저입니다. 링크 복사를 이용해 주세요.');
    }
  };

  const handleSms = () => {
    const message = `[JK머트리얼즈] 세종캠퍼스 준공식 초대장입니다.\n아래 링크를 통해 확인해 주세요.\nhttps://jkmaterialsinvitation.vercel.app`;
    const smsUrl = `sms:?body=${encodeURIComponent(message)}`;
    window.location.href = smsUrl;
  };

  const handleLinkCopy = () => {
    navigator.clipboard.writeText('https://jkmaterialsinvitation.vercel.app');
    alert('초대장 링크가 복사되었습니다.');
  };

  return (
    <div className="min-h-screen w-full bg-[#0b5d8a] flex flex-col justify-between items-center py-16 px-8 text-center" style={{ minHeight: '100dvh' }}>
      <div className="space-y-4 pt-4">
        <span className="font-inter text-[10px] tracking-[0.5em] text-rose-300 uppercase">Information</span>
        <h2 className="font-luxury text-4xl">LOCATION</h2>
      </div>

      {/* Naver Map */}
      <div className="w-full max-w-sm my-8">
        <div className="w-full h-[250px] rounded-lg overflow-hidden relative bg-white/5">
          {mapError ? (
            <div className="flex items-center justify-center h-full text-sm text-white/50 p-4">
              <p>{mapError}</p>
            </div>
          ) : (
            <div ref={mapRef} className="w-full h-full outline-none" />
          )}
        </div>

        {/* Address */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-left">
            <p className="font-serif-kr text-sm text-white font-medium">{LOCATION.address}</p>
            <p className="font-inter text-[10px] text-white/50 tracking-tighter uppercase mt-1">{LOCATION.name}</p>
          </div>
          <button
            onClick={handleCopyAddress}
            className="ml-3 flex-shrink-0 p-2 bg-white/10 rounded-sm active:bg-white/20 transition-all"
            title="주소 복사"
          >
            <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="w-full max-w-sm mb-8 flex flex-col">
        {/* Date & Time */}
        <div className="mt-8 mb-16 text-center">
          <p className="font-luxury text-xl tracking-[0.1em] text-white">2026. 03. 12</p>
          <p className="font-inter text-[10px] tracking-[0.5em] text-white/50 uppercase mt-1">Thursday | 2:00 PM</p>
        </div>

        <div className="space-y-3">
            <button
              onClick={handleSms}
              className="w-full py-4 bg-white/10 text-white border border-white/20 flex items-center justify-center space-x-2 rounded-sm active:bg-white/20 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="font-serif-kr text-sm">문자 전송</span>
            </button>

            <button
              onClick={handleLinkCopy}
              className="w-full py-4 bg-white/5 text-white/60 border border-white/10 flex items-center justify-center space-x-2 rounded-sm active:bg-white/10 transition-all duration-300"
            >
              <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="font-inter text-xs tracking-wider">COPY INVITATION LINK</span>
            </button>
        </div>
      </div>

      <div className="opacity-30 flex flex-col items-center space-y-2 mt-auto">
        <img src="/IMG_0410.PNG" alt="JK Materials" className="h-16 brightness-0 invert" />
      </div>
    </div>
  );
};

export default Section4;
