"use client";

import { Logo } from "../components/Logo";

const socials = [
  { label: "X", href: "https://x.com", testid: "footer-link-x" },
  { label: "Telegram", href: "https://telegram.org", testid: "footer-link-telegram" },
  { label: "GitHub", href: "https://github.com", testid: "footer-link-github" },
];

export const Footer = () => (
  <footer data-testid="footer-section" className="bg-[#05080E] text-[#94A3B8] pt-16 pb-28 sm:pb-16">
    <div className="wrap max-w-[1280px] mx-auto px-6 lg:px-12">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-10">
        <div className="max-w-sm">
          <Logo dark />
          <p className="mt-5 text-sm leading-relaxed">
            Cooldown is in development. Not financial advice. Rules you set when you're calm, enforced onchain when you're not.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 text-sm">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">If it's gone too far</div>
            <p className="mt-3 leading-relaxed">
              UK: <a href="tel:08088020133" className="text-white/70 hover:text-white transition-colors tabular">0808 8020 133</a>
              <br />
              US: <a href="tel:18004262537" className="text-white/70 hover:text-white transition-colors tabular">1-800-GAMBLER</a>
            </p>
          </div>
          <div className="flex gap-6">
            {socials.map((s) => (
              <a
                key={s.testid}
                data-testid={s.testid}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/55 hover:text-white transition-colors font-medium"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-white/[0.07] flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/30">
        <span>© {new Date().getFullYear()} Cooldown. The urge passes. Your money stays.</span>
        <span>Built on Solana. Your keys, always.</span>
      </div>
    </div>
  </footer>
);
