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
} from 'lucide-react';
import { GithubIcon } from './Icons';

export const PlayableArcade: React.FC = () => {
  const games = PORTFOLIO_DATA.games;

  // Mini In-Page Retro Cyber Game State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
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
    const height = (canvas.height = 180);

    let playerX = width / 2;
    const playerY = height - 25;
    const playerSize = 14;
    let localScore = 0;

    const obstacles: { x: number; y: number; speed: number; size: number }[] = [];

    const handleTouchOrMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      playerX = Math.max(playerSize, Math.min(width - playerSize, clientX - rect.left));
    };

    canvas.addEventListener('mousemove', handleTouchOrMove);
    canvas.addEventListener('touchmove', handleTouchOrMove);

    let frameCount = 0;

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Spawn obstacles
      frameCount++;
      if (frameCount % 24 === 0) {
        obstacles.push({
          x: Math.random() * (width - 20) + 10,
          y: -10,
          speed: Math.random() * 2 + 2.5,
          size: Math.random() * 8 + 10,
        });
      }

      // Draw Player Ship
      ctx.fillStyle = '#00f0ff';
      ctx.beginPath();
      ctx.moveTo(playerX, playerY - playerSize);
      ctx.lineTo(playerX - playerSize, playerY + playerSize);
      ctx.lineTo(playerX + playerSize, playerY + playerSize);
      ctx.closePath();
      ctx.fill();

      // Update & Draw Obstacles
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.y += obs.speed;

        ctx.fillStyle = '#a855f7';
        ctx.fillRect(obs.x - obs.size / 2, obs.y - obs.size / 2, obs.size, obs.size);

        // Collision check
        const dist = Math.hypot(playerX - obs.x, playerY - obs.y);
        if (dist < playerSize + obs.size / 2) {
          setGameOver(true);
          setGameActive(false);
          sound.playClick();
          return;
        }

        // Passed successfully
        if (obs.y > height) {
          obstacles.splice(i, 1);
          localScore += 10;
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
    };
  }, [gameActive]);

  const startMiniGame = () => {
    sound.playWarp();
    setScore(0);
    setGameOver(false);
    setGameActive(true);
  };

  const handleLaunchExternal = (url: string) => {
    sound.playSuccess();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });
    window.open(url, '_blank');
  };

  return (
    <section id="arcade" className="relative py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-purple-400">
              <Gamepad2 className="w-4 h-4" />
              <span>SECTOR 02 // PLAYABLE ARCADE MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Playable 2D & 3D Games
            </h2>
            <p className="text-zinc-400 max-w-xl text-sm sm:text-base">
              Original browser & mobile games designed by Jubayer Ahmad. Powered by AI Studio combat engines, 3D physics, and high-octane racing loops.
            </p>
          </div>

          {/* In-Browser Mini Arcade Pod */}
          <div className="w-full md:w-96 p-4 rounded-2xl bg-zinc-950 border border-purple-500/30 shadow-xl shadow-purple-950/20">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-purple-300 font-bold">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>CYBER DODGER MINIGAME</span>
              </span>
              <span className="text-zinc-400 flex items-center gap-1">
                <Trophy className="w-3 h-3 text-yellow-400" />
                <span>HI: {highScore}</span>
              </span>
            </div>

            <div className="relative my-2 rounded-xl bg-black border border-zinc-900 overflow-hidden flex items-center justify-center h-28">
              <canvas ref={canvasRef} className="w-full h-full block" />
              {!gameActive && (
                <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center p-3 text-center">
                  {gameOver ? (
                    <div className="space-y-1">
                      <div className="font-mono text-xs font-bold text-red-400">GAME OVER • SCORE {score}</div>
                      <button
                        onClick={startMiniGame}
                        className="px-3 py-1 rounded bg-purple-500 text-white font-mono text-xs flex items-center gap-1 hover:bg-purple-400 mx-auto cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" /> Retry
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="font-mono text-xs text-zinc-300">Playable Test Chamber</div>
                      <button
                        onClick={startMiniGame}
                        className="px-3 py-1 rounded bg-cyan-400 text-black font-mono text-xs font-bold flex items-center gap-1 hover:bg-cyan-300 mx-auto cursor-pointer"
                      >
                        <Play className="w-3 h-3" /> Quick Play
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="text-[10px] font-mono text-zinc-500 text-center">
              Swipe or Move Mouse to Evade incoming obstacles
            </div>
          </div>
        </div>

        {/* Game Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <motion.div
              key={game.id}
              whileHover={{ y: -6 }}
              className="p-6 rounded-3xl bg-zinc-950/80 border border-white/10 hover:border-purple-500/40 flex flex-col justify-between space-y-4 shadow-xl shadow-black/60 group transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-mono">
                    {game.badge || 'Arcade'}
                  </span>
                  <Sparkles className="w-4 h-4 text-zinc-600 group-hover:text-purple-400 transition-colors" />
                </div>

                <h3 className="text-2xl font-black text-white group-hover:text-purple-300 transition-colors">
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

                {/* Actions: Launch in AI Studio / View Code */}
                <div className="flex items-center gap-2">
                  {game.liveUrl ? (
                    <button
                      onClick={() => handleLaunchExternal(game.liveUrl!)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-900/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Play Now</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  ) : (
                    <div className="flex-1 py-2 px-3 rounded-xl bg-zinc-900 text-zinc-400 text-xs font-mono text-center border border-zinc-800">
                      Engine Source
                    </div>
                  )}

                  {game.githubUrl && (
                    <a
                      href={game.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      title="GitHub Repository"
                      className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <GithubIcon className="w-4 h-4" />
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
