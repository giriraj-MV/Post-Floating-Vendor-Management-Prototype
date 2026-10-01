import React, { useState } from 'react';
import { VendorStatusTag } from '../types';
import { STATUS_DEFINITIONS } from '../data/mockVendors';

interface VendorStatusBadgeProps {
  statusTags: VendorStatusTag[];
}

export const VendorStatusBadge: React.FC<VendorStatusBadgeProps> = ({ statusTags }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // All 4 standard tags in procurement system: A, G, M, P
  const allTags: VendorStatusTag[] = ['A', 'G', 'M', 'P'];

  return (
    <div className="inline-flex items-center gap-1">
      {allTags.map((tag) => {
        const isPresent = statusTags.includes(tag);
        const def = STATUS_DEFINITIONS[tag];

        return (
          <div key={tag} className="relative">
            <button
              type="button"
              onMouseEnter={() => setActiveTooltip(tag)}
              onMouseLeave={() => setActiveTooltip(null)}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTooltip(activeTooltip === tag ? null : tag);
              }}
              className={`w-5 h-5 rounded text-[11px] font-semibold flex items-center justify-center border transition-colors ${
                isPresent
                  ? 'border-sky-300 text-sky-700 bg-sky-50 hover:bg-sky-100'
                  : 'border-slate-200 text-slate-300 bg-slate-50 cursor-default'
              }`}
              title={`${def.tag}: ${def.fullName}`}
            >
              {tag}
            </button>

            {activeTooltip === tag && (
              <div className="absolute z-40 bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-52 p-2 bg-slate-900 text-white rounded shadow-xl text-left pointer-events-none">
                <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-700">
                  <span className="font-semibold text-xs text-sky-400">
                    [{tag}] {def.label}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                    {isPresent ? 'Verified' : 'Inactive'}
                  </span>
                </div>
                <p className="text-[11px] leading-snug text-slate-300">
                  {def.fullName}
                </p>
                <p className="text-[10px] leading-tight text-slate-400 mt-1">
                  {def.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
