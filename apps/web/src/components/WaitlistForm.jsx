"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Share2, Check } from "lucide-react";
import { joinWaitlist } from "../lib/api";
import { EASE } from "../lib/motion";

const INTENTS = [
  { value: "quitting", label: "Quitting" },
  { value: "trading", label: "Trading with rules" },
  { value: "helping", label: "Helping someone" },
];

export const WaitlistForm = ({ dark = false, compact = false, source = "hero" }) => {
  const [email, setEmail] = useState("");
  const [intent, setIntent] = useState(null);
  const [state, setState] = useState("idle"); // idle | loading | done
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const prefix = source === "hero" ? "hero" : "final";

  const submit = async (e) => {
    e.preventDefault();
    if (state === "loading") return;
    setError("");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setError("Enter a full email address, like name@example.com.");
      return;
    }
    setState("loading");
    try {
      const data = await joinWaitlist({ email: email.trim(), intent, referrer: window.location.href });
      if (!data.ok) {
        setError(data.error || "Something went wrong. Try again.");
        setState("idle");
        return;
      }
      setResult(data);
      setState("done");
    } catch (err) {
      setError("Couldn't reach the list. Check your connection and try again.");
      setState("idle");
    }
  };

  const tweetText = encodeURIComponent(
    `I'm #${result?.position} on the @cooldown waitlist — a Solana account where every withdrawal waits the time you chose. The urge passes. Your money stays.`
  );

  const inputBase = dark
    ? "bg-white/[0.07] border-white/[0.14] text-white placeholder:text-white/40 focus:border-[#BDE3F2]/60"
    : "bg-white border-[#0B1220]/[0.12] text-[#0B1220] placeholder:text-[#94A3B8] focus:border-[#0B1220]/40";

  return (
    <div className="w-full max-w-xl" data-testid={`${prefix}-waitlist-form`}>
      <AnimatePresence mode="wait">
        {state === "done" && result ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className={`rounded-3xl p-6 sm:p-7 border ${
              dark ? "bg-white/[0.06] border-white/[0.12]" : "bg-white border-[#0B1220]/[0.08] shadow-[0_2px_20px_rgba(11,18,32,0.05)]"
            }`}
            data-testid="waitlist-position-badge"
          >
            <div className="flex items-start gap-4">
              <span className="mt-0.5 w-9 h-9 rounded-full bg-[#10B981]/15 text-[#10B981] inline-flex items-center justify-center shrink-0">
                <Check size={18} strokeWidth={2.5} />
              </span>
              <div>
                <p className={`text-lg font-semibold tracking-tight ${dark ? "text-white" : "text-[#0B1220]"}`}>
                  You're <span className="tabular">#{result.position}</span> on the list.
                </p>
                <p className={`text-sm mt-1 ${dark ? "text-white/55" : "text-[#64748B]"}`}>
                  We'll email <span className="font-medium">{result.email}</span> when your account opens.
                </p>
                <a
                  data-testid="waitlist-share-x-button"
                  href={`https://twitter.com/intent/tweet?text=${tweetText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-press mt-4 inline-flex items-center gap-2 text-sm font-medium px-4 h-10 rounded-full border ${
                    dark
                      ? "border-white/[0.16] text-white hover:bg-white/[0.08]"
                      : "border-[#0B1220]/[0.14] text-[#0B1220] hover:bg-[#0B1220]/[0.04]"
                  }`}
                >
                  <Share2 size={15} /> Share your spot on X
                </a>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: EASE }}
            onSubmit={submit}
            className="w-full"
            noValidate
          >
            <label htmlFor={`${prefix}-email`} className={`block mb-2 text-sm font-medium ${dark ? "text-white/70" : "text-[#475569]"}`}>Email address</label>
            <div className={`flex flex-col sm:flex-row gap-3 ${compact ? "" : ""}`}>
              <input
                id={`${prefix}-email`}
                data-testid={`${prefix}-waitlist-email-input`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email address"
                className={`w-full sm:flex-1 shrink-0 h-[52px] rounded-full px-5 text-base border outline-none transition-colors ${inputBase}`}
              />
              <button
                data-testid={`${prefix}-waitlist-submit-button`}
                type="submit"
                disabled={state === "loading"}
                className={`btn-press h-[52px] px-7 rounded-full text-base font-semibold inline-flex items-center justify-center gap-2 min-w-[168px] ${
                  dark
                    ? "bg-[#F6F8FA] text-[#0B1220] hover:bg-white"
                    : "bg-[#0B1220] text-white hover:bg-[#1E293B]"
                } disabled:opacity-70`}
              >
                {state === "loading" ? (
                  <>
                    <Loader2 size={17} className="animate-spin" /> Joining
                  </>
                ) : (
                  "Join the waitlist"
                )}
              </button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
              <span className={`text-xs ${dark ? "text-white/40" : "text-[#94A3B8]"}`}>What brings you here?</span>
              {INTENTS.map((it) => (
                <button
                  key={it.value}
                  type="button"
                  data-testid={`${prefix}-intent-${it.value}`}
                  onClick={() => setIntent(intent === it.value ? null : it.value)}
                  className={`btn-press text-xs font-medium px-3.5 h-8 rounded-full border transition-colors ${
                    intent === it.value
                      ? dark
                        ? "bg-white text-[#0B1220] border-white"
                        : "bg-[#0B1220] text-white border-[#0B1220]"
                      : dark
                        ? "border-white/[0.16] text-white/60 hover:text-white"
                        : "border-[#0B1220]/[0.14] text-[#64748B] hover:text-[#0B1220]"
                  }`}
                >
                  {it.label}
                </button>
              ))}
            </div>
            {error && (
              <p data-testid={`${prefix}-waitlist-error`} className="mt-3 text-sm font-medium text-[#FF4D2E]" role="alert">
                {error}
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
