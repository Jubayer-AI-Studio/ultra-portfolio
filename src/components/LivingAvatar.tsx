import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { Sparkles, Terminal, Code2, Eye, Cpu, Activity, Disc3 } from 'lucide-react';

interface LivingAvatarProps {
  avatarUrl: string;
  name: string;
}

type HologramMode = 'cyber' | 'matrix' | 'quantum';

export const LivingAvatar: React.FC<LivingAvatarProps> = ({ avatarUrl, name }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [holoMode, setHoloMode] = useState<HologramMode>('cyber');
  const [glitchActive, setGlitchActive] = useState(false);

  // Smooth Spring Motion Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 18, stiffness: 180, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [18, -18]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-18, 18]), springConfig);
  const lightX = useSpring(useTransform(x, [-0.5, 0.5], [10, 90]), springConfig);
  const lightY = useSpring(useTransform(y, [-0.5, 0.5], [10, 90]), springConfig);
  const translateZ = useSpring(isHovered ? 30 : 0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sound.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleAvatarClick = () => {
    sound.playSuccess();
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 450);

    confetti({
      particleCount: 55,
      spread: 70,
      origin: { y: 0.4 },
      colors: ['#00f0ff', '#a855f7', '#10b981'],
    });
  };

  const cycleMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    const modes: HologramMode[] = ['cyber', 'matrix', 'quantum'];
    const next = modes[(modes.indexOf(holoMode) + 1) % modes.length];
    setHoloMode(next);
  };

  // Mode-based styles
  const getModeAura = () => {
    switch (holoMode) {
      case 'matrix':
        return 'from-emerald-500/25 via-teal-600/20 to-cyan-500/20';
      case 'quantum':
        return 'from-pink-500/25 via-purple-600/30 to-indigo-500/20';
      default:
        return 'from-cyan-500/25 via-blue-600/25 to-purple-600/25';
    }
  };

  const getBorderColor = () => {
    switch (holoMode) {
      case 'matrix':
        return 'from-emerald-400 via-teal-500 to-cyan-400';
      case 'quantum':
        return 'from-pink-500 via-purple-500 to-indigo-400';
      default:
        return 'from-cyan-400 via-blue-500 to-purple-500';
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-6 select-none">
      {/* 1. Dynamic Multidimensional Aura Pulse */}
      <div
        className={`absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr ${getModeAura()} blur-[70px] animate-pulse pointer-events-none transition-all duration-700`}
      />

      {/* 2. 3D Holographic Viewport */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleAvatarClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative group cursor-pointer"
        data-cursor="TOUCH ENTITY"
      >
        {/* Sci-Fi Target Reticle Brackets (Animated Corners) */}
        <div className="absolute -top-3.5 -left-3.5 w-7 h-7 border-t-2 border-l-2 border-cyan-400 pointer-events-none transition-all duration-300 group-hover:scale-110 group-hover:border-white shadow-[0_0_10px_#00f0ff]" />
        <div className="absolute -top-3.5 -right-3.5 w-7 h-7 border-t-2 border-r-2 border-cyan-400 pointer-events-none transition-all duration-300 group-hover:scale-110 group-hover:border-white shadow-[0_0_10px_#00f0ff]" />
        <div className="absolute -bottom-3.5 -left-3.5 w-7 h-7 border-b-2 border-l-2 border-cyan-400 pointer-events-none transition-all duration-300 group-hover:scale-110 group-hover:border-white shadow-[0_0_10px_#00f0ff]" />
        <div className="absolute -bottom-3.5 -right-3.5 w-7 h-7 border-b-2 border-r-2 border-cyan-400 pointer-events-none transition-all duration-300 group-hover:scale-110 group-hover:border-white shadow-[0_0_10px_#00f0ff]" />

        {/* Top HUD Telemetry Bar */}
        <div className="absolute -top-7 inset-x-0 flex items-center justify-between text-[10px] font-mono text-zinc-400 px-1 pointer-events-none">
          <span className="flex items-center gap-1 text-cyan-400">
            <Disc3 className="w-3 h-3 animate-spin" />
            <span>ID: JUBAYER_01</span>
          </span>
          <span className="text-zinc-500">23.8103°N / 90.4125°E</span>
        </div>

        {/* Outer Glowing Gradient Frame */}
        <div
          className={`p-[2px] rounded-3xl bg-gradient-to-br ${getBorderColor()} shadow-[0_0_50px_rgba(0,240,255,0.25)] transition-all duration-500 group-hover:shadow-[0_0_80px_rgba(0,240,255,0.45)]`}
        >
          {/* Main Photo Chamber */}
          <div className="relative w-64 h-80 sm:w-72 sm:h-92 md:w-80 md:h-100 rounded-[22px] overflow-hidden bg-black border border-white/10">
            
            {/* Layer 1: Base Photo with 3D Depth Scale */}
            <motion.img
              src={avatarUrl}
              alt={name}
              width={320}
              height={400}
              loading="eager"
              style={{ translateZ }}
              className={`w-full h-full object-cover transition-all duration-500 ease-out ${
                isHovered ? 'scale-105 contrast-115' : 'scale-100'
              } ${
                holoMode === 'matrix'
                  ? 'hue-rotate-90 saturate-125'
                  : holoMode === 'quantum'
                  ? 'hue-rotate-270 saturate-125'
                  : ''
              }`}
            />

            {/* Layer 2: RGB Glitch Split Overlay (On Click / Hover Surge) */}
            {glitchActive && (
              <>
                <img
                  src={avatarUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-70 translate-x-1.5 -translate-y-0.5 filter contrast-125 saturate-200 pointer-events-none"
                  style={{ filter: 'drop-shadow(-4px 0px 0px #00f0ff)' }}
                  aria-hidden="true"
                />
                <img
                  src={avatarUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-70 -translate-x-1.5 translate-y-0.5 filter contrast-125 saturate-200 pointer-events-none"
                  style={{ filter: 'drop-shadow(4px 0px 0px #ff0055)' }}
                  aria-hidden="true"
                />
              </>
            )}

            {/* Layer 3: Dynamic Ray-Traced Light Follower (Mouse Spotlight) */}
            <motion.div
              className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-50"
              style={{
                background: `radial-gradient(circle 240px at ${lightX}% ${lightY}%, rgba(255,255,255,0.95), transparent 70%)`,
              }}
            />

            {/* Layer 4: Vertical Laser Holographic Scan Line */}
            <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-cyan-400/25 to-transparent -translate-y-full animate-[scan_3s_ease-in-out_infinite] pointer-events-none shadow-[0_0_15px_#00f0ff]" />

            {/* Layer 5: Fine Cyber Mesh Grid Overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-15 mix-blend-color-dodge"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0, 240, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            />

            {/* Layer 6: Bottom Telemetry & Status HUD Overlay */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col gap-2 font-mono text-xs">
              
              {/* Telemetry Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>LIVE ENTITY</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                  <Activity className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  <span>SYNC: 100%</span>
                </div>
              </div>

              {/* Heartbeat EKG Pulse Line */}
              <div className="w-full h-4 relative flex items-center overflow-hidden">
                <svg className="w-full h-full stroke-cyan-400 fill-none" viewBox="0 0 200 20">
                  <path
                    d="M 0,10 L 40,10 L 48,2 L 54,18 L 62,6 L 68,14 L 74,10 L 200,10"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-[pulse_2s_infinite]"
                  />
                </svg>
              </div>

              {/* Mode Switcher Button */}
              <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px]">
                <span className="text-zinc-500">MODE: {holoMode.toUpperCase()}</span>
                <button
                  onClick={cycleMode}
                  title="Switch Holographic Vision"
                  className="px-2 py-0.5 rounded bg-zinc-900/90 hover:bg-zinc-800 border border-cyan-500/40 text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Eye className="w-3 h-3" />
                  <span>Switch Vision</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Orbiting Hologram Badges with 3D Depth */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-4 -right-6 px-3.5 py-1.5 rounded-full bg-zinc-950/90 border border-cyan-400/50 text-cyan-300 text-xs font-mono flex items-center gap-1.5 shadow-xl shadow-cyan-950/60 backdrop-blur-xl"
        >
          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-bold">Full-Stack Architect</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-4 -left-6 px-3.5 py-1.5 rounded-full bg-zinc-950/90 border border-purple-400/50 text-purple-300 text-xs font-mono flex items-center gap-1.5 shadow-xl shadow-purple-950/60 backdrop-blur-xl"
        >
          <Terminal className="w-3.5 h-3.5 text-purple-400" />
          <span className="font-bold">AI Film Director</span>
        </motion.div>

        <motion.div
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 -left-8 -translate-y-1/2 px-2.5 py-1 rounded-full bg-zinc-950/90 border border-emerald-400/40 text-emerald-300 text-[10px] font-mono flex items-center gap-1 shadow-lg backdrop-blur-xl hidden sm:flex"
        >
          <Cpu className="w-3 h-3 text-emerald-400" />
          <span>NOORHUB</span>
        </motion.div>

      </motion.div>

      {/* Under-Card Instruction Pill */}
      <div className="mt-5 flex items-center gap-2 font-mono text-[11px] text-zinc-500">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
        <span>Holographic Entity Active • Click Photo to Glitch / Cycle Vision</span>
      </div>
    </div>
  );
};
