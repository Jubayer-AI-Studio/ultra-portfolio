import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { LivingAvatar } from './LivingAvatar';
import { AnimatedDhakaClock } from './AnimatedDhakaClock';
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
    <section id="hero" className="relative min-h-[90vh] pt-28 pb-16 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-7xl mx-auto w-full space-y-10">
        
        {/* 1. BIG PROMINENT ANIMATED DHAKA CLOCK HUD */}
        <AnimatedDhakaClock />

        {/* 2. Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Text & CTAs (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Status & Audio Waveform Tag */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dfcfb8] border border-[#c8b59b] text-xs font-mono text-stone-900 shadow-sm font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-800" />
                <span>Dhaka, Bangladesh</span>
              </span>
              <span className="text-stone-400">|</span>
              <span className="text-stone-700">Available for High-Impact Projects</span>
            </div>

            {/* Visual Equalizer Pill */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#dfcfb8] border border-[#c8b59b] text-[11px] font-mono text-stone-800 font-bold">
              <Volume2 className="w-3.5 h-3.5 text-stone-700" />
              <div className="flex items-end gap-[2px] h-3">
                {[8, 14, 6, 12, 10, 16, 8, 12].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}px` }}
                    className="w-[2px] bg-stone-800 rounded-full animate-pulse"
                  />
                ))}
              </div>
              <span className="text-stone-600 text-[10px]">60 FPS</span>
            </div>
          </div>

          {/* Main Title & Brand Identity (100% High-Contrast on #EADECA with Bengali Entity) */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-stone-950 font-sans flex flex-wrap items-baseline gap-2 sm:gap-3">
              <span>JUBAYER</span>
              <span className="text-amber-800 underline decoration-amber-600/30">AHMAD</span>
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-stone-600 font-sans tracking-normal">
                (জুবায়ের আহমদ)
              </span>
            </h1>

            {/* Dynamic Rotating Role */}
            <div className="h-10 flex items-center">
              <span className="font-mono text-lg sm:text-2xl text-stone-800 flex items-center gap-2 font-bold">
                <span className="text-amber-700">&gt;</span>
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="font-black text-stone-950"
                >
                  {roles[roleIndex]}
                </motion.span>
                <span className="w-2.5 h-5 bg-amber-700 animate-pulse inline-block" />
              </span>
            </div>
          </div>

          {/* Bio Paragraph */}
          <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl font-sans font-medium">
            Building software systems that feel truly alive. From modern SaaS platforms like{' '}
            <span className="text-stone-950 font-bold underline decoration-amber-500">NOORHUB</span> to browser-based 2D/3D games and cinematic AI storytelling in the{' '}
            <span className="text-stone-950 font-bold underline decoration-amber-500">ICON 2030</span> universe.
          </p>

          {/* Action Portals */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                sound.playWarp();
                if (onOpenBrunoWorld) onOpenBrunoWorld();
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-mono font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-red-600/25 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>🚗 Drive 3D Car (Bruno Simon Mode)</span>
              <Sparkles className="w-4 h-4 fill-white" />
            </button>

            <button
              onClick={() => {
                sound.playWarp();
                onScrollTo('works-snellenberg');
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-black text-amber-100 font-mono font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Explore Works</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>

            <button
              onClick={() => {
                sound.playWarp();
                onScrollTo('arcade');
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-6 py-3.5 rounded-xl bg-[#f5ecde] hover:bg-[#ebdcc8] border border-[#c8b59b] text-stone-900 font-mono font-bold text-xs sm:text-sm flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm cursor-pointer"
            >
              <Play className="w-4 h-4 text-stone-800 fill-stone-800" />
              <span>Play Arcade Games</span>
            </button>

            <button
              onClick={() => {
                sound.playCinematicDrone();
                onScrollTo('cinema');
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-5 py-3.5 rounded-xl bg-[#f5ecde] hover:bg-[#ebdcc8] border border-[#c8b59b] text-stone-900 font-mono font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <Film className="w-4 h-4 text-amber-800" />
              <span>AI Cinema Studio</span>
            </button>
          </div>

          {/* Verified Engineering Stats HUD */}
          <div className="pt-6 border-t border-[#c8b59b] grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-xl bg-[#f5ecde] border border-[#c8b59b] shadow-sm hover:border-stone-800 transition-colors">
              <div className="text-2xl font-mono font-black text-stone-950">28+</div>
              <div className="text-xs font-mono text-stone-600 font-bold">GitHub Repos</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#f5ecde] border border-[#c8b59b] shadow-sm hover:border-stone-800 transition-colors">
              <div className="text-2xl font-mono font-black text-stone-950">NOORHUB</div>
              <div className="text-xs font-mono text-stone-600 font-bold">Full SaaS Platform</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#f5ecde] border border-[#c8b59b] shadow-sm hover:border-stone-800 transition-colors">
              <div className="text-2xl font-mono font-black text-stone-950">5+</div>
              <div className="text-xs font-mono text-stone-600 font-bold">Playable Games</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#f5ecde] border border-[#c8b59b] shadow-sm hover:border-stone-800 transition-colors">
              <div className="text-2xl font-mono font-black text-stone-950">3 Chapters</div>
              <div className="text-xs font-mono text-stone-600 font-bold">ICON 2030 Series</div>
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
      </div>
    </section>
  );
};
