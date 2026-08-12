import React from 'react';
import Footer, { FooterColumn, SocialLink } from './Footer';

const customColumns: FooterColumn[] = [
  {
    title: 'PRODUCTS',
    links: [
      { label: 'Structural Steel', href: '/products/structural-steel' },
      { label: 'TMT Bar', href: '/products/tmt-bar' },
      { label: 'Specifications', href: '/products/specifications' },
      { label: 'Download Datasheets', href: '/assets/datasheets/datasheet.pdf' },
    ],
  },
  // other columns omitted for brevity – Footer will use sensible defaults if omitted
];

const social: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/shree-balaji-rolling-mills' },
  { label: 'X', href: 'https://x.com/shreebalaji' },
  { label: 'Instagram', href: 'https://www.instagram.com/shreebalajicom' },
  { label: 'WhatsApp', href: 'https://wa.me/911244604500?text=Hello%20Shree%20Balaji' },
];

export default function FooterExample() {
  const handleNewsletter = (email: string) => {
    // send email to subscription service
    console.log('Subscribed', email);
  };

  return <Footer columns={customColumns} socialLinks={social} newsletterOnSubmit={handleNewsletter} />;
}
