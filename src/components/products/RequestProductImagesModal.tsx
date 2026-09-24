'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Camera,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Loader2,
  Download,
  Eye,
  X,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { PRODUCT_FRAMES, FrameImage } from '@/data/productFrames';

interface RequestProductImagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
  defaultProductTitle?: string;
}

type Step = 'form' | 'loading' | 'gallery';

export const RequestProductImagesModal: React.FC<RequestProductImagesModalProps> = ({
  isOpen,
  onClose,
  defaultCategory = 'all',
  defaultProductTitle,
}) => {
  const [step, setStep] = useState<Step>('form');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedFrame, setSelectedFrame] = useState<FrameImage | null>(null);

  // Sync category if defaultCategory prop changes
  useEffect(() => {
    if (defaultCategory) setSelectedCategory(defaultCategory);
  }, [defaultCategory]);

  // Handle ESC key to close modal or lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedFrame) {
          setSelectedFrame(null);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, selectedFrame, onClose]);

  // Reset state when closed
  const handleClose = () => {
    setSelectedFrame(null);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    setErrorMsg('');
    setStep('loading');

    // 1.88 seconds loading screen requirement
    setTimeout(() => {
      setStep('gallery');
    }, 1880);
  };

  if (!isOpen) return null;

  const filteredFrames = selectedCategory === 'all'
    ? PRODUCT_FRAMES
    : PRODUCT_FRAMES.filter((f) => f.category === selectedCategory || f.category === 'rolling_mill');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-steel-950/80 backdrop-blur-md transition-all duration-300">
      <div
        className="card-base w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 border border-steel-200 dark:border-slate-800 shadow-modal overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-modal-title"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-steel-200 dark:border-slate-800 bg-steel-50/80 dark:bg-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold block">
                Direct Rolling Mill Access
              </span>
              <h3 id="request-modal-title" className="text-lg font-black text-steel-900 dark:text-white leading-tight">
                {step === 'gallery'
                  ? 'Original Product & Rolling Mill Frames'
                  : defaultProductTitle
                  ? `Request Photos: ${defaultProductTitle}`
                  : 'Request Original Product Frames & Mill Photos'}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-lg text-steel-400 hover:text-steel-700 dark:hover:text-steel-200 hover:bg-steel-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* STEP 1: VERIFICATION / PHONE SUBMISSION */}
          {step === 'form' && (
            <div className="max-w-xl mx-auto py-4 space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold font-mono uppercase border border-amber-500/20">
                  <span>Direct Mill Floor High-Res Visuals</span>
                </div>
                <h4 className="text-2xl font-black text-steel-900 dark:text-white">
                  Unlock Uncompressed Video Frames
                </h4>
                <p className="text-sm text-steel-600 dark:text-steel-400 max-w-md mx-auto">
                  Provide your phone number to immediately access original high-resolution mill capture frames of our MS Flats, Round Bars, Square Bars and manufacturing rolling stands.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="form-group">
                  <label htmlFor="req-phone" className="form-label flex items-center justify-between">
                    <span>Mobile / WhatsApp Number <span className="text-red-500">*</span></span>
                    <span className="text-xs text-steel-500 font-normal">SMS/Instant Verification</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-steel-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="absolute inset-y-0 left-9 flex items-center text-sm font-bold font-mono text-steel-500 border-r border-steel-200 dark:border-slate-700 pr-2">
                      +91
                    </span>
                    <input
                      id="req-phone"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="98765 43210"
                      required
                      autoFocus
                      className="form-input w-full pl-24 text-base font-mono tracking-wide"
                      pattern="[0-9]{10}"
                      maxLength={14}
                    />
                  </div>
                  {errorMsg && (
                    <p className="text-xs font-bold text-red-600 dark:text-red-400 mt-1">{errorMsg}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label htmlFor="req-name" className="form-label">
                      Your Name <span className="text-steel-400 text-xs">(Optional)</span>
                    </label>
                    <input
                      id="req-name"
                      type="text"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="e.g. Rajesh Sharma"
                      className="form-input text-sm"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="req-company" className="form-label">
                      Company / Project <span className="text-steel-400 text-xs">(Optional)</span>
                    </label>
                    <input
                      id="req-company"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Apex Infra Ltd"
                      className="form-input text-sm"
                    />
                  </div>
                </div>

                <div className="p-3 bg-steel-50 dark:bg-slate-800/70 border border-steel-200 dark:border-slate-700/80 rounded-lg text-xs space-y-1.5 text-steel-600 dark:text-steel-400">
                  <div className="flex items-center gap-2 text-steel-800 dark:text-steel-200 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>BIS Certified Quality Proof</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    By submitting your number, you get instant uncompressed access to original video frame captures from our Bhiwadi plant showing live roll stands, bundle dispatch, and section edges.
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3.5 px-6 font-bold text-sm flex items-center justify-center gap-2 group cursor-pointer shadow-lg"
                >
                  <Lock className="w-4 h-4 text-white/90" />
                  <span>Verify & Unlock Original Product Frames</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: PRECISE 1.88 SECONDS LOADING SCREEN */}
          {step === 'loading' && (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-b-emerald-500 animate-spin" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-amber-600 dark:text-amber-400 animate-pulse" />
                </div>
              </div>

              <div className="space-y-2 max-w-sm">
                <div className="badge-base px-3 py-1 font-mono text-xs bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                  Decrypting Mill Video Stream
                </div>
                <h4 className="text-xl font-black text-steel-900 dark:text-white">
                  Extracting Master Frames...
                </h4>
                <p className="text-xs text-steel-600 dark:text-steel-400 font-mono">
                  Loading high-resolution frames from Shree Balaji Rolling Mills Bhiwadi facility
                </p>
              </div>

              {/* Visual Progress Indicator */}
              <div className="w-64 h-2 bg-steel-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all ease-linear"
                  style={{
                    width: '100%',
                    transitionDuration: '1880ms',
                  }}
                />
              </div>
            </div>
          )}

          {/* STEP 3: ORIGINAL FRAMES GALLERY */}
          {step === 'gallery' && (
            <div className="space-y-6">
              {/* Category Filter and Stats Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-steel-200 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-mono">
                      Access Granted to {phoneNumber}
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-steel-900 dark:text-white mt-0.5">
                    Original High-Definition Product Frames
                  </h4>
                </div>

                {/* Filter tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-steel-100 dark:bg-slate-800 rounded-lg text-xs font-semibold overflow-x-auto max-w-full">
                  {[
                    { id: 'all', label: 'All Frames' },
                    { id: 'ms_flats', label: 'MS Flats (Patti)' },
                    { id: 'ms_rounds', label: 'Round Bars (Gol)' },
                    { id: 'ms_squares', label: 'Square Bars (Chakor)' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-amber-600 text-white font-bold shadow-sm'
                          : 'text-steel-600 dark:text-steel-400 hover:text-steel-900 dark:hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of Original Frames */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredFrames.map((frame) => (
                  <div
                    key={frame.id}
                    className="card-base group border border-steel-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-amber-500/60 dark:hover:border-amber-500/60 transition-all flex flex-col cursor-pointer overflow-hidden shadow-sm hover:shadow-md"
                    onClick={() => setSelectedFrame(frame)}
                  >
                    <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                      <Image
                        src={frame.src}
                        alt={frame.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[10px] font-mono font-bold text-amber-400 border border-white/10">
                        {frame.tag}
                      </div>
                      <div className="absolute inset-0 bg-steel-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <span className="p-2 rounded-full bg-white/90 text-steel-900 shadow">
                          <Maximize2 className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 flex flex-col justify-between flex-1 space-y-2">
                      <div>
                        <h5 className="font-bold text-sm text-steel-900 dark:text-white line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {frame.title}
                        </h5>
                        <p className="text-xs text-steel-500 dark:text-steel-400 line-clamp-2 mt-0.5">
                          {frame.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-steel-100 dark:border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-mono text-steel-400">
                          Original Frame
                        </span>
                        <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 group-hover:underline">
                          <Eye className="w-3.5 h-3.5" /> Expand
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lightbox / Frame Detail View */}
              {selectedFrame && (
                <div
                  className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6"
                  onClick={() => setSelectedFrame(null)}
                >
                  <div
                    className="relative max-w-5xl w-full bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950 text-white">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                          Original Video Frame Extraction
                        </span>
                        <h4 className="text-base font-bold">{selectedFrame.title}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={selectedFrame.src}
                          download={`${selectedFrame.id}.png`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-secondary py-1.5 px-3 text-xs flex items-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5" /> Save Frame
                        </a>
                        <button
                          type="button"
                          onClick={() => setSelectedFrame(null)}
                          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="relative aspect-[16/9] w-full bg-black">
                      <Image
                        src={selectedFrame.src}
                        alt={selectedFrame.title}
                        fill
                        className="object-contain"
                        unoptimized
                        priority
                      />
                    </div>

                    <div className="p-4 bg-slate-950 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-800">
                      <p className="font-mono text-slate-400">{selectedFrame.description}</p>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="px-2 py-1 rounded bg-slate-800 font-mono text-[11px] text-amber-400 font-bold">
                          {selectedFrame.tag}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          Facility: Bhiwadi, Haryana
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-steel-200 dark:border-slate-800 bg-steel-50/50 dark:bg-slate-900/50 flex items-center justify-between text-xs text-steel-500 dark:text-steel-400">
          <div className="flex items-center gap-2 font-mono">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>BIS Certified • IS 2062 Grade E250</span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-xs font-bold text-steel-700 dark:text-steel-300 hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
