import React, { useState } from 'react';
import { Property } from '../types';
import { X, ShieldCheck, Cpu, Wind, Hammer, Layers, LayoutGrid, Sparkles, MapPin, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PropertyDetailPageProps {
  property: Property;
  onClose: () => void;
  onRequestWalkthrough: () => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  property,
  onClose,
  onRequestWalkthrough,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'specifications' | 'amenties'>('overview');
  const [selectedPhoto, setSelectedPhoto] = useState(property.mainImage);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Dark surrounding backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md"
        />

        {/* Modal Stage container */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden z-10 flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[850px] text-left font-sans"
        >
          {/* Close button top right */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-zinc-500 hover:text-zinc-950 bg-white/90 backdrop-blur-xs shadow-xs z-20 hover:scale-105 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left Block: Image Viewport with thumbnail strip */}
          <div className="w-full md:w-1/2 bg-zinc-50 flex flex-col justify-between border-r border-zinc-200/50 p-6 space-y-6">
            <div className="flex-grow flex items-center justify-center rounded-2xl overflow-hidden aspect-video relative max-h-[300px] md:max-h-[400px]">
              <img
                src={selectedPhoto}
                alt={property.title}
                className="w-full h-full object-cover rounded-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 py-1 px-2.5 bg-zinc-950/70 text-white rounded-lg text-[9px] font-mono tracking-wider uppercase">
                Active Viewport
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="space-y-2">
              <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">PROPERTY IMAGES</span>
              <div className="grid grid-cols-4 gap-2.5">
                {property.galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPhoto(img)}
                    className={`aspect-video rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedPhoto === img ? 'border-zinc-950 bg-zinc-900 scale-95 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Block: Content area */}
          <div className="w-full md:w-1/2 flex flex-col justify-between overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="space-y-6">
              {/* Header Title Space */}
              <div className="space-y-1.5 pb-4 border-b border-zinc-150">
                <span className="text-[10px] font-mono tracking-widest text-[#93815D] font-bold uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {property.location} PROPERTY
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-950 leading-tight">
                  {property.title}
                </h3>
                <p className="text-xs text-zinc-550 italic">{property.subLocation}</p>
              </div>

              {/* Menu Tabs Navigation */}
              <div className="flex gap-1.5 p-1 bg-zinc-100 rounded-xl">
                {(['overview', 'specifications', 'amenties'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`flex-grow text-center py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all ${
                      activeTab === t
                        ? 'bg-white text-zinc-950 shadow-xs'
                        : 'text-zinc-500 hover:text-zinc-900 hover:bg-white/40'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Tab Outputs */}
              <div className="min-h-[220px]">
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5"
                  >
                    <p className="text-xs text-zinc-600 leading-relaxed">{property.description}</p>

                    {/* Numeric Specifications Key metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      {property.features.map((item, i) => (
                        <div key={i} className="p-3 bg-zinc-50 border border-zinc-155 rounded-xl space-y-0.5">
                          <span className="text-[9px] font-mono uppercase text-zinc-450 block">{item.label}</span>
                          <span className="text-xs font-bold text-zinc-950">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'specifications' && (
                  <motion.div
                    initial={{ opacity: 0, x: 5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    {property.specifications.map((spec, i) => (
                      <div key={i} className="flex gap-4 items-start pb-3 border-b border-zinc-100 last:border-0">
                        <span className="p-2 bg-zinc-50 rounded-xl border border-zinc-200">
                          {spec.category === 'Structure' ? (
                            <Layers className="w-3.5 h-3.5 text-zinc-600" />
                          ) : spec.category === 'HVAC Control' ? (
                            <Wind className="w-3.5 h-3.5 text-zinc-600" />
                          ) : spec.category === 'Automation' ? (
                            <Cpu className="w-3.5 h-3.5 text-zinc-600" />
                          ) : (
                            <Hammer className="w-3.5 h-3.5 text-zinc-600" />
                          )}
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-zinc-900">{spec.category}</h4>
                          <p className="text-[11px] text-zinc-500 mt-1 lines-relaxed leading-relaxed">{spec.details}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'amenties' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {property.amenities.map((amenity, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-650">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="font-medium text-zinc-800">{amenity}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-4 border-t border-zinc-150 flex items-center justify-between gap-4 mt-6">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-zinc-400 block uppercase">STARTING BASE PRICE</span>
                <span className="text-lg font-black text-zinc-950 font-mono tracking-tight">{property.price}</span>
              </div>

              <button
                onClick={onRequestWalkthrough}
                className="py-3 px-6 bg-zinc-950 hover:bg-zinc-850 text-white rounded-xl text-xs font-semibold tracking-wide transition-colors flex items-center gap-2 cursor-pointer shadow-sm shadow-zinc-950/20"
              >
                Contact Broker
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
