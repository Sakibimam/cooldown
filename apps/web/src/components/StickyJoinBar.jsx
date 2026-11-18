"use client";

import { useEffect, useState } from "react";

export const StickyJoinBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      const past = hero ? window.scrollY > hero.offsetHeight * 0.8 : window.scrollY > 600;
      const nearBottom = window.innerHeight + window.scrollY > document.body.scrollHeight - 700;
      setVisible(past && !nearBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      data-testid="mobile-sticky-join-bar"
      className={`sm:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3 bg-white/90 backdrop-blur-xl border-t border-[#0B1220]/[0.08] flex items-center justify-between gap-4 transition-transform duration-500 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      <span className="text-[13px] font-medium text-[#475569] leading-tight">
        Your rules.
        <br />
        Enforced onchain.
      </span>
      <button
        data-testid="sticky-join-button"
        onClick={() => document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" })}
        className="btn-press h-11 px-6 rounded-full bg-[#0B1220] text-white text-sm font-semibold shrink-0"
      >
        Join the waitlist
      </button>
    </div>
  );
};
