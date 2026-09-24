import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import ProductsClient from '@/components/products/ProductsClient';

export const metadata: Metadata = constructMetadata({
  title: 'Products Suite | MS Flats, Round Bars & Square Bars (BIS Certified)',
  description:
    'Explore Shree Balaji Rolling Mills product catalog: IS 2062 MS Flats (Patti), Round Bars (Gol), and Square Bars (Chakor) manufactured per BIS IS 2062:2011 Grade E250 in Bhiwadi, Haryana. Request original video frames and product photos.',
  canonicalUrl: '/products',
  keywords: [
    'MS Flats Manufacturer',
    'MS Round Bars Gol',
    'MS Square Bars Chakor',
    'IS 2062 Grade E250 Steel',
    'Bhiwadi Rolling Mill Products',
    'Patti Gol Chakor Delhi NCR',
  ],
});

export default function ProductsPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', item: '/' },
    { name: 'Our Products', item: '/products' },
  ]);

  return (
    <main id="main-content" className="min-h-screen bg-steel-base text-steel-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col">
      <JsonLd data={breadcrumbJsonLd} />
      <Header />
      <ProductsClient />
      <Footer />
    </main>
  );
}
