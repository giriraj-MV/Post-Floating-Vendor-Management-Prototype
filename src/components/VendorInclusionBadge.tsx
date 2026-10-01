import React, { useState } from 'react';
import { Lock, Zap, Check, HelpCircle } from 'lucide-react';
import { InclusionStatus } from '../types';

interface VendorInclusionBadgeProps {
  status: InclusionStatus;
  floatedAt?: string;
  addedAt?: string;
  addedBy?: string;
  compact?: boolean;
}

export const VendorInclusionBadge: React.FC<VendorInclusionBadgeProps> = ({
  status,
  floatedAt,
  addedAt,
  addedBy,
  compact = false,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  if (status === 'floated') {
    return (
      <div className="relative inline-flex items-center">
        <div
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-300 cursor-help transition-colors hover:bg-slate-200`}
        >
          <Lock className="w-3 h-3 text-slate-600 shrink-0" />
          <span className="font-semibold text-slate-800">Floated</span>
          <span className="text-slate-500 font-normal">· Locked</span>
          {!compact && (
            <HelpCircle className="w-2.5 h-2.5 text-slate-400 ml-0.5" />
          )}
        </div>

        {showTooltip && (
          <div className="absolute z-50 bottom-full left-0 mb-1.5 w-64 p-2.5 bg-slate-900 text-white rounded shadow-xl text-left text-xs pointer-events-none">
            <div className="flex items-center gap-1.5 font-semibold text-amber-300 mb-1">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              Locked Pre-Float Vendor
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              This vendor was part of the original tender float on{' '}
              <span className="font-mono text-white">{floatedAt || 'Sep 20, 2026'}</span>.
            </p>
            <div className="mt-1.5 pt-1.5 border-t border-slate-700/80 text-[10px] text-amber-200/90 flex items-center gap-1">
              <span>● Cannot be removed from active floated auction.</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (status === 'post_float') {
    return (
      <div className="relative inline-flex items-center">
        <div
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 cursor-help transition-colors hover:bg-indigo-100`}
        >
          <Zap className="w-3 h-3 text-indigo-600 shrink-0" />
          <span className="font-semibold text-indigo-900">Post-Float</span>
          <span className="text-indigo-600 font-normal">· Removable</span>
          {!compact && (
            <HelpCircle className="w-2.5 h-2.5 text-indigo-400 ml-0.5" />
          )}
        </div>

        {showTooltip && (
          <div className="absolute z-50 bottom-full left-0 mb-1.5 w-64 p-2.5 bg-slate-900 text-white rounded shadow-xl text-left text-xs pointer-events-none">
            <div className="flex items-center gap-1.5 font-semibold text-sky-300 mb-1">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              Newly Added Vendor
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Added after auction float by{' '}
              <span className="text-white font-medium">{addedBy || 'Buyer'}</span> on{' '}
              <span className="font-mono text-white">{addedAt || 'Sep 23, 2026'}</span>.
            </p>
            <div className="mt-1.5 pt-1.5 border-t border-slate-700/80 text-[10px] text-sky-200/90 flex items-center gap-1">
              <span>✓ Can be removed prior to round closing.</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
      <Check className="w-3 h-3 text-emerald-600" />
      <span>Available</span>
    </span>
  );
};
