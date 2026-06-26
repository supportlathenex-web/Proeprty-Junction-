import React, { useState } from 'react';
import { Property } from '../types';
import { propertiesCatalog } from '../propertiesData';
import { MapPin, Sparkles, MoveRight, SlidersHorizontal, BedDouble, Ruler } from 'lucide-react';
import { motion } from 'motion/react';

interface PropertiesProps {
  onSelectProperty: (property: Property) => void;
  onOpenBookWindow: (property: Property) => void;
}

export const Properties: React.FC<PropertiesProps> = ({
  onSelectProperty,
  onOpenBookWindow,
}) => {
  const [activeLocation, setActiveLocation] = useState<'All' | string>('All');
  const [sortBy, setSortBy] = useState<'default' | 'priceAsc' | 'priceDesc'>('default');

  // Filter locations
  const locationsList = ['All', 'Thane West', 'Shilphata Hillcrest', 'Lower Parel', 'Mulund East'];

  const filteredProperties = propertiesCatalog
    .filter(p => activeLocation === 'All' || p.location === activeLocation)
    .sort((a, b) => {
      if (sortBy === 'priceAsc') return a.priceNumeric - b.priceNumeric;
      if (sortBy === 'priceDesc') return b.priceNumeric - a.priceNumeric;
      return 0; // default
    });

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Search & Location Filter Rail */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-200/50 pb-5">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-100 rounded-2xl border border-zinc-200/50">
          {locationsList.map((loc) => (
            <button
              key={loc}
              onClick={() => setActiveLocation(loc)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeLocation === loc
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-950 hover:bg-zinc-200/50'
              }`}
            >
              {loc === 'All' ? 'All Developments' : loc}
            </button>
          ))}
        </div>

        {/* Sort Trigger */}
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="w-4 h-4 text-zinc-500" />
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Sort Price:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 bg-white border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-900 focus:outline-hidden"
          >
            <option value="default">Default View</option>
            <option value="priceAsc">Ascending (Cr)</option>
            <option value="priceDesc">Descending (Cr)</option>
          </select>
        </div>
      </div>

      {/* Real Estate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {filteredProperties.map((prop) => (
          <div
            key={prop.id}
            className="group flex flex-col bg-white rounded-3xl border border-zinc-200/60 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
          >
            {/* Image Stage */}
            <div className="relative aspect-video overflow-hidden bg-zinc-900">
              <img
                src={prop.mainImage}
                alt={prop.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/95 backdrop-blur-xs text-zinc-950 text-[9px] font-mono font-bold tracking-widest uppercase rounded-full shadow-xs border border-zinc-200/10">
                  {prop.status}
                </span>
              </div>

              {/* Location Mini Overlay */}
              <div className="absolute bottom-4 left-4 py-1.5 px-3 bg-zinc-950/80 backdrop-blur-xs rounded-xl flex items-center gap-1.5 text-white/90">
                <MapPin className="w-3.5 h-3.5 text-zinc-300" />
                <span className="text-[10px] font-semibold tracking-wide">{prop.location}</span>
              </div>
            </div>

            {/* details body */}
            <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-zinc-950 tracking-tight">{prop.title}</h3>
                  <span className="text-sm font-black text-zinc-950 tracking-tight font-mono">{prop.price}</span>
                </div>
                <p className="text-zinc-500 text-xs tracking-wide leading-relaxed">{prop.tagline}</p>
              </div>

              {/* Space Configurations details */}
              <div className="grid grid-cols-2 gap-4 py-4 px-4 bg-zinc-50 rounded-2xl border border-zinc-150 text-xs">
                <div className="flex items-center gap-2 text-zinc-650">
                  <BedDouble className="w-4 h-4 text-zinc-400 shrink-0" />
                  <div>
                    <p className="text-[9px] text-zinc-400 font-mono tracking-widest uppercase">LAYOUT CONFIG</p>
                    <p className="font-bold text-zinc-950">{prop.configuration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-zinc-650">
                  <Ruler className="w-4 h-4 text-zinc-400 shrink-0" />
                  <div>
                    <p className="text-[9px] text-zinc-400 font-mono tracking-widest uppercase">CARPET PLAN</p>
                    <p className="font-bold text-zinc-950">{prop.carpetArea}</p>
                  </div>
                </div>
              </div>

              {/* Actions bottom */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => onSelectProperty(prop)}
                  className="flex-grow py-3 px-5 bg-zinc-950 hover:bg-zinc-850 text-white rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  View Details & Specs
                  <MoveRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onOpenBookWindow(prop)}
                  className="py-3 px-5 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 rounded-xl text-xs font-bold tracking-wide transition-colors border border-zinc-200/50 cursor-pointer"
                >
                  Book Walkthrough
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
