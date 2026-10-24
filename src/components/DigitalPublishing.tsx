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
        <div className="p-8 sm:p-10 rounded-3xl bg-[#f5ecde] border border-[#c8b59b] flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-md">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-stone-900 font-bold bg-[#dfcfb8] px-3.5 py-1.5 rounded-full border border-[#c8b59b]">
              <BookOpen className="w-4 h-4 text-stone-800" />
              <span>SECTOR 04 // DIGITAL PUBLISHING & WEB MAGAZINE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-stone-950 font-sans">
              {pub.title}
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed font-medium">
              {pub.description}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {pub.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 rounded-full bg-[#ebdcc8] border border-[#c8b59b] text-stone-900 text-xs font-mono font-bold"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {pub.liveUrl && (
              <a
                href={pub.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playWarp()}
                className="px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold flex items-center gap-2 transition-colors shadow-md cursor-pointer"
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>Visit Live Website</span>
              </a>
            )}
            {pub.githubUrl && (
              <a
                href={pub.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="px-5 py-3 rounded-xl bg-stone-900 hover:bg-black text-amber-200 font-mono text-xs font-bold flex items-center gap-2 transition-colors shadow-md cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Code</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
