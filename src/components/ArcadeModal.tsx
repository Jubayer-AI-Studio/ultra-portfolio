import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  RotateCcw,
  ExternalLink,
  Shield,
  Flame,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Info,
} from 'lucide-react';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface ArcadeModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameId: string;
  gameTitle: string;
  externalUrl?: string;
}

export const ArcadeModal: React.FC<ArcadeModalProps> = ({
  isOpen,
  onClose,
  gameId,
  gameTitle,
  externalUrl,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Determine Game Engine Mode
  const isRacing = gameId === 'shafin-nafis-racing-3d' || gameId === 'dhaka-open-world';
  const isRunner = gameId === 'jubayer-legends';
  const isCombat = !isRacing && !isRunner; // 'iron-strike', 'shafin-blade-fighter', or default

  // Shared Game States
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameMessage, setGameMessage] = useState('');
  const [showAiStudioNotice, setShowAiStudioNotice] = useState(false);

  // Combat States
  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(100);
  const [combo, setCombo] = useState(0);
  const [isBlocking, setIsBlocking] = useState(false);

  // Racing States
  const [speedKmh, setSpeedKmh] = useState(95);
  const [isNitro, setIsNitro] = useState(false);
  const [distanceKm, setDistanceKm] = useState(0);

  // Runner States
  const [runnerState, setRunnerState] = useState<'running' | 'jumping' | 'sliding'>('running');

  // Input states referenced in game loop
  const inputRef = useRef({
    left: false,
    right: false,
    nitro: false,
    brake: false,
    jump: false,
    slide: false,
  });

  // Initialize Game on Open or ID Change
  useEffect(() => {
    if (!isOpen) return;
    sound.playWarp();
    setScore(0);
    setGameOver(false);
    setGameWon(false);

    if (isCombat) {
      setPlayerHp(100);
      setEnemyHp(100);
      setCombo(0);
      setIsBlocking(false);
      setGameMessage(
        gameId === 'shafin-blade-fighter'
          ? 'KATANA DUEL READY! TAP SLASH, KICK, OR SPECIAL!'
          : 'FIGHT ACTIVE! TAP PUNCH, KICK, OR QUANTUM STRIKE!'
      );
    } else if (isRacing) {
      setSpeedKmh(95);
      setIsNitro(false);
      setDistanceKm(0);
      setGameMessage('DHAKA EXPRESSWAY! DODGE TRAFFIC & BOOST NITRO!');
    } else if (isRunner) {
      setRunnerState('running');
      setGameMessage('CYBER DHAKA RUNNER! JUMP OVER LASERS & SLIDE BARRIERS!');
    }
  }, [isOpen, gameId, isCombat, isRacing, isRunner]);

  // Main Canvas Game Engine Loop
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

    // Combat Entities
    let hitSparks: { x: number; y: number; color: string; life: number }[] = [];
    let slashArcs: { x: number; y: number; life: number }[] = [];

    // Racing Entities
    let playerCarX = width / 2;
    let roadStripeOffset = 0;
    interface TrafficCar {
      x: number;
      y: number;
      lane: number;
      speed: number;
      color: string;
    }
    const trafficCars: TrafficCar[] = [
      { x: width * 0.35, y: -40, lane: 0, speed: 2.5, color: '#f59e0b' },
      { x: width * 0.65, y: -160, lane: 2, speed: 2.0, color: '#10b981' },
      { x: width * 0.5, y: -280, lane: 1, speed: 3.0, color: '#3b82f6' },
    ];

    // Runner Entities
    let runnerY = height - 90;
    let runnerVy = 0;
    let runnerSlideTimer = 0;
    interface RunnerObstacle {
      x: number;
      type: 'low' | 'high';
      width: number;
      height: number;
    }
    interface Gem {
      x: number;
      y: number;
      collected: boolean;
    }
    const runnerObstacles: RunnerObstacle[] = [
      { x: width + 100, type: 'low', width: 28, height: 35 },
      { x: width + 380, type: 'high', width: 45, height: 50 },
    ];
    const gems: Gem[] = [
      { x: width + 220, y: height - 120, collected: false },
      { x: width + 500, y: height - 140, collected: false },
    ];

    const loop = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // ==========================================
      // ENGINE 1: 2D ARCADE FIGHTER / SWORD DUEL
      // ==========================================
      if (isCombat) {
        // Sky Background with Cyber Sunset
        const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
        bgGrad.addColorStop(0, '#0c1026');
        bgGrad.addColorStop(0.65, '#221538');
        bgGrad.addColorStop(1, '#080811');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Synthwave Grid Arena Floor
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
        ctx.lineWidth = 1;
        for (let x = 0; x < width; x += 36) {
          ctx.beginPath();
          ctx.moveTo(x, height - 70);
          ctx.lineTo(x + (x - width / 2) * 0.6, height);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.moveTo(0, height - 70);
        ctx.lineTo(width, height - 70);
        ctx.stroke();

        // Shadows
        ctx.fillStyle = 'rgba(0,0,0,0.45)';
        ctx.beginPath();
        ctx.ellipse(190, height - 65, 45, 12, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(450, height - 65, 45, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Player Fighter (Cyan Warrior / Katana Master)
        const pY = height - 165 + Math.sin(frame * 0.08) * 3;
        ctx.fillStyle = '#00f0ff';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = isBlocking ? 20 : 12;

        // Player Body
        ctx.fillRect(172, pY + 28, 36, 62);
        // Head
        ctx.beginPath();
        ctx.arc(190, pY + 14, 16, 0, Math.PI * 2);
        ctx.fill();

        if (gameId === 'shafin-blade-fighter') {
          // Katana Blade
          ctx.strokeStyle = '#fef08a';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(212, pY + 50);
          ctx.lineTo(250, pY + 30 + Math.sin(frame * 0.12) * 5);
          ctx.stroke();
        } else {
          // Boxing Stance
          ctx.fillRect(208, pY + 45 + Math.sin(frame * 0.14) * 4, 18, 14);
        }

        // Shield aura if blocking
        if (isBlocking) {
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(190, pY + 45, 45, -Math.PI / 2, Math.PI / 2);
          ctx.stroke();
        }
        ctx.shadowBlur = 0;

        // Enemy Fighter (Ruby Challenger)
        const eY = height - 165 + Math.cos(frame * 0.08) * 3;
        ctx.fillStyle = '#f43f5e';
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 12;
        // Enemy Body
        ctx.fillRect(432, eY + 28, 36, 62);
        // Head
        ctx.beginPath();
        ctx.arc(450, eY + 14, 16, 0, Math.PI * 2);
        ctx.fill();
        // Guard / Weapon
        ctx.fillRect(414, eY + 45 + Math.cos(frame * 0.14) * 4, 18, 14);
        ctx.shadowBlur = 0;

        // Slash Arcs
        for (let a = slashArcs.length - 1; a >= 0; a--) {
          const arc = slashArcs[a];
          ctx.strokeStyle = `rgba(254, 240, 138, ${arc.life / 10})`;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(arc.x, arc.y, 45, -0.6, 0.8);
          ctx.stroke();
          arc.life--;
          if (arc.life <= 0) slashArcs.splice(a, 1);
        }

        // Hit Sparks
        for (let s = hitSparks.length - 1; s >= 0; s--) {
          const spark = hitSparks[s];
          ctx.fillStyle = spark.color;
          ctx.shadowColor = spark.color;
          ctx.shadowBlur = 12;
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI * 2 * i) / 6;
            const r = (10 - spark.life) * 4;
            ctx.fillRect(spark.x + Math.cos(angle) * r, spark.y + Math.sin(angle) * r, 4, 4);
          }
          spark.life--;
          ctx.shadowBlur = 0;
          if (spark.life <= 0) hitSparks.splice(s, 1);
        }
      }

      // ==========================================
      // ENGINE 2: 3D TURBO HIGHWAY RACER
      // ==========================================
      else if (isRacing) {
        // Highway Sky & Horizon
        const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.45);
        skyGrad.addColorStop(0, '#0284c7');
        skyGrad.addColorStop(1, '#93c5fd');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, width, height * 0.45);

        // Distant Dhaka Skyline silhouette
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(40, height * 0.35, 30, 40);
        ctx.fillRect(75, height * 0.3, 40, 60);
        ctx.fillRect(120, height * 0.38, 25, 25);
        ctx.fillRect(width - 160, height * 0.32, 50, 50);
        ctx.fillRect(width - 100, height * 0.28, 35, 70);

        // Green Grass Field
        ctx.fillStyle = '#15803d';
        ctx.fillRect(0, height * 0.45, width, height * 0.55);

        // Perspective Highway Road
        ctx.fillStyle = '#334155';
        ctx.beginPath();
        ctx.moveTo(width * 0.42, height * 0.45);
        ctx.lineTo(width * 0.58, height * 0.45);
        ctx.lineTo(width * 0.85, height);
        ctx.lineTo(width * 0.15, height);
        ctx.closePath();
        ctx.fill();

        // Road Curbs
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(width * 0.42, height * 0.45);
        ctx.lineTo(width * 0.15, height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(width * 0.58, height * 0.45);
        ctx.lineTo(width * 0.85, height);
        ctx.stroke();

        // Road Lane Stripes Animation
        const currentSpeed = inputRef.current.nitro ? 12 : inputRef.current.brake ? 3 : 6;
        roadStripeOffset = (roadStripeOffset + currentSpeed) % 40;

        ctx.strokeStyle = '#f8fafc';
        ctx.lineWidth = 4;
        ctx.setLineDash([20, 20]);
        ctx.lineDashOffset = -roadStripeOffset;

        // Center line
        ctx.beginPath();
        ctx.moveTo(width * 0.5, height * 0.45);
        ctx.lineTo(width * 0.5, height);
        ctx.stroke();
        ctx.setLineDash([]);

        // Handle Player Steer Input
        if (inputRef.current.left) {
          playerCarX = Math.max(width * 0.22, playerCarX - 4.5);
        }
        if (inputRef.current.right) {
          playerCarX = Math.min(width * 0.78, playerCarX + 4.5);
        }

        // Draw Traffic Cars
        trafficCars.forEach((tc) => {
          tc.y += currentSpeed * 0.5 + tc.speed;
          if (tc.y > height + 50) {
            tc.y = -60 - Math.random() * 100;
            const lanes = [width * 0.32, width * 0.5, width * 0.68];
            tc.x = lanes[Math.floor(Math.random() * lanes.length)];
          }

          // Perspective scale
          const progress = Math.max(0.1, Math.min(1, tc.y / height));
          const w = 32 * progress;
          const h = 48 * progress;

          if (tc.y > height * 0.4) {
            ctx.fillStyle = tc.color;
            ctx.shadowColor = tc.color;
            ctx.shadowBlur = 8;
            ctx.fillRect(tc.x - w / 2, tc.y, w, h);
            // Windshield
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(tc.x - w / 2 + 4, tc.y + 8, w - 8, h * 0.25);
            ctx.shadowBlur = 0;

            // Collision Check with Player
            if (
              Math.abs(playerCarX - tc.x) < 28 &&
              Math.abs(height - 65 - tc.y) < 32
            ) {
              sound.playClick();
              setGameMessage('CRASH! WATCH OUT FOR HIGHWAY TRAFFIC!');
              setSpeedKmh(45);
              tc.y = height + 100;
            }
          }
        });

        // Player Red Sports Roadster
        const pCarY = height - 65;
        ctx.fillStyle = '#dc2626';
        ctx.shadowColor = inputRef.current.nitro ? '#00f0ff' : '#dc2626';
        ctx.shadowBlur = inputRef.current.nitro ? 25 : 12;
        // Body
        ctx.fillRect(playerCarX - 22, pCarY, 44, 55);
        // Cockpit
        ctx.fillStyle = '#09090b';
        ctx.fillRect(playerCarX - 16, pCarY + 14, 32, 22);
        // Taillights
        ctx.fillStyle = '#f87171';
        ctx.fillRect(playerCarX - 18, pCarY + 50, 8, 4);
        ctx.fillRect(playerCarX + 10, pCarY + 50, 8, 4);

        // Nitro Flame Trail
        if (inputRef.current.nitro) {
          ctx.fillStyle = '#00f0ff';
          ctx.beginPath();
          ctx.moveTo(playerCarX - 12, pCarY + 55);
          ctx.lineTo(playerCarX - 6, pCarY + 75 + Math.random() * 10);
          ctx.lineTo(playerCarX, pCarY + 55);
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(playerCarX, pCarY + 55);
          ctx.lineTo(playerCarX + 6, pCarY + 75 + Math.random() * 10);
          ctx.lineTo(playerCarX + 12, pCarY + 55);
          ctx.fill();
        }
        ctx.shadowBlur = 0;

        // Mileage & Speed update
        if (frame % 10 === 0) {
          const calcSpeed = inputRef.current.nitro ? 175 : inputRef.current.brake ? 55 : 110;
          setSpeedKmh(calcSpeed);
          setDistanceKm((prev) => +(prev + 0.05).toFixed(2));
          setScore((s) => s + (inputRef.current.nitro ? 25 : 10));
        }
      }

      // ==========================================
      // ENGINE 3: CYBER DHAKA ENDLESS RUNNER
      // ==========================================
      else if (isRunner) {
        // Futuristic Cyber Skyline
        const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
        skyGrad.addColorStop(0, '#090514');
        skyGrad.addColorStop(0.7, '#1f1035');
        skyGrad.addColorStop(1, '#05020a');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, width, height);

        // Neon City Backdrop
        ctx.fillStyle = '#311042';
        for (let b = 0; b < 8; b++) {
          const bh = 90 + (b * 27) % 70;
          ctx.fillRect(b * 85, height - 80 - bh, 65, bh);
        }

        // Running Platform Floor
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, height - 70, width, 70);
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, height - 70);
        ctx.lineTo(width, height - 70);
        ctx.stroke();

        // Runner Physics (Gravity & Jump)
        const groundY = height - 120;
        if (runnerY < groundY || runnerVy !== 0) {
          runnerVy += 0.85; // Gravity
          runnerY += runnerVy;
          if (runnerY >= groundY) {
            runnerY = groundY;
            runnerVy = 0;
            if (runnerState === 'jumping') setRunnerState('running');
          }
        }

        // Slide timer
        if (runnerSlideTimer > 0) {
          runnerSlideTimer--;
          if (runnerSlideTimer === 0) setRunnerState('running');
        }

        // Handle Jump Input
        if (inputRef.current.jump && runnerY >= groundY) {
          runnerVy = -13.5;
          setRunnerState('jumping');
          sound.playWarp();
          inputRef.current.jump = false;
        }

        // Handle Slide Input
        if (inputRef.current.slide && runnerY >= groundY) {
          runnerSlideTimer = 35;
          setRunnerState('sliding');
          sound.playClick();
          inputRef.current.slide = false;
        }

        // Runner Character (Cyan Cyber Ninja)
        const runnerX = 110;
        ctx.fillStyle = '#00f0ff';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 15;

        if (runnerState === 'sliding') {
          // Crouched sliding shape
          ctx.fillRect(runnerX - 10, runnerY + 25, 48, 22);
          ctx.beginPath();
          ctx.arc(runnerX + 42, runnerY + 36, 9, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Standing / Jumping runner
          ctx.fillRect(runnerX, runnerY + 12, 26, 38);
          ctx.beginPath();
          ctx.arc(runnerX + 13, runnerY + 2, 11, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;

        // Obstacles (Spikes / Lasers / Flying Drones)
        runnerObstacles.forEach((obs) => {
          obs.x -= 5.5;
          if (obs.x < -60) {
            obs.x = width + Math.random() * 220 + 80;
            obs.type = Math.random() > 0.5 ? 'low' : 'high';
          }

          if (obs.type === 'low') {
            // Low Barrier (Must Jump Over)
            ctx.fillStyle = '#ef4444';
            ctx.shadowColor = '#ef4444';
            ctx.shadowBlur = 10;
            ctx.fillRect(obs.x, height - 70 - obs.height, obs.width, obs.height);
            ctx.shadowBlur = 0;

            // Collision check
            if (
              runnerX + 20 > obs.x &&
              runnerX < obs.x + obs.width &&
              runnerY + 45 > height - 70 - obs.height
            ) {
              sound.playClick();
              setGameMessage('OUCH! JUMP TO CLEAR LOW BARRIERS!');
              obs.x = width + 100;
            }
          } else {
            // High Laser Bar (Must Slide Under)
            ctx.fillStyle = '#eab308';
            ctx.shadowColor = '#eab308';
            ctx.shadowBlur = 12;
            ctx.fillRect(obs.x, height - 130, obs.width, 16);
            ctx.shadowBlur = 0;

            // Collision check (hits if not sliding)
            if (
              runnerX + 20 > obs.x &&
              runnerX < obs.x + obs.width &&
              runnerState !== 'sliding'
            ) {
              sound.playClick();
              setGameMessage('LASER HIT! SLIDE UNDER HIGH BARRIERS!');
              obs.x = width + 120;
            }
          }
        });

        // Collectible Gems
        gems.forEach((gem) => {
          gem.x -= 5.5;
          if (gem.x < -40) {
            gem.x = width + Math.random() * 300 + 100;
            gem.collected = false;
          }

          if (!gem.collected) {
            ctx.fillStyle = '#38bdf8';
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 14;
            ctx.beginPath();
            ctx.arc(gem.x, gem.y, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            // Collect check
            if (Math.hypot(runnerX + 13 - gem.x, runnerY + 20 - gem.y) < 26) {
              gem.collected = true;
              sound.playSuccess();
              setScore((s) => s + 50);
            }
          }
        });

        if (frame % 8 === 0) {
          setScore((s) => s + 5);
        }
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(animId);
  }, [isOpen, gameId, isCombat, isRacing, isRunner, isBlocking, runnerState]);

  // Combat Attack Trigger
  const triggerAttack = (type: 'punch' | 'kick' | 'special') => {
    if (gameOver || gameWon) return;

    let damage = 12;
    let label = 'PUNCH';
    let sfx = sound.playClick;

    if (type === 'kick') {
      damage = 18;
      label = gameId === 'shafin-blade-fighter' ? 'KATANA SLASH' : 'DRAGON KICK';
      sfx = sound.playHover;
    } else if (type === 'special') {
      damage = 32;
      label = 'QUANTUM STRIKE';
      sfx = sound.playWarp;
    }

    sfx();
    const nextEnemyHp = Math.max(0, enemyHp - damage);
    setEnemyHp(nextEnemyHp);
    setCombo((c) => c + 1);
    setScore((s) => s + damage * 15);
    setGameMessage(`HIT! ${label} DEALT ${damage} DAMAGE!`);

    // Enemy Defeated
    if (nextEnemyHp <= 0) {
      setGameWon(true);
      setGameMessage('KO! VICTORY BY JUBAYER WARRIOR!');
      sound.playSuccess();
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } });
      return;
    }

    // Enemy Counter-Attack
    setTimeout(() => {
      if (nextEnemyHp > 0 && !isBlocking) {
        const enemyDmg = Math.floor(Math.random() * 12) + 6;
        setPlayerHp((prev) => {
          const next = Math.max(0, prev - enemyDmg);
          if (next <= 0) {
            setGameOver(true);
            setGameMessage('DEFEATED! TAP REMATCH TO FIGHT AGAIN.');
          }
          return next;
        });
      }
    }, 450);
  };

  const restartGame = () => {
    sound.playWarp();
    setScore(0);
    setGameOver(false);
    setGameWon(false);
    if (isCombat) {
      setPlayerHp(100);
      setEnemyHp(100);
      setCombo(0);
      setIsBlocking(false);
      setGameMessage('ROUND RESTARTED! FIGHT!');
    } else if (isRacing) {
      setSpeedKmh(95);
      setDistanceKm(0);
      setGameMessage('RACE RESTARTED! GO GO GO!');
    } else if (isRunner) {
      setRunnerState('running');
      setGameMessage('RUN RESTARTED! SURVIVE!');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-2xl overflow-y-auto">
      {/* Modal Dialog Window */}
      <div className="relative w-full max-w-4xl my-auto rounded-3xl bg-zinc-950 border border-cyan-500/50 shadow-[0_0_80px_rgba(0,240,255,0.25)] overflow-hidden flex flex-col font-sans">
        
        {/* Top Header Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
            <div className="truncate">
              <span className="text-white font-black text-sm tracking-wide uppercase">
                {gameTitle}
              </span>
              <span className="hidden sm:inline text-zinc-400 text-xs ml-2">
                // 100% IN-BROWSER & MOBILE PLAYABLE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {externalUrl && (
              <button
                onClick={() => setShowAiStudioNotice(true)}
                className="px-2.5 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Google AI Studio Desktop Information"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">AI Studio Link</span>
              </button>
            )}

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              title="Close Arcade Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* AI Studio Desktop Notice Popover if User taps AI Studio Link */}
        {showAiStudioNotice && (
          <div className="p-4 bg-amber-950/90 border-b border-amber-500/40 text-amber-200 text-xs flex items-start justify-between gap-3 font-sans">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <strong className="text-white block font-bold mb-0.5">
                  মোবাইল ব্যবহারকারীদের জন্য নির্দেশনা:
                </strong>
                Google AI Studio মূলত কম্পিউটার স্ক্রিনের জন্য ডিজাইন করা। আপনি যদি সরাসরি মোবাইল ফোন থেকে খেলতে চান, তবে কোনো এক্সটার্নাল লিংকে যাওয়ার প্রয়োজন নেই—<strong>নিচের স্ক্রিনেই সম্পূর্ণ গেমটি মোবাইলে ১০০% স্মুথলি খেলা যাচ্ছে!</strong>
                {externalUrl && (
                  <div className="mt-2">
                    <a
                      href={externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono text-[11px]"
                    >
                      <span>ডেস্কটপ এআই স্টুডিও ওপেন করুন</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => setShowAiStudioNotice(false)}
              className="p-1 text-amber-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Main Arcade Arena Viewport */}
        <div className="p-3 sm:p-6 bg-black flex flex-col items-center select-none">
          
          {/* Top HUD Stats Bar */}
          <div className="w-full max-w-2xl mb-3 flex items-center justify-between text-xs font-mono text-zinc-400">
            {isCombat ? (
              <div className="w-full grid grid-cols-2 gap-4">
                {/* Player 1 Health Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-cyan-300 font-bold">
                    <span>P1: JUBAYER</span>
                    <span>{playerHp}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-200"
                      style={{ width: `${playerHp}%` }}
                    />
                  </div>
                </div>

                {/* Challenger Health Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-rose-400 font-bold">
                    <span>{enemyHp}%</span>
                    <span>CPU: CHALLENGER</span>
                  </div>
                  <div className="h-3 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-l from-red-600 to-rose-400 transition-all duration-200 float-right"
                      style={{ width: `${enemyHp}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : isRacing ? (
              <div className="w-full flex items-center justify-between px-2 bg-zinc-900/60 p-2 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-2 text-red-500 font-bold">
                  <Flame className={`w-4 h-4 ${isNitro ? 'animate-bounce text-cyan-400' : ''}`} />
                  <span>SPEED: {speedKmh} KM/H</span>
                </div>
                <div className="text-amber-400 font-bold">DISTANCE: {distanceKm} KM</div>
                <div className="text-cyan-400 font-bold">SCORE: {score}</div>
              </div>
            ) : (
              <div className="w-full flex items-center justify-between px-2 bg-zinc-900/60 p-2 rounded-xl border border-zinc-800">
                <div className="text-purple-400 font-bold">MODE: CYBER RUNNER</div>
                <div className="text-yellow-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> SCORE: {score}
                </div>
                <div className="text-zinc-400">STATE: {runnerState.toUpperCase()}</div>
              </div>
            )}
          </div>

          {/* CRT Game Screen Canvas Container */}
          <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden border-2 border-zinc-800 shadow-[0_0_40px_rgba(0,0,0,0.8)] bg-black">
            <canvas
              ref={canvasRef}
              className="w-full aspect-video block"
              style={{ touchAction: 'none' }}
            />

            {/* CRT Scanline Filter Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.6)_100%)]" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-400/[0.03] to-transparent bg-[length:100%_4px]" />

            {/* In-Game Announcer Banner */}
            <div className="absolute top-3 inset-x-2 text-center pointer-events-none font-mono font-black text-[11px] sm:text-xs text-yellow-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {gameMessage}
            </div>

            {/* Victory / Defeat Overlay */}
            {(gameWon || gameOver) && (
              <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-4 space-y-3 z-30 font-mono">
                <div
                  className={`text-2xl sm:text-4xl font-black ${
                    gameWon ? 'text-cyan-300 animate-pulse' : 'text-rose-500'
                  }`}
                >
                  {gameWon ? '★ VICTORY ACHIEVED ★' : 'GAME OVER'}
                </div>
                <div className="text-zinc-300 text-xs sm:text-sm">
                  Final Score: {score} Points {isCombat ? `• Combos: ${combo}` : ''}
                </div>
                <button
                  onClick={restartGame}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-black text-xs flex items-center gap-2 shadow-lg shadow-cyan-400/30 cursor-pointer active:scale-95 transition-transform"
                >
                  <RotateCcw className="w-4 h-4" /> PLAY REMATCH
                </button>
              </div>
            )}
          </div>

          {/* VIRTUAL MOBILE-FIRST ON-SCREEN TOUCH CONTROLS */}
          <div className="w-full max-w-2xl mt-4 pt-3 border-t border-zinc-900 flex flex-col items-center gap-3 font-mono text-xs">
            
            {/* Control Instructions Legend */}
            <div className="text-[11px] text-zinc-400 text-center">
              {isCombat && 'মোবাইল টাচ কন্ট্রোল: নিচের বাটনগুলোতে ট্যাপ করে কম্বো অ্যাটাক দিন'}
              {isRacing && 'মোবাইল টাচ কন্ট্রোল: ◀ বামে / ▶ ডানে স্টিয়ার করুন এবং 🔥 নাইট্রো বুস্ট চাপুন'}
              {isRunner && 'মোবাইল টাচ কন্ট্রোল: ⬆️ জাম্প করুন অথবা ⬇️ স্লাইড করে ব্যারিয়ার পার হোন'}
            </div>

            {/* Combat Mobile Action Touchpad */}
            {isCombat && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 w-full">
                <button
                  onClick={() => triggerAttack('punch')}
                  disabled={gameOver || gameWon}
                  className="p-3.5 rounded-2xl bg-zinc-900 active:bg-zinc-800 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform cursor-pointer disabled:opacity-40 shadow-md min-h-[52px]"
                >
                  <span className="text-base">👊</span>
                  <span>{gameId === 'shafin-blade-fighter' ? 'স্ল্যাশ [PUNCH]' : 'পাঞ্চ [PUNCH]'}</span>
                </button>

                <button
                  onClick={() => triggerAttack('kick')}
                  disabled={gameOver || gameWon}
                  className="p-3.5 rounded-2xl bg-zinc-900 active:bg-zinc-800 border border-purple-500/40 text-purple-300 font-bold text-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform cursor-pointer disabled:opacity-40 shadow-md min-h-[52px]"
                >
                  <span className="text-base">🦶</span>
                  <span>{gameId === 'shafin-blade-fighter' ? 'কাটানা [KICK]' : 'কিক [KICK]'}</span>
                </button>

                <button
                  onClick={() => triggerAttack('special')}
                  disabled={gameOver || gameWon}
                  className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black text-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform cursor-pointer disabled:opacity-40 shadow-lg shadow-cyan-400/25 min-h-[52px]"
                >
                  <span className="text-base">⚡</span>
                  <span>স্পেশাল মুভ</span>
                </button>

                <button
                  onTouchStart={() => setIsBlocking(true)}
                  onTouchEnd={() => setIsBlocking(false)}
                  onMouseDown={() => setIsBlocking(true)}
                  onMouseUp={() => setIsBlocking(false)}
                  className={`col-span-3 sm:col-span-1 p-3.5 rounded-2xl border font-bold text-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer min-h-[52px] ${
                    isBlocking
                      ? 'bg-blue-600 border-blue-400 text-white scale-105'
                      : 'bg-zinc-900 border-zinc-700 text-zinc-300'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>{isBlocking ? 'BLOCKING!' : 'শিল্ড ব্লক'}</span>
                </button>
              </div>
            )}

            {/* Racing Mobile Action Touchpad */}
            {isRacing && (
              <div className="flex items-center justify-between w-full gap-2">
                {/* Left Steering Thumb */}
                <div className="flex items-center gap-2">
                  <button
                    onTouchStart={() => (inputRef.current.left = true)}
                    onTouchEnd={() => (inputRef.current.left = false)}
                    onMouseDown={() => (inputRef.current.left = true)}
                    onMouseUp={() => (inputRef.current.left = false)}
                    className="w-16 h-14 rounded-2xl bg-zinc-900 active:bg-zinc-800 border border-slate-700 text-white flex items-center justify-center font-black active:scale-90 cursor-pointer shadow-lg"
                    title="Steer Left"
                  >
                    <ChevronLeft className="w-7 h-7 text-cyan-400" />
                  </button>
                  <button
                    onTouchStart={() => (inputRef.current.right = true)}
                    onTouchEnd={() => (inputRef.current.right = false)}
                    onMouseDown={() => (inputRef.current.right = true)}
                    onMouseUp={() => (inputRef.current.right = false)}
                    className="w-16 h-14 rounded-2xl bg-zinc-900 active:bg-zinc-800 border border-slate-700 text-white flex items-center justify-center font-black active:scale-90 cursor-pointer shadow-lg"
                    title="Steer Right"
                  >
                    <ChevronRight className="w-7 h-7 text-cyan-400" />
                  </button>
                </div>

                {/* Center / Right Speed Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onTouchStart={() => {
                      inputRef.current.nitro = true;
                      setIsNitro(true);
                      sound.playNitroBoost();
                    }}
                    onTouchEnd={() => {
                      inputRef.current.nitro = false;
                      setIsNitro(false);
                    }}
                    onMouseDown={() => {
                      inputRef.current.nitro = true;
                      setIsNitro(true);
                      sound.playNitroBoost();
                    }}
                    onMouseUp={() => {
                      inputRef.current.nitro = false;
                      setIsNitro(false);
                    }}
                    className={`px-5 h-14 rounded-2xl border text-white font-bold flex items-center gap-2 active:scale-95 transition-all shadow-lg cursor-pointer ${
                      isNitro
                        ? 'bg-cyan-500 border-white text-black scale-105 shadow-cyan-400/50'
                        : 'bg-gradient-to-r from-red-600 to-rose-600 border-red-500'
                    }`}
                  >
                    <Flame className="w-5 h-5" />
                    <span>NITRO BOOST</span>
                  </button>

                  <button
                    onTouchStart={() => (inputRef.current.brake = true)}
                    onTouchEnd={() => (inputRef.current.brake = false)}
                    onMouseDown={() => (inputRef.current.brake = true)}
                    onMouseUp={() => (inputRef.current.brake = false)}
                    className="w-16 h-14 rounded-2xl bg-zinc-900 active:bg-zinc-800 border border-amber-600/50 text-amber-300 font-bold flex items-center justify-center text-xs active:scale-90 cursor-pointer"
                  >
                    BRAKE
                  </button>
                </div>
              </div>
            )}

            {/* Runner Mobile Action Touchpad */}
            {isRunner && (
              <div className="grid grid-cols-2 gap-3 w-full">
                <button
                  onClick={() => (inputRef.current.jump = true)}
                  className="p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-purple-900/40 cursor-pointer min-h-[54px]"
                >
                  <ArrowUp className="w-5 h-5" />
                  <span>JUMP (লাফ দিন)</span>
                </button>

                <button
                  onClick={() => (inputRef.current.slide = true)}
                  className="p-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-purple-500/50 text-purple-300 font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer min-h-[54px]"
                >
                  <ArrowDown className="w-5 h-5" />
                  <span>SLIDE (স্লাইড করুন)</span>
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
