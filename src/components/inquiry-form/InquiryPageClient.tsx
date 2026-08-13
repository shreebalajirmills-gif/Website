'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { InquiryForm } from '@/components/inquiry-form/InquiryForm';
import { BuyerSegment } from '@/types';

function InquiryFormContent() {
  const searchParams = useSearchParams();
  const segmentParam = searchParams.get('segment') as BuyerSegment | null;
  const initialSegment: BuyerSegment = segmentParam || 'distributor';

  return <InquiryForm initialSegment={initialSegment} />;
}

export function InquiryPageClient() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xs font-mono text-slate-500">Loading Inquiry Portal...</div>}>
      <InquiryFormContent />
    </Suspense>
  );
}
