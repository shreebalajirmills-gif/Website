export interface CertBadge {
  id: string;
  name: string;
  code: string;
  description: string;
  issuer: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  category: string;
  location: string;
}

export const CERTIFICATIONS: CertBadge[] = [
  {
    id: 'bis-2062',
    name: 'BIS Structural Steel Standard',
    code: 'IS 2062:2011',
    description: 'Bureau of Indian Standards approval for Hot Rolled Steel Sections',
    issuer: 'Government of India',
  },
  {
    id: 'bis-1786',
    name: 'BIS TMT Reinforcement Standard',
    code: 'IS 1786:2018',
    description: 'Bureau of Indian Standards certification for High Strength Deformed Steel Bars (Fe 500D)',
    issuer: 'Government of India',
  },
  {
    id: 'iso-9001',
    name: 'ISO Quality Assurance',
    code: 'ISO 9001:2015',
    description: 'International Quality Management System certification for mill manufacturing & testing',
    issuer: 'TUV / International Accreditation Forum',
  },
  {
    id: 'env-compliance',
    name: 'Green Environmental Clearance',
    code: 'HSPCB Zero-Discharge',
    description: 'State Pollution Control Board compliance & sustainable furnace emission management',
    issuer: 'Haryana Pollution Control Board',
  },
];

export const CLIENT_LOGOS: ClientLogo[] = [
  { id: '1', name: 'Highway & Flyover Corridors', category: 'Highway Infrastructure', location: 'Northern India' },
  { id: '2', name: 'Logistics & Industrial Parks', category: 'Logistics Parks', location: 'Delhi NCR & Haryana' },
  { id: '3', name: 'Commercial High-Rise Towers', category: 'High-Rise Construction', location: 'Delhi NCR' },
  { id: '4', name: 'Power Transmission Grids', category: 'Electrical Grid Utility', location: 'State Sub-Grids' },
  { id: '5', name: 'Pre-Engineered Structure Works', category: 'Pre-Engineered Buildings', location: 'Industrial Hubs' },
  { id: '6', name: 'Civic Infrastructure Projects', category: 'Civic Infrastructure', location: 'Northern Region' },
];

export const COMPANY_FACTS = {
  revenueFY26: '₹203.03 Cr',
  revenueGoalFY30: '₹1,006.40 Cr',
  existingCapacity: '36,000 TPA',
  expansionCapacity: '144,000 TPA',
  totalCapacity: '180,000 TPA',
  factoryLocation: 'Bhiwadi, Haryana',
  headOfficeLocation: 'Delhi NCR',
  onTimeDeliveryRate: 'Direct Mill Dispatch',
  distributorCount: 'Northern India Network',
};
