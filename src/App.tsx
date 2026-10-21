import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { HUDNavbar } from './components/HUDNavbar';
import { HeroSection } from './components/HeroSection';
import { BrunoCityWorld } from './components/BrunoCityWorld';
import { InfiniteMarquee } from './components/InfiniteMarquee';
import { SnellenbergWork } from './components/SnellenbergWork';
import { SoftwareNexus } from './components/SoftwareNexus';
import { PlayableArcade } from './components/PlayableArcade';
import { AICinemaStudio } from './components/AICinemaStudio';
import { DigitalPublishing } from './components/DigitalPublishing';
import { CareerOdyssey } from './components/CareerOdyssey';
import { DennisFooter } from './components/DennisFooter';
import { CyberTerminal } from './components/CyberTerminal';
import { BrunoWorld } from './components/BrunoWorld';

export function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [brunoWorldOpen, setBrunoWorldOpen] = useState(false);

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
    <div className="relative min-h-screen bg-[#EADECA] text-stone-900 selection:bg-stone-900 selection:text-amber-200 overflow-x-hidden font-sans">
      {/* 1. Top Cyber HUD Navigation */}
      <HUDNavbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenBrunoWorld={() => setBrunoWorldOpen(true)}
      />

      {/* 2. Main Content Journey */}
      <main className="relative z-10">
        <HeroSection
          onScrollTo={handleNavigate}
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenBrunoWorld={() => setBrunoWorldOpen(true)}
        />

        {/* 2.1 BIG & PROMINENT BRUNO SIMON 3D CITY WORLD */}
        <section id="city-world" className="relative py-8 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dfcfb8] border border-[#c8b59b] text-stone-900 font-mono text-xs font-bold shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                <span>BRUNO SIMON 3D INTERACTIVE CITY WORLD</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950 font-sans">
                Drive the Ferrari Red Roadster to Explore Campuses
              </h2>
              <p className="text-sm sm:text-base max-w-2xl text-stone-700 font-medium font-sans">
                Drive across the sunny 3D city! Cross the wooden river bridge, crash through the wooden crate pyramid, jump the stunt ramp, and enter any of the 4 Tech Factory Campuses to inspect live projects.
              </p>
            </div>
          </div>

          {/* Embedded 3D Interactive City Game */}
          <BrunoCityWorld
            onOpenSaaS={() => handleNavigate('software')}
            onOpenCinema={() => handleNavigate('cinema')}
          />
        </section>

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

      {/* 3. Dennis Snellenberg Signature Giant Footer */}
      <DennisFooter
        onScrollToTop={handleScrollToTop}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* 4. Interactive CLI Terminal */}
      <CyberTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* 5. Bruno Simon Full-Screen 3D Interactive Car World Modal */}
      <BrunoWorld
        isOpen={brunoWorldOpen}
        onClose={() => setBrunoWorldOpen(false)}
      />
    </div>
  );
}

export default App;
