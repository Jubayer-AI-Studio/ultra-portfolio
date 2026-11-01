import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/sound';
import { NoorHubModal } from './NoorHubModal';
import {
  ExternalLink,
  Layers,
  ShieldCheck,
  Cpu,
  Server,
  Database,
  ArrowUpRight,
  Play,
  CheckCircle2,
  Lock,
  Sparkles,
} from 'lucide-react';
import { GithubIcon } from './Icons';

export const SoftwareNexus: React.FC = () => {
  const saas = PORTFOLIO_DATA.featuredSaaS;
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'features'>('architecture');
  const [simulationStep, setSimulationStep] = useState<number>(-1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [noorHubModalOpen, setNoorHubModalOpen] = useState<boolean>(false);

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    sound.playWarp();
    setSimulationStep(0);

    const steps = [1, 2, 3, 4];
    steps.forEach((step, idx) => {
      setTimeout(() => {
        sound.playClick();
        setSimulationStep(step);
        if (step === 4) {
          sound.playSuccess();
          setIsSimulating(false);
        }
      }, (idx + 1) * 600);
    });
  };

  const simulationNodes = [
    { label: 'Client (Student/Parent)', icon: Cpu, desc: 'HTTPS Request' },
    { label: 'Cloudflare Zero Trust Tunnel', icon: Server, desc: 'Encrypted Daemon Route' },
    { label: 'Next.js 15 App Router & RBAC', icon: Lock, desc: 'Token & Role Verification' },
    { label: 'PostgreSQL DB & Invoicing', icon: Database, desc: 'Automated Ledger Entry' },
  ];

  return (
    <section id="software" className="relative py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-stone-900 font-bold bg-[#dfcfb8] px-3.5 py-1.5 rounded-full border border-[#c8b59b]">
            <Layers className="w-4 h-4 text-stone-800" />
            <span>SECTOR 01 // SOFTWARE & SAAS ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-stone-950 tracking-tight font-sans">
            Production Software & Full-Stack Systems
          </h2>
          <p className="text-stone-700 max-w-2xl text-sm sm:text-base font-medium">
            Verified software projects architected by Jubayer Ahmad, spanning enterprise educational SaaS, AI automation pipelines, and modern full-stack web applications.
          </p>
        </div>

        {/* 1. Flagship Spotlight: NOORHUB SaaS Card with Live Pipeline Simulation */}
        <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-cyan-500/40 shadow-[0_0_60px_rgba(0,240,255,0.12)] overflow-hidden">
          {/* Decorative Cyber Background Grid */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Info: 7 cols */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold tracking-wider">
                  FLAGSHIP SAAS
                </span>
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-mono">
                  Full-Stack Architecture
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Production Ready</span>
                </span>
              </div>

              <div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-sans tracking-tight">
                  {saas.title}
                </h3>
                <div className="font-mono text-cyan-400 text-sm mt-1">
                  {saas.subtitle}
                </div>
              </div>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {saas.description}
              </p>

              {/* Interactive Tabs */}
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                {(['architecture', 'features', 'overview'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      sound.playClick();
                      setActiveTab(tab);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-all cursor-pointer ${
                      activeTab === tab
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="min-h-24">
                {activeTab === 'architecture' && (
                  <div className="space-y-4">
                    {/* Live Pipeline Simulation Flowchart */}
                    <div className="p-4 rounded-2xl bg-black/80 border border-cyan-900/50 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-cyan-300 font-bold">// INTERACTIVE SYSTEM TOPOLOGY</span>
                        <button
                          onClick={runSimulation}
                          disabled={isSimulating}
                          className="px-3 py-1 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-bold flex items-center gap-1 transition-all disabled:opacity-50 cursor-pointer shadow-sm shadow-cyan-400/20"
                        >
                          <Play className="w-3 h-3 fill-black" />
                          <span>{isSimulating ? 'Processing...' : 'Simulate Data Flow'}</span>
                        </button>
                      </div>

                      {/* 4 Interactive Nodes */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
                        {simulationNodes.map((node, idx) => {
                          const isReached = simulationStep >= idx + 1;
                          const isCurrent = simulationStep === idx + 1;
                          const IconComp = node.icon;
                          return (
                            <div
                              key={idx}
                              className={`p-2.5 rounded-xl border transition-all duration-300 ${
                                isCurrent
                                  ? 'bg-cyan-500/25 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-105'
                                  : isReached
                                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-400'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 mb-1">
                                <IconComp className="w-3.5 h-3.5" />
                                <span className="font-bold">0{idx + 1}</span>
                              </div>
                              <div className="text-[10px] leading-tight font-medium text-zinc-200">
                                {node.label}
                              </div>
                              <div className="text-[9px] text-zinc-500 mt-1">{node.desc}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'overview' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-zinc-300">
                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Role-Based Access Control (RBAC)</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center gap-2.5">
                      <Database className="w-4 h-4 text-cyan-400" />
                      <span>Automated Monthly Invoicing</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center gap-2.5">
                      <Server className="w-4 h-4 text-purple-400" />
                      <span>Cloudflare Tunnel Integration</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center gap-2.5">
                      <Cpu className="w-4 h-4 text-pink-400" />
                      <span>Next.js App Router & TypeScript</span>
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <ul className="space-y-2 text-sm text-zinc-300 font-sans">
                    {saas.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-mono">0{idx + 1}.</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {saas.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* CTAs - TWO CLEAR OPTIONS: DIRECT LIVE SOFTWARE vs GITHUB */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                {/* OPTION 0: Direct Live Website on Vercel */}
                <a
                  href="https://noorhub.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playWarp()}
                  data-cursor="VISIT LIVE"
                  className="w-full sm:w-auto px-5 sm:px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-black font-mono font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-400/30 transition-all cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
                >
                  <ExternalLink className="w-4 h-4 text-black" />
                  <span>Visit Live SaaS (noorhub.vercel.app)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-black" />
                </a>

                {/* OPTION 1: Direct Live Software Launcher */}
                <button
                  onClick={() => {
                    sound.playWarp();
                    setNoorHubModalOpen(true);
                  }}
                  data-cursor="LAUNCH SAAS"
                  className="w-full sm:w-auto px-5 sm:px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 text-black font-mono font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/30 transition-all cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4 text-black fill-black" />
                  <span>Launch Interactive Software</span>
                  <ExternalLink className="w-4 h-4 text-black" />
                </button>

                {/* OPTION 2: Source Code on GitHub */}
                {saas.githubUrl && (
                  <a
                    href={saas.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    data-cursor="VIEW CODE"
                    className="w-full sm:w-auto px-4 sm:px-5 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <GithubIcon className="w-4 h-4 text-cyan-400" />
                    <span>GitHub Source Code</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Architectural Graphic: 5 cols */}
            <div className="lg:col-span-5 w-full">
              <div className="p-5 rounded-2xl bg-black/90 border border-zinc-800 space-y-4 font-mono text-xs shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-stone-600 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                    <span className="text-zinc-500 ml-2">noorhub.config.ts</span>
                  </div>
                  <span className="text-emerald-400 flex items-center gap-1 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    SYSTEM ONLINE
                  </span>
                </div>

                <div className="space-y-2 text-zinc-300 font-mono text-[11px] leading-relaxed overflow-x-auto">
                  <p className="text-purple-400">const NOORHUB_ENGINE = &#123;</p>
                  <p className="pl-4 text-zinc-400">framework: <span className="text-cyan-300">"Next.js 15 App Router"</span>,</p>
                  <p className="pl-4 text-zinc-400">language: <span className="text-cyan-300">"TypeScript"</span>,</p>
                  <p className="pl-4 text-zinc-400">security: <span className="text-emerald-300">"RBAC / Multi-Tenant"</span>,</p>
                  <p className="pl-4 text-zinc-400">invoicingEngine: <span className="text-emerald-300">"Automated Monthly Dues"</span>,</p>
                  <p className="pl-4 text-zinc-400">networkTunnel: <span className="text-pink-300">"Cloudflare Zero Trust Tunnel"</span>,</p>
                  <p className="pl-4 text-zinc-400">architect: <span className="text-yellow-300">"Jubayer Ahmad"</span></p>
                  <p className="text-purple-400">&#125;;</p>
                </div>

                <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-cyan-300 text-[11px] flex items-center justify-between">
                  <span>Architecture Status:</span>
                  <span className="font-bold text-cyan-200">Production Ready</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2. Bento Grid of Other Key Applications */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.productionSystems.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-cyan-500/40 flex flex-col justify-between space-y-4 transition-all duration-300 shadow-xl shadow-black/60 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                    {project.category}
                  </span>
                  {project.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-[10px] font-mono">
                      {project.badge}
                    </span>
                  )}
                </div>

                <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h4>

                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-zinc-900">
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 text-[11px] font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {/* Option 1: Direct Live Software / App */}
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playWarp()}
                      data-cursor="LAUNCH"
                      className="flex-1 py-2 px-3 rounded-lg bg-cyan-500/25 hover:bg-cyan-500/35 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Launch Live App</span>
                    </a>
                  ) : project.id === 'madrasa-mgmt' ? (
                    <button
                      onClick={() => {
                        sound.playWarp();
                        setNoorHubModalOpen(true);
                      }}
                      className="flex-1 py-2 px-3 rounded-lg bg-cyan-500/25 hover:bg-cyan-500/35 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Launch Platform</span>
                    </button>
                  ) : (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playWarp()}
                      className="flex-1 py-2 px-3 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Project</span>
                    </a>
                  )}

                  {/* Option 2: GitHub Repository */}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      data-cursor="SOURCE"
                      className="flex-1 py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Interactive Live NOORHUB Software Window Modal */}
      <NoorHubModal
        isOpen={noorHubModalOpen}
        onClose={() => setNoorHubModalOpen(false)}
      />
    </section>
  );
};
