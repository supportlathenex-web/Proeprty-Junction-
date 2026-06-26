import React, { useState } from 'react';
import { Property, LeadInquiry } from '../types';
import { X, Shield, Clock, Phone, Mail, User, Sparkles, Send, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProperty?: Property;
  onSubmitInquiry: (inquiry: Omit<LeadInquiry, 'id' | 'status' | 'submittedAt'>) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedProperty,
  onSubmitInquiry,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [timeframe, setTimeframe] = useState<'Immediate' | '1-3 Months' | '3-6 Months' | 'Just Browsing'>('Immediate');
  const [tier, setTier] = useState<'Silver Partner' | 'Gold VIP Class' | 'Elite Private Club'>('Silver Partner');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    onSubmitInquiry({
      propertyName: selectedProperty?.title || 'General Consultancy',
      propertyId: selectedProperty?.id || 'general',
      clientName: name,
      clientEmail: email,
      clientPhone: phone,
      timeframe,
      preferredTier: tier,
      notes,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setNotes('');
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-zinc-950/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden z-10 text-left font-sans"
        >
          {/* Top aesthetic accent line */}
          <div className="h-1.5 bg-gradient-to-r from-zinc-800 via-zinc-950 to-zinc-800" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {submitted ? (
            <div className="p-8 py-16 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold tracking-tight text-zinc-950">Inquiry Sent Successfully</h3>
              <p className="text-zinc-500 text-xs max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out to Property Junction. One of our expert real estate agents will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-zinc-450 uppercase block mb-1">
                  {selectedProperty ? 'PROPERTY INQUIRY' : 'GENERAL INQUIRY'}
                </span>
                <h3 className="text-xl font-bold tracking-tight text-zinc-950">
                  {selectedProperty ? `Inquire: ${selectedProperty.title}` : 'Consult Property Junction'}
                </h3>
                {selectedProperty && (
                  <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {selectedProperty.location} • {selectedProperty.price}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                {/* Client Name Input */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono font-bold tracking-wider text-zinc-500 uppercase block">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Dev"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-900 focus:outline-hidden focus:border-zinc-950 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Contact grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono font-bold tracking-wider text-zinc-500 uppercase block">
                      Secure Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-900 focus:outline-hidden focus:border-zinc-950 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono font-bold tracking-wider text-zinc-500 uppercase block">
                      Direct Contact Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 90000 00000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-900 focus:outline-hidden focus:border-zinc-950 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Selection lists: Tier and Timeframe */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono font-bold tracking-wider text-zinc-500 uppercase block">
                      Acquisition Timeframe
                    </label>
                    <select
                      value={timeframe}
                      onChange={(e) => setTimeframe(e.target.value as any)}
                      className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-900 focus:outline-hidden focus:border-zinc-950 focus:bg-white transition-all"
                    >
                      <option value="Immediate">Immediate Plan</option>
                      <option value="1-3 Months">1 to 3 Months</option>
                      <option value="3-6 Months">3 to 6 Months</option>
                      <option value="Just Browsing">Browsing / Design Study</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono font-bold tracking-wider text-zinc-500 uppercase block">
                      Client Type
                    </label>
                    <select
                      value={tier}
                      onChange={(e) => setTier(e.target.value as any)}
                      className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-900 focus:outline-hidden focus:border-zinc-950 focus:bg-white transition-all"
                    >
                      <option value="Silver Partner">First Time Buyer</option>
                      <option value="Gold VIP Class">Investor</option>
                      <option value="Elite Private Club">Seller / Owner</option>
                    </select>
                  </div>
                </div>

                {/* Secure Message and notes */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono font-bold tracking-wider text-zinc-500 uppercase block">
                    Requirements & Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe specific preferences, budget, or other requirements..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-900 focus:outline-hidden focus:border-zinc-950 focus:bg-white transition-all resize-none"
                  />
                </div>
              </div>

              {/* Policy badge & Submit button */}
              <div className="space-y-3 pt-2">
                <div className="flex gap-2.5 items-start p-3 bg-zinc-50 rounded-xl border border-zinc-250">
                  <Shield className="w-4 h-4 text-zinc-800 mt-0.5 shrink-0" />
                  <p className="text-[10px] text-zinc-500 leading-relaxed">
                    By submitting, you agree to our Terms and Privacy Policy. Your communications are strictly private.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-zinc-950/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Inquiry
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
