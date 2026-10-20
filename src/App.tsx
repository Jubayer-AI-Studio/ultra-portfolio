import { useState } from 'react';
import { CyberBackground } from './components/CyberBackground';
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
    <div className="relative min-h-screen bg-[#07080b] text-zinc-100 selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* 1. Lusion-Inspired 3D Interactive Particle Matrix */}
      <CyberBackground />

      {/* 2. Top HUD Navigation */}
      <HUDNavbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* 3. Main Content Sections */}
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

      {/* 4. Footer */}
      <Footer
        onScrollToTop={handleScrollToTop}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* 5. Interactive Cyber Terminal (CLI) Modal */}
      <CyberTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </div>
  );
}

export default App;
