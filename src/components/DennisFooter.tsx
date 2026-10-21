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
    <footer
      id="contact"
      className="relative pt-32 pb-16 px-4 sm:px-6 bg-[#f59e0b] text-slate-950 border-t-4 border-amber-600/40 select-none transition-colors"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Dennis Snellenberg Massive Headline & Magnetic Circle */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-black font-black bg-amber-400/90 border border-amber-600/30 px-3.5 py-1.5 rounded-full shadow-sm">
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>COLLABORATION & SOFTWARE ARCHITECTURE</span>
            </div>

            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black text-slate-950 tracking-tight leading-[1.03] font-sans">
              Let&apos;s build <br />
              <span className="text-black underline decoration-black/20 decoration-wavy">
                together —
              </span>
            </h2>

            <p className="text-slate-900 font-semibold text-base sm:text-xl max-w-xl font-sans leading-relaxed">
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
              className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-slate-950 hover:bg-black text-amber-300 flex flex-col items-center justify-center font-mono font-black text-sm sm:text-base tracking-wider uppercase transition-all shadow-[0_25px_60px_rgba(0,0,0,0.45)] cursor-pointer group border-4 border-amber-400"
            >
              <span className="text-center">Get in Touch</span>
              <ArrowUpRight className="w-7 h-7 mt-1.5 text-amber-400 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform" />
            </motion.a>
          </div>
        </div>

        {/* Action Pills & Interactive Terminal Trigger */}
        <div className="flex flex-wrap items-center gap-4 pt-8 border-t-2 border-amber-600/30">
          <a
            href={`mailto:${profile.email}`}
            onClick={() => sound.playClick()}
            className="px-6 py-3.5 rounded-full bg-slate-950 hover:bg-black text-white font-mono text-xs font-bold flex items-center gap-2.5 transition-all shadow-md cursor-pointer border border-amber-500/40"
          >
            <Mail className="w-4 h-4 text-amber-400" />
            <span>{profile.email}</span>
          </a>

          <button
            onClick={() => {
              sound.playClick();
              onOpenTerminal();
            }}
            className="px-6 py-3.5 rounded-full bg-slate-950 hover:bg-black text-amber-300 font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer border border-amber-500/40"
          >
            <Terminal className="w-4 h-4 text-amber-400" />
            <span>Open Terminal CLI</span>
          </button>

          <button
            onClick={() => {
              sound.playWarp();
              onScrollToTop();
            }}
            className="px-6 py-3.5 rounded-full bg-slate-950 hover:bg-black text-white font-mono text-xs font-bold flex items-center gap-2 transition-all ml-auto shadow-md cursor-pointer border border-amber-500/40"
          >
            <ArrowUp className="w-4 h-4 text-amber-400" />
            <span>Back to Top</span>
          </button>
        </div>

        {/* Bottom Editorial Meta Bar (Snellenberg Style) */}
        <div className="pt-8 border-t-2 border-amber-600/30 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-slate-950 font-bold">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
            <span>DHAKA, BANGLADESH • {timeStr}</span>
          </div>

          <div className="flex items-center gap-6 text-black font-black">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="hover:text-red-700 transition-colors flex items-center gap-1.5 underline"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={profile.youtube}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="hover:text-red-700 transition-colors flex items-center gap-1.5 underline"
            >
              <YoutubeIcon className="w-4 h-4" />
              <span>YouTube</span>
            </a>
            <a
              href={profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="hover:text-red-700 transition-colors flex items-center gap-1.5 underline"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Instagram</span>
            </a>
          </div>

          <div className="text-slate-900 text-center sm:text-right font-bold">
            © 2026 Jubayer Ahmad. Directed by JUBAYER AI Specialist.
          </div>
        </div>

      </div>
    </footer>
  );
};
