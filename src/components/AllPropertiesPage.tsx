import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, MapPin, Building, Ruler, ArrowUpRight, ShieldCheck, 
  BadgeDollarSign, SlidersHorizontal, Eye, Star, CheckCircle, 
  ChevronDown, X, Heart, RefreshCw, Layers, Bed, Bath, ArrowRight 
} from 'lucide-react';
import { Property } from '../types';
import { propertyCatalog } from '../propertiesData';

interface AllPropertiesPageProps {
  onSelectProperty: (property: Property) => void;
  onNavigateHome: () => void;
  onOpenBooking: () => void;
}

export const AllPropertiesPage: React.FC<AllPropertiesPageProps> = ({
  onSelectProperty,
  onNavigateHome,
  onOpenBooking
}) => {
  // Ensure the page loads smoothly at the absolute top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter States
  const [purpose, setPurpose] = useState<'All' | 'Buy' | 'Rent'>('All');
  const [propertyType, setPropertyType] = useState<string>('All');
  const [locationSearch, setLocationSearch] = useState('');
  
  // Price states
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  
  // BHK Layouts
  const [bhk, setBhk] = useState<string>('All');

  // More Filters Active State Toggle
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // More Filters States
  const [bathrooms, setBathrooms] = useState<string>('All');
  const [minSize, setMinSize] = useState<string>('');
  const [maxSize, setMaxSize] = useState<string>('');
  const [furnishing, setFurnishing] = useState<string>('All');
  const [buildingType, setBuildingType] = useState<string>('All');
  const [floorLevel, setFloorLevel] = useState<string>('All');
  const [viewType, setViewType] = useState<string>('All');
  const [rentalFrequency, setRentalFrequency] = useState<string>('All');
  const [paymentTerms, setPaymentTerms] = useState<string>('All');
  const [availability, setAvailability] = useState<string>('All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);

  // Trigger Action Filter state applying (force trigger if we want direct, but we make it live & responsive!)
  const [appliedCount, setAppliedCount] = useState(propertyCatalog.length);

  // Handlers to clear all fields
  const handleResetFilters = () => {
    setPurpose('All');
    setPropertyType('All');
    setLocationSearch('');
    setMinPrice('');
    setMaxPrice('');
    setBhk('All');
    setBathrooms('All');
    setMinSize('');
    setMaxSize('');
    setFurnishing('All');
    setBuildingType('All');
    setFloorLevel('All');
    setViewType('All');
    setRentalFrequency('All');
    setPaymentTerms('All');
    setAvailability('All');
    setVerifiedOnly(false);
    setFeaturedOnly(false);
  };

  // Live filtered properties logic
  const filteredProperties = useMemo(() => {
    return propertyCatalog.filter((item) => {
      // 1. Purpose (Buy/Rent)
      if (purpose !== 'All' && item.purpose !== purpose) return false;
      
      // 2. Property Type
      if (propertyType !== 'All' && item.propertyType !== propertyType) return false;

      // 3. Location Search
      if (locationSearch.trim() !== '') {
        const query = locationSearch.toLowerCase();
        const matchesLoc = item.location.toLowerCase().includes(query) || 
                           item.title.toLowerCase().includes(query) ||
                           item.tag.toLowerCase().includes(query);
        if (!matchesLoc) return false;
      }

      // 4. Price Min - Max (INR)
      if (minPrice !== '') {
        const minVal = parseFloat(minPrice);
        if (!isNaN(minVal) && item.priceNumeric < minVal) return false;
      }
      if (maxPrice !== '') {
        const maxVal = parseFloat(maxPrice);
        if (!isNaN(maxVal) && item.priceNumeric > maxVal) return false;
      }

      // 5. Bedrooms BHK
      // Studio is represented as 0 BHK, 1, 2, 3, 4 for 4+
      if (bhk !== 'All') {
        if (bhk === 'Studio' && item.bhk !== 0) return false;
        if (bhk === '1' && item.bhk !== 1) return false;
        if (bhk === '2' && item.bhk !== 2) return false;
        if (bhk === '3' && item.bhk !== 3) return false;
        if (bhk === '4+' && item.bhk < 4) return false;
      }

      // 6. Bathrooms
      if (bathrooms !== 'All') {
        const bathsNum = parseInt(bathrooms);
        if (!isNaN(bathsNum)) {
          if (bathrooms === '3+' && item.bathrooms < 3) return false;
          if (bathrooms !== '3+' && item.bathrooms !== bathsNum) return false;
        }
      }

      // 7. Size Min - Max (Sq Ft)
      if (minSize !== '') {
        const minSq = parseFloat(minSize);
        if (!isNaN(minSq) && item.sizeSqFt < minSq) return false;
      }
      if (maxSize !== '') {
        const maxSq = parseFloat(maxSize);
        if (!isNaN(maxSq) && item.sizeSqFt > maxSq) return false;
      }

      // 8. Furnishing
      if (furnishing !== 'All' && item.furnishing !== furnishing) return false;

      // 9. Building Type
      if (buildingType !== 'All' && item.buildingType !== buildingType) return false;

      // 10. Floor Level
      if (floorLevel !== 'All' && item.floorLevel !== floorLevel) return false;

      // 11. View
      if (viewType !== 'All' && item.viewType !== viewType) return false;

      // 12. Rental Frequency
      if (rentalFrequency !== 'All' && item.rentalFrequency !== rentalFrequency) return false;

      // 13. Payment Terms
      if (paymentTerms !== 'All') {
        if (!item.paymentTerms.toLowerCase().includes(paymentTerms.toLowerCase())) return false;
      }

      // 14. Availability
      if (availability !== 'All' && item.availability !== availability) return false;

      // 15. Verified Only
      if (verifiedOnly && !item.verified) return false;

      // 16. Featured Only
      if (featuredOnly && !item.featured) return false;

      return true;
    });
  }, [
    purpose, propertyType, locationSearch, minPrice, maxPrice, bhk,
    bathrooms, minSize, maxSize, furnishing, buildingType, floorLevel,
    viewType, rentalFrequency, paymentTerms, availability, verifiedOnly, featuredOnly
  ]);

  // Keep dynamic count updated
  useEffect(() => {
    setAppliedCount(filteredProperties.length);
  }, [filteredProperties]);

  return (
    <div className="bg-brand-bg min-h-screen pt-24 pb-16 font-sans">
      
      {/* SECTION 1: Cinematic High-Quality Imagery Header Background */}
      <div className="relative h-[45vh] w-full overflow-hidden flex items-center justify-center bg-brand-navy">
        {/* Sky-scraping luxury real estate background */}
        <img 
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1600"
          alt="Premium Real Estate Banner" 
          className="absolute inset-0 w-full h-full object-cover brightness-35 object-center scale-102 transition-transform duration-[8000ms]"
          referrerPolicy="no-referrer"
        />
        
        {/* Soft Ambient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-brand-black/40 z-10" />
        
        {/* Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-[11px] font-sans font-black tracking-[0.3em] text-brand-red uppercase mb-3 block">
            PROPERTY JUNCTION EXCLUSIVE CATALOGUE
          </span>
          <h1 className="text-4xl md:text-6xl font-belleza font-extrabold text-white tracking-tight leading-none drop-shadow-md">
            All Exclusive Properties
          </h1>
          <p className="text-sm md:text-lg text-zinc-300 max-w-2xl mx-auto font-sans font-light mt-4 leading-relaxed">
            Exclusively managed 0% Brokerage residences and commercial high-streets in Navi Mumbai, Thane, Kharghar, and Shilphata. Vetted and verified.
          </p>
        </div>
      </div>

      {/* Breadcrumb row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 text-xs font-medium text-zinc-500">
        <button onClick={onNavigateHome} className="hover:text-brand-red transition-colors">Home</button>
        <span>/</span>
        <span className="text-brand-navy font-semibold">Properties Search Hub</span>
      </div>

      {/* SECTION 2: THE 100% FUNCTIONAL FILTER PANEL ARSENAL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="bg-white rounded-3xl border border-brand-navy/10 shadow-xl p-6 md:p-8 relative">
          
          {/* Header row in filter block */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-zinc-100 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-belleza font-black text-brand-navy">Search &amp; Dynamic Discovery</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Refine using 100% functional live criteria filters</p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-auto">
              <span className="text-xs text-zinc-550 font-bold bg-brand-bg px-3.5 py-1.5 rounded-full border border-brand-navy/5">
                {appliedCount} Properties Matching
              </span>
              <button 
                onClick={handleResetFilters}
                className="text-xs font-semibold text-brand-red hover:underline py-1.5 px-3 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3 animate-spin duration-1000" />
                Reset Controls
              </button>
            </div>
          </div>

          {/* BASIC FILTERS ASSEMBLY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            
            {/* Filter 1: Purpose (Buy / Rent / All) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-zinc-400 uppercase font-black tracking-widest font-sans">Purpose</label>
              <div className="grid grid-cols-3 bg-brand-bg rounded-xl p-1 border border-brand-navy/5">
                {(['All', 'Buy', 'Rent'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPurpose(p)}
                    className={`py-1.5 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer ${
                      purpose === p 
                        ? 'bg-brand-navy text-white shadow-sm' 
                        : 'text-zinc-500 hover:text-brand-navy hover:bg-zinc-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 2: Property Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-zinc-400 uppercase font-black tracking-widest font-sans">Property Type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-brand-bg border border-brand-navy/5 focus:border-brand-navy p-2 px-3 rounded-xl text-xs font-bold font-sans text-brand-navy focus:outline-none"
              >
                <option value="All">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa (Exclusive)</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Commercial">Commercial</option>
                <option value="Land">Land</option>
              </select>
            </div>

            {/* Filter 3: Locations Neighborhood (searchable) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-zinc-400 uppercase font-black tracking-widest font-sans">Neighborhood Corridor</label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-navy/40" />
                <input
                  type="text"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  placeholder="e.g. Shilphata, Kharghar..."
                  className="w-full bg-brand-bg border border-brand-navy/5 focus:border-brand-navy pl-9 pr-3 py-2 rounded-xl text-xs font-bold font-sans text-brand-navy focus:outline-none"
                />
              </div>
            </div>

            {/* Filter 4: Price Range (Min - Max INR) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-zinc-400 uppercase font-black tracking-widest font-sans">Price Range (INR)</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min"
                  className="w-full bg-brand-bg border border-brand-navy/5 focus:border-brand-navy p-2 px-3 rounded-xl text-xs font-bold font-sans text-brand-navy focus:outline-none"
                />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max"
                  className="w-full bg-brand-bg border border-brand-navy/5 focus:border-brand-navy p-2 px-3 rounded-xl text-xs font-bold font-sans text-brand-navy focus:outline-none"
                />
              </div>
            </div>

            {/* Filter 5: Bedrooms layout */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-zinc-400 uppercase font-black tracking-widest font-sans">Bedrooms Layout</label>
              <select
                value={bhk}
                onChange={(e) => setBhk(e.target.value)}
                className="w-full bg-brand-bg border border-brand-navy/5 focus:border-brand-navy p-2 px-3 rounded-xl text-xs font-bold font-sans text-brand-navy focus:outline-none"
              >
                <option value="All">All Bedrooms</option>
                <option value="Studio">Studio (0 BHK)</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4+">4+ Bedrooms</option>
              </select>
            </div>

          </div>

          {/* MORE FILTERS ACCORDION TOGGLE */}
          <div className="mt-6 pt-5 border-t border-zinc-100">
            <button
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className="flex items-center gap-2 group text-xs font-sans font-black uppercase text-brand-navy hover:text-brand-red cursor-pointer tracking-wider"
              id="more-filters-accordion-toggle"
            >
              <span>{showMoreFilters ? "Hide Expanded Filters -" : "Show Expanded Filters (More Options) +"}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showMoreFilters ? 'rotate-180 text-brand-red' : ''}`} />
            </button>

            {/* MORE FILTERS DRAWER */}
            <AnimatePresence>
              {showMoreFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-brand-bg/40 border border-brand-navy/5 rounded-2xl p-5 md:p-6">
                    
                    {/* More Filter 1: Bathrooms */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest font-sans">Bathrooms</label>
                      <select
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                        className="w-full bg-white border border-brand-navy/10 focus:border-brand-red p-2 px-3 rounded-xl text-xs font-bold font-sans text-brand-navy focus:outline-none"
                      >
                        <option value="All">All Bathrooms</option>
                        <option value="1">1 Bathroom</option>
                        <option value="2">2 Bathrooms</option>
                        <option value="3+">3+ Bathrooms</option>
                      </select>
                    </div>

                    {/* More Filter 2: Square Foot Unit Size Range */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest font-sans">Size Area (Sq Ft)</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          value={minSize}
                          onChange={(e) => setMinSize(e.target.value)}
                          placeholder="Min SqFt"
                          className="w-full bg-white border border-brand-navy/10 focus:border-brand-red p-2 px-3 rounded-xl text-xs font-bold font-sans text-brand-navy focus:outline-none"
                        />
                        <input
                          type="number"
                          value={maxSize}
                          onChange={(e) => setMaxSize(e.target.value)}
                          placeholder="Max SqFt"
                          className="w-full bg-white border border-brand-navy/10 focus:border-brand-red p-2 px-3 rounded-xl text-xs font-bold font-sans text-brand-navy focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* More Filter 3: Furnishing */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest font-sans">Furnishing</label>
                      <select
                        value={furnishing}
                        onChange={(e) => setFurnishing(e.target.value)}
                        className="w-full bg-white border border-brand-navy/10 focus:border-brand-red p-2 px-3 rounded-xl text-xs font-bold font-sans text-brand-navy focus:outline-none"
                      >
                        <option value="All">All Furnishing</option>
                        <option value="Furnished">Furnished</option>
                        <option value="Semi">Semi-Furnished</option>
                        <option value="Unfurnished">Unfurnished</option>
                      </select>
                    </div>

                    {/* More Filter 4: Building Type */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest font-sans">Building Type</label>
                      <select
                        value={buildingType}
                        onChange={(e) => setBuildingType(e.target.value)}
                        className="w-full bg-white border border-brand-navy/10 focus:border-brand-red p-2 px-3 rounded-xl text-xs font-bold font-sans text-brand-navy focus:outline-none"
                      >
                        <option value="All">All Communities</option>
                        <option value="Building">Independent Building</option>
                        <option value="Villa">Villa Compound</option>
                        <option value="Gated Community">Gated Community</option>
                      </select>
                    </div>

                    {/* More Filter 5: Floor Level */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest font-sans">Floor Level</label>
                      <select
                        value={floorLevel}
                        onChange={(e) => setFloorLevel(e.target.value)}
                        className="w-full bg-white border border-brand-navy/10 focus:border-brand-red p-2 px-3 rounded-xl text-xs font-bold font-sans text-brand-navy focus:outline-none"
                      >
                        <option value="All">All Floors</option>
                        <option value="Low">Low Levels</option>
                        <option value="Mid">Mid-Level Decks</option>
                        <option value="High">Penthouse levels / High</option>
                      </select>
                    </div>

                    {/* More Filter 6: View */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest font-sans">Horizon View</label>
                      <select
                        value={viewType}
                        onChange={(e) => setViewType(e.target.value)}
                        className="w-full bg-white border border-brand-navy/10 focus:border-brand-red p-2 px-3 rounded-xl text-xs font-bold font-sans text-brand-navy focus:outline-none"
                      >
                        <option value="All">All Landscapes</option>
                        <option value="Sea">Sea / Panoramic views</option>
                        <option value="City">Navi Mumbai Cityscape</option>
                        <option value="Community">Gated Complex Parks</option>
                        <option value="Garden">Garden / Hills views</option>
                      </select>
                    </div>

                    {/* More Filter 7: Rental Frequency */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest font-sans">Rental Frequency</label>
                      <select
                        value={rentalFrequency}
                        onChange={(e) => setRentalFrequency(e.target.value)}
                        className="w-full bg-white border border-brand-navy/10 focus:border-brand-red p-2 px-3 rounded-xl text-xs font-bold font-sans text-brand-navy focus:outline-none"
                        disabled={purpose === 'Buy'}
                      >
                        <option value="All">All Frequencies</option>
                        <option value="Monthly">Monthly Basis</option>
                        <option value="Yearly">Yearly Contract</option>
                      </select>
                    </div>

                    {/* More Filter 8: Payment Terms (Cheques) */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest font-sans">Payment Terms / Cheques</label>
                      <select
                        value={paymentTerms}
                        onChange={(e) => setPaymentTerms(e.target.value)}
                        className="w-full bg-white border border-brand-navy/10 focus:border-brand-red p-2 px-3 rounded-xl text-xs font-bold font-sans text-brand-navy focus:outline-none"
                      >
                        <option value="All">Any Schemes</option>
                        <option value="1 Cheque">1 Cheque Plan</option>
                        <option value="2 Cheques">2 Cheques Plan</option>
                        <option value="4 Cheques">4 Cheques Plan</option>
                        <option value="6 Cheques">6 Cheques Plan</option>
                        <option value="N/A">Purchase / N/A</option>
                      </select>
                    </div>

                    {/* More Filter 9: Availability */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest font-sans">Availability Status</label>
                      <select
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        className="w-full bg-white border border-brand-navy/10 focus:border-brand-red p-2 px-3 rounded-xl text-xs font-bold font-sans text-brand-navy focus:outline-none"
                      >
                        <option value="All">All statuses</option>
                        <option value="Ready">Ready to Occupy</option>
                        <option value="Available">Available to Book</option>
                        <option value="Coming Soon">Coming Soon / Launches</option>
                      </select>
                    </div>

                    {/* More Filters: Checkboxes for Verified and Featured */}
                    <div className="flex items-center gap-6 sm:col-span-2 lg:col-span-3 pt-5 flex-wrap">
                      <label className="flex items-center gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={verifiedOnly}
                          onChange={(e) => setVerifiedOnly(e.target.checked)}
                          className="w-4 h-4 rounded text-brand-red focus:ring-brand-red border-zinc-200 cursor-pointer"
                        />
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 fill-current text-white" />
                          <span className="text-xs font-bold text-zinc-650">Verified Listings ✔ Only</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={featuredOnly}
                          onChange={(e) => setFeaturedOnly(e.target.checked)}
                          className="w-4 h-4 rounded text-brand-red focus:ring-brand-red border-zinc-200 cursor-pointer"
                        />
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="text-xs font-bold text-zinc-650">Featured Only ⭐</span>
                        </div>
                      </label>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* MAIN SHOW PROPERTIES ACTION BUTTON */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => {
                // Focus scroll down to results smoothly
                document.getElementById('results-heading-id')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 bg-brand-red hover:bg-brand-navy text-white text-xs font-serif font-black uppercase tracking-wider px-8 py-3 rounded-xl shadow-md shadow-brand-red/10 transition-colors cursor-pointer"
              id="cta-show-properties"
            >
              <span>Show Properties ({appliedCount})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* SECTION 3: THE GRID RESULTS PLATFORM */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Results Heading */}
        <div id="results-heading-id" className="mb-8 flex items-center justify-between">
          <div>
            <h3 className="text-xl md:text-3xl font-belleza font-black text-brand-navy">
              SearchResult Inventory
            </h3>
            <p className="text-xs text-zinc-400 font-sans mt-0.5">Showing existing real-estate catalog matching active attributes</p>
          </div>
          <span className="text-xs font-sans text-zinc-450">
            {filteredProperties.length} Properties Located
          </span>
        </div>

        {/* Real Properties Cards Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProperties.map((prop) => (
                <motion.div
                  layout
                  key={prop.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-3xl overflow-hidden border border-brand-navy/10 hover:shadow-xl hover:border-brand-navy/20 transition-all duration-300 flex flex-col group relative"
                >
                  {/* Verified Ribbon Header */}
                  {prop.verified && (
                    <div className="absolute top-24 left-4 z-10 bg-emerald-500/90 backdrop-blur-md text-white py-1 px-3 rounded-full text-[9px] font-bold tracking-widest uppercase font-mono flex items-center gap-1 shadow-sm border border-emerald-400/20">
                      <CheckCircle className="w-2.5 h-2.5" />
                      <span>Verified Listings ✔</span>
                    </div>
                  )}

                  {/* Featured Item Badge indicator */}
                  {prop.featured && (
                    <div className="absolute top-24 right-4 z-10 bg-amber-400 text-brand-navy py-1 px-3 rounded-full text-[9px] font-bold tracking-widest uppercase font-mono flex items-center gap-1 shadow-sm font-black text-brand-black">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      <span>Featured Only ⭐</span>
                    </div>
                  )}

                  {/* Property Card Header / Image */}
                  <div 
                    onClick={() => onSelectProperty(prop)} 
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

                    {/* Right overlay badge: Project State */}
                    <div className="absolute top-4 right-4 bg-brand-red text-white py-1.5 px-3 rounded-full text-[9px] font-bold tracking-widest uppercase font-sans animate-pulse">
                      {prop.type}
                    </div>

                    {/* Bottom overlay: 0% Brokerage badge */}
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md text-brand-navy border border-brand-navy/10 px-3.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
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
                        onClick={() => onSelectProperty(prop)}
                        className="text-xl font-belleza font-extrabold text-[#0E2F56] tracking-tight leading-snug group-hover:text-brand-red transition-all cursor-pointer"
                      >
                        {prop.title}
                      </h3>

                      {/* Snippet Description */}
                      <p className="text-[11px] text-zinc-450 line-clamp-2 leading-relaxed">
                        {prop.description}
                      </p>

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
                          <Layers className="w-4 h-4 text-brand-navy/60 shrink-0" />
                          <div className="font-sans">
                            <span className="text-[9px] text-zinc-400 block leading-none">Category type</span>
                            <strong className="text-[11px] font-bold text-brand-navy leading-none truncate block max-w-[110px]">
                              {prop.propertyType}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-[10px] text-zinc-400 font-sans block leading-none uppercase">Listed Rate</span>
                        <span className="text-base font-belleza font-bold text-brand-red tracking-wider block mt-1">
                          {prop.price}
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectProperty(prop)}
                          className="p-2.5 rounded-xl bg-brand-bg hover:bg-brand-navy/10 text-brand-navy hover:text-brand-red border border-brand-navy/10 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold font-sans"
                          title="View Property Page"
                        >
                          <span>Explore Details</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-24 bg-white border border-brand-navy/10 rounded-3xl p-8 max-w-lg mx-auto">
            <Building className="w-14 h-14 text-brand-navy/30 mx-auto mb-4" />
            <h4 className="text-xl font-belleza font-bold text-brand-navy">No Matching Premium Inventory</h4>
            <p className="text-xs text-zinc-550 mt-2 font-sans max-w-sm mx-auto leading-relaxed">
              We couldn't locate any items matching your customized filter values. Try resetting your criteria or inputting keywords.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-6 bg-brand-navy text-white hover:bg-brand-red text-xs px-6 py-3 rounded-xl font-semibold cursor-pointer transition-colors"
            >
              Reset Search Filter
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
