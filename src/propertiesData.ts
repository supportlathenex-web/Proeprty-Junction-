import { Property, ReviewFeedback, LeadInquiry } from './types';
import skylineHero from './assets/images/mumbai_thane_luxury_skyline_1781880741886.jpg';
import interiorHero from './assets/images/luxury_interior_skyline_1781880757895.jpg';

export const propertiesCatalog: Property[] = [
  {
    id: 'crest-view-thane',
    title: 'The Crest',
    tagline: 'Premium apartments in Thane West.',
    location: 'Thane West',
    subLocation: 'Pokhran Road 2, Thane',
    price: '₹1.85 Cr - ₹3.40 Cr',
    priceNumeric: 185,
    configuration: '2, 3 & 4 BHK Apartments',
    carpetArea: '850 - 1,620 Sq.Ft.',
    status: 'Ready Possession',
    mainImage: skylineHero,
    galleryImages: [
      skylineHero,
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The Crest offers modern living in the heart of Thane West. Enjoy spacious apartments with quality fittings and amenities suited for families.',
    amenities: [
      'Swimming Pool',
      'Gymnasium',
      'Clubhouse',
      'Children\'s Play Area',
      '24/7 Security',
      'Car Parking'
    ],
    features: [
      { label: 'Ceiling Height', value: '10 Feet' },
      { label: 'Security', value: 'CCTV & Intercom' },
      { label: 'Flooring', value: 'Vitrified Tiles' },
      { label: 'Power Backup', value: 'Common Areas' }
    ],
    specifications: [
      { category: 'Structure', details: 'RCC Frame Structure' },
      { category: 'Kitchen', details: 'Granite platform with stainless steel sink' },
      { category: 'Bathrooms', details: 'Branded sanitary ware and CP fittings' },
      { category: 'Doors/Windows', details: 'Flush doors and aluminum sliding windows' }
    ]
  },
  {
    id: 'shilphata-ridge',
    title: 'Shilphata Heights',
    tagline: 'Affordable luxury in Navi Mumbai.',
    location: 'Shilphata',
    subLocation: 'Kalyan-Shil Phata Road, Navi Mumbai',
    price: '₹1.15 Cr - ₹1.95 Cr',
    priceNumeric: 115,
    configuration: '2 & 3 BHK Apartments',
    carpetArea: '780 - 1,210 Sq.Ft.',
    status: 'Launch Phase',
    mainImage: interiorHero,
    galleryImages: [
      interiorHero,
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Located at Shilphata, this property offers great connectivity to Navi Mumbai and Thane. A perfect choice for first-time home buyers.',
    amenities: [
      'Landscaped Garden',
      'Jogging Track',
      'Indoor Games Room',
      'Multi-purpose Hall',
      'CCTV Surveillance',
      'Power Backup'
    ],
    features: [
      { label: 'Elevators', value: 'Branded Lifts' },
      { label: 'Water Supply', value: '24/7 Supply' },
      { label: 'Security', value: 'Gated Community' },
      { label: 'Intercom', value: 'Available' }
    ],
    specifications: [
      { category: 'Walls', details: 'Gypsum finish internal walls' },
      { category: 'Electrical', details: 'Concealed copper wiring with modular switches' },
      { category: 'Paint', details: 'Premium quality paint' }
    ]
  }
];

export const clientReviews: ReviewFeedback[] = [
  {
    id: 'rev-1',
    author: 'A. Desai',
    credentials: 'Homebuyer',
    comment: 'Property Junction helped us find our dream home in Thane. The team was highly professional.',
    rating: 5,
    featured: true
  },
  {
    id: 'rev-2',
    author: 'S. Patil',
    credentials: 'Real Estate Investor',
    comment: 'Excellent brokerage services. They understand the market well and provide genuine advice.',
    rating: 5,
    featured: true
  }
];

export const initialInquiries: LeadInquiry[] = [
  {
    id: 'INQ-4209',
    propertyName: 'The Crest',
    propertyId: 'crest-view-thane',
    clientName: 'Rahul M.',
    clientEmail: 'rahul.m@email.com',
    clientPhone: '+91 98765 43210',
    timeframe: 'Immediate',
    preferredTier: 'Standard',
    notes: 'Looking for a 2 BHK in Thane West.',
    status: 'Advisor Assigned',
    submittedAt: '2026-06-19 12:40'
  }
];

