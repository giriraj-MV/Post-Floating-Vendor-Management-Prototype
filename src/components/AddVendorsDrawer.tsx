import React, { useState, useMemo, useEffect } from 'react';
import { List, MoreVertical } from 'lucide-react';
import { Vendor, VendorStatusTag } from '../types';

interface AddVendorsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categoryVendors: Vendor[];
  onAddVendors: (vendorIds: string[]) => void;
}

export const AddVendorsDrawer: React.FC<AddVendorsDrawerProps> = ({
  isOpen,
  onClose,
  categoryVendors,
  onAddVendors,
}) => {
  // Column search filters matching Screenshot 2
  const [vendorNameFilter, setVendorNameFilter] = useState('');
  const [vendorStatusFilter, setVendorStatusFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('');
  const [industryTypeFilter, setIndustryTypeFilter] = useState('All');

  // Filter out locked / floated vendors - DO NOT show locked vendors in side drawer
  const eligibleVendors = useMemo(() => {
    return categoryVendors.filter((v) => v.inclusionStatus !== 'floated');
  }, [categoryVendors]);

  // Track checked state: vendorId -> boolean
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

  // When drawer opens, initialize checkboxes with vendors currently added post-float
  useEffect(() => {
    if (isOpen) {
      const initial: Record<string, boolean> = {};
      eligibleVendors.forEach((v) => {
        if (v.inclusionStatus === 'post_float') {
          initial[v.id] = true;
        }
      });
      setCheckedMap(initial);
    }
  }, [isOpen, eligibleVendors]);

  // Unique industry options for dropdown
  const industries = useMemo(() => {
    const list = Array.from(
      new Set(eligibleVendors.map((v) => v.industryType).filter(Boolean))
    );
    return ['All', ...list];
  }, [eligibleVendors]);

  // Filtered vendors based on column search
  const filteredVendors = useMemo(() => {
    return eligibleVendors.filter((v) => {
      if (vendorNameFilter.trim()) {
        const q = vendorNameFilter.toLowerCase();
        const matches =
          v.vendorName.toLowerCase().includes(q) ||
          v.vendorCode.toLowerCase().includes(q);
        if (!matches) return false;
      }

      if (vendorStatusFilter !== 'All') {
        if (!v.statusTags.includes(vendorStatusFilter as VendorStatusTag)) return false;
      }

      if (countryFilter.trim()) {
        if (!v.country.toLowerCase().includes(countryFilter.toLowerCase())) return false;
      }

      if (industryTypeFilter !== 'All') {
        if (v.industryType !== industryTypeFilter) return false;
      }

      return true;
    });
  }, [eligibleVendors, vendorNameFilter, vendorStatusFilter, countryFilter, industryTypeFilter]);

  // Total checked count for the red badge
  const totalCheckedCount = useMemo(() => {
    return Object.values(checkedMap).filter(Boolean).length;
  }, [checkedMap]);

  // Toggle individual checkbox
  const handleToggle = (vendorId: string) => {
    setCheckedMap((prev) => ({
      ...prev,
      [vendorId]: !prev[vendorId],
    }));
  };

  // Toggle all filtered checkboxes
  const handleToggleAll = () => {
    const allFilteredChecked = filteredVendors.every((v) => checkedMap[v.id]);
    setCheckedMap((prev) => {
      const updated = { ...prev };
      filteredVendors.forEach((v) => {
        updated[v.id] = !allFilteredChecked;
      });
      return updated;
    });
  };

  const isAllChecked =
    filteredVendors.length > 0 && filteredVendors.every((v) => checkedMap[v.id]);

  // Save changes
  const handleSave = () => {
    const selectedIds = Object.keys(checkedMap).filter((id) => checkedMap[id]);
    onAddVendors(selectedIds);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/40 transition-opacity"
        onClick={onClose}
      />

      {/* Slide-in Drawer - Exact Layout from Screenshot 2 */}
      <div className="fixed inset-y-0 right-0 w-[780px] max-w-full bg-white shadow-2xl flex flex-col border-l border-[#b8cfe6] z-50 animate-in slide-in-from-right duration-200">
        {/* Top Header: "Select More Vendors" and "X" */}
        <div className="px-5 py-3 border-b border-[#c8daf0] flex items-center justify-between bg-white shrink-0">
          <h2 className="font-bold text-[14px] text-[#1e293b]">
            Select More Vendors
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[#64748b] hover:text-[#1e293b] p-1 text-[18px] font-bold leading-none cursor-pointer transition-colors"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Sub-bar: "VENDOR SELECT" on left, list icon with red badge & Kebab menu on right */}
        <div className="px-5 py-2.5 flex items-center justify-between border-b border-[#e2edf8] bg-white shrink-0">
          <span className="font-bold uppercase text-[11px] text-[#334155] tracking-wide">
            VENDOR SELECT
          </span>

          <div className="flex items-center gap-3">
            {/* List icon with Red Badge showing checked count (matches "2" in Screenshot 2) */}
            <div className="relative flex items-center justify-center p-1 text-[#475569]">
              <List className="w-5 h-5 text-[#334155]" />
              <span className="absolute -top-1 -right-1 bg-[#dc2626] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalCheckedCount}
              </span>
            </div>

            {/* Kebab 3-dots menu */}
            <button
              type="button"
              className="text-[#475569] hover:text-[#1e293b] p-1 cursor-pointer"
              title="Options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table Area matching Screenshot 2 */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse text-[12px]">
            <thead className="sticky top-0 bg-white z-10">
              {/* Header Row */}
              <tr className="bg-white text-[#486581] uppercase font-semibold text-[11px] tracking-tight border-b border-[#cbdff2]">
                <th className="w-9 py-2.5 px-2 text-center text-[#546e7a]">
                  #
                </th>
                <th className="w-8 py-2.5 px-1 text-center">
                  <input
                    type="checkbox"
                    checked={isAllChecked}
                    onChange={handleToggleAll}
                    className="w-4 h-4 text-[#0066d6] rounded border-[#a4c2df] focus:ring-[#0066d6] cursor-pointer"
                    title="Select / Deselect all"
                  />
                </th>
                <th className="py-2.5 px-3 border-l border-[#d3e2f2]">
                  ACTION: VENDOR NAME
                </th>
                <th className="py-2.5 px-3 border-l border-[#d3e2f2]">
                  VENDOR STATUS
                </th>
                <th className="py-2.5 px-3 border-l border-[#d3e2f2]">
                  COUNTRY
                </th>
                <th className="py-2.5 px-3 border-l border-[#d3e2f2]">
                  LOCATION
                </th>
                <th className="py-2.5 px-3 border-l border-[#d3e2f2]">
                  INDUSTRY TYPE
                </th>
              </tr>

              {/* Filter Row matching Screenshot 2 */}
              <tr className="bg-[#f8fbfe] border-b border-[#cbdff2]">
                <th className="p-1.5 text-center"></th>
                <th className="p-1.5 text-center"></th>

                {/* Under ACTION: VENDOR NAME */}
                <th className="p-1.5 border-l border-[#d3e2f2]">
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={vendorNameFilter}
                      onChange={(e) => setVendorNameFilter(e.target.value)}
                      placeholder=""
                      className="h-[26px] w-full px-2 text-[12px] border border-[#a4c2df] rounded-[4px] focus:outline-none focus:border-[#0066d6] bg-white text-[#334155]"
                    />
                    <button
                      type="button"
                      onClick={() => setVendorNameFilter('')}
                      className="w-[18px] h-[18px] rounded-full bg-[#d8e7f5] hover:bg-[#c2daf0] text-[#456182] flex items-center justify-center text-[10px] font-bold shrink-0"
                    >
                      X
                    </button>
                  </div>
                </th>

                {/* Under VENDOR STATUS */}
                <th className="p-1.5 border-l border-[#d3e2f2]">
                  <div className="flex items-center gap-1">
                    <select
                      value={vendorStatusFilter}
                      onChange={(e) => setVendorStatusFilter(e.target.value)}
                      className="h-[26px] w-full px-1 text-[12px] border border-[#a4c2df] rounded-[4px] focus:outline-none focus:border-[#0066d6] bg-white text-[#334155]"
                    >
                      <option value="All">All</option>
                      <option value="A">A</option>
                      <option value="G">G</option>
                      <option value="M">M</option>
                      <option value="P">P</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => setVendorStatusFilter('All')}
                      className="w-[18px] h-[18px] rounded-full bg-[#d8e7f5] hover:bg-[#c2daf0] text-[#456182] flex items-center justify-center text-[10px] font-bold shrink-0"
                    >
                      X
                    </button>
                  </div>
                </th>

                {/* Under COUNTRY */}
                <th className="p-1.5 border-l border-[#d3e2f2]">
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={countryFilter}
                      onChange={(e) => setCountryFilter(e.target.value)}
                      placeholder=""
                      className="h-[26px] w-full px-2 text-[12px] border border-[#a4c2df] rounded-[4px] focus:outline-none focus:border-[#0066d6] bg-white text-[#334155]"
                    />
                    <button
                      type="button"
                      onClick={() => setCountryFilter('')}
                      className="w-[18px] h-[18px] rounded-full bg-[#d8e7f5] hover:bg-[#c2daf0] text-[#456182] flex items-center justify-center text-[10px] font-bold shrink-0"
                    >
                      X
                    </button>
                  </div>
                </th>

                {/* Under LOCATION */}
                <th className="p-1.5 border-l border-[#d3e2f2]"></th>

                {/* Under INDUSTRY TYPE */}
                <th className="p-1.5 border-l border-[#d3e2f2]">
                  <div className="flex items-center gap-1">
                    <select
                      value={industryTypeFilter}
                      onChange={(e) => setIndustryTypeFilter(e.target.value)}
                      className="h-[26px] w-full px-1 text-[12px] border border-[#a4c2df] rounded-[4px] focus:outline-none focus:border-[#0066d6] bg-white text-[#334155]"
                    >
                      {industries.map((ind) => (
                        <option key={ind} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setIndustryTypeFilter('All')}
                      className="w-[18px] h-[18px] rounded-full bg-[#d8e7f5] hover:bg-[#c2daf0] text-[#456182] flex items-center justify-center text-[10px] font-bold shrink-0"
                    >
                      X
                    </button>
                  </div>
                </th>
              </tr>
            </thead>

            {/* Table Rows matching Screenshot 2 */}
            <tbody className="divide-y divide-[#e2eaf4]">
              {filteredVendors.map((vendor, idx) => {
                const isChecked = !!checkedMap[vendor.id];

                // Checked rows in Screenshot 2 have the mint-green background: #dcf2e3 / #d8eedd
                const rowBgClass = isChecked
                  ? 'bg-[#dcf2e3]'
                  : 'bg-white hover:bg-[#f8fbfe]';

                return (
                  <tr
                    key={vendor.id}
                    onClick={() => handleToggle(vendor.id)}
                    className={`transition-colors cursor-pointer ${rowBgClass}`}
                  >
                    {/* Index */}
                    <td className="py-2.5 px-2 text-center text-[#546e7a] font-medium">
                      {idx + 1}
                    </td>

                    {/* Checkbox */}
                    <td
                      className="py-2.5 px-1 text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggle(vendor.id)}
                        className="w-4 h-4 text-[#0066d6] rounded border-[#a4c2df] focus:ring-[#0066d6] cursor-pointer"
                      />
                    </td>

                    {/* Avatar + Vendor Name + Subtext */}
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-[28px] h-[28px] rounded-full bg-[#536b85] text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                          {vendor.avatarText}
                        </div>
                        <div>
                          <div className="text-[#0066cc] font-bold text-[13px] leading-tight hover:underline">
                            {vendor.vendorName}
                          </div>
                          <div className="text-[#546e7a] text-[11px] font-mono leading-tight mt-0.5">
                            {vendor.vendorCode}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Status Badges [A] [G] [M] [P] */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        {(['A', 'G', 'M', 'P'] as VendorStatusTag[]).map((tag) => {
                          const isActive = vendor.statusTags.includes(tag);
                          return (
                            <div
                              key={tag}
                              className={`w-[19px] h-[19px] rounded-[3px] border flex items-center justify-center text-[10px] font-bold ${
                                isActive
                                  ? 'border-[#9ec1e6] text-[#0066cc] bg-[#f2f7fc]'
                                  : 'border-[#cfdbe8] text-[#8fa7c2] bg-[#fbfcfe]'
                              }`}
                            >
                              {tag}
                            </div>
                          );
                        })}
                      </div>
                    </td>

                    {/* Country */}
                    <td className="py-2.5 px-3 text-[#334155]">
                      {vendor.country}
                    </td>

                    {/* Location */}
                    <td className="py-2.5 px-3 text-[#334155] font-medium">
                      {vendor.location}
                    </td>

                    {/* Industry Type */}
                    <td className="py-2.5 px-3 text-[#334155]">
                      {vendor.industryType || ''}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer matching Screenshot 2 */}
        <div className="p-3 bg-[#f5f8fb] border-t border-[#d8e5f2] shrink-0">
          {/* Action Buttons: CANCEL & ADD VENDORS */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-[12px] font-bold text-[#0066d6] border border-[#0066d6] bg-white hover:bg-[#f0f7ff] rounded-[4px] uppercase tracking-wider transition-colors cursor-pointer"
            >
              CANCEL
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 text-[12px] font-bold text-white bg-[#0066d6] hover:bg-[#0055b8] rounded-[4px] uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
            >
              ADD VENDORS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
