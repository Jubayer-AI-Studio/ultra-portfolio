import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { LivingAvatar } from './LivingAvatar';
import { sound } from '../utils/sound';
import { ArrowRight, Play, Film, ShieldCheck, MapPin } from 'lucide-react';

interface HeroSectionProps {
  onScrollTo: (sectionId: string) => void;
  onOpenTerminal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollTo }) => {
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
          {/* Status Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 backdrop-blur-md shadow-sm shadow-cyan-900/20">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-cyan-400" />
              <span>Dhaka, Bangladesh</span>
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">Available for High-Impact Projects</span>
          </div>

          {/* Main Title & Brand Identity */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white font-sans">
              JUBAYER <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">AHMAD</span>
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
            <span className="text-purple-300 font-medium">ICON 2030</span> universe.
          </p>

          {/* Action Portals / Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                sound.playWarp();
                onScrollTo('software');
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-mono font-bold text-sm flex items-center gap-2 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-cyan-500/25 cursor-pointer"
            >
              <span>Explore Code & SaaS</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sound.playWarp();
                onScrollTo('arcade');
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-5 py-3 rounded-xl bg-zinc-900 border border-purple-500/40 text-purple-300 font-mono text-sm flex items-center gap-2 hover:bg-purple-950/30 hover:border-purple-400 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-purple-950/30 cursor-pointer"
            >
              <Play className="w-4 h-4 text-purple-400" />
              <span>Play Arcade Games</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onScrollTo('cinema');
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-sm flex items-center gap-2 hover:border-zinc-700 hover:text-white transition-all cursor-pointer"
            >
              <Film className="w-4 h-4 text-pink-400" />
              <span>AI Cinema</span>
            </button>
          </div>

          {/* Verified Engineering Stats HUD */}
          <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/5">
              <div className="text-2xl font-mono font-bold text-cyan-400">21+</div>
              <div className="text-xs font-mono text-zinc-400">GitHub Repos</div>
            </div>
            <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/5">
              <div className="text-2xl font-mono font-bold text-purple-400">NOORHUB</div>
              <div className="text-xs font-mono text-zinc-400">Full SaaS Platform</div>
            </div>
            <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/5">
              <div className="text-2xl font-mono font-bold text-emerald-400">5+</div>
              <div className="text-xs font-mono text-zinc-400">Playable Games</div>
            </div>
            <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/5">
              <div className="text-2xl font-mono font-bold text-pink-400">3 Chapters</div>
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
          <div className="text-center mt-3">
            <div className="font-mono text-xs text-zinc-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>VERIFIED DEVELOPER ENTITY</span>
            </div>
            <div className="font-mono text-[11px] text-zinc-500 mt-0.5">
              Interactive 3D Depth Active • Hover or Click
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
