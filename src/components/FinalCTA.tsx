import React from 'react';
import { motion } from 'motion/react';
import { Phone, CheckCircle2, MessageSquare, Mail, Award, Flame } from 'lucide-react';

interface FinalCTAProps {
  onOpenBooking: () => void;
  backgroundImage: string;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenBooking, backgroundImage }) => {
  return (
    <section className="relative w-full py-28 px-4 sm:px-6 overflow-hidden flex items-center justify-center">
      {/* Cinematic Twilight Penthouse Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Cinematic Real Estate Property Interior"
          className="w-full h-full object-cover scale-102 brightness-[0.35] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        {/* Shading gradients to represent the exclusive nocturnal luxury mood */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-navy/60 to-brand-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/75 via-transparent to-brand-black/75" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
        {/* Dynamic micro upper banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 bg-brand-red/10 border border-brand-red/30 rounded-full px-4 py-2 mb-6"
        >
          <Award className="w-4 h-4 text-brand-red" />
          <span className="text-[10px] font-sans font-extrabold tracking-[0.2em] text-[#FFFFFF] uppercase">
            Maharashtra RERA Registered Consultants
          </span>
        </motion.div>

        {/* Emotionally Resonant Headliner */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-belleza font-extrabold text-[#FFFFFF] tracking-tight leading-none title-tight max-w-4xl mx-auto"
        >
          Your Gateway to <span className="text-zinc-300">Premium Living</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs sm:text-sm text-zinc-300 max-w-2xl mx-auto mt-4 leading-relaxed font-sans font-light"
        >
          Experience premium real estate advisory with <strong>0% Brokerage</strong>, verified <strong>20:80 subvention payment codes</strong>, and complimentary luxury doorstep site transit. Our certified Shilphata Mumbra Thane advisory coordinates 100% of the negotiations, paperwork and inspections seamlessly.
        </motion.p>

        {/* Intertwined Luxury Action Bars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto"
        >
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto bg-brand-red hover:bg-[#FFFFFF] hover:text-[#0E2F56] text-white text-xs font-serif font-bold tracking-[0.15em] px-10 py-4.5 rounded-lg transition-all duration-300 cursor-pointer shadow-lg shadow-brand-red/25"
            id="final-cta-request-trip"
          >
            BOOK SITE VISIT DIRECTLY
          </button>

          <a
            href="tel:+918668644479"
            className="w-full sm:w-auto bg-brand-white/10 hover:bg-brand-white/25 text-white border border-white/20 text-xs font-sans font-semibold py-4.5 px-8 rounded-lg duration-200 flex items-center justify-center gap-2"
          >
            <Phone className="w-4.5 h-4.5 text-brand-red shrink-0 animate-bounce" />
            <span>CONNECT WITH ADVISOR</span>
          </a>
        </motion.div>

        {/* Direct Trust Features Footer Inside Panel */}
        <div className="mt-12 pt-8 border-t border-brand-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-[#FFFFFF]">
          <div className="flex flex-col items-center gap-1">
            <span className="text-xl md:text-2xl font-serif font-bold text-brand-red">0%</span>
            <span className="text-[10px] text-zinc-400 font-sans uppercase">Brokerage Fee</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-xl md:text-2xl font-serif font-bold text-brand-red">20:80</span>
            <span className="text-[10px] text-zinc-400 font-sans uppercase">Payment Structures</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-xl md:text-2xl font-serif font-bold text-zinc-300">Complimentary</span>
            <span className="text-[10px] text-zinc-400 font-sans uppercase">Luxury Transit Cab</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-xl md:text-2xl font-serif font-bold text-zinc-300">24/7</span>
            <span className="text-[10px] text-zinc-400 font-sans uppercase">Consultation Hub</span>
          </div>
        </div>

      </div>
    </section>
  );
};
