import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code2, Gamepad2, Film, Terminal } from 'lucide-react';

export const InfiniteMarquee: React.FC = () => {
  const items = [
    { text: 'FULL-STACK SOFTWARE DEVELOPER', icon: Code2 },
    { text: 'NOORHUB SAAS ARCHITECT', icon: Terminal },
    { text: '2D & 3D PLAYABLE GAME CREATOR', icon: Gamepad2 },
    { text: 'AI CINEMA DIRECTOR (ICON 2030)', icon: Film },
    { text: 'DHAKA, BANGLADESH', icon: Sparkles },
    { text: 'NEXT.JS • THREE.JS • PYTHON • TAILWIND', icon: Code2 },
  ];

  return (
    <div className="relative w-full py-6 overflow-hidden border-y-2 border-[#c8b59b] bg-[#dfcfb8]/60 backdrop-blur-md select-none my-6">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#EADECA] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#EADECA] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap gap-12 font-mono text-sm tracking-widest text-stone-900 font-black uppercase items-center"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 24,
        }}
      >
        {[...items, ...items, ...items, ...items].map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div key={idx} className="flex items-center gap-4 group cursor-default">
              <span className="text-stone-900 group-hover:text-amber-800 transition-colors">
                {item.text}
              </span>
              <IconComp className="w-4 h-4 text-stone-800" />
              <span className="text-stone-500 font-bold">—</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
