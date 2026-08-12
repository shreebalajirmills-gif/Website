import React from 'react';
import Navbar from '../components/Navbar';
import ProductHub from '../components/ProductHub';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import TrustSection from '../components/TrustSection';
import GrowthTimeline from '../components/GrowthTimeline';
import HeroSection from '../components/HeroSection';

export default function HomePage() {
  const handleDownloadStructural = () => {
    // Default behavior: open a static PDF path in a new tab. Replace with real file URL or download logic.
    if (typeof window !== 'undefined') {
      window.open('/assets/specs/structural-steel-spec-sheet.pdf', '_blank');
    }
  };

  const handleDownloadTMT = () => {
    if (typeof window !== 'undefined') {
      window.open('/assets/specs/tmt-bar-spec-sheet.pdf', '_blank');
    }
  };

  const onDistributorClick = () => {
    // scroll to contact section
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else console.log('Distributor clicked');
  };

  const onContractorClick = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else console.log('Contractor clicked');
  };

  const onProjectClick = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else console.log('Project clicked');
  };

  const onInvestorClick = () => {
    // open investor deck
    if (typeof window !== 'undefined') {
      window.open('/assets/investor-deck.pdf', '_blank');
    }
  };

  return (
    <div>
      <Navbar />

      <main id="home">
        <HeroSection
          onDistributorClick={onDistributorClick}
          onContractorClick={onContractorClick}
          onProjectClick={onProjectClick}
          onInvestorClick={onInvestorClick}
          isDark={false}
        />

        <section id="products">
          <ProductHub
            onDownloadStructural={handleDownloadStructural}
            onDownloadTMT={handleDownloadTMT}
            showComparison={true}
          />
        </section>

        <section id="scale">
          <GrowthTimeline />
        </section>

        <section id="certifications">
          <TrustSection />
        </section>

        <section id="contact">
          <ContactSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}
