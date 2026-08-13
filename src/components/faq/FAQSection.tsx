'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'What BIS standards and certifications do Shree Balaji Rolling Mills products hold?',
    answer:
      'Shree Balaji Rolling Mills produces BIS IS 2062:2011 Grade A/E250 certified Structural Steel shapes (Equal Angles and Channels) and BIS IS 1786:2018 Grade Fe-500D Thermo-Mechanically Treated (TMT) rebars. All operations conform to ISO 9001:2015 quality management SLAs and HSPCB zero-discharge environmental clearances.',
  },
  {
    question: 'What is SBRM’s total rolling mill capacity and manufacturing facility location?',
    answer:
      'SBRM operates a combined post-expansion rolling capacity of 180,000 TPA (36,000 TPA for Structural Steel sections and 144,000 TPA for Fe-500D TMT bars). Our primary manufacturing mill is located in Bhiwadi Industrial Area, Bhiwadi, Haryana, serving Delhi NCR and Northern India.',
  },
  {
    question: 'How do I request a custom commercial price quote or mill tonnage allocation?',
    answer:
      'Commercial buyers can submit quote requests through our digital B2B Inquiry Portal (/inquiry), email our corporate desk at shreebalajirmills@gmail.com, call +91 8800106726, or start an instant chat with our WhatsApp Sales Desk.',
  },
  {
    question: 'What is the expected response timeline for buyer inquiries and tender RFQs?',
    answer:
      'Our commercial sales desk reviews all inbound distributor inquiries, contractor RFQs, and tender proposals, responding as soon as possible with verified quotes within 24 business hours.',
  },
  {
    question: 'Are Mill Test Reports (MTRs) and batch quality certificates provided with dispatches?',
    answer:
      'Yes, every steel dispatch is accompanied by official BIS-certified Mill Test Reports detailing exact chemical heats, yield strength, tensile strength, and bend test parameters.',
  },
  {
    question: 'How can distributors, contractors, or project buyers schedule a plant facility audit?',
    answer:
      'Qualified distributors, infrastructure contractors, and institutional tender teams can contact our sales desk via phone (+91 8800106726) or email to arrange technical plant visits at our Bhiwadi manufacturing facility.',
  },
];

interface FAQSectionProps {
  items?: FAQItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  items = FAQ_DATA,
  title = 'Frequently Asked Questions',
  subtitle = 'Verified answers regarding our BIS certifications, rolling capacity, Bhiwadi mill facility, and commercial ordering process.',
  className = 'py-20 bg-steel-base border-b border-steel-200 relative overflow-hidden',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={className}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="glass-pill px-4 py-1.5 inline-flex items-center gap-2 text-growth-700 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-growth-600" />
            <span>KNOWLEDGE & INQUIRIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-steel-900 tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-steel-600 leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const accordionId = `faq-content-${idx}`;
            const headerId = `faq-header-${idx}`;

            return (
              <div
                key={idx}
                className="liquid-glass rounded-2xl border border-steel-200 overflow-hidden transition-all duration-200 shadow-sm"
              >
                <h3>
                  <button
                    id={headerId}
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={isOpen}
                    aria-controls={accordionId}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-steel-900 hover:text-growth-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-growth-500 rounded-2xl"
                  >
                    <span className="leading-snug">{item.question}</span>
                    <div
                      className={`w-8 h-8 rounded-xl bg-steel-100 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-growth-100 text-growth-700' : 'text-steel-600'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={accordionId}
                    role="region"
                    aria-labelledby={headerId}
                    className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-steel-600 leading-relaxed border-t border-steel-100 animate-in fade-in duration-200"
                  >
                    <p className="font-normal">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
