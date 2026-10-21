import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { ThreeCanvas } from './components/ThreeCanvas';
import { FilmGrain } from './components/FilmGrain';
import { HUDNavbar } from './components/HUDNavbar';
import { HeroSection } from './components/HeroSection';
import { InfiniteMarquee } from './components/InfiniteMarquee';
import { SnellenbergWork } from './components/SnellenbergWork';
import { SoftwareNexus } from './components/SoftwareNexus';
import { PlayableArcade } from './components/PlayableArcade';
import { AICinemaStudio } from './components/AICinemaStudio';
import { DigitalPublishing } from './components/DigitalPublishing';
import { CareerOdyssey } from './components/CareerOdyssey';
import { DennisFooter } from './components/DennisFooter';
import { CyberTerminal } from './components/CyberTerminal';

export function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('hero');
  };

  return (
    <div className="relative min-h-screen bg-[#07080b] text-zinc-100 selection:bg-cyan-400 selection:text-black overflow-x-hidden font-sans">
      {/* 1. Three.js Interactive 3D WebGL Quantum Core (Lusion Caliber with pointerEvents none) */}
      <ThreeCanvas />

      {/* 2. Cinematic Film Grain Texture */}
      <FilmGrain />

      {/* 3. Top Cyber HUD Navigation */}
      <HUDNavbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* 4. Main Content Journey */}
      <main className="relative z-10">
        <HeroSection
          onScrollTo={handleNavigate}
          onOpenTerminal={() => setTerminalOpen(true)}
        />

        {/* Dennis Snellenberg Infinite Marquee Ticker */}
        <InfiniteMarquee />

        {/* Dennis Snellenberg Signature Selected Works Showcase with Floating Preview */}
        <SnellenbergWork />

        {/* Deep Software Architecture Spotlight (NOORHUB SaaS) */}
        <SoftwareNexus />

        {/* In-Page Playable Retro Arcade Station (Henry Heffernan Caliber) */}
        <PlayableArcade />

        {/* AI Cinema Virtual IMAX Theater (ICON 2030) */}
        <AICinemaStudio />

        {/* Digital Web Magazine & Open Source Tools */}
        <DigitalPublishing />

        {/* Academic & Verified Milestones Timeline */}
        <CareerOdyssey />
      </main>

      {/* 5. Dennis Snellenberg Signature Giant Footer */}
      <DennisFooter
        onScrollToTop={handleScrollToTop}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* 6. Interactive CLI Terminal */}
      <CyberTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </div>
  );
}

export default App;
