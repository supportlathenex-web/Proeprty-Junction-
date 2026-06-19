import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Properties } from './components/Properties';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { BookingModal } from './components/BookingModal';
import { AllPropertiesPage } from './components/AllPropertiesPage';
import { PropertyDetailPage } from './components/PropertyDetailPage';
import { AdminDashboard } from './components/AdminDashboard';
import { propertyCatalog } from './propertiesData';
import { Property } from './types';

// Importing generated award-winning real-estate cinematic visual assets
import heroBgImage from './assets/images/mumbai_thane_luxury_skyline_1781880741886.jpg';
import ctaBgImage from './assets/images/luxury_interior_skyline_1781880757895.jpg';

type AppView = 'home' | 'properties' | 'property-detail' | 'privacy' | 'admin';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preSelectedProperty, setPreSelectedProperty] = useState<Property | null>(null);
  const [appVersion, setAppVersion] = useState(0);

  const handleRefreshApp = () => {
    setAppVersion(prev => prev + 1);
  };

  // Parse location path to determine initial and back-button view states
  useEffect(() => {
    const parseLocation = () => {
      const path = window.location.pathname;
      if (path === '/properties') {
        setCurrentView('properties');
        setSelectedProperty(null);
      } else if (path === '/admin') {
        setCurrentView('admin');
        setSelectedProperty(null);
      } else if (path.startsWith('/property/')) {
        const propId = path.replace('/property/', '');
        const prop = propertyCatalog.find(p => p.id === propId);
        if (prop) {
          setSelectedProperty(prop);
          setCurrentView('property-detail');
        } else {
          setCurrentView('home');
          setSelectedProperty(null);
        }
      } else if (path === '/privacy') {
        setCurrentView('privacy');
        setSelectedProperty(null);
      } else {
        setCurrentView('home');
        setSelectedProperty(null);
      }
    };

    // Initial load parse
    parseLocation();

    // Listen to browser forward/back buttons
    window.addEventListener('popstate', parseLocation);
    return () => window.removeEventListener('popstate', parseLocation);
  }, [appVersion]);

  // Force scroll to top when changing router view states
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView, selectedProperty]);

  // General visit booking form launcher
  const handleOpenGeneralBooking = () => {
    setPreSelectedProperty(null);
    setIsBookingModalOpen(true);
  };

  // Dedicated property booking form launcher
  const handleOpenPropertyBooking = (property: Property) => {
    setPreSelectedProperty(property);
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setPreSelectedProperty(null);
  };

  // Smooth custom state navigation with browser path synchronization
  const navigateToHome = () => {
    window.history.pushState(null, '', '/');
    setCurrentView('home');
    setSelectedProperty(null);
  };

  const navigateToPrivacy = () => {
    window.history.pushState(null, '', '/privacy');
    setCurrentView('privacy');
    setSelectedProperty(null);
  };

  const navigateToProperties = () => {
    window.history.pushState(null, '', '/properties');
    setCurrentView('properties');
    setSelectedProperty(null);
  };

  const navigateToPropertyDetail = (property: Property) => {
    window.history.pushState(null, '', `/property/${property.id}`);
    setSelectedProperty(property);
    setCurrentView('property-detail');
  };

  const handleNavigateToPropertyById = (propertyId: string) => {
    const prop = propertyCatalog.find(p => p.id === propertyId);
    if (prop) {
      navigateToPropertyDetail(prop);
    }
  };

  if (currentView === 'admin') {
    return (
      <AdminDashboard 
        onNavigateHome={navigateToHome}
        onRefreshApp={handleRefreshApp}
      />
    );
  }

  return (
    <div key={appVersion} className="bg-brand-bg min-h-screen flex flex-col font-sans antialiased text-brand-navy">
      {/* Sleek top ambient lines */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-navy via-brand-red to-brand-navy z-50 pointer-events-none opacity-90" />

      {/* Universal Scroll Navigation Bar */}
      <Navbar
        onOpenBooking={handleOpenGeneralBooking}
        onNavigateToPrivacy={navigateToPrivacy}
        onNavigateToHome={navigateToHome}
        onNavigateToProperties={navigateToProperties}
        currentView={currentView}
      />

      {/* Router View Switching */}
      <main className="flex-grow">
        {currentView === 'home' ? (
          <div className="flex flex-col">
            {/* Cinematic Hero */}
            <Hero
              onOpenBooking={handleOpenGeneralBooking}
              backgroundImage={heroBgImage}
            />

            {/* Editorial bento About narrative */}
            <About onOpenBooking={handleOpenGeneralBooking} />

            {/* Custom interactive service specifications */}
            <Services />

            {/* Curated Property Catalog with search & filter discovery */}
            <Properties 
              onSelectPropertyToBook={handleOpenPropertyBooking} 
              onViewAllProperties={navigateToProperties}
              onViewPropertyDetail={navigateToPropertyDetail}
            />

            {/* High-impact Twilight penthouses Final CTA Closer */}
            <FinalCTA
              onOpenBooking={handleOpenGeneralBooking}
              backgroundImage={ctaBgImage}
            />
          </div>
        ) : currentView === 'properties' ? (
          <AllPropertiesPage
            onSelectProperty={navigateToPropertyDetail}
            onNavigateHome={navigateToHome}
            onOpenBooking={handleOpenGeneralBooking}
          />
        ) : currentView === 'property-detail' && selectedProperty ? (
          <PropertyDetailPage
            property={selectedProperty}
            onBackToSearch={navigateToProperties}
            onSelectPropertyToBook={handleOpenPropertyBooking}
            onNavigateToProperty={handleNavigateToPropertyById}
          />
        ) : (
          <PrivacyPolicy onBackToHome={navigateToHome} heroImage={heroBgImage} />
        )}
      </main>

      {/* Premium Institutional Footer */}
      <Footer
        onNavigateToPrivacy={navigateToPrivacy}
        onNavigateToHome={navigateToHome}
        onOpenBooking={handleOpenGeneralBooking}
        onNavigateToProperties={navigateToProperties}
      />

      {/* Persistent site visit registration overlay */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
        selectedProperty={preSelectedProperty}
        propertiesList={propertyCatalog}
      />
    </div>
  );
}
