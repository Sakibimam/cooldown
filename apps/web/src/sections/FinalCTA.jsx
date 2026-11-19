"use client";

import { WaitlistForm } from "../components/WaitlistForm";

const MORNING_IMG =
  "https://images.unsplash.com/photo-1677846092922-5b685ba0afb2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwxfHxjYWxtJTIwbW9ybmluZyUyMGNvZmZlZSUyMGRlc2slMjB3aW5kb3d8ZW58MHx8fHwxNzk1MDQwNTExfDA&ixlib=rb-4.1.0&q=85";

export const FinalCTA = () => (
  <section id="final-cta" data-testid="final-cta-section" className="relative bg-[#F6F8FA] min-h-[100svh] py-24 sm:py-36 overflow-hidden">
    <div className="wrap max-w-[1280px] mx-auto px-6 lg:px-12">
      <div className="relative rounded-[32px] overflow-hidden">
        <img
          src={MORNING_IMG}
          alt="Calm morning light across a quiet desk"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="cta-scrim absolute inset-0" />
        <div className="relative px-7 py-16 sm:px-14 sm:py-24 max-w-2xl">
          <div>
            <h2
              data-testid="final-cta-headline"
              className="text-[clamp(2.2rem,5vw,3.75rem)] font-semibold tracking-[-0.03em] leading-[1.08] text-white"
            >
              Set your rules while you're calm.
            </h2>
            <p data-testid="final-cta-subheading" className="mt-5 text-lg text-white/65 leading-relaxed">
              The founder sets up the first 100 accounts.
            </p>
            <div className="mt-9">
              <WaitlistForm dark compact source="final" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
