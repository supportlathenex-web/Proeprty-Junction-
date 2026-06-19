import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Phone, Mail, User, CheckCircle2, Building, Flame, ShieldAlert } from 'lucide-react';
import { Property, Booking } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProperty?: Property | null;
  propertiesList: Property[];
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedProperty = null,
  propertiesList,
}) => {
  const [propertyId, setPropertyId] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Pre-fill if a property is selected
  useEffect(() => {
    if (selectedProperty) {
      setPropertyId(selectedProperty.id);
    } else if (propertiesList.length > 0) {
      setPropertyId(propertiesList[0].id);
    }
  }, [selectedProperty, propertiesList]);

  // Read saved bookings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('property_junction_bookings');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse bookings from localStorage', e);
      }
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !preferredDate || !preferredTime) {
      alert('Please fill out all mandatory fields.');
      return;
    }

    setIsSubmitting(true);

    const activePropName = propertiesList.find((p) => p.id === propertyId)?.title || 'General Property Consultation';

    setTimeout(() => {
      const newBooking: Booking = {
        id: `PJ-BO-${Math.floor(1000 + Math.random() * 9000)}`,
        propertyId,
        propertyName: activePropName,
        clientName,
        clientPhone,
        clientEmail,
        preferredDate,
        preferredTime,
        status: 'Confirmed', // Luxury auto-confirmation for a high-end feel
        createdAt: new Date().toISOString(),
      };

      const updatedBookings = [newBooking, ...bookings];
      localStorage.setItem('property_junction_bookings', JSON.stringify(updatedBookings));
      setBookings(updatedBookings);

      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const resetForm = () => {
    setClientName('');
    setClientPhone('');
    setClientEmail('');
    setPreferredDate('');
    setPreferredTime('');
    setSubmitted(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-brand-black/60 backdrop-blur-md"
          />

          {/* Modal Card content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-2xl bg-brand-bg rounded-2xl overflow-hidden shadow-2xl border border-brand-navy/10 z-10 flex flex-col md:flex-row"
          >
            {/* Left Brand Panel */}
            <div className="w-full md:w-2/5 bg-brand-navy text-white p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-radial-gradient opacity-10 pointer-events-none" />
              <div className="relative z-10">
                <span className="inline-block bg-brand-red/10 text-brand-red text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-brand-red/20 mb-6 font-belleza">
                  VVIP CONSULTATION
                </span>
                <h3 className="text-2xl md:text-3xl font-belleza font-bold tracking-tight text-brand-bg mt-2">
                  Verify &amp; Experience
                </h3>
                <p className="text-xs text-brand-bg/75 mt-3 leading-relaxed font-sans font-light">
                  Join our elite circles. We arrange premium site transits, provide dedicated property advisors, and coordinate 100% of the paperwork with <strong>0% Brokerage</strong>.
                </p>
              </div>

              <div className="relative z-10 mt-8 pt-6 border-t border-brand-bg/10">
                <div className="flex items-center gap-3 text-xs font-mono text-brand-bg/85 mb-3">
                  <Flame className="w-4 h-4 text-brand-red animate-pulse" />
                  <span>20:80 Payment Structure Available</span>
                </div>
                <p className="text-[10px] text-zinc-400 font-sans">
                  *Our site visit assistance features complimentary luxury transport.
                </p>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-brand-black/50 hover:text-brand-navy p-1.5 rounded-full hover:bg-black/5 transition-all"
                id="close-booking-modal-id"
              >
                <X className="w-5 h-5" />
              </button>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="mb-2">
                    <h4 className="text-xl font-belleza font-bold tracking-tight text-brand-navy">
                      Request Signature Visit
                    </h4>
                    <p className="text-xs text-zinc-500 font-sans">
                      Complete registration for priority consultation boarding.
                    </p>
                  </div>

                  {/* Select Property */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] uppercase tracking-wider text-brand-navy opacity-75 font-semibold font-sans">
                      Property Suite
                    </label>
                    <div className="relative flex items-center">
                      <Building className="absolute left-3 w-4 h-4 text-brand-navy/60" />
                      <select
                        value={propertyId}
                        onChange={(e) => setPropertyId(e.target.value)}
                        className="w-full bg-white/70 border border-brand-navy/15 rounded-lg py-2.5 pl-10 pr-4 text-xs font-sans focus:outline-none focus:border-brand-navy transition-all"
                        required
                      >
                        <option value="">General Custom Consultation</option>
                        {propertiesList.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.title} — {p.location}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Name Input */}
                  <div className="grid grid-cols-1 gap-3.5">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] uppercase tracking-wider text-brand-navy opacity-75 font-semibold font-sans">
                        Full Name <span className="text-brand-red">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <User className="absolute left-3 w-4 h-4 text-brand-navy/60" />
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="Lord/Lady Name"
                          className="w-full bg-white/70 border border-brand-navy/15 rounded-lg py-2 pl-10 pr-4 text-xs font-sans focus:outline-none focus:border-brand-navy transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Phone Input */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] uppercase tracking-wider text-brand-navy opacity-75 font-semibold font-sans">
                          Phone Number <span className="text-brand-red">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <Phone className="absolute left-3 w-4 h-4 text-brand-navy/60" />
                          <input
                            type="text"
                            required
                            value={clientPhone}
                            onChange={(e) => setClientPhone(e.target.value)}
                            placeholder="+91 86686 44479"
                            className="w-full bg-white/70 border border-brand-navy/15 rounded-lg py-2 pl-10 pr-4 text-xs font-sans focus:outline-none focus:border-brand-navy transition-all"
                          />
                        </div>
                      </div>

                      {/* Email Input */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] uppercase tracking-wider text-brand-navy opacity-75 font-semibold font-sans">
                          Email Address
                        </label>
                        <div className="relative flex items-center">
                          <Mail className="absolute left-3 w-4 h-4 text-brand-navy/60" />
                          <input
                            type="email"
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            placeholder="mail@client.com"
                            className="w-full bg-white/70 border border-brand-navy/15 rounded-lg py-2 pl-10 pr-4 text-xs font-sans focus:outline-none focus:border-brand-navy transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time Slot Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] uppercase tracking-wider text-brand-navy opacity-75 font-semibold font-sans">
                        Preferred Date <span className="text-brand-red">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <Calendar className="absolute left-3 w-4 h-4 text-brand-navy/60" />
                        <input
                          type="date"
                          required
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full bg-white/70 border border-brand-navy/15 rounded-lg py-2 pl-10 pr-4 text-xs font-sans focus:outline-none focus:border-brand-navy transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] uppercase tracking-wider text-brand-navy opacity-75 font-semibold font-sans">
                        Time Slot <span className="text-brand-red">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <Clock className="absolute left-3 w-4 h-4 text-brand-navy/60" />
                        <select
                          required
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className="w-full bg-white/70 border border-brand-navy/15 rounded-lg py-2 pl-10 pr-4 text-xs font-sans focus:outline-none focus:border-brand-navy transition-all"
                        >
                          <option value="">Choose Timeslot</option>
                          <option value="10:00 AM - 12:30 PM">Morning (10:00 AM - 12:30 PM)</option>
                          <option value="01:00 PM - 03:30 PM">Afternoon (01:00 PM - 03:30 PM)</option>
                          <option value="04:00 PM - 06:30 PM">Evening Vesper (04:00 PM - 06:30 PM)</option>
                          <option value="07:00 PM - 09:30 PM">Night Skyline Walk (07:00 PM - 09:30 PM)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-red text-white font-serif tracking-[0.1em] text-xs font-bold py-3.5 rounded-lg hover:bg-brand-navy transition-colors flex items-center justify-center gap-2 mt-2 cursor-pointer shadow-lg shadow-brand-red/10"
                    id="submit-booking-modal-form-id"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'RESERVE ASSISTED VISIT'
                    )}
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-6 h-full gap-4">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 10 }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-brand-red" />
                  </motion.div>

                  <div className="flex flex-col gap-1">
                    <h4 className="text-2xl font-belleza font-extrabold text-brand-navy title-tight">
                      Visit Successfully Booked
                    </h4>
                    <p className="text-xs text-zinc-500 max-w-sm mt-1 font-sans">
                      Your VVIP site visit request has been successfully registered in our executive system.
                    </p>
                  </div>

                  {/* Booking Receipt details */}
                  <div className="w-full bg-brand-navy/5 border border-brand-navy/10 rounded-xl p-4 text-left font-sans flex flex-col gap-2 my-2">
                    <div className="flex justify-between text-xs border-b border-brand-navy/10 pb-1.5">
                      <span className="text-zinc-500">Client Name:</span>
                      <strong className="text-brand-navy font-semibold">{clientName}</strong>
                    </div>
                    <div className="flex justify-between text-xs border-b border-brand-navy/10 pb-1.5">
                      <span className="text-zinc-500">Choice Property:</span>
                      <strong className="text-brand-navy font-semibold text-right limit-text-1">
                        {propertiesList.find((p) => p.id === propertyId)?.title || 'General Consultation'}
                      </strong>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500">Schedule:</span>
                      <strong className="text-brand-navy font-semibold text-right">
                        {preferredDate} ({preferredTime})
                      </strong>
                    </div>
                  </div>

                  {/* Immediate Hotline CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
                    <a
                      href="tel:+918668644479"
                      className="flex-1 text-center bg-brand-navy text-white text-xs font-bold py-3 rounded-lg flex items-center justify-center gap-1.5 font-serif tracking-wider hover:bg-brand-red transition-all"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      CALL OFFICE (+91-86686)
                    </a>
                    <button
                      onClick={handleClose}
                      className="flex-1 bg-white border border-brand-navy/20 text-brand-navy text-xs font-bold py-3 rounded-lg hover:bg-brand-navy/5 transition-all font-sans"
                    >
                      RETURN TO DISCOVERY
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
