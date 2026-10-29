import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/sound';
import { BookOpen, ArrowUpRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';

export const DigitalPublishing: React.FC = () => {
  const pub = PORTFOLIO_DATA.publishing;

  return (
    <section className="relative py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 font-mono text-xs text-stone-900 font-bold bg-[#dfcfb8] px-3.5 py-1.5 rounded-full border border-[#c8b59b]">
          <BookOpen className="w-4 h-4 text-stone-800" />
          <span>SECTOR 04 // DIGITAL PUBLISHING & CLOUDFLARE / VERCEL PLATFORMS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Platform 1: Affan Labib Web Magazine (Cloudflare Pages) */}
          <div className="p-8 rounded-3xl bg-[#f5ecde] border border-[#c8b59b] flex flex-col justify-between space-y-6 shadow-md">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-purple-100 border border-purple-300 text-purple-900 text-xs font-mono font-bold">
                  Cloudflare Pages Edge
                </span>
                <span className="text-xs font-mono text-stone-500 font-bold">2026</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-950 font-sans">
                আফফান লাবীব (Affan Labib Literary Studio)
              </h3>
              <p className="text-stone-700 text-sm leading-relaxed font-medium">
                Modern, responsive web publishing platform and author magazine designed to showcase curated articles, thought leadership, and client-provided editorial content with high-contrast typography. Deployed on Cloudflare Pages.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Astro v5', 'Cloudflare Pages', 'Cloudflare KV', 'Tailwind CSS'].map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-full bg-[#ebdcc8] border border-[#c8b59b] text-stone-900 text-xs font-mono font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={pub.affanPagesUrl || 'https://affan-labib.pages.dev'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playWarp()}
                className="flex-1 py-3 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>ক্লাউডফ্লেয়ার লাইভ (affan-labib.pages.dev)</span>
              </a>
              <a
                href={pub.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="py-3 px-4 rounded-xl bg-stone-900 hover:bg-black text-amber-200 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" />
                <span>কোড</span>
              </a>
            </div>
          </div>

          {/* Platform 2: Mesk Prokashon (Vercel Production) */}
          <div className="p-8 rounded-3xl bg-[#f5ecde] border border-[#c8b59b] flex flex-col justify-between space-y-6 shadow-md">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-mono font-bold">
                  Next.js 15 & WhatsApp AI
                </span>
                <span className="text-xs font-mono text-stone-500 font-bold">2026</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-950 font-sans">
                মেশক প্রকাশন (Mesk Prokashon Digital Bookstore)
              </h3>
              <p className="text-stone-700 text-sm leading-relaxed font-medium">
                Official digital bookstore and publishing house of author Maulana Muhammad Zainul Abedin. Features 100+ book catalogue, real-time book discount offers, automated WhatsApp ordering bot, and responsive reader interface.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Next.js 15', 'WhatsApp AI Bot', 'Tailwind CSS', 'Digital Bookstore', 'Vercel'].map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-full bg-[#ebdcc8] border border-[#c8b59b] text-stone-900 text-xs font-mono font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={pub.meskLiveUrl || 'https://mesk-nine.vercel.app'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playWarp()}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>ভার্সেল লাইভ (mesk-nine.vercel.app)</span>
              </a>
              <a
                href="https://github.com/Jubayer-AI-Studio/mesk"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="py-3 px-4 rounded-xl bg-stone-900 hover:bg-black text-amber-200 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" />
                <span>কোড</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
