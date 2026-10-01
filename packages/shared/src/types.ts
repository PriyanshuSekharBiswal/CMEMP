export type Role = "customer" | "admin";
export type OrderStatus = "Confirmed" | "Sourcing" | "Dispatched" | "Delivered";
export interface User {
  id: string;
  phone: string;
  name: string;
  role: Role;
  address: string;
  pincode: string;
  points: number;
}
export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  unit: string;
  price: number;
  gst: number;
  specs: Record<string, string>;
  discount: number;
  active: number;
}
export interface Supplier {
  id: string;
  name: string;
  phone: string;
  location: string;
  pincode: string;
  rating: number;
  terms: string;
}
export interface RequestItem {
  productId: string;
  name: string;
  brand: string;
  unit: string;
  qty: number;
  gst: number;
  rate: number;
}
export interface Quote {
  id: string;
  requestId: string;
  supplierId: string;
  supplierName: string;
  items: RequestItem[];
  subtotal: number;
  tax: number;
  freight: number;
  total: number;
  validUntil: string;
  deliveryDays: number;
  terms: string;
  createdAt: string;
}
export interface MaterialRequest {
  id: string;
  customerId: string;
  customerName: string;
  phone: string;
  project: string;
  address: string;
  pincode: string;
  notes: string;
  status: string;
  createdAt: string;
  items: RequestItem[];
  quotes: Quote[];
}
export interface Order {
  id: string;
  requestId: string;
  quoteId: string;
  customerId: string;
  customerName: string;
  project: string;
  address: string;
  pincode: string;
  status: OrderStatus;
  vehicle: string;
  driver: string;
  paymentStatus: string;
  paymentReference: string;
  internalNotes?: string;
  createdAt: string;
  quote: Quote;
  events: { status: string; createdAt: string }[];
}
export interface Notification {
  id: string;
  message: string;
  createdAt: string;
}
