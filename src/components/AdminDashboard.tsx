import React, { useState } from 'react';
import { LeadInquiry, Property } from '../types';
import {
  ClipboardCheck,
  ShieldCheck,
  PhoneCall,
  CalendarCheck2,
  Trash2,
  Building,
  UserCheck,
  Sparkles,
  Inbox,
  Filter,
  PlusCircle,
  TrendingUp,
  SlidersHorizontal,
  FolderLock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { propertiesCatalog } from '../propertiesData';

interface AdminDashboardProps {
  inquiries: LeadInquiry[];
  onApproveTour: (id: string) => void;
  onDeclineInquiry: (id: string) => void;
  onUpdateStatus: (id: string, nextStatus: LeadInquiry['status']) => void;
  onAddNewPhoneLead: (newLead: Omit<LeadInquiry, 'id' | 'status' | 'submittedAt'>) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  inquiries,
  onApproveTour,
  onDeclineInquiry,
  onUpdateStatus,
  onAddNewPhoneLead,
}) => {
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | LeadInquiry['status']>('All');
  const [tierFilter, setTierFilter] = useState<'All' | LeadInquiry['preferredTier']>('All');

  // New Lead Form Pop-up toggle
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPropertyId, setNewPropertyId] = useState(propertiesCatalog[0].id);
  const [newTimeframe, setNewTimeframe] = useState<'Immediate' | '1-3 Months' | '3-6 Months' | 'Just Browsing'>('Immediate');
  const [newTier, setNewTier] = useState<'Silver Partner' | 'Gold VIP Class' | 'Elite Private Club'>('Silver Partner');
  const [newNotes, setNewNotes] = useState('');

  // Submit hander
  const handleAddManualLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail || !newPhone) return;

    const matchedProperty = propertiesCatalog.find(p => p.id === newPropertyId);

    onAddNewPhoneLead({
      clientName: newName,
      clientEmail: newEmail,
      clientPhone: newPhone,
      propertyId: newPropertyId,
      propertyName: matchedProperty?.title || 'General Consultancy',
      timeframe: newTimeframe,
      preferredTier: newTier,
      notes: newNotes,
    });

    // Reset
    setNewName('');
    setNewEmail('');
    setNewPhone('');
    setNewNotes('');
    setIsFormOpen(false);
  };

  // Stats calculation
  const totalInbound = inquiries.length;
  const siteVisitsCount = inquiries.filter(i => i.status === 'Site Visit Booked').length;
  const closedPremiumValue = inquiries.filter(i => i.status === 'Closed Premium').length;
  const elitePrivateClubCount = inquiries.filter(i => i.preferredTier === 'Elite Private Club').length;

  // Render list
  const filteredInquiries = inquiries.filter(item => {
    const matchesSearch =
      item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.propertyName && item.propertyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.clientPhone.includes(searchTerm);

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesTier = tierFilter === 'All' || item.preferredTier === tierFilter;

    return matchesSearch && matchesStatus && matchesTier;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 font-sans">
      {/* Editorial Dashboard Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-1">BROKER DASHBOARD</span>
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-950">
            Lead Management Console
          </h2>
          <p className="text-zinc-500 text-xs">
            Review live inbound inquiries, confirm site bookings, and manage lead status.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold tracking-wide flex items-center gap-2 cursor-pointer transition-colors"
        >
          <PlusCircle className="w-4 h-4 text-zinc-300" />
          Add Manual Lead
        </button>
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm relative overflow-hidden">
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block">ACTIVE LEADS</span>
          <p className="text-3xl font-extrabold text-zinc-950 mt-1">{totalInbound}</p>
          <p className="text-[10px] text-zinc-500 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            Active Inquiries
          </p>
          <div className="absolute right-4 bottom-4 text-zinc-100 font-mono text-5xl select-none font-bold -z-10">L</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm relative overflow-hidden">
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block">SITE TOURS BOOKED</span>
          <p className="text-3xl font-extrabold text-zinc-950 mt-1">{siteVisitsCount}</p>
          <p className="text-[10px] text-zinc-500 mt-2 flex items-center gap-1.5">
            <CalendarCheck2 className="w-3.5 h-3.5 text-blue-500" />
            Verified walkthroughs
          </p>
          <div className="absolute right-4 bottom-4 text-zinc-100 font-mono text-5xl select-none font-bold -z-10">T</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm relative overflow-hidden">
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block">SELLER / OWNER</span>
          <p className="text-3xl font-extrabold text-zinc-950 mt-1">{elitePrivateClubCount}</p>
          <p className="text-[10px] text-zinc-400 mt-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Priority queues
          </p>
          <div className="absolute right-4 bottom-4 text-zinc-100 font-mono text-5xl select-none font-bold -z-10">S</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm relative overflow-hidden">
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block">CLOSED DEALS</span>
          <p className="text-3xl font-extrabold text-zinc-950 mt-1">{closedPremiumValue}</p>
          <p className="text-[10px] text-zinc-500 mt-2 flex items-center gap-1">
            <FolderLock className="w-3.5 h-3.5 text-zinc-900" />
            Successfully Closed
          </p>
          <div className="absolute right-4 bottom-4 text-zinc-100 font-mono text-5xl select-none font-bold -z-10">C</div>
        </div>
      </div>

      {/* Manual Inquiry logger Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div onClick={() => setIsFormOpen(false)} className="fixed inset-0 bg-zinc-950/50 backdrop-blur-xs" />
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 border border-zinc-200 z-10 space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-100 pb-3">
              <h3 className="text-base font-bold text-zinc-950">Add New Lead</h3>
              <button onClick={() => setIsFormOpen(false)} className="text-zinc-500 hover:text-zinc-950">✕</button>
            </div>

            <form onSubmit={handleAddManualLeadSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-mono uppercase text-zinc-500 block mb-1">Lead Name</label>
                  <input
                    type="text" required placeholder="e.g. Anand Mahindra"
                    value={newName} onChange={e => setNewName(e.target.value)}
                    className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-mono uppercase text-zinc-500 block mb-1">Contact Phone</label>
                  <input
                    type="tel" required placeholder="+91 99999 99999"
                    value={newPhone} onChange={e => setNewPhone(e.target.value)}
                    className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-[9px] font-mono uppercase text-zinc-500 block mb-1">Email</label>
                <input
                  type="email" required placeholder="name@corporation.com"
                  value={newEmail} onChange={e => setNewEmail(e.target.value)}
                  className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[9px] font-mono uppercase text-zinc-500 block mb-1">Property Selection</label>
                  <select
                    value={newPropertyId} onChange={e => setNewPropertyId(e.target.value)}
                    className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs"
                  >
                    {propertiesCatalog.map(p => (
                      <option key={p.id} value={p.id}>{p.title} ({p.location})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-mono uppercase text-zinc-500 block mb-1">Lead Type</label>
                  <select
                    value={newTier} onChange={e => setNewTier(e.target.value as any)}
                    className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs"
                  >
                    <option value="Silver Partner">First Time Buyer</option>
                    <option value="Gold VIP Class">Investor</option>
                    <option value="Elite Private Club">Seller / Owner</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[9px] font-mono uppercase text-zinc-500 block mb-1">Notes / Demands</label>
                <textarea
                  rows={2} placeholder="Requirements..."
                  value={newNotes} onChange={e => setNewNotes(e.target.value)}
                  className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-zinc-950 text-white rounded-xl text-xs font-bold"
              >
                Log Lead
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Control Panel: Filters & Sorting */}
      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-zinc-150 bg-zinc-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-4 h-4 text-zinc-900" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-950">Lead Filter</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
            {/* Search */}
            <input
              type="text"
              placeholder="Search Client or Project..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3.5 py-1.5 bg-white border border-zinc-250 rounded-xl text-xs text-zinc-900 focus:outline-hidden focus:border-zinc-950"
            />

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3.5 py-1.5 bg-white border border-zinc-250 rounded-xl text-xs text-zinc-900"
            >
              <option value="All">All Statuses</option>
              <option value="Inbound">Inbound</option>
              <option value="Advisor Assigned">Assigned</option>
              <option value="Callback Scheduled">Callback Scheduled</option>
              <option value="Site Visit Booked">Site Tours</option>
              <option value="Closed Premium">Closed Deal</option>
            </select>

            {/* Tier Filter */}
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value as any)}
              className="px-3.5 py-1.5 bg-white border border-zinc-250 rounded-xl text-xs text-zinc-900"
            >
              <option value="All">All Lead Types</option>
              <option value="Silver Partner">First Time Buyer</option>
              <option value="Gold VIP Class">Investor</option>
              <option value="Elite Private Club">Seller / Owner</option>
            </select>
          </div>
        </div>

        {/* Lead Table / List Space */}
        <div className="overflow-x-auto">
          {filteredInquiries.length === 0 ? (
            <div className="p-16 text-center text-zinc-400 space-y-2">
              <Inbox className="w-8 h-8 mx-auto" />
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-450">No matches found</p>
              <p className="text-[11px]">Adjust your search queries or active filter status lists.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-150 bg-zinc-50 text-[9px] font-mono font-bold tracking-wider text-zinc-450 uppercase">
                  <th className="py-3 px-6">Client Name</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Lead Type</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs text-zinc-500">
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-zinc-50/50 transition-colors">
                    {/* Identity */}
                    <td className="py-4 px-6 space-y-1">
                      <div className="font-bold text-zinc-950 flex items-center gap-1.5">
                        {inq.clientName}
                        {inq.preferredTier === 'Elite Private Club' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" title="Elite Tier Investor" />
                        )}
                      </div>
                      <div className="text-[10px] text-zinc-400 font-mono tracking-wide">{inq.clientEmail} • {inq.clientPhone}</div>
                    </td>

                    {/* Property */}
                    <td className="py-4 px-4 space-y-0.5">
                      <div className="font-semibold text-zinc-900 flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        {inq.propertyName}
                      </div>
                      <div className="text-[10px] text-zinc-400">Timeframe: {inq.timeframe}</div>
                    </td>

                    {/* Club class */}
                    <td className="py-4 px-4 space-y-1">
                      <span className={`inline-block text-[9px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full ${
                        inq.preferredTier === 'Elite Private Club'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : inq.preferredTier === 'Gold VIP Class'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                      }`}>
                        {inq.preferredTier}
                      </span>
                      {inq.notes && (
                        <p className="text-[10px] text-zinc-450 italic line-clamp-1 max-w-xs">{inq.notes}</p>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-block text-[9px] font-mono font-bold uppercase px-3 py-1 rounded-full ${
                        inq.status === 'Closed Premium'
                          ? 'bg-emerald-100 text-emerald-800'
                          : inq.status === 'Site Visit Booked'
                          ? 'bg-blue-100 text-blue-800'
                          : inq.status === 'Callback Scheduled'
                          ? 'bg-amber-100 text-amber-800'
                          : inq.status === 'Advisor Assigned'
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-zinc-100 text-zinc-800'
                      }`}>
                        {inq.status}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="py-4 px-6 text-right space-x-1 whitespace-nowrap">
                      {inq.status === 'Inbound' && (
                        <button
                          onClick={() => onUpdateStatus(inq.id, 'Advisor Assigned')}
                          className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg text-[10px] font-bold transition-all border border-indigo-200 cursor-pointer"
                        >
                          Assign Advisor
                        </button>
                      )}

                      {inq.status === 'Advisor Assigned' && (
                        <button
                          onClick={() => onUpdateStatus(inq.id, 'Callback Scheduled')}
                          className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-lg text-[10px] font-bold transition-all border border-amber-200 cursor-pointer inline-flex items-center gap-1"
                        >
                          <PhoneCall className="w-3 h-3" />
                          Set Callback
                        </button>
                      )}

                      {(inq.status === 'Callback Scheduled' || inq.status === 'Advisor Assigned') && (
                        <button
                          onClick={() => onApproveTour(inq.id)}
                          className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-[10px] font-bold transition-all border border-blue-200 cursor-pointer"
                        >
                          Approve Site Walkthrough
                        </button>
                      )}

                      {inq.status === 'Site Visit Booked' && (
                        <button
                          onClick={() => onUpdateStatus(inq.id, 'Closed Premium')}
                          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg text-[10px] font-bold transition-all border border-emerald-200 cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Mark Closed Win
                        </button>
                      )}

                      <button
                        onClick={() => onDeclineInquiry(inq.id)}
                        className="p-1 px-1.5 hover:bg-red-50 text-zinc-450 hover:text-red-600 rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                        title="Veto Inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-zinc-400 hover:text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
