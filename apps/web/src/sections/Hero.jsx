"use client";

import { WaitlistForm } from "../components/WaitlistForm";
import { PhoneFrame, WithdrawalScreen } from "../components/PhoneMockup";

const LINES = ["A Solana account", "where withdrawals wait."];

export const Hero = () => {
  return (
    <section
      id="hero"
      data-enter
      data-testid="hero-section"
      className="relative overflow-hidden bg-[#F6F8FA] min-h-[100svh] pt-32 pb-16 sm:pt-40 sm:pb-24"
    >
      {/* ambient warmth */}
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[520px] rounded-full opacity-60 pointer-events-none"
        style={{ background: "radial-gradient(closest-side, rgba(189,227,242,0.5), rgba(189,227,242,0))" }}
      />
      <div className="relative wrap max-w-[1280px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8 items-start">
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <span
            data-testid="hero-eyebrow"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1220]/[0.05] border border-[#0B1220]/[0.08] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#475569]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
            The urge passes. Your money stays.
          </span>

          <h1
            data-testid="hero-headline"
            className="mt-6 text-[clamp(2.6rem,6vw,4.5rem)] font-semibold tracking-[-0.03em] leading-[1.05] text-[#0B1220]"
          >
            {LINES.map((line, li) => (
              <span key={line} className="block overflow-hidden pb-1">
                <span className={`block enter-line enter-d${li}`}>
                  {li === 1 ? (
                    <>
                      where withdrawals <span className="relative inline-block">wait.
                        <span
                          aria-hidden="true"
                          className="enter-underline absolute left-0 bottom-2 h-[6px] w-full bg-[#BDE3F2] -z-10 rounded-full"
                        />
                      </span>
                    </>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p
            data-testid="hero-subheading"
            className="enter-item enter-d2 mt-6 text-lg sm:text-xl text-[#64748B] leading-relaxed max-w-xl"
          >
            Cooldown is a Solana account where each withdrawal waits the time you chose, 72 hours by default.
            You can cancel it until then, so a 3am urge meets a locked door.
          </p>

          <div className="enter-item enter-d3 mt-8 w-full max-w-xl">
            <WaitlistForm source="hero" />
            <p className="mt-4 text-sm text-[#94A3B8]">Free for anyone quitting. You keep your keys.</p>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="enter-item enter-d1 relative">
            <div
              aria-hidden="true"
              className="absolute -inset-10 rounded-full opacity-70 pointer-events-none"
              style={{ background: "radial-gradient(closest-side, rgba(2,132,199,0.14), transparent)" }}
            />
            <PhoneFrame className="relative w-[300px] sm:w-[330px]">
              <WithdrawalScreen />
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
};
