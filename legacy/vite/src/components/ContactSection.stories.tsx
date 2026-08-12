import React from 'react';
import ContactSection from './ContactSection';
import CrispLoader from './CrispLoader';

export default {
  title: 'Components/ContactSection',
  component: ContactSection,
};

export const Default = () => (
  <>
    {/* Add CrispLoader with placeholder ID for Storybook preview; replace with real ID in app. */}
    <CrispLoader websiteId={process.env.REACT_APP_CRISP_WEBSITE_ID || ''} />
    <ContactSection
      chatEnabled={true}
      whatsappNumber="919999999999"
      phoneNumber="+91-124-4604-500"
      email="inquiry@shreebalajicom"
      businessHours="Mon–Sat, 9 AM–6 PM IST"
    />
  </>
);
