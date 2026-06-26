import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { ShoppingBag, Search, ClipboardList, Database, LayoutGrid, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenCart: () => void;
  cartCount: number;
  currentTab: 'catalog' | 'ledger' | 'applications';
  onChangeTab: (tab: 'catalog' | 'ledger' | 'applications') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCart,
  cartCount,
  currentTab,
  onChangeTab,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabSelect = (tab: 'catalog' | 'ledger' | 'applications') => {
    onChangeTab(tab);
    setIsMobileMenuOpen(false);
    // Smooth scroll back to top to transition tabs cleanly
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-header py-3.5 shadow-sm border-b border-zinc-200/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo Wordmark */}
        <div onClick={() => handleTabSelect('catalog')} className="cursor-pointer">
          <Logo className="h-9 sm:h-10" />
        </div>

        {/* Dynamic Nav Actions */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 bg-zinc-200/50 border border-zinc-200/30 rounded-full text-xs font-semibold">
          <button
            onClick={() => handleTabSelect('catalog')}
            className={`px-4 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5 ${
              currentTab === 'catalog'
                ? 'bg-white text-zinc-950 shadow-xs ring-1 ring-zinc-500/5'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/40'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Active Catalog
          </button>
          <button
            onClick={() => handleTabSelect('ledger')}
            className={`px-4 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5 ${
              currentTab === 'ledger'
                ? 'bg-white text-zinc-950 shadow-xs ring-1 ring-zinc-500/5'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/40'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            Registry Ledger
          </button>
          <button
            onClick={() => handleTabSelect('applications')}
            className={`px-4 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5 ${
              currentTab === 'applications'
                ? 'bg-white text-zinc-950 shadow-xs ring-1 ring-zinc-500/5'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/40'
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            Filing Auditor
          </button>
        </nav>

        {/* Cart Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-zinc-950 hover:bg-zinc-850 text-white rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm shadow-zinc-950/10 cursor-pointer group"
          >
            <ShoppingBag className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Secured Bag</span>
            {cartCount > 0 && (
              <span className="ml-1 w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] font-mono flex items-center justify-center font-bold animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-zinc-700 hover:text-zinc-950 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-50/95 backdrop-blur-xl border-b border-zinc-200 absolute top-full left-0 w-full px-6 py-4 shadow-xl z-30 flex flex-col gap-2.5 font-sans">
          <button
            onClick={() => handleTabSelect('catalog')}
            className={`w-full text-left py-3 px-4 rounded-lg text-xs font-bold flex items-center gap-2 ${
              currentTab === 'catalog' ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-800 border border-zinc-200'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Active Catalog
          </button>
          <button
            onClick={() => handleTabSelect('ledger')}
            className={`w-full text-left py-3 px-4 rounded-lg text-xs font-bold flex items-center gap-2 ${
              currentTab === 'ledger' ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-800 border border-zinc-200'
            }`}
          >
            <Database className="w-4 h-4" />
            Registry Ledger
          </button>
          <button
            onClick={() => handleTabSelect('applications')}
            className={`w-full text-left py-3 px-4 rounded-lg text-xs font-bold flex items-center gap-2 ${
              currentTab === 'applications' ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-800 border border-zinc-200'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            Filing Auditor
          </button>
        </div>
      )}
    </header>
  );
};
