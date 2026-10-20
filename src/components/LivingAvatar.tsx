import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { Sparkles, Terminal, Code2 } from 'lucide-react';

interface LivingAvatarProps {
  avatarUrl: string;
  name: string;
}

export const LivingAvatar: React.FC<LivingAvatarProps> = ({ avatarUrl, name }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), springConfig);
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);

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
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.4 },
      colors: ['#00f0ff', '#a855f7', '#ffffff'],
    });
  };

  return (
    <div className="relative flex items-center justify-center py-4">
      {/* Dynamic Ambient Aura Pulse */}
      <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-cyan-500/20 via-purple-600/25 to-pink-500/15 blur-3xl animate-pulse pointer-events-none" />

      {/* 3D Perspective Card Container */}
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
        className="relative cursor-pointer group select-none"
      >
        {/* Holographic Border Frame */}
        <div className="relative p-1.5 rounded-3xl bg-gradient-to-br from-cyan-400/40 via-purple-500/30 to-emerald-400/30 shadow-[0_0_40px_rgba(0,240,255,0.25)] transition-all duration-300 group-hover:shadow-[0_0_60px_rgba(168,85,247,0.4)]">
          
          {/* Inner Image Container */}
          <div className="relative w-56 h-64 sm:w-64 sm:h-76 md:w-72 md:h-84 rounded-2xl overflow-hidden bg-zinc-950 border border-white/10">
            {/* The Actual Photo */}
            <img
              src={avatarUrl}
              alt={name}
              className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                isHovered ? 'scale-105 filter contrast-110' : 'scale-100'
              }`}
            />

            {/* Living Hologram Scanline Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent h-16 w-full -translate-y-full animate-[scan_3.5s_ease-in-out_infinite] pointer-events-none" />

            {/* Subtle Glare reflection following mouse */}
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
              style={{
                background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)`,
              }}
            />

            {/* Bottom Cyber Overlay HUD */}
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>ONLINE • ARCHITECT</span>
              </span>
              <span className="text-zinc-400 text-[11px] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span>AI ENTITY</span>
              </span>
            </div>
          </div>
        </div>

        {/* Floating Mini Tech Pills (Orbits) */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-3 -right-4 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-cyan-400/40 text-cyan-300 text-xs font-mono flex items-center gap-1.5 shadow-lg shadow-cyan-950/50 backdrop-blur-md"
        >
          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Full-Stack</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-3 -left-4 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-purple-400/40 text-purple-300 text-xs font-mono flex items-center gap-1.5 shadow-lg shadow-purple-950/50 backdrop-blur-md"
        >
          <Terminal className="w-3.5 h-3.5 text-purple-400" />
          <span>AI Director</span>
        </motion.div>
      </motion.div>
    </div>
  );
};
