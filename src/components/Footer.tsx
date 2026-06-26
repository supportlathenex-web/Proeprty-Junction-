import React from 'react';
import { Logo } from './Logo';
import { ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: 'properties' | 'advisor' | 'philosophy') => void;
  currentTab: string;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, currentTab }) => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 font-sans border-t border-zinc-900 mt-20">
      {/* Upper footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        {/* Column 1: Info and Brand */}
        <div className="space-y-4">
          <Logo className="h-9 text-white group" />
          <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
            Property Junction is a premier real estate brokerage firm, specializing in premium residential properties and helping you find the perfect home in Thane, Shilphata, and Mumbai.
          </p>
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-1 rounded-full w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Advisory Agents Available
          </div>
        </div>

        {/* Column 2: Platform Links */}
        <div>
          <h4 className="text-white text-xs font-sans font-bold uppercase tracking-widest mb-4">Navigations</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button
                onClick={() => onSelectTab('properties')}
                className={`transition-colors hover:text-white cursor-pointer ${currentTab === 'properties' ? 'text-white font-semibold' : 'text-zinc-500'}`}
              >
                Our Listings
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('philosophy')}
                className={`transition-colors hover:text-white cursor-pointer ${currentTab === 'philosophy' ? 'text-white font-semibold' : 'text-zinc-500'}`}
              >
                About Us
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('advisor')}
                className={`transition-colors hover:text-white cursor-pointer ${currentTab === 'advisor' ? 'text-white font-semibold' : 'text-zinc-500'}`}
              >
                Broker Dashboard
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Geographic Clusters */}
        <div>
          <h4 className="text-white text-xs font-sans font-bold uppercase tracking-widest mb-4">Prime Locations</h4>
          <ul className="space-y-2.5 text-xs text-zinc-500">
            <li className="flex items-center gap-1.5 font-sans">
              <MapPin className="w-3.5 h-3.5 text-zinc-650" /> Thane West 
            </li>
            <li className="flex items-center gap-1.5 font-sans">
              <MapPin className="w-3.5 h-3.5 text-zinc-650" /> Shilphata 
            </li>
            <li className="flex items-center gap-1.5 font-sans">
              <MapPin className="w-3.5 h-3.5 text-zinc-650" /> Lower Parel 
            </li>
            <li className="flex items-center gap-1.5 font-sans">
              <MapPin className="w-3.5 h-3.5 text-zinc-650" /> Mulund 
            </li>
          </ul>
        </div>

        {/* Column 4: Premium Support */}
        <div>
          <h4 className="text-white text-xs font-sans font-bold uppercase tracking-widest mb-4">Contact Us</h4>
          <p className="text-xs text-zinc-500 leading-relaxed mb-3">
            For real estate investment advice, property listings, or broker collaborations.
          </p>
          <a
            href="mailto:support.lathenex@gmail.com"
            className="text-xs font-sans text-zinc-300 font-bold hover:text-white transition-colors block"
          >
            support.lathenex@gmail.com
          </a>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="bg-zinc-950/40 py-6 border-t border-zinc-900/60 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600">
          <p className="text-[11px] leading-relaxed">
            © {new Date().getFullYear()} Property Junction. All rights reserved.
          </p>
          <div className="flex gap-4 text-[11px] font-sans">
            <span className="hover:text-zinc-500 cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-zinc-500 cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
