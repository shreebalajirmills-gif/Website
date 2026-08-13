import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { HomePageClient } from '@/components/home/HomePageClient';

export const metadata: Metadata = constructMetadata({
  title: 'Shree Balaji Rolling Mills | Structural Steel & TMT Bar Manufacturers',
  description:
    'Shree Balaji Rolling Mills Private Limited operates a 180,000 TPA steel rolling facility in Bhiwadi, Haryana, manufacturing BIS certified IS 2062 Structural Steel & IS 1786 Fe-500D TMT bars.',
  canonicalUrl: '/',
  keywords: [
    'Shree Balaji Rolling Mills',
    'Steel Rolling Mill Bhiwadi',
    'IS 2062 Structural Steel Manufacturer',
    'Fe 500D TMT Bar Supplier Northern India',
    'Delhi NCR Steel Factory',
  ],
});

export default function Home() {
  return <HomePageClient />;
}
