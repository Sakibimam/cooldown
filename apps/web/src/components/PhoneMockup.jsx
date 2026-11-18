"use client";

import { CountdownRing } from "./CountdownRing";

const DynamicIsland = () => (
  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[96px] h-[26px] bg-black rounded-full z-20" />
);

export const PhoneFrame = ({ children, className = "", float = false }) => (
  <div
    data-visual
    className={`relative rounded-[48px] bg-[#0B1220] p-[10px] border border-[#334155]/50 shadow-[0_30px_70px_-18px_rgba(11,18,32,0.35),0_10px_24px_-8px_rgba(11,18,32,0.15)] ${className}`}
    style={float ? { transform: "translateZ(0)" } : undefined}
  >
    <DynamicIsland />
    <div className="rounded-[38px] overflow-hidden bg-[#F6F8FA] min-h-[560px] relative">
      {children}
    </div>
  </div>
);

const StatusBar = ({ dark = false }) => (
  <div className={`flex items-center justify-between px-7 pt-4 pb-1 text-[12px] font-semibold ${dark ? "text-white" : "text-[#0B1220]"}`}>
    <span className="tabular">3:14</span>
    <span className="flex items-center gap-1.5">
      <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="0.8"/><rect x="4.5" y="4.5" width="3" height="6.5" rx="0.8"/><rect x="9" y="2" width="3" height="9" rx="0.8"/><rect x="13" y="0" width="3" height="11" rx="0.8" opacity="0.35"/></svg>
      <svg width="22" height="11" viewBox="0 0 24 12" fill="none"><rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke="currentColor" opacity="0.4"/><rect x="2" y="2" width="13" height="8" rx="1.8" fill="currentColor"/><rect x="21.5" y="3.5" width="2" height="5" rx="1" fill="currentColor" opacity="0.4"/></svg>
    </span>
  </div>
);

export const WithdrawalScreen = () => (
  <div data-testid="phone-screen-withdrawal" className="text-[#0B1220]">
    <StatusBar />
    <div className="px-6 pt-5 pb-7 flex flex-col items-center">
      <div className="w-full flex items-center justify-between">
        <span className="text-[13px] font-semibold text-[#64748B]">Cooldown</span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0284C7] bg-[#BDE3F2]/40 px-2.5 py-1 rounded-full">In cooldown</span>
      </div>
      <div className="mt-7 text-center">
        <div className="text-[12px] uppercase tracking-[0.16em] font-semibold text-[#64748B]">Withdrawal</div>
        <div className="tabular text-[34px] font-semibold tracking-tight mt-1">500.00 <span className="text-[18px] text-[#64748B] font-medium">USDC</span></div>
      </div>
      <div className="mt-5">
        <CountdownRing />
      </div>
      <div className="mt-5 w-full flex items-center gap-3 bg-white rounded-2xl border border-[#0B1220]/[0.06] px-4 py-3 shadow-[0_1px_8px_rgba(11,18,32,0.04)]">
        <span className="w-8 h-8 rounded-full bg-[#0F1E33] text-[#BDE3F2] text-[13px] font-semibold inline-flex items-center justify-center shrink-0">M</span>
        <div className="text-left">
          <div className="text-[13px] font-semibold">Maya was notified</div>
          <div className="text-[11px] text-[#64748B]">Your buddy got a heads-up 12m ago</div>
        </div>
      </div>
      <div
        data-testid="hero-cancel-withdrawal-btn"
        className="mt-4 w-full h-[50px] rounded-2xl bg-[#FF4D2E] text-white text-[15px] font-semibold inline-flex items-center justify-center"
      >
        Cancel withdrawal
      </div>
      <p className="mt-3 text-[11px] text-[#94A3B8] text-center">Cancelling is free. Funds stay in your vault.</p>
    </div>
  </div>
);

