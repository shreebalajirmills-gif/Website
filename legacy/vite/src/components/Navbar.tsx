import React, { useEffect, useRef, useState } from "react";

export type NavLink = { label: string; href: string };

interface NavbarProps {
  activeLink?: string;
  onCTAClick?: () => void;
  logo?: string; // URL to logo image
  navigationLinks?: NavLink[];
  isDark?: boolean;
}

const DEFAULT_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Scale & Growth", href: "#scale" },
  { label: "Certifications", href: "#certifications" },
  { label: "Investors", href: "#investors" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({
  activeLink = "Home",
  onCTAClick,
  logo,
  navigationLinks = DEFAULT_LINKS,
  isDark = false,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [internalActive, setInternalActive] = useState(activeLink);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function handleScroll() {
      const y = window.scrollY || window.pageYOffset;
      setScrolled(y > 10);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setInternalActive(activeLink), [activeLink]);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (!menuRef.current) return;
      if (mobileOpen && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [mobileOpen]);

  // focus management for mobile menu
  useEffect(() => {
    if (mobileOpen) {
      // focus first focusable element inside menu
      const el = menuRef.current?.querySelector<HTMLElement>("a,button,input,select,textarea,[tabindex]:not([tabindex='-1'])");
      el?.focus();
    } else {
      // return focus to toggle button
      toggleButtonRef.current?.focus();
    }
  }, [mobileOpen]);

  function handleLinkClick(href: string, label: string, e?: React.MouseEvent) {
    if (e) e.preventDefault();
    setInternalActive(label);
    setMobileOpen(false);
    // smooth scroll behavior for in-page anchors
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else window.location.hash = href;
    } else {
      // navigate normally
      window.location.href = href;
    }
  }

  return (
    <nav
      className={`sticky top-0 z-50 ${
        scrolled ? "shadow-[0_8px_20px_-4px_rgba(15,23,42,0.1)]" : "shadow-[0_4px_12px_-2px_rgba(15,23,42,0.06)]"
      }`}
      style={{
        transition: 'all 250ms ease',
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        background: scrolled
          ? "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,1) 100%)"
          : "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.95) 100%)",
        borderBottom: "1px solid #e2e8f0",
      }}
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4">
        <style>{`
          .nav-link{ transition: color 0.25s ease, border-bottom-color 0.25s ease; }
          .nav-link:hover{ color: #d97706; border-bottom-color: #d97706; }
        `}</style>
        <div className="flex items-center h-16 md:h-20">
          {/* Left: Logo */}
          <div className="flex items-center gap-3 mr-4">
            <a href="/" className="flex items-center gap-3" aria-label="Shree Balaji home">
              {logo ? (
                <img src={logo} alt="Shree Balaji Logo" style={{ height: 48 }} />
              ) : (
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <rect width="48" height="48" rx="8" fill="#F59E0B" />
                  <path d="M12 32L24 14L36 32H12Z" fill="white" />
                </svg>
              )}
              <span
                className="hidden sm:inline-block text-[1.25rem] font-bold text-[#0f172a]"
                style={{ fontFamily: "'Space Grotesk', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial", color: "#0f172a" }}
              >
                Shree Balaji
              </span>
            </a>
          </div>

          {/* Center: Navigation (desktop only) */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex items-center gap-6" role="menubar" aria-label="Primary">
              {navigationLinks.map((l) => {
                const isActive = internalActive === l.label;
                return (
                  <li key={l.label} role="none">
                    <a
                      href={l.href}
                      onClick={(e) => handleLinkClick(l.href, l.label, e)}
                      role="menuitem"
                      className={`nav-link transition-colors duration-200 text-[1rem] font-medium`}
                      style={{
                        color: isActive ? "#d97706" : "#475569",
                        borderBottom: isActive ? "2px solid #d97706" : "2px solid transparent",
                        paddingBottom: 6,
                        fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui",
                      }}
                    >
                      {l.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right-side: Search (desktop), CTA, Mobile Hamburger */}
          <div className="ml-auto flex items-center gap-3">
            {/* Search (optional, desktop only) */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <button
                  onClick={() => setSearchOpen((s) => !s)}
                  aria-label="Toggle search"
                  className="p-2 text-[#0f172a]"
                >
                  🔍
                </button>
                <input
                  className={`transition-all duration-300 ml-2 border rounded px-3 py-2 bg-white shadow-sm focus:outline-none ${
                    searchOpen ? "w-72 opacity-100" : "w-0 opacity-0 pointer-events-none"
                  }`}
                  placeholder="Search products, specs..."
                  style={{ width: searchOpen ? 300 : 0 }}
                />
              </div>
            </div>

            {/* CTA - Desktop */}
            <div className="hidden md:block">
              <button
                onClick={() => onCTAClick && onCTAClick()}
                className="bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-md h-10 w-[150px] shadow-sm transition-transform duration-150 hover:-translate-y-0.5"
                aria-label="Get Started"
              >
                Get Started
              </button>
            </div>

            {/* Mobile CTA / Hamburger */}
            <div className="md:hidden flex items-center">
              {/* Mobile CTA can be inside menu; show hamburger here */}
              <button
                ref={toggleButtonRef}
                onClick={() => setMobileOpen((s) => !s)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
                className="p-2 text-[#0f172a]"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6H21" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                  <path d="M3 12H21" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                  <path d="M3 18H21" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Menu */}
      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        ref={menuRef}
        className={`md:hidden fixed top-0 left-0 h-full w-[280px] bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backdropFilter: "none" }}
        aria-hidden={!mobileOpen}
      >
        <div className="p-4" style={{ height: 64 }}>
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
              {logo ? (
                <img src={logo} alt="Shree Balaji Logo" style={{ height: 40 }} />
              ) : (
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="48" height="48" rx="8" fill="#F59E0B" />
                  <path d="M12 32L24 14L36 32H12Z" fill="white" />
                </svg>
              )}
            </a>
            <div>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-2">
                ✕
              </button>
            </div>
          </div>
        </div>

        <div className="p-4">
          <ul className="flex flex-col gap-3">
            {navigationLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={(e) => handleLinkClick(l.href, l.label, e)}
                  className={`block py-3 px-2 rounded nav-link transition-colors duration-200`}
                  style={{ color: internalActive === l.label ? "#d97706" : "#0f172a" }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <button
              onClick={() => {
                setMobileOpen(false);
                onCTAClick && onCTAClick();
              }}
              className="w-full bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-md h-10 transition-transform duration-150 hover:-translate-y-0.5"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Mobile backdrop when menu open */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}
    </nav>
  );
}
