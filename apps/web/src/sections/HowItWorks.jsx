"use client";

import { PhoneFrame, DelayPickerScreen, DepositScreen, WithdrawalScreen } from "../components/PhoneMockup";

const steps = [
  {
    n: "01",
    title: "Choose your delay",
    body: "24 hours to 30 days, set on a calm day. This is the rule future-you has to live with.",
    screen: <DelayPickerScreen />,
    testid: "step-1-card",
  },
  {
    n: "02",
    title: "Send savings and salary in",
    body: "Your Cooldown address works like an account number. Point your paycheck at it.",
    screen: <DepositScreen />,
    testid: "step-2-card",
  },
  {
    n: "03",
    title: "Every withdrawal waits",
    body: "Ask any time. The money moves after your delay, you can cancel before then, and your buddy gets a heads-up.",
    screen: <WithdrawalScreen />,
    testid: "step-3-card",
  },
];

export const HowItWorks = () => (
  <section id="how-it-works" data-testid="how-it-works-section" className="bg-[#F6F8FA] min-h-[100svh] py-24 sm:py-36">
    <div className="wrap max-w-[1280px] mx-auto px-6 lg:px-12">
      <div
        className="max-w-2xl"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748B]">How it works</span>
        <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold tracking-[-0.03em] leading-[1.1] text-[#0B1220]">
          Set one rule on a calm day, and Solana holds you to it
        </h2>
      </div>

      <div
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start"
      >
        {steps.map((s, i) => (
          <article
            key={s.n}
            data-testid={s.testid}
            className={`rounded-[28px] border border-[#0B1220]/[0.07] overflow-hidden ${
              i === 1 ? "bg-white shadow-[0_4px_40px_rgba(11,18,32,0.07)]" : "bg-white/60"
            }`}
          >
            <div className="p-7 sm:p-8">
              <span className="tabular text-[13px] font-semibold text-[#0284C7] tracking-[0.1em]">{s.n}</span>
              <h3 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight text-[#0B1220]">{s.title}</h3>
              <p className="mt-2.5 text-[15px] text-[#64748B] leading-relaxed">{s.body}</p>
            </div>
            <div className="px-7 sm:px-8 pb-0">
              <div className="rounded-t-[28px] overflow-hidden border border-b-0 border-[#0B1220]/[0.08] bg-[#F6F8FA]">
                {s.screen}
              </div>
            </div>
          </article>
        ))}
      </div>

      <p
        className="mt-12 max-w-3xl mx-auto text-center text-[15px] text-[#64748B] leading-relaxed"
      >
        <span className="font-semibold text-[#0B1220]">Stricter rules apply instantly.</span> Looser rules wait the
        same delay, so you can't switch it off at 3am either.
      </p>
    </div>
  </section>
);
