import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import {
  Gamepad2,
  Play,
  Trophy,
  Zap,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  Flame,
  Layers,
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { ArcadeModal } from './ArcadeModal';

export const PlayableArcade: React.FC = () => {
  const games = PORTFOLIO_DATA.games;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalGame, setActiveModalGame] = useState<{ id: string; title: string; url?: string } | null>(null);

  // Filter games based on selection
  const filteredGames = games.filter((g) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'fighter') return g.genre.toLowerCase().includes('fight') || g.genre.toLowerCase().includes('combat');
    if (selectedCategory === 'racing') return g.genre.toLowerCase().includes('racing') || g.genre.toLowerCase().includes('driving');
    if (selectedCategory === 'runner') return g.genre.toLowerCase().includes('runner');
    return true;
  });

  // Mini In-Page Retro Cyber Game State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!gameActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 360);
    const height = (canvas.height = 190);

    let playerX = width / 2;
    const playerY = height - 25;
    const playerSize = 14;
    let localScore = 0;
    let dodgeCount = 0;

    const obstacles: { x: number; y: number; speed: number; size: number; color: string }[] = [];

    const handleTouchOrMove = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e && e.cancelable) {
        e.preventDefault();
      }
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientX : (e as MouseEvent).clientX;
      playerX = Math.max(playerSize, Math.min(width - playerSize, clientX - rect.left));
    };

    canvas.addEventListener('mousemove', handleTouchOrMove);
    canvas.addEventListener('touchmove', handleTouchOrMove, { passive: false });
    canvas.addEventListener('touchstart', handleTouchOrMove, { passive: false });

    let frameCount = 0;

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Cyber Grid Lines (Retro Synthwave Style)
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizon glow
      const horizonGlow = ctx.createLinearGradient(0, height - 40, 0, height);
      horizonGlow.addColorStop(0, 'rgba(168, 85, 247, 0.08)');
      horizonGlow.addColorStop(1, 'rgba(0, 240, 255, 0.2)');
      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, height - 40, width, 40);

      // Spawn obstacles with increasing frequency
      frameCount++;
      const spawnInterval = Math.max(16, 26 - Math.floor(localScore / 100));
      if (frameCount % spawnInterval === 0) {
        obstacles.push({
          x: Math.random() * (width - 24) + 12,
          y: -10,
          speed: Math.random() * 2 + 3 + (localScore / 250),
          size: Math.random() * 6 + 12,
          color: Math.random() > 0.5 ? '#a855f7' : '#ec4899',
        });
      }

      // Draw Player Ship (Cyan Vector Jet)
      ctx.fillStyle = '#00f0ff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(playerX, playerY - playerSize);
      ctx.lineTo(playerX - playerSize, playerY + playerSize);
      ctx.lineTo(playerX + playerSize, playerY + playerSize);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;

      // Update & Draw Obstacles
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.y += obs.speed;

        ctx.fillStyle = obs.color;
        ctx.shadowColor = obs.color;
        ctx.shadowBlur = 8;
        ctx.fillRect(obs.x - obs.size / 2, obs.y - obs.size / 2, obs.size, obs.size);
        ctx.shadowBlur = 0;

        // Collision check
        const dist = Math.hypot(playerX - obs.x, playerY - obs.y);
        if (dist < playerSize + obs.size / 2 - 2) {
          setGameOver(true);
          setGameActive(false);
          sound.playClick();
          return;
        }

        // Passed successfully
        if (obs.y > height) {
          obstacles.splice(i, 1);
          dodgeCount++;
          const currentMulti = Math.min(4, 1 + Math.floor(dodgeCount / 10));
          setMultiplier(currentMulti);
          localScore += 10 * currentMulti;
          setScore(localScore);
          setHighScore((prev) => Math.max(prev, localScore));
        }
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleTouchOrMove);
      canvas.removeEventListener('touchmove', handleTouchOrMove);
      canvas.removeEventListener('touchstart', handleTouchOrMove);
    };
  }, [gameActive]);

  const startMiniGame = () => {
    sound.playWarp();
    setScore(0);
    setMultiplier(1);
    setGameOver(false);
    setGameActive(true);
  };

  const handleLaunchExternal = (url: string) => {
    sound.playSuccess();
    confetti({
      particleCount: 65,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#00f0ff', '#f59e0b'],
    });
    window.open(url, '_blank');
  };

  return (
    <section id="arcade" className="relative py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-stone-900 font-bold bg-[#dfcfb8] px-3.5 py-1.5 rounded-full border border-[#c8b59b]">
              <Gamepad2 className="w-4 h-4 text-stone-800" />
              <span>SECTOR 02 // PLAYABLE ARCADE MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-stone-950 tracking-tight font-sans">
              Playable 2D & 3D Games
            </h2>
            <p className="text-stone-700 max-w-xl text-sm sm:text-base font-medium">
              Original browser & mobile games designed by Jubayer Ahmad. Powered by AI Studio combat engines, 3D physics, and high-octane racing loops.
            </p>
          </div>

          {/* In-Browser Retro Arcade Cabinet Pod */}
          <div className="w-full md:w-96 p-4 rounded-3xl bg-zinc-950 border border-purple-500/40 shadow-2xl shadow-purple-950/40">
            <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-purple-300 font-bold">
                <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>CYBER DODGER ARCADE</span>
              </span>
              <div className="flex items-center gap-3">
                <span className="text-yellow-400 font-bold flex items-center gap-1">
                  <Flame className="w-3 h-3" /> {multiplier}x
                </span>
                <span className="text-zinc-400 flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-yellow-400" />
                  <span>HI: {highScore}</span>
                </span>
              </div>
            </div>

            {/* CRT Screen Display with Scanlines */}
            <div className="relative my-2.5 rounded-2xl bg-black border border-purple-900/40 overflow-hidden flex items-center justify-center h-32 shadow-inner">
              <canvas ref={canvasRef} style={{ touchAction: 'none' }} className="w-full h-full block" />
              
              {/* Scanline CRT overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent bg-[length:100%_4px] pointer-events-none" />

              {!gameActive && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-3 text-center">
                  {gameOver ? (
                    <div className="space-y-1.5">
                      <div className="font-mono text-xs font-bold text-rose-400 tracking-wider">
                        CRITICAL COLLISION • FINAL SCORE: {score}
                      </div>
                      <button
                        onClick={startMiniGame}
                        className="px-4 py-1.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-mono text-xs font-bold flex items-center gap-1.5 mx-auto transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-md shadow-purple-900/50"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> RE-ENGAGE
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="font-mono text-xs text-zinc-300 tracking-wide font-semibold">
                        WebGL Reaction Engine
                      </div>
                      <button
                        onClick={startMiniGame}
                        data-cursor="START"
                        className="px-4 py-1.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-black flex items-center gap-1.5 mx-auto transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-md shadow-cyan-400/40"
                      >
                        <Play className="w-3.5 h-3.5 fill-black" /> INSERT COIN / PLAY
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="text-[10px] font-mono text-zinc-500 text-center">
              Swipe or Move Mouse to dodge obstacles • Chain dodges for 4x Multiplier
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-3 font-mono text-xs">
          <span className="text-zinc-500 flex items-center gap-1 mr-2">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>GENRE:</span>
          </span>
          {[
            { id: 'all', label: 'All Titles (5)' },
            { id: 'fighter', label: 'Combat & Fighter (2)' },
            { id: 'racing', label: '3D Racing (2)' },
            { id: 'runner', label: 'Endless Runner (1)' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-mono text-xs ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm shadow-cyan-950/30'
                  : 'bg-zinc-900/70 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Game Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <motion.div
              key={game.id}
              whileHover={{ y: -6 }}
              className="p-6 rounded-3xl bg-zinc-950/80 border border-white/10 hover:border-cyan-500/40 flex flex-col justify-between space-y-4 shadow-xl shadow-black/60 group transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
                    {game.badge || 'Arcade'}
                  </span>
                  <Sparkles className="w-4 h-4 text-zinc-600 group-hover:text-cyan-400 transition-colors" />
                </div>

                <h3 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                  {game.title}
                </h3>
                <div className="font-mono text-xs text-cyan-400 font-semibold">
                  {game.genre}
                </div>

                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {game.description}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-zinc-900">
                <div className="flex flex-wrap gap-1">
                  {game.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800/80 text-zinc-400 text-[11px] font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions: Direct In-Page Play / AI Studio Link / View Code */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {/* Primary In-Browser Play Button (100% Mobile Ready) */}
                  <button
                    onClick={() => {
                      sound.playWarp();
                      setActiveModalGame({
                        id: game.id,
                        title: game.title,
                        url: game.liveUrl,
                      });
                    }}
                    data-cursor="PLAY"
                    className="flex-1 py-3 px-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 text-black font-mono font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-400/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap min-h-[42px]"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>🎮 সরাসরি খেলুন (PLAY)</span>
                  </button>

                  {/* External Google AI Studio Link (Desktop Optimized) */}
                  {game.liveUrl && (
                    <button
                      onClick={() => handleLaunchExternal(game.liveUrl!)}
                      data-cursor="AI STUDIO"
                      title="Open Web App in Google AI Studio (Best on Desktop)"
                      className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-cyan-400/40 text-cyan-300 font-mono text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer min-h-[42px]"
                    >
                      <span className="hidden sm:inline">AI Studio</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* GitHub Source Code */}
                  {game.githubUrl && (
                    <a
                      href={game.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      data-cursor="CODE"
                      title="GitHub Repository"
                      className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer min-h-[42px] flex items-center justify-center"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fullscreen Interactive Playable Game Cabin Modal */}
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
