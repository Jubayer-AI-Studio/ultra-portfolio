import React, { useState, useRef } from 'react';
import { useSpring } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/sound';
import { Layers, ExternalLink, Film, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';
import { NoorHubModal } from './NoorHubModal';

interface WorkItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'saas' | 'game' | 'film' | 'ai-app';
  categoryLabel: string;
  year: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  accentColor: string;
}

export const SnellenbergWork: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [noorHubModalOpen, setNoorHubModalOpen] = useState(false);

  // Mouse Coordinates for Floating Snellenberg Preview
  const containerRef = useRef<HTMLDivElement>(null);
  const springConfig = { damping: 20, stiffness: 160, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  const works: WorkItem[] = [
    {
      id: 'noorhub',
      title: 'NOORHUB SaaS',
      subtitle: 'Enterprise Madrasa & Institute Management Cloud Platform',
      category: 'saas',
      categoryLabel: 'Enterprise SaaS',
      year: '2026',
      tags: ['Next.js 15', 'TypeScript', 'Cloudflare Tunnel', 'RBAC', 'PostgreSQL'],
      githubUrl: PORTFOLIO_DATA.featuredSaaS.githubUrl,
      liveUrl: 'https://noorhub.vercel.app',
      featured: true,
      accentColor: '#00f0ff',
    },
    {
      id: 'rihlah-gadget',
      title: 'Rihlah Gadget Shop',
      subtitle: 'Next.js 15 PWA E-Commerce Platform on Cloudflare Pages Edge',
      category: 'saas',
      categoryLabel: 'E-Commerce PWA',
      year: '2026',
      tags: ['Next.js 15', 'React 19', 'Cloudflare Pages', 'PWA', 'Tailwind CSS'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/rihlah-gadget-shop',
      liveUrl: 'https://rihlah-gadget-shop.pages.dev',
      featured: true,
      accentColor: '#f59e0b',
    },
    {
      id: 'electronics-importers',
      title: 'Electronics Importers BD',
      subtitle: 'B2B Industrial Electronic Components & Supply Chain Procurement',
      category: 'saas',
      categoryLabel: 'B2B Procurement',
      year: '2026',
      tags: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Vercel Production'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/electronics-importers-bd',
      liveUrl: 'https://electronics-importers-bd.vercel.app',
      featured: true,
      accentColor: '#38bdf8',
    },
    {
      id: 'mesk-prokashon',
      title: 'Mesk Publications (Mesk Prokashon)',
      subtitle: 'Official Islamic Literature Bookstore & WhatsApp Order Bot',
      category: 'saas',
      categoryLabel: 'Digital Bookstore & AI',
      year: '2026',
      tags: ['Next.js 15', 'WhatsApp AI Bot', 'Tailwind CSS', 'Vercel'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/mesk',
      liveUrl: 'https://mesk-nine.vercel.app',
      featured: true,
      accentColor: '#10b981',
    },
    {
      id: 'amar-world-map',
      title: 'Amar World Map (Interactive Geo)',
      subtitle: 'Bangladesh 64 Districts & World Visual Travel Tracker',
      category: 'ai-app',
      categoryLabel: 'Interactive Web Tool',
      year: '2026',
      tags: ['React', 'HTML5 Canvas', 'GeoJSON', 'Vite', 'PWA'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/amar-world-map',
      liveUrl: 'https://amar-world-map.vercel.app',
      featured: true,
      accentColor: '#ec4899',
    },
    {
      id: 'special-agent',
      title: 'Jubayer AI Hunter & Special Agent',
      subtitle: 'Autonomous AI Remote Intelligence & Task Execution Engine',
      category: 'ai-app',
      categoryLabel: 'Autonomous AI',
      year: '2026',
      tags: ['Autonomous AI', 'Python', 'Node.js', 'Vercel Production'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/special-agent',
      liveUrl: 'https://special-agent-one.vercel.app',
      featured: true,
      accentColor: '#eab308',
    },
    {
      id: 'affan-labib',
      title: 'Affan Labib Literary Studio',
      subtitle: 'Writer Studio & Cloudflare Pages Edge Web Magazine',
      category: 'saas',
      categoryLabel: 'Cloudflare Pages',
      year: '2026',
      tags: ['Astro v5', 'Cloudflare Pages', 'Cloudflare KV', 'Tailwind CSS'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/affan-labib-blog',
      liveUrl: 'https://affan-labib.pages.dev',
      accentColor: '#a78bfa',
    },
    {
      id: 'max-portfolio',
      title: 'Max Interactive 3D Portfolio',
      subtitle: 'Three.js WebGL Interactive Showroom & PWA Experience',
      category: 'ai-app',
      categoryLabel: '3D WebGL Showroom',
      year: '2026',
      tags: ['Three.js', 'WebGL', 'PWA', 'Tailwind CSS', 'Vercel'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/max-portfolio',
      liveUrl: 'https://max-portfolio-eta.vercel.app',
      accentColor: '#06b6d4',
    },
    {
      id: 'ibrahim-studio',
      title: 'Ibrahim Creative Studio',
      subtitle: 'Digital Agency Platform & High-Conversion Showcase',
      category: 'saas',
      categoryLabel: 'Creative Agency',
      year: '2026',
      tags: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/ibrahim-studio',
      liveUrl: 'https://ibrahim-jade.vercel.app',
      accentColor: '#14b8a6',
    },
    {
      id: 'kawsar-suite',
      title: 'Kawsar Professional Suite',
      subtitle: 'Engineering Consultancy & Brand Showcase Portal',
      category: 'saas',
      categoryLabel: 'Consultancy Portal',
      year: '2026',
      tags: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/kawsar-portfolio',
      liveUrl: 'https://kawsar-seven.vercel.app',
      accentColor: '#6366f1',
    },
    {
      id: 'icon-2030',
      title: 'ICON 2030 Cinematic Universe',
      subtitle: 'AI Film Trilogy with 10s Face-Locked Continuity Architecture',
      category: 'film',
      categoryLabel: 'Cinematic AI Film',
      year: '2026',
      tags: ['Google Veo 3.1', 'Gemini 3.7', 'Google Flow', 'CapCut'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio',
      liveUrl: PORTFOLIO_DATA.profile.youtube,
      featured: true,
      accentColor: '#d97706',
    },
  ];

  const filteredWorks = works.filter((w) => {
    if (selectedFilter === 'all') return true;
    return w.category === selectedFilter;
  });

  const handleRowClick = (item: WorkItem) => {
    sound.playWarp();
    if (item.id === 'noorhub') {
      setNoorHubModalOpen(true);
    } else if (item.category === 'film') {
      const el = document.getElementById('cinema');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (item.liveUrl) {
      window.open(item.liveUrl, '_blank');
    } else if (item.githubUrl) {
      window.open(item.githubUrl, '_blank');
    }
  };

  return (
    <section id="works-snellenberg" className="relative py-28 px-4 sm:px-6 select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Dennis Snellenberg Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#c8b59b]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-stone-900 font-bold bg-[#dfcfb8] px-3.5 py-1.5 rounded-full border border-[#c8b59b]">
              <Layers className="w-4 h-4 text-stone-800" />
              <span>SELECTED WORKS // ARCHITECTURE & CREATIONS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-stone-950 tracking-tight font-sans">
              Recent Projects <span className="font-mono text-2xl sm:text-3xl font-bold text-stone-600">({filteredWorks.length.toString().padStart(2, '0')})</span>
            </h2>
          </div>

          {/* Minimal Category Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {[
              { id: 'all', label: 'All Works' },
              { id: 'saas', label: 'SaaS Platforms' },
              { id: 'game', label: 'Playable Games' },
              { id: 'film', label: 'AI Cinema' },
              { id: 'ai-app', label: 'AI Web Apps' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedFilter(tab.id);
                }}
                className={`px-4 py-2 rounded-full font-bold transition-all cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-stone-950 text-amber-200 shadow-md scale-105'
                    : 'bg-[#dfcfb8] text-stone-800 hover:bg-[#d0beaa] border border-[#c8b59b]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Snellenberg Interactive Row Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative divide-y divide-[#c8b59b] border-y border-[#c8b59b]"
        >
          {filteredWorks.map((work, idx) => (
            <div
              key={work.id}
              onClick={() => handleRowClick(work)}
              data-cursor="VIEW PROJECT"
              className="group relative py-8 sm:py-10 transition-colors duration-300 hover:bg-[#dfcfb8]/60 cursor-pointer px-4 sm:px-6 rounded-2xl"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Left: Index & Main Title */}
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className="font-mono text-xs sm:text-sm font-bold text-stone-500 group-hover:text-stone-900 transition-colors">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-stone-950 tracking-tight font-sans group-hover:translate-x-2 transition-transform duration-300">
                      {work.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1 font-medium group-hover:text-stone-900 transition-colors">
                      {work.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right: Year, Category Label & Two Clear Direct Buttons */}
                <div className="flex flex-wrap items-center gap-3 md:gap-6 self-start md:self-auto pt-2 md:pt-0">
                  <div className="text-left md:text-right">
                    <div className="font-mono text-xs font-bold text-stone-900">
                      {work.categoryLabel}
                    </div>
                    <div className="font-mono text-[11px] text-stone-500">
                      {work.year}
                    </div>
                  </div>

                  {/* Two Explicit Buttons so User Never Confuses Between Live Website and GitHub Code */}
                  <div className="flex items-center gap-2">
                    {/* OPTION 1: Direct Live Software / Web Launch Button */}
                    {work.id === 'noorhub' ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playWarp();
                          setNoorHubModalOpen(true);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-mono font-bold text-xs flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 shadow-md shadow-cyan-600/30 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Launch SaaS</span>
                      </button>
                    ) : work.category === 'film' ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playCinematicDrone();
                          const el = document.getElementById('cinema');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-3.5 py-2 rounded-xl bg-stone-950 hover:bg-black text-amber-200 border border-stone-800 text-white font-mono font-bold text-xs flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 shadow-md shadow-amber-700/30 cursor-pointer"
                      >
                        <Film className="w-3.5 h-3.5" />
                        <span>Watch Cinema</span>
                      </button>
                    ) : (
                      <a
                        href={work.liveUrl || work.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playWarp();
                        }}
                        className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-mono font-bold text-xs flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 shadow-md shadow-emerald-700/30 cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Visit Live Site</span>
                      </a>
                    )}

                    {/* OPTION 2: Direct GitHub Repository Link */}
                    {work.githubUrl && (
                      <a
                        href={work.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playClick();
                        }}
                        title="GitHub Repository"
                        className="px-3 py-2 rounded-xl bg-stone-900 hover:bg-black text-amber-200 border border-stone-800 font-mono font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>



      {/* NoorHub Interactive Modal */}
      <NoorHubModal
        isOpen={noorHubModalOpen}
        onClose={() => setNoorHubModalOpen(false)}
      />
    </section>
  );
};
