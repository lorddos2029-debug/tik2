import {
  checkoutProducts,
  defaultCheckoutProduct,
  isProductKey,
  type CheckoutProduct,
  type ProductKey,
} from "@/lib/commerce-products";

export interface Address {
  nome: string;
  telefone: string;
  email: string;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  endereco: string;
  numero: string;
  complemento: string;
  cpf: string;
  padrao: boolean;
}

export interface PixOrder {
  id: string;
  total: number;
  qty: number;
  code: string;
  qrUrl?: string | undefined;
  vendaId?: number | undefined;
  createdAt: number;
  expiresAt: number;
  address: Address | null;
  note: string;
  product?: CheckoutProduct | undefined;
  status: "pending" | "paid";
  purchaseEventId?: string | undefined;
  purchaseTracked?: boolean | undefined;
  utmifyCreatedAt?: string | undefined;
}

const ADDR_KEY = "tt_address";
const ORDER_KEY = "tt_order";
const NOTE_KEY = "tt_note";
const QTY_KEY = "tt_qty";
const DEADLINE_KEY = "tt_flash_deadline";
const PRODUCT_KEY = "tt_selected_product";
const VARIANT_IMAGE_KEY = "tt_selected_variant_image";

const read = <T,>(key: string): T | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

const write = (key: string, value: unknown) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
};

export const getAddress = () => read<Address>(ADDR_KEY);
export const saveAddress = (a: Address) => write(ADDR_KEY, a);

export const getNote = () => read<string>(NOTE_KEY) ?? "";
export const saveNote = (n: string) => write(NOTE_KEY, n);

export const getQty = () => read<number>(QTY_KEY) ?? 1;
export const saveQty = (q: number) => write(QTY_KEY, q);

export const saveSelectedProduct = (key: ProductKey) => write(PRODUCT_KEY, key);

export const saveSelectedVariantImage = (image: string) =>
  write(VARIANT_IMAGE_KEY, image);

export const getSelectedVariantImage = () => read<string>(VARIANT_IMAGE_KEY);

const VARIANT_LABEL_KEY = "tt_selected_variant_label";

export const saveSelectedVariantLabel = (label: string) =>
  write(VARIANT_LABEL_KEY, label);

export const getSelectedVariantLabel = () => read<string>(VARIANT_LABEL_KEY);

export const getSelectedProduct = (): CheckoutProduct => {
  const key = read<ProductKey>(PRODUCT_KEY);
  return isProductKey(key) ? checkoutProducts[key] : defaultCheckoutProduct;
};

export const getOrder = () => read<PixOrder>(ORDER_KEY);
export const saveOrder = (o: PixOrder) => write(ORDER_KEY, o);
export const clearOrder = () => {
  if (typeof window !== "undefined") window.localStorage.removeItem(ORDER_KEY);
};

export const hasOpenOrder = () => {
  const o = getOrder();
  return !!o && o.status === "pending" && o.expiresAt > Date.now();
};

/** Flash-offer deadline, persisted so the countdown keeps running across pages. */
export const getFlashDeadline = () => {
  const stored = read<number>(DEADLINE_KEY);
  if (stored && stored > Date.now()) return stored;
  const next = Date.now() + 6 * 3600_000 + 54 * 60_000 + 8_000;
  write(DEADLINE_KEY, next);
  return next;
};

export const hhmmss = (ms: number) => {
  const t = Math.max(0, Math.floor(ms / 1000));
  const h = String(Math.floor(t / 3600)).padStart(2, "0");
  const m = String(Math.floor((t % 3600) / 60)).padStart(2, "0");
  const s = String(t % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
};

export const mmss = (ms: number) => {
  const t = Math.max(0, Math.floor(ms / 1000));
  const m = String(Math.floor(t / 60)).padStart(2, "0");
  const s = String(t % 60).padStart(2, "0");
  return `00:${m}:${s}`;
};
