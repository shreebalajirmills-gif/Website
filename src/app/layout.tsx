import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { constructMetadata, getOrganizationJsonLd, getWebsiteJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { FloatingWhatsApp } from '@/components/social/FloatingWhatsApp';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
};

export const metadata: Metadata = constructMetadata({
  title: 'Shree Balaji Rolling Mills | Structural Steel & TMT Bar Manufacturers',
  description:
    'Shree Balaji Rolling Mills Private Limited is a premier steel manufacturer in Bhiwadi, Haryana & Delhi NCR, producing BIS certified IS 2062 Structural Steel & IS 1786 Fe-500D TMT bars with 180,000 TPA total capacity.',
  canonicalUrl: '/',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = getOrganizationJsonLd();
  const websiteJsonLd = getWebsiteJsonLd();

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
      </head>
      <body className="bg-steel-base text-steel-900 min-h-screen flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950 antialiased">
        <GoogleAnalytics />
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-white text-black px-4 py-2.5 rounded-lg shadow-lg font-bold text-xs"
        >
          Skip to main content
        </a>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
