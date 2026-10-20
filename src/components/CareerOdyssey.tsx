import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Award, Calendar, CheckCircle2 } from 'lucide-react';

export const CareerOdyssey: React.FC = () => {
  const credentials = PORTFOLIO_DATA.credentials;

  return (
    <section id="credentials" className="relative py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-yellow-400">
            <Award className="w-4 h-4" />
            <span>SECTOR 05 // VERIFIED CREDENTIALS & ODYSSEY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Academic & Technical Milestones
          </h2>
          <p className="text-zinc-400 max-w-xl text-sm sm:text-base">
            Grounded foundations combining classical discipline with modern cloud automation and open-source engineering.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {credentials.map((cred, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-zinc-950/70 border border-white/10 flex flex-col justify-between space-y-4 shadow-lg shadow-black/50"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1 text-cyan-400 font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{cred.year}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px]">
                    {cred.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">
                  {cred.title}
                </h3>

                <div className="font-mono text-xs text-purple-300">
                  {cred.issuer} {cred.board ? `• ${cred.board}` : ''}
                </div>

                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {cred.highlight}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-900 flex items-center gap-1.5 text-emerald-400 font-mono text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Accomplishment</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
