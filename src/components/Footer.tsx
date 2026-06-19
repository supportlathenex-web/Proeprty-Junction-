import React from 'react';
import { Logo } from './Logo';
import { MapPin, Phone, Mail, Instagram, Facebook, Globe, Clock, ShieldCheck, Heart, Navigation } from 'lucide-react';

interface FooterProps {
  onNavigateToPrivacy: () => void;
  onNavigateToHome: () => void;
  onOpenBooking: () => void;
  onNavigateToProperties: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToPrivacy,
  onNavigateToHome,
  onOpenBooking,
  onNavigateToProperties,
}) => {
  return (
    <footer className="bg-brand-black text-[#FFFFFF] py-16 px-4 sm:px-6 relative overflow-hidden border-t border-brand-navy/20 font-sans">
      {/* Decorative luxury lines background */}
      <div className="absolute inset-0 bg-radial-gradient opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left column: Brand description & 24 Hours Status (4/12 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div onClick={onNavigateToHome} className="cursor-pointer bg-white p-3 py-4 rounded-xl w-fit">
              <Logo className="h-10 sm:h-12" />
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-light mt-2">
              Property Junction serves as a professional real estate agency and trusted partner for buyers, sellers, and investors across Navi Mumbai, Thane, Kharghar, and Shilphata. Operating out of Shilphata, Thane with complete speed and transaction transparency.
            </p>
          </div>

          {/* Prompt open/24-hour service status */}
          <div className="bg-brand-navy/30 border border-brand-white/10 rounded-2xl p-4 flex items-center gap-4.5">
            <div className="relative">
              <Clock className="w-8 h-8 text-brand-red shrink-0" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-brand-black animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 block font-mono uppercase">AGENCY AVAILABILITY</span>
              <strong className="text-xs text-brand-bg font-bold tracking-wide">Open &amp; Operating 24 Hours / 7 Days</strong>
              <p className="text-[10px] text-zinc-400 font-light mt-0.5">We cater to site transit and budget selections on your schedule.</p>
            </div>
          </div>
        </div>

        {/* Middle Columns: Direct Links (3/12 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-red font-mono">
            Navigation Hub
          </h4>
          <div className="flex flex-col gap-3 text-xs text-zinc-400 font-medium">
            <button
              onClick={() => {
                onNavigateToHome();
                setTimeout(() => document.getElementById('about-section-id')?.scrollIntoView({ behavior: 'smooth' }), 120);
              }}
              className="text-left hover:text-brand-red transition-all cursor-pointer"
            >
              • Brand Heritage
            </button>
            <button
              onClick={() => {
                onNavigateToHome();
                setTimeout(() => document.getElementById('services-section-id')?.scrollIntoView({ behavior: 'smooth' }), 120);
              }}
              className="text-left hover:text-brand-red transition-all cursor-pointer"
            >
              • Customized Services
            </button>
            <button
              onClick={() => {
                onNavigateToHome();
                setTimeout(() => document.getElementById('properties-section-id')?.scrollIntoView({ behavior: 'smooth' }), 120);
              }}
              className="text-left hover:text-brand-red transition-all cursor-pointer"
            >
              • Exclusive Multi-BHK Gallery
            </button>
            <button
              onClick={onNavigateToProperties}
              className="text-left text-brand-red font-bold hover:text-white transition-all cursor-pointer"
              id="footer-properties-catalog-link"
            >
              • Search Properties Hub (Buy / Rent)
            </button>
            <button
              onClick={onNavigateToPrivacy}
              className="text-left hover:text-brand-red text-zinc-300 font-semibold flex items-center gap-1 cursor-pointer"
              id="footer-privacy-policy-link"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-red" />
              • Privacy Protection Protocol
            </button>
            <button
              onClick={onOpenBooking}
              className="text-left text-brand-red font-bold hover:underline cursor-pointer"
            >
              • Schedule Assisted Transit Visit
            </button>
          </div>

          {/* Social connections */}
          <div className="flex flex-col gap-3 mt-4">
            <h5 className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold">Follow Our Grid:</h5>
            <div className="flex items-center gap-3">
              {/* Instagram handle link */}
              <a
                href="https://www.instagram.com/_propertyjunction_?igsh=em1obXk0aDFyeGJG"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-brand-navy/40 hover:bg-brand-red border border-brand-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all shadow-md"
                title="Instagram handles @propertyjunction"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>

              {/* Facebook links */}
              <a
                href="https://www.facebook.com/share/1AwHvih82u/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-brand-navy/40 hover:bg-brand-red border border-brand-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all shadow-md"
                title="Property Junction Facebook Hub 1"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>

              <a
                href="https://www.facebook.com/share/191FDmuwCX/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-brand-navy/40 hover:bg-brand-red border border-brand-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all shadow-md"
                title="Property Junction Facebook Hub 2"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>
            </div>
            <span className="text-[10px] text-zinc-400 font-sans">Instagram: @_propertyjunction_</span>
          </div>
        </div>

        {/* Right Columns: Exact Contact Registry Info & Location Embed Map (5/12 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-red font-mono">
            Contact Registry &amp; Pin Drop
          </h4>
          
          <div className="flex flex-col gap-3.5 text-xs text-zinc-300">
            {/* Address */}
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4.5 h-4.5 text-brand-red shrink-0 mt-0.5" />
              <div className="font-sans font-light">
                <strong>Property Junction Agency</strong>
                <p className="mt-0.5 text-zinc-400">Shop no.1, M M City Shilphata Mumbra, Thane, India, Maharashtra</p>
                <p className="text-[10px] text-zinc-500 mt-1">
                  Google Map Pin: <span className="font-mono text-brand-red font-semibold select-all">42XP+XQP, Shilphata, Navi Mumbai, Maharashtra 421204, India</span>
                </p>
              </div>
            </div>

            {/* Direct Phoning */}
            <div className="flex items-start gap-2.5">
              <Phone className="w-4.5 h-4.5 text-brand-red shrink-0 mt-0.5" />
              <div className="font-sans">
                <a href="tel:+918668644479" className="hover:text-brand-red transition-colors block font-mono font-semibold">
                  +91 86686 44479
                </a>
                <a href="tel:+917304030613" className="hover:text-brand-red transition-colors block font-mono font-semibold mt-0.5">
                  +91 73040 30613
                </a>
              </div>
            </div>

            {/* Mail Boxes */}
            <div className="flex items-start gap-2.5">
              <Mail className="w-4.5 h-4.5 text-brand-red shrink-0 mt-0.5" />
              <div className="font-sans font-medium text-zinc-400">
                <a href="mailto:newpropertyjunction123@gmail.com" className="hover:text-brand-red transition-colors block">
                  newpropertyjunction123@gmail.com
                </a>
                <a href="mailto:newpropertyjn@gmail.com" className="hover:text-brand-red transition-colors block mt-0.5">
                  newpropertyjn@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Pin drop embedded safely */}
          <div className="w-full h-36 rounded-xl overflow-hidden border border-brand-white/10 shadow-sm relative group bg-brand-navy/30 mt-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1884.8778401344686!2d73.0520623!3d19.1234914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c1b5a557b4f5%3A0x67db91be862ddb80!2sMM%20City!5e0!3m2!1sen!2sin!4v1718800000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Property Junction physical Shop No. 1, MM City Pin Drop"
            />
            {/* Absolute overlay visual pin indicators */}
            <div className="absolute inset-0 bg-brand-black/20 pointer-events-none group-hover:bg-transparent duration-300 transition-all" />
            <a
              href="https://maps.google.com/?q=19.1234914,73.0520623"
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-2.5 right-2.5 bg-brand-red hover:bg-[#0E2F56] text-white px-2.5 py-1.5 rounded-lg text-[9px] font-sans font-bold flex items-center gap-1 duration-200"
            >
              <Navigation className="w-2.5 h-2.5" />
              LOCATE BUREAU ON GOOGLE MAPS
            </a>
          </div>
        </div>

      </div>

      {/* Extreme bottom baseline credit details */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-brand-white/5 flex flex-col md:flex-row items-center justify-between text-[11px] text-zinc-500 font-sans gap-4">
        <span>
          © {new Date().getFullYear()} Property Junction. Registered Real Estate Agency, Maharashtra RERA Consultant.
        </span>
        <div className="flex items-center gap-4.5">
          <button onClick={onNavigateToPrivacy} className="hover:text-brand-red cursor-pointer">
            Privacy Policy
          </button>
          <span>•</span>
          <span className="flex items-center gap-1 text-zinc-400">
            Crafted with speed &amp; premium trust <Heart className="w-3 h-3 text-brand-red fill-current" />
          </span>
        </div>
      </div>
    </footer>
  );
};
