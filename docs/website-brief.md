# Cooldown website: full brief for a UI-generating AI

> **Decisions (2026-11-19):** visual direction **C, "Calm finance app"** (premium fintech, mostly white); waitlist saved in the
> builder's **built-in database**; Trader mode **$9/month**; **Mirror mocked** with the sample card ($14,200 in / $3,100 out / −$11,100),
> behind one function so a real Solana API can drop in later; photography **skipped for now** (use product UI in device frames, no stock photos).

Use this with v0, Lovable, Bolt, Framer AI, Google Stitch, Galileo or a human designer.
Part A is the spec. Part B is a paste-ready prompt. Part C has image prompts.

---

## Part A. The spec

### 1. What the site must do
- **Main goal:** collect waitlist emails from people who want to protect their money from memecoin and perp impulses.
- **Second goal:** make a visitor feel understood in 5 seconds, then trust us enough to give an email.
- **Success metric:** waitlist conversion ≥ 8% of visitors; Mirror wallet-paste clicks.

### 2. Who visits
1. **The burned trader** (20–35, crypto-native, on X/CT, has lost big on pump.fun/Axiom/perps, still trades). Hates being lectured. Responds to honesty, dark humour, real numbers.
2. **The quitter** (wants out; ashamed; reads at 3am). Needs warmth, privacy, zero judgement.
3. **The partner/parent** (not crypto-native). Needs plain English and reassurance that it's safe.
4. **Grant judges and investors** (Superteam, Solana Foundation, Colosseum). Need to see a real product, a clear mechanism and seriousness.

### 3. Brand
- **Name:** Cooldown
- **Tagline:** The urge passes. Your money stays.
- **Promise:** Rules you set when you're calm, enforced onchain when you're not.
- **Personality:** calm, direct, a little dry-witted, never preachy. A friend who's been there, not a therapist or a bank.
- **Words we use:** wait, cooling-off, lock, cancel, your rules, your keys.
- **Words we never use:** addict, degenerate, revolutionary, seamless, unlock your potential, web3, DeFi jargon in headlines.

### 4. Visual direction (pick one; A is recommended)
- **A. "3am to morning".** The page starts at night (deep blue-black, a phone glowing, a red chart) and literally gets lighter as you scroll, ending in calm morning daylight. The emotion of the product is the scroll: heat to calm.
- **B. "Thermostat."** One big physical-feeling dial/thermometer as the hero object (3D render). Temperature drops as you scroll: red → amber → ice blue.
- **C. "Calm finance app" (CHOSEN).** Premium fintech look in the style of Apple Wallet, Mercury or Revolut Ultra: product screenshots in real phone frames, big confident type, lots of white space.

Shared rules:
- Colours: night `#070B14`, deep blue `#0F1E33`, ember red `#FF4D2E` (only for losses and the "heat"), ice `#BDE3F2`, morning white `#F6F8FA`, ink text `#0B1220`. No purple gradients, no neon green.
- Type: one strong grotesk for everything (e.g. **Inter Display**, **General Sans**, **Satoshi** or **Neue Montreal**), tight tracking on headlines, sentence case everywhere. Tabular numbers for timers and money.
- Corners: 20–28px on large surfaces, full pill on buttons. No identical-card grids; vary sizes.
- Imagery: real-feeling photography (see Part C) plus crisp product UI in real device frames. No stock "crypto coins", no robots, no blockchain cubes, no emoji.

### 5. Page structure (landing page, one page, 100% width, sections full-bleed)

**0. Top bar**
- Left: Cooldown logo (a circle with a clock hand easing down).
- Right: How it works · Mirror · FAQ · button "Join the waitlist".
- Becomes a frosted glass bar on scroll. On phone: logo + "Join" button only, menu behind a hamburger.

