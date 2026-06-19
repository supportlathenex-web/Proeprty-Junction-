import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, MapPin, Building, Ruler, BadgeDollarSign, 
  Phone, Mail, CheckCircle, Star, ShieldCheck, HelpCircle, 
  Compass, Eye, ArrowUpRight, ArrowLeftRight, CreditCard, 
  FileText, ArrowDown, MapPinCheck, Clock, Layers, ThumbsUp, ChevronLeft, ChevronRight, Calculator, Send, Bath 
} from 'lucide-react';
import { Property } from '../types';
import { propertyCatalog } from '../propertiesData';

interface PropertyDetailPageProps {
  property: Property;
  onBackToSearch: () => void;
  onSelectPropertyToBook: (property: Property) => void;
  onNavigateToProperty: (propertyId: string) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  property,
  onBackToSearch,
  onSelectPropertyToBook,
  onNavigateToProperty
}) => {
  // Enforce page top jump immediately upon loading
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [property.id]);

  // Image Slider Index
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Tab configuration for Floor Plan & Documents
  const [activePlanTab, setActivePlanTab] = useState<'floorplan' | 'brochure' | 'deed'>('floorplan');

  // Lead Form state
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadMessage, setLeadMessage] = useState(`Hi Property Junction, I am very interested in scheduling a priority site visit tour for "${property.title}" (ID: ${property.id}). Please let me know available slots.`);

  // Mortgage Calculator state
  const [homeValue, setHomeValue] = useState<number>(property.priceNumeric);
  const [downPayment, setDownPayment] = useState<number>(Math.round(property.priceNumeric * 0.2));
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTerm, setLoanTerm] = useState<number>(20);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);

  // Auto-recalculate mortgage payments
  useEffect(() => {
    const loanAmount = homeValue - downPayment;
    if (loanAmount <= 0) {
      setMonthlyPayment(0);
      return;
    }
    const r = interestRate / 12 / 100;
    const n = loanTerm * 12;
    if (r === 0) {
      setMonthlyPayment(loanAmount / n);
    } else {
      const payment = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setMonthlyPayment(Math.round(payment));
    }
  }, [homeValue, downPayment, interestRate, loanTerm]);

  // Handle Form Submission with WhatsApp Redirect
  const handleLeadFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) {
      alert("Please offer your name and telephone number to initiate verification.");
      return;
    }

    // Build automated text message
    const formattedText = `Hi, I am ${leadName}.\nPhone: ${leadPhone}\nEmail: ${leadEmail || 'N/A'}\n\n*Inquiry Property:* ${property.title} (ID: ${property.id})\n\n*My Message:* ${leadMessage}`;
    const encodedText = encodeURIComponent(formattedText);
    
    // Redirect securely to WhatsApp
    const whatsappUrl = `https://wa.me/918668644479?text=${encodedText}`;
    window.open(whatsappUrl, '_blank', 'noreferrer,noopener');
  };

  // Direct WhatsApp Inquiry button
  const triggerWhatsAppDirect = () => {
    const text = `Hello Rajesh, I would like to make an inquiry regarding "${property.title}" (ID: ${property.id}, Price: ${property.price}). Please send further documents.`;
    window.open(`https://wa.me/918668644479?text=${encodeURIComponent(text)}`, '_blank', 'noreferrer,noopener');
  };

  // Direct Call Agent
  const triggerAgentCall = () => {
    window.open(`tel:+918668644479`);
  };

  // Similar Properties Auto Logic: Same area or price bucket
  const similarProperties = useMemo(() => {
    return propertyCatalog
      .filter((p) => p.id !== property.id)
      .slice(0, 3); // Grab top 3 similar properties
  }, [property.id]);

  // Image helpers
  const handleNextSlide = () => {
    if (property.gallery && property.gallery.length > 0) {
      setActiveSlideIndex((prev) => (prev + 1) % property.gallery.length);
    }
  };

  const handlePrevSlide = () => {
    if (property.gallery && property.gallery.length > 0) {
      setActiveSlideIndex((prev) => (prev - 1 + property.gallery.length) % property.gallery.length);
    }
  };

  return (
    <div className="bg-brand-bg min-h-screen pt-24 pb-20 font-sans text-brand-navy">
      
      {/* Back to Catalog Breadcrumb Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <button 
          onClick={onBackToSearch}
          className="flex items-center gap-2 text-xs font-bold text-[#0E2F56] hover:text-brand-red transition-colors font-sans cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>BACK TO PROPERTIES SEARCH</span>
        </button>

        <div className="flex items-center gap-1 text-[11px] font-sans font-black text-zinc-400">
          <span>PROPERTY REFERENCE:</span>
          <span className="text-brand-red font-mono select-all bg-white px-2 py-1 rounded border border-brand-navy/5 shadow-sm">
            {property.id}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* ==================== 1️⃣ HERO SECTION (Above the Fold Slider + Pricing) ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Slider Columns (8/12) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* Main Active Slide Display Stage */}
            <div className="relative h-[480px] w-full rounded-3xl overflow-hidden shadow-lg group bg-zinc-850 border border-brand-navy/10">
              <img 
                src={property.gallery ? property.gallery[activeSlideIndex] : property.image} 
                alt={`${property.title} interior gallery`} 
                className="w-full h-full object-cover select-none transition-all duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Status Ribbon overlay */}
              <div className="absolute top-5 left-5 z-10 flex flex-wrap gap-2.5">
                <span className="bg-brand-red text-white py-1.5 px-4 rounded-full text-[10px] font-bold tracking-widest uppercase font-mono shadow-md animate-pulse">
                  {property.type === 'Ready to Move' ? 'FOR SALE - READY' : 'UNDER CONSTRUCTION'}
                </span>
                {property.verified && (
                  <span className="bg-emerald-500/95 backdrop-blur-md text-white py-1.5 px-4 rounded-full text-[10px] font-bold tracking-widest uppercase font-mono shadow-md flex items-center gap-1 border border-white/10">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified Listing ✔</span>
                  </span>
                )}
              </div>

              {/* Tag Accent line overlay */}
              <div className="absolute bottom-5 left-5 z-10 bg-brand-navy/95 backdrop-blur-md text-brand-bg px-4 py-2 rounded-xl text-xs font-bold font-sans tracking-wide border border-white/5 shadow-lg">
                ★ {property.tag}
              </div>

              {/* Image Navigation Controllers (Left / Right indicators) */}
              <button 
                onClick={handlePrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-brand-navy flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 duration-200 z-10 border border-brand-navy/10"
                aria-label="Previous property gallery image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button 
                onClick={handleNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-brand-navy flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 duration-200 z-10 border border-brand-navy/10"
                aria-label="Next property gallery image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Navigation Rack */}
            {property.gallery && property.gallery.length > 0 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                {property.gallery.map((imgUrl, thumbIdx) => (
                  <button
                    key={thumbIdx}
                    onClick={() => setActiveSlideIndex(thumbIdx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeSlideIndex === thumbIdx 
                        ? 'border-brand-red scale-102 shadow-md' 
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={imgUrl} 
                      alt="Interior angle thumbnail View" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Core Property Details Action Side Card (4/12) */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-white rounded-3xl border border-brand-navy/10 p-6 md:p-8 shadow-xl relative min-h-[480px]">
            <div className="flex flex-col gap-4">
              
              {/* Region and Title */}
              <div className="flex flex-col gap-1.5 font-sans">
                <span className="text-[10px] uppercase font-black tracking-widest text-[#E3262A] block font-mono">
                  ★ LUXURY REAL ESTATE INVESTMENT
                </span>
                <h1 className="text-2xl md:text-3xl font-belleza font-extrabold text-[#0E2F56] tracking-tight leading-snug">
                  {property.title}
                </h1>
                <div className="flex items-center gap-1 text-zinc-500 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
                  <span>{property.location}</span>
                </div>
              </div>

              {/* Main Pricing block */}
              <div className="my-2 p-4 bg-brand-bg rounded-2xl border border-brand-navy/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 font-sans block uppercase leading-none">Offered Value</span>
                  <span className="text-2xl font-belleza font-black text-brand-red tracking-wider mt-1.5 block">
                    {property.price}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#0E2F56] font-bold block">0% Brokerage Fees</span>
                  <span className="text-[9px] text-zinc-400 font-medium block">Direct Registered Deal</span>
                </div>
              </div>

              {/* Key Specs Row */}
              <div className="grid grid-cols-2 gap-4 my-2">
                
                {/* Spec 1: BHK Layout */}
                <div className="flex items-center gap-3 p-3 bg-zinc-50 border border-zinc-100 rounded-xl">
                  <Building className="w-5 h-5 text-brand-red shrink-0" />
                  <div>
                    <span className="text-[9px] text-zinc-400 block font-bold leading-none">LAYOUT</span>
                    <strong className="text-xs text-brand-navy font-bold leading-none">{property.bhk === 0 ? "Studio" : `${property.bhk} BHK`}</strong>
                  </div>
                </div>

                {/* Spec 2: Size Area */}
                <div className="flex items-center gap-3 p-3 bg-zinc-50 border border-zinc-100 rounded-xl">
                  <Ruler className="w-5 h-5 text-brand-red shrink-0" />
                  <div>
                    <span className="text-[9px] text-zinc-400 block font-bold leading-none">SA AREA</span>
                    <strong className="text-xs text-brand-navy font-bold leading-none">{property.sizeSqFt} Sq Ft</strong>
                  </div>
                </div>

                {/* Spec 3: Bathrooms */}
                <div className="flex items-center gap-3 p-3 bg-zinc-50 border border-zinc-100 rounded-xl">
                  <Bath className="w-5 h-5 text-brand-red shrink-0" />
                  <div>
                    <span className="text-[9px] text-zinc-400 block font-bold leading-none">BATHROOMS</span>
                    <strong className="text-xs text-brand-navy font-bold leading-none">{property.bathrooms} baths</strong>
                  </div>
                </div>

                {/* Spec 4: Type code */}
                <div className="flex items-center gap-3 p-3 bg-zinc-50 border border-zinc-100 rounded-xl">
                  <Layers className="w-5 h-5 text-brand-red shrink-0" />
                  <div>
                    <span className="text-[9px] text-zinc-400 block font-bold leading-none">CATEGORY</span>
                    <strong className="text-[11px] text-brand-navy font-bold leading-none">{property.propertyType}</strong>
                  </div>
                </div>

              </div>
            </div>

            {/* CTAs Trigger Suite */}
            <div className="flex flex-col gap-3 mt-6">
              
              {/* CTA 1: Schedule Viewing */}
              <button 
                onClick={() => onSelectPropertyToBook(property)}
                className="w-full bg-brand-red hover:bg-brand-navy text-white text-xs font-serif font-black tracking-widest py-3.5 rounded-xl transition-all duration-300 transform hover:scale-102 flex items-center justify-center gap-2 shadow-md shadow-brand-red/10 cursor-pointer"
                id="cta-schedule-viewing-detail-id"
              >
                <span>BOOK HOSTED SITE VISIT</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {/* Row CTAs: WhatsApp Inquiry & Call Agent */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={triggerWhatsAppDirect}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-sans font-bold py-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp Ask</span>
                </button>

                <button 
                  onClick={triggerAgentCall}
                  className="bg-brand-navy hover:bg-zinc-800 text-white text-xs font-sans font-bold py-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Agent</span>
                </button>
              </div>

              <span className="text-[10px] text-zinc-400 font-sans block text-center mt-1">
                ★ 24/7 Assisted transit tours available out of Shilphata HQ.
              </span>
            </div>

          </div>

        </div>

        {/* ==================== 2️⃣ QUICK PROPERTY SNAPSHOT SECTION ==================== */}
        <div className="bg-white rounded-3xl border border-brand-navy/10 p-6 md:p-8 shadow-md mb-8">
          <h3 className="text-xl font-belleza font-black text-brand-navy mb-5 flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-red shrink-0" />
            <span>Specifications &amp; Layout Snapshot</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Table Item 1 */}
            <div className="border border-zinc-100 p-4.5 rounded-2xl bg-zinc-50 flex items-center gap-3">
              <div className="p-3 bg-white rounded-xl text-brand-navy border border-zinc-100 shrink-0 shadow-sm">
                <Building className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 font-sans block uppercase">Reference Token</span>
                <strong className="text-xs text-brand-navy font-bold font-mono">{property.id}</strong>
              </div>
            </div>

            {/* Table Item 2 */}
            <div className="border border-zinc-100 p-4.5 rounded-2xl bg-zinc-50 flex items-center gap-3">
              <div className="p-3 bg-white rounded-xl text-brand-navy border border-zinc-100 shrink-0 shadow-sm">
                <Compass className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 font-sans block uppercase">Horizon View</span>
                <strong className="text-xs text-brand-navy font-bold">{property.viewType} Landscape</strong>
              </div>
            </div>

            {/* Table Item 3 */}
            <div className="border border-zinc-100 p-4.5 rounded-2xl bg-zinc-50 flex items-center gap-3">
              <div className="p-3 bg-white rounded-xl text-brand-navy border border-zinc-100 shrink-0 shadow-sm">
                <Star className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 font-sans block uppercase">Furnishing Scale</span>
                <strong className="text-xs text-brand-navy font-bold">{property.furnishing} Layout</strong>
              </div>
            </div>

            {/* Table Item 4 */}
            <div className="border border-zinc-100 p-4.5 rounded-2xl bg-zinc-50 flex items-center gap-3">
              <div className="p-3 bg-white rounded-xl text-brand-navy border border-zinc-100 shrink-0 shadow-sm">
                <Clock className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 font-sans block uppercase">Construction phase</span>
                <strong className="text-xs text-brand-navy font-bold">{property.type}</strong>
              </div>
            </div>

            {/* Table Item 5 */}
            <div className="border border-zinc-100 p-4.5 rounded-2xl bg-zinc-50 flex items-center gap-3">
              <div className="p-3 bg-white rounded-xl text-brand-navy border border-zinc-100 shrink-0 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 font-sans block uppercase">Commission saving</span>
                <strong className="text-xs text-[#00A14B] font-bold">{property.brokerage} Brokerage Fees</strong>
              </div>
            </div>

            {/* Table Item 6 */}
            <div className="border border-zinc-100 p-4.5 rounded-2xl bg-zinc-50 flex items-center gap-3">
              <div className="p-3 bg-white rounded-xl text-brand-navy border border-zinc-100 shrink-0 shadow-sm">
                <Eye className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 font-sans block uppercase">Floor Altitude</span>
                <strong className="text-xs text-brand-navy font-bold">{property.floorLevel} Deck floors</strong>
              </div>
            </div>

            {/* Table Item 7 */}
            <div className="border border-zinc-100 p-4.5 rounded-2xl bg-zinc-50 flex items-center gap-3">
              <div className="p-3 bg-white rounded-xl text-brand-navy border border-zinc-100 shrink-0 shadow-sm">
                <MapPinCheck className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 font-sans block uppercase">Gated complex type</span>
                <strong className="text-xs text-brand-navy font-bold">{property.buildingType}</strong>
              </div>
            </div>

            {/* Table Item 8 */}
            <div className="border border-zinc-100 p-4.5 rounded-2xl bg-zinc-50 flex items-center gap-3">
              <div className="p-3 bg-white rounded-xl text-brand-navy border border-zinc-100 shrink-0 shadow-sm">
                <ThumbsUp className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 font-sans block uppercase">Book Availability</span>
                <strong className="text-xs text-emerald-600 font-bold">{property.availability}</strong>
              </div>
            </div>

          </div>
        </div>

        {/* Outer body dual alignment grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Main detailed columns left (8/12) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* ==================== 3️⃣ PRICE & PAYMENT INSIGHTS ==================== */}
            <div className="bg-white rounded-3xl border border-brand-navy/10 p-6 md:p-8 shadow-md">
              <div className="flex items-center gap-2 mb-5">
                <CreditCard className="w-5 h-5 text-brand-red shrink-0" />
                <h3 className="text-xl font-belleza font-black text-brand-navy">
                  Price &amp; Payment Architecture
                </h3>
              </div>

              {property.purpose === 'Rent' ? (
                // Rent view
                <div className="flex flex-col gap-6 font-sans">
                  <div className="p-5 bg-zinc-50 rounded-2xl divide-y divide-zinc-200">
                    <div className="flex justify-between py-3">
                      <span className="text-sm text-zinc-500 font-semibold">Monthly Leasing Contract</span>
                      <strong className="text-sm text-brand-navy font-bold">{property.price}</strong>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-sm text-zinc-500 font-semibold">Contract Frequency</span>
                      <strong className="text-sm text-brand-navy font-medium">{property.rentalFrequency}</strong>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-sm text-zinc-500 font-semibold">Cheques Required Upfront</span>
                      <strong className="text-sm text-brand-red font-bold">{property.paymentTerms} Plan</strong>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-sm text-zinc-500 font-semibold">Direct Brokerage Commission</span>
                      <strong className="text-sm text-emerald-600 font-black">0% - Zero Fee Authorized</strong>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed italic">
                    *Rental leases are standardized and authenticated under strict Maharashtra State guidelines. Security check parameters applicable prior to final contract signatures.
                  </p>
                </div>
              ) : property.type === 'Under Construction' ? (
                // Under construction view: Payment Scheme table
                <div className="flex flex-col gap-5">
                  <span className="text-xs text-zinc-500 font-semibold">Linked Construction Milestones Payment table:</span>
                  
                  <div className="overflow-x-auto rounded-2xl border border-zinc-150">
                    <table className="min-w-full text-xs font-sans text-brand-navy divide-y divide-zinc-100">
                      <thead className="bg-[#0E2F56]/5">
                        <tr>
                          <th className="px-4 py-3 text-left font-black">Milestone Stage</th>
                          <th className="px-4 py-3 text-right font-black">Percentage Due</th>
                          <th className="px-4 py-3 text-right font-black">Approximate Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        <tr>
                          <td className="px-4 py-3.5">1. Booking Advance Registration Token</td>
                          <td className="px-4 py-3.5 text-right font-bold text-brand-red">10 %</td>
                          <td className="px-4 py-3.5 text-right font-bold font-mono">₹{Math.round(property.priceNumeric * 0.1).toLocaleString('en-IN')}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3.5">2. Plinth Level Completion Phase</td>
                          <td className="px-4 py-3.5 text-right font-bold text-brand-red">15 %</td>
                          <td className="px-4 py-3.5 text-right font-bold font-mono">₹{Math.round(property.priceNumeric * 0.15).toLocaleString('en-IN')}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3.5">3. Structural RCC Slab Cast milestone</td>
                          <td className="px-4 py-3.5 text-right font-bold text-brand-red">35 %</td>
                          <td className="px-4 py-3.5 text-right font-bold font-mono">₹{Math.round(property.priceNumeric * 0.35).toLocaleString('en-IN')}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3.5">4. Plaster &amp; Tiling internal fittings</td>
                          <td className="px-4 py-3.5 text-right font-bold text-brand-red">20 %</td>
                          <td className="px-4 py-3.5 text-right font-bold font-mono">₹{Math.round(property.priceNumeric * 0.20).toLocaleString('en-IN')}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3.5">5. RERA Certified Handover &amp; Keys</td>
                          <td className="px-4 py-3.5 text-right font-bold text-brand-red">20 %</td>
                          <td className="px-4 py-3.5 text-right font-bold font-mono">₹{Math.round(property.priceNumeric * 0.20).toLocaleString('en-IN')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="p-4 rounded-xl bg-pink-50 text-[11px] text-zinc-500 leading-relaxed">
                    <strong>Program Advantage:</strong> {property.paymentPlan}. Real estate investments in this block qualify for easy bank loan transfers managed in-house under zero brokerage.
                  </div>
                </div>
              ) : (
                // Sale / Ready to move: Mortgage Calculator
                <div className="flex flex-col gap-6 font-sans">
                  <div className="flex items-center gap-2 text-xs font-black text-[#0E2F56]">
                    <Calculator className="w-4 h-4 text-brand-red" />
                    <span>EMI ESTIMATION TOOL (REAL-TIME ESTIMATION)</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-50 border border-zinc-100 p-5 rounded-2xl">
                    <div className="flex flex-col gap-4">
                      {/* Range 1 */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1 text-zinc-500">
                          <span>Home Evaluation:</span>
                          <span className="font-mono text-brand-navy">₹{homeValue.toLocaleString('en-IN')}</span>
                        </div>
                        <input 
                          type="range" 
                          min={Math.round(property.priceNumeric * 0.5)}
                          max={Math.round(property.priceNumeric * 1.5)}
                          value={homeValue}
                          onChange={(e) => setHomeValue(parseInt(e.target.value))}
                          className="w-full h-1.5 bg-zinc-250 rounded-lg cursor-pointer accent-brand-red"
                        />
                      </div>

                      {/* Range 2 */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1 text-zinc-500">
                          <span>Down Payment (Capital):</span>
                          <span className="font-mono text-brand-navy">₹{downPayment.toLocaleString('en-IN')}</span>
                        </div>
                        <input 
                          type="range" 
                          min={Math.round(property.priceNumeric * 0.1)}
                          max={homeValue}
                          value={downPayment}
                          onChange={(e) => setDownPayment(parseInt(e.target.value))}
                          className="w-full h-1.5 bg-zinc-250 rounded-lg cursor-pointer accent-brand-navy"
                        />
                      </div>

                      {/* Side inputs */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-zinc-400 font-bold block mb-1">Interest %</label>
                          <input 
                            type="number" 
                            step="0.1"
                            value={interestRate}
                            onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                            className="w-full bg-white border border-zinc-200 p-1.5 rounded-lg text-xs font-bold text-center"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-zinc-400 font-bold block mb-1">Term (Years)</label>
                          <input 
                            type="number" 
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(parseInt(e.target.value) || 1)}
                            className="w-full bg-white border border-zinc-200 p-1.5 rounded-lg text-xs font-bold text-center"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Result Plate */}
                    <div className="bg-[#0E2F56] text-white p-6 rounded-2xl flex flex-col justify-between items-center text-center">
                      <div className="w-full">
                        <span className="text-[10px] text-zinc-300 block uppercase tracking-widest font-mono">ESTIMATED APX EMI</span>
                        <h4 className="text-2xl md:text-3xl font-belleza font-black text-white mt-1.5 font-mono">
                          ₹{monthlyPayment.toLocaleString('en-IN')}
                        </h4>
                        <span className="text-[9px] text-zinc-300 block font-light">Calculating flat monthly payments</span>
                      </div>

                      <div className="w-full border-t border-white/10 pt-4 mt-6 flex justify-between text-[11px] text-zinc-200">
                        <div>
                          <span className="block leading-none text-zinc-400">Loan Amount:</span>
                          <strong className="font-mono mt-1 block">₹{(homeValue - downPayment).toLocaleString('en-IN')}</strong>
                        </div>
                        <div className="text-right">
                          <span className="block leading-none text-zinc-400">Save Brokerage:</span>
                          <strong className="text-emerald-400 mt-1 block font-bold">100% Free</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ==================== 4️⃣ PROPERTY DESCRIPTION (Human + Structured) ==================== */}
            <div className="bg-white rounded-3xl border border-brand-navy/10 p-6 md:p-8 shadow-md">
              <h3 className="text-xl font-belleza font-black text-[#0E2F56] mb-5">
                Detailed Property Narrative
              </h3>
              
              <div className="flex flex-col gap-5 text-sm font-sans leading-relaxed text-zinc-650">
                {/* Highlight Paragraph (Emotional/Short) */}
                <div className="relative pl-5 border-l-4 border-brand-red py-1 bg-brand-bg/50 rounded-r-xl p-3">
                  <p className="font-medium text-brand-navy italic text-xs sm:text-sm">
                    "{property.description}"
                  </p>
                </div>

                {/* Detailed description */}
                <p className="font-light text-xs sm:text-sm">
                  {property.detailedDescription}
                </p>

                <p className="font-light text-xs sm:text-sm">
                  Property Junction verifies all project files, clearances, title deeds, and developer specifications before onboarding properties. We authorize only clear title direct records. Zero surprises, completely simple.
                </p>
              </div>
            </div>

            {/* ==================== 5️⃣ AMENITIES & FEATURES (Icons) ==================== */}
            <div className="bg-white rounded-3xl border border-brand-navy/10 p-6 md:p-8 shadow-md">
              <h3 className="text-xl font-belleza font-black text-brand-navy mb-5 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand-red" />
                <span>Amenities &amp; Gated Facility Landscape</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-sans">
                {property.amenities.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-2 p-3 bg-zinc-50 border border-zinc-100 rounded-xl hover:bg-zinc-100 duration-200"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-red shadow-sm shrink-0" />
                    <span className="text-xs font-semibold text-[#0E2F56]">{item}</span>
                  </div>
                ))}
                {/* Optional additional ones */}
                <div className="flex items-center gap-2 p-3 bg-zinc-50 border border-zinc-100 rounded-xl hover:bg-zinc-100 duration-200">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-navy shrink-0" />
                  <span className="text-xs font-semibold text-[#0E2F56]">Gated Mosque Nearby</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-zinc-50 border border-zinc-100 rounded-xl hover:bg-zinc-100 duration-200">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-navy shrink-0" />
                  <span className="text-xs font-semibold text-[#0E2F56]">A grade ICSE School</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-zinc-50 border border-zinc-100 rounded-xl hover:bg-zinc-100 duration-200">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-navy shrink-0" />
                  <span className="text-xs font-semibold text-[#0E2F56]">Multilevel CCTV Grid</span>
                </div>
              </div>
            </div>

            {/* ==================== 6️⃣ FLOOR PLAN & DOCUMENTS ==================== */}
            <div className="bg-white rounded-3xl border border-brand-navy/10 p-6 md:p-8 shadow-md">
              <h3 className="text-xl font-belleza font-black text-brand-navy mb-5">
                Floor Plans &amp; Legal Verification
              </h3>

              {/* Tabs controls */}
              <div className="flex border-b border-zinc-150 mb-6 text-xs font-serif font-black uppercase tracking-wider gap-4">
                <button
                  type="button"
                  onClick={() => setActivePlanTab('floorplan')}
                  className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                    activePlanTab === 'floorplan' ? 'border-brand-red text-brand-red' : 'border-transparent text-zinc-400 hover:text-brand-navy'
                  }`}
                >
                  Architectural Floor Plan
                </button>
                <button
                  type="button"
                  onClick={() => setActivePlanTab('brochure')}
                  className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                    activePlanTab === 'brochure' ? 'border-brand-red text-brand-red' : 'border-transparent text-zinc-400 hover:text-brand-navy'
                  }`}
                >
                  Direct PDF Brochure
                </button>
                <button
                  type="button"
                  onClick={() => setActivePlanTab('deed')}
                  className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                    activePlanTab === 'deed' ? 'border-brand-red text-brand-red' : 'border-transparent text-zinc-400 hover:text-brand-navy'
                  }`}
                >
                  Verify Title Deed (RERA)
                </button>
              </div>

              {/* Tab Contents */}
              <div className="font-sans">
                {activePlanTab === 'floorplan' && (
                  <div className="flex flex-col gap-4">
                    <p className="text-xs text-zinc-500">
                      Standard layout showing optimum space distribution with clear visual separations.
                    </p>
                    <div className="max-w-md mx-auto rounded-3xl overflow-hidden border border-zinc-100 shadow-inner bg-zinc-50 p-4">
                      <img 
                        src={property.floorPlanImage} 
                        alt="2D Detailed floor map blueprint" 
                        className="w-full object-contain h-72 brightness-95 rounded-2xl"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                )}

                {activePlanTab === 'brochure' && (
                  <div className="py-8 text-center bg-zinc-50 rounded-2xl border border-zinc-150 border-dashed flex flex-col items-center p-6 gap-3">
                    <FileText className="w-12 h-12 text-zinc-400" />
                    <h5 className="font-bold text-sm text-brand-navy">Premium Digital Brochure ready for processing</h5>
                    <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                      Contains high definition angles, materials specification sheets, pricing indexes, and structural guarantees.
                    </p>
                    <a
                      href="#download"
                      onClick={(e) => { e.preventDefault(); alert("Downloader initialized! File: property_junction_proposal.pdf"); }}
                      className="mt-2 bg-brand-navy hover:bg-brand-red text-white text-xs font-serif font-black uppercase tracking-wider px-6 py-3 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <ArrowDown className="w-4 h-4" />
                      <span>Download PDF Proposal</span>
                    </a>
                  </div>
                )}

                {activePlanTab === 'deed' && (
                  <div className="py-6 flex flex-col gap-4">
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-150 flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-sm text-emerald-800">Clear Title &amp; RERA Registered Project</strong>
                        <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                          Title verification has been fully examined by Property Junction’s legal wing. Land ownership title deeds, local municipal permits (Thane/MMRDA), RERA filings, and structural integrity approvals are 100% compliant.
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-brand-bg rounded-2xl border border-brand-navy/5 text-xs text-brand-navy flex justify-between items-center">
                      <div>
                        <span className="text-zinc-500 block">Consultant Reg:</span>
                        <strong className="font-mono">MAHARERA consultant no: A51700035091</strong>
                      </div>
                      <span className="text-emerald-600 font-bold bg-white px-3 py-1 rounded-lg shadow-sm border border-emerald-100">
                        100% SECURED DEED
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ==================== 7️⃣ LOCATION & NEIGHBOURHOOD ==================== */}
            <div className="bg-white rounded-3xl border border-brand-navy/10 p-6 md:p-8 shadow-md">
              <h3 className="text-xl font-belleza font-black text-brand-navy mb-5 flex items-center gap-1.5">
                <MapPin className="w-5 h-5 text-brand-red shrink-0" />
                <span>Neighborhood Transit &amp; Landmarks</span>
              </h3>

              {/* Embedded static/responsive map element */}
              <div className="h-64 w-full rounded-2xl overflow-hidden shadow-sm relative border border-zinc-150 bg-zinc-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1884.8778401344686!2d73.0520623!3d19.1234914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c1b5a557b4f5%3A0x67db91be862ddb80!2sMM%20City!5e0!3m2!1sen!2sin!4v1718800000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0) contrast(1.1)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Specific Location detail Map Frame"
                />
              </div>

              {/* Automated estimates listed beautifully */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                
                <div className="border border-zinc-100 p-4 rounded-xl bg-zinc-50 font-sans">
                  <strong className="text-xs text-brand-navy font-bold block mb-1">Education Hubs</strong>
                  <div className="text-[11px] text-zinc-500 space-y-1">
                    <p>• Symbiosis School - 8 mins</p>
                    <p>• BK Birla School - 12 mins</p>
                    <p>• Shilphata High School - 4 mins</p>
                  </div>
                </div>

                <div className="border border-zinc-100 p-4 rounded-xl bg-zinc-50 font-sans">
                  <strong className="text-xs text-brand-navy font-bold block mb-1">Transit &amp; Highway</strong>
                  <div className="text-[11px] text-zinc-500 space-y-1">
                    <p>• Proposed Metro - 2 mins walk</p>
                    <p>• Dombivli Station - 15 mins</p>
                    <p>• Ghansoli Interchange - 20 mins</p>
                  </div>
                </div>

                <div className="border border-zinc-100 p-4 rounded-xl bg-zinc-50 font-sans">
                  <strong className="text-xs text-brand-navy font-bold block mb-1">Medical Centers</strong>
                  <div className="text-[11px] text-zinc-500 space-y-1">
                    <p>• Fortis Hiranandani - 18 mins</p>
                    <p>• Neon Medical Care - 5 mins</p>
                    <p>• Kalsekar Hospital - 8 mins</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Columns: Agent + Lead Form (4/12) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* ==================== 8️⃣ AGENT / AGENCY CARD (TRUST ELEMENT) ==================== */}
            <div className="bg-white rounded-3xl border border-brand-navy/10 p-6 md:p-8 shadow-xl relative overflow-hidden flex flex-col gap-5">
              <span className="text-[9px] text-zinc-400 font-sans font-black tracking-widest block uppercase">RESPONSIBLE SECTOR MANAGER</span>
              
              <div className="flex items-center gap-4">
                <img 
                  src={property.agentPhoto} 
                  alt={property.agentName} 
                  className="w-16 h-16 rounded-full object-cover border border-zinc-200"
                />
                <div>
                  <h4 className="text-lg font-belleza font-black text-brand-navy leading-tight">{property.agentName}</h4>
                  <span className="text-xs font-semibold text-brand-red font-sans">{property.agentRole}</span>
                  <p className="text-[10px] text-zinc-400 font-sans font-light mt-0.5">RERA Registered Agent ID</p>
                </div>
              </div>

              <div className="border-t border-b border-zinc-100 py-4 flex flex-col gap-2.5 font-sans">
                <div className="flex items-center gap-2.5 text-xs font-medium text-zinc-650">
                  <Phone className="w-4 h-4 text-brand-red shrink-0" />
                  <span>Call: <strong className="font-mono text-brand-navy select-all">{property.agentPhone}</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-zinc-650">
                  <Mail className="w-4 h-4 text-brand-red shrink-0" />
                  <span>Email: <strong className="font-mono text-brand-navy select-all underline">{property.agentEmail}</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-zinc-650">
                  <ShieldCheck className="w-4 h-4 text-brand-red shrink-0" />
                  <span>Offices: Shilphata Junction, M M City</span>
                </div>
              </div>

              {/* Agent contact buttons */}
              <button 
                onClick={triggerWhatsAppDirect}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-sans font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-101 duration-200 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>DIRECT WA INQUIRY</span>
              </button>
            </div>

            {/* ==================== 9️⃣ LEAD FORM (PROPERTY-SPECIFIC) ==================== */}
            <div className="bg-white rounded-3xl border border-brand-navy/10 p-6 md:p-8 shadow-xl">
              <span className="text-[9px] text-zinc-400 font-sans font-black tracking-widest block uppercase">DIRECT PROPOSAL DISPATCH</span>
              <h4 className="text-lg font-belleza font-black text-[#0E2F56] mt-1 mb-4">Request Fast Clearance Call</h4>
              
              <form onSubmit={handleLeadFormSubmit} className="flex flex-col gap-4 font-sans text-xs font-medium text-zinc-600">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-zinc-400 uppercase font-bold">Your Golden Name *</label>
                  <input 
                    type="text" 
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="Enter full legal name"
                    className="w-full bg-brand-bg border border-zinc-200 focus:border-brand-red rounded-xl p-3 text-xs focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-zinc-400 uppercase font-bold">Mobile Phone No *</label>
                    <input 
                      type="tel" 
                      required
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder="+91..."
                      className="w-full bg-brand-bg border border-zinc-200 focus:border-brand-red rounded-xl p-3 text-xs focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-zinc-400 uppercase font-bold">Email Address ID</label>
                    <input 
                      type="email" 
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder="e.g. name@server.com"
                      className="w-full bg-brand-bg border border-zinc-200 focus:border-brand-red rounded-xl p-3 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-zinc-400 uppercase font-bold">Auto-Compiled Message Proposal</label>
                  <textarea 
                    rows={4}
                    value={leadMessage}
                    onChange={(e) => setLeadMessage(e.target.value)}
                    className="w-full bg-brand-bg border border-zinc-200 focus:border-brand-red rounded-xl p-3 text-xs focus:outline-none leading-relaxed"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#0E2F56] hover:bg-brand-red text-white font-serif font-black uppercase text-xs tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>SEND DISPATCH VIA WHATSAPP</span>
                </button>

                <p className="text-[11px] text-zinc-400 text-center leading-relaxed mt-1">
                  Once clicked, this auto-fills your message draft and seamlessly opens your WhatsApp client to direct Rajesh.
                </p>
              </form>
            </div>

          </div>

        </div>

        {/* ==================== 🔟 SIMILAR PROPERTIES (AUTO) ==================== */}
        <div className="mt-12 border-t border-brand-navy/10 pt-12">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] text-brand-red font-sans font-black tracking-widest uppercase block">Property Junction Recommendation</span>
              <h3 className="text-2xl md:text-3xl font-belleza font-black text-brand-navy mt-1">
                Explore Similar Premium Inventory
              </h3>
            </div>
            <button 
              onClick={onBackToSearch}
              className="text-xs font-serif font-bold text-brand-navy hover:text-brand-red underline cursor-pointer"
            >
              Browse complete dynamic gallery
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarProperties.map((prop) => (
              <div 
                key={prop.id} 
                className="bg-white rounded-3xl overflow-hidden border border-brand-navy/10 hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                onClick={() => onNavigateToProperty(prop.id)}
              >
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={prop.image} 
                    alt={prop.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-brand-navy/90 text-white text-[9px] font-bold font-sans px-2.5 py-1 rounded-full uppercase">
                    {prop.bhk === 0 ? "Studio" : `${prop.bhk} BHK`}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-brand-red text-white text-[9px] font-bold font-sans px-2.5 py-1 rounded-md uppercase">
                    {prop.type}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] text-zinc-400 font-sans font-bold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-red" />
                      <span className="truncate">{prop.location}</span>
                    </span>
                    <h4 className="text-base font-belleza font-bold text-brand-navy group-hover:text-brand-red transition-all duration-200">
                      {prop.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-zinc-100 mt-2">
                    <span className="text-sm font-belleza font-bold text-brand-red">{prop.price}</span>
                    <span className="text-[10px] text-zinc-450 font-bold uppercase hover:underline">Explore Details →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Sticky mobile CTA bar for prompt connection (Mobile only) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-navy/10 py-3.5 px-4 flex gap-3 text-center sm:hidden justify-between items-center shadow-lg">
        <div className="text-left">
          <span className="text-[8px] text-zinc-400 block font-bold leading-none uppercase">RATE STARTS</span>
          <strong className="text-sm text-brand-red font-bold font-belleza tracking-wide mt-1 block">{property.price}</strong>
        </div>

        <div className="flex gap-2 shrink-0">
          <button 
            onClick={triggerWhatsAppDirect}
            className="bg-emerald-500 text-white font-bold p-3 rounded-xl flex items-center justify-center cursor-pointer"
            title="WhatsApp Inquiry"
          >
            <Phone className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onSelectPropertyToBook(property)}
            className="bg-brand-red text-white text-xs font-serif font-black px-5 py-3 rounded-xl shadow-md cursor-pointer tracking-wider"
          >
            BOOK SITE VISIT
          </button>
        </div>
      </div>

    </div>
  );
};
