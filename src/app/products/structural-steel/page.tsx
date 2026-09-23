import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SteelProductViewer } from '@/components/3d/SteelProductViewer';
import { ShieldCheck, ArrowRight, Scale, Box } from 'lucide-react';
import { constructMetadata, getBreadcrumbJsonLd, getProductJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { PRODUCTS_DATA } from '@/data/products';

export const metadata: Metadata = constructMetadata({
  title: 'IS 2062 Structural Steel Angles & Channels Manufacturing | 36,000 TPA',
  description:
    'Manufactured per BIS IS 2062:2011 Grade E250 in Bhiwadi, Haryana. High-tensile equal angles & channels for industrial framing, transmission line towers, and bridges.',
  canonicalUrl: '/products/structural-steel',
  keywords: [
    'IS 2062 Structural Steel',
    'MS Angles Manufacturer Bhiwadi',
    'Steel Channels IS 2062 Grade E250',
    'Transmission Tower Angles Delhi NCR',
    '36000 TPA Structural Mill',
  ],
});

export default function StructuralSteelPage() {
  const structuralProduct = PRODUCTS_DATA[0];

  const angleSizes = [
    { size: '40 x 40 x 5 mm', weightPerM: '2.97 kg/m', length: '12 Meters', app: 'Light Fabrication & Bracing' },
    { size: '50 x 50 x 6 mm', weightPerM: '4.47 kg/m', length: '12 Meters', app: 'Roof Trusses & Shed Framing' },
    { size: '65 x 65 x 6 mm', weightPerM: '5.89 kg/m', length: '12 Meters', app: 'Transmission Towers & Girders' },
    { size: '75 x 75 x 6 mm', weightPerM: '6.84 kg/m', length: '12 Meters', app: 'Industrial Plant Platforms' },
    { size: '90 x 90 x 8 mm', weightPerM: '10.92 kg/m', length: '12 Meters', app: 'Heavy Structural Stanchions' },
    { size: '100 x 100 x 10 mm', weightPerM: '14.90 kg/m', length: '12 Meters', app: 'Bridge Columns & Cranes' },
    { size: '100 x 100 x 12 mm', weightPerM: '17.70 kg/m', length: '12 Meters', app: 'High-Load Heavy Industrial Gantries' },
  ];

  const channelSizes = [
    { size: 'ISMC 75 x 40 mm', weightPerM: '7.14 kg/m', length: '12 Meters', app: 'Roof Purlins & Window Framing' },
    { size: 'ISMC 100 x 50 mm', weightPerM: '9.56 kg/m', length: '12 Meters', app: 'Shed Purlins, Commercial Framing' },
    { size: 'ISMC 125 x 65 mm', weightPerM: '13.10 kg/m', length: '12 Meters', app: 'Industrial Stanchions & Support Brackets' },
    { size: 'ISMC 150 x 75 mm', weightPerM: '16.80 kg/m', length: '12 Meters', app: 'Warehouse Columns & Primary Girders' },
    { size: 'ISMC 200 x 75 mm', weightPerM: '22.30 kg/m', length: '12 Meters', app: 'Heavy Machine Bases & Freight Bays' },
  ];

  const flatAndRoundSizes = [
    // Patti (MS Flats)
    { type: 'MS Flat (Patti)', size: '50 x 6 mm', weightPerM: '2.36 kg/m', length: '6 Meters', app: 'Substation Earthing & Pipe Clamps' },
    { type: 'MS Flat (Patti)', size: '50 x 8 mm', weightPerM: '3.14 kg/m', length: '6 Meters', app: 'Grounding Busbars & Fabrication Brackets' },
    { type: 'MS Flat (Patti)', size: '50 x 10 mm', weightPerM: '3.93 kg/m', length: '6 Meters', app: 'Heavy Clamps & Structural Ties' },
    { type: 'MS Flat (Patti)', size: '50 x 12 mm', weightPerM: '4.71 kg/m', length: '6 Meters', app: 'Base Plates & Flange Brackets' },
    { type: 'MS Flat (Patti)', size: '50 x 16 mm', weightPerM: '6.28 kg/m', length: '6 Meters', app: 'Engineering Guides & Stiffeners' },
    { type: 'MS Flat (Patti)', size: '50 x 20 mm', weightPerM: '7.85 kg/m', length: '6 Meters', app: 'Heavy Machine Mounts & Spacers' },
    { type: 'MS Flat (Patti)', size: '50 x 25 mm', weightPerM: '9.81 kg/m', length: '6 Meters', app: 'High-Load Machine Beds & Wear Strips' },
    { type: 'MS Flat (Patti)', size: '65 x 6 mm', weightPerM: '3.06 kg/m', length: '6 Meters', app: 'Fabrication Brackets & Grounding' },
    { type: 'MS Flat (Patti)', size: '65 x 8 mm', weightPerM: '4.08 kg/m', length: '6 Meters', app: 'Electrical Earthing & Structural Splices' },
    { type: 'MS Flat (Patti)', size: '65 x 10 mm', weightPerM: '5.10 kg/m', length: '6 Meters', app: 'Flange Joint Plates & Brackets' },
    { type: 'MS Flat (Patti)', size: '65 x 12 mm', weightPerM: '6.12 kg/m', length: '6 Meters', app: 'Heavy Machinery Guide Strips' },
    { type: 'MS Flat (Patti)', size: '65 x 16 mm', weightPerM: '8.16 kg/m', length: '6 Meters', app: 'Heavy Duty Structural Stiffeners' },
    { type: 'MS Flat (Patti)', size: '65 x 20 mm', weightPerM: '10.21 kg/m', length: '6 Meters', app: 'Industrial Foundation Mounts' },
    { type: 'MS Flat (Patti)', size: '65 x 25 mm', weightPerM: '12.76 kg/m', length: '6 Meters', app: 'Heavy Engineering Beds' },
    { type: 'MS Flat (Patti)', size: '65 x 32 mm', weightPerM: '16.33 kg/m', length: '6 Meters', app: 'High-Stress Machine Blocks' },
    { type: 'MS Flat (Patti)', size: '75 x 6 mm', weightPerM: '3.53 kg/m', length: '6 Meters', app: 'Substation Earthing & Flange Brackets' },
    { type: 'MS Flat (Patti)', size: '75 x 8 mm', weightPerM: '4.71 kg/m', length: '6 Meters', app: 'Joint Plates & Structural Stiffeners' },
    { type: 'MS Flat (Patti)', size: '75 x 10 mm', weightPerM: '5.89 kg/m', length: '6 Meters', app: 'Base Plates, Heavy Clamps & Joint Gussets' },
    { type: 'MS Flat (Patti)', size: '75 x 12 mm', weightPerM: '7.07 kg/m', length: '6 Meters', app: 'Column Splices & Machinery Beds' },
    { type: 'MS Flat (Patti)', size: '75 x 16 mm', weightPerM: '9.42 kg/m', length: '6 Meters', app: 'Heavy Industrial Machine Foundations' },
    { type: 'MS Flat (Patti)', size: '75 x 20 mm', weightPerM: '11.78 kg/m', length: '6 Meters', app: 'Bridge Bearings & Crane Stanchions' },
    { type: 'MS Flat (Patti)', size: '75 x 25 mm', weightPerM: '14.72 kg/m', length: '6 Meters', app: 'High-Load Machine Beds & Splices' },
    { type: 'MS Flat (Patti)', size: '75 x 32 mm', weightPerM: '18.84 kg/m', length: '6 Meters', app: 'Heavy Duty Engineering Blocks' },
    { type: 'MS Flat (Patti)', size: '100 x 5 mm', weightPerM: '3.93 kg/m', length: '6 Meters', app: 'Light Base Plates & Purlin Cleats' },
    { type: 'MS Flat (Patti)', size: '100 x 6 mm', weightPerM: '4.71 kg/m', length: '6 Meters', app: 'Earthing Flats & Joint Plates' },
    { type: 'MS Flat (Patti)', size: '100 x 8 mm', weightPerM: '6.28 kg/m', length: '6 Meters', app: 'Truss Flange Joint Plates' },
    { type: 'MS Flat (Patti)', size: '100 x 10 mm', weightPerM: '7.85 kg/m', length: '6 Meters', app: 'Heavy Stiffener Plates & Splices' },
    { type: 'MS Flat (Patti)', size: '100 x 12 mm', weightPerM: '9.42 kg/m', length: '6 Meters', app: 'Machinery Beds & Anchor Washer Plates' },
    { type: 'MS Flat (Patti)', size: '100 x 16 mm', weightPerM: '12.56 kg/m', length: '6 Meters', app: 'Heavy Gussets & Column Splices' },
    { type: 'MS Flat (Patti)', size: '100 x 20 mm', weightPerM: '15.70 kg/m', length: '6 Meters', app: 'Crane Track Base Plates & Beds' },
    { type: 'MS Flat (Patti)', size: '100 x 25 mm', weightPerM: '19.63 kg/m', length: '6 Meters', app: 'Bridge Column Bases & Girders' },
    { type: 'MS Flat (Patti)', size: '100 x 32 mm', weightPerM: '25.12 kg/m', length: '6 Meters', app: 'Power Plant Machine Foundations' },
    { type: 'MS Flat (Patti)', size: '100 x 40 mm', weightPerM: '31.40 kg/m', length: '6 Meters', app: 'Heavy Forging Beds & Press Blocks' },
    { type: 'MS Flat (Patti)', size: '125 x 6 mm', weightPerM: '5.89 kg/m', length: '6 Meters', app: 'Heavy Earthing & Splice Plates' },
    { type: 'MS Flat (Patti)', size: '125 x 8 mm', weightPerM: '7.85 kg/m', length: '6 Meters', app: 'Column Joint Gussets & Ties' },
    { type: 'MS Flat (Patti)', size: '125 x 10 mm', weightPerM: '9.81 kg/m', length: '6 Meters', app: 'Heavy Beam Connection Brackets' },
    { type: 'MS Flat (Patti)', size: '125 x 12 mm', weightPerM: '11.78 kg/m', length: '6 Meters', app: 'Stanchion Base Plates' },
    { type: 'MS Flat (Patti)', size: '125 x 16 mm', weightPerM: '15.70 kg/m', length: '6 Meters', app: 'EOT Crane Gantry Tie Plates' },
    { type: 'MS Flat (Patti)', size: '125 x 20 mm', weightPerM: '19.63 kg/m', length: '6 Meters', app: 'Heavy Mounts & Bridge Bearings' },
    { type: 'MS Flat (Patti)', size: '125 x 25 mm', weightPerM: '24.53 kg/m', length: '6 Meters', app: 'Heavy Infrastructure Stiffeners' },
    { type: 'MS Flat (Patti)', size: '150 x 5 mm', weightPerM: '5.89 kg/m', length: '6 Meters', app: 'Sheet Metal Tooling & Wide Flanges' },
    { type: 'MS Flat (Patti)', size: '150 x 6 mm', weightPerM: '7.07 kg/m', length: '6 Meters', app: 'Wide Earthing Strips & Guides' },
    { type: 'MS Flat (Patti)', size: '150 x 8 mm', weightPerM: '9.42 kg/m', length: '6 Meters', app: 'Heavy Structural Stiffener Plates' },
    { type: 'MS Flat (Patti)', size: '150 x 10 mm', weightPerM: '11.78 kg/m', length: '6 Meters', app: 'Warehouse Column Base Plates' },
    { type: 'MS Flat (Patti)', size: '150 x 12 mm', weightPerM: '14.13 kg/m', length: '6 Meters', app: 'Heavy Gusset Splices & Girders' },
    { type: 'MS Flat (Patti)', size: '150 x 16 mm', weightPerM: '18.84 kg/m', length: '6 Meters', app: 'Bridge Girder Bearings' },
    { type: 'MS Flat (Patti)', size: '150 x 20 mm', weightPerM: '23.55 kg/m', length: '6 Meters', app: 'Machine Beds & Turbine Bases' },
    { type: 'MS Flat (Patti)', size: '150 x 25 mm', weightPerM: '29.44 kg/m', length: '6 Meters', app: 'Heavy Gantry Columns & Press Plates' },

    // Gol (MS Round Bars)
    { type: 'Round Bar (Gol)', size: '25 mm Ø', weightPerM: '3.85 kg/m', length: '6 - 12 Meters', app: 'Foundation Anchor J-Bolts & Transmission Bracing' },
    { type: 'Round Bar (Gol)', size: '30 mm Ø', weightPerM: '5.55 kg/m', length: '6 - 12 Meters', app: 'Heavy Column Anchor Bolts & Tie Rods' },
    { type: 'Round Bar (Gol)', size: '32 mm Ø', weightPerM: '6.31 kg/m', length: '6 - 12 Meters', app: 'Industrial Turnbuckles & Cross Bracing Rods' },
    { type: 'Round Bar (Gol)', size: '40 mm Ø', weightPerM: '9.87 kg/m', length: '6 - 12 Meters', app: 'Heavy Machine Foundation Bolts & Engineering Pins' },
    { type: 'Round Bar (Gol)', size: '50 mm Ø', weightPerM: '15.42 kg/m', length: '6 - 12 Meters', app: 'Heavy Duty Shafting, Axles & Industrial Pins' },
    { type: 'Round Bar (Gol)', size: '56 mm Ø', weightPerM: '19.34 kg/m', length: '6 - 12 Meters', app: 'Power Generation Equipment Shafts & Rollers' },
    { type: 'Round Bar (Gol)', size: '60 mm Ø', weightPerM: '22.20 kg/m', length: '6 - 12 Meters', app: 'Heavy Machine Drive Shafts & Guide Bars' },
    { type: 'Round Bar (Gol)', size: '63 mm Ø', weightPerM: '24.47 kg/m', length: '6 - 12 Meters', app: 'High-Load Marine & Industrial Engineering Shafts' },

    // Chakor (MS Square Bars)
    { type: 'Square Bar (Chakor)', size: '25 x 25 mm', weightPerM: '4.91 kg/m', length: '6 Meters', app: 'Factory Gate Frames, Grilles & Light Rails' },
    { type: 'Square Bar (Chakor)', size: '32 x 32 mm', weightPerM: '8.04 kg/m', length: '6 Meters', app: 'Crane Runway Tracks & Heavy Machine Slides' },
    { type: 'Square Bar (Chakor)', size: '40 x 40 mm', weightPerM: '12.56 kg/m', length: '6 Meters', app: 'Heavy Industrial Track Rails & Machine Tooling' },
    { type: 'Square Bar (Chakor)', size: '50 x 50 mm', weightPerM: '19.63 kg/m', length: '6 Meters', app: 'Heavy Equipment Rails, Tooling Blocks & Stanchions' },
  ];

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', item: '/' },
    { name: 'Our Products', item: '/products' },
    { name: 'Structural Steel', item: '/products/structural-steel' },
  ]);

  const productJsonLd = getProductJsonLd({
    name: structuralProduct.name,
    description: structuralProduct.description,
    url: '/products/structural-steel',
    standard: structuralProduct.specs.standard,
    capacity: structuralProduct.capacity.formatTpa,
    applications: structuralProduct.applications,
  });

  return (
    <main id="main-content" className="min-h-screen bg-steel-base text-steel-900 flex flex-col selection:bg-transparent group-hover:bg-growth-500 selection:text-white">
      <JsonLd data={[breadcrumbJsonLd, productJsonLd]} />
      <Header />

      {/* Hero Section */}
      <section className="pt-36 pb-20 bg-steel-base border-b border-steel-200 steel-grid-pattern relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 badge-distributor text-xs font-mono font-bold">
            <ShieldCheck className="w-4 h-4 text-steel-900" /> BIS IS 2062 GRADE E250 CERTIFIED
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-steel-900 tracking-tight">
            Structural Steel Angles <br />
            <span className="text-gradient-growth">& Channels Manufacturing</span>
          </h1>

          <p className="text-base text-steel-600 max-w-3xl font-normal leading-relaxed">
            Manufactured from high-grade structural billets at our Bhiwadi rolling facility. Engineered for heavy industrial framing, transmission line towers, warehousing sheds, and EPC infrastructure projects.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono">
            <span className="bg-steel-100 border border-steel-200 px-3.5 py-1.5 font-bold text-steel-900">
              Annual Platform Capacity: 36,000 TPA
            </span>
            <span className="bg-steel-100 border border-steel-200 px-3.5 py-1.5 font-bold text-steel-900">
              Weldability Rating: Carbon Equivalent Max 0.38%
            </span>
          </div>
        </div>
      </section>

      {/* Main Content & 3D Inspector */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 3D Model Inspection Card */}
        <div className="card-base card-product p-8 border border-steel-200 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Box className="w-5 h-5 text-growth-600" />
              <h2 className="text-xl font-bold text-steel-900">3D Interactive Structural Section Inspector</h2>
            </div>
            <span className="text-xs font-mono font-bold text-steel-500">Drag to Orbit 360°</span>
          </div>

          <SteelProductViewer productType="structural_steel" />

          <p className="text-xs text-steel-600 font-normal leading-relaxed">
            Every section undergoes ultrasonic defect detection and chemical lab testing per IS 2062 standards. Guaranteed uniform flange thickness, crisp 90-degree corner radii, and zero surface scaling.
          </p>
        </div>

        {/* Dimension & Weight Schedule Table */}
        <div id="angles" className="card-base card-product p-8 border border-steel-200 space-y-6 scroll-mt-28">
          <div className="flex items-center justify-between border-b border-steel-200 pb-4">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-growth-600" />
              <h2 className="text-xl font-bold text-steel-900">Standard Equal Angle Section Schedule</h2>
            </div>
            <span className="text-xs font-mono font-bold text-steel-900 bg-transparent group-hover:bg-growth-50 px-3 py-1 border border-steel-200 group-hover:border-growth-400">
              IS 2062 Dimensions
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-steel-200 text-steel-500 font-mono text-[11px] uppercase">
                  <th className="py-3 px-4">Section Size (mm)</th>
                  <th className="py-3 px-4">Unit Weight (kg/m)</th>
                  <th className="py-3 px-4">Standard Stock Length</th>
                  <th className="py-3 px-4">Primary Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-steel-200 font-mono text-steel-800">
                {angleSizes.map((item, i) => (
                  <tr key={i} className="hover:bg-steel-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-steel-900">{item.size}</td>
                    <td className="py-3.5 px-4 font-bold text-steel-900">{item.weightPerM}</td>
                    <td className="py-3.5 px-4 text-steel-600">{item.length}</td>
                    <td className="py-3.5 px-4 font-sans text-steel-600">{item.app}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MS Channels Schedule Table */}
        <div id="channels" className="card-base card-product p-8 border border-steel-200 space-y-6 scroll-mt-28">
          <div className="flex items-center justify-between border-b border-steel-200 pb-4">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-growth-600" />
              <h2 className="text-xl font-bold text-steel-900">Standard Mild Steel Channels (ISMC Schedule)</h2>
            </div>
            <span className="text-xs font-mono font-bold text-steel-900 bg-transparent group-hover:bg-growth-50 px-3 py-1 border border-steel-200 group-hover:border-growth-400">
              ISMC Profiles
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-steel-200 text-steel-500 font-mono text-[11px] uppercase">
                  <th className="py-3 px-4">Channel Designation</th>
                  <th className="py-3 px-4">Unit Weight (kg/m)</th>
                  <th className="py-3 px-4">Standard Stock Length</th>
                  <th className="py-3 px-4">Primary Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-steel-200 font-mono text-steel-800">
                {channelSizes.map((item, i) => (
                  <tr key={i} className="hover:bg-steel-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-steel-900">{item.size}</td>
                    <td className="py-3.5 px-4 font-bold text-steel-900">{item.weightPerM}</td>
                    <td className="py-3.5 px-4 text-steel-600">{item.length}</td>
                    <td className="py-3.5 px-4 font-sans text-steel-600">{item.app}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MS Flats & Round Bars Schedule Table */}
        <div id="flats-rounds" className="card-base card-product p-8 border border-steel-200 space-y-6 scroll-mt-28">
          <div className="flex items-center justify-between border-b border-steel-200 pb-4">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-growth-600" />
              <h2 className="text-xl font-bold text-steel-900">MS Flats (Patti), Round Bars (Gol) & Square Bars (Chakor)</h2>
            </div>
            <span className="text-xs font-mono font-bold text-steel-900 bg-transparent group-hover:bg-growth-50 px-3 py-1 border border-steel-200 group-hover:border-growth-400">
              Patti, Gol & Chakor
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-steel-200 text-steel-500 font-mono text-[11px] uppercase">
                  <th className="py-3 px-4">Product Category</th>
                  <th className="py-3 px-4">Nominal Size</th>
                  <th className="py-3 px-4">Unit Weight (kg/m)</th>
                  <th className="py-3 px-4">Stock Length</th>
                  <th className="py-3 px-4">Target Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-steel-200 font-mono text-steel-800">
                {flatAndRoundSizes.map((item, i) => (
                  <tr key={i} className="hover:bg-steel-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-steel-900">{item.type}</td>
                    <td className="py-3.5 px-4 font-bold text-steel-900">{item.size}</td>
                    <td className="py-3.5 px-4 font-bold text-steel-900">{item.weightPerM}</td>
                    <td className="py-3.5 px-4 text-steel-600">{item.length}</td>
                    <td className="py-3.5 px-4 font-sans text-steel-600">{item.app}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="card-base-contractor p-8 border border-steel-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-steel-900">Require Custom Section Modulus or Bulk Freight Delivery?</h3>
            <p className="text-xs text-steel-600">Direct dispatch available across Delhi NCR, Haryana, UP, and Punjab.</p>
          </div>
          <Link
            href="/inquiry?segment=contractor"
            className="btn-primary py-3.5 px-6 text-xs font-extrabold flex items-center gap-2 shrink-0"
          >
            <span>Request Structural Quote</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </section>

      <Footer />
    </main>
  );
}