**1. Hero (night)**
- Background: dark night photo (Part C, image 1) of a person in bed lit by a phone, or a dark full-bleed with a glowing phone.
- Headline: **The urge passes. Your money stays.**
- Sub: Cooldown is a Solana account where every withdrawal waits the time you chose, 72 hours by default. Cancel any time. By the time the money can move, the memecoin is gone, and so is the urge.
- Email field + button "Join the waitlist". Under it: "Free for anyone quitting. You keep your keys."
- Right side / below on phone: a real iPhone frame showing the **withdrawal screen**: "500 USDC · Unlocks in 71:59:42" with a ring timer that actually ticks, "Maya was notified", button "Cancel withdrawal".
- Motion: page-load sequence only here. Headline fades up word by word (300ms stagger), the phone rises 24px and the timer starts ticking.

**2. The problem (still night)**
- Big number: **49%** "of 6.7M pump.fun wallets lost 90% or more of everything they put in."
- Second line: "Memecoins keep about 25¢ of every $1. A slot machine keeps 3.5¢."
- A red line chart draws in as it scrolls into view.
- Small source line (2026 analysis, not peer-reviewed).

**3. The turn (dawn: background starts lightening)**
- Copy: "Willpower loses at 3am. A 72-hour wait doesn't."
- Scroll animation: the red chart line cools to ice blue as the background goes from night to dawn. This is the signature moment of the site.

**4. How it works (morning)**, a real 3-step sequence
1. **Choose your delay**: 24 hours to 30 days, set on a calm day.
2. **Send savings and salary in**: your Cooldown address works like an account number; point your paycheck at it.
3. **Every withdrawal waits**: ask any time; it unlocks after your delay; cancel until then; a buddy gets a heads-up.
- Each step paired with a product screenshot in a phone frame (Delay picker, Deposit address with QR, Withdrawal countdown).
- Note under it: "Stricter rules apply instantly. Looser rules wait the same delay, so nobody, including you at 3am, can switch it off."

**5. Mirror (interactive)**
- Headline: "How much have memecoins taken from you?"
- Input: "Paste a Solana wallet" + button "Show my Mirror". No wallet connection needed.
- Result card (sample until the beta): Put in $14,200 · Took out $3,100 · **Gone −$11,100** · button "Lock what's left".
- Share card preview (what people post on X).

**6. Real voices**
- Three quotes in a large serif italic, with source and date:
  - "I still just throw my money at pump.fun, hate myself, get paid, repeat." (r/solana, Jul 2025)
  - "Need app to block cryptocasinos, will pay 500€ usdt." (r/problemgambling, Mar 2026)
  - "Tools that can actually stop you from breaking your trading rules. Hard-enforce, not warnings." (r/Daytrading, Sep 2026)
- Slow horizontal marquee on desktop, swipe carousel on phone.

**7. Two modes**
- **Quit mode, free forever:** long delays, buddy alerts, full memecoin lockout for 1–12 months.
- **Trader mode, $9/month:** daily loss cap, trade limit, blue chips instant, new tokens wait.
- Toggle switch between them that changes the phone screenshot.

**8. Trust**
- "Your keys. Your money. Our only job is the wait."
- Three points with icons: non-custodial (Squads smart account you control) · enforced on the Solana blockchain, not our servers · we never ask for your seed phrase.
- Logos row: Solana, Squads (only once integrations are real).

**9. FAQ** (accordion)
- What if I need money urgently? · Can't I just open a new wallet? · Can I still trade? · What does my buddy see? · Is this a treatment for gambling? · Is it live yet?

**10. Final CTA (full morning light)**
- Background: calm morning photo (Part C, image 3).
- "Set your rules while you're calm." + email field + "Join the waitlist".
- "The first 100 accounts are onboarded by the founder."

**11. Footer**
- "Cooldown is in development. Not financial advice." · Helplines: UK 0808 8020 133 · US 1-800-GAMBLER · links: X, Telegram, GitHub, Privacy.

### 6. Waitlist behaviour
- Fields: email (required), optional "What brings you here?" (Quitting / Trading with rules / Helping someone).
- On submit: button shows a spinner, then the form turns into "You're #128 on the list. We'll email you@x.com." plus "Share your spot on X" (prefilled tweet).
- Errors: "Enter a full email address, like name@example.com."
- Store in Supabase (`waitlist`: email, intent, referrer, created_at). Double-submit safe.

