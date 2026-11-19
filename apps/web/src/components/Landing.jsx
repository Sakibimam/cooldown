"use client";

import { Fragment, useEffect, useMemo, useState } from "react";

const TOTAL = 72 * 3600;
const pad = (n) => String(n).padStart(2, "0");

const STEPS = [
  { title: "Choose your delay", body: "Pick anything from 24 hours to 30 days. You can make it longer later in one tap." },
  { title: "Send your savings and salary in", body: "Your Cooldown address works like an account number. Give it to your employer or client." },
  { title: "Withdrawals wait", body: "Request money when you want it. You get it after your delay, and you can cancel before then." },
];
const SCREEN_LABELS = ["Choosing a 72 hour delay", "Your Cooldown deposit address", "A withdrawal you can still cancel"];

function buildTicks() {
  const ticks = [];
  for (let i = 0; i < 120; i++) {
    const a = (i / 120) * Math.PI * 2 - Math.PI / 2;
    const major = i % 10 === 0;
    const r1 = 500, r2 = major ? 470 : 486;
    const f = (n) => Math.round(n * 100) / 100;
    ticks.push({
      x1: f(520 + r1 * Math.cos(a)), y1: f(520 + r1 * Math.sin(a)),
      x2: f(520 + r2 * Math.cos(a)), y2: f(520 + r2 * Math.sin(a)),
      c: i < 30 ? "#1D3A70" : major ? "#C9D1DC" : "#E1E6EC",
      sw: major ? 2 : 1.2,
    });
  }
  return ticks;
}

function buildQr() {
  const qr = [];
  let seed = 7;
  for (let y = 0; y < 17; y++) {
    for (let x = 0; x < 17; x++) {
      seed = (seed * 9301 + 49297) % 233280;
      const finder = (x < 5 && y < 5) || (x > 11 && y < 5) || (x < 5 && y > 11);
      const ring = finder && ((x % 12 === 0 || x % 12 === 4 || y % 12 === 0 || y % 12 === 4) || (x % 12 === 2 && y % 12 === 2));
      const on = finder ? ring : seed / 233280 > 0.52;
      qr.push({ c: on ? "#0A1222" : "transparent" });
    }
  }
  return qr;
}

