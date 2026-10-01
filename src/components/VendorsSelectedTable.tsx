import React, { useState, useMemo } from 'react';
import { Trash2 } from 'lucide-react';
import { Vendor, VendorStatusTag } from '../types';

interface VendorsSelectedTableProps {
  vendors: Vendor[];
  onOpenAddDrawer: () => void;
  onRemoveVendor: (vendor: Vendor) => void;
  onLockedClick: (vendor: Vendor) => void;
}

export const VendorsSelectedTable: React.FC<VendorsSelectedTableProps> = ({
  vendors,
  onOpenAddDrawer,
  onRemoveVendor,
  onLockedClick,
}) => {
  // Column search filters matching screenshot 1
  const [vendorNameFilter, setVendorNameFilter] = useState('');
  const [vendorStatusFilter, setVendorStatusFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('');
  const [industryTypeFilter, setIndustryTypeFilter] = useState('All');

  // Filter logic
  const filteredVendors = useMemo(() => {
    return vendors.filter((v) => {
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
  }, [vendors, vendorNameFilter, vendorStatusFilter, countryFilter, industryTypeFilter]);

  // Industry unique options
  const industries = useMemo(() => {
    const list = Array.from(new Set(vendors.map((v) => v.industryType).filter(Boolean)));
    return ['All', ...list];
  }, [vendors]);

  return (
    <div className="w-full bg-white border border-[#bed4ee] rounded-[6px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden font-sans">
      {/* Top Card Header */}
      <div className="px-4 py-3 flex items-center justify-between bg-white border-b border-[#e2eaf4]">
        <div className="flex items-center gap-2">
          <h1 className="text-[#23395d] font-bold text-[13px] tracking-wide uppercase">
            VENDORS SELECTED
          </h1>
          <span className="text-[11px] text-[#5b7a9d] font-medium ml-1">
            ({vendors.length})
          </span>
        </div>

        <button
          type="button"
          onClick={onOpenAddDrawer}
          className="bg-[#0066d6] hover:bg-[#0055b8] active:bg-[#00479e] text-white text-[12px] font-semibold px-4 py-1.5 rounded-[4px] shadow-xs transition-colors cursor-pointer"
        >
          Add Vendors
        </button>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-[12px]">
          {/* Header Row */}
          <thead>
            <tr className="bg-white text-[#486581] uppercase font-semibold text-[11px] tracking-tight border-b border-[#cbdff2]">
              <th className="w-9 py-2.5 px-2 text-center text-[#546e7a]">#</th>
              <th className="py-2.5 px-3 border-l border-[#d3e2f2]">
                VENDOR NAME
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
              <th className="py-2.5 px-3 border-l border-[#d3e2f2] text-center w-28">
                ACTION
              </th>
            </tr>

            {/* Filter Row matching Screenshot 1 */}
            <tr className="bg-[#f8fbfe] border-b border-[#cbdff2]">
              {/* Column 1: Index blank */}
              <th className="p-1.5 text-center"></th>

              {/* Column 2: VENDOR NAME search input with (X) */}
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
                    title="Clear filter"
                    className="w-[18px] h-[18px] rounded-full bg-[#d8e7f5] hover:bg-[#c2daf0] text-[#456182] flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors"
                  >
                    X
                  </button>
                </div>
              </th>

              {/* Column 3: VENDOR STATUS dropdown with (X) */}
              <th className="p-1.5 border-l border-[#d3e2f2]">
                <div className="flex items-center gap-1">
                  <select
                    value={vendorStatusFilter}
                    onChange={(e) => setVendorStatusFilter(e.target.value)}
                    className="h-[26px] w-full px-1.5 text-[12px] border border-[#a4c2df] rounded-[4px] focus:outline-none focus:border-[#0066d6] bg-white text-[#334155]"
                  >
                    <option value="All">All</option>
                    <option value="A">A - Approved</option>
                    <option value="G">G - Green</option>
                    <option value="M">M - Master</option>
                    <option value="P">P - Preferred</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => setVendorStatusFilter('All')}
                    title="Clear filter"
                    className="w-[18px] h-[18px] rounded-full bg-[#d8e7f5] hover:bg-[#c2daf0] text-[#456182] flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors"
                  >
                    X
                  </button>
                </div>
              </th>

              {/* Column 5: COUNTRY input with (X) */}
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
                    title="Clear filter"
                    className="w-[18px] h-[18px] rounded-full bg-[#d8e7f5] hover:bg-[#c2daf0] text-[#456182] flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors"
                  >
                    X
                  </button>
                </div>
              </th>

              {/* Column 6: LOCATION */}
              <th className="p-1.5 border-l border-[#d3e2f2]"></th>

              {/* Column 7: INDUSTRY TYPE dropdown with (X) */}
              <th className="p-1.5 border-l border-[#d3e2f2]">
                <div className="flex items-center gap-1">
                  <select
                    value={industryTypeFilter}
                    onChange={(e) => setIndustryTypeFilter(e.target.value)}
                    className="h-[26px] w-full px-1.5 text-[12px] border border-[#a4c2df] rounded-[4px] focus:outline-none focus:border-[#0066d6] bg-white text-[#334155]"
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
                    title="Clear filter"
                    className="w-[18px] h-[18px] rounded-full bg-[#d8e7f5] hover:bg-[#c2daf0] text-[#456182] flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors"
                  >
                    X
                  </button>
                </div>
              </th>

              {/* Column 8: Action filter blank */}
              <th className="p-1.5 border-l border-[#d3e2f2]"></th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#e2eaf4]">
            {filteredVendors.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-[#64748b]">
                  No matching vendors found.
                </td>
              </tr>
            ) : (
              filteredVendors.map((vendor, idx) => {
                const isFloated = vendor.inclusionStatus === 'floated';
                const isPostFloat = vendor.inclusionStatus === 'post_float';

                return (
                  <tr
                    key={vendor.id}
                    className={`hover:bg-[#f8fbfe] transition-colors ${
                      isPostFloat ? 'bg-[#f5f9ff]' : 'bg-white'
                    }`}
                  >
                    {/* Index */}
                    <td className="py-2.5 px-2 text-center text-[#546e7a] font-medium">
                      {idx + 1}
                    </td>

                    {/* Vendor Name + Avatar Circle + Subtext */}
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-[28px] h-[28px] rounded-full bg-[#536b85] text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                          {vendor.avatarText}
                        </div>
                        <div>
                          <div className="text-[#0066cc] font-bold text-[13px] leading-tight hover:underline cursor-pointer">
                            {vendor.vendorName}
                          </div>
                          <div className="text-[#546e7a] text-[11px] font-mono leading-tight mt-0.5">
                            {vendor.vendorCode}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Vendor Status Badges [A] [G] [M] [P] */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        {(['A', 'G', 'M', 'P'] as VendorStatusTag[]).map((tag) => {
                          const isActive = vendor.statusTags.includes(tag);
                          return (
                            <div
                              key={tag}
                              className={`w-[19px] h-[19px] rounded-[3px] border flex items-center justify-center text-[10px] font-bold transition-colors ${
                                isActive
                                  ? 'border-[#9ec1e6] text-[#0066cc] bg-[#f2f7fc]'
                                  : 'border-[#cfdbe8] text-[#8fa7c2] bg-[#fbfcfe]'
                              }`}
                              title={
                                tag === 'A'
                                  ? 'Approved Vendor'
                                  : tag === 'G'
                                  ? 'Green / ESG Compliant'
                                  : tag === 'M'
                                  ? 'Master Agreement Active'
                                  : 'Preferred Supplier'
                              }
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

                    {/* Action Column */}
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      {isFloated ? (
                        <button
                          type="button"
                          disabled
                          onClick={() => onLockedClick(vendor)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium text-[#94a3b8] bg-[#f1f5f9] border border-[#e2e8f0] cursor-not-allowed opacity-50 select-none"
                          title="Disabled: Existing vendor included at auction float cannot be removed"
                        >
                          <Trash2 className="w-3 h-3 text-[#94a3b8]" />
                          <span>Remove</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onRemoveVendor(vendor)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold text-[#dc2626] bg-[#fef2f2] border border-[#fca5a5] hover:bg-[#fee2e2] transition-colors cursor-pointer"
                          title="Remove this newly added vendor"
                        >
                          <Trash2 className="w-3 h-3 text-[#dc2626]" />
                          <span>Remove</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer matching Screenshot 1 */}
      <div className="px-4 py-2.5 bg-[#f5f8fb] border-t border-[#d8e5f2] flex items-center justify-between text-[11px] text-[#546e7a]">
        {/* Pagination Nav */}
        <div className="flex items-center gap-2">
          {/* First */}
          <button
            type="button"
            className="text-[#546e7a] hover:text-[#1e293b] font-bold disabled:opacity-40"
            title="First Page"
          >
            |&lt;&lt;
          </button>
          {/* Prev */}
          <button
            type="button"
            className="text-[#546e7a] hover:text-[#1e293b] font-bold disabled:opacity-40"
            title="Previous Page"
          >
            &lt;
          </button>

          <span className="px-1">
            Page <span className="font-semibold text-[#1e293b]">1</span> of 1
          </span>

          {/* Next */}
          <button
            type="button"
            className="text-[#546e7a] hover:text-[#1e293b] font-bold disabled:opacity-40"
            title="Next Page"
          >
            &gt;
          </button>
          {/* Last */}
          <button
            type="button"
            className="text-[#546e7a] hover:text-[#1e293b] font-bold disabled:opacity-40"
            title="Last Page"
          >
            &gt;&gt;|
          </button>

          {/* Rows count selector */}
          <select
            defaultValue="10"
            className="ml-2 bg-white border border-[#a4c2df] rounded px-1.5 py-0.5 text-[11px] text-[#334155]"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>

        {/* View Range */}
        <div className="font-medium text-[#546e7a]">
          View 1 - {filteredVendors.length} of {filteredVendors.length}
        </div>
      </div>
    </div>
  );
};
