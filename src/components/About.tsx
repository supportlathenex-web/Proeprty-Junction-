import React from 'react';
import { ShieldCheck, Clock, Award, Landmark, MapPin, BadgeDollarSign, HeartHandshake } from 'lucide-react';
import { getWebContent } from '../contentData';

interface AboutProps {
  onOpenBooking: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenBooking }) => {
  const content = getWebContent();
  
  return (
    <section id="about-section-id" className="py-20 bg-brand-bg relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand-navy/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Title Stack */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-brand-red uppercase mb-3 block">
              {content.aboutUpper}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-belleza font-extrabold text-[#0E2F56] tracking-tight leading-none">
              {content.aboutTitle}
            </h2>
          </div>
          <div className="max-w-md font-sans">
            <p className="text-xs text-zinc-600 leading-relaxed font-light">
              {content.aboutText}
            </p>
          </div>
        </div>

        {/* Bento Grid Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Hero Card within Bento */}
          <div className="md:col-span-2 bg-brand-navy text-white rounded-3xl p-8 md:p-10 flex flex-col justify-between border border-brand-white/10 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-red/10 rounded-full filter blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6 bg-brand-white/10 rounded-full px-4 py-2 w-fit">
              <Award className="w-5 h-5 text-brand-red" />
              <span className="text-xs font-semibold font-sans tracking-wide">
                Property Junction Vibe
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-belleza font-extrabold text-brand-bg tracking-tight mb-4">
                {content.aboutBentoTitle}
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed mb-6 font-sans">
                {content.aboutBentoText}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-xs text-brand-bg/85 font-mono">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-red" />
                  <span>Licensed Agency Network</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-red" />
                  <span>Open 24/7 Consultation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Card */}
          <div className="bg-white rounded-3xl p-8 border border-brand-navy/10 flex flex-col justify-between hover:shadow-xl transition-all duration-300">
            <div>
              <span className="text-zinc-500 font-sans text-xs uppercase tracking-widest block mb-1">
                OPERATIONAL BASE
              </span>
              <h4 className="text-xl font-belleza font-extrabold text-brand-navy tracking-tight mb-4 flex items-start gap-2">
                <MapPin className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                Shop no. 1, M M City, Shilphata
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed font-sans font-light">
                Our modern commercial office is strategically located in Shilphata, Mumbra, serving as the central highway junction connecting Thane West, Kharghar, and greater Navi Mumbai.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-400 font-sans block">Availability Status</span>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 font-sans mt-0.5">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  ONLINE &amp; ACTIVE NOW
                </span>
              </div>
              <button
                onClick={onOpenBooking}
                className="text-xs font-serif font-bold text-brand-navy hover:text-brand-red transition-colors cursor-pointer"
              >
                VISIT THE OFFICE →
              </button>
            </div>
          </div>

          {/* Financial Incentive Card 1: 0% Brokerage */}
          <div className="bg-white rounded-3xl p-8 border border-brand-navy/10 flex flex-col gap-6 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center border border-brand-navy/10 shadow-sm">
              <BadgeDollarSign className="w-6 h-6 text-brand-red" />
            </div>
            <div>
              <h4 className="text-lg font-belleza font-extrabold text-[#0E2F56] tracking-tight">
                0% Brokerage Policy
              </h4>
              <p className="text-xs text-zinc-600 mt-2 leading-relaxed font-sans font-light">
                We believe premium advice shouldn't be penalized. Our physical agency model imposes zero fee percentage requirements on fresh primary developer transactions, saving you significant transaction costs.
              </p>
            </div>
          </div>

          {/* Financial Incentive Card 2: 20:80 Payment Strategy */}
          <div className="bg-white rounded-3xl p-8 border border-brand-navy/10 flex flex-col gap-6 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center border border-brand-navy/10 shadow-sm">
              <Landmark className="w-6 h-6 text-brand-red" />
            </div>
            <div>
              <h4 className="text-lg font-belleza font-extrabold text-[#0E2F56] tracking-tight">
                20:80 Payment Structures
              </h4>
              <p className="text-xs text-zinc-600 mt-2 leading-relaxed font-sans font-light">
                Preserve working capital safely. We partner with vetted high-tier builders to arrange flexible 20:80 schemes where you allocate only 20% upfront and the remainder upon physical handover of your key assets.
              </p>
            </div>
          </div>

          {/* Customer Care Vibe */}
          <div className="bg-white rounded-3xl p-8 border border-brand-navy/10 flex flex-col gap-6 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center border border-brand-navy/10 shadow-sm">
              <HeartHandshake className="w-6 h-6 text-brand-red" />
            </div>
            <div>
              <h4 className="text-lg font-belleza font-extrabold text-[#0E2F56] tracking-tight">
                Complete Site-Transit Assistance
              </h4>
              <p className="text-xs text-zinc-600 mt-2 leading-relaxed font-sans font-light">
                No stress, absolute comfort. We arrange secure transport from your doorstep, coordinate private previews with developer representatives, and explain surrounding social structures (schools, hospitals, road connections) directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
