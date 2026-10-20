import React, { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/sound';
import { Terminal, X, CornerDownLeft, Sparkles } from 'lucide-react';

interface CyberTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  command: string;
  output: string | React.ReactNode;
}

export const CyberTerminal: React.FC<CyberTerminalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([
    {
      command: 'sys.init',
      output: 'JUBAYER OS v2.6.0 connected. Type "help" to list available commands.',
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    sound.playClick();
    let res: string | React.ReactNode = '';

    switch (trimmed) {
      case 'help':
        res = (
          <div className="space-y-1 text-zinc-300">
            <div>AVAILABLE COMMANDS:</div>
            <div>- <span className="text-cyan-400">about</span>: Developer profile summary</div>
            <div>- <span className="text-cyan-400">skills</span>: Full technical stack</div>
            <div>- <span className="text-cyan-400">saas</span>: NOORHUB SaaS details</div>
            <div>- <span className="text-cyan-400">games</span>: List playable arcade games</div>
            <div>- <span className="text-cyan-400">cinema</span>: ICON 2030 trilogy details</div>
            <div>- <span className="text-cyan-400">github</span>: Open GitHub in new tab</div>
            <div>- <span className="text-cyan-400">contact</span>: Direct communication info</div>
            <div>- <span className="text-cyan-400">clear</span>: Clear terminal screen</div>
          </div>
        );
        break;

      case 'about':
        res = `Jubayer Ahmad | Software Developer & AI Specialist based in Dhaka, Bangladesh. Full-Stack developer specializing in SaaS platforms, browser games, and AI-assisted creative technologies.`;
        break;

      case 'skills':
        res = `LANGUAGES: ${PORTFOLIO_DATA.skills.coreLanguages.join(', ')}\nFRAMEWORKS: ${PORTFOLIO_DATA.skills.frontendFrameworks.join(', ')}\nBACKEND: ${PORTFOLIO_DATA.skills.backendDev.join(', ')}\nAI & CREATIVE: ${PORTFOLIO_DATA.skills.aiAndTools.join(', ')}`;
        break;

      case 'saas':
        res = `NOORHUB: Complete Madrasa & Institute Management SaaS.\nStack: Next.js App Router, TypeScript, Tailwind CSS, Node.js, Cloudflare Tunnel, RBAC Security.\nRepo: https://github.com/Jubayer-AI-Studio/NoorHub-Madrasa-Management-SaaS`;
        break;

      case 'games':
        res = (
          <div className="space-y-1">
            <div>PLAYABLE GAMES:</div>
            {PORTFOLIO_DATA.games.map((g) => (
              <div key={g.id}>
                • <span className="text-purple-400 font-bold">{g.title}</span> ({g.genre}) -{' '}
                {g.liveUrl ? (
                  <a
                    href={g.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 underline"
                  >
                    Launch Play
                  </a>
                ) : (
                  'Engine in Repo'
                )}
              </div>
            ))}
          </div>
        );
        break;

      case 'cinema':
        res = `ICON 2030 TRILOGY:\n- Chapter 1: The Assault\n- Chapter 2: Realm of Ice, Fire & Iron\n- Chapter 3: The Abyss & Avatar Realm\nCredit: "Directed by JUBAYER AI Specialist"\nYouTube: https://www.youtube.com/@jubayeraispecialist`;
        break;

      case 'github':
        window.open(PORTFOLIO_DATA.profile.github, '_blank');
        res = `Opening GitHub profile: ${PORTFOLIO_DATA.profile.github} (21+ Public Repos)`;
        break;

      case 'contact':
        res = `Email: ${PORTFOLIO_DATA.profile.email}\nGitHub: ${PORTFOLIO_DATA.profile.github}\nYouTube: ${PORTFOLIO_DATA.profile.youtube}\nInstagram: ${PORTFOLIO_DATA.profile.instagram}`;
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        res = `Command not recognized: "${cmd}". Type "help" for a list of commands.`;
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output: res }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  const quickCommands = ['help', 'about', 'skills', 'saas', 'games', 'cinema', 'github', 'contact'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-3xl rounded-2xl bg-zinc-950 border border-purple-500/40 shadow-2xl shadow-purple-950/50 flex flex-col overflow-hidden max-h-[85vh]">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800 font-mono text-xs text-zinc-300">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-purple-400" />
            <span className="font-bold text-white">JUBAYER_CYBER_TERMINAL // v2.6</span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Command Pills for easy clicking */}
        <div className="px-4 py-2 bg-zinc-950/90 border-b border-zinc-900 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono">
          <span className="text-zinc-500 flex items-center gap-1 shrink-0">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Quick:</span>
          </span>
          {quickCommands.map((qc) => (
            <button
              key={qc}
              onClick={() => handleCommand(qc)}
              className="px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 text-cyan-300 border border-zinc-800 shrink-0 transition-colors"
            >
              {qc}
            </button>
          ))}
        </div>

        {/* Terminal Body */}
        <div className="p-4 overflow-y-auto flex-1 font-mono text-xs space-y-3 text-zinc-300">
          {history.map((h, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-400">
                <span className="text-zinc-500">&gt;</span>
                <span className="font-bold">{h.command}</span>
              </div>
              <div className="pl-4 text-zinc-300 whitespace-pre-wrap">{h.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Bar */}
        <div className="p-3 bg-zinc-900/60 border-t border-zinc-800 flex items-center gap-2 font-mono text-xs">
          <span className="text-cyan-400 font-bold">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command (e.g. help, saas, games)..."
            className="flex-1 bg-transparent text-white outline-none placeholder:text-zinc-600"
          />
          <button
            onClick={() => handleCommand(input)}
            className="p-1.5 rounded bg-purple-600/30 text-purple-300 hover:bg-purple-600/50"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
