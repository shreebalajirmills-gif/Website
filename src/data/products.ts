import { ProductSpec } from '@/types';

export const PRODUCTS_DATA: ProductSpec[] = [
  {
    id: 'structural-steel-01',
    type: 'structural_steel',
    name: 'Structural Steel Angles & Channels',
    tagline: 'Precision-Engineered Heavy & Light Industrial Profiles',
    description: 'High-tensile structural steel sections tailored for industrial warehouse framing, power transmission towers, bridge girders, and commercial infrastructure across Northern India.',
    badge: 'Core Production Line',
    specs: {
      tensileStrength: '250 – 400 MPa',
      yieldStrength: '150 – 250 MPa',
      elongation: '≥ 20%',
      standard: 'IS 2062:2011 Grade A/E250',
      certifications: ['BIS Certified', 'ISO 9001:2015 Registered', 'NABL Lab Batch Tested'],
    },
    capacity: {
      tpa: 36000,
      monthlyMT: 3000,
      formatTpa: '[Insert Structural Capacity TPA]',
      formatMonthly: '[Insert Monthly Capacity MT]',
    },
    leadTime: '2 – 4 Weeks',
    applications: [
      'Industrial Shed framing & Warehouses',
      'Solar Panel Mounting Structures',
      'Power Transmission Line Towers',
      'Highway Bridges & Infrastructure Supports',
    ],
    pdfFilename: 'SBMPL_Structural_Steel_Specs.pdf',
  },
  {
    id: 'tmt-bar-01',
    type: 'tmt_bar',
    name: 'Fe-500D High-Ductility TMT Bars',
    tagline: 'High-Ductility Steel Segment for Seismic Resilience',
    description: 'Advanced Thermo-Mechanically Treated reinforcement bars featuring superior earthquake resistance, high elongation capability, and corrosion resistance for high-rise commercial towers and civic infrastructure.',
    badge: 'Strategic Facility Ramp-Up',
    isNewFacility: true,
    specs: {
      tensileStrength: '≥ 565 MPa',
      yieldStrength: '≥ 500 MPa',
      elongation: '≥ 16% (High Ductility Grade D)',
      standard: 'IS 1786:2018 Grade Fe-500D',
      certifications: ['BIS IS 1786 Certified', 'Seismic Zone V Compliant', 'ISO 9001:2015 Quality SLA'],
    },
    capacity: {
      tpa: 144000,
      monthlyMT: 12000,
      formatTpa: '[Insert TMT Expansion Capacity TPA]',
      formatMonthly: '[Insert Monthly Capacity MT]',
    },
    leadTime: '1 – 3 Weeks',
    applications: [
      'High-Rise Commercial & Residential Towers',
      'Metro Rail Corridors & Flyovers',
      'Industrial Heavy Machine Foundations',
      'High-Load Seismic Zone Construction',
    ],
    pdfFilename: 'SBMPL_TMT_Bar_Fe500D_Specs.pdf',
  },
];
