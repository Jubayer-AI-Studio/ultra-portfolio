import { useState } from 'react';
import { ThreeCanvas } from './components/ThreeCanvas';
import { FilmGrain } from './components/FilmGrain';
import { CustomCursor } from './components/CustomCursor';
import { HUDNavbar } from './components/HUDNavbar';
import { HeroSection } from './components/HeroSection';
import { SoftwareNexus } from './components/SoftwareNexus';
import { PlayableArcade } from './components/PlayableArcade';
import { AICinemaStudio } from './components/AICinemaStudio';
import { DigitalPublishing } from './components/DigitalPublishing';
import { CareerOdyssey } from './components/CareerOdyssey';
import { Footer } from './components/Footer';
import { CyberTerminal } from './components/CyberTerminal';

export function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [terminalOpen, setTerminalOpen] = useState(false);

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
    <div className="relative min-h-screen bg-[#06070a] text-zinc-100 selection:bg-cyan-400 selection:text-black overflow-x-hidden font-sans">
      {/* 1. Three.js Interactive 3D WebGL Quantum Core */}
      <ThreeCanvas />

      {/* 2. Cinematic Film Grain Texture */}
      <FilmGrain />

      {/* 3. Fluid Magnetic Custom Cursor */}
      <CustomCursor />

      {/* 4. Top Cyber HUD Navigation */}
      <HUDNavbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* 5. Main Content Sectors */}
      <main className="relative z-10">
        <HeroSection
          onScrollTo={handleNavigate}
          onOpenTerminal={() => setTerminalOpen(true)}
        />
        <SoftwareNexus />
        <PlayableArcade />
        <AICinemaStudio />
        <DigitalPublishing />
        <CareerOdyssey />
      </main>

      {/* 6. Footer */}
      <Footer
        onScrollToTop={handleScrollToTop}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* 7. Interactive Cyber CLI Terminal */}
      <CyberTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </div>
  );
}

export default App;