### 7. Motion rules
- One page-load sequence (hero) and one scroll story (night → morning, red line → blue). Everything else is still.
- Microinteractions only on action: button press scale 0.98, input focus ring, accordion open, toggle switch.
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`, 400–700ms. Respect `prefers-reduced-motion` (no scroll colour change, timer still ticks).
- Smooth scroll (Lenis) on desktop only.

### 8. Responsive
- Width 100%, content max 1280px, side padding 24px on phone and 48px on desktop.
- Breakpoints: 390 (phone), 768 (tablet), 1280 (laptop), 1600+ (big screen: type scales with `clamp()`).
- Phone: everything single column; the hero phone mockup sits under the headline; sticky bottom "Join the waitlist" bar after the hero.
- Hit areas ≥ 44px; body text ≥ 16px.

### 9. SEO and sharing
- Title: "Cooldown: a Solana account your impulses can't empty"
- Meta description: "Every withdrawal waits the time you chose. Cancel any time. Protect your savings and salary from memecoins and perps."
- Open Graph image: dark-to-light split, headline, phone with timer (1200×630).
- Keywords to rank for: quit memecoins, stop trading crypto, crypto gambling self exclusion, block pump.fun, solana savings lock, crypto withdrawal delay.
- Structured data: Organization + FAQPage. Fast: Lighthouse ≥ 95, images in AVIF/WebP, fonts self-hosted.

### 10. Tech
- Next.js (App Router) + TypeScript + Tailwind, Framer Motion for animation, Lenis for smooth scroll, Supabase for the waitlist, Vercel hosting, Plausible or PostHog for analytics.

### 11. Do and don't
- Do: real product screens, real numbers with sources, plain words, one dramatic scroll moment.
- Don't: generic SaaS cards, gradient blobs, "Revolutionary web3 solution", coins/rockets/robots, emoji, fake testimonials, fake user counts, lecturing tone.

---

## Part B1. Paste-ready prompt, CHOSEN direction C "Calm finance app" (use this one)

```
Build a premium, production-quality marketing landing page for "Cooldown". Look and feel: a calm, mostly
white premium fintech site in the spirit of Mercury, Apple Wallet and Revolut Ultra. Lots of white space,
big confident type, real product screens in realistic iPhone frames. No photos, no illustrations of coins.

PRODUCT: Cooldown is a Solana smart account that protects savings and salary from memecoin and perp-trading
impulses. Every withdrawal waits a delay the user chose (default 72 hours) and can be cancelled any time.
A buddy gets notified. The user keeps their own keys. Tagline: "The urge passes. Your money stays."

AUDIENCE: crypto traders 20-35 who've lost money on memecoins and want rules they can't break; people trying
to quit; their partners. Tone: calm, direct, honest, slightly dry, never preachy.

COLOURS: background #FFFFFF and #F6F8FA, ink text #0B1220, secondary text #5B6474, hairlines #E6E9EE,
one calm accent deep blue #1F3B73 for buttons/links, ice blue #DCEBF7 for soft fills, loss red #E5484D used
ONLY for money lost. No gradients, no purple, no neon.
TYPE: one grotesk (General Sans or Inter Display). Headlines 64-88px desktop, tight tracking, sentence case.
Tabular numbers for money and timers. Fluid type with clamp().
SHAPE: 24-32px radius on large panels, pill buttons, soft long shadows only under phone mockups.

SECTIONS (100% width, content max-width 1200px):
1. Sticky nav, white with blur on scroll: logo, How it works, Mirror, Pricing, FAQ, pill "Join the waitlist".
2. Hero, centered: H1 "The urge passes. Your money stays." Sub: "Cooldown is a Solana account where every
   withdrawal waits the time you chose, 72 hours by default. Cancel any time. By the time the money can move,
   the memecoin is gone, and so is the urge." Email input + "Join the waitlist". Small: "Free for anyone
   quitting. You keep your keys." Below: one large realistic iPhone showing the withdrawal screen: "500 USDC",
   a circular countdown ring live-ticking from 71:59:59, "Maya was notified", button "Cancel withdrawal".
   Load animation: headline fades up, phone rises 32px, ring starts.
