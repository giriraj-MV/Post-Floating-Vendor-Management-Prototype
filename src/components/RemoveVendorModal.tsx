import React, { useState } from 'react';
import { AlertTriangle, X, ShieldCheck } from 'lucide-react';
import { Vendor } from '../types';

interface RemoveVendorModalProps {
  vendor: Vendor | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (vendorId: string, reason: string) => void;
}

export const RemoveVendorModal: React.FC<RemoveVendorModalProps> = ({
  vendor,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [reason, setReason] = useState('Added in error / redundant');

  if (!isOpen || !vendor) return null;

  const handleConfirm = () => {
    onConfirm(vendor.id, reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-rose-600">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-semibold text-sm text-slate-900">
              Remove Post-Float Vendor
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-lg text-xs text-amber-900 space-y-1">
            <div className="font-semibold flex items-center gap-1.5 text-amber-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              Verified Permissible Action
            </div>
            <p className="text-[11px] text-amber-800/90 leading-relaxed">
              This vendor was added <strong>post-float</strong> on{' '}
              <span className="font-mono">{vendor.addedAt || 'today'}</span>. Unlike
              original pre-floated vendors, newly added vendors may be removed before
              auction close.
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Vendor:</span>
              <span className="font-semibold text-slate-800">{vendor.vendorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Vendor Code:</span>
              <span className="font-mono text-slate-700">{vendor.vendorCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Country / Location:</span>
              <span className="text-slate-700">
                {vendor.country} ({vendor.location === 'L' ? 'Local' : 'International'})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Added By:</span>
              <span className="text-slate-700">{vendor.addedBy || 'Giriraj (Buyer)'}</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-700">
              Procurement Audit Reason
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            >
              <option value="Added in error / redundant">Added in error / redundant</option>
              <option value="Vendor unable to meet delivery lead time">Vendor unable to meet delivery lead time</option>
              <option value="Technical compliance review pending">Technical compliance review pending</option>
              <option value="Requested by Category Manager">Requested by Category Manager</option>
              <option value="Commercial qualification mismatch">Commercial qualification mismatch</option>
            </select>
          </div>

          <p className="text-[11px] text-slate-500 italic">
            Note: Once removed, this vendor will be returned to the general category pool and may be re-added if necessary.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 px-5 py-3 bg-slate-50 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs transition-colors"
          >
            Confirm & Remove Vendor
          </button>
        </div>
      </div>
    </div>
  );
};
