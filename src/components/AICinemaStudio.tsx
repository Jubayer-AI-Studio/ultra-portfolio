import React from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/sound';
import {
  Film,
  Play,
  Clapperboard,
  Users,
  Compass,
  ArrowUpRight,
} from 'lucide-react';
import { YoutubeIcon } from './Icons';

export const AICinemaStudio: React.FC = () => {
  const films = PORTFOLIO_DATA.films;

  const handleOpenVideo = (url: string) => {
    sound.playWarp();
    window.open(url, '_blank');
  };

  return (
    <section id="cinema" className="relative py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header with Official Director Credit */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-pink-400">
              <Film className="w-4 h-4" />
              <span>SECTOR 03 // AI CINEMA STUDIO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              ICON 2030 Cinematic Universe
            </h2>
            <div className="inline-block px-3 py-1 rounded-full bg-pink-950/40 border border-pink-500/40 text-pink-300 font-mono text-xs font-semibold tracking-wide shadow-sm shadow-pink-900/30">
              {PORTFOLIO_DATA.profile.creativeCredit}
            </div>
          </div>

          <a
            href={PORTFOLIO_DATA.profile.youtube}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-red-900/30 self-start md:self-auto cursor-pointer"
          >
            <YoutubeIcon className="w-4 h-4" />
            <span>Visit YouTube Channel</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 3 Chapters Trilogy Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {films.map((film) => (
            <motion.div
              key={film.id}
              whileHover={{ y: -8 }}
              className="relative rounded-3xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-white/10 hover:border-pink-500/40 overflow-hidden flex flex-col justify-between shadow-2xl shadow-black/80 group transition-all"
            >
              {/* Top Film Reel Header */}
              <div className="relative p-6 space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-zinc-800 text-pink-400 font-bold border border-zinc-700">
                    {film.chapter}
                  </span>
                  <span className="text-zinc-500 flex items-center gap-1">
                    <Clapperboard className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{film.status}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-white group-hover:text-pink-300 transition-colors">
                    {film.title}
                  </h3>
                  <div className="text-xs font-mono text-zinc-400 italic mt-1">
                    "{film.tagline}"
                  </div>
                </div>

                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  {film.synopsis}
                </p>

                {/* Character Roster */}
                <div className="pt-2">
                  <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1 mb-1.5">
                    <Users className="w-3 h-3 text-cyan-400" />
                    <span>Key Characters:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {film.characters.map((char) => (
                      <span
                        key={char}
                        className="px-2 py-0.5 rounded bg-zinc-950 text-cyan-300 border border-cyan-900/40 text-[10px] font-mono"
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Specs & Action */}
              <div className="p-6 pt-4 border-t border-zinc-800/80 bg-black/40 space-y-4">
                <div className="flex flex-wrap gap-1">
                  {film.tools.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 text-[10px] font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleOpenVideo(film.youtubeUrl)}
                  className="w-full py-2.5 px-4 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/40 text-pink-200 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-pink-300 text-pink-300" />
                  <span>Watch on YouTube Theater</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Filmmaking Engineering Pipeline Note */}
        <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            <Compass className="w-5 h-5 text-pink-400 shrink-0" />
            <div>
              <span className="text-white font-bold">10-Second Continuity Pipeline:</span> Strict face-locking, prompt-based scene continuity without keyframes, powered by Google Flow & Gemini.
            </div>
          </div>
          <div className="text-pink-400 shrink-0">~180 Parts Architecture</div>
        </div>

      </div>
    </section>
  );
};
