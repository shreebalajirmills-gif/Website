import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactPageClient } from '@/components/contact/ContactPageClient';
import { LocationMapSection } from '@/components/location/LocationMapSection';
import { FAQSection, FAQ_DATA } from '@/components/faq/FAQSection';
import { constructMetadata, getBreadcrumbJsonLd, getFaqJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_CONFIG } from '@/config/site';

export const metadata: Metadata = constructMetadata({
  title: 'Contact Desk & Bhiwadi Mill Locations',
  description:
    'Connect directly with Shree Balaji Rolling Mills sales desk in Bhiwadi, Haryana or corporate office in Delhi NCR for immediate quotes and dispatch schedules.',
  canonicalUrl: '/contact',
  keywords: [
    'Contact Shree Balaji Rolling Mills',
    'Bhiwadi Steel Mill Address',
    'Delhi NCR Corporate Office Steel',
    'Steel Dispatch Desk Haryana',
  ],
});

export default function ContactPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', item: '/' },
    { name: 'Contact Us', item: '/contact' },
  ]);

  const faqJsonLd = getFaqJsonLd(FAQ_DATA);

  const contactPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Shree Balaji Rolling Mills Contact Desk',
    url: `${SITE_CONFIG.url}/contact`,
    mainEntity: {
      '@type': 'Corporation',
      name: SITE_CONFIG.name,
      email: SITE_CONFIG.contact.email,
      location: [
        {
          '@type': 'Place',
          name: 'Bhiwadi Manufacturing Facility',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Bhiwadi',
            addressRegion: 'Haryana',
            addressCountry: 'IN',
          },
        },
        {
          '@type': 'Place',
          name: 'Delhi NCR Corporate Office',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Delhi NCR',
            addressCountry: 'IN',
          },
        },
      ],
    },
  };

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <JsonLd data={[breadcrumbJsonLd, contactPageJsonLd, faqJsonLd]} />
      <Header />

      <section className="pt-36 pb-12 bg-white border-b border-slate-200 steel-grid-pattern text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-full border border-slate-300">
            CORPORATE & MILL CONTACT DESK
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900">
            Multi-Channel <span className="text-gradient-amber">Contact Desk</span>
          </h1>
          <p className="text-sm text-slate-600 font-normal max-w-xl mx-auto">
            Connect directly with our mill sales team in Bhiwadi, Haryana or corporate office in Delhi NCR for immediate quotes & dispatch schedules.
          </p>
        </div>
      </section>

      <ContactPageClient />

      <LocationMapSection />

      <FAQSection />

      <Footer />
    </main>
  );
}
