import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/sound';
import {
  ExternalLink,
  Layers,
  ShieldCheck,
  Cpu,
  Server,
  Database,
  ArrowUpRight,
} from 'lucide-react';
import { GithubIcon } from './Icons';

export const SoftwareNexus: React.FC = () => {
  const saas = PORTFOLIO_DATA.featuredSaaS;
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'features'>('overview');

  return (
    <section id="software" className="relative py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
            <Layers className="w-4 h-4" />
            <span>SECTOR 01 // SOFTWARE & SAAS ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Production Software & Full-Stack Systems
          </h2>
          <p className="text-zinc-400 max-w-2xl text-sm sm:text-base">
            Verified software projects architected by Jubayer Ahmad, spanning enterprise educational SaaS, AI automation pipelines, and modern full-stack web applications.
          </p>
        </div>

        {/* 1. Flagship Spotlight: NOORHUB SaaS Card */}
        <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-cyan-500/30 shadow-[0_0_50px_rgba(0,240,255,0.08)] overflow-hidden">
          {/* Decorative Cyber Background Grid */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Info: 7 cols */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-semibold">
                  FLAGSHIP SAAS
                </span>
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-mono">
                  Full-Stack Architecture
                </span>
              </div>

              <div>
                <h3 className="text-3xl sm:text-4xl font-black text-white font-sans tracking-tight">
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
                {(['overview', 'features', 'architecture'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      sound.playClick();
                      setActiveTab(tab);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-all cursor-pointer ${
                      activeTab === tab
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="min-h-24">
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

                {activeTab === 'architecture' && (
                  <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
                    <div className="text-cyan-400 font-bold">// SYSTEM TOPOLOGY</div>
                    <div>CLIENT LAYER: Next.js (App Router) + Tailwind CSS</div>
                    <div>DATA LAYER: Relational Models, Student/Teacher Records</div>
                    <div>AUTH LAYER: Multi-Role Permissions (Admin / Staff / Guardian)</div>
                    <div>TUNNEL: Cloudflare Daemon (Secure Local-to-Cloud Route)</div>
                  </div>
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

              {/* CTAs */}
              <div className="flex items-center gap-3 pt-2">
                {saas.githubUrl && (
                  <a
                    href={saas.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="px-5 py-2.5 rounded-xl bg-cyan-400 text-black font-mono font-bold text-xs flex items-center gap-2 hover:bg-cyan-300 transition-colors shadow-md shadow-cyan-500/20 cursor-pointer"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View Repository on GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Architectural Graphic: 5 cols */}
            <div className="lg:col-span-5 w-full">
              <div className="p-5 rounded-2xl bg-black/80 border border-zinc-800 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                    <span className="text-zinc-500 ml-2">noorhub.config.ts</span>
                  </div>
                  <span className="text-emerald-400">ACTIVE</span>
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
          {PORTFOLIO_DATA.softwareProjects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-zinc-950/70 border border-white/10 hover:border-cyan-500/40 flex flex-col justify-between space-y-4 transition-all duration-300 shadow-lg shadow-black/50 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
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
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className="flex-1 py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playWarp()}
                      className="flex-1 py-2 px-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Launch</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
