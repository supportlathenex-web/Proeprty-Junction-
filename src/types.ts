export interface Property {
  id: string;
  title: string;
  location: string;
  bhk: number; // 0 for Studio, 1, 2, 3, 4 for 4+
  type: 'Ready to Move' | 'Under Construction';
  price: string;
  priceNumeric: number; // Numeric INR value for filtering (e.g. 4850000 for 48.5 Lakhs)
  carpetArea: string;
  sizeSqFt: number; // Numeric Sq Ft for filtering (e.g. 750)
  brokerage: string;
  paymentPlan: string;
  image: string;
  tag: string;
  highlights: string[];
  purpose: 'Buy' | 'Rent';
  propertyType: 'Apartment' | 'Villa' | 'Townhouse' | 'Commercial' | 'Land';
  bathrooms: number;
  furnishing: 'Furnished' | 'Semi' | 'Unfurnished';
  buildingType: 'Building' | 'Villa' | 'Gated Community';
  floorLevel: 'Low' | 'Mid' | 'High';
  viewType: 'Sea' | 'City' | 'Community' | 'Garden';
  rentalFrequency: 'Yearly' | 'Monthly' | 'N/A';
  paymentTerms: string; // e.g., "1 Cheque" or "4 Cheques" or "N/A"
  availability: 'Ready' | 'Available' | 'Coming Soon';
  verified: boolean;
  featured: boolean;
  description: string;
  detailedDescription: string;
  amenities: string[];
  floorPlanImage: string;
  brochureUrl?: string;
  titleDeedUrl?: string;
  agentName: string;
  agentRole: string;
  agentPhone: string;
  agentEmail: string;
  agentWhatsApp: string;
  agentPhoto: string;
  gallery: string[];
}

export interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  preferredDate: string;
  preferredTime: string;
  status: 'Pending' | 'Confirmed';
  createdAt: string;
}