3. Proof strip: "49% of 6.7M pump.fun wallets lost 90% or more" and "Memecoins keep ~25¢ of every $1. Slots keep 3.5¢."
   Small source line: 2026 analysis, not peer-reviewed.
4. How it works, 3 numbered steps, each with its own phone screen that changes as you scroll (sticky phone on
   desktop, stacked on mobile): Choose your delay (slider 24h-30d) / Send savings and salary in (address + QR)
   / Every withdrawal waits (countdown + cancel). Note: "Stricter rules apply instantly. Looser rules wait the same delay."
5. Mirror: "How much have memecoins taken from you?" wallet input + "Show my Mirror". Show the SAMPLE result
   card: Put in $14,200, Took out $3,100, Gone -$11,100 (red), button "Lock what's left". Mock the data
   through one function getMirror(wallet) so a real API can replace it later.
6. Quotes: three real quotes in large serif italic with sources (r/solana Jul 2025, r/problemgambling Mar 2026, r/Daytrading Sep 2026).
7. Pricing: two plans side by side. Quit mode, Free forever: long delays, buddy alerts, full memecoin lockout
   1-12 months. Trader mode, $9/month: daily loss cap, trade limit, blue chips instant, new tokens wait.
8. Trust: "Your keys. Your money. Our only job is the wait." Non-custodial; enforced on Solana; we never ask for your seed phrase.
9. FAQ accordion: urgent money, new wallet loophole, can I still trade, what my buddy sees, is this treatment, is it live.
10. Final CTA on a soft ice-blue panel: "Set your rules while you're calm." + email form.
11. Footer: "In development. Not financial advice." Helplines UK 0808 8020 133, US 1-800-GAMBLER.

WAITLIST: email (required) + optional intent (Quitting / Trading with rules / Helping someone). Save to the
built-in database (table waitlist: email, intent, created_at), dedupe by email. Loading state, then
"You're #N on the list" + "Share on X". Inline error copy: "Enter a full email address, like name@example.com."

MOTION: one load sequence, the sticky phone in How it works, and action feedback (button press, focus, accordion).
Easing cubic-bezier(0.22,1,0.36,1). Respect prefers-reduced-motion.
RESPONSIVE: perfect at 390, 768, 1280, 1600. On phone: single column, sticky bottom "Join the waitlist" bar after the hero.
QUALITY BAR: looks like a $100k agency site. No generic SaaS card grids, no gradient blobs, no emoji, no fake testimonials or user counts.
SEO: title "Cooldown: a Solana account your impulses can't empty", meta description, OG tags, FAQPage schema.
```

## Part B2. Paste-ready prompt, direction A "3am to morning" (alternative)

```
Build a premium, production-quality marketing landing page for "Cooldown".

PRODUCT: Cooldown is a Solana smart account that protects people's savings and salary from memecoin and
perp-trading impulses. Every withdrawal waits a delay the user chose (default 72 hours) and can be cancelled
any time. A buddy gets notified. The user keeps their own keys. Tagline: "The urge passes. Your money stays."

AUDIENCE: crypto traders aged 20-35 who have lost money on memecoins and want rules they can't break, people
trying to quit, and their partners. Tone: calm, direct, honest, slightly dry; never preachy.

