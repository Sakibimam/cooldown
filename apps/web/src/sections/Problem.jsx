"use client";


const CHART_PATH =
  "M0,40 C60,42 110,55 160,78 C210,100 260,150 320,190 C380,228 450,268 540,300 C620,328 720,352 860,368 C950,378 1050,384 1200,388";

export const Problem = () => {
  return (
    <section
      data-testid="problem-section"
      className="grain relative overflow-hidden bg-[#070B14] text-white min-h-[100svh] py-24 sm:py-36"
    >
      <div
        aria-hidden="true"
        className="absolute top-1/3 -left-40 w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(closest-side, rgba(255,77,46,0.14), transparent)" }}
      />
      <div className="relative wrap max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div
              data-testid="problem-stat-number"
              className="tabular mt-6 text-[clamp(5rem,14vw,10rem)] font-semibold tracking-[-0.04em] leading-none text-[#FF4D2E]"
            >
              49%
            </div>
            <p className="mt-5 text-lg sm:text-xl text-white/70 leading-relaxed max-w-md">
              of pump.fun wallets lost 90% or more.
            </p>
            <p className="mt-6 text-base text-white/45 leading-relaxed max-w-md">
              A slot machine keeps 3.5¢ of every dollar. Memecoins keep 25¢.
            </p>
            <p className="mt-8 text-xs text-white/30">
              Onchain study of 6.7M wallets, 2026.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div
              data-testid="problem-loss-chart"
              className="relative rounded-[28px] bg-[#0F1E33]/60 border border-white/[0.08] p-6 sm:p-10 overflow-hidden"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  A memecoin wallet, one week
                </span>
                <span className="tabular text-sm font-semibold text-[#FF4D2E]">−$11,100</span>
              </div>
              <svg viewBox="0 0 1200 420" className="mt-6 w-full h-auto" fill="none" aria-hidden="true">
                {[80, 160, 240, 320].map((y) => (
                  <line key={y} x1="0" y1={y} x2="1200" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                ))}
                <defs>
                  <linearGradient id="emberArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF4D2E" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#FF4D2E" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={`${CHART_PATH} L1200,420 L0,420 Z`} fill="url(#emberArea)" />
                <path d={CHART_PATH} stroke="#FF4D2E" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="320" cy="190" r="5" fill="#FF4D2E" />
                <text x="338" y="184" fill="rgba(255,255,255,0.8)" fontSize="20" fontWeight="600">
                  3:14am, &quot;one last trade&quot;
                </text>
              </svg>
              <div className="mt-4 flex justify-between text-[11px] font-medium text-white/30 tabular">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
