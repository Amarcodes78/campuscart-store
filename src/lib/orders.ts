import type { CartItem } from "./cart";

export interface Order {
  id: string;
  createdAt: string;
  items: (CartItem & { name: string; price: number; emoji: string; gradient: string })[];
  subtotal: number;
  shipping: number;
  total: number;
  status: "Delivered" | "Shipped" | "Processing";
}

const KEY = "campuscart:orders:v1";

export function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

export function saveOrders(orders: Order[]) {
  localStorage.setItem(KEY, JSON.stringify(orders));
}

export function addOrder(order: Order) {
  const all = loadOrders();
  all.unshift(order);
  saveOrders(all);
}

export function makeOrderId() {
  return "CC-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}
