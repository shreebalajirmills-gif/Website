import type { Metadata } from 'next';
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

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

export const metadata: Metadata = {
  title: 'Shree Balaji Rolling Mills | Structural Steel & TMT Bar Manufacturers',
  description:
    'MVP website with placeholder contact, inquiry, product, and trust sections.',
  keywords: [
    'MVP website template',
    'contact placeholders',
    'inquiry form',
    'product catalog',
    'trust section',
  ],
  authors: [{ name: 'Shree Balaji Rolling Mills Pvt. Ltd.' }],
  openGraph: {
    title: 'Shree Balaji Rolling Mills | Building Northern India’s Infrastructure',
    description: 'Placeholder contact and inquiry experience for the MVP site.',
    type: 'website',
    locale: 'en_IN',
  },
};

import { ThemeProvider } from '@/context/ThemeContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} light scroll-smooth`}
    >
      <body className="bg-steel-base text-steel-900 min-h-screen flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950 antialiased">
        <ThemeProvider>
          {/* Skip link for keyboard users */}
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-white text-black px-3 py-2 rounded-md">Skip to main content</a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
