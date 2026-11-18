"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const faqs = [
  {
    q: "What if I need money urgently?",
    a: "Keep 1–2 months of living expenses in your regular bank — that's not what Cooldown is for. Cooldown protects the savings and salary you'd otherwise feed to a 3am candle. Emergencies deserve boring money, not a countdown.",
    testid: "faq-item-emergency",
  },
  {
    q: "Can't I just open a new wallet?",
    a: "You can. But it starts empty. The money inside Cooldown can only leave after your delay, so funding a fresh wallet means waiting through it first — and by then, the urge has usually packed up and left.",
    testid: "faq-item-new-wallet",
  },
  {
    q: "Can I still trade?",
    a: "Yes. Trader mode ($9/month) gives you a daily-capped trading balance and instant access to blue chips. New tokens and perps wait your delay. You keep the hobby; you lose the blow-ups.",
    testid: "faq-item-can-i-trade",
  },
  {
    q: "What does my buddy see?",
    a: "One heads-up when a withdrawal starts: \"Alex requested 500 USDC. It moves in 71 hours.\" No balance, no history, no control. Just enough for a friend to text \"you good?\"",
    testid: "faq-item-buddy",
  },
  {
    q: "Is this a treatment for gambling?",
    a: "No. Cooldown is a tool, not treatment — it enforces a wait, it doesn't fix anything underneath. If gambling is hurting you, real help exists: UK 0808 8020 133, US 1-800-GAMBLER. Both are free and confidential.",
    testid: "faq-item-medical",
  },
  {
    q: "Is it live yet?",
    a: "In development, with the first cohort onboarding soon. The waitlist gets access first — and the first 100 accounts are onboarded personally by the founder.",
    testid: "faq-item-is-it-live",
  },
];

export const FAQ = () => (
  <section id="faq" data-testid="faq-section" className="bg-white min-h-[100svh] py-24 sm:py-36">
    <div className="wrap max-w-[1280px] mx-auto px-6 lg:px-12">
      <div className="max-w-4xl">
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748B]">FAQ</span>
        <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold tracking-[-0.03em] leading-[1.1] text-[#0B1220]">
          Questions about the wait, the buddy and your money
        </h2>
      </div>

      <div className="mt-12">
        <Accordion type="single" collapsible data-testid="faq-accordion" className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.testid}
              value={f.testid}
              data-testid={f.testid}
              className="border-b border-[#0B1220]/[0.08]"
            >
              <AccordionTrigger
                data-testid={`${f.testid}-trigger`}
                className="text-left text-lg sm:text-xl font-semibold tracking-tight text-[#0B1220] py-6 hover:no-underline min-h-[44px]"
              >
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-[#64748B] leading-relaxed pb-6 max-w-2xl">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      </div>
    </div>
  </section>
);
