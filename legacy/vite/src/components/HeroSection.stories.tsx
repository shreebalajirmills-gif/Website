import React from 'react';
import HeroSection from './HeroSection';

export default {
  title: 'Components/HeroSection',
  component: HeroSection,
};

export const Default = () => (
  <HeroSection
    onDistributorClick={() => alert("Distributor clicked")}
    onContractorClick={() => alert("Contractor clicked")}
    onProjectClick={() => alert("Project clicked")}
    onInvestorClick={() => alert("Investor clicked")}
  />
);

export const Dark = () => (
  <HeroSection
    onDistributorClick={() => {}}
    onContractorClick={() => {}}
    onProjectClick={() => {}}
    onInvestorClick={() => {}}
    isDark
  />
);
