import React from 'react';

interface ComponentSkeletonProps {
  title?: string;
  badge?: string;
  heightClass?: string;
}

export const ComponentSkeleton: React.FC<ComponentSkeletonProps> = ({
  title = 'Loading Component...',
  badge = 'Telemetry Loading',
  heightClass = 'min-h-[380px]',
}) => {
  return (
    <div
      className={`w-full ${heightClass} bg-steel-50/70 border border-steel-200/80 p-8 sm:p-12 flex flex-col items-center justify-center relative overflow-hidden`}
      role="status"
      aria-label={title}
    >
      {/* Animated Subtle Shimmer Sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />

      <div className="w-full max-w-xl mx-auto space-y-4 text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-steel-100 border border-steel-200 text-steel-500 font-mono text-[10px] uppercase tracking-widest font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
          <span>{badge}</span>
        </div>

        <div className="h-6 w-3/4 mx-auto bg-steel-200/80 rounded" />
        <div className="h-3 w-1/2 mx-auto bg-steel-200/50 rounded" />

        <div className="pt-6 grid grid-cols-3 gap-3">
          <div className="h-16 bg-steel-100/90 border border-steel-200/60 rounded" />
          <div className="h-16 bg-steel-100/90 border border-steel-200/60 rounded" />
          <div className="h-16 bg-steel-100/90 border border-steel-200/60 rounded" />
        </div>
      </div>
    </div>
  );
};
