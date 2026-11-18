"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { PhoneFrame, QuitModeScreen, TraderModeScreen } from "../components/PhoneMockup";
import { EASE } from "../lib/motion";

const modes = {
  quit: {
    label: "Quit mode",
    price: "Free forever",
    tagline: "For when you're done. Really done.",
    features: [
      "Long delays — 72 hours to 30 days",
      "Buddy alerts on every withdrawal",
      "Full memecoin lockout for 1–12 months",
      "Stricter rules apply instantly, always",
    ],
    screen: <QuitModeScreen />,
  },
  trader: {
    label: "Trader mode",
    price: "$9/month",
    tagline: "Keep trading. Stop blowing up.",
    features: [
      "Daily loss cap that actually stops you",
      "Trade limit per day, set when calm",
      "Blue chips instant — SOL, BTC, stables",
      "New tokens and perps wait your delay",
    ],
    screen: <TraderModeScreen />,
  },
};

export const TwoModes = () => {
  const [mode, setMode] = useState("quit");
  const m = modes[mode];

  return (
    <section data-testid="two-modes-section" className="bg-white min-h-[100svh] py-24 sm:py-36">
      <div className="wrap max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748B]">Two modes</span>
          <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold tracking-[-0.03em] leading-[1.1] text-[#0B1220]">
            Out completely, or trading with a seatbelt.
          </h2>
        </div>

        <div className="mt-10 flex justify-center">
          <div
            data-testid="mode-toggle-switch"
            className="relative inline-flex bg-[#0B1220]/[0.05] border border-[#0B1220]/[0.08] rounded-full p-1.5"
            role="tablist"
            aria-label="Choose mode"
          >
            {Object.entries(modes).map(([key, val]) => (
              <button
                key={key}
                role="tab"
                aria-selected={mode === key}
                data-testid={`mode-toggle-${key}`}
                onClick={() => setMode(key)}
                className={`relative z-10 h-11 px-6 rounded-full text-sm font-semibold transition-colors ${
                  mode === key ? "text-white" : "text-[#64748B] hover:text-[#0B1220]"
                }`}
              >
                {mode === key && (
                  <motion.span
                    layoutId="mode-pill"
                    className="absolute inset-0 bg-[#0B1220] rounded-full -z-10"
                    transition={{ duration: 0.45, ease: EASE }}
                  />
                )}
                {val.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mode + "-copy"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <div className="flex items-baseline gap-4 flex-wrap">
                <h3 className="text-3xl font-semibold tracking-tight text-[#0B1220]">{m.label}</h3>
                <span className="tabular text-lg font-semibold text-[#0284C7]">{m.price}</span>
              </div>
              <p className="mt-3 text-lg text-[#64748B]">{m.tagline}</p>
              <ul className="mt-8 space-y-4">
                {m.features.map((f) => (
                  <li key={f} className="flex items-start gap-3.5 text-[16px] text-[#0B1220]">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-[#BDE3F2]/40 text-[#0284C7] inline-flex items-center justify-center shrink-0">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode + "-screen"}
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <PhoneFrame className="w-[290px] sm:w-[320px]">{m.screen}</PhoneFrame>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