export default function Landing() {
  const [left, setLeft] = useState(TOTAL - 1);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [joinError, setJoinError] = useState("");
  const [wallet, setWallet] = useState("");
  const [mirrorAsked, setMirrorAsked] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : TOTAL - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const ticks = useMemo(buildTicks, []);
  const qr = useMemo(buildQr, []);
  const clock = pad(Math.floor(left / 3600)) + ":" + pad(Math.floor((left % 3600) / 60)) + ":" + pad(left % 60);
  const ringOffset = Math.round(540.35 * (1 - left / TOTAL) * 100) / 100;
  const notJoined = !joined;
  const show0 = step === 0, show1 = step === 1, show2 = step === 2;
  const screenLabel = SCREEN_LABELS[step];
  const steps = STEPS.map((d, i) => ({
    n: i + 1, title: d.title, body: d.body,
    pressed: i === step ? "true" : "false",
    bg: i === step ? "#F6F8FA" : "transparent",
    dotBg: i === step ? "#0A1222" : "#EEF1F5",
    dotFg: i === step ? "#FFFFFF" : "#5A6475",
    titleColor: i === step ? "#0A1222" : "#3B4556",
    pick: () => setStep(i),
  }));

  const onEmail = (e) => setEmail(e.target.value);
  const onWallet = (e) => setWallet(e.target.value);
  const submit = async (e) => {
    e.preventDefault();
    setJoinError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, referrer: window.location.href }),
      });
      const data = await res.json();
      if (data.ok) setJoined(true);
      else setJoinError(data.error || "We couldn't save your email. Try again.");
    } catch {
      setJoinError("We couldn't reach the waitlist. Check your connection and try again.");
    }
  };
  const mirrorSubmit = (e) => {
    e.preventDefault();
    setMirrorAsked(true);
    fetch("/api/mirror", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ wallet }) }).catch(() => {});
  };

  return (
<div className="cd">

<header className="nav">
<div className="w navin">
<a href="#top" aria-label="Cooldown home" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#0A1222' }}>
<svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"><circle cx="13" cy="13" r="11.5" fill="none" stroke="#0A1222" strokeWidth="2"></circle><path d="M13 13 L13 5.5 A7.5 7.5 0 0 1 19.5 9.2 Z" fill="#1D3A70"></path></svg>
<span style={{ fontWeight: '600', fontSize: '19px', letterSpacing: '-.025em' }}>Cooldown</span>
</a>
<nav className="links" aria-label="Main">
<a className="hide" href="#how">How it works</a>
<a className="hide" href="#mirror">Mirror</a>
<a className="hide" href="#pricing">Pricing</a>
<a className="hide" href="#faq">FAQ</a>
<a className="pill" href="#join">Join the waitlist</a>
</nav>
</div>
</header>

<main id="top">

<section className="hero">
<div className="w">
<h1 className="h1"><span>Put 72 hours between you</span><span>and your next bad trade.</span></h1>
<p className="sub">Cooldown keeps your savings in a Solana account you control. You pick a delay, and each withdrawal you request waits that long. You can cancel it until then.</p>
{notJoined && (<>
<form className="form" onSubmit={submit} aria-label="Join the waitlist">
<label htmlFor="e1" className="sr">Email address</label>
<input id="e1" type="email" required placeholder="you@email.com" value={email} onChange={onEmail} />
<button className="go" type="submit">Join the waitlist</button>
</form>
{joinError && <p role="alert" style={{ margin: "12px auto 0", maxWidth: "460px", fontSize: "14px", color: "#C93636" }}>{joinError}</p>}
</>)}
{joined && (<>
<p role="status" className="enter" style={{ margin: '36px auto 0', maxWidth: '460px', fontSize: '16px', fontWeight: '500', background: '#E3EEF9', color: '#1D3A70', borderRadius: '999px', padding: '16px 24px' }}>You're on the list. We'll write to {email}.</p>
</>)}
<p className="fine">Quit mode costs nothing, and you keep your own keys.</p>
</div>

<div className="stage">
<svg className="dial" viewBox="0 0 1040 1040" aria-hidden="true">
<circle cx="520" cy="520" r="500" fill="none" stroke="#EEF1F5" strokeWidth="1"></circle>
<circle cx="520" cy="520" r="380" fill="none" stroke="#F1F4F8" strokeWidth="1"></circle>
{ticks.map((t, i) => (<Fragment key={i}>
<line x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={t.c} strokeWidth={t.sw} strokeLinecap="round"></line>
</Fragment>))}
</svg>
<div className="phonewrap">
<div className="phone" role="img" aria-label="Cooldown app: a 500 USDC withdrawal waiting, unlocking in 72 hours">
<div className="scr">
<div className="island"></div>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<span style={{ fontSize: '13px', color: '#5A6475', fontWeight: '500' }}>Savings</span>
<span style={{ fontSize: '12px', fontWeight: '600', color: '#1D3A70', background: '#E3EEF9', padding: '5px 10px', borderRadius: '999px' }}>72h delay</span>
</div>
<span className="num" style={{ fontSize: '34px', fontWeight: '600', letterSpacing: '-.035em', marginTop: '4px' }}>$8,420.00</span>
<div style={{ marginTop: '18px', borderRadius: '26px', background: '#F6F8FA', padding: '20px 18px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
<span style={{ fontSize: '13px', fontWeight: '600', alignSelf: 'flex-start' }}>Withdrawal requested</span>
<div style={{ position: 'relative', width: '200px', height: '200px', marginTop: '8px' }}>
<svg width="200" height="200" viewBox="0 0 200 200" aria-hidden="true">
<circle cx="100" cy="100" r="86" fill="none" stroke="#E4E8EE" strokeWidth="10"></circle>
<circle cx="100" cy="100" r="86" fill="none" stroke="#1D3A70" strokeWidth="10" strokeLinecap="round" strokeDasharray="540.35" strokeDashoffset={ringOffset} transform="rotate(-90 100 100)"></circle>
</svg>
<div style={{ position: 'absolute', inset: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
<span style={{ fontSize: '12px', color: '#5A6475' }}>Unlocks in</span>
<span className="num" style={{ fontSize: '31px', fontWeight: '600', letterSpacing: '-.03em' }}>{clock}</span>
</div>
</div>
<div style={{ alignSelf: 'stretch', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
<span className="num" style={{ fontSize: '20px', fontWeight: '600', letterSpacing: '-.02em' }}>500 USDC</span>
<span style={{ fontSize: '12.5px', color: '#5A6475' }}>to 7xKp…9fQe</span>
</div>
</div>
<div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '14px', padding: '0 2px' }}>
<span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#0A1222', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600' }}>M</span>
<span style={{ fontSize: '13px', color: '#3B4556' }}>Maya was notified</span>
</div>
<span style={{ marginTop: 'auto', height: '50px', borderRadius: '999px', background: '#0A1222', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '15px' }}>Cancel withdrawal</span>
</div>
</div>
</div>
</div>
</section>

<section className="sec" style={{ background: '#F6F8FA', paddingTop: '120px' }}>
<div className="w split">
<div>
<h2 className="h2">Pump.fun keeps more of each dollar than a slot machine.</h2>
<p className="lead">An independent analyst studied 44 million pump.fun trades from 6.7 million wallets in 2026. Half of those wallets lost 90% or more of what they put in.</p>
<p style={{ fontSize: '13.5px', color: '#7C8594', margin: '28px 0 0' }}>Independent analysis, August to September 2026. Not peer-reviewed.</p>
</div>
<div style={{ background: '#FFFFFF', borderRadius: '32px', padding: '44px', border: '1px solid #E4E8EE' }}>
<p style={{ margin: '0 0 30px', fontSize: '15px', fontWeight: '600', color: '#3B4556' }}>What the platform keeps from each $1</p>
<div className="bars">
<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><span style={{ fontSize: '16px', fontWeight: '500' }}>Pump.fun memecoins</span><span className="num" style={{ fontSize: '30px', fontWeight: '600', letterSpacing: '-.03em', color: '#C93636' }}>25¢</span></div>
<div className="bar"><i style={{ width: '100%', background: '#C93636' }}></i></div>
</div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><span style={{ fontSize: '16px', fontWeight: '500' }}>Slot machine</span><span className="num" style={{ fontSize: '30px', fontWeight: '600', letterSpacing: '-.03em' }}>3.5¢</span></div>
<div className="bar"><i style={{ width: '14%', background: '#0A1222' }}></i></div>
</div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><span style={{ fontSize: '16px', fontWeight: '500' }}>Polymarket</span><span className="num" style={{ fontSize: '30px', fontWeight: '600', letterSpacing: '-.03em' }}>1.5¢</span></div>
<div className="bar"><i style={{ width: '6%', background: '#0A1222' }}></i></div>
</div>
</div>
</div>
</div>
</section>

<section id="how" className="sec">
<div className="w">
<h2 className="h2">You set the rules once. Solana enforces them on each withdrawal.</h2>
<div className="steps">
<ol style={{ listStyle: 'none', padding: '0', margin: '0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
{steps.map((s, i) => (<Fragment key={i}>
<li>
<button className="tab" type="button" onClick={s.pick} aria-pressed={s.pressed} style={{ background: s.bg }}>
<span style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
<span className="num" style={{ flex: 'none', width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '600', background: s.dotBg, color: s.dotFg }}>{s.n}</span>
<span style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
<span style={{ fontSize: '24px', fontWeight: '600', letterSpacing: '-.025em', color: s.titleColor }}>{s.title}</span>
<span style={{ fontSize: '16.5px', lineHeight: '1.6', color: '#5A6475' }}>{s.body}</span>
</span>
</span>
</button>
</li>
</Fragment>))}
</ol>

<div className="phone" style={{ width: '330px', height: '676px' }} role="img" aria-label={screenLabel}>
<div className="scr">
<div className="island"></div>

{show0 && (<>
<div className="enter" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
<span style={{ fontSize: '13px', color: '#5A6475', fontWeight: '500' }}>Your rule</span>
<span style={{ fontSize: '26px', fontWeight: '600', letterSpacing: '-.03em', marginTop: '6px', lineHeight: '1.15' }}>Every withdrawal waits</span>
<span className="num" style={{ fontSize: '76px', fontWeight: '600', letterSpacing: '-.05em', marginTop: '26px', lineHeight: '1' }}>72<span style={{ fontSize: '28px', letterSpacing: '-.02em', color: '#5A6475' }}> hours</span></span>
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '6px', marginTop: '28px', background: '#F3F5F8', borderRadius: '999px', padding: '5px' }}>
<span style={{ textAlign: 'center', fontSize: '13px', fontWeight: '500', color: '#5A6475', padding: '9px 0' }}>24h</span>
<span style={{ textAlign: 'center', fontSize: '13px', fontWeight: '600', background: '#FFFFFF', borderRadius: '999px', padding: '9px 0', boxShadow: '0 1px 3px rgba(10,18,34,.12)' }}>72h</span>
<span style={{ textAlign: 'center', fontSize: '13px', fontWeight: '500', color: '#5A6475', padding: '9px 0' }}>7d</span>
<span style={{ textAlign: 'center', fontSize: '13px', fontWeight: '500', color: '#5A6475', padding: '9px 0' }}>30d</span>
</div>
<div style={{ marginTop: '22px', borderRadius: '20px', background: '#F6F8FA', padding: '16px', fontSize: '13px', lineHeight: '1.5', color: '#3B4556' }}>Stricter takes effect now. Looser waits 72 hours, like a withdrawal.</div>
<span style={{ marginTop: 'auto', height: '50px', borderRadius: '999px', background: '#0A1222', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '15px' }}>Save rule</span>
</div>
</>)}

{show1 && (<>
<div className="enter" style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', textAlign: 'center' }}>
<span style={{ fontSize: '13px', color: '#5A6475', fontWeight: '500', alignSelf: 'flex-start' }}>Deposit</span>
<span style={{ fontSize: '26px', fontWeight: '600', letterSpacing: '-.03em', marginTop: '6px', lineHeight: '1.15', alignSelf: 'flex-start', textAlign: 'left' }}>Point your salary here</span>
<div style={{ marginTop: '26px', padding: '14px', borderRadius: '24px', border: '1px solid #E4E8EE' }}>
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(17,7px)', gap: '2px' }}>
{qr.map((q, i) => (<Fragment key={i}>
<span style={{ width: '7px', height: '7px', borderRadius: '1.5px', background: q.c }}></span>
</Fragment>))}
</div>
</div>
<span className="num" style={{ marginTop: '20px', fontSize: '14px', fontWeight: '500', letterSpacing: '.01em' }}>CDwn 7Hq2 …… x9Rf 4kLm</span>
<span style={{ marginTop: '6px', fontSize: '12.5px', color: '#5A6475' }}>USDC and SOL on Solana</span>
<span style={{ marginTop: 'auto', alignSelf: 'stretch', height: '50px', borderRadius: '999px', background: '#0A1222', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '15px' }}>Copy address</span>
</div>
</>)}

{show2 && (<>
<div className="enter" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
<span style={{ fontSize: '13px', color: '#5A6475', fontWeight: '500' }}>Withdraw</span>
<span style={{ fontSize: '26px', fontWeight: '600', letterSpacing: '-.03em', marginTop: '6px', lineHeight: '1.15' }}>Requested. Unlocks Friday, 9:41 pm.</span>
<div style={{ marginTop: '24px', borderRadius: '22px', border: '1px solid #E4E8EE', overflow: 'hidden' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', fontSize: '13.5px', borderBottom: '1px solid #EEF1F5' }}><span style={{ color: '#5A6475' }}>Amount</span><span className="num" style={{ fontWeight: '600' }}>500 USDC</span></div>
<div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', fontSize: '13.5px', borderBottom: '1px solid #EEF1F5' }}><span style={{ color: '#5A6475' }}>To</span><span style={{ fontWeight: '600' }}>New address</span></div>
<div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', fontSize: '13.5px' }}><span style={{ color: '#5A6475' }}>Buddy</span><span style={{ fontWeight: '600' }}>Maya, notified</span></div>
</div>
<div style={{ marginTop: '18px', display: 'flex', alignItems: 'center', gap: '12px', background: '#E3EEF9', borderRadius: '18px', padding: '14px 16px' }}>
<span className="num" style={{ fontSize: '22px', fontWeight: '600', letterSpacing: '-.03em', color: '#1D3A70' }}>{clock}</span>
<span style={{ fontSize: '12.5px', color: '#1D3A70', lineHeight: '1.35' }}>left to change your mind</span>
</div>
<span style={{ marginTop: 'auto', height: '50px', borderRadius: '999px', border: '1.5px solid #0A1222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '15px' }}>Cancel withdrawal</span>
</div>
</>)}
</div>
</div>
</div>
</div>
</section>

<section id="mirror" className="sec" style={{ background: '#F6F8FA' }}>
<div className="w mirror">
<div>
<h2 className="h2">See what memecoins have cost you.</h2>
<p className="lead">Paste a Solana wallet address. Mirror totals the money that went into memecoins and perps and the money that came back. You don't connect a wallet or sign anything.</p>
<form className="form" style={{ margin: '34px 0 0', opacity: '1', animation: 'none', background: '#FFFFFF' }} onSubmit={mirrorSubmit} aria-label="Check a wallet with Mirror">
<label htmlFor="wal" className="sr">Solana wallet address</label>
<input id="wal" type="text" placeholder="Paste a wallet address" value={wallet} onChange={onWallet} />
<button className="go" type="submit">Show my Mirror</button>
</form>
{mirrorAsked && (<>
<p role="status" className="enter" style={{ margin: '14px 0 0 6px', fontSize: '14.5px', color: '#3B4556' }}>Mirror opens with the first beta. This is a sample wallet.</p>
</>)}
</div>
<div className="receipt" aria-label="Sample Mirror result">
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<span style={{ fontSize: '15px', fontWeight: '600' }}>Mirror</span>
<span style={{ fontSize: '13px', color: '#7C8594' }}>Sample wallet, last 12 months</span>
</div>
<div style={{ marginTop: '18px' }}>
<div className="row"><span style={{ color: '#5A6475' }}>Put into memecoins and perps</span><span className="num" style={{ fontWeight: '600' }}>$14,200</span></div>
<div className="row"><span style={{ color: '#5A6475' }}>Taken back out</span><span className="num" style={{ fontWeight: '600' }}>$3,100</span></div>
<div className="row" style={{ borderBottom: '0' }}><span style={{ color: '#5A6475' }}>Trades</span><span className="num" style={{ fontWeight: '600' }}>1,284</span></div>
</div>
<div style={{ marginTop: '14px', borderRadius: '22px', background: '#FBEDED', padding: '26px 24px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
<span style={{ fontSize: '14px', color: '#8E2A2A', fontWeight: '500' }}>Gone</span>
<span className="num" style={{ fontSize: 'clamp(48px,5vw,68px)', fontWeight: '600', letterSpacing: '-.045em', lineHeight: '1', color: '#C93636' }}>−$11,100</span>
</div>
<a href="#join" className="pill" style={{ height: '54px', width: '100%', marginTop: '18px', fontSize: '16px' }}>Lock what's left</a>
</div>
</div>
</section>

<section className="sec">
<div className="w">
<figure style={{ margin: '0', maxWidth: '980px' }}>
<blockquote className="quote" style={{ fontSize: 'clamp(34px,4.6vw,64px)' }}>“I still just throw my money at pump.fun, hate myself, get paid, repeat.”</blockquote>
<figcaption style={{ marginTop: '24px', fontSize: '15px', color: '#5A6475' }}>A trader on r/solana, July 2025</figcaption>
</figure>
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: '56px', marginTop: '88px', paddingTop: '56px', borderTop: '1px solid #E4E8EE' }}>
<figure style={{ margin: '0' }}>
<blockquote className="quote" style={{ fontSize: '30px' }}>“Need app to block cryptocasinos, will pay 500€ usdt.”</blockquote>
<figcaption style={{ marginTop: '16px', fontSize: '14.5px', color: '#5A6475' }}>r/problemgambling, March 2026</figcaption>
</figure>
<figure style={{ margin: '0' }}>
<blockquote className="quote" style={{ fontSize: '30px' }}>“Tools that can actually stop you from breaking your trading rules. Hard-enforce, not warnings.”</blockquote>
<figcaption style={{ marginTop: '16px', fontSize: '14.5px', color: '#5A6475' }}>r/Daytrading, September 2026</figcaption>
</figure>
</div>
</div>
</section>

<section id="pricing" className="sec" style={{ paddingTop: '0' }}>
<div className="w">
<h2 className="h2">Quit for free, or trade with limits for $9 a month.</h2>
<div className="plans">
<div className="plan" style={{ background: '#0A1222', color: '#FFFFFF' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px', flexWrap: 'wrap' }}>
<span style={{ fontSize: '26px', fontWeight: '600', letterSpacing: '-.025em' }}>Quit mode</span>
<span style={{ fontSize: '15px', color: '#A9B3C4' }}>For stepping away</span>
</div>
<span className="num" style={{ fontSize: '64px', fontWeight: '600', letterSpacing: '-.045em', lineHeight: '1' }}>$0<span style={{ fontSize: '18px', letterSpacing: '0', color: '#A9B3C4', fontWeight: '500' }}> forever</span></span>
<ul>
<li><svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" style={{ flex: 'none', marginTop: '2px' }}><path d="M4 10.5l3.8 3.8L16 6" fill="none" stroke="#8FB2E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg><span>Delays from 24 hours to 30 days</span></li>
<li><svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" style={{ flex: 'none', marginTop: '2px' }}><path d="M4 10.5l3.8 3.8L16 6" fill="none" stroke="#8FB2E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg><span>A buddy who hears about every withdrawal</span></li>
<li><svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" style={{ flex: 'none', marginTop: '2px' }}><path d="M4 10.5l3.8 3.8L16 6" fill="none" stroke="#8FB2E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg><span>Full lockout from memecoins and perps, 1 to 12 months</span></li>
</ul>
<a href="#join" className="pill" style={{ marginTop: 'auto', height: '54px', background: '#FFFFFF', color: '#0A1222 !important', fontSize: '16px' }}>Join the waitlist</a>
</div>
<div className="plan" style={{ background: '#FFFFFF', border: '1px solid #E4E8EE' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px', flexWrap: 'wrap' }}>
<span style={{ fontSize: '26px', fontWeight: '600', letterSpacing: '-.025em' }}>Trader mode</span>
<span style={{ fontSize: '15px', color: '#5A6475' }}>For trading with rules</span>
</div>
<span className="num" style={{ fontSize: '64px', fontWeight: '600', letterSpacing: '-.045em', lineHeight: '1' }}>$9<span style={{ fontSize: '18px', letterSpacing: '0', color: '#5A6475', fontWeight: '500' }}> a month</span></span>
<ul>
<li><svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" style={{ flex: 'none', marginTop: '2px' }}><path d="M4 10.5l3.8 3.8L16 6" fill="none" stroke="#1D3A70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg><span>A daily loss cap the chain enforces</span></li>
<li><svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" style={{ flex: 'none', marginTop: '2px' }}><path d="M4 10.5l3.8 3.8L16 6" fill="none" stroke="#1D3A70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg><span>A limit on trades per day</span></li>
<li><svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" style={{ flex: 'none', marginTop: '2px' }}><path d="M4 10.5l3.8 3.8L16 6" fill="none" stroke="#1D3A70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg><span>SOL, BTC and USDC instant; new tokens wait</span></li>
</ul>
<a href="#join" className="pill" style={{ marginTop: 'auto', height: '54px', fontSize: '16px' }}>Join the waitlist</a>
</div>
</div>
</div>
</section>

<section className="sec" style={{ background: '#F6F8FA' }}>
<div className="w split" style={{ alignItems: 'start' }}>
<h2 className="h2">Cooldown can't touch your money.</h2>
<div style={{ display: 'flex', flexDirection: 'column', gap: '34px' }}>
<div style={{ display: 'flex', gap: '18px' }}><span style={{ flex: 'none', width: '44px', height: '44px', borderRadius: '14px', background: '#FFFFFF', border: '1px solid #E4E8EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="15" r="4" fill="none" stroke="#1D3A70" strokeWidth="2"></circle><path d="M11 12l8-8M16 7l3 3" fill="none" stroke="#1D3A70" strokeWidth="2" strokeLinecap="round"></path></svg></span><div><p style={{ margin: '0', fontSize: '19px', fontWeight: '600', letterSpacing: '-.01em' }}>You hold the keys</p><p style={{ margin: '6px 0 0', fontSize: '16.5px', lineHeight: '1.6', color: '#5A6475' }}>Your own wallet controls the account, a Squads smart account on Solana. We hold none of your funds.</p></div></div>
<div style={{ display: 'flex', gap: '18px' }}><span style={{ flex: 'none', width: '44px', height: '44px', borderRadius: '14px', background: '#FFFFFF', border: '1px solid #E4E8EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="#1D3A70" strokeWidth="2"></circle><path d="M12 7.5V12l3 2" fill="none" stroke="#1D3A70" strokeWidth="2" strokeLinecap="round"></path></svg></span><div><p style={{ margin: '0', fontSize: '19px', fontWeight: '600', letterSpacing: '-.01em' }}>Solana runs the clock</p><p style={{ margin: '6px 0 0', fontSize: '16.5px', lineHeight: '1.6', color: '#5A6475' }}>Solana enforces the delay. If we shut down tomorrow, your rules and your money stay where they are.</p></div></div>
<div style={{ display: 'flex', gap: '18px' }}><span style={{ flex: 'none', width: '44px', height: '44px', borderRadius: '14px', background: '#FFFFFF', border: '1px solid #E4E8EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" fill="none" stroke="#1D3A70" strokeWidth="2" strokeLinejoin="round"></path></svg></span><div><p style={{ margin: '0', fontSize: '19px', fontWeight: '600', letterSpacing: '-.01em' }}>We won't ask for your seed phrase</p><p style={{ margin: '6px 0 0', fontSize: '16.5px', lineHeight: '1.6', color: '#5A6475' }}>If someone asks for it in our name, they're running a scam.</p></div></div>
</div>
</div>
</section>

<section id="faq" className="sec">
<div className="w faq">
<div>
<h2 className="h2">Before you join</h2>
<p className="lead" style={{ fontSize: '17px' }}>Message the founder on X or Telegram with anything else.</p>
</div>
<div>
<details>
<summary>What if I need money urgently?<svg className="chev" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 7.5l5 5 5-5" fill="none" stroke="#0A1222" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></summary>
<p>Keep emergency cash in your normal wallet. The shortest delay you can pick is 24 hours.</p>
</details>
<details>
<summary>Can't I just open a new wallet?<svg className="chev" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 7.5l5 5 5-5" fill="none" stroke="#0A1222" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></summary>
<p>Yes. Cooldown protects the money inside it, so send your salary there and any new wallet you open starts empty.</p>
</details>
<details>
<summary>Can I still trade?<svg className="chev" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 7.5l5 5 5-5" fill="none" stroke="#0A1222" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></summary>
<p>Yes. In Trader mode you can buy SOL, BTC and USDC straight away, and new tokens and perps wait behind your rules.</p>
</details>
<details>
<summary>What does my buddy see?<svg className="chev" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 7.5l5 5 5-5" fill="none" stroke="#0A1222" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></summary>
<p>Your buddy gets a Telegram message with the amount and the unlock time when you request a withdrawal. They can't move your money or see your balance.</p>
</details>
<details>
<summary>Is this a treatment for gambling?<svg className="chev" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 7.5l5 5 5-5" fill="none" stroke="#0A1222" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></summary>
<p>No. Cooldown slows down withdrawals. If trading or gambling is hurting you, call the National Gambling Helpline on 0808 8020 133 in the UK or 1-800-GAMBLER in the US.</p>
</details>
<details>
<summary>Is it live?<svg className="chev" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 7.5l5 5 5-5" fill="none" stroke="#0A1222" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></summary>
<p>Not yet. The founder will set up the first 100 people on the waitlist one at a time, with deposit limits during the beta.</p>
</details>
</div>
</div>
</section>

<section id="join" style={{ padding: '0 0 120px' }}>
<div className="w">
<div className="cta">
<h2 className="h2" style={{ margin: '0 auto', maxWidth: '13em', color: '#0A1222' }}>Set your rules while you're calm.</h2>
<p className="lead" style={{ margin: '22px auto 0', color: '#3B4556' }}>The founder sets up the first 100 accounts by hand. Quit mode stays free.</p>
{notJoined && (<>
<form className="form" style={{ opacity: '1', animation: 'none', background: '#FFFFFF', borderColor: '#C9DAF0' }} onSubmit={submit} aria-label="Join the waitlist">
<label htmlFor="e2" className="sr">Email address</label>
<input id="e2" type="email" required placeholder="you@email.com" value={email} onChange={onEmail} />
<button className="go" type="submit">Join the waitlist</button>
</form>
{joinError && <p role="alert" style={{ margin: "12px auto 0", maxWidth: "460px", fontSize: "14px", color: "#C93636" }}>{joinError}</p>}
</>)}
{joined && (<>
<p role="status" className="enter" style={{ margin: '36px auto 0', maxWidth: '460px', fontSize: '16px', fontWeight: '500', background: '#FFFFFF', color: '#1D3A70', borderRadius: '999px', padding: '16px 24px' }}>You're on the list. We'll write to {email}.</p>
</>)}
</div>
</div>
</section>
</main>

<footer style={{ borderTop: '1px solid #EEF1F5' }}>
<div className="w" style={{ paddingTop: '36px', paddingBottom: '48px', display: 'flex', flexWrap: 'wrap', gap: '16px 40px', justifyContent: 'space-between', fontSize: '14px', color: '#5A6475' }}>
<span>Cooldown is in development. Not financial advice.</span>
<span>Struggling right now? UK 0808 8020 133. US 1-800-GAMBLER.</span>
</div>
</footer>
</div>
  );
}
