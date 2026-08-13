'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ChevronDown, Flame, Layers, ShieldCheck, TrendingUp, Activity, FileText } from 'lucide-react';
import { BuyerSegment } from '@/types';
import { SocialIcon, SocialLinks } from '@/components/social/SocialLinks';
import { SITE_CONFIG, getWhatsAppUrl } from '@/config/site';

interface HeaderProps {
  onSelectSegment?: (segment: BuyerSegment) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectSegment }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.location.assign('/');
  };

  const handleMouseEnter = (menuName: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActiveMegaMenu(menuName);
  };

  const handleMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const container = mobileNavRef.current;
    const focusable = container?.querySelectorAll<HTMLElement>('a, button, [tabindex]:not([tabindex="-1"])');
    const first = focusable && focusable.length > 0 ? focusable[0] : null;
    first?.focus();

    // Lock body scroll when mobile menu is open
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.width = '100%';

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setActiveMegaMenu(null);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      // Restore body scroll
      const scrollY = document.body.style.top;
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    };
  }, [mobileMenuOpen]);

  const megaMenus = {
    about: {
      title: 'About Us',
      href: '/about',
      tagline: 'Premier Steel Manufacturing Platform in Bhiwadi, Haryana',
      badge: '180,000 TPA Capacity',
      icon: Flame,
      bgImage: '/assets/about-menu-bg.jpg',
      col1: [
        { label: 'Know Our Journey', href: '/about#journey', desc: 'Bhiwadi plant timeline & operational expansion' },
        { label: 'Our Clients', href: '/about#clients', desc: 'Leading infrastructure & trade partners' },
      ],
      col2: [
        { label: 'Why Choose Us', href: '/about#why-us', desc: 'Direct mill pricing & BIS certified quality' },
        { label: 'EBrochure and Profile', href: '/about#ebrochure', desc: 'Download official datasheets & corporate brochure' },
        { label: 'Environment', href: '/about#environment', desc: 'Green steel scrap recycling & zero effluent mill' },
      ]
    },
    products: {
      title: 'Our Products',
      href: '/products',
      tagline: 'BIS Certified IS 2062 Structural Profiles & IS 1786 Fe-500D TMT Bars',
      badge: 'BIS IS 2062 & IS 1786',
      icon: Layers,
      bgImage: '/assets/products-menu-bg.jpg',
      col1: [
        { label: 'IS 2062 Structural Steel', href: '/products/structural-steel', desc: 'Equal angles, channels, joists & beams' },
        { label: 'MS Angles & Channels', href: '/products/structural-steel#angles', desc: 'Heavy structural framing profiles' },
        { label: 'MS Joists & Beams', href: '/products/structural-steel#joists', desc: 'High load-bearing civic columns' },
      ],
      col2: [
        { label: 'IS 1786 Fe-500D TMT Bars', href: '/products/tmt-rebars', desc: 'Thermex quenched high-ductility seismic rebars' },
        { label: 'Weight & Bundle Calculator', href: '/calculator', desc: 'Interactive tonnage & bundle estimation tool' },
        { label: 'Technical Specs Matrix', href: '/products#specs', desc: 'Chemical & mechanical tolerance tables' },
      ]
    },
    processes: {
      title: 'Manufacturing Processes',
      href: '/manufacturing-processes',
      tagline: 'Thermex Quenching, Induction Heating & Continuous Pass Rolling',
      badge: 'Integrated IQMS System',
      icon: Activity,
      bgImage: '/assets/products-menu-bg.jpg',
      col1: [
        { label: 'The Process', href: '/manufacturing-processes#process', desc: '5-Stage Thermo-Mechanical rolling pipeline' },
        { label: 'Commitment', href: '/manufacturing-processes#commitment', desc: 'Zero-defect mill engineering standards' },
        { label: 'How to test SBF TMT Rapid bar', href: '/manufacturing-processes#testing-guide', desc: 'Site contractor guide: bend, weight & rib check' },
      ],
      col2: [
        { label: 'IQMS System', href: '/manufacturing-processes#iqms', desc: 'Integrated Quality Management System' },
        { label: 'Quality checks', href: '/manufacturing-processes#quality-checks', desc: 'Spectrometer chemical & UTM physical lab tests' },
      ]
    },
    media: {
      title: 'Media & Growth',
      href: '/growth',
      tagline: 'Path to ₹1,000 Crore Revenue Platform',
      badge: 'FY26–FY30 Roadmap',
      icon: TrendingUp,
      bgImage: '/assets/about-menu-bg.jpg',
      col1: [
        { label: 'FY26–FY30 Growth Plan', href: '/growth#roadmap', desc: 'Scaling turnover toward ₹1,006 Cr by FY30' },
        { label: 'Annual Revenue Base', href: '/growth#reports', desc: 'FY25 ₹242.33 Cr financial telemetry' },
      ],
      col2: [
        { label: 'Press & Milestones', href: '/growth#milestones', desc: 'Key plant achievements & press releases' },
        { label: 'Bhiwadi Facility', href: '/growth#facility', desc: 'Industrial infrastructure & rolling stands' },
      ]
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 py-3 sm:py-4 px-3 sm:px-4 lg:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto relative">
        
        {/* Floating Architectural Navigation Dock */}
        <div className="w-full liquid-glass rounded-full px-3 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between border border-slate-200/90 shadow-xl relative z-50">
          
          {/* Logo & Brand */}
          <Link href="/" onClick={handleLogoClick} className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <img 
              src="/logo.png" 
              alt="Shree Balaji Rolling Mills Private Limited Logo" 
              width={180}
              height={48}
              loading="eager"
              className="h-8 sm:h-10 lg:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Navigation Links with Mega Menu Dropdowns - Hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-0.5 sm:gap-1 bg-steel-100/90 p-1 rounded-full border border-steel-200/90">
            
            {/* Overview / Home */}
            <Link
              href="/"
              className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-200 min-h-[44px] flex items-center ${
                pathname === '/' ? 'bg-slate-200 text-black font-black border border-slate-300' : 'text-slate-800 hover:bg-red-600 hover:text-white'
              }`}
            >
              Home
            </Link>

            {/* About Us (Mega Dropdown Trigger) */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/about"
                className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold inline-flex items-center gap-1 transition-all duration-200 min-h-[44px] ${
                  pathname.startsWith('/about') || activeMegaMenu === 'about'
                    ? 'bg-slate-200 text-black font-black border border-slate-300'
                    : 'text-slate-800 hover:bg-red-600 hover:text-white'
                }`}
              >
                <span>About Us</span>
                <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-70" />
              </Link>
            </div>

            {/* Our Products (Mega Dropdown Trigger) */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/products"
                className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold inline-flex items-center gap-1 transition-all duration-200 min-h-[44px] ${
                  pathname.startsWith('/products') || activeMegaMenu === 'products'
                    ? 'bg-slate-200 text-black font-black border border-slate-300'
                    : 'text-slate-800 hover:bg-red-600 hover:text-white'
                }`}
              >
                <span>Our Products</span>
                <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-70" />
              </Link>
            </div>

            {/* Manufacturing Processes (Mega Dropdown Trigger) */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('processes')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/manufacturing-processes"
                className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold inline-flex items-center gap-1 transition-all duration-200 min-h-[44px] ${
                  pathname.startsWith('/manufacturing-processes') || activeMegaMenu === 'processes'
                    ? 'bg-slate-200 text-black font-black border border-slate-300'
                    : 'text-slate-800 hover:bg-red-600 hover:text-white'
                }`}
              >
                <span>Manufacturing Processes</span>
                <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-70" />
              </Link>
            </div>

            {/* Media & Growth (Mega Dropdown Trigger) */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('media')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/growth"
                className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold inline-flex items-center gap-1 transition-all duration-200 min-h-[44px] ${
                  pathname.startsWith('/growth') || activeMegaMenu === 'media'
                    ? 'bg-slate-200 text-black font-black border border-slate-300'
                    : 'text-slate-800 hover:bg-red-600 hover:text-white'
                }`}
              >
                <span>Media</span>
                <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-70" />
              </Link>
            </div>

            {/* Our Certificates */}
            <Link
              href="/trust"
              className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-200 min-h-[44px] flex items-center ${
                pathname === '/trust' ? 'bg-slate-200 text-black font-black border border-slate-300' : 'text-slate-800 hover:bg-red-600 hover:text-white'
              }`}
            >
              Our Certificates
            </Link>
          </nav>

          {/* CTA Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp Quote Chat with Mill Sales Desk"
              className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-[10px] sm:text-xs px-3 py-1.5 sm:py-2 rounded-full shadow-md transition-all border border-emerald-400/40 shrink-0"
            >
              <SocialIcon platform="whatsapp" className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Quote</span>
            </a>

            <Link
              href="/inquiry"
              className="btn-primary !py-1.5 sm:!py-2 !px-3 sm:!px-4 rounded-full text-[10px] sm:text-xs !font-extrabold flex items-center gap-1 sm:gap-1.5 shadow-md"
            >
              <span className="hidden sm:inline">Inquire Now</span>
              <span className="sm:hidden">Inquire</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>

            <button
              ref={toggleRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-4 rounded-full text-steel-700 hover:bg-steel-100 min-h-[44px] min-w-[44px]"
              aria-label="Toggle Navigation"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Desktop Mega Menu Overlay Panels */}
        {activeMegaMenu && (
          <div 
            className="hidden lg:block absolute top-full left-0 right-0 pt-2 sm:pt-3 z-40"
            onMouseEnter={() => handleMouseEnter(activeMegaMenu)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="liquid-glass-prominent rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-2xl bg-white/95 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200 max-w-4xl sm:max-w-5xl mx-auto">
              {(() => {
                const menu = megaMenus[activeMegaMenu as keyof typeof megaMenus];
                if (!menu) return null;
                const Icon = menu.icon;

                return (
                  <div className="grid grid-cols-12 gap-4 sm:gap-6 items-stretch">
                    
                    {/* Left Feature Card with Hot Steel Image Aesthetic */}
                    <div className="col-span-12 lg:col-span-5 bg-slate-950 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col justify-between border border-slate-700 relative overflow-hidden group shadow-lg">
                      <div className="ambient-liquid-glow ambient-glow-growth top-0 right-0 scale-75 opacity-40" />
                      
                      {/* Industrial Steel Plant Background Image */}
                      <img
                        src={menu.bgImage || '/assets/about-menu-bg.jpg'}
                        alt={`${menu.title} - Shree Balaji Industrial Facility`}
                        className="absolute inset-0 w-full h-full object-cover object-right opacity-50 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                      />
                      {/* Gradient Overlay for Legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/40 pointer-events-none" />

                      <div className="relative z-10 space-y-2 sm:space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="glass-pill px-2 sm:px-3 py-1 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 border border-amber-400/30">
                            {menu.badge}
                          </span>
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                        </div>
                        <h4 className="text-lg sm:text-xl font-black text-white tracking-tight">
                          {menu.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-200 leading-relaxed font-normal">
                          {menu.tagline}
                        </p>
                      </div>

                      <div className="relative z-10 pt-4 sm:pt-6">
                        <Link
                          href={menu.href}
                          onClick={() => setActiveMegaMenu(null)}
                          className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold text-amber-400 group-hover:translate-x-1 transition-transform"
                        >
                          <span>Explore Main Page</span>
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </Link>
                      </div>
                    </div>

                    {/* Right Columns (2 Sub-navigation link columns) */}
                    <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-2">
                      
                      {/* Column 1 */}
                      <div className="space-y-3 sm:space-y-4">
                        {menu.col1.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            onClick={() => setActiveMegaMenu(null)}
                            className="block p-2.5 sm:p-3 rounded-xl hover:bg-steel-100/80 transition-colors group/link border border-transparent hover:border-steel-200"
                          >
                            <div className="text-[10px] sm:text-xs font-bold text-slate-950 group-hover/link:text-red-600 transition-colors flex items-center justify-between">
                              <span>{item.label}</span>
                              <ArrowRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity text-red-600" />
                            </div>
                            <p className="text-[10px] sm:text-[11px] text-steel-600 mt-1 line-clamp-2 leading-snug">
                              {item.desc}
                            </p>
                          </Link>
                        ))}
                      </div>

                      {/* Column 2 */}
                      <div className="space-y-3 sm:space-y-4 border-l border-steel-200/80 pl-4 sm:pl-6">
                        {menu.col2.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            onClick={() => setActiveMegaMenu(null)}
                            className="block p-2.5 sm:p-3 rounded-xl hover:bg-steel-100/80 transition-colors group/link border border-transparent hover:border-steel-200"
                          >
                            <div className="text-[10px] sm:text-xs font-bold text-slate-950 group-hover/link:text-red-600 transition-colors flex items-center justify-between">
                              <span>{item.label}</span>
                              <ArrowRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity text-red-600" />
                            </div>
                            <p className="text-[10px] sm:text-[11px] text-steel-600 mt-1 line-clamp-2 leading-snug">
                              {item.desc}
                            </p>
                          </Link>
                        ))}
                      </div>

                    </div>

                  </div>
                );
              })()}
            </div>
          </div>
        )}

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" ref={mobileNavRef} role="navigation" aria-label="Primary mobile navigation" className="lg:hidden pointer-events-auto mt-2 max-w-7xl mx-auto px-3 sm:px-4">
          <div className="liquid-glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-4 sm:space-y-5 border border-slate-200 shadow-2xl animate-in slide-in-from-top duration-200 bg-white/95">
            <nav className="flex flex-col space-y-2 sm:space-y-3">

              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 sm:px-4 py-3 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-900 hover:bg-red-600 hover:text-white min-h-[48px] flex items-center"
              >
                Home
              </Link>

              {Object.values(megaMenus).map((menu, idx) => (
                <div key={idx} className="space-y-1 sm:space-y-1">
                  <Link
                    href={menu.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 sm:px-4 py-3 sm:py-2 rounded-xl text-xs sm:text-sm font-extrabold text-slate-950 flex items-center justify-between bg-steel-100/80 min-h-[48px]"
                  >
                    <span>{menu.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600" />
                  </Link>

                  <div className="pl-4 sm:pl-6 space-y-1 sm:space-y-1 py-1 sm:py-1">
                    {[...menu.col1, ...menu.col2].map((sub, sIdx) => (
                      <Link
                        key={sIdx}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-2.5 sm:px-3 py-2 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-steel-700 hover:text-red-600 min-h-[48px]"
                      >
                        • {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <Link
                href="/trust"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 sm:px-4 py-3 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-900 hover:bg-red-600 hover:text-white min-h-[48px] flex items-center"
              >
                Our Certificates
              </Link>

              {/* Mobile Direct Contact & Social Profiles */}
              <div className="pt-3 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                    className="flex-1 py-2 px-3 bg-steel-100 text-slate-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-200"
                  >
                    <SocialIcon platform="phone" className="w-3.5 h-3.5 text-amber-600" />
                    <span>{SITE_CONFIG.contact.phone}</span>
                  </a>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <SocialIcon platform="whatsapp" className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp Quote</span>
                  </a>
                </div>
                <div className="flex items-center justify-center pt-1">
                  <SocialLinks
                    className="flex items-center justify-center gap-3"
                    itemClassName="p-2 rounded-full text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors"
                  />
                </div>
              </div>

            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
