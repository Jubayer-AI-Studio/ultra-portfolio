import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/sound';
import {
  Film,
  Play,
  Clapperboard,
  Users,
  Compass,
  ArrowUpRight,
  Award,
  Sparkles,
  Layers,
  Volume2,
} from 'lucide-react';
import { YoutubeIcon } from './Icons';

export const AICinemaStudio: React.FC = () => {
  const films = PORTFOLIO_DATA.films;
  const [selectedFilmIndex, setSelectedFilmIndex] = useState(2); // Default to Chapter 3 (The Epic Climax)
  const activeFilm = films[selectedFilmIndex];

  const handleSelectChapter = (index: number) => {
    sound.playCinematicDrone();
    setSelectedFilmIndex(index);
  };

  const handleOpenVideo = (url: string) => {
    sound.playWarp();
    window.open(url, '_blank');
  };

  // Character dossiers for Icon 2030 Chapter 3
  const characterDossiers = [
    {
      name: 'Ryan',
      trait: 'Cold-Headed Tactician • Chess & Poker',
      bond: 'Companion: Jack',
      role: 'Survivor #01',
      avatarColor: 'from-blue-600 to-cyan-500',
    },
    {
      name: 'Adam',
      trait: 'Leader • Football & Passion',
      bond: 'Sister: Emma',
      role: 'Survivor #02',
      avatarColor: 'from-purple-600 to-pink-500',
    },
    {
      name: 'James',
      trait: 'Humorist • Cricket & Quick Reflexes',
      bond: 'Lover: Sammy',
      role: 'Survivor #03',
      avatarColor: 'from-amber-500 to-orange-600',
    },
  ];

  return (
    <section id="cinema" className="relative py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header with Official Director Laurel Wreath */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-stone-900 font-bold bg-[#dfcfb8] px-3.5 py-1.5 rounded-full border border-[#c8b59b]">
              <Film className="w-4 h-4 text-amber-500" />
              <span>SECTOR 03 // AI CINEMA STUDIO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-stone-950 tracking-tight font-sans">
              ICON 2030 Cinematic Universe
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5ecde] border border-[#c8b59b] text-stone-900 font-mono text-xs font-bold tracking-wide shadow-sm">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>{PORTFOLIO_DATA.profile.creativeCredit}</span>
              </div>
              <span className="text-xs font-mono text-stone-600 font-bold">
                3 Epic Chapters • 10s Continuity Architecture
              </span>
            </div>
          </div>

          <a
            href={PORTFOLIO_DATA.profile.youtube}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            data-cursor="WATCH CHANNEL"
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-xl shadow-emerald-950/50 self-start md:self-auto cursor-pointer"
          >
            <YoutubeIcon className="w-4 h-4" />
            <span>Official YouTube Theater</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 1. IMAX 21:9 Virtual Cinema Screen Experience */}
        <div className="relative rounded-3xl bg-black border border-pink-500/30 overflow-hidden shadow-[0_0_80px_rgba(244,63,94,0.15)]">
          
          {/* Top Cinema Letterbox Bar & Chapter Selector */}
          <div className="px-6 py-4 bg-zinc-950/90 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-white font-bold tracking-wider">IMAX THEATER PREVIEW</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400">2.39:1 ANAMORPHIC</span>
            </div>

            {/* Chapter Selection Pills */}
            <div className="flex items-center gap-1.5">
              {films.map((f, idx) => (
                <button
                  key={f.id}
                  onClick={() => handleSelectChapter(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    selectedFilmIndex === idx
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold shadow-md shadow-pink-900/40 border border-pink-400/50'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {f.chapter}
                </button>
              ))}
            </div>
          </div>

          {/* Cinema Screen Stage */}
          <div className="relative min-h-[380px] sm:min-h-[460px] p-6 sm:p-12 flex flex-col justify-between overflow-hidden">
            {/* Cinematic Animated Atmosphere & Gradient Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-radial from-pink-950/25 via-transparent to-black pointer-events-none" />

            {/* Film Content Details with Smooth Fade Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilm.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="relative z-20 space-y-6 max-w-3xl"
              >
                {/* Film Chapter & Golden Emblem */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-700 text-pink-400 font-mono text-xs font-bold">
                    {activeFilm.chapter}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                    <Clapperboard className="w-3.5 h-3.5 text-pink-400" />
                    <span>{activeFilm.status}</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-yellow-950/40 border border-yellow-500/30 text-yellow-300 text-[10px] font-mono flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                    <span>Handoff Verified</span>
                  </span>
                </div>

                {/* Big Movie Title & Tagline */}
                <div>
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-sans">
                    {activeFilm.title}
                  </h3>
                  <p className="text-base sm:text-xl font-mono text-pink-300 italic mt-2">
                    "{activeFilm.tagline}"
                  </p>
                </div>

                {/* Synopsis */}
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
                  {activeFilm.synopsis}
                </p>

                {/* Chapter 3 Character Breakdown Cards */}
                {selectedFilmIndex === 2 && (
                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {characterDossiers.map((char) => (
                      <div
                        key={char.name}
                        className="p-3 rounded-xl bg-zinc-900/80 border border-white/5 space-y-1 font-mono text-xs"
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-pink-400 font-bold">{char.role}</span>
                          <span className="text-zinc-500">{char.name}</span>
                        </div>
                        <div className="text-zinc-200 font-bold">{char.trait}</div>
                        <div className="text-[11px] text-zinc-400">{char.bond}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Production Tech Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs font-mono text-zinc-500">PIPELINE:</span>
                  {activeFilm.tools.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Screen Bar: Cinema Action & Audio Pulse */}
            <div className="relative z-20 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-zinc-900">
              <div className="flex items-center gap-3 font-mono text-xs text-zinc-400">
                <Volume2 className="w-4 h-4 text-pink-400 animate-pulse" />
                <span>SOUND ENGINE: 55Hz Cinematic Drone Active</span>
              </div>

              <button
                onClick={() => handleOpenVideo(activeFilm.youtubeUrl)}
                data-cursor="PLAY FILM"
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-mono font-bold text-sm flex items-center justify-center gap-2 shadow-2xl shadow-pink-900/60 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white text-white" />
                <span>Launch in YouTube Cinema</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* 2. Technical Pipeline Breakdown (Awwwards Proof of Mastery) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-pink-400 font-mono text-xs font-bold">
              <Compass className="w-4 h-4" />
              <span>10S CONTINUITY PIPELINE</span>
            </div>
            <h4 className="text-lg font-bold text-white">No-Keyframe Sequence Locking</h4>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Google Flow and Gemini prompt engineering maintaining absolute facial structure, clothing, and scene lighting across ~180 contiguous 10-second parts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold">
              <Users className="w-4 h-4" />
              <span>FACE-LOCK SYSTEM</span>
            </div>
            <h4 className="text-lg font-bold text-white">Multi-Character Consistency</h4>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Strict 1-2 character frame discipline avoiding AI model hallucinations. Names replaced with descriptive facial matrices (brow, chin, glasses, hair).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
              <Layers className="w-4 h-4" />
              <span>EMOTIONAL PACING</span>
            </div>
            <h4 className="text-lg font-bold text-white">Laugh Before You Break</h4>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Carefully engineered comedic hooks, intimate bonds, followed by catastrophic Titanic-inspired tragedy and silent underwater wonder in the Avatar realm.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
