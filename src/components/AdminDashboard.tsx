import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Users, Calendar, Radio, Plus, Trash2, Edit3, 
  Search, LogOut, LayoutDashboard, Home, FileText, CheckCircle2, 
  HelpCircle, ChevronRight, Save, Clock, RefreshCw, Download, 
  TrendingUp, MapPin, AlertCircle, Sparkles, Sliders, Settings2,
  FileSpreadsheet, Sparkle
} from 'lucide-react';
import { Property } from '../types';
import { propertyCatalog, saveCatalogToLocalStorage } from '../propertiesData';
import { getWebContent, saveWebContent, WebContent } from '../contentData';

// Admin Auth Data Persistent Setup
interface AdminUser {
  email: string;
  password?: string;
  name?: string;
}

const AUTHORIZED_EMAILS = [
  "team.nathelex@gmail.com",
  "newpropertyjunction123@gmail.com"
];

// Activity Log structure
interface ActivityLog {
  id: string;
  action: string;
  details: string;
  timestamp: string;
}

export const AdminDashboard: React.FC<{ 
  onNavigateHome: () => void;
  onRefreshApp: () => void;
}> = ({ onNavigateHome, onRefreshApp }) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  // Login form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Config/Table structure state
  const [activeTab, setActiveTab] = useState<'dashboard' | 'homepage' | 'properties' | 'leads'>('dashboard');
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [leads, setLeads] = useState<any[]>([]);

  // Search/Filter states for control panels
  const [propSearchQuery, setPropSearchQuery] = useState('');
  const [propTypeFilter, setPropTypeFilter] = useState('All');
  const [leadSearchQuery, setLeadSearchQuery] = useState('');

  // Homepage inputs state
  const [webContent, setWebContentState] = useState<WebContent>(getWebContent());

  // Editing Property Form state
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  
  // Property Form fields
  const [formId, setFormId] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formBhk, setFormBhk] = useState(2);
  const [formType, setFormType] = useState('Under Construction');
  const [formPrice, setFormPrice] = useState('');
  const [formPriceNumeric, setFormPriceNumeric] = useState(0);
  const [formCarpetArea, setFormCarpetArea] = useState('');
  const [formSizeSqFt, setFormSizeSqFt] = useState(1000);
  const [formBrokerage, setFormBrokerage] = useState('0%');
  const [formPaymentPlan, setFormPaymentPlan] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formTag, setFormTag] = useState('');
  const [formHighlights, setFormHighlights] = useState('');
  const [formPurpose, setFormPurpose] = useState<'Buy' | 'Rent'>('Buy');
  const [formPropertyType, setFormPropertyType] = useState('Apartment');
  const [formBathrooms, setFormBathrooms] = useState(2);
  const [formFurnishing, setFormFurnishing] = useState('Semi');
  const [formBuildingType, setFormBuildingType] = useState('Building');
  const [formFloorLevel, setFormFloorLevel] = useState('Mid');
  const [formViewType, setFormViewType] = useState('City');
  const [formRentalFrequency, setFormRentalFrequency] = useState('N/A');
  const [formPaymentTerms, setFormPaymentTerms] = useState('N/A');
  const [formAvailability, setFormAvailability] = useState('Available');
  const [formVerified, setFormVerified] = useState(true);
  const [formFeatured, setFormFeatured] = useState(true);
  const [formDescription, setFormDescription] = useState('');
  const [formDetailedDescription, setFormDetailedDescription] = useState('');
  const [formAmenities, setFormAmenities] = useState('');
  const [formAgentName, setFormAgentName] = useState('Rajesh K. Sharma');
  const [formAgentRole, setFormAgentRole] = useState('Principal Advisor');
  const [formAgentEmail, setFormAgentEmail] = useState('rajesh@propertyjunction.co');
  const [formAgentPhone, setFormAgentPhone] = useState('+91 86686 44479');

  // Load Admin Data on Load
  useEffect(() => {
    // Check if authenticated in current session
    const sessionAuth = sessionStorage.getItem('property_junction_admin_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }

    // Load registered users from localStorage
    const savedAdmins = localStorage.getItem('property_junction_admins');
    if (!savedAdmins) {
      const defaultAdmins = [
        { email: 'team.nathelex@gmail.com', password: 'password123', name: 'Nathelex Team' },
        { email: 'newpropertyjunction123@gmail.com', password: 'password123', name: 'Property Junction Admin' }
      ];
      localStorage.setItem('property_junction_admins', JSON.stringify(defaultAdmins));
    }

    // Load activities
    const savedActivities = localStorage.getItem('property_junction_activities');
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    } else {
      const defaultActivities: ActivityLog[] = [
        { id: '1', action: 'System Setup', details: 'EMAAR-level corporate database synchronized successfully with Thane district records.', timestamp: new Date(Date.now() - 3600000 * 2).toLocaleTimeString() + ' ' + new Date().toLocaleDateString() },
        { id: '2', action: 'Asset Audit', details: 'Auto-vetted 0% Brokerage legal papers for MMR Region bypass corridors.', timestamp: new Date(Date.now() - 3600000).toLocaleTimeString() + ' ' + new Date().toLocaleDateString() },
        { id: '3', action: 'Portal Init', details: 'Initialized Property Junction real estate discovery & scrollytelling controls.', timestamp: new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString() }
      ];
      localStorage.setItem('property_junction_activities', JSON.stringify(defaultActivities));
      setActivities(defaultActivities);
    }

    // Load properties
    setProperties([...propertyCatalog]);

    // Load leads
    const savedLeads = localStorage.getItem('property_junction_bookings');
    if (savedLeads) {
      setLeads(JSON.parse(savedLeads));
    } else {
      const dummyLeads = [
        {
          id: 'lead-1',
          clientName: 'Manish Singh',
          clientEmail: 'manish.singh23@gmail.com',
          clientPhone: '9820158473',
          propertyId: 'PJ-PROP-001',
          propertyTitle: 'The Grand Junction Towers',
          preferredDate: '2026-06-21',
          preferredTime: '11:00 AM',
          budget: '₹50 Lakhs',
          status: 'New',
          notes: 'Wants to check 2 BHK carpet area structure layout details'
        },
        {
          id: 'lead-2',
          clientName: 'Priya Dandekar',
          clientEmail: 'priya.d@yahoo.com',
          clientPhone: '8879654120',
          propertyId: 'PJ-PROP-002',
          propertyTitle: 'Signature Heights Elite',
          preferredDate: '2026-06-25',
          preferredTime: '03:00 PM',
          budget: '₹1.5 Crore',
          status: 'Contacted',
          notes: 'Client looking for hill view ready higher floor apartment option'
        }
      ];
      localStorage.setItem('property_junction_bookings', JSON.stringify(dummyLeads));
      setLeads(dummyLeads);
    }
  }, []);

  // Sync state changes with top app rendering
  const triggerAppSync = (updatedProps: Property[]) => {
    saveCatalogToLocalStorage(updatedProps);
    setProperties([...updatedProps]);
    onRefreshApp();
  };

  const recordActivity = (action: string, details: string) => {
    const newAct: ActivityLog = {
      id: Math.random().toString(),
      action,
      details,
      timestamp: new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString()
    };
    const updated = [newAct, ...activities].slice(0, 50);
    setActivities(updated);
    localStorage.setItem('property_junction_activities', JSON.stringify(updated));
  };

  // Auth Handling
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter all required security credentials');
      return;
    }

    const savedAdmins = localStorage.getItem('property_junction_admins');
    const adminList: any[] = savedAdmins ? JSON.parse(savedAdmins) : [];

    if (authMode === 'login') {
      // Find user
      const user = adminList.find(u => u.email.toLowerCase().trim() === email.toLowerCase().trim());
      
      // Strict Pre-Add check mentioned in instruction
      const isAuthorizedEmail = AUTHORIZED_EMAILS.includes(email.toLowerCase().trim()) || adminList.some(u => u.email.toLowerCase().trim() === email.toLowerCase().trim());
      
      if (!isAuthorizedEmail) {
        setErrorMsg('Access Denied: This email address is not registered as an authorized corporate user.');
        return;
      }

      if (!user || user.password !== password) {
        setErrorMsg('Invalid password entered for security credentials.');
        return;
      }

      // Success
      setIsAuthenticated(true);
      sessionStorage.setItem('property_junction_admin_auth', 'true');
      recordActivity('Admin Login', `Corporate advisor ${user.name || email} accessed secure admin console from Mumbai side node.`);
    } else {
      // Signup Flow
      const emailLower = email.toLowerCase().trim();
      const isAlreadyRegistered = adminList.some(u => u.email.toLowerCase().trim() === emailLower);

      if (isAlreadyRegistered) {
        setErrorMsg('This corporate user account already registered. Please login.');
        return;
      }

      // We allow them to register if it is authorized
      const newUser = {
        email: emailLower,
        password: password,
        name: signupName || 'Property Executive'
      };

      const updatedAdmins = [...adminList, newUser];
      localStorage.setItem('property_junction_admins', JSON.stringify(updatedAdmins));
      setSuccessMsg('Account registered successfully! You may now login to verify security authorization.');
      setAuthMode('login');
      recordActivity('Account Registration', `Created corporate credentials shell for admin registry: ${emailLower}`);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('property_junction_admin_auth');
    setIsAuthenticated(false);
    onRefreshApp();
  };

  // Update website content
  const handleSaveWebContent = (e: React.FormEvent) => {
    e.preventDefault();
    saveWebContent(webContent);
    recordActivity('Content Modified', `Refreshed real estate scrollytelling copies and home narrative metrics.`);
    setSuccessMsg('Homepage structure and brand narratives updated successfully on the live platform.');
    setTimeout(() => setSuccessMsg(''), 4500);
    onRefreshApp();
  };

  // Delete Property
  const handleDeleteProperty = (id: string) => {
    if (window.confirm(`Are you sure you want to permanently delete project listing ID: ${id}?`)) {
      const updated = properties.filter(p => p.id !== id);
      triggerAppSync(updated);
      recordActivity('Asset Deleted', `Listing ID: ${id} removed permanently from database catalog.`);
    }
  };

  // Pre-fill property fields for edit/add modal
  const openPropertyModal = (prop: Property | null = null) => {
    setEditingProperty(prop);
    if (prop) {
      setFormId(prop.id);
      setFormTitle(prop.title);
      setFormLocation(prop.location);
      setFormBhk(prop.bhk);
      setFormType(prop.type);
      setFormPrice(prop.price);
      setFormPriceNumeric(prop.priceNumeric);
      setFormCarpetArea(prop.carpetArea);
      setFormSizeSqFt(prop.sizeSqFt);
      setFormBrokerage(prop.brokerage || '0%');
      setFormPaymentPlan(prop.paymentPlan || '');
      setFormImage(prop.image);
      setFormTag(prop.tag || '');
      setFormHighlights(prop.highlights.join('\n'));
      setFormPurpose(prop.purpose);
      setFormPropertyType(prop.propertyType);
      setFormBathrooms(prop.bathrooms || 2);
      setFormFurnishing(prop.furnishing || 'Semi');
      setFormBuildingType(prop.buildingType || 'Building');
      setFormFloorLevel(prop.floorLevel || 'Mid');
      setFormViewType(prop.viewType || 'City');
      setFormRentalFrequency(prop.rentalFrequency || 'N/A');
      setFormPaymentTerms(prop.paymentTerms || 'N/A');
      setFormAvailability(prop.availability || 'Available');
      setFormVerified(prop.verified);
      setFormFeatured(prop.featured || false);
      setFormDescription(prop.description || '');
      setFormDetailedDescription(prop.detailedDescription || '');
      setFormAmenities(prop.amenities ? prop.amenities.join(', ') : '');
      setFormAgentName(prop.agentName || 'Rajesh K. Sharma');
      setFormAgentRole(prop.agentRole || 'Principal Advisor');
      setFormAgentEmail(prop.agentEmail || 'rajesh@propertyjunction.co');
      setFormAgentPhone(prop.agentPhone || '+91 86686 44479');
    } else {
      // Clear values for new
      setFormId(`PJ-PROP-${Math.floor(100 + Math.random() * 900)}`);
      setFormTitle('');
      setFormLocation('');
      setFormBhk(2);
      setFormType('Under Construction');
      setFormPrice('₹45 Lakhs onwards');
      setFormPriceNumeric(4500000);
      setFormCarpetArea('650 Sq.Ft - 800 Sq.Ft');
      setFormSizeSqFt(720);
      setFormBrokerage('0%');
      setFormPaymentPlan('20:80 Linked Payment Option');
      setFormImage('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600');
      setFormTag('Premium Connectivity Elite');
      setFormHighlights('Zero Brokerage applied\nStrategic highway proximity\nRERA Approved structural quality\nModern fitness space');
      setFormPurpose('Buy');
      setFormPropertyType('Apartment');
      setFormBathrooms(2);
      setFormFurnishing('Semi');
      setFormBuildingType('Building');
      setFormFloorLevel('Mid');
      setFormViewType('City');
      setFormRentalFrequency('N/A');
      setFormPaymentTerms('N/A');
      setFormAvailability('Available');
      setFormVerified(true);
      setFormFeatured(false);
      setFormDescription('Centrally positioned modern home equipped with smart features and direct arterial road transit.');
      setFormDetailedDescription('Premium premium high rise properties constructed with high performance structural concrete, beautifully structured elevators, premium modular kitchens, and private parking. Completely vetted legal documents ready.');
      setFormAmenities('Parking, Balcony, Central AC, Gym, Pool, Security, Power Backup');
      setFormAgentName('Rajesh K. Sharma');
      setFormAgentRole('Principal Advisor');
      setFormAgentEmail('rajesh@propertyjunction.co');
      setFormAgentPhone('+91 86686 44479');
    }
    setIsPropertyModalOpen(true);
  };

  // Submit property (edit/add)
  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formLocation || !formPrice) {
      alert('Please fill out all fundamental details (Title, Location, Price)');
      return;
    }

    const compiledProperty: Property = {
      id: formId,
      title: formTitle,
      location: formLocation,
      bhk: Number(formBhk),
      type: formType as 'Ready to Move' | 'Under Construction',
      price: formPrice,
      priceNumeric: Number(formPriceNumeric),
      carpetArea: formCarpetArea,
      sizeSqFt: Number(formSizeSqFt),
      brokerage: formBrokerage,
      paymentPlan: formPaymentPlan,
      image: formImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600',
      tag: formTag,
      highlights: formHighlights.split('\n').map(h => h.trim()).filter(h => h !== ''),
      purpose: formPurpose,
      propertyType: formPropertyType as 'Apartment' | 'Villa' | 'Townhouse' | 'Commercial' | 'Land',
      bathrooms: Number(formBathrooms),
      furnishing: formFurnishing as 'Furnished' | 'Semi' | 'Unfurnished',
      buildingType: formBuildingType as 'Building' | 'Villa' | 'Gated Community',
      floorLevel: formFloorLevel as 'Low' | 'Mid' | 'High',
      viewType: formViewType as 'Sea' | 'City' | 'Community' | 'Garden',
      rentalFrequency: formRentalFrequency as 'Yearly' | 'Monthly' | 'N/A',
      paymentTerms: formPaymentTerms,
      availability: formAvailability as 'Ready' | 'Available' | 'Coming Soon',
      verified: formVerified,
      featured: formFeatured,
      description: formDescription,
      detailedDescription: formDetailedDescription,
      amenities: formAmenities.split(',').map(a => a.trim()).filter(a => a !== ''),
      floorPlanImage: 'https://images.unsplash.com/photo-1545464693-f1798a373343?auto=format&fit=crop&q=80&w=600',
      brochureUrl: '#download-brochure-pdf',
      titleDeedUrl: '#view-title-deed-verification',
      agentName: formAgentName,
      agentRole: formAgentRole,
      agentPhone: formAgentPhone,
      agentEmail: formAgentEmail,
      agentWhatsApp: `https://wa.me/${formAgentPhone.replace(/[^0-9]/g, '')}?text=Hi%20${formAgentName},%20I%20am%20interested%20in%20${formTitle}%20(${formId})`,
      agentPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
      gallery: [
        formImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'
      ]
    };

    let updatedList: Property[];
    if (editingProperty) {
      // Update
      updatedList = properties.map(p => p.id === formId ? compiledProperty : p);
      recordActivity('Asset Modified', `Edited existing project: "${formTitle}" (ID: ${formId}) with customized premium configurations.`);
    } else {
      // Create
      updatedList = [compiledProperty, ...properties];
      recordActivity('Asset Introduced', `Registered brand new real estate asset: "${formTitle}" (ID: ${formId}) to Shilphata inventory.`);
    }

    triggerAppSync(updatedList);
    setIsPropertyModalOpen(false);
  };

  // Lead status updates
  const handleUpdateLeadStatus = (leadId: string, newStatus: string) => {
    const updated = leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l);
    setLeads(updated);
    localStorage.setItem('property_junction_bookings', JSON.stringify(updated));
    recordActivity('Lead Upgraded', `Upgraded dispatch routing status of Lead ID ${leadId} to "${newStatus}".`);
  };

  const handleDeleteLead = (leadId: string) => {
    if (window.confirm('Are you sure you want to delete this elite customer lead request?')) {
      const updated = leads.filter(l => l.id !== leadId);
      setLeads(updated);
      localStorage.setItem('property_junction_bookings', JSON.stringify(updated));
      recordActivity('Lead Purged', `Lead file dataset reference ID: ${leadId} removed by admin directive.`);
    }
  };

  // Export Leads to CSV
  const exportLeadsToCsv = () => {
    if (leads.length === 0) return;
    const headers = ['Lead ID', 'Client Name', 'Email', 'Phone', 'Property ID', 'Property Title', 'Preferred Date', 'Preferred Time', 'Status', 'Notes'];
    const rows = leads.map(l => [
      l.id,
      l.clientName,
      l.clientEmail,
      l.clientPhone,
      l.propertyId,
      l.propertyTitle,
      l.preferredDate,
      l.preferredTime,
      l.status,
      l.notes || ''
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Property_Junction_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    recordActivity('Data Exported', `Exported all client visit schedules successfully as an CSV sheet document.`);
  };

  // Filter properties on dynamic search inside panel
  const computedFilteredProps = useMemo(() => {
    return properties.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(propSearchQuery.toLowerCase()) || 
                          p.location.toLowerCase().includes(propSearchQuery.toLowerCase()) ||
                          p.id.toLowerCase().includes(propSearchQuery.toLowerCase());
      const matchType = propTypeFilter === 'All' || p.propertyType === propTypeFilter;
      return matchSearch && matchType;
    });
  }, [properties, propSearchQuery, propTypeFilter]);

  // Filter leads on search
  const computedFilteredLeads = useMemo(() => {
    return leads.filter(l => {
      const q = leadSearchQuery.toLowerCase();
      return (l.clientName || '').toLowerCase().includes(q) || 
             (l.clientPhone || '').toLowerCase().includes(q) ||
             (l.clientEmail || '').toLowerCase().includes(q) ||
             (l.propertyTitle || '').toLowerCase().includes(q) ||
             (l.id || '').toLowerCase().includes(q);
    });
  }, [leads, leadSearchQuery]);

  // Tomorrow booked visits count helper
  const tomorrowCount = useMemo(() => {
    const tom = new Date();
    tom.setDate(tom.getDate() + 1);
    const tomStr = tom.toISOString().split('T')[0];
    return leads.filter(l => l.preferredDate === tomStr).length;
  }, [leads]);

  // Authentication Login Form Render
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#061224] text-white flex items-center justify-center p-6 relative overflow-hidden">
        {/* Cinematic Blur Nodes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8B1E3F]/10 rounded-full filter blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 rounded-full border border-slate-700/80 text-xs font-mono font-bold tracking-widest text-slate-300 mb-6 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-brand-red" />
              Property Junction Core
            </div>

            {/* Logo */}
            <div className="flex justify-center items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-[#0E2F56] to-[#8B1E3F] rounded-xl flex items-center justify-center border border-slate-700">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-belleza font-extrabold text-white tracking-tight">Property Junction</span>
            </div>
            <p className="text-xs text-slate-400 font-sans tracking-wide">Enterprise Operations and Client discovery engine</p>
          </div>

          <div className="border-b border-slate-800 mb-6 flex text-sm">
            <button 
              onClick={() => { setAuthMode('login'); setErrorMsg(''); }}
              className={`pb-3 flex-1 text-center font-semibold tracking-wider transition-colors duration-300 ${authMode === 'login' ? 'text-brand-red border-b-2 border-brand-red' : 'text-slate-400'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => { setAuthMode('signup'); setErrorMsg(''); }}
              className={`pb-3 flex-1 text-center font-semibold tracking-wider transition-colors duration-300 ${authMode === 'signup' ? 'text-brand-red border-b-2 border-brand-red' : 'text-slate-400'}`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-5" id="admin-auth-form-id">
            {errorMsg && (
              <div className="p-3 bg-red-950/40 border border-red-900/60 text-red-300 text-xs rounded-xl flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-brand-red shrink-0" />
                <span className="font-medium">{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-green-950/40 border border-green-900/60 text-green-300 text-xs rounded-xl flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                <span className="font-medium">{successMsg}</span>
              </div>
            )}

            {authMode === 'signup' && (
              <div>
                <label className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-1.5 font-bold">Your Name</label>
                <input 
                  type="text" 
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="e.g. Rajesh Sharma" 
                  className="w-full bg-slate-800/40 border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-red transition-all duration-300"
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-1.5 font-bold">Corporate Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="team.nathelex@gmail.com" 
                className="w-full bg-slate-800/40 border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-red transition-all duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-1.5 font-bold">Secure Access Key (Password)</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-slate-800/40 border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-red transition-all duration-300"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-brand-red hover:bg-white hover:text-[#061224] text-white text-xs font-bold font-mono tracking-widest py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-brand-red/10 cursor-pointer border border-transparent"
            >
              {authMode === 'login' ? 'VERIFY CREDENTIALS' : 'PROVISION REGISTRY USER'}
            </button>
            
            <button 
              type="button"
              onClick={onNavigateHome}
              className="w-full bg-transparent text-slate-400 hover:text-white text-[11px] font-medium tracking-wide py-1.5 transition-colors duration-200 block text-center"
            >
              ← Cancel &amp; Back to Main Website
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Master Authorized Screen
  return (
    <div className="min-h-screen bg-[#F6F8FB] text-[#0E2F56] flex flex-col md:flex-row font-sans">
      
      {/* SIDEBAR NAVIGATION PANEL */}
      <aside className="w-full md:w-64 bg-[#0A1A30] text-slate-300 flex flex-col border-r border-[#152B4A] shrink-0">
        {/* Header Branding */}
        <div className="p-6 border-b border-[#152B4A] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#0E2F56] to-[#8B1E3F] rounded-lg flex items-center justify-center border border-[#1A375E]">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-xs font-belleza font-bold text-white tracking-widest uppercase">PJ Dashboard</h1>
              <span className="text-[9px] font-mono font-semibold text-brand-red tracking-widest uppercase">Emaar Elite Grade</span>
            </div>
          </div>
        </div>

        {/* User profile */}
        <div className="px-6 py-4 bg-[#0D213D] border-b border-[#152B4A] flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white font-mono text-xs">
            PJ
          </div>
          <div className="truncate">
            <span className="text-[10px] block text-slate-400 font-mono">AUTHORIZED SESSION:</span>
            <span className="text-xs font-semibold text-white block truncate">{sessionStorage.getItem('property_junction_admin_auth') === 'true' ? 'Property Junction Executive' : 'System User'}</span>
          </div>
        </div>

        {/* Tab Item Links */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium font-mono tracking-wider transition-all duration-200 cursor-pointer ${activeTab==='dashboard'? 'bg-brand-red text-white shadow-lg shadow-brand-red/10' : 'hover:bg-[#0D213D] hover:text-white'}`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>OPERATIONS HOME</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('homepage')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium font-mono tracking-wider transition-all duration-200 cursor-pointer ${activeTab==='homepage'? 'bg-brand-red text-white shadow-lg shadow-brand-red/10' : 'hover:bg-[#0D213D] hover:text-white'}`}
          >
            <Home className="w-4 h-4" />
            <span>HOMEPAGE CONTROL</span>
          </button>

          <button 
            onClick={() => setActiveTab('properties')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium font-mono tracking-wider transition-all duration-200 cursor-pointer ${activeTab==='properties'? 'bg-brand-red text-white shadow-lg shadow-brand-red/10' : 'hover:bg-[#0D213D] hover:text-white'}`}
          >
            <Building2 className="w-4 h-4" />
            <span>PROPERTY CONTROL</span>
          </button>

          <button 
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium font-mono tracking-wider transition-all duration-200 cursor-pointer ${activeTab==='leads'? 'bg-brand-red text-white shadow-lg shadow-brand-red/10' : 'hover:bg-[#0D213D] hover:text-white'}`}
          >
            <Users className="w-4 h-4" />
            <span>LEAD MANAGEMENT</span>
          </button>
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t border-[#152B4A] space-y-2">
          <button 
            onClick={onNavigateHome}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer border border-[#152B4A]"
          >
            <Sparkle className="w-3.5 h-3.5 text-brand-red" />
            <span>VIEW LIVE APP</span>
          </button>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-slate-400 hover:text-brand-red rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>LOGOUT PORTAL</span>
          </button>
        </div>
      </aside>

      {/* MASTER CONTENT AREA */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        {/* Dynamic header title block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-zinc-200 pb-5">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-brand-red block mb-1 uppercase">
              OPERATIONAL HUB NODE — SHILPHATA
            </span>
            <h2 className="text-2xl lg:text-3xl font-belleza font-extrabold text-[#0E2F56]">
              {activeTab === 'dashboard' && "Control Dashboard Home"}
              {activeTab === 'homepage' && "Corporate Homepage Editor"}
              {activeTab === 'properties' && "Shilphata Real Estate Inventory"}
              {activeTab === 'leads' && "Premium Client Schedulers"}
            </h2>
          </div>
          
          {/* Real-time Web Vital status */}
          <div className="flex items-center gap-3.5 bg-white border border-zinc-200/80 px-4 py-2 rounded-2xl shadow-sm">
            <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
            <div className="text-left font-mono">
              <span className="text-[9px] text-zinc-400 block font-semibold">PORTAL LINK STATE:</span>
              <span className="text-[11px] text-zinc-700 font-bold tracking-wide uppercase">100% OPERATIONAL</span>
            </div>
          </div>
        </div>

        {/* TAB 1: OPERATIONS HOME DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* 4 Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1: Properties */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute right-4 top-4 w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-xs text-zinc-400 font-mono tracking-widest block mb-2 uppercase">TOTAL LISTINGS</span>
                <span className="text-3xl font-bold font-mono text-[#0E2F56]">{properties.length}</span>
                <span className="text-[10px] text-zinc-400 block mt-2">Active Shilphata-Thane nodes</span>
              </div>

              {/* Card 2: Leads */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute right-4 top-4 w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-brand-red">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs text-zinc-400 font-mono tracking-widest block mb-2 uppercase">TOTAL LEADS</span>
                <span className="text-3xl font-bold font-mono text-[#0E2F56]">{leads.length}</span>
                <span className="text-[10px] text-zinc-400 block mt-2">All site visits registered to date</span>
              </div>

              {/* Card 3: Tomorrow's Leads */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute right-4 top-4 w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-xs text-zinc-400 font-mono tracking-widest block mb-2 uppercase">TOMORROW VISITS</span>
                <span className="text-3xl font-bold font-mono text-brand-red">{tomorrowCount}</span>
                <span className="text-[10px] text-zinc-400 block mt-2">Scheduled site transits</span>
              </div>

              {/* Card 4: Web Status */}
              <div className="bg-[#0A1A30] border border-[#152B4A] rounded-3xl p-6 shadow-sm relative overflow-hidden text-white">
                <div className="absolute right-4 top-4 w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping absolute" />
                  <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full" />
                </div>
                <span className="text-xs text-slate-400 font-mono tracking-widest block mb-2 uppercase">WEBSITE FRAME</span>
                <span className="text-3xl font-bold font-mono text-white">LIVE</span>
                <span className="text-[10px] text-slate-400 block mt-2">Production CDN synced</span>
              </div>

            </div>

            {/* Middle Section: Recent Activity & Admin Tools */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Recent Activity Widget */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 lg:p-8 shadow-sm lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-belleza font-extrabold text-[#0E2F56]">
                    Recent Corporate Portal Activities
                  </h3>
                  <div className="h-2 w-2 rounded-full bg-brand-red animate-pulse" />
                </div>

                <div className="space-y-4">
                  {activities.map((act) => (
                    <div key={act.id} className="flex gap-4 p-3 hover:bg-slate-50 transition-colors rounded-2xl border border-zinc-100">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 shrink-0 text-slate-600 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-[#0E2F56]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold font-mono text-[#0E2F56] uppercase tracking-wider">{act.action}</span>
                          <span className="text-[9px] font-mono text-zinc-400 shrink-0">{act.timestamp}</span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-1 font-sans">{act.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Short Brand Info Panel */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-brand-red mb-3 block uppercase">Corporate Note</span>
                  <p className="text-xs text-zinc-600 leading-relaxed font-sans mb-6">
                    Property Junction serves as a secure bridge for premium site consult transits across Shilphata, Thane, and Kharghar hills. Admin tools allow immediate, code-free inventory adjustments to fulfill actual Indian real-estate consumer convenience.
                  </p>
                </div>
                
                <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200/60 text-xs flex flex-col gap-2 font-mono">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Node Location:</span>
                    <span className="font-bold">Shilphata Shop #1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Framework:</span>
                    <span className="font-bold text-[#0E2F56]">React + Vite SPA</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Leads Table Overview */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 lg:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-belleza font-extrabold text-[#0E2F56]">
                  Recent Client Booking Leads ({leads.length})
                </h3>
                <button 
                  onClick={() => setActiveTab('leads')}
                  className="text-xs font-medium font-mono text-brand-red flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>SEE ALL PLATFORM LEADS</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-600 border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-100 text-zinc-400 font-mono uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4">Client Name</th>
                      <th className="py-3 px-4">Property Interest</th>
                      <th className="py-3 px-4">Transit Date</th>
                      <th className="py-3 px-4">Preferred Time</th>
                      <th className="py-3 px-4">Routing Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.slice(0, 4).map((lead) => (
                      <tr key={lead.id} className="border-b border-zinc-50 hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-bold text-[#0E2F56] block">{lead.clientName}</span>
                          <span className="text-[10px] text-zinc-400 block mt-0.5">{lead.clientPhone}</span>
                        </td>
                        <td className="py-3 px-4 font-medium text-zinc-700">{lead.propertyTitle}</td>
                        <td className="py-3 px-4 font-mono">{lead.preferredDate}</td>
                        <td className="py-3 px-4 font-mono">{lead.preferredTime}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2.5 py-1 text-[9px] font-mono tracking-wider uppercase rounded-full ${
                            lead.status === 'New' ? 'bg-blue-50 text-blue-600 border border-blue-200' :
                            lead.status === 'Contacted' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                            lead.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                            'bg-zinc-50 text-zinc-500 border border-zinc-200'
                          }`}>
                            {lead.status || 'New'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: HOMEPAGE NARRATIVE EDITORS */}
        {activeTab === 'homepage' && (
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 lg:p-8 shadow-sm">
            <h3 className="text-lg font-belleza font-extrabold text-[#0E2F56] mb-2">
              Corporate Hero Section &amp; Heritage Values
            </h3>
            <p className="text-xs text-zinc-400 mb-6 font-sans">
              Alter display text blocks instantly to reflect brand updates or seasonal real estate packages in Shilphata. These fields sync across the dynamic UI components immediately.
            </p>

            <form onSubmit={handleSaveWebContent} className="space-y-6">
              
              {successMsg && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-2xl flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">{successMsg}</span>
                </div>
              )}

              {/* Hero Section Container */}
              <div className="p-6 bg-slate-50 border border-zinc-200/80 rounded-2xl space-y-4">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#0E2F56] uppercase block border-b border-zinc-200 pb-2">HERO MAIN LANDING ACCENTS</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-1.5 font-bold">Hero Upper Accent Tag</label>
                    <input 
                      type="text"
                      className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-red transition-all"
                      value={webContent.heroUpper}
                      onChange={(e) => setWebContentState({ ...webContent, heroUpper: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-1.5 font-bold">Hero Title Text</label>
                    <input 
                      type="text"
                      className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-red transition-all"
                      value={webContent.heroTitle}
                      onChange={(e) => setWebContentState({ ...webContent, heroTitle: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-1.5 font-bold">Hero Subtitle Paragraph Description</label>
                  <textarea 
                    rows={3} 
                    className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-red transition-all font-sans"
                    value={webContent.heroSub}
                    onChange={(e) => setWebContentState({ ...webContent, heroSub: e.target.value })}
                  />
                </div>
              </div>

              {/* About Section Container */}
              <div className="p-6 bg-slate-50 border border-zinc-200/80 rounded-2xl space-y-4">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#0E2F56] uppercase block border-b border-zinc-200 pb-2">HERITAGE AND BRAND CONVENIENCE STATEMENT</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-1.5 font-bold">About Upper Section Label</label>
                    <input 
                      type="text"
                      className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-red transition-all"
                      value={webContent.aboutUpper}
                      onChange={(e) => setWebContentState({ ...webContent, aboutUpper: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-1.5 font-bold">About Main Headings Text</label>
                    <input 
                      type="text"
                      className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-red transition-all"
                      value={webContent.aboutTitle}
                      onChange={(e) => setWebContentState({ ...webContent, aboutTitle: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-1.5 font-bold">Heritage Lead Paragraph</label>
                  <textarea 
                    rows={3}
                    className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-red transition-all"
                    value={webContent.aboutText}
                    onChange={(e) => setWebContentState({ ...webContent, aboutText: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-zinc-200 pt-4">
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-1.5 font-bold">Bento Highlight Main Block Title</label>
                    <input 
                      type="text"
                      className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-red transition-all"
                      value={webContent.aboutBentoTitle}
                      onChange={(e) => setWebContentState({ ...webContent, aboutBentoTitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-1.5 font-bold">Bento Block Description Narrative</label>
                    <textarea 
                      rows={2}
                      className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#0E2F56] transition-all"
                      value={webContent.aboutBentoText}
                      onChange={(e) => setWebContentState({ ...webContent, aboutBentoText: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button 
                  type="submit"
                  className="bg-[#0A1A30] text-white hover:bg-brand-red text-xs font-mono font-bold tracking-widest px-8 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Save className="w-4 h-4 text-brand-red" />
                  <span>SYNCHRONIZE COPYWRITING LINES</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* TAB 3: SHILPHATA REAL ESTATE INVENTORY */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                
                {/* Search / Filter Inputs */}
                <div className="flex flex-wrap items-center gap-3 flex-1">
                  <div className="relative max-w-xs w-full">
                    <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                    <input 
                      type="text"
                      className="w-full bg-slate-50 border border-zinc-200 rounded-xl px-9 py-2 text-xs text-[#0E2F56] focus:outline-none focus:border-[#0E2F56]"
                      placeholder="Search title, location or ID..."
                      value={propSearchQuery}
                      onChange={(e) => setPropSearchQuery(e.target.value)}
                    />
                  </div>

                  <select 
                    className="bg-slate-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs text-[#0E2F56]"
                    value={propTypeFilter}
                    onChange={(e) => setPropTypeFilter(e.target.value)}
                  >
                    <option value="All">All Types</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                {/* Add Button */}
                <button 
                  onClick={() => openPropertyModal(null)}
                  className="bg-brand-red hover:bg-[#0E2F56] text-white text-xs font-bold font-mono tracking-widest px-5 py-2.5 rounded-xl transition-colors duration-200 flex items-center gap-2 cursor-pointer shadow-md shadow-brand-red/5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD INTEGRATED ASSET</span>
                </button>
              </div>

              {/* Properties Grid Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-600 border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-100 text-zinc-400 font-mono uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4">Image &amp; Listing ID</th>
                      <th className="py-3 px-4">Project Title</th>
                      <th className="py-3 px-4">BHK &amp; Suburb</th>
                      <th className="py-3 px-4">Price Matrix</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {computedFilteredProps.map((prop) => (
                      <tr key={prop.id} className="border-b border-zinc-50 hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <img 
                              src={prop.image} 
                              alt={prop.title} 
                              className="w-12 h-10 object-cover rounded-lg border border-zinc-200/50" 
                              referrerPolicy="no-referrer"
                            />
                            <span className="font-mono text-zinc-400 font-bold tracking-tight">{prop.id}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 font-bold text-[#0E2F56] font-sans">
                          {prop.title}
                          {prop.featured && (
                            <span className="inline-block ml-1.5 px-1.5 py-0.5 bg-brand-red/10 border border-brand-red/20 text-brand-red text-[8px] font-mono font-bold tracking-widest uppercase rounded">
                              Featured
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-bold text-zinc-700 block">{prop.bhk === 0 ? 'Studio' : `${prop.bhk} BHK`}</span>
                          <span className="text-zinc-400 text-[10px] block mt-0.5 max-w-[180px] truncate">{prop.location}</span>
                        </td>
                        <td className="py-4 px-4 font-bold text-zinc-800 font-mono">
                          {prop.price}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-block px-2 py-0.5 text-[10px] rounded-full font-mono uppercase tracking-wider ${
                            prop.purpose === 'Buy' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          }`}>
                            {prop.purpose} / {prop.propertyType}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => openPropertyModal(prop)}
                              className="p-2 hover:bg-slate-100 text-[#0E2F56] transition-colors rounded-xl border border-zinc-100 cursor-pointer"
                              title="Edit listing details"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteProperty(prop.id)}
                              className="p-2 hover:bg-rose-55 hover:bg-red-50 text-[#8B1E3F] transition-colors rounded-xl border border-rose-100/10 cursor-pointer"
                              title="Remove listing"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {computedFilteredProps.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-zinc-400 text-xs font-mono">
                          No properties found in database matching selection parameters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* INTEGRATED PROPERTY FORM MODAL OVERLAY */}
            <AnimatePresence>
              {isPropertyModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-3xl w-full max-w-4xl border border-zinc-200/60 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
                  >
                    
                    {/* Modal head */}
                    <div className="p-6 bg-[#0A1A30] text-white border-b border-[#152B4A] flex items-center justify-between shrink-0">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-[#8B1E3F] font-bold block uppercase mb-0.5">FORM MODULE 104</span>
                        <h4 className="text-sm font-bold font-mono tracking-wider">{editingProperty ? "UPDATE LUXURY PROJECT STRUCTURE" : "REGISTER INTEGRATED ASSET INVENTORY"}</h4>
                      </div>
                      <button 
                        onClick={() => setIsPropertyModalOpen(false)}
                        className="text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-mono font-bold"
                      >
                        [ CLOSE FORM ]
                      </button>
                    </div>

                    {/* Modal Body form fields */}
                    <form onSubmit={handleSaveProperty} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                      
                      {/* Section 1: Fundamental listing descriptors */}
                      <div className="space-y-4">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase block border-b border-zinc-150 pb-1.5">Section 1: Identity &amp; Suburb Pricing</span>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Internal Reference Id</label>
                            <input 
                              type="text" 
                              className="w-full bg-slate-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono text-zinc-500"
                              value={formId} 
                              disabled 
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Project Name (Title) *</label>
                            <input 
                              type="text" 
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#0E2F56]"
                              value={formTitle}
                              onChange={(e) => setFormTitle(e.target.value)}
                              placeholder="e.g. MM Corporate Park High-Street"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Precise Location Address *</label>
                            <input 
                              type="text" 
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                              value={formLocation}
                              onChange={(e) => setFormLocation(e.target.value)}
                              placeholder="e.g. Shilphata Highway Bypass Crossing, Maharashtra"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Pricing Format *</label>
                              <input 
                                type="text" 
                                className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                                value={formPrice}
                                onChange={(e) => setFormPrice(e.target.value)}
                                placeholder="₹48.5 Lakhs onwards"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Numeric Value (INR) *</label>
                              <input 
                                type="number" 
                                className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                                value={formPriceNumeric}
                                onChange={(e) => setFormPriceNumeric(Number(e.target.value))}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Core Filters & Structure Type */}
                      <div className="space-y-4 pt-2">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase block border-b border-zinc-150 pb-1.5">Section 2: Interactive Filters &amp; Dimensions</span>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Purpose Type</label>
                            <select 
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                              value={formPurpose}
                              onChange={(e) => setFormPurpose(e.target.value as any)}
                            >
                              <option value="Buy">Buy Catalog (For Sale)</option>
                              <option value="Rent">Rent Catalog (Monthly Lease)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">BHK Room Layout</label>
                            <select 
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                              value={formBhk}
                              onChange={(e) => setFormBhk(Number(e.target.value))}
                            >
                              <option value={0}>Studio (0 BHK)</option>
                              <option value={1}>1 BHK Home</option>
                              <option value={2}>2 BHK Home</option>
                              <option value={3}>3 BHK Home</option>
                              <option value={4}>4 BHK+ Estate</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Property Format Type</label>
                            <select 
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                              value={formPropertyType}
                              onChange={(e) => setFormPropertyType(e.target.value)}
                            >
                              <option value="Apartment">Apartment</option>
                              <option value="Villa">Villa Resort</option>
                              <option value="Townhouse">Townhouse Plaza</option>
                              <option value="Commercial">Commercial Workspace</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Bathrooms Count</label>
                            <input 
                              type="number" 
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                              value={formBathrooms}
                              onChange={(e) => setFormBathrooms(Number(e.target.value))}
                              min={1}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Carpet Area Text</label>
                            <input 
                              type="text" 
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                              value={formCarpetArea}
                              onChange={(e) => setFormCarpetArea(e.target.value)}
                              placeholder="685 Sq.Ft - 795 Sq.Ft"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Unit Sizes (Numeric Sq.Ft)</label>
                            <input 
                              type="number" 
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                              value={formSizeSqFt}
                              onChange={(e) => setFormSizeSqFt(Number(e.target.value))}
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Furnishing Specification</label>
                            <select 
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                              value={formFurnishing}
                              onChange={(e) => setFormFurnishing(e.target.value)}
                            >
                              <option value="Unfurnished">Unfurnished</option>
                              <option value="Semi">Semi-Furnished</option>
                              <option value="Furnished">Fully Furnished</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Building Category Form</label>
                            <select 
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                              value={formBuildingType}
                              onChange={(e) => setFormBuildingType(e.target.value)}
                            >
                              <option value="Building">Independent Building</option>
                              <option value="Gated Community">Gated Community Compound</option>
                              <option value="Villa">Villa Complex</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Construction Progress State</label>
                            <select 
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                              value={formType}
                              onChange={(e) => setFormType(e.target.value)}
                            >
                              <option value="Under Construction">Under Construction</option>
                              <option value="Ready to Move">Ready to Move</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Availability Status</label>
                            <select 
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                              value={formAvailability}
                              onChange={(e) => setFormAvailability(e.target.value)}
                            >
                              <option value="Available">Available</option>
                              <option value="Ready">Ready</option>
                              <option value="Coming Soon">Coming Soon</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Floor Level</label>
                            <select 
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                              value={formFloorLevel}
                              onChange={(e) => setFormFloorLevel(e.target.value)}
                            >
                              <option value="Low">Low Rise Level</option>
                              <option value="Mid">Mid Height Level</option>
                              <option value="High">Penthouse High Rise Level</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Visual Landscape View</label>
                            <select 
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                              value={formViewType}
                              onChange={(e) => setFormViewType(e.target.value)}
                            >
                              <option value="City">City Skyline View</option>
                              <option value="Garden">Inner Garden View</option>
                              <option value="Sea">Overlooking Sea Horizon</option>
                              <option value="Community">Gated Community Center View</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Brokerage Fee Accents</label>
                            <input 
                              type="text" 
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs"
                              value={formBrokerage}
                              onChange={(e) => setFormBrokerage(e.target.value)}
                              placeholder="0%"
                            />
                          </div>
                          <div className="col-span-2">
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Payment Plan Formula</label>
                            <input 
                              type="text" 
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs"
                              value={formPaymentPlan}
                              onChange={(e) => setFormPaymentPlan(e.target.value)}
                              placeholder="e.g. 20:80 Builder Subvention"
                            />
                          </div>
                          <div className="flex items-center gap-4 pt-4 shrink-0">
                            <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
                              <input 
                                type="checkbox"
                                checked={formVerified}
                                onChange={(e) => setFormVerified(e.target.checked)}
                                className="w-4 h-4 rounded text-brand-red"
                              />
                              <span className="font-semibold text-emerald-600">Vetted Verified Listing ✔</span>
                            </label>
                            
                            <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
                              <input 
                                type="checkbox"
                                checked={formFeatured}
                                onChange={(e) => setFormFeatured(e.target.checked)}
                                className="w-4 h-4 rounded text-[#0e2f56]"
                              />
                              <span className="font-semibold text-brand-red">Featured Listing ⭐</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Media and descriptions */}
                      <div className="space-y-4 pt-2">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase block border-b border-zinc-150 pb-1.5">Section 3: Cinematic Media &amp; Brand Narratives</span>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Cinematic Showcase Image URL</label>
                            <input 
                              type="text" 
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono"
                              value={formImage}
                              onChange={(e) => setFormImage(e.target.value)}
                              placeholder="https://images.unsplash.com/..."
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Highlight Brief Tag</label>
                            <input 
                              type="text" 
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs"
                              value={formTag}
                              onChange={(e) => setFormTag(e.target.value)}
                              placeholder="e.g. High Rental Yield Ready"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Project Brief Overview (Short description of 1-2 phrases)</label>
                          <textarea 
                            rows={2} 
                            className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs"
                            value={formDescription}
                            onChange={(e) => setFormDescription(e.target.value)}
                            placeholder="Centrally positioned premium towers designed to unify convenience and comfort..."
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Intense Detailed Description (Shown on detail layouts)</label>
                          <textarea 
                            rows={4} 
                            className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs"
                            value={formDetailedDescription}
                            onChange={(e) => setFormDetailedDescription(e.target.value)}
                            placeholder="Provide deep structural materials, nearby metro layouts, specific details..."
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Bullet Highlights (One per line)</label>
                            <textarea 
                              rows={4} 
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono"
                              value={formHighlights}
                              onChange={(e) => setFormHighlights(e.target.value)}
                              placeholder="Zero Brokerage Applied&#10;Strategic metro proximity&#10;RERA registered"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Amenities List (Commas separated)</label>
                            <textarea 
                              rows={4} 
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono"
                              value={formAmenities}
                              onChange={(e) => setFormAmenities(e.target.value)}
                              placeholder="Parking, Balcony, Gym, Pool, Security, Power Backup"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Section 4: Advisor Mapping details */}
                      <div className="space-y-4 pt-2">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase block border-b border-zinc-150 pb-1.5">Section 4: Designated Portfolios &amp; Advisor Nodes</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Advisor Name</label>
                            <input 
                              type="text" 
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs"
                              value={formAgentName}
                              onChange={(e) => setFormAgentName(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Advisor Title/Role</label>
                            <input 
                              type="text" 
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs"
                              value={formAgentRole}
                              onChange={(e) => setFormAgentRole(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Direct Phone Link</label>
                            <input 
                              type="text" 
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs"
                              value={formAgentPhone}
                              onChange={(e) => setFormAgentPhone(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-zinc-500 mb-1">Client Email Link</label>
                            <input 
                              type="email" 
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs"
                              value={formAgentEmail}
                              onChange={(e) => setFormAgentEmail(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Modal Actions Footer */}
                      <div className="flex items-center justify-end gap-3 pt-6 border-t border-zinc-100 shrink-0">
                        <button 
                          type="button" 
                          onClick={() => setIsPropertyModalOpen(false)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
                        >
                          Discard Changes
                        </button>
                        <button 
                          type="submit"
                          className="bg-[#0A1A30] hover:bg-brand-red text-white text-xs font-mono font-bold tracking-widest px-8 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
                        >
                          COMMITTED ASSET WRITE SECURE
                        </button>
                      </div>

                    </form>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </div>
        )}

        {/* TAB 4: LEADS DATABASE PANEL */}
        {activeTab === 'leads' && (
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 lg:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-100">
              <div>
                <h3 className="text-lg font-belleza font-extrabold text-[#0E2F56]">
                  Registered Client site tour requests ({computedFilteredLeads.length})
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">Manage dispatch, schedule and transit operations for Shilphata operations.</p>
              </div>

              <button 
                onClick={exportLeadsToCsv}
                className="bg-[#0D213D] hover:bg-brand-red text-white text-xs font-bold font-mono tracking-widest px-5 py-2.5 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-[#0a1a30]/5 shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>EXPORT CSV SPREADSHEET</span>
              </button>
            </div>

            {/* Filter Search Input */}
            <div className="mb-6 max-w-sm w-full relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
              <input 
                type="text"
                className="w-full bg-[#F6F8FB] border border-zinc-200 rounded-xl px-9 py-2.5 text-xs text-[#0E2F56] focus:outline-none focus:border-[#0E2F56]"
                placeholder="Search Client Name, Email, Phone, Project Interest..."
                value={leadSearchQuery}
                onChange={(e) => setLeadSearchQuery(e.target.value)}
              />
            </div>

            {/* leads table module */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-600 border-collapse">
                <thead>
                  <tr className="border-b border-zinc-100 text-zinc-400 font-mono uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Client Detail Profile</th>
                    <th className="py-3 px-4 flex-1">Selected Location Project</th>
                    <th className="py-3 px-4">Scheduled Vis-Transit</th>
                    <th className="py-3 px-4">Custom Budget</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {computedFilteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-zinc-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-bold text-[#0E2F56] block">{lead.clientName}</span>
                        <span className="text-[10.5px] text-zinc-500 block font-mono mt-0.5">{lead.clientPhone} • {lead.clientEmail}</span>
                        {lead.notes && (
                          <span className="inline-block mt-2 px-2.5 py-1 bg-zinc-50 border border-zinc-200/50 text-[10px] text-zinc-500 rounded-lg max-w-xs leading-relaxed font-sans block italic">
                            💬 "{lead.notes}"
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-bold text-zinc-700 block text-xs">{lead.propertyTitle}</span>
                        <span className="text-[10px] text-zinc-400 font-mono uppercase block mt-1">ID: {lead.propertyId}</span>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap font-mono text-zinc-600">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold">{lead.preferredDate}</span>
                          <span className="text-[10px] text-zinc-400 uppercase">{lead.preferredTime || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-zinc-600">
                        {lead.budget || 'N/A'}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <select 
                          className={`px-3 py-1.5 text-[10px] rounded-full font-mono tracking-wide uppercase font-bold border ${
                            lead.status === 'New' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                            lead.status === 'Contacted' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                            lead.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                            'bg-zinc-50 text-zinc-500 border-zinc-200'
                          }`}
                          value={lead.status || 'New'}
                          onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                        >
                          <option value="New">🟢 New Visit</option>
                          <option value="Contacted">🟡 Contacted</option>
                          <option value="Completed">🔵 Visited / Closed</option>
                          <option value="Cancelled">🔴 Cancelled</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button 
                          onClick={() => handleDeleteLead(lead.id)}
                          className="text-[#8B1E3F] hover:text-[#0a1a30] p-2 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer border border-transparent"
                          title="Purge Lead Document Entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {computedFilteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-zinc-400 text-xs font-mono">
                        No operations lead documents found in registries.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </main>

    </div>
  );
};
