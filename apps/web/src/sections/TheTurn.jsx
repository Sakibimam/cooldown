"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { sectionReveal } from "../lib/motion";

const LINE_PATH =
  "M0,60 C120,64 220,90 320,150 C420,210 520,270 660,310 C800,350 1000,372 1200,380";

export const TheTurn = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const bg = useTransform(
    scrollYProgress,
    [0.05, 0.45],
    ["#070B14", "#F6F8FA"]
  );
  const headlineColor = useTransform(scrollYProgress, [0.1, 0.45], ["#F6F8FA", "#0B1220"]);
  const subColor = useTransform(scrollYProgress, [0.1, 0.45], ["rgba(246,248,250,0.55)", "#64748B"]);
  const lineColor = useTransform(scrollYProgress, [0.05, 0.5], ["#FF4D2E", "#7CC7E4"]);
  const glowOpacity = useTransform(scrollYProgress, [0.05, 0.5], [0.35, 0]);

  return (
    <motion.section
      ref={ref}
      data-testid="the-turn-section"
      style={{ backgroundColor: bg }}
      className="relative overflow-hidden min-h-[100svh] py-28 sm:py-40"
    >
      <motion.div
        aria-hidden="true"
        style={{ opacity: glowOpacity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
      >
        <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(closest-side, rgba(255,77,46,0.35), transparent)" }} />
      </motion.div>

      <div className="relative wrap max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
        <motion.h2
          data-testid="turn-headline"
          style={{ color: headlineColor }}
          className="text-[clamp(2.2rem,5.5vw,4rem)] font-semibold tracking-[-0.03em] leading-[1.08]"
        >
          Willpower loses at 3am.
          <br />
          A 72-hour wait doesn't.
        </motion.h2>

        <motion.p
          style={{ color: subColor }}
          className="mt-6 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
        >
          It is the same chart and the same you. The 72 hours between the urge and the money is what changed.
        </motion.p>

        <div data-testid="turn-signature-cooling-canvas" className="mt-14 max-w-3xl mx-auto">
          <svg viewBox="0 0 1200 420" className="w-full h-auto" fill="none" aria-hidden="true">
            <motion.path
              d={LINE_PATH}
              stroke="#FF4D2E"
              strokeWidth="14"
              strokeLinecap="round"
              style={{ opacity: useTransform(scrollYProgress, [0.05, 0.5], [0.18, 0]) }}
              filter="blur(10px)"
            />
            <motion.path
              d={LINE_PATH}
              stroke={lineColor}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <motion.circle
              cx="1200"
              cy="380"
              r="7"
              fill="#7CC7E4"
              style={{ opacity: useTransform(scrollYProgress, [0.35, 0.55], [0, 1]) }}
            />
          </svg>
          <motion.p
            style={{ color: subColor }}
            className="tabular mt-2 text-xs font-medium tracking-[0.14em] uppercase"
          >
            72 hours later
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
};
