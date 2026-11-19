"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, Share2, Lock } from "lucide-react";
import { EASE } from "../lib/motion";
import { logMirrorEvent } from "../lib/api";

const SAMPLE_WALLET = "8x2VgT4mKq9pLn3dRw7sJhYcF6bN5eAzUoX1vPk9Qm";
const SAMPLE = { putIn: 14200, tookOut: 3100 };

export const Mirror = () => {
  const [wallet, setWallet] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | done

  const run = (addr) => {
    if (state === "loading") return;
    const value = (addr ?? wallet).trim() || SAMPLE_WALLET;
    setState("loading");
    logMirrorEvent(value);
    setTimeout(() => setState("done"), 900);
  };

  const gone = SAMPLE.putIn - SAMPLE.tookOut;
  const tweet = encodeURIComponent(
    `My memecoin Mirror: put in $14,200, took out $3,100. Gone: −$11,100. See yours — paste any Solana wallet. The urge passes. Your money stays.`
  );

  return (
    <section id="mirror" data-testid="mirror-section" className="grain relative bg-[#0B1220] text-white min-h-[100svh] py-24 sm:py-36 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -bottom-40 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(closest-side, rgba(2,132,199,0.12), transparent)" }}
      />
      <div className="relative wrap max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="text-center">
          <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold tracking-[-0.03em] leading-[1.1]">
            See what memecoins cost you.
          </h2>
          <p className="mt-4 text-lg text-white/55 leading-relaxed max-w-2xl mx-auto">
            Paste a Solana wallet. Paste any Solana wallet. Nothing to connect or sign.
          </p>
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          <label htmlFor="mirror-wallet" className="block mb-2 text-sm font-medium text-white/70">Solana wallet address</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="mirror-wallet"
              data-testid="mirror-wallet-input"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && run()}
              placeholder="Paste a Solana wallet"
              aria-label="Solana wallet address"
              className="tabular w-full sm:flex-1 shrink-0 h-[52px] rounded-full px-5 text-[15px] bg-white/[0.06] border border-white/[0.14] text-white placeholder:text-white/35 outline-none focus:border-[#BDE3F2]/50 transition-colors"
            />
            <button
              data-testid="mirror-submit-btn"
              onClick={() => run()}
              disabled={state === "loading"}
              className="btn-press h-[52px] px-7 rounded-full bg-[#F6F8FA] text-[#0B1220] text-[15px] font-semibold inline-flex items-center justify-center gap-2 hover:bg-white disabled:opacity-70"
            >
              {state === "loading" ? (
                <>
                  <Loader2 size={17} className="animate-spin" /> Reading the chain
                </>
              ) : (
                <>
                  Show my Mirror <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
          <button
            data-testid="mirror-sample-wallet-btn"
            onClick={() => { setWallet(SAMPLE_WALLET); run(SAMPLE_WALLET); }}
            className="mt-4 text-sm text-white/40 hover:text-white/70 transition-colors underline underline-offset-4 decoration-white/20"
          >
            Try a sample wallet
          </button>

          <AnimatePresence>
            {state === "done" && (
              <motion.div
                data-testid="mirror-result-card"
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mt-8 rounded-[28px] bg-[#F6F8FA] text-[#0B1220] p-7 sm:p-9 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748B]">Your Mirror</span>
                  <span className="tabular text-xs text-[#94A3B8]">{(wallet.trim() || SAMPLE_WALLET).slice(0, 6)}…{(wallet.trim() || SAMPLE_WALLET).slice(-4)}</span>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748B]">Put in</div>
                    <div data-testid="mirror-stat-put-in" className="tabular mt-1.5 text-xl sm:text-2xl font-semibold tracking-tight">
                      ${SAMPLE.putIn.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748B]">Took out</div>
                    <div data-testid="mirror-stat-took-out" className="tabular mt-1.5 text-xl sm:text-2xl font-semibold tracking-tight">
                      ${SAMPLE.tookOut.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FF4D2E]">Gone</div>
                    <div data-testid="mirror-stat-gone" className="tabular mt-1.5 text-xl sm:text-2xl font-semibold tracking-tight text-[#FF4D2E]">
                      −${gone.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="mt-6 h-2 rounded-full bg-[#0B1220]/[0.06] overflow-hidden flex">
                  <div className="h-full bg-[#0284C7]" style={{ width: `${(SAMPLE.tookOut / SAMPLE.putIn) * 100}%` }} />
                  <div className="h-full bg-[#FF4D2E]" style={{ width: `${(gone / SAMPLE.putIn) * 100}%` }} />
                </div>
                <p className="mt-3 text-[13px] text-[#94A3B8]">Sample result until the beta. The real Mirror reads your actual onchain history.</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    data-testid="mirror-lock-leftover-btn"
                    onClick={() => document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" })}
                    className="btn-press flex-1 h-[50px] rounded-full bg-[#0B1220] text-white text-[15px] font-semibold inline-flex items-center justify-center gap-2 hover:bg-[#1E293B]"
                  >
                    <Lock size={16} /> Lock what's left
                  </button>
                  <a
                    data-testid="mirror-share-x-btn"
                    href={`https://twitter.com/intent/tweet?text=${tweet}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press flex-1 h-[50px] rounded-full border border-[#0B1220]/[0.14] text-[#0B1220] text-[15px] font-semibold inline-flex items-center justify-center gap-2 hover:bg-[#0B1220]/[0.04]"
                  >
                    <Share2 size={16} /> Share your Mirror on X
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
