import React, { useState, useEffect } from 'react';
import { sound } from '../utils/sound';
import { Volume2, VolumeX, Menu, X, Terminal, Cpu } from 'lucide-react';
import { GithubIcon, YoutubeIcon } from './Icons';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HUDNavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenTerminal: () => void;
  onOpenBrunoWorld?: () => void;
}

export const HUDNavbar: React.FC<HUDNavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenTerminal,
  onOpenBrunoWorld,
}) => {
  const [timeStr, setTimeStr] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Dhaka',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    sound.setMuted(nextState);
    if (!nextState) {
      sound.playSuccess();
    }
  };

  const navLinks = [
    { id: 'city-world', label: '🚗 3D City World' },
    { id: 'works-snellenberg', label: 'Works' },
    { id: 'software', label: 'NOORHUB SaaS' },
    { id: 'arcade', label: 'Playable Arcade' },
    { id: 'cinema', label: 'AI Cinema' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    sound.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 rounded-2xl bg-[#EADECA]/95 border border-[#c8b59b] backdrop-blur-xl shadow-md">
        
        {/* Brand / Monogram */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center font-mono font-black text-amber-200 text-sm shadow-md group-hover:scale-105 transition-transform">
            J
          </div>
          <div>
            <div className="font-mono text-sm font-black tracking-wider text-stone-950 group-hover:text-amber-800 transition-colors flex items-center gap-1.5">
              <span>JUBAYER</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-900 text-amber-200 font-bold">
                DEV
              </span>
            </div>
            <div className="text-[10px] font-mono text-stone-700 tracking-tight hidden sm:block font-bold">
              DHAKA [BST] {timeStr}
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#dfcfb8]/80 p-1 rounded-xl border border-[#c8b59b]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                onMouseEnter={() => sound.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer font-bold ${
                  isActive
                    ? 'bg-stone-900 text-amber-200 shadow-sm'
                    : 'text-stone-800 hover:text-black hover:bg-stone-900/10'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Socials */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Bruno Simon 3D Car World Launcher */}
          {onOpenBrunoWorld && (
            <button
              onClick={() => {
                sound.playWarp();
                onOpenBrunoWorld();
              }}
              aria-label="Drive 3D Car World (Bruno Simon Mode)"
              title="Drive 3D Car World (Bruno Simon Mode)"
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold transition-all shadow-md shadow-emerald-600/30 cursor-pointer min-h-[36px]"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>
                <span className="hidden sm:inline">🚗 3D CAR WORLD</span>
                <span className="sm:hidden">🚗 3D</span>
              </span>
            </button>
          )}

          {/* CLI Terminal Launcher Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenTerminal();
            }}
            aria-label="Open Interactive Cyber Terminal"
            title="Open Interactive Cyber Terminal"
            className="flex items-center gap-1 p-2 sm:px-2.5 sm:py-1.5 rounded-lg bg-[#dfcfb8] border border-[#c8b59b] text-stone-900 hover:bg-[#d4c3ab] text-xs font-mono font-bold transition-all shadow-sm cursor-pointer min-h-[36px]"
          >
            <Terminal className="w-3.5 h-3.5 text-stone-800" />
            <span className="hidden lg:inline">CLI_v2.6</span>
          </button>

          {/* Sound Mute/Unmute Switch */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            className="p-2 rounded-lg border border-[#c8b59b] bg-[#dfcfb8] hover:bg-[#d4c3ab] text-stone-900 transition-all cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center font-bold"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-stone-500" /> : <Volume2 className="w-4 h-4 text-stone-900" />}
          </button>

          {/* GitHub Direct Link */}
          <a
            href={PORTFOLIO_DATA.profile.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            aria-label="GitHub Repository Hub"
            title="GitHub Repository Hub (21+ Repos)"
            className="p-2 rounded-lg bg-[#dfcfb8] border border-[#c8b59b] text-stone-900 hover:bg-[#d4c3ab] transition-colors hidden sm:flex items-center justify-center min-h-[36px] min-w-[36px]"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* YouTube Direct Link */}
          <a
            href={PORTFOLIO_DATA.profile.youtube}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            aria-label="AI Cinema YouTube Channel"
            title="AI Cinema YouTube Channel"
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-400 hover:text-amber-200 hover:border-amber-700 transition-colors hidden sm:flex items-center justify-center min-h-[36px] min-w-[36px]"
          >
            <YoutubeIcon className="w-4 h-4" />
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 md:hidden cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 rounded-2xl bg-zinc-950/95 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-2 font-mono text-sm">
          <div className="text-[11px] text-zinc-500 pb-2 border-b border-zinc-800 flex items-center justify-between">
            <span>LOCATION: DHAKA, BD</span>
            <span>{timeStr} BST</span>
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="px-3 py-2.5 rounded-lg text-left text-zinc-300 hover:text-cyan-400 hover:bg-zinc-900 flex items-center justify-between cursor-pointer"
            >
              <span>{link.label}</span>
              <Cpu className="w-3.5 h-3.5 text-zinc-600" />
            </button>
          ))}
          <div className="flex gap-2 pt-2 border-t border-zinc-800">
            <a
              href={PORTFOLIO_DATA.profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs flex items-center justify-center gap-1.5"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub (21)</span>
            </a>
            <a
              href={PORTFOLIO_DATA.profile.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-400 text-xs flex items-center justify-center gap-1.5"
            >
              <YoutubeIcon className="w-3.5 h-3.5" />
              <span>Cinema</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
