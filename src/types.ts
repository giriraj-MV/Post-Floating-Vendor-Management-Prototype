export type VendorStatusTag = 'A' | 'G' | 'M' | 'P';

export interface VendorStatusInfo {
  tag: VendorStatusTag;
  label: string;
  fullName: string;
  description: string;
  colorClass: string;
}

export type InclusionStatus = 'floated' | 'post_float' | 'available';

export interface Vendor {
  id: string;
  vendorName: string;
  vendorCode: string;
  avatarText: string;
  country: string;
  location: 'I' | 'L'; // I = International, L = Local
  industryType: string;
  category: string;
  statusTags: VendorStatusTag[];
  contactPerson: string;
  email: string;
  phone: string;
  complianceRating: number;
  inclusionStatus: InclusionStatus;
  floatedAt?: string;
  addedAt?: string;
  addedBy?: string;
  lockReason?: string;
}

export interface AuctionDetails {
  id: string;
  code: string;
  title: string;
  type: string;
  category: string;
  categoryId: string;
  floatedAt: string;
  floatedBy: string;
  scheduledEnd: string;
  status: 'Floated' | 'Draft' | 'Closed';
  currency: string;
  reservePrice: number;
}
