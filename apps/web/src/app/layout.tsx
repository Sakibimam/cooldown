import type { Metadata, Viewport } from "next";
import "./globals.css";
import "../App.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Cooldown: a Solana account your impulses can't empty",
  description:
    "Every withdrawal waits the time you chose. Cancel any time. Protect your savings and salary from memecoins and perps.",
  keywords: [
    "quit memecoins",
    "stop trading crypto",
    "crypto gambling self exclusion",
    "block pump.fun",
    "solana savings lock",
    "crypto withdrawal delay",
  ],
  openGraph: {
    title: "Cooldown: a Solana account your impulses can't empty",
    description:
      "Every withdrawal waits the time you chose. Cancel any time. The urge passes. Your money stays.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#070B14",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cooldown",
  description:
    "A Solana account where every withdrawal waits the time you chose. Cancel any time.",
  slogan: "The urge passes. Your money stays.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    ["What if I need money urgently?", "Keep 1–2 months of living expenses in your regular bank. Cooldown protects the savings and salary you point at it."],
    ["Can't I just open a new wallet?", "You can, but it starts empty. The money inside Cooldown can only leave after your delay — and funding a new wallet means waiting through it first."],
    ["Can I still trade?", "Yes. Trader mode gives you a separate daily-capped trading balance while savings stay locked."],
    ["What does my buddy see?", "Only a heads-up when a withdrawal starts. Never your balance, your history, or any control over your money."],
    ["Is this a treatment for gambling?", "No. Cooldown is a tool, not treatment. Real help lines are listed in our footer."],
    ["Is it live yet?", "In development, with the first cohort onboarding soon. The waitlist gets first access."],
  ].map(([name, text]) => ({
    "@type": "Question",
    name,
    acceptedAnswer: { "@type": "Answer", text },
  })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('m-enter');setTimeout(()=>document.documentElement.classList.add('m-enter-done'),700)",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@1,6..72,400;1,6..72,500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
