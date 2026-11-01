import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/sound';
import { ArrowUp, Terminal } from 'lucide-react';
import { GithubIcon, YoutubeIcon, InstagramIcon } from './Icons';

interface FooterProps {
  onScrollToTop: () => void;
  onOpenTerminal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, onOpenTerminal }) => {
  const profile = PORTFOLIO_DATA.profile;

  return (
    <footer className="relative py-16 px-4 sm:px-6 border-t border-zinc-900 bg-black/90">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main Connect Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Mission (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-mono font-bold text-black text-sm">
                J
              </div>
              <span className="font-mono text-lg font-bold text-white tracking-wider">
                {profile.name}
              </span>
            </div>
            <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
              Full-Stack Software Developer & Creative Technologist based in Dhaka, Bangladesh. Dedicated to architecting robust web systems, games, and cutting-edge AI media.
            </p>
            <div className="text-xs font-mono text-pink-400">
              Creative Direction: "{profile.creativeCredit}"
            </div>
          </div>

          {/* Direct Communication Channels (6 cols) */}
          <div className="md:col-span-6 space-y-4 md:text-right">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              CONNECT & COLLABORATE
            </div>
            <div className="text-sm font-mono text-white">
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-cyan-400 underline transition-colors"
              >
                {profile.email}
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 md:justify-end pt-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                aria-label="GitHub Profile"
                title="GitHub"
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={profile.youtube}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                aria-label="YouTube Channel"
                title="YouTube"
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-amber-400 hover:text-amber-300 transition-colors"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href={profile.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                aria-label="Instagram Profile"
                title="Instagram"
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-pink-400 hover:text-pink-300 transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenTerminal();
                }}
                aria-label="Open Cyber CLI Terminal"
                title="Cyber CLI Terminal"
                className="p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 border border-purple-500/30 text-purple-300 transition-colors cursor-pointer"
              >
                <Terminal className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} {profile.englishSpelling} AHMAD • ALL RIGHTS RESERVED
          </div>

          <button
            onClick={() => {
              sound.playWarp();
              onScrollToTop();
            }}
            aria-label="Scroll Back to Top"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
