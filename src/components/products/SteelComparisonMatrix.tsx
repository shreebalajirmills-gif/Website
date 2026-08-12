'use client';

import React from 'react';
import { ShieldCheck, Check, Zap, Layers, Award } from 'lucide-react';

export const SteelComparisonMatrix: React.FC = () => {
  return (
    <div className="my-16 max-w-5xl mx-auto">
      <div className="text-center mb-8 space-y-2">
        <div className="glass-pill px-4 py-1 inline-flex items-center gap-2 text-authority-700 text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5 text-authority-600" /> BIS Technical Standard Comparison
        </div>
        <h3 className="text-2xl sm:text-4xl font-black text-steel-900">
          IS 2062 vs IS 1786 <span className="text-gradient-growth">Specification Matrix</span>
        </h3>
      </div>

      <div className="liquid-glass-prominent rounded-3xl p-6 sm:p-8 border border-steel-200 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-steel-200 text-steel-700 font-extrabold uppercase tracking-wider text-[11px]">
              <th className="py-4 px-4 w-1/3">Technical Criterion</th>
              <th className="py-4 px-4 text-authority-700 bg-authority-50 rounded-tl-2xl border-l border-steel-200">IS 2062 Structural Steel</th>
              <th className="py-4 px-4 text-growth-700 bg-growth-50 rounded-tr-2xl border-l border-steel-200">IS 1786 Fe-500D TMT Bars</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-steel-200 text-steel-800 font-medium">
            <tr>
              <td className="py-4 px-4 font-bold text-steel-900">Primary Application</td>
              <td className="py-4 px-4 bg-authority-50/40 border-l border-steel-100">Heavy industrial framing, bridges, sheds & towers</td>
              <td className="py-4 px-4 bg-growth-50/40 border-l border-steel-100">High-rise civil foundations, RCC pillars & beams</td>
            </tr>
            <tr>
              <td className="py-4 px-4 font-bold text-steel-900">Chemical Carbon Cap</td>
              <td className="py-4 px-4 bg-authority-50/40 border-l border-steel-100 font-mono text-steel-700">Max 0.23% (High Weldability)</td>
              <td className="py-4 px-4 bg-growth-50/40 border-l border-steel-100 font-mono text-growth-800">Max 0.25% (Controlled Equivalent)</td>
            </tr>
            <tr>
              <td className="py-4 px-4 font-bold text-steel-900">Minimum Yield Strength</td>
              <td className="py-4 px-4 bg-authority-50/40 border-l border-steel-100 font-mono text-steel-900">250 MPa (E250 Grade)</td>
              <td className="py-4 px-4 bg-growth-50/40 border-l border-steel-100 font-mono text-growth-700 font-bold">500 MPa (Fe-500D Ductile)</td>
            </tr>
            <tr>
              <td className="py-4 px-4 font-bold text-steel-900">Tensile Strength Range</td>
              <td className="py-4 px-4 bg-authority-50/40 border-l border-steel-100 font-mono text-steel-900">410 – 540 MPa</td>
              <td className="py-4 px-4 bg-growth-50/40 border-l border-steel-100 font-mono text-trust-700 font-bold">Min 565 MPa (High Strain)</td>
            </tr>
            <tr>
              <td className="py-4 px-4 font-bold text-steel-900">Elongation at Fracture</td>
              <td className="py-4 px-4 bg-authority-50/40 border-l border-steel-100 font-mono text-steel-900">Min 23%</td>
              <td className="py-4 px-4 bg-growth-50/40 border-l border-steel-100 font-mono text-trust-700 font-bold">Min 16% (Seismic Zone Proof)</td>
            </tr>
            <tr>
              <td className="py-4 px-4 font-bold text-steel-900">Lab Quality Seal</td>
              <td className="py-4 px-4 bg-authority-50/40 border-l border-steel-100 text-authority-700 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-authority-600" /> BIS License CM/L-123456
              </td>
              <td className="py-4 px-4 bg-growth-50/40 border-l border-steel-100 text-growth-700 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-growth-600" /> BIS License CM/L-789012
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
