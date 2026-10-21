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
          <div className="inline-flex items-center gap-2 font-mono text-xs text-stone-900 font-bold bg-[#dfcfb8] px-3.5 py-1.5 rounded-full border border-[#c8b59b]">
            <Award className="w-4 h-4 text-amber-700" />
            <span>SECTOR 05 // VERIFIED CREDENTIALS & ODYSSEY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-950 tracking-tight font-sans">
            Academic & Technical Milestones
          </h2>
          <p className="text-stone-700 max-w-xl text-sm sm:text-base font-medium">
            Grounded foundations combining classical discipline with modern cloud automation and open-source engineering.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {credentials.map((cred, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#f5ecde] border border-[#c8b59b] flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-stone-600">
                  <span className="flex items-center gap-1 text-stone-950 font-black">
                    <Calendar className="w-3.5 h-3.5 text-stone-800" />
                    <span>{cred.year}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#ebdcc8] border border-[#c8b59b] text-[10px] text-stone-900 font-bold">
                    {cred.category}
                  </span>
                </div>

                <h3 className="text-xl font-black text-stone-950 font-sans">
                  {cred.title}
                </h3>

                <div className="font-mono text-xs text-amber-800 font-bold">
                  {cred.issuer} {cred.board ? `• ${cred.board}` : ''}
                </div>

                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-medium">
                  {cred.highlight}
                </p>
              </div>

              <div className="pt-3 border-t border-[#c8b59b] flex items-center gap-1.5 text-emerald-700 font-mono text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Accomplishment</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
