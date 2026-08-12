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
    'Shree Balaji Rolling Mills Private Limited is a leading steel manufacturer in Bhiwadi, Haryana & Delhi NCR, producing IS 2062 Structural Steel & IS 1786 Fe-500D TMT bars with 180,000 TPA total capacity.',
  keywords: [
    'Shree Balaji Rolling Mills',
    'Structural Steel Manufacturers',
    'TMT Bar Fe 500D',
    'Steel Mills Bhiwadi Haryana',
    'Delhi NCR Steel Suppliers',
    'IS 2062 Angles Channels',
    'IS 1786 Reinforcement Bars',
  ],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  authors: [{ name: 'Shree Balaji Rolling Mills Pvt. Ltd.' }],
  openGraph: {
    title: 'Shree Balaji Rolling Mills | Building Northern India’s Infrastructure',
    description:
      'Premier steel manufacturing platform operating 36,000 TPA structural steel & 144,000 TPA TMT bar rolling mill in Bhiwadi, Haryana.',
    type: 'website',
    locale: 'en_IN',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="bg-steel-base text-steel-900 min-h-screen flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950 antialiased">
        {/* Skip link for keyboard users */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-white text-black px-3 py-2 rounded-md">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
