import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Properties } from './components/Properties';
import { PropertyDetailPage } from './components/PropertyDetailPage';
import { BookingModal } from './components/BookingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { propertiesCatalog, clientReviews, initialInquiries } from './propertiesData';
import { Property, LeadInquiry } from './types';
import { Sparkles, ArrowUpRight, ShieldCheck, Mail, Phone, MapPin, Layers } from 'lucide-react';

export default function App() {
  // Tabs: 'properties' | 'philosophy' | 'advisor'
  const [currentTab, setCurrentTab] = useState<'properties' | 'philosophy' | 'advisor'>('properties');

  // Detail Popups
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Inquiry / Booking state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingProperty, setBookingProperty] = useState<Property | undefined>(undefined);

  // Leads Inquiry Database State
  const [inquiries, setInquiries] = useState<LeadInquiry[]>(initialInquiries);

  // Toast Notifications
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'alert' } | null>(null);

  const triggerToast = (message: string, type: 'success' | 'alert') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Submission handles
  const handleAddNewInquiry = (newInq: Omit<LeadInquiry, 'id' | 'status' | 'submittedAt'>) => {
    const fresh: LeadInquiry = {
      ...newInq,
      id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Inbound',
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };

    setInquiries(prev => [fresh, ...prev]);
    triggerToast(`Inquiry for "${newInq.propertyName}" Submitted Securly to Advisor Portal`, 'success');
  };

  // Add a manual lead from Admin Portfolios
  const handleAddManualLead = (newLead: Omit<LeadInquiry, 'id' | 'status' | 'submittedAt'>) => {
    const fresh: LeadInquiry = {
      ...newLead,
      id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Advisor Assigned',
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };

    setInquiries(prev => [fresh, ...prev]);
    triggerToast(`Manual Record created for ${newLead.clientName} • synced to database`, 'success');
  };

  // Update lead Status
  const handleUpdateLeadStatus = (id: string, nextStatus: LeadInquiry['status']) => {
    setInquiries(prev =>
      prev.map(item => (item.id === id ? { ...item, status: nextStatus } : item))
    );
    triggerToast(`Lead Status updated to ${nextStatus}`, 'success');
  };

  // Approve a Tour site walkthrough
  const handleApproveTour = (id: string) => {
    setInquiries(prev =>
      prev.map(item => (item.id === id ? { ...item, status: 'Site Visit Booked' } : item))
    );
    const lead = inquiries.find(item => item.id === id);
    triggerToast(`Tour Walkthrough Scheduled for ${lead ? lead.clientName : 'Client'}!`, 'success');
  };

  // Decline/archive inquiry
  const handleDeclineInquiry = (id: string) => {
    setInquiries(prev => prev.filter(item => item.id !== id));
    triggerToast('Lead archived and archived securely.', 'alert');
  };

  const activeInquiriesCount = inquiries.length;

  return (
    <div className="bg-[#FAF9F6] min-h-screen flex flex-col font-sans antialiased text-zinc-900 selection:bg-zinc-950 selection:text-white">
      {/* Precision Micro Border Top */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-950 z-50 pointer-events-none" />

      {/* Navigation Space */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-zinc-200/50 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div onClick={() => setCurrentTab('properties')} className="cursor-pointer">
            <div className="flex items-center gap-2.5">
              <div className="flex flex-col">
                <span className="font-sans text-sm font-extrabold tracking-wide uppercase leading-none text-zinc-950">
                  Property Junction
                </span>
                <span className="font-mono text-[9px] font-semibold tracking-widest text-[#93815D] mt-1 leading-none">
                  Brokerage & Consultation
                </span>
              </div>
            </div>
          </div>

          {/* Center Tabs Navigation */}
          <nav className="sm:flex items-center gap-1 p-1 bg-zinc-100 rounded-full text-xs font-semibold">
            <button
              onClick={() => setCurrentTab('properties')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                currentTab === 'properties'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-650 hover:text-zinc-950'
              }`}
            >
              Residences
            </button>
            <button
              onClick={() => setCurrentTab('philosophy')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                currentTab === 'philosophy'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-650 hover:text-zinc-950'
              }`}
            >
              Philosophy
            </button>
            <button
              onClick={() => setCurrentTab('advisor')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'advisor'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-650 hover:text-zinc-950'
              }`}
            >
              Advisor Logs
              {activeInquiriesCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#93815D] text-white text-[9px] flex items-center justify-center font-bold">
                  {activeInquiriesCount}
                </span>
              )}
            </button>
          </nav>

          {/* Quick Consultation call trigger */}
          <button
            onClick={() => {
              setBookingProperty(undefined);
              setIsBookingOpen(true);
            }}
            className="hidden md:flex py-2 px-4.5 bg-[#93815D] hover:bg-[#83714D] text-white rounded-xl text-xs font-bold tracking-wide shadow-sm transition-all cursor-pointer items-center gap-1.5"
          >
            Request Brochure
          </button>
        </div>
      </header>

      {/* Main Spaces */}
      <main className="flex-grow pt-24 pb-12">
        {currentTab === 'properties' && (
          <div className="space-y-16 animate-fade-in">
            {/* Elegant Real Estate Hero Banner with Interactive search suggestions */}
            <Hero
              onSearchSelect={(prop) => {
                setSelectedProperty(prop);
              }}
              onQuickBook={(prop) => {
                setBookingProperty(prop);
                setIsBookingOpen(true);
              }}
            />

            {/* Quick materials / standards specs spotlight */}
            <section className="bg-white py-14 border-t border-b border-zinc-200/50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] text-[#93815D] font-bold tracking-widest uppercase">EXPERIENCE</span>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950">Expert Brokerage</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed">
                      With years of experience in the real estate market, we guide you through every step of your property journey, ensuring a smooth and hassle-free transaction.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] text-[#93815D] font-bold tracking-widest uppercase">TRUST</span>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950">Verified Listings</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed">
                      We offer a curated selection of thoroughly vetted properties, ensuring complete transparency and peace of mind for buyers and investors.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] text-[#93815D] font-bold tracking-widest uppercase">DEDICATION</span>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950">Client-First Approach</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed">
                      Our focus is entirely on understanding your needs, offering personalized property recommendations, and negotiating the best possible terms on your behalf.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Core Residential Portfolios Grid section */}
            <section>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 text-center md:text-left">
                <span className="text-[9px] font-mono tracking-widest text-[#93815D] font-bold uppercase">AVAILABLE LISTINGS</span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-955 tracking-tight mt-1">
                  Active Real Estate Developments
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  Click on details to study floor designs, sustainable credentials, and material bills.
                </p>
              </div>

              <Properties
                onSelectProperty={(prop) => setSelectedProperty(prop)}
                onOpenBookWindow={(prop) => {
                  setBookingProperty(prop);
                  setIsBookingOpen(true);
                }}
              />
            </section>

            {/* Client feedback showcases */}
            <section className="bg-white py-16 border-t border-zinc-200/50">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-10">
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block">RESIDENT COMMENDATIONS</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {clientReviews.map((rev) => (
                    <div key={rev.id} className="space-y-4 text-left p-6 bg-zinc-50 rounded-2xl border border-zinc-150">
                      <div className="flex gap-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <span key={i} className="text-amber-500 text-sm">★</span>
                        ))}
                      </div>
                      <p className="text-zinc-650 text-[11px] leading-relaxed italic">"{rev.comment}"</p>
                      <div>
                        <h4 className="text-xs font-bold text-zinc-950">{rev.author}</h4>
                        <p className="text-[9px] text-[#93815D] font-mono uppercase mt-0.5">{rev.credentials}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {currentTab === 'philosophy' && (
          <div className="py-8 animate-fade-in">
            <About />
          </div>
        )}

        {currentTab === 'advisor' && (
          <div className="py-8 animate-fade-in">
            <AdminDashboard
              inquiries={inquiries}
              onApproveTour={handleApproveTour}
              onDeclineInquiry={handleDeclineInquiry}
              onUpdateStatus={handleUpdateLeadStatus}
              onAddNewPhoneLead={handleAddManualLead}
            />
          </div>
        )}
      </main>

      {/* Institutional Real Estate Footer */}
      <Footer onSelectTab={setCurrentTab} currentTab={currentTab} />

      {/* Property specs details overlay */}
      {selectedProperty && (
        <PropertyDetailPage
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onRequestWalkthrough={() => {
            setBookingProperty(selectedProperty);
            setSelectedProperty(null);
            setIsBookingOpen(true);
          }}
        />
      )}

      {/* Interactive Walkthrough Inquiry booking modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedProperty={bookingProperty}
        onSubmitInquiry={handleAddNewInquiry}
      />

      {/* Interactive Global Toast Notification messages */}
      {toast && (
        <div className="fixed bottom-6 left-6 z-50 bg-zinc-950 text-white p-4.5 rounded-2xl shadow-2xl border border-zinc-800 flex items-center gap-3 max-w-sm animate-slide-up">
          <span className={`w-2.5 h-2.5 rounded-full ${toast.type === 'success' ? 'bg-emerald-450' : 'bg-red-400'}`} />
          <p className="text-[11px] font-mono tracking-wide leading-relaxed">{toast.message}</p>
        </div>
      )}
    </div>
  );
}
