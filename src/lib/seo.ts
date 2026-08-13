import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/config/site';

interface ConstructMetadataParams {
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  keywords?: string[];
  type?: 'website' | 'article';
}

export function constructMetadata({
  title,
  description = SITE_CONFIG.description,
  image = SITE_CONFIG.ogImage,
  canonicalUrl = '/',
  noIndex = false,
  keywords = [],
  type = 'website',
}: ConstructMetadataParams = {}): Metadata {
  const fullTitle = !title
    ? `${SITE_CONFIG.name} | Structural Steel & TMT Bar Manufacturers`
    : title.includes(SITE_CONFIG.shortName) || title.includes(SITE_CONFIG.name)
    ? title
    : `${title} | ${SITE_CONFIG.shortName}`;

  const cleanPath = canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`;
  const formattedCanonical = canonicalUrl.startsWith('http')
    ? canonicalUrl
    : `${SITE_CONFIG.url}${cleanPath === '/' ? '' : cleanPath}`;

  const formattedImage = image.startsWith('http')
    ? image
    : `${SITE_CONFIG.url}${image.startsWith('/') ? image : `/${image}`}`;

  const mergedKeywords = Array.from(
    new Set([...SITE_CONFIG.keywords, ...keywords])
  );

  return {
    title: fullTitle,
    description,
    keywords: mergedKeywords,
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: formattedCanonical,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: formattedCanonical,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: formattedImage,
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.name} - Steel Manufacturing Facility`,
        },
      ],
      locale: 'en_IN',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [formattedImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.png', type: 'image/png' },
        { url: '/icon.png', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
  };
}

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    alternateName: [SITE_CONFIG.shortName, SITE_CONFIG.acronym],
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.contact.email,
    telephone: SITE_CONFIG.contact.phoneRaw,
    sameAs: [
      SITE_CONFIG.socialLinks.instagram,
      SITE_CONFIG.socialLinks.facebook,
      SITE_CONFIG.socialLinks.x,
      SITE_CONFIG.socialLinks.reddit,
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bhiwadi',
      addressRegion: 'Haryana',
      addressCountry: 'IN',
    },
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
    hasCertification: SITE_CONFIG.certifications.map((cert) => ({
      '@type': 'Certification',
      name: cert,
    })),
    knowsAbout: [
      'Structural Steel Rolling',
      'IS 2062 Structural Shapes',
      'IS 1786 Fe-500D TMT Rebars',
      'Thermex Water Quenching Process',
      'Steel Weight & Bundle Calculation',
    ],
  };
}

export function getWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    publisher: {
      '@id': `${SITE_CONFIG.url}/#organization`,
    },
    inLanguage: 'en-IN',
  };
}

export function getBreadcrumbJsonLd(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.item.startsWith('http') ? crumb.item : `${SITE_CONFIG.url}${crumb.item}`,
    })),
  };
}

export function getProductJsonLd({
  name,
  description,
  url,
  image,
  standard,
  capacity,
  applications,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
  standard: string;
  capacity: string;
  applications: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    url: `${SITE_CONFIG.url}${url}`,
    image: image ? `${SITE_CONFIG.url}${image}` : `${SITE_CONFIG.url}/logo.png`,
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.shortName,
    },
    manufacturer: {
      '@id': `${SITE_CONFIG.url}/#organization`,
    },
    category: 'Industrial & Construction Steel',
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Standard Compliance',
        value: standard,
      },
      {
        '@type': 'PropertyValue',
        name: 'Annual Production Capacity',
        value: capacity,
      },
      {
        '@type': 'PropertyValue',
        name: 'Target Applications',
        value: applications.join(', '),
      },
    ],
  };
}

export function getFaqJsonLd(faqItems: { question: string; answer: string }[] = []) {
  const items = Array.isArray(faqItems) ? faqItems : [];
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
