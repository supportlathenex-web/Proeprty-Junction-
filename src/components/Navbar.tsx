import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, Phone, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onNavigateToPrivacy: () => void;
  onNavigateToHome: () => void;
  onNavigateToProperties: () => void;
  currentView: 'home' | 'properties' | 'property-detail' | 'privacy';
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onNavigateToPrivacy,
  onNavigateToHome,
  onNavigateToProperties,
  currentView,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (selectorId: string) => {
    setIsMobileMenuOpen(false);
    onNavigateToHome();
    
    setTimeout(() => {
      const element = document.getElementById(selectorId);
      if (element) {
        const offset = 90;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled || currentView !== 'home'
          ? 'bg-brand-bg/90 backdrop-blur-md py-3 shadow-md border-b border-brand-navy/5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo/Signature */}
        <div onClick={onNavigateToHome} className="cursor-pointer">
          <Logo className="h-10 sm:h-12" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-belleza text-sm font-semibold tracking-wide">
          <button
            onClick={() => handleLinkClick('about-section-id')}
            className="text-brand-navy hover:text-brand-red transition-colors duration-200 cursor-pointer"
            id="nav-link-about"
          >
            About Hub
          </button>
          <button
            onClick={() => handleLinkClick('services-section-id')}
            className="text-brand-navy hover:text-brand-red transition-colors duration-200 cursor-pointer"
            id="nav-link-services"
          >
            Signature Services
          </button>
          <button
            onClick={onNavigateToProperties}
            className={`transition-colors duration-200 cursor-pointer ${
              currentView === 'properties' ? 'text-brand-red font-bold' : 'text-brand-navy hover:text-brand-red'
            }`}
            id="nav-link-properties"
          >
            Exclusive Collection
          </button>
          <button
            onClick={onNavigateToPrivacy}
            className={`flex items-center gap-1 transition-colors duration-200 cursor-pointer ${
              currentView === 'privacy'
                ? 'text-brand-red font-bold'
                : 'text-brand-navy hover:text-brand-red'
            }`}
            id="nav-link-privacy"
          >
            <ShieldCheck className="w-4 h-4" />
            Privacy Protocol
          </button>
        </nav>

        {/* Action Button & Hotline */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+918668644479"
            className="flex items-center gap-1.5 text-xs text-brand-navy font-bold font-sans hover:text-brand-red transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-brand-red animate-pulse" />
            +91 86686 44479
          </a>
          <button
            onClick={onOpenBooking}
            className="bg-brand-red hover:bg-brand-navy text-white text-xs font-serif font-bold tracking-wider px-5 py-2.5 rounded-lg transition-all duration-300 cursor-pointer shadow-md shadow-brand-red/10 hover:shadow-brand-navy/10"
            id="nav-cta-book-visit"
          >
            Book Site Visit
          </button>
        </div>

        {/* Mobile Hamburger toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href="tel:+918668644479"
            className="text-brand-navy hover:text-brand-red p-2"
          >
            <Phone className="w-4 h-4 text-brand-red" />
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-brand-navy focus:outline-none p-2"
            id="mobile-menu-burger-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-bg/95 backdrop-blur-lg border-b border-brand-navy/10 flex flex-col px-6 py-6 absolute top-full left-0 w-full shadow-xl z-30 font-belleza gap-4">
          <button
            onClick={() => handleLinkClick('about-section-id')}
            className="text-left text-brand-navy text-base py-2 border-b border-brand-navy/5 font-semibold"
            id="mobile-nav-about"
          >
            About Hub
          </button>
          <button
            onClick={() => handleLinkClick('services-section-id')}
            className="text-left text-brand-navy text-base py-2 border-b border-brand-navy/5 font-semibold"
            id="mobile-nav-services"
          >
            Signature Services
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onNavigateToProperties();
            }}
            className="text-left text-brand-navy text-base py-2 border-b border-brand-navy/5 font-semibold"
            id="mobile-nav-properties"
          >
            Exclusive Collection
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onNavigateToPrivacy();
            }}
            className="text-left text-brand-navy text-base py-2 border-b border-brand-navy/5 font-semibold flex items-center justify-between"
            id="mobile-nav-privacy"
          >
            <span>Privacy Protocol</span>
            <ShieldCheck className="w-4 h-4 text-brand-red" />
          </button>

          <div className="flex flex-col gap-3 mt-4 pt-2">
            <span className="text-[10px] text-zinc-400 font-sans uppercase tracking-widest text-center">
              Available 24 Hours. Shilphata, Thane
            </span>
            <a
              href="tel:+918668644479"
              className="w-full text-center py-2.5 bg-brand-navy text-white rounded-lg text-xs font-semibold font-sans tracking-wide"
            >
              Hotline: +91 86686 44479
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full text-center py-3 bg-brand-red text-white rounded-lg text-xs font-bold tracking-wide shadow-md shadow-brand-red/10"
              id="mobile-nav-book-cta"
            >
              BOOK SITE VISIT
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
