import React, { useState, useEffect, useRef } from 'react';
import { X, RotateCcw, ExternalLink } from 'lucide-react';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface ArcadeModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameId: string;
  gameTitle: string;
  externalUrl?: string;
}

interface Spark {
  x: number;
  y: number;
  life: number;
}

export const ArcadeModal: React.FC<ArcadeModalProps> = ({
  isOpen,
  onClose,
  gameId,
  gameTitle,
  externalUrl,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Fighter Game State
  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(100);
  const [combo, setCombo] = useState(0);
  const [battleMessage, setBattleMessage] = useState('PRESS ATTACK [Z / X / C] TO FIGHT!');
  const [winner, setWinner] = useState<'player' | 'enemy' | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    sound.playWarp();
    // Reset fighter
    setPlayerHp(100);
    setEnemyHp(100);
    setCombo(0);
    setWinner(null);
    setBattleMessage('FIGHT! [Z: Punch | X: Kick | Space: Super Move]');
  }, [isOpen, gameId]);

  // Canvas Retro Fighter Renderer
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = 640);
    const height = (canvas.height = 360);

    let frame = 0;
    const hitSparks: Spark[] = [];

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Arena Background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#090d1c');
      bgGrad.addColorStop(0.7, '#131b30');
      bgGrad.addColorStop(1, '#05070c');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Arena Floor Grid
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, height - 70);
        ctx.lineTo(x + (x - width / 2) * 0.5, height);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(0, height - 70);
      ctx.lineTo(width, height - 70);
      ctx.stroke();

      // Floor Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.beginPath();
      ctx.ellipse(200, height - 65, 45, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(440, height - 65, 45, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Player Fighter (Cyan Warrior)
      const pY = height - 160 + Math.sin(frame * 0.08) * 3;
      ctx.fillStyle = '#00f0ff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 12;
      // Body
      ctx.fillRect(180, pY + 30, 36, 60);
      // Head
      ctx.beginPath();
      ctx.arc(198, pY + 15, 16, 0, Math.PI * 2);
      ctx.fill();
      // Fist / Stance
      ctx.fillRect(215, pY + 45 + Math.sin(frame * 0.15) * 4, 18, 14);
      ctx.shadowBlur = 0;

      // Enemy Fighter (Ruby Ninja)
      const eY = height - 160 + Math.cos(frame * 0.08) * 3;
      ctx.fillStyle = '#f43f5e';
      ctx.shadowColor = '#f43f5e';
      ctx.shadowBlur = 12;
      // Body
      ctx.fillRect(420, eY + 30, 36, 60);
      // Head
      ctx.beginPath();
      ctx.arc(438, eY + 15, 16, 0, Math.PI * 2);
      ctx.fill();
      // Guard stance
      ctx.fillRect(405, eY + 45 + Math.cos(frame * 0.15) * 4, 18, 14);
      ctx.shadowBlur = 0;

      // Hit Spark Particles
      for (let s = hitSparks.length - 1; s >= 0; s--) {
        const spark = hitSparks[s];
        if (spark.life > 0) {
          ctx.fillStyle = '#fef08a';
          ctx.shadowColor = '#fef08a';
          ctx.shadowBlur = 15;
          for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 * i) / 8;
            const r = (10 - spark.life) * 4;
            ctx.fillRect(spark.x + Math.cos(angle) * r, spark.y + Math.sin(angle) * r, 4, 4);
          }
          spark.life--;
          ctx.shadowBlur = 0;
        } else {
          hitSparks.splice(s, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isOpen]);

  // Keyboard controls for game
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (winner) return;

      const key = e.key.toLowerCase();

      if (key === 'z') {
        // Punch
        sound.playClick();
        executePlayerAttack('PUNCH', 12);
      } else if (key === 'x') {
        // Kick
        sound.playHover();
        executePlayerAttack('DRAGON KICK', 18);
      } else if (key === ' ' || key === 'c') {
        // Super move
        sound.playWarp();
        executePlayerAttack('QUANTUM STRIKE', 30);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, enemyHp, winner, playerHp]);

  const executePlayerAttack = (moveName: string, damage: number) => {
    const newEnemyHp = Math.max(0, enemyHp - damage);
    setEnemyHp(newEnemyHp);
    setCombo((c) => c + 1);
    setBattleMessage(`HIT! ${moveName} dealt ${damage} DMG!`);

    if (newEnemyHp === 0) {
      setWinner('player');
      setBattleMessage('KO! VICTORY BY JUBAYER WARRIOR!');
      sound.playSuccess();
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
      return;
    }

    // Enemy Counter-Attack after 350ms
    setTimeout(() => {
      if (newEnemyHp > 0) {
        const enemyDmg = Math.floor(Math.random() * 12) + 6;
        setPlayerHp((prev) => {
          const updated = Math.max(0, prev - enemyDmg);
          if (updated === 0) {
            setWinner('enemy');
            setBattleMessage('DEFEATED! PRESS REPLAY TO TRY AGAIN.');
          }
          return updated;
        });
      }
    }, 400);
  };

  const restartFighter = () => {
    sound.playWarp();
    setPlayerHp(100);
    setEnemyHp(100);
    setCombo(0);
    setWinner(null);
    setBattleMessage('FIGHT! [Z: Punch | X: Kick | Space: Super Move]');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl">
      <div className="relative w-full max-w-4xl rounded-3xl bg-zinc-950 border border-cyan-500/50 shadow-[0_0_80px_rgba(0,240,255,0.3)] overflow-hidden flex flex-col">
        
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-white font-bold text-sm tracking-wider uppercase">
              {gameTitle} // LIVE ARCADE CABIN
            </span>
          </div>

          <div className="flex items-center gap-3">
            {externalUrl && (
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400 text-cyan-300 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>AI Studio Web App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Arcade Screen Body */}
        <div className="relative bg-black p-4 sm:p-6 flex flex-col items-center">
          
          {/* Health Bars HUD */}
          <div className="w-full max-w-2xl mb-4 grid grid-cols-2 gap-4 font-mono text-xs">
            {/* Player Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-cyan-400 font-bold">
                <span>P1: JUBAYER</span>
                <span>{playerHp}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-200"
                  style={{ width: `${playerHp}%` }}
                />
              </div>
            </div>

            {/* Enemy Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-rose-400 font-bold">
                <span>{enemyHp}%</span>
                <span>CPU: CHALLENGER</span>
              </div>
              <div className="w-full h-3 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-l from-red-600 to-rose-400 transition-all duration-200 float-right"
                  style={{ width: `${enemyHp}%` }}
                />
              </div>
            </div>
          </div>

          {/* CRT Game Screen Canvas */}
          <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden border-2 border-zinc-800 shadow-[0_0_40px_rgba(0,0,0,0.8)] bg-black">
            <canvas ref={canvasRef} className="w-full aspect-video block" />
            
            {/* CRT Scanline Filter */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.7)_100%)]" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-400/[0.04] to-transparent bg-[length:100%_4px]" />

            {/* In-Game Announcer Banner */}
            <div className="absolute top-4 inset-x-0 text-center pointer-events-none font-mono font-bold text-xs sm:text-sm text-yellow-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {battleMessage}
            </div>

            {/* Winner Overlay */}
            {winner && (
              <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center space-y-3 z-30 font-mono">
                <div className={`text-2xl sm:text-4xl font-black ${winner === 'player' ? 'text-cyan-300' : 'text-rose-400'}`}>
                  {winner === 'player' ? '★ VICTORY ACHIEVED ★' : 'GAME OVER'}
                </div>
                <div className="text-zinc-400 text-xs">Total Hits: {combo} Strikes Landed</div>
                <button
                  onClick={restartFighter}
                  className="px-6 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer shadow-lg shadow-cyan-400/30"
                >
                  <RotateCcw className="w-4 h-4" /> PLAY REMATCH
                </button>
              </div>
            )}
          </div>

          {/* Virtual On-Screen Game Controls */}
          <div className="w-full max-w-2xl mt-4 pt-3 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <div className="text-zinc-500 text-[11px] hidden sm:block">
              KEYBOARD: <span className="text-cyan-300">[Z]</span> Punch • <span className="text-cyan-300">[X]</span> Kick • <span className="text-cyan-300">[SPACE]</span> Quantum
            </div>

            {/* Interactive Attack Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
              <button
                onClick={() => executePlayerAttack('FAST PUNCH', 12)}
                disabled={Boolean(winner)}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-cyan-500/40 text-cyan-300 font-bold text-xs active:scale-95 transition-transform cursor-pointer disabled:opacity-40"
              >
                PUNCH [Z]
              </button>
              <button
                onClick={() => executePlayerAttack('DRAGON KICK', 18)}
                disabled={Boolean(winner)}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-purple-500/40 text-purple-300 font-bold text-xs active:scale-95 transition-transform cursor-pointer disabled:opacity-40"
              >
                KICK [X]
              </button>
              <button
                onClick={() => executePlayerAttack('QUANTUM STRIKE', 30)}
                disabled={Boolean(winner)}
                className="flex-1 sm:flex-initial px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold text-xs active:scale-95 transition-transform cursor-pointer disabled:opacity-40 shadow-md shadow-cyan-400/25"
              >
                SPECIAL [SPACE]
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
