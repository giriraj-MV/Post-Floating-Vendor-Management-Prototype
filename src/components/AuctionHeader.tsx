import React from 'react';
import {
  Lock,
  Zap,
  Info,
  Layers,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Building,
  Calendar,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { AuctionDetails } from '../types';

interface AuctionHeaderProps {
  auction: AuctionDetails;
  floatedCount: number;
  postFloatCount: number;
  totalCategoryCount: number;
  onOpenUXGuide: () => void;
  onOpenComparison: () => void;
  onResetData: () => void;
}

export const AuctionHeader: React.FC<AuctionHeaderProps> = ({
  auction,
  floatedCount,
  postFloatCount,
  totalCategoryCount,
  onOpenUXGuide,
  onOpenComparison,
  onResetData,
}) => {
  const totalInvited = floatedCount + postFloatCount;

  return (
    <div className="bg-white border-b border-slate-200 shadow-xs">
      {/* Top Breadcrumb & Status Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-3">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <span>Procurement Portal</span>
            <span>/</span>
            <span>Live Auctions</span>
            <span>/</span>
            <span className="font-mono text-slate-900 font-semibold">{auction.code}</span>
            <span>/</span>
            <span className="text-blue-600 font-semibold">Post-Float Vendor Management</span>
          </div>

          {/* Prototype Quick Utility CTAs */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenUXGuide}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-300/80"
              title="View design heuristic analysis and problem-solution breakdown"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>UX Improvements Guide</span>
            </button>

            <button
              onClick={onOpenComparison}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
              title="Compare old ambiguous screen vs new improved design"
            >
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Before vs. After Comparison</span>
            </button>

            <button
              onClick={onResetData}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              title="Reset mock data to initial post-float state"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Auction Title & Meta */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                {auction.title}
              </h1>
              {/* Status Pill */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                <span>FLOATED (LIVE)</span>
              </div>
            </div>

            {/* Natural unboxed metadata line */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 mt-2">
              <span className="font-semibold text-slate-700">Category:</span>
              <span className="text-slate-900 font-medium">{auction.category}</span>
              <span className="font-mono text-slate-400">({auction.categoryId})</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="font-semibold text-slate-700">Floated On:</span>
              <span className="text-slate-900">{auction.floatedAt}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="font-semibold text-slate-700">Floated By:</span>
              <span className="text-slate-900">{auction.floatedBy}</span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-2 sm:gap-4 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            {/* Metric 1: Total Invited */}
            <div className="px-3 py-1 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Total Invited
              </div>
              <div className="text-lg font-extrabold text-slate-900 font-mono">
                {totalInvited}
              </div>
            </div>

            <div className="w-px h-8 bg-slate-200" />

            {/* Metric 2: Floated (Locked) */}
            <div className="px-3 py-1 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-600 tracking-wider flex items-center justify-center gap-1">
                <Lock className="w-2.5 h-2.5 text-slate-500" />
                <span>Floated (Locked)</span>
              </div>
              <div className="text-lg font-extrabold text-slate-800 font-mono">
                {floatedCount}
              </div>
            </div>

            <div className="w-px h-8 bg-slate-200" />

            {/* Metric 3: Added Post-Float */}
            <div className="px-3 py-1 text-center">
              <div className="text-[10px] uppercase font-bold text-indigo-700 tracking-wider flex items-center justify-center gap-1">
                <Zap className="w-2.5 h-2.5 text-indigo-600" />
                <span>Post-Float Added</span>
              </div>
              <div className="text-lg font-extrabold text-indigo-700 font-mono">
                {postFloatCount}
              </div>
            </div>

            <div className="w-px h-8 bg-slate-200" />

            {/* Metric 4: Category Pool */}
            <div className="px-3 py-1 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Category Pool
              </div>
              <div className="text-lg font-extrabold text-slate-600 font-mono">
                {totalCategoryCount}
              </div>
            </div>
          </div>
        </div>

        {/* Business Rule Notice Callout */}
        <div className="mt-3 py-2 px-3 bg-amber-50/70 border border-amber-200/80 rounded-lg flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Tender Governance Policy:</strong> Because this auction has been floated, vendors participating at the float timestamp ({floatedCount}) are locked to preserve bid integrity. You may invite additional vendors linked to this category; newly added vendors ({postFloatCount}) can be removed if required.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
