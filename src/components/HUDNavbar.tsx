import React, { useState, useEffect } from 'react';
import { sound } from '../utils/sound';
import { Volume2, VolumeX, Menu, X, Terminal, Cpu } from 'lucide-react';
import { GithubIcon, YoutubeIcon } from './Icons';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HUDNavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenTerminal: () => void;
}

export const HUDNavbar: React.FC<HUDNavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenTerminal,
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
    { id: 'software', label: 'Software & SaaS' },
    { id: 'arcade', label: 'Arcade Games' },
    { id: 'cinema', label: 'AI Cinema' },
    { id: 'credentials', label: 'Timeline' },
  ];

  const handleNavClick = (id: string) => {
    sound.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2.5 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/80">
        
        {/* Brand / Monogram */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-mono font-bold text-black text-sm shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            J
          </div>
          <div>
            <div className="font-mono text-sm font-bold tracking-wider text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <span>JUBAYER</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/50">
                DEV
              </span>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 tracking-tight hidden sm:block">
              DHAKA [BST] {timeStr}
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1 rounded-xl border border-white/5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                onMouseEnter={() => sound.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Socials */}
        <div className="flex items-center gap-2">
          {/* CLI Terminal Launcher Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenTerminal();
            }}
            aria-label="Open Interactive Cyber Terminal"
            title="Open Interactive Cyber Terminal"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-300 hover:bg-purple-900/40 text-xs font-mono transition-all shadow-sm shadow-purple-900/30 cursor-pointer min-h-[36px]"
          >
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden lg:inline">CLI_v2.6</span>
          </button>

          {/* Sound Mute/Unmute Switch */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            className={`p-2 rounded-lg border transition-all cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center ${
              isMuted
                ? 'bg-zinc-900 border-zinc-800 text-zinc-500'
                : 'bg-cyan-950/40 border-cyan-500/30 text-cyan-400 shadow-sm shadow-cyan-500/20'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* GitHub Direct Link */}
          <a
            href={PORTFOLIO_DATA.profile.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            aria-label="GitHub Repository Hub"
            title="GitHub Repository Hub (21+ Repos)"
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors hidden sm:flex items-center justify-center min-h-[36px] min-w-[36px]"
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
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-red-400 hover:text-red-300 hover:border-red-900 transition-colors hidden sm:flex items-center justify-center min-h-[36px] min-w-[36px]"
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
              className="flex-1 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-red-400 text-xs flex items-center justify-center gap-1.5"
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