export const DelayPickerScreen = () => (
  <div className="text-[#0B1220]">
    <StatusBar />
    <div className="px-6 pt-5 pb-7">
      <div className="text-[12px] uppercase tracking-[0.16em] font-semibold text-[#64748B]">Step 01</div>
      <div className="text-[22px] font-semibold tracking-tight mt-1">Choose your delay</div>
      <p className="text-[13px] text-[#64748B] mt-1.5 leading-relaxed">Set it on a calm day. Future you will thank you.</p>
      <div className="mt-6 grid grid-cols-3 gap-2">
        {["24h", "48h", "72h", "7d", "14d", "30d"].map((d) => (
          <span
            key={d}
            className={`tabular text-center text-[14px] font-semibold py-3 rounded-xl border ${
              d === "72h"
                ? "bg-[#0B1220] text-white border-[#0B1220]"
                : "bg-white text-[#475569] border-[#0B1220]/[0.1]"
            }`}
          >
            {d}
          </span>
        ))}
      </div>
      <div className="mt-6 bg-white rounded-2xl border border-[#0B1220]/[0.06] p-4">
        <div className="flex justify-between text-[11px] font-semibold text-[#94A3B8]"><span>24h</span><span>30d</span></div>
        <div className="mt-2 h-1.5 rounded-full bg-[#0B1220]/[0.08] relative">
          <div className="absolute left-0 top-0 h-full w-[30%] rounded-full bg-[#0284C7]" />
          <div className="absolute left-[30%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-[3px] border-[#0284C7] shadow" />
        </div>
        <div className="mt-4 text-center">
          <span className="tabular text-[26px] font-semibold tracking-tight">72 hours</span>
          <span className="block text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.14em] mt-0.5">Recommended</span>
        </div>
      </div>
      <div className="mt-4 flex items-start gap-2.5 text-[12px] text-[#64748B] leading-relaxed bg-[#BDE3F2]/25 rounded-xl px-3.5 py-3">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5 text-[#0284C7]"><path d="M12 22c5.5-2.2 9-6.6 9-12V5.2L12 2 3 5.2V10c0 5.4 3.5 9.8 9 12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
        Stricter rules apply instantly. Looser rules wait the same delay.
      </div>
    </div>
  </div>
);

export const DepositScreen = () => (
  <div className="text-[#0B1220]">
    <StatusBar />
    <div className="px-6 pt-5 pb-7">
      <div className="text-[12px] uppercase tracking-[0.16em] font-semibold text-[#64748B]">Step 02</div>
      <div className="text-[22px] font-semibold tracking-tight mt-1">Send savings &amp; salary in</div>
      <p className="text-[13px] text-[#64748B] mt-1.5 leading-relaxed">Your Cooldown address works like an account number. Point your paycheck at it.</p>
      <div className="mt-6 bg-white rounded-2xl border border-[#0B1220]/[0.06] p-5 flex flex-col items-center">
        <svg width="128" height="128" viewBox="0 0 29 29" shapeRendering="crispEdges" className="rounded-lg">
          <rect width="29" height="29" fill="white"/>
          <g fill="#0B1220">
            <rect x="0" y="0" width="7" height="7"/><rect x="2" y="2" width="3" height="3" fill="white"/>
            <rect x="22" y="0" width="7" height="7"/><rect x="24" y="2" width="3" height="3" fill="white"/>
            <rect x="0" y="22" width="7" height="7"/><rect x="2" y="24" width="3" height="3" fill="white"/>
            <rect x="9" y="1" width="1" height="1"/><rect x="11" y="2" width="2" height="1"/><rect x="15" y="1" width="1" height="2"/><rect x="18" y="2" width="1" height="1"/>
            <rect x="9" y="5" width="2" height="1"/><rect x="13" y="4" width="1" height="2"/><rect x="17" y="5" width="2" height="1"/>
            <rect x="1" y="9" width="1" height="2"/><rect x="4" y="9" width="2" height="1"/><rect x="8" y="9" width="1" height="3"/><rect x="11" y="9" width="1" height="1"/><rect x="14" y="9" width="2" height="2"/><rect x="19" y="9" width="1" height="1"/><rect x="22" y="9" width="2" height="1"/><rect x="26" y="10" width="1" height="2"/>
            <rect x="2" y="12" width="2" height="1"/><rect x="6" y="13" width="1" height="2"/><rect x="10" y="12" width="2" height="1"/><rect x="17" y="12" width="1" height="2"/><rect x="20" y="12" width="2" height="1"/><rect x="24" y="13" width="1" height="1"/>
            <rect x="1" y="15" width="1" height="1"/><rect x="4" y="16" width="1" height="1"/><rect x="9" y="15" width="2" height="1"/><rect x="13" y="15" width="1" height="2"/><rect x="16" y="16" width="1" height="1"/><rect x="19" y="15" width="1" height="1"/><rect x="23" y="15" width="2" height="1"/><rect x="27" y="16" width="1" height="1"/>
            <rect x="2" y="18" width="1" height="2"/><rect x="5" y="19" width="2" height="1"/><rect x="11" y="18" width="1" height="1"/><rect x="15" y="19" width="2" height="1"/><rect x="21" y="18" width="1" height="2"/><rect x="25" y="19" width="1" height="1"/>
            <rect x="9" y="21" width="1" height="2"/><rect x="12" y="21" width="2" height="1"/><rect x="17" y="21" width="1" height="2"/><rect x="23" y="21" width="1" height="1"/><rect x="26" y="21" width="2" height="2"/>
            <rect x="1" y="23" width="1" height="1"/><rect x="14" y="23" width="1" height="2"/><rect x="19" y="24" width="2" height="1"/><rect x="24" y="24" width="1" height="1"/>
            <rect x="9" y="26" width="2" height="1"/><rect x="13" y="27" width="1" height="1"/><rect x="16" y="26" width="2" height="1"/><rect x="22" y="26" width="1" height="2"/><rect x="26" y="27" width="2" height="1"/>
            <rect x="22" y="22" width="7" height="7" fill="white"/><rect x="24" y="24" width="3" height="3"/>
          </g>
        </svg>
        <div className="tabular mt-4 text-[13px] font-medium text-[#475569] bg-[#F6F8FA] border border-[#0B1220]/[0.08] rounded-full px-4 py-2">Cdwn…9f3k · Copy</div>
      </div>
      <div className="mt-4 flex items-center justify-between text-[12px] text-[#64748B] bg-white rounded-xl border border-[#0B1220]/[0.06] px-4 py-3">
        <span>Payroll auto-deposit</span>
        <span className="text-[#10B981] font-semibold">On · $1,200/mo</span>
      </div>
    </div>
  </div>
);

export const QuitModeScreen = () => (
  <div data-testid="phone-screen-quit-mode" className="text-[#0B1220]">
    <StatusBar />
    <div className="px-6 pt-5 pb-7">
      <div className="flex items-center justify-between">
        <span className="text-[22px] font-semibold tracking-tight">Quit mode</span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-full">Free forever</span>
      </div>
      <div className="mt-6 bg-white rounded-2xl border border-[#0B1220]/[0.06] p-5">
        <div className="text-[12px] uppercase tracking-[0.16em] font-semibold text-[#64748B]">Vault balance</div>
        <div className="tabular text-[30px] font-semibold tracking-tight mt-1">$8,412.60</div>
        <div className="tabular text-[13px] text-[#64748B] mt-0.5">12,847.12 USDC-equivalent</div>
        <div className="mt-4 h-1.5 rounded-full bg-[#0B1220]/[0.08] overflow-hidden">
          <div className="h-full w-[68%] rounded-full bg-[#0284C7]" />
        </div>
        <div className="tabular mt-2 text-[12px] text-[#64748B]">68 days sober of impulse buys</div>
      </div>
      <div className="mt-3 space-y-2.5">
        {[
          ["Withdrawal delay", "14 days"],
          ["Memecoin lockout", "6 months left"],
          ["Buddy alerts", "Maya · on"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between bg-white rounded-xl border border-[#0B1220]/[0.06] px-4 py-3.5">
            <span className="text-[13px] font-medium text-[#475569]">{k}</span>
            <span className="tabular text-[13px] font-semibold">{v}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center text-[11px] text-[#94A3B8]">Loosening any rule waits 14 days. Tightening is instant.</div>
    </div>
  </div>
);

export const TraderModeScreen = () => (
  <div data-testid="phone-screen-trader-mode" className="text-[#0B1220]">
    <StatusBar />
    <div className="px-6 pt-5 pb-7">
      <div className="flex items-center justify-between">
        <span className="text-[22px] font-semibold tracking-tight">Trader mode</span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0B1220] bg-[#0B1220]/[0.06] px-2.5 py-1 rounded-full">$9/mo</span>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-2.5">
        <div className="bg-white rounded-2xl border border-[#0B1220]/[0.06] p-4">
          <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#64748B]">Trading</div>
          <div className="tabular text-[20px] font-semibold tracking-tight mt-1">$400</div>
          <div className="text-[11px] text-[#10B981] font-semibold mt-0.5">Instant access</div>
        </div>
        <div className="bg-[#0B1220] rounded-2xl p-4 text-white">
          <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-white/50">Savings</div>
          <div className="tabular text-[20px] font-semibold tracking-tight mt-1">$6,900</div>
          <div className="text-[11px] text-[#BDE3F2] font-semibold mt-0.5">Locked · 72h</div>
        </div>
      </div>
      <div className="mt-3 space-y-2.5">
        {[
          ["Daily loss cap", "$150 · stops trading for the day"],
          ["Trades per day", "3 max"],
          ["Blue chips (SOL, BTC)", "Instant"],
          ["New tokens & perps", "Wait 72h"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between bg-white rounded-xl border border-[#0B1220]/[0.06] px-4 py-3.5 gap-3">
            <span className="text-[13px] font-medium text-[#475569] shrink-0">{k}</span>
            <span className="tabular text-[12px] font-semibold text-right">{v}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center text-[11px] text-[#94A3B8]">You keep trading. You stop blowing up.</div>
    </div>
  </div>
);
