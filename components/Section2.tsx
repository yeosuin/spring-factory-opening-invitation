
import React from 'react';

const Section2: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#0b5d8a] flex flex-col justify-center items-center px-8 text-center" style={{ minHeight: '100dvh' }}>
      <div className="max-w-md w-full py-12 space-y-10">
        {/* Header Label */}
        <div className="space-y-2">
          <span className="font-inter text-[10px] tracking-[0.5em] text-rose-300/70 uppercase">Invitation</span>
          <div className="w-8 h-px bg-rose-300/30 mx-auto"></div>
        </div>

        {/* Main Content */}
        <div className="space-y-8 font-serif-kr text-slate-200 font-light leading-relaxed">
          <div className="space-y-4">
            <p className="text-lg text-white">
              안녕하십니까?<br />
              2026년 새봄을 맞이하여<br />
              댁내 두루 평안하시기를 기원합니다.
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-400">
            <p>
              <span className="text-slate-200 font-normal">JK머트리얼즈</span>는<br />
              '핵심 소재를 향한 여정'이라는 가치 아래<br />
              반도체 핵심소재 공급사로서<br />
              역량을 키워 가고 있습니다.
            </p>

            <p>
              그동안 보내주신 성원과 관심 덕분에<br />
              저희 <span className="text-rose-300/90 font-normal underline underline-offset-8 decoration-rose-300/20">세종공장</span>을 준공하게 되어<br />
              이를 기념하는 자리에 모시고자 합니다.
            </p>

            <p>
              뜻깊은 자리에 함께하시어<br />
              격려와 응원을 보내 주시면 감사하겠습니다.
            </p>
          </div>
        </div>

        {/* Footer Signature */}
        <div className="pt-8 space-y-4">
          <div className="flex flex-col items-center">
            <p className="font-serif-kr text-slate-500 text-sm">감사합니다.</p>
            <p className="font-luxury text-2xl tracking-widest text-white mt-2">JK MATERIALS</p>
          </div>

          <div className="pt-6 flex flex-col items-center">
            <div className="w-1 h-1 bg-rose-300 rounded-full mb-1"></div>
            <div className="w-px h-12 bg-gradient-to-b from-rose-300/50 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
