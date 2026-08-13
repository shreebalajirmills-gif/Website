export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
  }
}

// Log pageviews
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Custom event tracking helper (No PII is sent)
export const trackEvent = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};

// Track Inquiry Submissions
export const trackInquirySubmit = (segment: string) => {
  trackEvent({
    action: 'enquiry_submission',
    category: 'conversion',
    label: segment,
  });
};

// Track CTA Clicks
export const trackCtaClick = (ctaName: string, destination: string) => {
  trackEvent({
    action: 'cta_click',
    category: 'engagement',
    label: `${ctaName} -> ${destination}`,
  });
};

// Track WhatsApp Sales Desk Clicks
export const trackWhatsAppClick = (source: string) => {
  trackEvent({
    action: 'whatsapp_click',
    category: 'conversion',
    label: source,
  });
};

// Track Google Maps Directions Clicks
export const trackDirectionsClick = () => {
  trackEvent({
    action: 'directions_click',
    category: 'engagement',
    label: 'Bhiwadi Mill Location',
  });
};
