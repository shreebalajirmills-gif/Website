import React from 'react';
import TrustSection from './TrustSection';

const certifications = [
  { title: 'BIS:IS 2062', iconSrc: 'https://via.placeholder.com/48?text=BIS', alt: 'BIS logo' },
  { title: 'ISO 9001:2015', iconSrc: 'https://via.placeholder.com/48?text=ISO', alt: 'ISO logo' },
  { title: 'Environmental Compliance', iconSrc: 'https://via.placeholder.com/48?text=ENV', alt: 'Environmental' },
  { title: 'Quality Assured', iconSrc: 'https://via.placeholder.com/48?text=QA', alt: 'Quality' },
];

const stats = [
  { label: 'Existing Capacity:', value: '36,000 TPA', subtext: '3,000 MT / month' },
  { label: 'Expansion by FY28:', value: '144,000 TPA (TMT)', subtext: 'Total Platform: 180,000 TPA' },
];

const logos = Array.from({ length: 10 }).map((_, i) => ({ src: `https://via.placeholder.com/120x60?text=Logo+${i + 1}`, alt: `Logo ${i + 1}` }));

export default function TrustSectionDemo() {
  return (
    <div style={{ padding: 24 }}>
      <TrustSection certifications={certifications} stats={stats} logos={logos} testimonials={["Reliable partner for large-scale infrastructure projects."]} />
    </div>
  );
}
