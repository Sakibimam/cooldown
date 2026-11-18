"use client";

import { KeyRound, Anchor, ShieldOff } from "lucide-react";

const pillars = [
  {
    icon: KeyRound,
    title: "Non-custodial",
    body: "A Squads smart account you control. We can't touch your money — only the timer stands between you and it.",
    testid: "trust-pillar-noncustodial",
  },
  {
    icon: Anchor,
    title: "Enforced on Solana",
    body: "The wait lives on the blockchain, not our servers. If we disappeared tomorrow, your rules would still hold.",
    testid: "trust-pillar-onchain",
  },
  {
    icon: ShieldOff,
    title: "We never ask for your seed phrase",
    body: "Ever. Anyone who does is robbing you. Yes, even if their logo looks like ours.",
    testid: "trust-pillar-zero-seed",
  },
];

export const Trust = () => (
  <section id="trust" data-testid="trust-section" className="bg-[#F6F8FA] min-h-[100svh] py-24 sm:py-36">
    <div className="wrap max-w-[1280px] mx-auto px-6 lg:px-12">
      <div
        className="max-w-3xl"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748B]">Trust</span>
        <h2
          data-testid="trust-headline"
          className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold tracking-[-0.03em] leading-[1.1] text-[#0B1220]"
        >
          Your keys. Your money.
          <br />
          Our only job is the wait.
        </h2>
      </div>

      <div
        className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {pillars.map((p, i) => (
          <div
            key={p.title}
            data-testid={p.testid}
            className={`rounded-[28px] p-8 border border-[#0B1220]/[0.07] ${
              i === 1 ? "bg-[#0B1220] text-white" : "bg-white"
            }`}
          >
            <span
              className={`w-12 h-12 rounded-2xl inline-flex items-center justify-center ${
                i === 1 ? "bg-white/[0.08] text-[#BDE3F2]" : "bg-[#BDE3F2]/35 text-[#0284C7]"
              }`}
            >
              <p.icon size={22} strokeWidth={1.8} />
            </span>
            <h3 className={`mt-6 text-xl font-semibold tracking-tight ${i === 1 ? "text-white" : "text-[#0B1220]"}`}>
              {p.title}
            </h3>
            <p className={`mt-3 text-[15px] leading-relaxed ${i === 1 ? "text-white/60" : "text-[#64748B]"}`}>{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
