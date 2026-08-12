'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { BuyerSegment } from '@/types';

interface ContactSectionProps {
  onSelectSegment: (segment: BuyerSegment) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSelectSegment }) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const [inView, setInView] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const cards = Array.from(node.querySelectorAll<HTMLElement>('.contact-card'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute('data-idx') || -1);
          if (entry.isIntersecting) {
            setTimeout(() => {
              setInView((s) => ({ ...s, [idx]: true }));
            }, idx * 100);
          }
        });
      },
      { threshold: 0.12 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const openInquiry = (segment: BuyerSegment) => {
    onSelectSegment(segment);

    const portal = document.getElementById('inquiry-portal');
    if (portal) {
      portal.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    router.push(`/inquiry?segment=${segment}`);
  };

  return (
    <section id="contact" className="py-28 bg-steel-base border-b border-steel-200 relative overflow-hidden">
      <div className="ambient-liquid-glow ambient-glow-authority top-1/3 right-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="glass-pill px-4 py-1.5 inline-flex items-center gap-2 text-authority-700 text-xs font-bold uppercase tracking-wider">
            MVP Contact Placeholders
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-steel-900 tracking-tight">
            Get In Touch With <span className="text-gradient-authority">The Contact Desk</span>
          </h2>
          <p className="text-sm text-steel-600 max-w-xl mx-auto font-normal">
            These tiles are reserved for your real chat, callback, email, and form details. For now they point into the inquiry flow so the MVP stays honest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="contact-card liquid-glass liquid-glass-interactive liquid-glass-project p-6 rounded-3xl flex flex-col justify-between shadow-md" data-idx={0} data-type="chat">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-trust-50 text-trust-700 border border-trust-200 flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold text-trust-700 uppercase tracking-widest block font-mono">
                Chat Placeholder
              </span>
              <h3 className="text-xl font-bold text-steel-900">Live Chat</h3>
              <p className="text-xs text-steel-600 leading-relaxed font-normal">
                Reserve this tile for a live chat widget or messaging provider once you connect one.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openInquiry('distributor')}
              className="mt-6 btn-project py-3 px-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <span>Open inquiry form</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="contact-card liquid-glass liquid-glass-interactive liquid-glass-contractor p-6 rounded-3xl flex flex-col justify-between shadow-md" data-idx={1} data-type="whatsapp">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-growth-50 text-growth-700 border border-growth-200 flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold text-growth-700 uppercase tracking-widest block font-mono">
                Callback Placeholder
              </span>
              <h3 className="text-xl font-bold text-steel-900">Phone Desk</h3>
              <p className="text-xs text-steel-600 leading-relaxed font-normal">
                Reserve this tile for a real callback number or scheduler when your launch details are ready.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openInquiry('contractor')}
              className="mt-6 btn-primary py-3 px-4 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2"
            >
              <span>Request callback</span>
              <Phone className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="contact-card liquid-glass liquid-glass-interactive liquid-glass-distributor p-6 rounded-3xl flex flex-col justify-between shadow-md" data-idx={2} data-type="phone">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-authority-50 text-authority-700 border border-authority-200 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold text-authority-700 uppercase tracking-widest block font-mono">
                Email Placeholder
              </span>
              <h3 className="text-xl font-bold text-steel-900">Email Desk</h3>
              <p className="text-xs text-steel-600 leading-relaxed font-normal">
                Reserve this tile for a support inbox or shared mailbox once the final address is available.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openInquiry('project')}
              className="mt-6 btn-secondary py-3 px-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <span>Open email inquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="contact-card liquid-glass liquid-glass-interactive liquid-glass-investor p-6 rounded-3xl flex flex-col justify-between shadow-md" data-idx={3} data-type="email">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-growth-800 border border-amber-200 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold text-growth-800 uppercase tracking-widest block font-mono">
                Form Placeholder
              </span>
              <h3 className="text-xl font-bold text-steel-900">Inquiry Portal</h3>
              <p className="text-xs text-steel-600 leading-relaxed font-normal">
                Reserve this tile for the final multi-step inquiry form and routing rules.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openInquiry('investor')}
              className="mt-6 btn-secondary py-3 px-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 hover:text-growth-700"
            >
              <span>Open inquiry portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="liquid-glass-prominent rounded-3xl p-8 border border-steel-200 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-xl">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-steel-900 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-growth-600" />
              <span>Office & Service Area</span>
            </h3>
            <p className="text-xs text-steel-600 leading-relaxed font-normal">
              Use this space for your real office address, factory address, or service-area note once the MVP details are finalized.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-steel-50 border border-steel-200">
                <strong className="text-growth-700 block font-bold mb-1">Primary Location:</strong>
                Add your office or site address here.
              </div>
              <div className="p-4 rounded-2xl bg-steel-50 border border-steel-200">
                <strong className="text-steel-900 block font-bold mb-1">Secondary Desk:</strong>
                Add your regional desk or support location here.
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-steel-50 border border-steel-200 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-steel-900 border-b border-steel-200 pb-3">
              <Clock className="w-4 h-4 text-growth-600" />
              <span>Operating Hours</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-steel-700">
                <span>Monday - Saturday:</span>
                <span className="font-bold text-growth-700">To be confirmed</span>
              </div>
              <div className="flex justify-between text-steel-700">
                <span>Sunday:</span>
                <span className="text-steel-500">To be confirmed</span>
              </div>
              <div className="flex justify-between text-steel-700 pt-2 border-t border-steel-200">
                <span>Guaranteed Response:</span>
                <span className="font-bold text-trust-700">To be confirmed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
