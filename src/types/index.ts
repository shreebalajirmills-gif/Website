export type BuyerSegment = 'distributor' | 'contractor' | 'project' | 'investor';

export type ProductType = 'structural_steel' | 'tmt_bar';

export interface ProductSpec {
  id: string;
  type: ProductType;
  name: string;
  tagline: string;
  description: string;
  badge?: string;
  isNewFacility?: boolean;
  specs: {
    tensileStrength: string;
    yieldStrength: string;
    elongation?: string;
    standard: string;
    certifications: string[];
  };
  capacity: {
    tpa: number; // Tons Per Annum
    monthlyMT: number; // Metric Tons per Month
    formatTpa: string;
    formatMonthly: string;
  };
  leadTime: string;
  applications: string[];
  pdfFilename: string;
}

export interface FinancialGrowthMetric {
  year: string;
  phase: 'Baseline' | 'Inflection' | 'Scale';
  phaseDescription: string;
  revenueCr: number;
  ebitdaVolumeCr: number;
  ebitdaMarginPct: number;
  patCr: number;
  patMarginPct: number;
  capacityTpa: number;
  keyHighlight: string;
}

export interface InquiryFormData {
  segment: BuyerSegment;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  message: string;
  specInterest: 'structural_steel' | 'tmt_bar' | 'both';
  
  // Segment-specific optional fields
  currentSuppliers?: string;
  annualVolumeMT?: string;
  growthAspiration?: string;
  projectScope?: string;
  requiredVolumeMT?: string;
  deliveryTimeline?: string;
  investmentScale?: string;
}

export interface ApiResponse<T = unknown> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  inquiryId?: string;
  crmTag?: string;
  assignedRole?: string;
  field?: string;
}
