import React from 'react';
import { Lock, X, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { Vendor } from '../types';

interface LockedVendorModalProps {
  vendor: Vendor | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenAddDrawer: () => void;
}

export const LockedVendorModal: React.FC<LockedVendorModalProps> = ({
  vendor,
  isOpen,
  onClose,
  onOpenAddDrawer,
}) => {
  if (!isOpen || !vendor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2 text-slate-800">
            <div className="w-7 h-7 rounded-lg bg-slate-200 flex items-center justify-center text-slate-700">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-slate-900">
                Vendor Locked (Floated Participant)
              </h3>
              <p className="text-[11px] text-slate-500">
                Pre-float inclusion cannot be revoked
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs text-slate-700">
          <div className="p-3 bg-slate-100 border border-slate-200 rounded-lg space-y-1">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-slate-600" />
              <span>Procurement Tender Rule 4.2</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              <strong>{vendor.vendorName}</strong> ({vendor.vendorCode}) was part of the initial vendor roster when this auction was floated on{' '}
              <span className="font-mono text-slate-900">{vendor.floatedAt || 'Sep 20, 2026 10:30 AM'}</span>.
            </p>
          </div>

          <div className="space-y-2 text-slate-600">
            <p>
              To maintain tender transparency, auditability, and fair market competition, pre-float vendors cannot be removed once the bidding event is live.
            </p>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg space-y-1 text-blue-900">
              <span className="font-semibold block">Need to expand participation?</span>
              <p className="text-[11px] text-blue-800 leading-relaxed">
                You can freely add additional category vendors at any time. Vendors added after the float can be removed if required.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenAddDrawer();
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
          >
            <span>Add Additional Vendors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
