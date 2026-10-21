import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { LivingAvatar } from './LivingAvatar';
import { sound } from '../utils/sound';
import { ArrowRight, Play, Film, MapPin, Volume2, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onScrollTo: (sectionId: string) => void;
  onOpenTerminal?: () => void;
  onOpenBrunoWorld?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollTo, onOpenBrunoWorld }) => {
  const roles = [
    'Full-Stack Software Developer',
    'SaaS Architect (NOORHUB)',
    '2D & 3D Game Creator',
    'AI Cinema Director (ICON 2030)',
  ];

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Text & CTAs (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Status & Audio Waveform Tag */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 backdrop-blur-md shadow-sm shadow-cyan-900/20">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400" />
                <span>Dhaka, Bangladesh</span>
              </span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400">Available for High-Impact Projects</span>
            </div>

            {/* Visual Equalizer Pill */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-950 border border-purple-500/30 text-[11px] font-mono text-purple-300">
              <Volume2 className="w-3 h-3 text-purple-400" />
              <div className="flex items-end gap-[2px] h-3">
                {[8, 14, 6, 12, 10, 16, 8, 12].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}px` }}
                    className="w-[2px] bg-purple-400 rounded-full animate-pulse"
                  />
                ))}
              </div>
              <span className="text-zinc-500 text-[10px]">60 FPS</span>
            </div>
          </div>

          {/* Main Title & Brand Identity */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white font-sans">
              JUBAYER <span className="bg-gradient-to-r from-white via-zinc-200 to-cyan-400 bg-clip-text text-transparent">AHMAD</span>
            </h1>

            {/* Dynamic Rotating Role */}
            <div className="h-10 flex items-center">
              <span className="font-mono text-lg sm:text-2xl text-zinc-300 flex items-center gap-2">
                <span className="text-cyan-400">&gt;</span>
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="font-bold text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text"
                >
                  {roles[roleIndex]}
                </motion.span>
                <span className="w-2 h-5 bg-cyan-400 animate-pulse inline-block" />
              </span>
            </div>
          </div>

          {/* Bio Paragraph */}
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl font-sans">
            Building software systems that feel truly alive. From modern SaaS platforms like{' '}
            <span className="text-cyan-300 font-medium">NOORHUB</span> to browser-based 2D/3D games and cinematic AI storytelling in the{' '}
            <span className="text-zinc-200 font-medium">ICON 2030</span> universe.
          </p>

          {/* Action Portals */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                sound.playWarp();
                if (onOpenBrunoWorld) onOpenBrunoWorld();
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 text-black font-mono font-black text-xs sm:text-sm flex items-center gap-2 hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>🚗 Drive 3D Car (Bruno Simon Mode)</span>
              <Sparkles className="w-4 h-4 fill-black" />
            </button>

            <button
              onClick={() => {
                sound.playWarp();
                onScrollTo('works-snellenberg');
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-mono font-bold text-xs sm:text-sm flex items-center gap-2 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Explore Works</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sound.playWarp();
                onScrollTo('arcade');
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-6 py-3.5 rounded-xl bg-zinc-900/90 border border-white/10 hover:border-cyan-400/50 text-zinc-200 hover:text-white font-mono text-xs sm:text-sm flex items-center gap-2 hover:bg-zinc-800/80 hover:scale-[1.02] active:scale-[0.98] transition-all backdrop-blur-md cursor-pointer shadow-lg shadow-black/40"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
              <span>Play Arcade Games</span>
            </button>

            <button
              onClick={() => {
                sound.playCinematicDrone();
                onScrollTo('cinema');
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-5 py-3.5 rounded-xl bg-zinc-900/90 border border-white/10 hover:border-zinc-700 text-zinc-300 hover:text-white font-mono text-xs sm:text-sm flex items-center gap-2 hover:bg-zinc-800/80 transition-all backdrop-blur-md cursor-pointer"
            >
              <Film className="w-4 h-4 text-rose-400" />
              <span>AI Cinema Studio</span>
            </button>
          </div>

          {/* Verified Engineering Stats HUD */}
          <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-white/10 backdrop-blur-sm hover:border-cyan-500/30 transition-colors">
              <div className="text-2xl font-mono font-bold text-cyan-400">21+</div>
              <div className="text-xs font-mono text-zinc-400">GitHub Repos</div>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-white/10 backdrop-blur-sm hover:border-cyan-500/30 transition-colors">
              <div className="text-2xl font-mono font-bold text-white">NOORHUB</div>
              <div className="text-xs font-mono text-zinc-400">Full SaaS Platform</div>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-white/10 backdrop-blur-sm hover:border-cyan-500/30 transition-colors">
              <div className="text-2xl font-mono font-bold text-cyan-300">5+</div>
              <div className="text-xs font-mono text-zinc-400">Playable Games</div>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-white/10 backdrop-blur-sm hover:border-cyan-500/30 transition-colors">
              <div className="text-2xl font-mono font-bold text-zinc-200">3 Chapters</div>
              <div className="text-xs font-mono text-zinc-400">ICON 2030 Series</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: The Living Avatar (5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col items-center justify-center relative"
        >
          <LivingAvatar
            avatarUrl={PORTFOLIO_DATA.profile.avatar}
            name={PORTFOLIO_DATA.profile.name}
          />
        </motion.div>

      </div>
    </section>
  );
};
