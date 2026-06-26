import React, { useState } from 'react';
import { Search, Sparkles, Building, MapPin, ArrowRight, CornerDownRight } from 'lucide-react';
import { propertiesCatalog } from '../propertiesData';
import { Property } from '../types';

interface HeroProps {
  onSearchSelect: (property: Property) => void;
  onQuickBook: (property: Property) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearchSelect, onQuickBook }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Property[]>([]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (!val.trim()) {
      setSuggestions([]);
      return;
    }
    const cleanVal = val.toLowerCase();
    const matches = propertiesCatalog.filter(
      p =>
        p.title.toLowerCase().includes(cleanVal) ||
        p.location.toLowerCase().includes(cleanVal) ||
        p.configuration.toLowerCase().includes(cleanVal)
    );
    setSuggestions(matches);
  };

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-radial from-white via-[#FAF9F6] to-zinc-100/60 border-b border-zinc-200/40">
      {/* Structural geometric faint lines background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#12121403_1px,transparent_1px),linear-gradient(to_bottom,#12121403_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_35%,#000_80%,transparent_100%)]" />

      {/* Decorative clean radial colors */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[38rem] h-[38rem] bg-gradient-to-tr from-[#E3DCD2]/25 to-blue-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative text-center space-y-8">
        {/* Elite design rating label */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950 text-white text-[10px] font-mono tracking-widest uppercase shadow-sm">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          Your Trusted Real Estate Partner
        </div>

        {/* Big Apple typography */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-950 font-sans leading-[1.05] max-w-4xl mx-auto">
          Find Your Dream <br />
          <span className="bg-gradient-to-r from-zinc-900 via-[#93815D] to-zinc-950 bg-clip-text text-transparent">
            Property Today.
          </span>
        </h1>

        <p className="text-zinc-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-medium">
          Discover a wide range of premium apartments and properties across Thane, Shilphata, Lower Parel, and Mulund. We help you make the right investment.
        </p>

        {/* Search tool block */}
        <div className="max-w-xl mx-auto relative z-30">
          <div className="bg-white p-2 rounded-2xl border border-zinc-200 shadow-xl shadow-zinc-200/50 flex items-center">
            <Search className="w-4 h-4 text-zinc-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by Location (Thane, Shilphata...) or BHK..."
              className="w-full px-3 py-2.5 bg-transparent rounded-xl text-xs sm:text-sm font-semibold text-zinc-900 focus:outline-hidden"
            />
          </div>

          {/* Suggestions Dropdown panel */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden divide-y divide-zinc-100 z-50 text-left">
              <span className="block px-4 py-2 bg-zinc-50 text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
                MATCHED PROPERTIES ({suggestions.length})
              </span>
              {suggestions.map((prop) => (
                <div
                  key={prop.id}
                  className="p-3 px-4 hover:bg-zinc-50 transition-colors flex items-center justify-between gap-4 cursor-pointer"
                  onClick={() => {
                    onSearchSelect(prop);
                    setSearchQuery('');
                    setSuggestions([]);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Building className="w-4.5 h-4.5 text-[#93815D] shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-zinc-950">{prop.title}</p>
                      <p className="text-[10px] text-zinc-450 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {prop.location} • {prop.configuration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-zinc-400">
                    <span className="text-[10px] font-bold text-zinc-950 font-mono">{prop.price}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {searchQuery && suggestions.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-zinc-200 shadow-lg p-4 text-left z-50 text-xs space-y-1 text-zinc-500">
              <p className="font-bold text-zinc-955 uppercase font-mono text-[9px]">NO DIRECT PORTFOLIO KEYMATCH</p>
              <p className="text-[11px]">We currently have active estates only in Thane and Shilphata regions. Try searching "Thane", "Shilp", or "BHK".</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
