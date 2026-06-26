export type PropertyStatus = 'Launch Phase' | 'Under Construction' | 'Ready Possession';

export interface Property {
  id: string;
  title: string;
  tagline: string;
  location: string;
  subLocation: string;
  price: string; // e.g. "₹1.45 Cr onwards" or "₹1.85 Cr - ₹3.50 Cr"
  priceNumeric: number; // For sorting and filtering (represented in Lakhs, e.g., 185 = 1.85 Cr)
  configuration: string; // e.g., "2, 3 & 4 BHK"
  carpetArea: string; // e.g., "820 - 1,450 Sq.Ft."
  status: PropertyStatus;
  mainImage: string;
  galleryImages: string[];
  description: string;
  amenities: string[];
  features: {
    label: string;
    value: string;
  }[];
  specifications: {
    category: string;
    details: string;
  }[];
}

export interface LeadInquiry {
  id: string;
  propertyName?: string;
  propertyId?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  timeframe: 'Immediate' | '1-3 Months' | '3-6 Months' | 'Just Browsing';
  preferredTier: 'Silver Partner' | 'Gold VIP Class' | 'Elite Private Club';
  notes: string;
  status: 'Inbound' | 'Advisor Assigned' | 'Callback Scheduled' | 'Site Visit Booked' | 'Closed Premium';
  submittedAt: string;
}

export interface ReviewFeedback {
  id: string;
  author: string;
  credentials: string; // e.g., "Senior VP, Tech Group"
  comment: string;
  rating: number;
  featured: boolean;
}
