import React, { useState } from 'react';
import { INITIAL_VENDORS } from './data/mockVendors';
import { Vendor } from './types';
import { VendorsSelectedTable } from './components/VendorsSelectedTable';
import { AddVendorsDrawer } from './components/AddVendorsDrawer';
import { Toast, ToastMessage } from './components/Toast';
import { RotateCcw } from 'lucide-react';

export default function App() {
  // Master category vendors list
  const [allCategoryVendors, setAllCategoryVendors] = useState<Vendor[]>(INITIAL_VENDORS);

  // Side drawer open state
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);

  // Toast notifications for user feedback
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Participating vendors in auction: floated + post_float
  const participatingVendors = allCategoryVendors.filter(
    (v) => v.inclusionStatus === 'floated' || v.inclusionStatus === 'post_float'
  );

  // Handle Add Vendors from Drawer
  const handleAddVendors = (selectedIds: string[]) => {
    setAllCategoryVendors((prev) =>
      prev.map((vendor) => {
        // If it was floated, keep it floated (cannot be modified)
        if (vendor.inclusionStatus === 'floated') {
          return vendor;
        }

        // If it is in the selected list, mark it as post_float
        if (selectedIds.includes(vendor.id)) {
          return {
            ...vendor,
            inclusionStatus: 'post_float',
            addedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            addedBy: 'Buyer',
          };
        }

        // Otherwise mark as available
        return {
          ...vendor,
          inclusionStatus: 'available',
        };
      })
    );

    const newlyAddedCount = selectedIds.filter((id) => {
      const v = allCategoryVendors.find((item) => item.id === id);
      return v && v.inclusionStatus !== 'floated';
    }).length;

    setToast({
      id: `add-${Date.now()}`,
      type: 'success',
      title: 'Vendors Updated',
      description: `${newlyAddedCount} vendor(s) currently added post-float. They can be removed if required.`,
    });
  };

  // Handle Remove post-float vendor
  const handleRemoveVendor = (vendor: Vendor) => {
    if (vendor.inclusionStatus === 'floated') {
      setToast({
        id: `lock-${Date.now()}`,
        type: 'warning',
        title: 'Vendor Locked',
        description: `${vendor.vendorName} was included at auction float and cannot be removed.`,
      });
      return;
    }

    setAllCategoryVendors((prev) =>
      prev.map((v) => (v.id === vendor.id ? { ...v, inclusionStatus: 'available' } : v))
    );

    setToast({
      id: `remove-${Date.now()}`,
      type: 'info',
      title: 'Vendor Removed',
      description: `${vendor.vendorName} (${vendor.vendorCode}) has been removed from the auction.`,
    });
  };

  // When user clicks locked vendor
  const handleLockedClick = (vendor: Vendor) => {
    setToast({
      id: `locked-${Date.now()}`,
      type: 'warning',
      title: `${vendor.vendorName} is Locked`,
      description: 'Part of the auction float roster. Existing tender participants cannot be removed.',
    });
  };

  // Reset to original data state
  const handleReset = () => {
    setAllCategoryVendors(INITIAL_VENDORS);
    setToast({
      id: `reset-${Date.now()}`,
      type: 'info',
      title: 'Data Reset',
      description: 'Restored initial state with 2 floated vendors and 2 post-float vendors.',
    });
  };

  return (
    <div className="min-h-screen bg-[#edf2f8] p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-start font-sans selection:bg-[#e2edf8] selection:text-[#0066d6]">
      {/* Subtle top indicator bar */}
      <div className="w-full max-w-7xl flex items-center justify-between mb-3 text-xs text-[#546e7a]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="font-semibold text-[#1e293b]">Auction Status: Floated</span>
          <span className="text-[#94a3b8]">|</span>
          <span className="text-[#64748b]">Existing vendors locked · Additional vendors removable</span>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0066d6] hover:text-[#0055b8] bg-white border border-[#bed4ee] px-2.5 py-1 rounded hover:bg-[#f0f7ff] transition-colors cursor-pointer"
          title="Reset back to initial demo data"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Demo</span>
        </button>
      </div>

      {/* Main Container - Exact "VENDORS SELECTED" Card from Screenshot 1 */}
      <div className="w-full max-w-7xl">
        <VendorsSelectedTable
          vendors={participatingVendors}
          onOpenAddDrawer={() => setIsAddDrawerOpen(true)}
          onRemoveVendor={handleRemoveVendor}
          onLockedClick={handleLockedClick}
        />
      </div>

      {/* Side Drawer - Exact "Select More Vendors" Drawer from Screenshot 2 */}
      <AddVendorsDrawer
        isOpen={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
        categoryVendors={allCategoryVendors}
        onAddVendors={handleAddVendors}
      />

      {/* Feedback Toast */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