CONCEPT: the page is a journey from 3am to morning. It starts at night (#070B14 / #0F1E33) with a glowing
phone and a red loss chart (#FF4D2E). As the user scrolls, the background gradually lightens through dawn
to calm morning (#F6F8FA), and the red chart line cools into ice blue (#BDE3F2). That scroll transition is the
signature moment. Text ink on light sections: #0B1220.

TYPE: one modern grotesk (General Sans or Inter Display), tight tracking on big headlines, sentence case,
tabular numbers for money and timers. Fluid type with clamp().

SECTIONS (full-bleed, 100% width, content max-width 1280px):
1. Frosted sticky nav: logo, How it works, Mirror, FAQ, pill button "Join the waitlist".
2. Hero (night): H1 "The urge passes. Your money stays." Sub: "Cooldown is a Solana account where every
   withdrawal waits the time you chose, 72 hours by default. Cancel any time. By the time the money can move,
   the memecoin is gone, and so is the urge." Email input + "Join the waitlist". Small: "Free for anyone
   quitting. You keep your keys." Right side: realistic iPhone mockup showing a withdrawal screen: "500 USDC",
   a circular countdown ring that live-ticks from 71:59:59, "Maya was notified", button "Cancel withdrawal".
   Load animation: headline words stagger in, phone rises, timer starts.
3. Problem (night): huge "49%" + "of 6.7M pump.fun wallets lost 90% or more of everything they put in."
   + "Memecoins keep about 25¢ of every $1. A slot machine keeps 3.5¢." A red line chart draws on scroll.
4. The turn (dawn): "Willpower loses at 3am. A 72-hour wait doesn't." Background lightens, chart turns blue.
5. How it works (morning), 3 numbered steps each with a phone screenshot: Choose your delay / Send savings
   and salary in / Every withdrawal waits. Note: "Stricter rules apply instantly. Looser rules wait the same delay."
6. Mirror: "How much have memecoins taken from you?" wallet address input + "Show my Mirror"; sample result
   card: Put in $14,200, Took out $3,100, Gone -$11,100 (big, red), button "Lock what's left".
7. Three real quotes in large serif italic with source lines (r/solana Jul 2025, r/problemgambling Mar 2026,
   r/Daytrading Sep 2026), slow marquee on desktop, swipe on mobile.
8. Two modes with a toggle: Quit mode (free forever) vs Trader mode ($9/month); the toggle swaps the phone screen.
9. Trust: "Your keys. Your money. Our only job is the wait." 3 points: non-custodial, enforced on Solana, we never ask for your seed phrase.
10. FAQ accordion: urgent money, new wallet loophole, can I still trade, what my buddy sees, is this treatment, is it live.
11. Final CTA on a calm morning photo: "Set your rules while you're calm." + email form.
12. Footer: "In development. Not financial advice." Helplines UK 0808 8020 133, US 1-800-GAMBLER.

WAITLIST: email + optional intent (Quitting / Trading with rules / Helping someone). Loading state, then
success "You're #N on the list" + "Share on X" button. Inline error copy. Save to Supabase table waitlist.

MOTION: Framer Motion, easing cubic-bezier(0.22,1,0.36,1); one load sequence, one scroll story; otherwise
still. Respect prefers-reduced-motion. Lenis smooth scroll on desktop.

RESPONSIVE: perfect at 390px, 768px, 1280px, 1600px. On phone single column, mockup below headline, sticky
bottom "Join the waitlist" bar after the hero. Touch targets ≥44px.

QUALITY BAR: looks like a $100k agency site (references: Linear, Arc, Mercury, Apple product pages). No
generic SaaS card grids, no gradient blobs, no crypto coins/rockets/robots, no emoji, no fake testimonials.

TECH: Next.js App Router, TypeScript, Tailwind, Framer Motion, accessible semantic HTML, SEO meta + OG tags.
```

---

## Part C. Image prompts (Midjourney / Higgsfield / Ideogram / Flux)

1. **Hero, night:** "Cinematic photo, young man lying in bed in a dark room at 3am, face lit only by a phone screen glow, cold blue ambient light, a faint red reflection on his face, shallow depth of field, 35mm, moody, quiet, realistic, no text, 16:9"
2. **The turn, dawn:** "Same bedroom at dawn, phone face-down on the bedside table, first blue light through the curtains, calm, still, realistic photography, soft grain, no people, 16:9"
3. **Final CTA, morning:** "Bright calm morning, person drinking coffee by a window, phone resting on the table screen-off, soft daylight, minimal Scandinavian interior, hopeful, realistic, 16:9"
4. **OG image:** "Split composition, left half deep night blue with a glowing red falling chart line, right half soft morning light with the same line turning ice blue, minimal, no text, 1200x630"
5. **App screens:** design these in Figma or have the UI AI generate them: Withdrawal countdown, Delay picker (24h–30d slider), Deposit address with QR, Buddy settings, Mirror result share card.
