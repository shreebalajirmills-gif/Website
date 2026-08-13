'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ContactSection } from '@/components/contact/ContactSection';
import { BuyerSegment } from '@/types';

export function ContactPageClient() {
  const router = useRouter();

  const handleSelectSegment = (segment: BuyerSegment) => {
    router.push(`/inquiry?segment=${segment}`);
  };

  return <ContactSection onSelectSegment={handleSelectSegment} />;
}
