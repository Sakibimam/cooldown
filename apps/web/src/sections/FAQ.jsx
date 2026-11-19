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
    a: "Keep one or two months of expenses in your bank. Cooldown is for savings, not emergencies.",
    testid: "faq-item-emergency",
  },
  {
    q: "Can't I just open a new wallet?",
    a: "You can, but it starts empty. Funding it means waiting out your delay first.",
    testid: "faq-item-new-wallet",
  },
  {
    q: "Can I still trade?",
    a: "Yes. Trader mode ($9/month) gives you a capped daily balance. Blue chips are instant; new tokens wait.",
    testid: "faq-item-can-i-trade",
  },
  {
    q: "What does my buddy see?",
    a: "One message when a withdrawal starts. Never your balance or history.",
    testid: "faq-item-buddy",
  },
  {
    q: "Is this a treatment for gambling?",
    a: "No. It adds a wait. For help: UK 0808 8020 133, US 1-800-GAMBLER, both free.",
    testid: "faq-item-medical",
  },
  {
    q: "Is it live yet?",
    a: "Not yet. The waitlist gets in first.",
    testid: "faq-item-is-it-live",
  },
];

export const FAQ = () => (
  <section id="faq" data-testid="faq-section" className="bg-white min-h-[100svh] py-24 sm:py-36">
    <div className="wrap max-w-[1280px] mx-auto px-6 lg:px-12">
      <div className="max-w-4xl">
      <div>
        <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold tracking-[-0.03em] leading-[1.1] text-[#0B1220]">
          Questions
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
