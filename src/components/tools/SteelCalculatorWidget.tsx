'use client';

import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldAlert, Scale, RefreshCw, FileSpreadsheet } from 'lucide-react';
import { ProductType } from '@/types';

export const SteelCalculatorWidget: React.FC = () => {
  const [productType, setProductType] = useState<ProductType>('tmt_bar');
  
  // TMT inputs
  const [rebarDiameterMm, setRebarDiameterMm] = useState<number>(16);
  const [rebarLengthMeters, setRebarLengthMeters] = useState<number>(12);
  const [rebarQuantityPcs, setRebarQuantityPcs] = useState<number>(500);

  // Structural Steel inputs (Equal Angle L-shape mm x mm x mm)
  const [angleSizeMm, setAngleSizeMm] = useState<number>(75); // e.g. 75x75
  const [angleThicknessMm, setAngleThicknessMm] = useState<number>(6);
  const [angleLengthMeters, setAngleLengthMeters] = useState<number>(12);
  const [angleQuantityPcs, setAngleQuantityPcs] = useState<number>(200);

  // Calculations:
  // TMT Weight per meter = (D^2 / 162) kg/m
  const tmtWeightPerMeter = (rebarDiameterMm * rebarDiameterMm) / 162;
  const singleRebarWeightKg = tmtWeightPerMeter * rebarLengthMeters;
  const totalTmtWeightKg = singleRebarWeightKg * rebarQuantityPcs;
  const totalTmtTons = totalTmtWeightKg / 1000;

  // Structural Equal Angle Weight per meter ≈ (2 * width - thickness) * thickness * 0.00785 kg/m
  const angleWeightPerMeter = (2 * angleSizeMm - angleThicknessMm) * angleThicknessMm * 0.00785;
  const singleAngleWeightKg = angleWeightPerMeter * angleLengthMeters;
  const totalAngleWeightKg = singleAngleWeightKg * angleQuantityPcs;
  const totalAngleTons = totalAngleWeightKg / 1000;

  const isTmt = productType === 'tmt_bar';
  const displayTotalTons = isTmt ? totalTmtTons.toFixed(2) : totalAngleTons.toFixed(2);
  const displayTotalKg = isTmt ? Math.round(totalTmtWeightKg).toLocaleString() : Math.round(totalAngleWeightKg).toLocaleString();
  const displayPerMeterKg = isTmt ? tmtWeightPerMeter.toFixed(3) : angleWeightPerMeter.toFixed(3);

  return (
    <section id="steel-calculator" className="py-24 bg-steel-base border-b border-steel-200 relative overflow-hidden">
      
      <div className="ambient-liquid-glow ambient-glow-growth bottom-0 left-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="glass-pill px-4 py-1.5 inline-flex items-center gap-2 text-growth-700 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-growth-600" /> B2B Engineering Tool
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-steel-900 tracking-tight">
            Industrial Steel <span className="text-gradient-growth">Weight & Logistics Calculator</span>
          </h2>
          <p className="text-sm text-steel-600 font-normal max-w-xl mx-auto">
            Calculate instant site tonnage, weight per meter (IS 1786 / IS 2062), and truckload bundle requirements for site procurement.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="liquid-glass-prominent rounded-3xl p-6 sm:p-10 border border-steel-200 max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-xl">
          
          {/* Form Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Toggle Product Type */}
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-steel-700 block mb-2">
                Select Steel Material Type:
              </label>
              <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-steel-100 border border-steel-200">
                <button
                  type="button"
                  onClick={() => setProductType('tmt_bar')}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isTmt ? 'bg-white text-black font-black border border-steel-300 shadow-md' : 'text-steel-600 hover:text-black'
                  }`}
                >
                  <Scale className="w-4 h-4" />
                  <span>TMT Rebar (IS 1786)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setProductType('structural_steel')}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    !isTmt ? 'bg-white text-black font-black border border-steel-300 shadow-md' : 'text-steel-600 hover:text-black'
                  }`}
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Structural Angle (IS 2062)</span>
                </button>
              </div>
            </div>

            {/* TMT Inputs */}
            {isTmt ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-steel-700 block mb-1.5">
                      Rebar Diameter (mm):
                    </label>
                    <select
                      value={rebarDiameterMm}
                      onChange={(e) => setRebarDiameterMm(Number(e.target.value))}
                      className="w-full glass-select rounded-xl px-4 py-2.5 text-xs font-bold text-steel-900 font-mono"
                    >
                      {[8, 10, 12, 16, 20, 25, 28, 32].map((d) => (
                        <option key={d} value={d} className="bg-white text-steel-900">
                          {d} mm ({d === 16 ? 'Standard Infra' : `${d}mm`})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-steel-700 block mb-1.5">
                      Length Per Piece (Meters):
                    </label>
                    <input
                      type="number"
                      value={rebarLengthMeters}
                      onChange={(e) => setRebarLengthMeters(Number(e.target.value))}
                      className="w-full glass-input rounded-xl px-4 py-2.5 text-xs font-bold text-steel-900 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-steel-700">
                      Total Pieces Required:
                    </label>
                    <span className="text-xs font-mono text-growth-700 font-bold">{rebarQuantityPcs} Pcs</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="5000"
                    step="50"
                    value={rebarQuantityPcs}
                    onChange={(e) => setRebarQuantityPcs(Number(e.target.value))}
                    className="w-full accent-growth-600 cursor-pointer h-2 bg-steel-200 rounded-lg"
                  />
                </div>
              </div>
            ) : (
              /* Structural Angle Inputs */
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-steel-700 block mb-1.5">
                      Equal Angle Size (mm x mm):
                    </label>
                    <select
                      value={angleSizeMm}
                      onChange={(e) => setAngleSizeMm(Number(e.target.value))}
                      className="w-full glass-select rounded-xl px-4 py-2.5 text-xs font-bold text-steel-900 font-mono"
                    >
                      {[40, 50, 65, 75, 90, 100, 110, 130, 150].map((s) => (
                        <option key={s} value={s} className="bg-white text-steel-900">
                          {s} x {s} mm
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-steel-700 block mb-1.5">
                      Flange Thickness (mm):
                    </label>
                    <select
                      value={angleThicknessMm}
                      onChange={(e) => setAngleThicknessMm(Number(e.target.value))}
                      className="w-full glass-select rounded-xl px-4 py-2.5 text-xs font-bold text-steel-900 font-mono"
                    >
                      {[5, 6, 8, 10, 12].map((t) => (
                        <option key={t} value={t} className="bg-white text-steel-900">
                          {t} mm
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-steel-700 block mb-1.5">
                      Length Per Piece (Meters):
                    </label>
                    <input
                      type="number"
                      value={angleLengthMeters}
                      onChange={(e) => setAngleLengthMeters(Number(e.target.value))}
                      className="w-full glass-input rounded-xl px-4 py-2.5 text-xs font-bold text-steel-900 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-steel-700 block mb-1.5">
                      Total Pieces Required:
                    </label>
                    <input
                      type="number"
                      value={angleQuantityPcs}
                      onChange={(e) => setAngleQuantityPcs(Number(e.target.value))}
                      className="w-full glass-input rounded-xl px-4 py-2.5 text-xs font-bold text-steel-900 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-steel-100/90 border border-steel-200 text-xs space-y-1.5">
              <span className="text-growth-700 font-bold block flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" /> Formula Verification Standard
              </span>
              <p className="text-steel-600 font-mono">
                {isTmt
                  ? `Standard Rebar Formula: W = (D² / 162) kg/m = (${rebarDiameterMm}² / 162) = ${displayPerMeterKg} kg/m`
                  : `Structural Standard Formula: W = (2A - T) × T × 0.00785 = ${displayPerMeterKg} kg/m`}
              </p>
            </div>

          </div>

          {/* Result Output Card (5 cols) */}
          <div className="lg:col-span-5 liquid-glass liquid-glass-contractor p-6 rounded-2xl flex flex-col justify-between border border-growth-500/40 space-y-6 shadow-md">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-steel-200 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-growth-800 font-mono">
                  Calculated Tonnage
                </span>
                <span className="badge-success px-2.5 py-0.5 text-[10px] font-bold rounded-full">
                  IS Compliant
                </span>
              </div>

              <div>
                <span className="text-xs text-steel-600 font-bold block">Total Estimated Weight:</span>
                <p className="text-4xl sm:text-5xl font-black text-steel-900 font-mono tracking-tight mt-1">
                  {displayTotalTons} <span className="text-growth-700 text-2xl font-bold">Metric Tons</span>
                </p>
                <p className="text-xs text-steel-600 font-mono mt-1">
                  ({displayTotalKg} Total Kilograms)
                </p>
              </div>

              <div className="space-y-2 pt-2 text-xs divide-y divide-steel-200">
                <div className="flex justify-between py-1.5 text-steel-700">
                  <span>Weight Per Meter:</span>
                  <span className="font-mono font-bold text-steel-900">{displayPerMeterKg} kg/m</span>
                </div>
                <div className="flex justify-between py-1.5 text-steel-700">
                  <span>Estimated Truckloads (25T):</span>
                  <span className="font-mono font-bold text-growth-700">
                    {Math.ceil(Number(displayTotalTons) / 25)} Trailer(s)
                  </span>
                </div>
              </div>
            </div>

            <a
              href="#inquiry-portal"
              onClick={() => {
                const element = document.getElementById('inquiry-portal');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full btn-primary py-3.5 px-4 text-xs font-extrabold flex items-center justify-center gap-2"
            >
              <span>Submit Calculated Tonnage for Quote</span>
              <ArrowRight className="w-4 h-4" />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};
