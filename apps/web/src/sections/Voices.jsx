"use client";

const quotes = [
  {
    quote: "I still just throw my money at pump.fun, hate myself, get paid, repeat.",
    source: "r/solana · Jul 2025",
    testid: "quote-card-1",
  },
  {
    quote: "Need app to block cryptocasinos, will pay 500€ usdt.",
    source: "r/problemgambling · Mar 2026",
    testid: "quote-card-2",
  },
  {
    quote: "Tools that can actually stop you from breaking your trading rules. Hard-enforce, not warnings.",
    source: "r/Daytrading · Sep 2026",
    testid: "quote-card-3",
  },
];

const QuoteCard = ({ q }) => (
  <figure
    data-testid={q.testid}
    className="bg-white rounded-[28px] border border-[#0B1220]/[0.07] p-8 sm:p-10 shadow-[0_2px_24px_rgba(11,18,32,0.05)]"
  >
    <blockquote className="font-serif-quote text-[clamp(1.4rem,2.6vw,1.9rem)] leading-[1.35] text-[#0B1220]">
      “{q.quote}”
    </blockquote>
    <figcaption className="mt-5 text-[13px] font-semibold text-[#94A3B8] tracking-wide">{q.source}</figcaption>
  </figure>
);

export const Voices = () => (
  <section data-testid="real-voices-section" className="bg-[#F6F8FA] min-h-[100svh] py-24 sm:py-36 border-y border-[#0B1220]/[0.06]">
    <div className="wrap max-w-[1280px] mx-auto px-6 lg:px-12">
    <div className="mb-12">
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748B]">Real voices</span>
        <h2 className="mt-3 text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold tracking-[-0.03em] text-[#0B1220]">
          What people trying to stop trading have written
        </h2>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {quotes.map((q) => (
        <QuoteCard key={q.testid} q={q} />
      ))}
    </div>
    </div>
  </section>
);
