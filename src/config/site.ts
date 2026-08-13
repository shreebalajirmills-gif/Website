import contactData from './contact.json';

export const SITE_CONFIG = {
  name: 'Shree Balaji Rolling Mills Private Limited',
  shortName: 'Shree Balaji Rolling Mills',
  acronym: 'SBMPL',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://shree-balaji-site.pages.dev').replace(/\/$/, ''),
  ogImage: '/logo.png',
  description:
    'Shree Balaji Rolling Mills Private Limited is a premier steel manufacturer in Bhiwadi, Haryana & Delhi NCR, producing BIS certified IS 2062 Structural Steel shapes and IS 1786 Fe-500D TMT bars with 180,000 TPA total rolling capacity.',
  keywords: [
    'Shree Balaji Rolling Mills',
    'Structural Steel Manufacturers',
    'TMT Bar Fe 500D',
    'Steel Mills Bhiwadi Haryana',
    'Delhi NCR Steel Suppliers',
    'IS 2062 Angles Channels',
    'IS 1786 Reinforcement Bars',
    'Hot Rolled Steel Sections',
    'Thermo Mechanically Treated Rebars',
    'BIS IS 2062 Grade E250',
    'BIS IS 1786 Grade Fe-500D',
  ],
  address: contactData.address,
  contact: {
    email: contactData.email,
    phone: contactData.phone,
    phoneRaw: contactData.phoneRaw,
    whatsappRaw: contactData.whatsappRaw,
    whatsappDefaultMessage: contactData.whatsappDefaultMessage,
    salesDesk: contactData.salesDesk,
  },
  socialLinks: contactData.socialLinks,
  certifications: [
    'BIS IS 2062:2011 Grade A/E250',
    'BIS IS 1786:2018 Grade Fe-500D',
    'ISO 9001:2015 Registered Quality SLA',
    'HSPCB Zero-Discharge Clearance',
  ],
  capacity: {
    structuralTpa: '36,000 TPA',
    tmtTpa: '144,000 TPA',
    totalTpa: '180,000 TPA',
  },
};

export function getWhatsAppUrl(message: string = SITE_CONFIG.contact.whatsappDefaultMessage): string {
  return `https://wa.me/${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(message)}`;
}
