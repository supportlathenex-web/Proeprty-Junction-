import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Compass, CheckCircle2, TrendingUp, Gem, ShieldAlert } from 'lucide-react';

export const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const listServices = [
    {
      id: 0,
      icon: <Building2 className="w-8 h-8 text-brand-red" />,
      title: "Tailored Property Selection",
      tagline: "Custom-Mapped 1, 2, & 3 BHK Living Spaces",
      description: "We assess your strict spacing goals, budget tolerances, and aesthetic desires to present customized property selections. From budget-friendly smart apartments to spectacular luxury heights, our portfolio covers both under-construction value-buying states and immediate ready-to-move-in keys across Shilphata, Kharghar, and Thane.",
      elements: [
        "1 BHK Smart layouts (Perfect for new buyers)",
        "2 BHK Balcony residences (Ideal for nuclear families)",
        "3 BHK Panoramic decks (For exquisite family comfort)",
        "Ready-to-move-in houses to avoid project delays",
        "Under-construction premium spaces for solid equity growth"
      ]
    },
    {
      id: 1,
      icon: <Compass className="w-8 h-8 text-brand-red" />,
      title: "Assisted Site Visits",
      tagline: "VIP Transits & Doorstep Pickups",
      description: "Finding your dream property shouldn't involve transit hassle. We coordinate premium personalized tours to developer sites, providing private air-conditioned vehicle transfers, expert neighborhood social audits, and detailed layouts comparisons.",
      elements: [
        "Complimentary luxury pickup & drop security",
        "Expert comparison of layout maps & configurations",
        "True carpet area verification on physical site",
        "Detailed walk-throughs of all structural amenities",
        "Full transparent neighborhood roadmap analysis"
      ]
    },
    {
      id: 2,
      icon: <Gem className="w-8 h-8 text-brand-red" />,
      title: "0% Brokerage & 20:80 Schemes",
      tagline: "Consumer-Focused Financial Protection",
      description: "Benefit from substantial savings. Property Junction acts as an certified direct marketing partner to major builders—which means our platform charges 0% brokerage on direct primary bookings. We also structure verified 20:80 builders programs to minimize initial capital cashflow.",
      elements: [
        "Absolutely 0% brokerage or platform fee percentage",
        "Safe builder negotiation for best prices",
        "Structures: 20% payment now, 80% on registries",
        "Vetted banks and financial assistance channels",
        "Zero hidden documentation or processing levies"
      ]
    },
    {
      id: 3,
      icon: <TrendingUp className="w-8 h-8 text-brand-red" />,
      title: "Investor Yield & Liquidity",
      tagline: "Renting, Reselling & Premium ROI",
      description: "For active capital investors, we don't vanish after initial collection. We provide full-lifecycle leasing, tenant vetting, rent collection management, and future secondary market resales to secure maximum cash-on-cash return on investments.",
      elements: [
        "Corporate tenant sourcing & comprehensive vetting",
        "High-yield rental listings across Shilphata and Thane",
        "Hassle-free lease registration & legal agreements",
        "Secondary market resales with solid capital gains",
        "Real-time market valuation reporting for active landlords"
      ]
    }
  ];

  return (
    <section id="services-section-id" className="py-20 bg-brand-bg relative border-t border-brand-navy/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Upper Title Accent */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-brand-red uppercase mb-4 block">
            HOW WE ACCOMPLISH MORE
          </span>
          <h2 className="text-3xl md:text-5xl font-belleza font-extrabold text-[#0E2F56] tracking-tight leading-none">
            Signature Real Estate Services
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-4 leading-relaxed font-sans font-light">
            We operate under a full-service philosophy, handling every critical milestone. Whether finding a layout, securing a mortgage, or organizing tenant logistics, our agency operates with stellar speed and customer-first alignment.
          </p>
        </div>

        {/* Dynamic Interactive Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Tab Selection List (Left 4/12 width) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {listServices.map((service, index) => (
              <button
                key={service.id}
                onClick={() => setActiveTab(index)}
                className={`text-left p-6 rounded-2xl border transition-all duration-300 flex items-center gap-5 cursor-pointer ${
                  activeTab === index
                    ? 'bg-brand-navy text-white border-transparent shadow-xl'
                    : 'bg-white text-brand-navy border-brand-navy/10 hover:shadow-md'
                }`}
                id={`services-tab-btn-${service.id}`}
              >
                {/* Micro logo accent */}
                <div className={`p-3 rounded-xl ${
                  activeTab === index ? 'bg-brand-white/10 text-brand-red' : 'bg-brand-bg text-brand-red'
                }`}>
                  {service.icon}
                </div>

                <div className="flex flex-col gap-1">
                  <h4 className="text-base sm:text-lg font-belleza font-extrabold tracking-tight">
                    {service.title}
                  </h4>
                  <span className={`text-[10px] sm:text-xs font-sans ${
                    activeTab === index ? 'text-zinc-300' : 'text-zinc-500'
                  }`}>
                    {service.tagline}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Active Tab Screen Details (Right 7/12 width) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-navy/10 shadow-sm h-full flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-brand-red uppercase tracking-widest font-bold">
                    ACTIVE PROTOCOL SYSTEM
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-belleza font-extrabold text-[#0E2F56] tracking-tight mt-2 mb-1">
                    {listServices[activeTab].title}
                  </h3>
                  <p className="text-xs sm:text-sm font-belleza text-brand-red tracking-wide uppercase font-semibold">
                    {listServices[activeTab].tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed mt-4 font-sans font-light">
                    {listServices[activeTab].description}
                  </p>

                  {/* Bullet points mapping */}
                  <div className="mt-8 flex flex-col gap-3">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#0E2F56] opacity-65 font-sans">
                      Key Program Commitments:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {listServices[activeTab].elements.map((el, indexKey) => (
                        <div key={indexKey} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4.5 h-4.5 text-brand-red shrink-0 mt-0.5" />
                          <span className="text-xs font-medium text-zinc-700 font-sans">{el}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-zinc-100 flex items-center justify-between">
                  <div className="text-[10px] text-zinc-400 font-mono">
                    REF: PJ-SERVICES-{activeTab + 1}
                  </div>
                  <div className="text-xs font-bold font-sans text-brand-navy uppercase tracking-wider">
                    Property Junction Agency
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
