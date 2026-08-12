/**
 * GrowthTimelineDemo.tsx
 * Demo wrapper for GrowthTimeline component.
 *
 * Usage:
 * 1. Install Recharts in your project:
 *    npm install recharts
 *    or
 *    yarn add recharts
 *
 * 2. Import and render this component in your app to preview:
 *    import GrowthTimelineDemo from './components/GrowthTimelineDemo';
 *
 *    <GrowthTimelineDemo />
 *
 * Note: The GrowthTimeline component expects revenue and ebitdaVolume values in ₹ Crores
 * and patMargin as percent numbers (e.g., 4.95).
 */

import React from 'react';
import GrowthTimeline from './GrowthTimeline';

const sampleData = [
  { year: 'FY26', revenue: 203, ebitdaVolume: 2.0, patMargin: 0.6 },
  { year: 'FY27', revenue: 260, ebitdaVolume: 10.0, patMargin: 1.5 },
  { year: 'FY28', revenue: 812, ebitdaVolume: 40.2, patMargin: 4.95 },
  { year: 'FY29', revenue: 903, ebitdaVolume: 43.2, patMargin: 4.78 },
  { year: 'FY30', revenue: 1006, ebitdaVolume: 50.5, patMargin: 2.98 },
];

const GrowthTimelineDemo: React.FC = () => {
  return (
    <div style={{ padding: 20, background: '#fbfdff', minHeight: '100vh' }}>
      <GrowthTimeline data={sampleData} interactive={true} showChart={true} />
    </div>
  );
};

export default GrowthTimelineDemo;
