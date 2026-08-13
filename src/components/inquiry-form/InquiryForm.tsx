'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BuyerSegment, InquiryFormData, ApiResponse } from '@/types';
import { inquirySchema } from '@/lib/validation';
import { Briefcase, Layers, Building2, TrendingUp, CheckCircle, ArrowRight, ArrowLeft, Send, ShieldCheck, Loader2 } from 'lucide-react';
import { getWhatsAppUrl } from '@/config/site';
import { SocialIcon } from '@/components/social/SocialLinks';

interface InquiryFormProps {
  initialSegment?: BuyerSegment;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({ initialSegment = 'distributor' }) => {
  const router = useRouter();
  const [segment, setSegment] = useState<BuyerSegment>(initialSegment);
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<ApiResponse | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState<string>('');

  const [formData, setFormData] = useState<InquiryFormData>({
    segment: initialSegment,
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    message: '',
    specInterest: 'both',
    currentSuppliers: '',
    annualVolumeMT: '',
    growthAspiration: '20-50%',
    projectScope: '',
    requiredVolumeMT: '',
    deliveryTimeline: '2-4 weeks',
    investmentScale: '',
  });

  const handleSegmentSelect = (seg: BuyerSegment) => {
    setSegment(seg);
    setFormData((prev) => ({ ...prev, segment: seg }));
    setStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage(null);
    setFieldErrors((prev) => {
      if (!name) return prev;
      const copy = { ...prev };
      if (copy[name]) delete copy[name];
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const validation = inquirySchema.safeParse(formData);
    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const field = String(issue.path?.[0] || '');
        if (field) errors[field] = issue.message;
      });

      setFieldErrors(errors);
      setErrorMessage('Please fix the highlighted errors before submitting.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, website_hp: honeypot }),
      });

      const data: ApiResponse = await response.json();
      setSubmissionResult(data);

      if (response.ok && data.status === 'success') {
        router.push(`/thank-you${data.inquiryId ? `?inquiryId=${data.inquiryId}` : ''}`);
      } else {
        setErrorMessage(data.message || 'Submission failed. Please try again.');
      }
    } catch {
      setErrorMessage('Network error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="inquiry-portal" className="py-20 bg-steel-50 border-b border-steel-200 relative overflow-hidden">
      <div className="ambient-liquid-glow ambient-glow-growth top-1/4 left-1/4 scale-125" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center space-y-4 mb-12">
          <span className="glass-pill px-4 py-1.5 text-xs font-bold text-growth-700 uppercase tracking-wider inline-block">
            COMMERCIAL DESK PORTAL
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-steel-900 tracking-tight">
            Commercial Inquiry & <span className="text-gradient-growth">Rolling Allocation Portal</span>
          </h2>
          <p className="text-sm text-steel-600 max-w-xl mx-auto font-normal">
            Submit your structural steel, TMT bar, distribution, or project tender requirements for verified commercial response within 24 hours.
          </p>
        </div>

        {/* Liquid Glass Form Card */}
        <div className="liquid-glass-prominent rounded-3xl p-6 sm:p-12 border border-steel-200 shadow-xl relative">
          
          {/* Instant WhatsApp Option Banner */}
          <div className="mb-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3 text-emerald-950 text-xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <SocialIcon platform="whatsapp" className="w-4 h-4 fill-current" />
              </div>
              <div>
                <strong className="font-bold text-sm block text-emerald-900">Need an Instant Quotation?</strong>
                <span className="text-emerald-800">Talk directly with our Bhiwadi mill sales desk on WhatsApp right now.</span>
              </div>
            </div>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl whitespace-nowrap transition-all shadow-sm border border-emerald-400/30 flex items-center gap-2"
            >
              <SocialIcon platform="whatsapp" className="w-3.5 h-3.5 fill-current" />
              <span>Talk for Quotation</span>
            </a>
          </div>

          {/* Step Progress Bar */}
          {step < 4 && (
            <div className="mb-10 border-b border-steel-200 pb-6">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-steel-700 mb-2">
                <span>Step {step} of 3</span>
                <span className="text-growth-700 uppercase tracking-widest font-extrabold font-mono">
                  {step === 1 && 'Select Segment Role'}
                  {step === 2 && `${segment.toUpperCase()} Specifics & Products`}
                  {step === 3 && 'Contact & Logistics'}
                </span>
              </div>
              <div className="w-full bg-steel-200 h-2 rounded-full overflow-hidden border border-steel-300">
                <div
                  className="bg-growth-600 h-full transition-all duration-300 rounded-full shadow-sm"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* STEP 1: SEGMENT SELECTION */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-steel-900 text-center">
                Select your inquiry role for context routing:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Distributor Card */}
                <button
                  type="button"
                  onClick={() => handleSegmentSelect('distributor')}
                  aria-pressed={segment === 'distributor'}
                  className={`p-6 sm:p-5 rounded-2xl text-left transition-all duration-300 transform group flex items-start gap-4 cursor-pointer min-h-[48px] ${
                    segment === 'distributor'
                      ? 'liquid-glass liquid-glass-distributor border-authority-500 shadow-xl ring-2 ring-authority-500/40 -translate-y-1'
                      : 'liquid-glass border-steel-200 hover:border-authority-400 hover:bg-authority-50/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-authority-500/10'
                  }`}
                >
                  <div className="p-3 rounded-xl bg-authority-50 text-authority-700 border border-authority-200 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:bg-authority-100">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-steel-900 group-hover:text-authority-700 transition-colors">
                      Steel Distributor / Dealer
                    </h4>
                    <p className="text-xs text-steel-600 mt-1 leading-relaxed font-normal">
                      Long-term supply terms, margin structure & regional volume allocation.
                    </p>
                  </div>
                </button>

                {/* Contractor Card */}
                <button
                  type="button"
                  onClick={() => handleSegmentSelect('contractor')}
                  aria-pressed={segment === 'contractor'}
                  className={`p-6 sm:p-5 rounded-2xl text-left transition-all duration-300 transform group flex items-start gap-4 cursor-pointer min-h-[48px] ${
                    segment === 'contractor'
                      ? 'liquid-glass liquid-glass-contractor border-growth-500 shadow-xl ring-2 ring-growth-500/40 -translate-y-1'
                      : 'liquid-glass border-steel-200 hover:border-growth-400 hover:bg-growth-50/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-growth-500/10'
                  }`}
                >
                  <div className="p-3 rounded-xl bg-growth-50 text-growth-700 border border-growth-200 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:bg-growth-100">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-steel-900 group-hover:text-growth-700 transition-colors">
                      Contractor / Fabricator
                    </h4>
                    <p className="text-xs text-steel-600 mt-1 leading-relaxed font-normal">
                      Bulk order pricing for structural steel & TMT bars with 48h site dispatch.
                    </p>
                  </div>
                </button>

                {/* Infrastructure Card */}
                <button
                  type="button"
                  onClick={() => handleSegmentSelect('project')}
                  aria-pressed={segment === 'project'}
                  className={`p-6 sm:p-5 rounded-2xl text-left transition-all duration-300 transform group flex items-start gap-4 cursor-pointer min-h-[48px] ${
                    segment === 'project'
                      ? 'liquid-glass liquid-glass-project border-trust-500 shadow-xl ring-2 ring-trust-500/40 -translate-y-1'
                      : 'liquid-glass border-steel-200 hover:border-trust-400 hover:bg-trust-50/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-trust-500/10'
                  }`}
                >
                  <div className="p-3 rounded-xl bg-trust-50 text-trust-700 border border-trust-200 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:bg-trust-100">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-steel-900 group-hover:text-trust-700 transition-colors">
                      Infrastructure Project
                    </h4>
                    <p className="text-xs text-steel-600 mt-1 leading-relaxed font-normal">
                      Multi-month procurement tenders, custom SLAs & capacity allocations.
                    </p>
                  </div>
                </button>

                {/* Investor Card */}
                <button
                  type="button"
                  onClick={() => handleSegmentSelect('investor')}
                  aria-pressed={segment === 'investor'}
                  className={`p-6 sm:p-5 rounded-2xl text-left transition-all duration-300 transform group flex items-start gap-4 cursor-pointer min-h-[48px] ${
                    segment === 'investor'
                      ? 'liquid-glass liquid-glass-investor border-amber-500 shadow-xl ring-2 ring-amber-600/40 -translate-y-1'
                      : 'liquid-glass border-steel-200 hover:border-amber-400 hover:bg-amber-50/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10'
                  }`}
                >
                  <div className="p-3 rounded-xl bg-amber-50 text-growth-800 border border-amber-200 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:bg-amber-100">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-steel-900 group-hover:text-growth-800 transition-colors">
                      Investor / Strategic Partner
                    </h4>
                    <p className="text-xs text-steel-600 mt-1 leading-relaxed font-normal">
                      Financial growth deck, capacity roadmap & CFO executive call.
                    </p>
                  </div>
                </button>

              </div>
            </div>
          )}

          {/* STEP 2: SPECIFICS */}
          {step === 2 && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-steel-200 pb-4">
                <span className="text-xs sm:text-sm font-black text-growth-700 uppercase tracking-widest font-mono">
                  Segment Role: {segment}
                </span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="glass-pill px-3 py-1 text-xs sm:text-sm text-steel-700 hover:text-steel-900 flex items-center gap-1 min-h-[44px]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Change Role
                </button>
              </div>

              {/* Product Interest Selector */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-steel-700 uppercase tracking-wider mb-2">
                  Product Line Interest *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, specInterest: 'structural_steel' }))}
                    aria-pressed={formData.specInterest === 'structural_steel'}
                    className={`p-3.5 sm:p-3 rounded-2xl text-xs sm:text-sm transition-all border min-h-[48px] ${
                      formData.specInterest === 'structural_steel'
                        ? 'bg-white text-black font-black border-steel-300 shadow-md'
                        : 'btn-secondary text-steel-700 hover:text-black font-bold'
                    }`}
                  >
                    Structural Steel
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, specInterest: 'tmt_bar' }))}
                    aria-pressed={formData.specInterest === 'tmt_bar'}
                    className={`p-3.5 sm:p-3 rounded-2xl text-xs sm:text-sm transition-all border min-h-[48px] ${
                      formData.specInterest === 'tmt_bar'
                        ? 'bg-white text-black font-black border-steel-300 shadow-md'
                        : 'btn-secondary text-steel-700 hover:text-black font-bold'
                    }`}
                  >
                    TMT Fe-500D Bars
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, specInterest: 'both' }))}
                    aria-pressed={formData.specInterest === 'both'}
                    className={`p-3.5 sm:p-3 rounded-2xl text-xs sm:text-sm transition-all border min-h-[48px] ${
                      formData.specInterest === 'both'
                        ? 'bg-white text-black font-black border-steel-300 shadow-md'
                        : 'btn-secondary text-steel-700 hover:text-black font-bold'
                    }`}
                  >
                    Both Product Lines
                  </button>
                </div>
              </div>

              {/* Segment Inputs */}
              {segment === 'distributor' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="currentSuppliers" className="block text-xs sm:text-sm font-bold text-steel-700 uppercase tracking-wider mb-1.5">
                      Current Primary Steel Suppliers
                    </label>
                    <input
                      id="currentSuppliers"
                      type="text"
                      name="currentSuppliers"
                      aria-describedby={fieldErrors.currentSuppliers ? 'error-currentSuppliers' : undefined}
                      value={formData.currentSuppliers || ''}
                      onChange={handleInputChange}
                      placeholder="e.g., Regional mills, Kamdhenu, Tata"
                      className="w-full px-4 py-4 sm:py-3 glass-input rounded-2xl text-sm min-h-[48px] focus:outline-none"
                    />
                    {fieldErrors.currentSuppliers && (
                      <p id="error-currentSuppliers" role="alert" className="text-xs font-semibold mt-1" style={{ color: 'var(--color-alert-700)' }}>
                        {fieldErrors.currentSuppliers}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="annualVolumeMT" className="block text-xs font-bold text-steel-700 uppercase tracking-wider mb-1.5">
                      Estimated Annual Volume (MT)
                    </label>
                    <input
                      id="annualVolumeMT"
                      type="text"
                      name="annualVolumeMT"
                      aria-describedby={fieldErrors.annualVolumeMT ? 'error-annualVolumeMT' : undefined}
                      value={formData.annualVolumeMT || ''}
                      onChange={handleInputChange}
                      placeholder="e.g., 500 – 2,000 MT / year"
                      className="w-full px-4 py-4 sm:py-3 glass-input rounded-2xl text-sm min-h-[48px] focus:outline-none"
                    />
                    {fieldErrors.annualVolumeMT && (
                      <p id="error-annualVolumeMT" role="alert" className="text-xs font-semibold mt-1" style={{ color: 'var(--color-alert-700)' }}>
                        {fieldErrors.annualVolumeMT}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {(segment === 'contractor' || segment === 'project') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="projectScope" className="block text-xs font-bold text-steel-700 uppercase tracking-wider mb-1.5">
                      Project Location / Name
                    </label>
                    <input
                      id="projectScope"
                      type="text"
                      name="projectScope"
                      aria-describedby={fieldErrors.projectScope ? 'error-projectScope' : undefined}
                      value={formData.projectScope || ''}
                      onChange={handleInputChange}
                      placeholder="e.g., City, region, or project area"
                      className="w-full px-4 py-4 sm:py-3 glass-input rounded-2xl text-sm min-h-[48px] focus:outline-none"
                    />
                    {fieldErrors.projectScope && (
                      <p id="error-projectScope" role="alert" className="text-xs font-semibold mt-1" style={{ color: 'var(--color-alert-700)' }}>
                        {fieldErrors.projectScope}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="requiredVolumeMT" className="block text-xs font-bold text-steel-700 uppercase tracking-wider mb-1.5">
                      Required Order Volume (MT)
                    </label>
                    <input
                      id="requiredVolumeMT"
                      type="text"
                      name="requiredVolumeMT"
                      aria-describedby={fieldErrors.requiredVolumeMT ? 'error-requiredVolumeMT' : undefined}
                      value={formData.requiredVolumeMT || ''}
                      onChange={handleInputChange}
                      placeholder="e.g., 100 MT initial batch"
                      className="w-full px-4 py-4 sm:py-3 glass-input rounded-2xl text-sm min-h-[48px] focus:outline-none"
                    />
                    {fieldErrors.requiredVolumeMT && (
                      <p id="error-requiredVolumeMT" role="alert" className="text-xs font-semibold mt-1" style={{ color: 'var(--color-alert-700)' }}>
                        {fieldErrors.requiredVolumeMT}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {segment === 'investor' && (
                <div>
                  <label htmlFor="investmentScale" className="block text-xs font-bold text-steel-700 uppercase tracking-wider mb-1.5">
                    Investment / Engagement Scope
                  </label>
                  <input
                    id="investmentScale"
                    type="text"
                    name="investmentScale"
                    aria-describedby={fieldErrors.investmentScale ? 'error-investmentScale' : undefined}
                    value={formData.investmentScale || ''}
                    onChange={handleInputChange}
                    placeholder="e.g., PE Institutional Growth Fund / Strategic Co-Investment"
                    className="w-full px-4 py-4 sm:py-3 glass-input rounded-2xl text-sm min-h-[48px] focus:outline-none"
                  />
                  {fieldErrors.investmentScale && (
                    <p id="error-investmentScale" role="alert" className="text-xs font-semibold mt-1" style={{ color: 'var(--color-alert-700)' }}>
                      {fieldErrors.investmentScale}
                    </p>
                  )}
                </div>
              )}

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-secondary px-5 py-2.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold min-h-[48px]"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="btn-primary px-6 py-2.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 min-h-[48px]"
                >
                  <span>Next: Contact Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: CONTACT & SUBMIT */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="flex items-center justify-between border-b border-steel-200 pb-4">
                <span className="text-xs sm:text-sm font-black text-growth-700 uppercase tracking-widest font-mono">
                  Contact Information
                </span>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="glass-pill px-3 py-1 text-xs sm:text-sm text-steel-700 hover:text-steel-900 flex items-center gap-1 min-h-[44px]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Specs
                </button>
              </div>

              {errorMessage && (
                <div role="alert" aria-live="assertive" className="p-3.5 rounded-2xl badge-alert text-xs font-semibold">
                  ⚠️ {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="companyName" className="block text-xs font-bold text-steel-700 uppercase tracking-wider mb-1.5">
                    Company Name *
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    name="companyName"
                    required
                    aria-describedby={fieldErrors.companyName ? 'error-companyName' : undefined}
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Company or Business Name"
                    className="w-full px-4 py-4 sm:py-3 glass-input rounded-2xl text-sm min-h-[48px] focus:outline-none"
                  />
                  {fieldErrors.companyName && (
                    <p id="error-companyName" role="alert" className="text-xs font-semibold mt-1" style={{ color: 'var(--color-alert-700)' }}>
                      {fieldErrors.companyName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contactName" className="block text-xs font-bold text-steel-700 uppercase tracking-wider mb-1.5">
                    Contact Person Name *
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    name="contactName"
                    required
                    aria-describedby={fieldErrors.contactName ? 'error-contactName' : undefined}
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full px-4 py-4 sm:py-3 glass-input rounded-2xl text-sm min-h-[48px] focus:outline-none"
                  />
                  {fieldErrors.contactName && (
                    <p id="error-contactName" role="alert" className="text-xs font-semibold mt-1" style={{ color: 'var(--color-alert-700)' }}>
                      {fieldErrors.contactName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-steel-700 uppercase tracking-wider mb-1.5">
                    Business Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    aria-describedby={fieldErrors.email ? 'error-email' : undefined}
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@company.com"
                    className="w-full px-4 py-4 sm:py-3 glass-input rounded-2xl text-sm min-h-[48px] focus:outline-none"
                  />
                  {fieldErrors.email && (
                    <p id="error-email" role="alert" className="text-xs font-semibold mt-1" style={{ color: 'var(--color-alert-700)' }}>
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-steel-700 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    required
                    aria-describedby={fieldErrors.phone ? 'error-phone' : undefined}
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-4 sm:py-3 glass-input rounded-2xl text-sm min-h-[48px] focus:outline-none"
                  />
                  {fieldErrors.phone && (
                    <p id="error-phone" role="alert" className="text-xs font-semibold mt-1" style={{ color: 'var(--color-alert-700)' }}>
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-steel-700 uppercase tracking-wider mb-1.5">
                  Inquiry Details / Volume & Delivery Requirements *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  aria-describedby={fieldErrors.message ? 'error-message' : undefined}
                  rows={3}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your steel requirements, delivery schedule, or partnership interest..."
                  className="w-full px-4 py-3 glass-textarea rounded-2xl text-sm focus:outline-none min-h-[48px]"
                />
                {fieldErrors.message && (
                  <p id="error-message" role="alert" className="text-xs font-semibold mt-1" style={{ color: 'var(--color-alert-700)' }}>
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              {/* Invisible Honeypot Field for Bot Spam Trap */}
              <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                <label htmlFor="website_hp">Do not fill this field</label>
                <input
                  type="text"
                  id="website_hp"
                  name="website_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-steel-600 pt-1">
                <ShieldCheck className="w-4 h-4 text-trust-700 shrink-0" />
                <span>Encrypted submission. Response from our assigned regional lead within 24h.</span>
              </div>

              <div className="flex justify-between pt-4 border-t border-steel-200">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-secondary px-5 py-2.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold min-h-[48px]"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary px-8 py-3 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all disabled:opacity-50 min-h-[48px]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Routing Lead...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

          {/* STEP 4: SUBMISSION CONFIRMATION */}
          {step === 4 && submissionResult && (
            <div className="text-center space-y-6 py-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-trust-50 border border-trust-300 text-trust-700 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-extrabold text-trust-700 uppercase tracking-widest block font-mono">
                  Inquiry Successfully Received & Tagged
                </span>
                <h3 className="text-3xl font-black text-steel-900 mt-1">
                  Thank You, {formData.contactName}!
                </h3>
                <p className="text-xs text-steel-600 mt-1">
                  Reference ID: <strong className="text-steel-900 font-mono">{submissionResult.inquiryId}</strong>
                </p>
              </div>

              <div className="p-6 rounded-2xl max-w-md mx-auto text-left text-xs space-y-2 bg-steel-50 border border-steel-200">
                <div className="flex justify-between py-1 border-b border-steel-200">
                  <span className="text-steel-600">Assigned Team:</span>
                  <span className="font-bold text-growth-700">{submissionResult.assignedRole}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-steel-200">
                  <span className="text-steel-600">CRM Tag:</span>
                  <span className="font-mono text-trust-700">{submissionResult.crmTag}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-steel-600">Target SLA:</span>
                  <span className="font-bold text-steel-900">Within 24 Hours</span>
                </div>
              </div>

              <p className="text-xs text-steel-600 max-w-md mx-auto leading-relaxed">
                A formal email confirmation with technical datasheets and supply SLA documents has been dispatched to <strong className="text-steel-900">{formData.email}</strong>.
              </p>

              <div className="pt-4 flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setSubmissionResult(null);
                  }}
                  className="btn-secondary px-6 py-2.5 rounded-full text-xs font-bold"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
