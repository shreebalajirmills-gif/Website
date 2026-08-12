import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, FileText, CheckCircle2, Building, Printer } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface TemplateData {
  title: string;
  badge: string;
  updatedAt: string;
  description: string;
  sections: {
    heading: string;
    content: string[];
  }[];
}

const TEMPLATES: Record<string, TemplateData> = {
  privacy: {
    title: 'Privacy Policy',
    badge: 'Legal & Data Governance',
    updatedAt: 'August 2026',
    description:
      'Official Privacy Policy and Data Governance Policy for Shree Balaji Rolling Mills Private Limited.',
    sections: [
      {
        heading: '1. Overview & Data Collection',
        content: [
          'This section outlines how your organization collects, processes, and stores user information submitted through commercial inquiry forms and contact portals.',
          'Topics to include: Full Name, Business Email, Phone Number, Company Name, and Segment Interests (Distributor, Contractor, Infrastructure, Investor).',
          'Note: Explicit consent should be requested prior to processing personal or business entity telemetry.',
        ],
      },
      {
        heading: '2. Purpose of Processing & Usage',
        content: [
          'Inquiry Routing: Directing submitter details to regional sales desks and account managers for prompt quote generation.',
          'Quality & Support: Improving site performance, maintaining security logs, and fulfilling Mill Test Report (MTR) requests.',
          'Marketing & Communications: B2B product updates, price list notifications, and rolling schedule announcements (with opt-out options).',
        ],
      },
      {
        heading: '3. Data Security & Storage Policy',
        content: [
          'Detail the encryption standards (e.g. SSL/TLS 256-bit encryption), access controls, and database hosting infrastructure used to protect B2B client data.',
          'State data retention periods (e.g. active account lifetime + 7 years for regulatory audit compliance).',
        ],
      },
      {
        heading: '4. Contact & Compliance Desk',
        content: [
          'Provide direct contact channels for users to request data access, deletion, or privacy inquiries.',
          'Insert DPO (Data Protection Officer) or Compliance Desk email address, phone number, and physical office address.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of Use',
    badge: 'Commercial Terms & Policy',
    updatedAt: 'August 2026',
    description:
      'Terms of Service and Website Usage Policy governing commercial inquiries, technical catalog access, and B2B communications.',
    sections: [
      {
        heading: '1. Acceptance of Terms',
        content: [
          'By accessing this digital platform, users agree to be bound by these Terms of Use, applicable laws, and regional commercial regulations.',
          'If the user does not agree with any part of these terms, they must cease usage of the digital catalog and inquiry portals immediately.',
        ],
      },
      {
        heading: '2. Product Specifications & Quotes Disclaimer',
        content: [
          'All mechanical properties, weight calculations (D²/162), and chemical compositions listed on the site reflect standard BIS IS 2062 & IS 1786 specifications.',
          'Official commercial binding quotes, heat allocation numbers, and dispatch SLAs are subject to final pro-forma invoice confirmation from the sales desk.',
        ],
      },
      {
        heading: '3. Intellectual Property Rights',
        content: [
          'All logos, trademarks, structural engineering brand marks, 3D WebGL assets, and technical datasheets remain the exclusive property of the manufacturing company.',
          'Unauthorized reproduction, scraping, or commercial redistribution of platform content is strictly prohibited.',
        ],
      },
      {
        heading: '4. Limitation of Liability & Governing Law',
        content: [
          'The company shall not be liable for site downtime, indirect damages, or site delivery delays arising from force majeure events.',
          'These terms are governed by the laws of India, with exclusive jurisdiction in the courts of Delhi NCR / Haryana.',
        ],
      },
    ],
  },
  quality: {
    title: 'Quality Control & Testing Framework',
    badge: 'Quality Assurance Protocol',
    updatedAt: 'August 2026',
    description:
      'This document outlines the standard Quality Assurance & Metallurgy Testing Protocol for IS 2062 Structural Profiles and IS 1786 Fe-500D TMT Rebars.',
    sections: [
      {
        heading: '1. Bureau of Indian Standards (BIS) Adherence',
        content: [
          'Structural Steel Angles & Channels: Manufactured per IS 2062:2011 Grade A/E250 with controlled Carbon & Manganese percentages.',
          'High-Ductility TMT Rebars: Produced per IS 1786:2018 Grade Fe-500D with minimum 16% elongation for high seismic resilience.',
        ],
      },
      {
        heading: '2. NABL Accredited Chemical & Tensile Lab Testing',
        content: [
          'Spectrometer Chemical Testing: Verifying Carbon, Sulfur, Phosphorus, and Carbon Equivalent (CE) limits on every heat batch.',
          'Universal Testing Machine (UTM): Tensile yield strength testing, 180° bend and re-bend testing to ensure zero micro-cracking.',
        ],
      },
      {
        heading: '3. Mill Test Report (MTR) Traceability',
        content: [
          'Every trailer dispatch is accompanied by an official QR-verifiable Mill Test Report (MTR) detailing Cast Number, Grade, and Chemical Heat Analysis.',
          'Inspectors and EPC site engineers can cross-examine heat numbers directly against physical bundle tags.',
        ],
      },
      {
        heading: '4. Quality Inspection & Acceptance Criteria',
        content: [
          'Visual & Dimensional Tolerance Check: Flange thickness, web depth, length tolerances (+/- 50mm standard bundle length).',
          'Zero-Defect Dispatch Policy: Surface defect-free, scale-cleaned profiles ready for immediate fabrication and site installation.',
        ],
      },
    ],
  },
  compliance: {
    title: 'Compliance & Regulatory Declarations',
    badge: 'Institutional Regulatory Framework',
    updatedAt: 'August 2026',
    description:
      'This document summarizes the regulatory compliance, environmental declarations, and statutory approvals governing the rolling mill operations.',
    sections: [
      {
        heading: '1. Environmental & Green Steel Declarations',
        content: [
          'State Pollution Control Board (SPCB) consent to operate with continuous emission monitoring systems (CEMS).',
          'Implementation of energy-efficient reheating furnaces and water recirculation closed-loop cooling circuits.',
        ],
      },
      {
        heading: '2. Bureau of Indian Standards (BIS) Licenses',
        content: [
          'Active BIS Certification CM/L Numbers for IS 2062 Structural Shapes and IS 1786 High-Ductility Rebars.',
          'Annual third-party audit compliance and factory production control (FPC) registration.',
        ],
      },
      {
        heading: '3. Industrial Safety & Labor Welfare Standards',
        content: [
          'Zero-Accident Safety Management System with ISO 45001 Occupational Health and Safety compliance.',
          'Full statutory adherence to Factory Act, Employees State Insurance (ESI), and Provident Fund (PF) regulations.',
        ],
      },
      {
        heading: '4. Corporate Governance & Audit Disclosures',
        content: [
          'Statutory annual financial audits conducted by independent chartered accountancy firms.',
          'Anti-corruption, fair trade practices, and transparent B2B supply chain ethics framework.',
        ],
      },
    ],
  },
};

export function generateStaticParams() {
  return [
    { slug: 'privacy' },
    { slug: 'terms' },
    { slug: 'quality' },
    { slug: 'compliance' },
  ];
}

export default async function TemplatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const template = TEMPLATES[slug];

  if (!template) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-steel-base text-steel-900 flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Navigation Back Link */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-steel-600 hover:text-growth-700 transition-colors glass-pill px-4 py-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Main Website</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <span className="badge-contractor text-xs font-mono px-3 py-1 rounded-full border font-bold">
              {template.badge}
            </span>
          </div>
        </div>

        {/* Hero Title Container */}
        <div className="liquid-glass-prominent rounded-3xl p-8 sm:p-10 mb-10 border border-steel-200 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-growth-700">
            <FileText className="w-4 h-4 text-growth-600" />
            <span>OFFICIAL TEMPLATE DOCUMENT — OPENED IN NEW TAB</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-steel-900 tracking-tight">
            {template.title}
          </h1>
          <p className="text-sm text-steel-600 leading-relaxed max-w-3xl">
            {template.description}
          </p>
          <div className="pt-2 text-xs text-steel-500 font-mono">
            Last Updated: {template.updatedAt} | Version: 1.0 (Official Document)
          </div>
        </div>

        {/* Sections Content */}
        <div className="space-y-8">
          {template.sections.map((section, idx) => (
            <div
              key={idx}
              className="liquid-glass rounded-3xl p-6 sm:p-8 border border-steel-200 space-y-4 shadow-md"
            >
              <h2 className="text-xl font-bold text-steel-900 border-b border-steel-200 pb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-growth-600 shrink-0" />
                <span>{section.heading}</span>
              </h2>

              <ul className="space-y-3 text-sm text-steel-700 font-normal leading-relaxed">
                {section.content.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-growth-600 mt-2 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Action Footer Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-steel-100 border border-steel-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <div className="flex items-center gap-2 text-steel-700">
            <Building className="w-4 h-4 text-growth-600 shrink-0" />
            <span>Shree Balaji Rolling Mills Private Limited — Official Digital Document Platform</span>
          </div>
          <Link
            href="/"
            className="btn-primary !py-2 !px-4 text-xs font-bold shrink-0"
          >
            Back to Platform Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
