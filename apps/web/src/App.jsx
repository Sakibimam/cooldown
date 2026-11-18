"use client";

import { useEffect } from "react";
import "@/App.css";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { Navbar } from "@/components/Navbar";
import { StickyJoinBar } from "@/components/StickyJoinBar";
import { Hero } from "@/sections/Hero";
import { Problem } from "@/sections/Problem";
import { TheTurn } from "@/sections/TheTurn";
import { HowItWorks } from "@/sections/HowItWorks";
import { Mirror } from "@/sections/Mirror";
import { Voices } from "@/sections/Voices";
import { TwoModes } from "@/sections/TwoModes";
import { Trust } from "@/sections/Trust";
import { FAQ } from "@/sections/FAQ";
import { FinalCTA } from "@/sections/FinalCTA";
import { Footer } from "@/sections/Footer";

function App() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (reduced || !isDesktop) return;
    const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 3) });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App" data-testid="cooldown-app">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <TheTurn />
        <HowItWorks />
        <Mirror />
        <Voices />
        <TwoModes />
        <Trust />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyJoinBar />
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
