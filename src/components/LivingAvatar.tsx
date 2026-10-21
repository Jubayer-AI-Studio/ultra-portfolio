import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Code2,
  Eye,
  Activity,
  Disc3,
  Film,
  Camera,
} from 'lucide-react';

interface LivingAvatarProps {
  avatarUrl: string;
  name: string;
}

type HologramMode = 'cinema' | 'cyber' | 'matrix' | 'quantum';

export const LivingAvatar: React.FC<LivingAvatarProps> = ({ avatarUrl, name }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [holoMode, setHoloMode] = useState<HologramMode>('cinema');
  const [glitchActive, setGlitchActive] = useState(false);

  // Smooth Spring Motion Physics for 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 190, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [16, -16]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-16, 16]), springConfig);
  const lightX = useSpring(useTransform(x, [-0.5, 0.5], [10, 90]), springConfig);
  const lightY = useSpring(useTransform(y, [-0.5, 0.5], [10, 90]), springConfig);
  const translateZ = useSpring(isHovered ? 40 : 0, springConfig);

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
      particleCount: 65,
      spread: 80,
      origin: { y: 0.4 },
      colors: ['#00f0ff', '#f59e0b', '#ec4899', '#10b981'],
    });
  };

  const cycleMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    const modes: HologramMode[] = ['cinema', 'cyber', 'matrix', 'quantum'];
    const next = modes[(modes.indexOf(holoMode) + 1) % modes.length];
    setHoloMode(next);
  };

  // Mode-based styles
  const getModeAura = () => {
    switch (holoMode) {
      case 'matrix':
        return 'from-emerald-500/35 via-teal-600/30 to-cyan-500/25';
      case 'quantum':
        return 'from-pink-500/35 via-purple-600/35 to-indigo-500/25';
      case 'cyber':
        return 'from-cyan-500/35 via-blue-600/30 to-purple-600/30';
      default: // cinema
        return 'from-amber-500/30 via-red-600/25 to-orange-500/25';
    }
  };

  const getBorderColor = () => {
    switch (holoMode) {
      case 'matrix':
        return 'from-emerald-400 via-teal-500 to-cyan-400';
      case 'quantum':
        return 'from-pink-500 via-purple-500 to-indigo-400';
      case 'cyber':
        return 'from-cyan-400 via-blue-500 to-purple-500';
      default: // cinema
        return 'from-amber-400 via-rose-500 to-red-600';
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-4 select-none w-full">
      {/* 1. Dynamic Multidimensional Ambient Aura */}
      <div
        className={`absolute w-96 h-96 sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-tr ${getModeAura()} blur-[90px] animate-pulse pointer-events-none transition-all duration-700`}
      />

      {/* 2. 3D Floating Holographic Viewport */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="w-full flex justify-center"
      >
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
          className="relative group cursor-pointer max-w-full"
          data-cursor="TOUCH ENTITY"
        >
          {/* Sci-Fi Target Reticle Brackets (Animated High-Tech Corners) */}
          <div className="absolute -top-4 -left-4 w-9 h-9 border-t-2 border-l-2 border-amber-600/80 pointer-events-none transition-all duration-300 group-hover:scale-110 group-hover:border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)] z-20" />
          <div className="absolute -top-4 -right-4 w-9 h-9 border-t-2 border-r-2 border-amber-600/80 pointer-events-none transition-all duration-300 group-hover:scale-110 group-hover:border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)] z-20" />
          <div className="absolute -bottom-4 -left-4 w-9 h-9 border-b-2 border-l-2 border-amber-600/80 pointer-events-none transition-all duration-300 group-hover:scale-110 group-hover:border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)] z-20" />
          <div className="absolute -bottom-4 -right-4 w-9 h-9 border-b-2 border-r-2 border-amber-600/80 pointer-events-none transition-all duration-300 group-hover:scale-110 group-hover:border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)] z-20" />

          {/* Top HUD Telemetry Bar */}
          <div className="absolute -top-8 inset-x-0 flex items-center justify-between text-[11px] font-mono text-stone-700 px-2 pointer-events-none z-20 font-bold">
            <span className="flex items-center gap-1.5 text-stone-900">
              <Disc3 className="w-3.5 h-3.5 text-amber-700 animate-spin" />
              <span>ENTITY: JUBAYER AHMAD</span>
            </span>
            <span className="text-stone-600">DIRECTOR & ARCHITECT</span>
          </div>

          {/* Outer Glowing Gradient Frame (Large & Prominent) */}
          <div
            className={`p-[3px] rounded-[32px] bg-gradient-to-br ${getBorderColor()} shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition-all duration-500 group-hover:shadow-[0_25px_80px_rgba(217,119,6,0.35)]`}
          >
            {/* Main Photo Chamber - SIGNIFICANTLY ENLARGED */}
            <div className="relative w-[280px] h-[370px] sm:w-[360px] sm:h-[480px] md:w-[420px] md:h-[560px] lg:w-[460px] lg:h-[600px] rounded-[29px] overflow-hidden bg-stone-950 border border-white/20">
              
              {/* Layer 1: Base High-Res Real Studio Photo with 3D Depth Scale */}
              <motion.img
                src={avatarUrl}
                alt={name}
                width={480}
                height={640}
                loading="eager"
                style={{ translateZ }}
                className={`w-full h-full object-cover object-top transition-all duration-700 ease-out ${
                  isHovered ? 'scale-105 contrast-110' : 'scale-100'
                } ${
                  holoMode === 'matrix'
                    ? 'hue-rotate-90 saturate-125'
                    : holoMode === 'quantum'
                    ? 'hue-rotate-270 saturate-125'
                    : holoMode === 'cyber'
                    ? 'hue-rotate-180 saturate-125'
                    : 'contrast-105' // natural studio film look
                }`}
              />

              {/* Layer 2: RGB Glitch Split Overlay (On Click Shockwave) */}
              {glitchActive && (
                <>
                  <img
                    src={avatarUrl}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-top mix-blend-screen opacity-70 translate-x-2 -translate-y-1 filter contrast-125 saturate-200 pointer-events-none"
                    style={{ filter: 'drop-shadow(-4px 0px 0px #00f0ff)' }}
                    aria-hidden="true"
                  />
                  <img
                    src={avatarUrl}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-top mix-blend-screen opacity-70 -translate-x-2 translate-y-1 filter contrast-125 saturate-200 pointer-events-none"
                    style={{ filter: 'drop-shadow(4px 0px 0px #ff0055)' }}
                    aria-hidden="true"
                  />
                </>
              )}

              {/* Layer 3: Dynamic Ray-Traced Light Follower (Mouse Spotlight Reflection) */}
              <motion.div
                className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40"
                style={{
                  background: `radial-gradient(circle 320px at ${lightX}% ${lightY}%, rgba(255,255,255,0.95), transparent 70%)`,
                }}
              />

              {/* Layer 4: Vertical Laser Holographic Scan Line */}
              <div className="absolute inset-x-0 h-28 bg-gradient-to-b from-transparent via-amber-400/25 to-transparent -translate-y-full animate-[scan_3.5s_ease-in-out_infinite] pointer-events-none shadow-[0_0_20px_rgba(245,158,11,0.4)]" />

              {/* Layer 5: Studio Cinematic Vignette & Cyber Grid */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Layer 6: Bottom Telemetry & Status HUD Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2.5 font-mono text-xs">
                
                {/* Telemetry Row */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2 text-amber-300 font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                    <span className="tracking-wider">LIVE STUDIO FEED</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-300">
                    <Activity className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span>60 FPS • 4K ULTRA</span>
                  </div>
                </div>

                {/* Heartbeat EKG Pulse Line */}
                <div className="w-full h-4 relative flex items-center overflow-hidden">
                  <svg className="w-full h-full stroke-amber-400 fill-none" viewBox="0 0 200 20">
                    <path
                      d="M 0,10 L 40,10 L 48,2 L 54,18 L 62,6 L 68,14 L 74,10 L 200,10"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-[pulse_2s_infinite]"
                    />
                  </svg>
                </div>

                {/* Mode Switcher Button */}
                <div className="flex items-center justify-between pt-2 border-t border-white/20 text-xs">
                  <span className="text-zinc-400 font-mono">
                    MODE: <strong className="text-white">{holoMode.toUpperCase()}</strong>
                  </span>
                  <button
                    onClick={cycleMode}
                    title="Switch Vision Filter"
                    className="px-3 py-1 rounded-lg bg-stone-900/90 hover:bg-stone-800 border border-amber-500/50 text-amber-200 flex items-center gap-1.5 transition-colors cursor-pointer font-bold shadow-md"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>Switch Vision</span>
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* Floating High-Impact Badges Orbiting around Photo */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-5 -right-6 px-4 py-2 rounded-2xl bg-stone-950/95 border border-amber-500/60 text-amber-200 text-xs font-mono font-bold flex items-center gap-2 shadow-2xl backdrop-blur-xl z-30"
          >
            <Film className="w-4 h-4 text-amber-400" />
            <span>AI Film Director (ICON 2030)</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-5 -left-6 px-4 py-2 rounded-2xl bg-stone-950/95 border border-cyan-400/60 text-cyan-200 text-xs font-mono font-bold flex items-center gap-2 shadow-2xl backdrop-blur-xl z-30"
          >
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>Full-Stack Architect (NOORHUB)</span>
          </motion.div>

          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 -right-8 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-stone-950/90 border border-emerald-400/50 text-emerald-300 text-[11px] font-mono flex items-center gap-1.5 shadow-xl backdrop-blur-xl hidden sm:flex z-30 font-bold"
          >
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span>Virtual Production Set</span>
          </motion.div>

        </motion.div>
      </motion.div>

      {/* Under-Card Instruction Pill */}
      <div className="mt-6 flex items-center gap-2 font-mono text-xs text-stone-700 font-bold">
        <Sparkles className="w-4 h-4 text-amber-700 animate-spin" />
        <span>Click photo to trigger Confetti Shockwave • Switch Vision Filter</span>
      </div>
    </div>
  );
};
