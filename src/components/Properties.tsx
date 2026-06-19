import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Building, Ruler, ArrowUpRight, ShieldCheck, BadgeDollarSign, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { Property } from '../types';
import { propertyCatalog } from '../propertiesData';

interface PropertiesProps {
  onSelectPropertyToBook: (property: Property) => void;
  onViewAllProperties: () => void;
  onViewPropertyDetail: (property: Property) => void;
}

export const Properties: React.FC<PropertiesProps> = ({ 
  onSelectPropertyToBook,
  onViewAllProperties,
  onViewPropertyDetail
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBHK, setSelectedBHK] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Limit homepage collection to 6 premium highlights, or filter from the main catalog
  const filteredProperties = useMemo(() => {
    return propertyCatalog.filter((item) => {
      // Search matching location or title
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase());

      // BHK matching
      const matchesBHK = selectedBHK === 'All' || item.bhk.toString() === selectedBHK;

      // Status matching
      const matchesStatus = selectedStatus === 'All' || item.type === selectedStatus;

      return matchesSearch && matchesBHK && matchesStatus;
    });
  }, [searchTerm, selectedBHK, selectedStatus]);

  // Homepage highlights show first 6 elements
  const displayedProperties = useMemo(() => {
    if (searchTerm === '' && selectedBHK === 'All' && selectedStatus === 'All') {
      return filteredProperties.slice(0, 6);
    }
    return filteredProperties;
  }, [filteredProperties, searchTerm, selectedBHK, selectedStatus]);

  return (
    <section id="properties-section-id" className="py-20 bg-brand-bg relative border-t border-brand-navy/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Stack */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-brand-red uppercase mb-3 block">
              CURATED PROPERTY JUNCTION PORTFOLIO
            </span>
            <h2 className="text-3xl md:text-5xl font-belleza font-extrabold text-[#0E2F56] tracking-tight leading-none">
              Discover Premium Residences
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-zinc-500 max-w-sm font-sans font-light leading-relaxed">
            Discover handpicked 1, 2, 3 BHK homes, luxury villas, and high-streets. With 0% brokerage fees and verified payment plans.
          </div>
        </div>

        {/* Dynamic Search & Filters Assembly */}
        <div className="bg-white rounded-2xl border border-brand-navy/10 p-5 md:p-6 mb-10 shadow-sm flex flex-col md:flex-row items-center gap-4">
          
          {/* Text Search Field */}
          <div className="relative w-full md:flex-1 flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-brand-navy/40" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by neighborhood corridor (Thane, Shilphata, Kharghar...)"
              className="w-full bg-brand-bg pl-10 pr-4 py-2.5 rounded-xl border border-brand-navy/5 text-xs font-sans focus:outline-none focus:border-brand-navy max-h-[44px]"
            />
          </div>

          {/* Filtering Subsystem */}
          <div className="flex flex-wrap items-center gap-3.5 w-full md:w-auto">
            {/* BHK Filter */}
            <div className="flex items-center gap-2 bg-brand-bg px-3 py-1.5 rounded-xl border border-brand-navy/5 w-fit">
              <span className="text-[10px] uppercase font-bold text-brand-navy/60 font-sans">BHK Layout:</span>
              <select
                value={selectedBHK}
                onChange={(e) => setSelectedBHK(e.target.value)}
                className="bg-transparent text-xs font-bold font-sans text-brand-navy focus:outline-none"
              >
                <option value="All">All Layouts</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 bg-brand-bg px-3 py-1.5 rounded-xl border border-brand-navy/5 w-fit">
              <span className="text-[10px] uppercase font-bold text-brand-navy/60 font-sans">Life Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-transparent text-xs font-bold font-sans text-brand-navy focus:outline-none opacity-85"
              >
                <option value="All">All Projects</option>
                <option value="Ready to Move">Ready To Move</option>
                <option value="Under Construction">Under Construction</option>
              </select>
            </div>
            
            {/* Quick Reset utility if filters used */}
            {(searchTerm || selectedBHK !== 'All' || selectedStatus !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedBHK('All');
                  setSelectedStatus('All');
                }}
                className="text-xs font-semibold text-brand-red underline cursor-pointer font-sans"
              >
                Reset Matches
              </button>
            )}
          </div>

        </div>

        {/* Properties Card Grid */}
        {displayedProperties.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {displayedProperties.map((prop) => (
                  <motion.div
                    layout
                    key={prop.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-3xl overflow-hidden border border-brand-navy/10 hover:shadow-xl hover:border-brand-navy/20 transition-all duration-300 flex flex-col group relative"
                  >
                    {/* Property Card Header / Image */}
                    <div 
                      onClick={() => onViewPropertyDetail(prop)}
                      className="relative h-56 w-full overflow-hidden cursor-pointer"
                    >
                      <img
                        src={prop.image}
                        alt={prop.title}
                        className="w-full h-full object-cover transition-transform duration-550 group-hover:scale-104 brightness-95"
                        referrerPolicy="no-referrer"
                      />

                      {/* Left overlay badge: BHK */}
                      <div className="absolute top-4 left-4 bg-brand-navy/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-1">
                        <Building className="w-3 h-3 text-brand-red" />
                        <span className="text-[10px] font-bold font-sans text-white tracking-widest uppercase">
                          {prop.bhk === 0 ? "Studio" : `${prop.bhk} BHK`}
                        </span>
                      </div>

                      {/* Right overlay badge: RERA / Phase */}
                      <div className="absolute top-4 right-4 bg-brand-red text-white py-1.5 px-3 rounded-full text-[9px] font-bold tracking-widest uppercase font-sans">
                        {prop.type}
                      </div>

                      {/* Bottom overlay: 0% Brokerage badge */}
                      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md text-[#0E2F56] border border-brand-navy/10 px-3.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                        <BadgeDollarSign className="w-3.5 h-3.5 text-brand-red" />
                        <span className="text-[10px] font-bold font-sans uppercase tracking-wider">
                          {prop.brokerage} Brokerage Fees
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex flex-col justify-between flex-1 gap-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1 text-zinc-500 text-xs">
                          <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
                          <span className="font-sans font-light truncate">{prop.location}</span>
                        </div>

                        <h3 
                          onClick={() => onViewPropertyDetail(prop)}
                          className="text-xl font-belleza font-extrabold text-[#0E2F56] tracking-tight leading-snug group-hover:text-brand-red transition-all cursor-pointer"
                        >
                          {prop.title}
                        </h3>

                        {/* Quick specs section */}
                        <div className="grid grid-cols-2 gap-4 bg-brand-bg/50 border border-brand-navy/5 p-3 rounded-xl mt-1.5">
                          <div className="flex items-center gap-1.5">
                            <Ruler className="w-4 h-4 text-brand-navy/60 shrink-0" />
                            <div className="font-sans">
                              <span className="text-[9px] text-zinc-400 block leading-none">Carpet Area</span>
                              <strong className="text-[11px] font-bold text-brand-navy leading-none">{prop.carpetArea}</strong>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <SlidersHorizontal className="w-4 h-4 text-brand-navy/60 shrink-0" />
                            <div className="font-sans">
                              <span className="text-[9px] text-zinc-400 block leading-none">Scheme Type</span>
                              <strong className="text-[11px] font-bold text-brand-navy leading-none truncate block max-w-[110px]">
                                {prop.paymentPlan}
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-zinc-100 flex items-center justify-between mt-auto">
                        <div>
                          <span className="text-[10px] text-zinc-400 font-sans block leading-none uppercase">Direct Price</span>
                          <span className="text-base font-belleza font-bold text-[#E3262A] tracking-wider block mt-1">
                            {prop.price}
                          </span>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onViewPropertyDetail(prop)}
                            className="p-2.5 rounded-xl bg-brand-bg hover:bg-brand-navy/10 text-brand-navy hover:text-brand-red border border-brand-navy/10 transition-colors cursor-pointer"
                            title="View Property Page"
                          >
                            <ArrowUpRight className="w-4.5 h-4.5" />
                          </button>
                          <button
                            onClick={() => onSelectPropertyToBook(prop)}
                            className="bg-brand-navy hover:bg-brand-red text-white text-[11px] font-bold font-serif px-4 py-2.5 rounded-xl transition-colors cursor-pointer tracking-wider"
                          >
                            Book Visit
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* HOMEPAGE UPDATE - VIEW ALL PROPERTIES BUTTON */}
            <div className="flex flex-col items-center justify-center mt-14 pt-4">
              <button
                onClick={onViewAllProperties}
                className="group flex items-center gap-2.5 bg-[#0E2F56] hover:bg-brand-red text-white text-xs font-serif font-black uppercase tracking-widest px-8 py-4.5 rounded-2xl transition-all duration-300 shadow-xl shadow-brand-navy/10 hover:shadow-brand-red/15 hover:scale-102 cursor-pointer"
                id="homepage-view-all-properties-btn"
              >
                <span>View All Properties ({propertyCatalog.length})</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <p className="text-[11px] text-zinc-400 font-sans font-light mt-3">
                Live filtering by custom budget, furnishing, bathrooms, availability &amp; more.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-brand-navy/10 rounded-3xl p-8 max-w-lg mx-auto">
            <Building className="w-12 h-12 text-brand-navy/40 mx-auto mb-4" />
            <h4 className="text-lg font-belleza font-bold text-brand-navy">No Matches Located</h4>
            <p className="text-xs text-zinc-500 mt-2 font-sans max-w-sm mx-auto">
              We couldn't locate any items matching your exact layout parameters. Try relaxing your filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedBHK('All');
                setSelectedStatus('All');
              }}
              className="mt-6 bg-brand-navy text-white hover:bg-brand-red text-xs px-5 py-2.5 rounded-lg font-sans font-semibold cursor-pointer transition-colors"
            >
              Clear Search Parameters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
export default Properties;
