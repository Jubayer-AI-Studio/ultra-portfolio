import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/sound';
import { Mail, ArrowUpRight, ArrowUp, Sparkles, Terminal } from 'lucide-react';
import { GithubIcon, YoutubeIcon, InstagramIcon } from './Icons';

interface DennisFooterProps {
  onScrollToTop: () => void;
  onOpenTerminal: () => void;
}

export const DennisFooter: React.FC<DennisFooterProps> = ({
  onScrollToTop,
  onOpenTerminal,
}) => {
  const profile = PORTFOLIO_DATA.profile;
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Dhaka',
          hour12: true,
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

  return (
    <footer id="contact" className="relative pt-32 pb-16 px-4 sm:px-6 bg-black border-t border-white/[0.08] select-none">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Dennis Snellenberg Massive Headline & Magnetic Circle */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
              <Sparkles className="w-4 h-4" />
              <span>COLLABORATION & SOFTWARE ENGINEERING</span>
            </div>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight leading-[1.05] font-sans">
              Let&apos;s build <br />
              <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                together —
              </span>
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg max-w-xl font-sans">
              Have an ambitious SaaS product, game concept, or AI pipeline you want to bring to life? Let&apos;s turn vision into high-performance reality.
            </p>
          </div>

          {/* Huge Dennis Snellenberg Magnetic Circular CTA Button */}
          <div className="flex items-center justify-start lg:justify-end">
            <motion.a
              href={`mailto:${profile.email}`}
              onClick={() => sound.playWarp()}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black flex flex-col items-center justify-center font-mono font-black text-sm sm:text-base tracking-wider uppercase transition-colors shadow-[0_0_80px_rgba(0,240,255,0.35)] cursor-pointer group"
            >
              <span className="text-center">Get in Touch</span>
              <ArrowUpRight className="w-6 h-6 mt-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </div>
        </div>

        {/* Action Pills & Interactive Terminal Trigger */}
        <div className="flex flex-wrap items-center gap-4 pt-8 border-t border-white/[0.08]">
          <a
            href={`mailto:${profile.email}`}
            onClick={() => sound.playClick()}
            className="px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-cyan-400/50 text-white font-mono text-xs flex items-center gap-2.5 transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>{profile.email}</span>
          </a>

          <button
            onClick={() => {
              sound.playClick();
              onOpenTerminal();
            }}
            className="px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-cyan-400/50 text-cyan-300 font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Terminal className="w-4 h-4" />
            <span>Open Terminal CLI</span>
          </button>

          <button
            onClick={() => {
              sound.playWarp();
              onScrollToTop();
            }}
            className="px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white font-mono text-xs flex items-center gap-2 transition-all ml-auto cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
            <span>Back to Top</span>
          </button>
        </div>

        {/* Bottom Editorial Meta Bar (Snellenberg Style) */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>DHAKA, BANGLADESH • {timeStr}</span>
          </div>

          <div className="flex items-center gap-6 text-white font-bold">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={profile.youtube}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="hover:text-red-400 transition-colors flex items-center gap-1.5"
            >
              <YoutubeIcon className="w-4 h-4" />
              <span>YouTube</span>
            </a>
            <a
              href={profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="hover:text-pink-400 transition-colors flex items-center gap-1.5"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Instagram</span>
            </a>
          </div>

          <div className="text-zinc-400 text-center sm:text-right">
            © 2026 Jubayer Ahmad. Directed by JUBAYER AI Specialist.
          </div>
        </div>

      </div>
    </footer>
  );
};
