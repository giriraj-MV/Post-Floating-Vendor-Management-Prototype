import React from 'react';
import {
  X,
  Sparkles,
  Lock,
  Zap,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Eye,
  Layers,
} from 'lucide-react';

interface UXGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UXGuideModal: React.FC<UXGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                UX Improvement Rationale & Heuristics
              </h3>
              <p className="text-[11px] text-slate-500">
                Addressing post-floating vendor management ambiguity
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* Executive Summary */}
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-lg space-y-1">
            <div className="font-bold text-blue-900 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-blue-600" />
              <span>Core User Challenge Solved</span>
            </div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              In the legacy system, buyers could not tell <em>why</em> some vendors were locked while others could be added or removed. The side drawer did not convey vendor status, creating confusion about whether unchecking a floated vendor would fail or cause errors.
            </p>
          </div>

          {/* Key Improvements Breakdown */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              5 Essential UX Enhancements
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Card 1: Clear Visual Differentiation */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <div className="w-5 h-5 rounded bg-slate-200 flex items-center justify-center text-slate-700">
                    <Lock className="w-3 h-3" />
                  </div>
                  <span>1. Explicit Lock Indicators</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-normal">
                  Existing floated vendors feature a persistent <strong>🔒 Floated (Locked)</strong> badge with a disabled action icon and explanatory tooltips preventing wasted clicks.
                </p>
              </div>

              {/* Card 2: Removable Post-Float Tags */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <div className="w-5 h-5 rounded bg-indigo-100 flex items-center justify-center text-indigo-700">
                    <Zap className="w-3 h-3" />
                  </div>
                  <span>2. Post-Float Removable State</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-normal">
                  Vendors added post-float display <strong>⚡ Post-Float</strong> tags, added timestamps, and active "Remove" buttons with confirmation dialogues.
                </p>
              </div>

              {/* Card 3: Intelligent Side Drawer */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <div className="w-5 h-5 rounded bg-amber-100 flex items-center justify-center text-amber-700">
                    <ShieldCheck className="w-3 h-3" />
                  </div>
                  <span>3. Error-Proof Drawer Locking</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-normal">
                  In the "Select More Vendors" drawer, pre-floated vendors have disabled checkboxes with lock badges, stopping accidental deselect attempts before they happen.
                </p>
              </div>

              {/* Card 4: Tabbed Drawer Segmentation */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <div className="w-5 h-5 rounded bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <Layers className="w-3 h-3" />
                  </div>
                  <span>4. Quick Tab Filtering</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-normal">
                  Buyers can switch between <em>Available to Add</em> and <em>Already in Auction</em> tabs in the drawer, focusing solely on candidates ready for invitation.
                </p>
              </div>
            </div>
          </div>

          {/* Heuristic Matrix */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-100 px-3 py-2 font-semibold text-slate-800 border-b border-slate-200">
              Nielsen Norman Group Heuristic Alignment
            </div>
            <div className="divide-y divide-slate-200 text-[11px]">
              <div className="p-2.5 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Visibility of System Status:</strong> Auction float state and lock reasons are immediately prominent, not hidden behind error dialogs.
                </div>
              </div>
              <div className="p-2.5 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Error Prevention:</strong> Checkboxes for floated vendors cannot be unchecked in the drawer, avoiding illegal state transitions.
                </div>
              </div>
              <div className="p-2.5 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Recognition over Recall:</strong> Badges like [A] [G] [M] [P] provide contextual tooltips so buyers don't have to memorize acronyms.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-3 bg-slate-50 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
