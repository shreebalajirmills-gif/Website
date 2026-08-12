'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { BuyerSegment } from '@/types';

interface HeaderProps {
  onSelectSegment?: (segment: BuyerSegment) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectSegment }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const container = mobileNavRef.current;
    // focus first focusable element inside mobile nav
    const focusable = container?.querySelectorAll<HTMLElement>('a, button, [tabindex]:not([tabindex="-1"])');
    const first = focusable && focusable.length > 0 ? focusable[0] : null;
    first?.focus();

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        toggleRef.current?.focus();
      }

      if (e.key === 'Tab' && focusable && focusable.length > 0) {
        const focusArray = Array.from(focusable) as HTMLElement[];
        const activeIndex = focusArray.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey) {
          if (activeIndex === 0) {
            e.preventDefault();
            focusArray[focusArray.length - 1].focus();
          }
        } else {
          if (activeIndex === focusArray.length - 1) {
            e.preventDefault();
            focusArray[0].focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Overview', href: '/' },
    { name: 'Products Catalog', href: '/products' },
    { name: 'Logistics Calculator', href: '/calculator' },
    { name: 'Growth Roadmap', href: '/growth' },
    { name: 'Institutional Trust', href: '/trust' },
    { name: 'Contact & Sales', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 py-4 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Floating Architectural Dock */}
        <div className="w-full liquid-glass rounded-full px-5 py-3 flex items-center justify-between border border-slate-200/90 shadow-xl">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <img 
              src="/logo.png" 
              alt="Shree Balaji Rolling Mills Private Limited Logo" 
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-steel-100/90 p-1 rounded-full border border-steel-200/90">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-4 py-1.5 rounded-full text-xs transition-all duration-200 transform font-bold inline-flex items-center justify-center ${
                    isActive
                      ? 'bg-slate-200 text-black font-black shadow-md border border-slate-300/80 hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-lg hover:shadow-red-600/30 hover:scale-105'
                      : 'text-slate-800 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-600/30 hover:scale-105'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/inquiry"
              className="btn-primary !py-2 !px-4 rounded-full text-xs !font-extrabold flex items-center gap-1.5 shadow-md"
            >
              <span>Inquire Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              ref={toggleRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-steel-700 hover:bg-steel-100"
              aria-label="Toggle Navigation"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

      </div>

      {/* Mobile Glass Menu Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" ref={mobileNavRef} role="navigation" aria-label="Primary mobile navigation" className="md:hidden pointer-events-auto mt-2 max-w-7xl mx-auto px-4">
          <div className="liquid-glass rounded-3xl p-6 space-y-4 border border-slate-200 shadow-2xl animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 ${
                    pathname === link.href
                      ? 'bg-slate-200 text-black font-black border border-slate-300 shadow-md'
                      : 'text-steel-800 hover:bg-red-600 hover:text-white hover:font-black'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
