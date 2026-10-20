import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/sound';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';

export const DigitalPublishing: React.FC = () => {
  const pub = PORTFOLIO_DATA.publishing;

  return (
    <section className="relative py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950/80 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xl shadow-black/60">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
              <BookOpen className="w-4 h-4" />
              <span>SECTOR 04 // DIGITAL PUBLISHING & WEB MAGAZINE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {pub.title}
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {pub.description}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {pub.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {pub.githubUrl && (
              <a
                href={pub.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-mono text-xs font-semibold flex items-center gap-2 transition-colors shadow-md cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Magazine Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
