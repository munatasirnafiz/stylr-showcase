export type ProductCategory = "watch" | "perfume" | "sunglasses" | "optical";
export type PreferredContactMethod = "whatsapp" | "call" | "sms";
export type InquiryStatus = "submitted" | "contacted" | "reserved" | "fulfilled" | "cancelled";

export interface ProfileRow {
  id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  preferred_contact_method: PreferredContactMethod;
  created_at: string;
  updated_at: string;
}

export interface FavoriteRow {
  id: string;
  user_id: string;
  product_id: string;
  product_type: ProductCategory;
  created_at: string;
}

export interface InquiryRow {
  id: string;
  user_id: string;
  product_id: string | null;
  product_type: ProductCategory | null;
  product_name: string;
  channel: "watches" | "perfumes" | "eyewear";
  status: InquiryStatus;
  note: string | null;
  created_at: string;
}

export interface DeliveryAddressRow {
  id: string;
  user_id: string;
  label: string;
  recipient_name: string;
  phone: string;
  area: string | null;
  address_line1: string;
  address_line2: string | null;
  city: string;
  notes: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}
