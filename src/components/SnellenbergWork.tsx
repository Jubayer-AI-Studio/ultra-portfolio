import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/sound';
import { ArrowUpRight, Play, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';
import { ArcadeModal } from './ArcadeModal';

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeModalGame, setActiveModalGame] = useState<{ id: string; title: string; url?: string } | null>(null);

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
      subtitle: 'Complete Madrasa & Educational Institute Management Platform',
      category: 'saas',
      categoryLabel: 'SaaS Architecture',
      year: '2026',
      tags: ['Next.js 15', 'TypeScript', 'Cloudflare Tunnel', 'RBAC', 'Node.js'],
      githubUrl: PORTFOLIO_DATA.featuredSaaS.githubUrl,
      featured: true,
      accentColor: '#00f0ff',
    },
    {
      id: 'iron-strike',
      title: 'Iron Strike 2D Fighter',
      subtitle: 'Arcade Martial Arts Duel with Special Gauges & Combos',
      category: 'game',
      categoryLabel: 'Playable Arcade Game',
      year: '2026',
      tags: ['2D Combat Engine', 'Combo System', 'AI Studio Web App'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/Iron-Strike-2D-Fighter',
      liveUrl: 'https://ai.studio/apps/45effe9f-8244-49d3-a401-e4a0e09f9e90',
      featured: true,
      accentColor: '#f59e0b',
    },
    {
      id: 'icon-2030',
      title: 'ICON 2030 Universe',
      subtitle: 'AI Cinema Trilogy with 10s Face-Locked Continuity Architecture',
      category: 'film',
      categoryLabel: 'Cinematic AI Film',
      year: '2026',
      tags: ['Google Veo 3.1', 'Gemini 3.7', 'Google Flow', 'CapCut'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio',
      liveUrl: PORTFOLIO_DATA.profile.youtube,
      featured: true,
      accentColor: '#f43f5e',
    },
    {
      id: 'two-friends',
      title: 'Two Friends Driving Studio',
      subtitle: 'Veo 3.1 & Gemini 3.7 Flash AI Cinematic Story Generator',
      category: 'ai-app',
      categoryLabel: 'AI Video Studio',
      year: '2026',
      tags: ['Google Veo 3.1', 'Gemini 3.7 Flash', 'React 19', 'Web Audio'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/Two-Friends-Driving-Masters-Video-Studio',
      accentColor: '#818cf8',
    },
    {
      id: 'dhaka-racing',
      title: 'Dhaka Open World Racing',
      subtitle: 'Urban 10+ Routes Driving Simulation with Dynamic Weather',
      category: 'game',
      categoryLabel: '3D Driving Simulation',
      year: '2026',
      tags: ['Open World', 'Vehicle Physics', 'Dhaka 10+ Routes'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/Dhaka-Open-World-Racing',
      accentColor: '#10b981',
    },
    {
      id: 'nasrullah',
      title: 'Nasrullah Companion',
      subtitle: 'Smart Islamic FinTech, Expense Tracking & Gemini Receipt Scanner',
      category: 'ai-app',
      categoryLabel: 'FinTech & AI Utility',
      year: '2026',
      tags: ['Gemini Vision', 'Islamic FinTech', 'Taka Budgeting'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/Nasrullah-Islamic-Expense-Companion',
      liveUrl: 'https://ai.studio/apps/b164edd9-53c9-49da-904f-039560e0746b',
      accentColor: '#06b6d4',
    },
    {
      id: 'jubayer-legends',
      title: 'Jubayer Legends 3D',
      subtitle: 'Futuristic Cyberpunk Skyline Endless Runner Experience',
      category: 'game',
      categoryLabel: '3D Endless Runner',
      year: '2026',
      tags: ['3D WebGL', 'Cyber Neon', 'Sky Flight'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/Jubayer-Legends-3D-Runner',
      liveUrl: 'https://ai.studio/apps/8bc3f588-063b-4d86-85fc-f9115b059d7a',
      accentColor: '#a855f7',
    },
  ];

  const filteredWorks = works.filter((w) => {
    if (selectedFilter === 'all') return true;
    return w.category === selectedFilter;
  });

  const handleRowClick = (item: WorkItem) => {
    sound.playWarp();
    if (item.category === 'game') {
      setActiveModalGame({
        id: item.id,
        title: item.title,
        url: item.liveUrl,
      });
    } else if (item.category === 'saas') {
      const el = document.getElementById('software');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (item.category === 'film') {
      const el = document.getElementById('cinema');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (item.liveUrl) {
      window.open(item.liveUrl, '_blank');
    }
  };

  return (
    <section id="works-snellenberg" className="relative py-32 px-4 sm:px-6 select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Dennis Snellenberg Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-wider">
              <Layers className="w-4 h-4" />
              <span>SELECTED WORKS // ARCHITECTURE & CREATIONS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight font-sans">
              Recent Projects <span className="font-mono text-2xl sm:text-3xl font-normal text-zinc-500">({filteredWorks.length.toString().padStart(2, '0')})</span>
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
                className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-white text-black font-bold shadow-lg shadow-white/20'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/[0.08]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dennis Snellenberg Interactive List Container with Floating Cursor Preview */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative divide-y divide-white/[0.08]"
        >
          {filteredWorks.map((work, idx) => (
            <div
              key={work.id}
                onClick={() => handleRowClick(work)}
                onMouseEnter={() => {
                  setHoveredIndex(idx);
                  sound.playHover();
                }}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative py-8 sm:py-12 px-4 -mx-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 hover:bg-white/[0.03] cursor-pointer"
              >
                {/* Left: Title & Subtitle with smooth hover slide */}
                <div className="space-y-2 z-10">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-white group-hover:text-cyan-300 transition-all duration-300 group-hover:translate-x-3 tracking-tight font-sans">
                      {work.title}
                    </h3>
                    {work.featured && (
                      <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-[11px] font-semibold">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-400 text-sm sm:text-base max-w-xl group-hover:text-zinc-200 transition-colors">
                    {work.subtitle}
                  </p>
                </div>

                {/* Right: Meta & Direct Triggers */}
                <div className="flex items-center gap-6 z-10">
                  <div className="text-left md:text-right font-mono">
                    <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {work.categoryLabel}
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">{work.year}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    {work.category === 'game' ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playWarp();
                          setActiveModalGame({
                            id: work.id,
                            title: work.title,
                            url: work.liveUrl,
                          });
                        }}
                        className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 shadow-md shadow-cyan-400/30 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-black" />
                        <span>PLAY</span>
                      </button>
                    ) : (
                      <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-zinc-400 group-hover:text-black group-hover:bg-white group-hover:border-white transition-all duration-300 group-hover:rotate-45">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    )}

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
                        className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
          ))}

          {/* Dennis Snellenberg Floating Preview Card that follows mouse */}
          <AnimatePresence>
            {hoveredIndex !== null && filteredWorks[hoveredIndex] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                style={{
                  left: cursorX,
                  top: cursorY,
                  x: '-50%',
                  y: '-50%',
                }}
                className="pointer-events-none fixed z-40 hidden lg:flex flex-col items-center justify-center"
              >
                {/* Floating Preview Glass Card */}
                <div
                  className="w-72 p-5 rounded-2xl bg-zinc-950/95 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl space-y-3"
                  style={{ borderColor: filteredWorks[hoveredIndex].accentColor }}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span
                      className="font-bold tracking-wider uppercase"
                      style={{ color: filteredWorks[hoveredIndex].accentColor }}
                    >
                      {filteredWorks[hoveredIndex].categoryLabel}
                    </span>
                    <span className="text-zinc-500">{filteredWorks[hoveredIndex].year}</span>
                  </div>

                  <div className="text-lg font-black text-white">
                    {filteredWorks[hoveredIndex].title}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {filteredWorks[hoveredIndex].tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-300 text-[10px] font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span>
                      {filteredWorks[hoveredIndex].category === 'game' ? '⚡ Tap to play now' : '↗ Tap to inspect'}
                    </span>
                    <span className="text-white font-bold">CLICK</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Big Snellenberg GitHub Portal CTA */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-zinc-400 text-sm font-mono">
            All code repositories are open and verified on GitHub under <span className="text-white font-bold">@Jubayer-AI-Studio</span>.
          </div>

          <a
            href={PORTFOLIO_DATA.profile.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playWarp()}
            className="px-8 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/15 hover:border-cyan-400/50 text-white font-mono text-xs font-bold flex items-center gap-2.5 transition-all hover:scale-105 shadow-xl shadow-black/60 cursor-pointer"
          >
            <GithubIcon className="w-4 h-4" />
            <span>More Works on GitHub (21+ Repositories)</span>
            <ArrowUpRight className="w-4 h-4 text-cyan-400" />
          </a>
        </div>

        {/* Live Playable Modal if Game Clicked */}
        {activeModalGame && (
          <ArcadeModal
            isOpen={Boolean(activeModalGame)}
            onClose={() => setActiveModalGame(null)}
            gameId={activeModalGame.id}
            gameTitle={activeModalGame.title}
            externalUrl={activeModalGame.url}
          />
        )}

      </div>
    </section>
  );
};
