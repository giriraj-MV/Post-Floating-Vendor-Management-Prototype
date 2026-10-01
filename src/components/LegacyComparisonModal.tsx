import React, { useState } from 'react';
import {
  X,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Zap,
  SlidersHorizontal,
  Layers,
} from 'lucide-react';

interface LegacyComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegacyComparisonModal: React.FC<LegacyComparisonModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'main_screen' | 'drawer'>('main_screen');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Legacy vs. Improved Experience Comparison
              </h3>
              <p className="text-[11px] text-slate-500">
                Direct side-by-side analysis of the workflow improvements
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

        {/* View Switcher Tabs */}
        <div className="px-6 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setActiveTab('main_screen')}
              className={`px-3 py-1 rounded font-medium transition-all ${
                activeTab === 'main_screen'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1. Main Auction Screen (Vendors Selected Table)
            </button>
            <button
              onClick={() => setActiveTab('drawer')}
              className={`px-3 py-1 rounded font-medium transition-all ${
                activeTab === 'drawer'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2. Add Vendors Side Drawer
            </button>
          </div>
        </div>

        {/* Comparison Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          {activeTab === 'main_screen' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Legacy Problems */}
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-3">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Legacy Screen (Pain Points)</span>
                </div>

                <div className="space-y-2.5 text-[11px] text-slate-700">
                  <div className="bg-white p-3 rounded-lg border border-rose-200 space-y-1">
                    <strong className="text-rose-900">Zero Visual Differentiation:</strong>
                    <p className="text-slate-600">
                      All vendors look identical in the table. Users have no way to know who was part of the original auction float and who was added later.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-rose-200 space-y-1">
                    <strong className="text-rose-900">Missing / Unclear Removal Actions:</strong>
                    <p className="text-slate-600">
                      No indication why some vendors cannot be deleted. If a delete action existed, it either failed with generic errors or was absent altogether.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-rose-200 space-y-1">
                    <strong className="text-rose-900">No Audit Trail:</strong>
                    <p className="text-slate-600">
                      Lacked timestamps or user attribution showing when vendors were included in the auction.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-rose-200 space-y-1">
                    <strong className="text-rose-900">Cryptic Status Codes:</strong>
                    <p className="text-slate-600">
                      [A] [G] [M] [P] boxes had no tooltips, forcing buyers to memorize internal acronyms.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Improved Solution */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Improved Solution (In This Prototype)</span>
                </div>

                <div className="space-y-2.5 text-[11px] text-slate-700">
                  <div className="bg-white p-3 rounded-lg border border-emerald-200 space-y-1">
                    <strong className="text-emerald-900 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-slate-600" />
                      Clear "Floated (Locked)" Badge:
                    </strong>
                    <p className="text-slate-600">
                      Immediately signals that pre-existing vendors are permanent participants. Disabled action button with tooltip explains tender integrity rule.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-emerald-200 space-y-1">
                    <strong className="text-indigo-900 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-indigo-600" />
                      Distinct "Post-Float (Removable)" State:
                    </strong>
                    <p className="text-slate-600">
                      Newly added vendors feature prominent badges, active "Remove" buttons, and an audit-safe confirmation modal with reason logging.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-emerald-200 space-y-1">
                    <strong className="text-emerald-900">Summary KPI Counters:</strong>
                    <p className="text-slate-600">
                      Header clearly displays exact counts: Total Invited, Floated (Locked), Newly Added, and Category Pool availability.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-emerald-200 space-y-1">
                    <strong className="text-emerald-900">Interactive Status Explanations:</strong>
                    <p className="text-slate-600">
                      Hovering on [A], [G], [M], or [P] reveals complete certification definitions and compliance verification states.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Legacy Drawer Problems */}
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-3">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Legacy Side Drawer (Pain Points)</span>
                </div>

                <div className="space-y-2.5 text-[11px] text-slate-700">
                  <div className="bg-white p-3 rounded-lg border border-rose-200 space-y-1">
                    <strong className="text-rose-900">Ambiguous Checkboxes:</strong>
                    <p className="text-slate-600">
                      All checkboxes appeared active. If a buyer unchecks an already-floated vendor, nothing clearly stopped them until hitting "Save" or causing silent failures.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-rose-200 space-y-1">
                    <strong className="text-rose-900">Unfiltered Category Clutter:</strong>
                    <p className="text-slate-600">
                      Already-invited vendors were mixed together with available vendors without separate views or status headers.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-rose-200 space-y-1">
                    <strong className="text-rose-900">No Selection Feedback:</strong>
                    <p className="text-slate-600">
                      Lacked a real-time summary of which vendors are currently being selected to add post-float.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Improved Drawer Solution */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Improved Side Drawer (In This Prototype)</span>
                </div>

                <div className="space-y-2.5 text-[11px] text-slate-700">
                  <div className="bg-white p-3 rounded-lg border border-emerald-200 space-y-1">
                    <strong className="text-emerald-900 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-slate-600" />
                      Locked Checkbox with Padlock Icon:
                    </strong>
                    <p className="text-slate-600">
                      Floated vendors are permanently checked with a subtle padlock icon. Hovering directly informs the buyer that this vendor cannot be deselected.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-emerald-200 space-y-1">
                    <strong className="text-emerald-900">Quick Segmented Tabs:</strong>
                    <p className="text-slate-600">
                      Pre-filtered tabs: <em>Available to Add (5)</em>, <em>Already in Auction (4)</em>, and <em>All Category Pool (9)</em> so buyers focus on eligible additions.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-emerald-200 space-y-1">
                    <strong className="text-emerald-900">Dynamic Floating Action Bar:</strong>
                    <p className="text-slate-600">
                      Shows exact vendor names selected in the session, button changes to "ADD 2 VENDORS", and notifies user they will be added as removable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-t border-slate-200">
          <span className="text-[11px] text-slate-500">
            Click outside or press Close to return to the interactive prototype
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Back to Interactive Prototype
          </button>
        </div>
      </div>
    </div>
  );
};
