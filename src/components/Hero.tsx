import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Flame, MapPin } from 'lucide-react';
import { getWebContent } from '../contentData';

interface HeroProps {
  onOpenBooking: () => void;
  backgroundImage: string;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, backgroundImage }) => {
  const content = getWebContent();
  
  return (
    <section className="relative w-full h-[35vh] min-h-[320px] md:min-h-[420px] overflow-hidden flex items-center justify-center mt-[70px] md:mt-[80px]">
      {/* Background Cinematic Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Property Junction Luxury Real Estate"
          className="w-full h-full object-cover scale-102 brightness-[0.40] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        {/* Sleek Gradient Overlays representing Deep Luxury Vibe */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-navy/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-black/20" />
      </div>

      {/* Floating Ambient Info Accents */}
      <div className="absolute top-6 right-6 hidden xl:flex items-center gap-3.5 bg-brand-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-brand-white/10">
        <div className="w-2.5 h-2.5 bg-brand-red rounded-full animate-ping" />
        <span className="text-[10px] font-sans font-semibold text-brand-white tracking-widest uppercase">
          0% Brokerage • 20:80 Structures
        </span>
      </div>

      {/* Primary Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col justify-center h-full">
        <div className="max-w-3xl">
          {/* Subtle upper accent */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-2"
          >
            <span className="h-[2px] w-8 bg-brand-red" />
            <span className="text-[10px] font-sans font-bold text-brand-red uppercase tracking-[0.25em]">
              {content.heroUpper}
            </span>
          </motion.div>

          {/* Master Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-belleza font-extrabold text-[#FFFFFF] tracking-tight leading-tight title-tight"
          >
            {content.heroTitle}
          </motion.h1>

          {/* Prompt-mandated detailed Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs sm:text-sm text-zinc-300 max-w-2xl mt-3 leading-relaxed font-belleza tracking-wide"
          >
            {content.heroSub}
          </motion.p>

          {/* Prompt-mandated focused CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={onOpenBooking}
              className="bg-brand-red hover:bg-brand-white hover:text-brand-navy text-white text-xs font-serif font-bold tracking-[0.15em] px-8 py-3.5 rounded-lg transition-all duration-300 cursor-pointer shadow-lg shadow-brand-red/10 border border-transparent hover:border-brand-navy"
              id="hero-cta-book-site-visit-id"
            >
              Book Site Visit
            </button>

            {/* Quick trust metrics */}
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 mt-2 sm:mt-0 sm:ml-2">
              <MapPin className="w-3.5 h-3.5 text-brand-red" />
              <span>Coverage: Shilphata • Thane • Navi Mumbai • Kharghar</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
