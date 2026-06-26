import React from 'react';
import { ShieldCheck, MapPin, Sparkles, Building, Briefcase, Award } from 'lucide-react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  return (
    <div className="space-y-20 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Editorial Headline */}
      <section className="text-center md:text-left max-w-3xl space-y-4">
        <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block">ABOUT PROPERTY JUNCTION</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
          Your trusted partner in navigating the real estate market.
        </h2>
        <p className="text-zinc-500 text-sm leading-relaxed">
          At Property Junction, we bring years of expertise in the local real estate brokerage market. We connect buyers and sellers to facilitate seamless, transparent, and rewarding property transactions.
        </p>
      </section>

      {/* Grid of Materials & Systems */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Material 1 */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs flex flex-col justify-between hover:border-zinc-350 transition-all">
          <div className="space-y-4">
            <span className="p-3.5 bg-zinc-50 rounded-2xl inline-block text-zinc-950 border border-zinc-200">
              <Building className="w-5 h-5" />
            </span>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-950">Extensive Network</h3>
            <p className="text-zinc-500 text-xs leading-relaxed">
              We leverage an extensive network of builders, property owners, and investors to find the perfect match for our clients, whether you are looking for an apartment, villa, or commercial space.
            </p>
          </div>
        </div>

        {/* Material 2 */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs flex flex-col justify-between hover:border-zinc-350 transition-all">
          <div className="space-y-4">
            <span className="p-3.5 bg-zinc-50 rounded-2xl inline-block text-zinc-950 border border-zinc-200">
              <Briefcase className="w-5 h-5" />
            </span>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-950">Expert Negotiation</h3>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Our seasoned agents negotiate rigorously on your behalf, ensuring you get the best possible valuation, clear terms, and a secure legal framework for your property transaction.
            </p>
          </div>
        </div>

        {/* Material 3 */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs flex flex-col justify-between hover:border-zinc-350 transition-all">
          <div className="space-y-4">
            <span className="p-3.5 bg-zinc-50 rounded-2xl inline-block text-zinc-950 border border-zinc-200">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-950">Trusted Transparency</h3>
            <p className="text-zinc-500 text-xs leading-relaxed">
              We believe in 100% transparency. From property title verifications to comprehensive paperwork handling, we stand by your side until the deed is done safely.
            </p>
          </div>
        </div>
      </section>

      {/* Geographic Hubs Section */}
      <section className="bg-zinc-50 p-8 sm:p-12 rounded-3xl border border-zinc-200 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-[10px] font-mono tracking-widest text-zinc-450 uppercase block">GEOGRAPHIC REACH</span>
          <h3 className="text-2xl font-extrabold tracking-tight text-zinc-950">
            Connecting Thane, Shilphata, and Mumbai.
          </h3>
          <p className="text-zinc-500 text-xs leading-relaxed">
            Our brokerage operations are strategically located to cover major real estate hubs. From the premium avenues of Thane West to the rapidly growing connectivity hubs of Shilphata, we have our ear to the ground.
          </p>

          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <span className="p-2 bg-white rounded-xl border border-zinc-200 text-zinc-900 shrink-0">
                <MapPin className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-zinc-950">Pokhran Road Corridor (Thane West)</h4>
                <p className="text-[11px] text-zinc-500">Premium residential locations with excellent connectivity to major highways.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="p-2 bg-white rounded-xl border border-zinc-200 text-zinc-900 shrink-0">
                <MapPin className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-zinc-950">Kalyan-Shil Phata</h4>
                <p className="text-[11px] text-zinc-500">Upcoming investment hubs overlooking rapid infrastructure expansion.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Showcase */}
        <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl border border-zinc-200 bg-zinc-900 group">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
            alt="Property Junction"
            className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent p-6 flex flex-col justify-end">
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <p className="font-mono text-[10px] tracking-widest uppercase">Expertise & Trust</p>
            </div>
            <p className="text-white/80 text-[11px] mt-1">Guiding you to the right investment.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

