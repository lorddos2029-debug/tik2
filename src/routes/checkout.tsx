import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  QrCode,
  Smile,
  Star,
  Ticket,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { BottomSheet, Toasts } from "@/components/tt/BottomSheet";
import { Shell, TikTokRibbon } from "@/components/tt/Shell";
import { money } from "@/lib/catalog";
import { checkoutProducts, defaultCheckoutProduct, isProductKey } from "@/lib/commerce-products";
import {
  getAddress,
  getFlashDeadline,
  getNote,
  getQty,
  getSelectedProduct,
  getSelectedVariantImage,
  getSelectedVariantLabel,
  hhmmss,
  saveNote,
  saveOrder,
  saveQty,
  type Address,
} from "@/lib/funnel";
import { createPixCharge } from "@/lib/pix.functions";
import { collectTracking, newEventId } from "@/lib/tracking";
import { cn } from "@/lib/utils";
import { useDeliveryWindow } from "@/hooks/use-delivery-window";

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>) => ({
    product: isProductKey(search["product"]) ? search["product"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Finalizar pedido | Promoções" },
      {
        name: "description",
        content: "Confirme seu endereço e finalize seu pedido com pagamento via Pix.",
      },
      { property: "og:title", content: "Finalizar pedido" },
      { property: "og:description", content: "Pagamento via Pix, frete grátis e entrega rápida." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { product: productKey } = Route.useSearch();
  const deliveryWindow = useDeliveryWindow();
  const router = useRouter();
  const navigate = useNavigate();
  const [address, setAddress] = useState<Address | null>(null);
  const [selectedProduct, setSelectedProduct] = useState(
    productKey ? checkoutProducts[productKey] : defaultCheckoutProduct,
  );
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [noteDraft, setNoteDraft] = useState("");
  const [noteOpen, setNoteOpen] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [left, setLeft] = useState(0);
  const [toasts, setToasts] = useState<string[]>([]);

  useEffect(() => {
    setAddress(getAddress());

    const checkoutProduct = productKey
      ? checkoutProducts[productKey]
      : getSelectedProduct();
    const selectedVariantImage =
      productKey === "guarda" ||
      productKey === "panela" ||
      productKey === "short" ||
      productKey === "bermuda" ||
      productKey === "magnesio"
        ? getSelectedVariantImage()
        : null;
    const selectedVariantLabel =
      productKey === "short" || productKey === "bermuda" || productKey === "magnesio"
        ? getSelectedVariantLabel()
        : null;

    setSelectedProduct({
      ...checkoutProduct,
      ...(selectedVariantImage ? { image: selectedVariantImage } : {}),
      ...(selectedVariantLabel ? { variant: selectedVariantLabel } : {}),
    });
    setQty(getQty());
    setNote(getNote());
    const deadline = getFlashDeadline();
    const tick = () => setLeft(deadline - Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [productKey]);

  const product = selectedProduct;
  const subtotal = product.price * qty;
  const original = product.originalPrice * qty;
  const productDiscount = original - subtotal;
  const total = subtotal;
  const savings = productDiscount + product.shipping;
  const clock = hhmmss(left);

  const changeQty = (next: number) => {
    const value = Math.min(99, Math.max(1, next));
    setQty(value);
    saveQty(value);
  };

  const toast = (message: string) => {
    setToasts([message]);
    window.setTimeout(() => setToasts([]), 2600);
  };

  const placeOrder = async () => {
    if (!address) {
      void navigate({ to: "/endereco", search: { product: product.key } });
      return;
    }
    if (!address.email.includes("@") || address.email.trim().length < 6) {
      toast("Informe um email válido no endereço.");
      void navigate({ to: "/endereco", search: { product: product.key } });
      return;
    }
    setSubmitting(true);
    const eventId = newEventId();
    const tracking = collectTracking(eventId);
    const result = await createPixCharge({
      data: {
        valor: Number(total.toFixed(2)),
        nome: address.nome,
        email: address.email,
        cpf: address.cpf,
        telefone: address.telefone,
        descricao: product.title,
        itens: [
          {
            id: product.id,
            nome: product.title,
            quantidade: qty,
            preco_unitario: Number(product.price.toFixed(2)),
          },
        ],
        ...tracking,
      },
    });
    if (!result.ok || !result.pixCode) {
      setSubmitting(false);
      toast(result.error ?? "Não foi possível gerar o Pix. Tente novamente.");
      return;
    }
    const now = Date.now();
    const expires = result.expiraEm ? Date.parse(result.expiraEm) : NaN;
    saveOrder({
      id: `TT${(result.vendaId ?? now).toString().slice(-10)}`,
      total,
      qty,
      code: result.pixCode,
      qrUrl: result.qrCodeUrl,
      vendaId: result.vendaId,
      createdAt: now,
      expiresAt: Number.isFinite(expires) ? expires : now + 10 * 60_000,
      address,
      note,
      product,
      status: "pending",
      purchaseEventId: eventId,
      purchaseTracked: false,
      utmifyCreatedAt: result.utmifyCreatedAt,
    });
    void navigate({ to: "/pix", search: { total, qty } });
  };

  return (
    <Shell className="bg-[#f5f5f5] pb-[112px]">
      <div className="sticky top-0 z-30 bg-white">
        <div className="relative flex h-11 items-center px-2">
          <button
            aria-label="Voltar"
            onClick={() => router.history.back()}
            className="grid h-9 w-9 place-items-center"
          >
            <ChevronLeft className="h-[22px] w-[22px] text-[#161823]" />
          </button>
          <div className="pointer-events-none absolute left-1/2 flex -translate-x-1/2 items-center gap-1 text-[14px] font-semibold text-[#161823]">
            <Star className="h-[13px] w-[13px] fill-[#f2b900] text-[#f2b900]" />
            Ótima avaliação! {product.rating}/5,0
          </div>
        </div>
        <div className="h-px bg-[#f0f0f0]" />
      </div>

      <Link
        to="/endereco"
        search={{ product: product.key }}
        className="block bg-white px-4 py-3.5"
      >
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-2">
            <MapPin className="h-[18px] w-[18px] shrink-0 text-[#161823]" strokeWidth={1.9} />
            {address ? (
              <div className="min-w-0">
                <div className="truncate text-[13px] font-bold text-[#161823]">
                  {address.endereco}, {address.numero}
                  {address.complemento ? ` — ${address.complemento}` : ""}
                </div>
                <div className="truncate text-[11.5px] text-[#8a8b91]">
                  {address.bairro ? `${address.bairro}, ` : ""}
                  {address.cidade} - {address.estado}, {address.cep} · {address.nome}
                </div>
              </div>
            ) : (
              <span className="text-[15px] font-bold text-[#161823]">Endereço de envio</span>
            )}
          </div>
          {address ? (
            <ChevronRight className="h-4 w-4 shrink-0 text-[#c8c8cc]" />
          ) : (
            <div className="flex shrink-0 items-center gap-0.5 text-[14px] font-semibold text-[#fe2c55]">
              <span className="text-[16px] leading-none">+</span>
              <span>Adicionar endereço</span>
            </div>
          )}
        </div>
      </Link>

      <TikTokRibbon />

      <div className="bg-white px-4 pb-3 pt-2.5">
        <div className="flex items-center justify-between">
          <div className="text-[14px] font-bold text-[#161823]">{product.storeName}</div>
          <button
            onClick={() => {
              setNoteDraft(note);
              setNoteOpen(true);
            }}
            className="flex items-center gap-0.5 text-[12px] text-[#8a8b91]"
          >
            {note ? "Nota adicionada" : "Adicionar nota"}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-2.5 flex items-center gap-2.5">
          <img
            src={product.image}
            alt={product.title}
            onError={(event) => {
              const image = event.currentTarget;
              image.onerror = null;
              image.src = checkoutProducts[product.key].image;
            }}
            className="h-[80px] w-[80px] shrink-0 rounded-md object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="truncate text-[12.5px] leading-snug text-[#161823]">
              {product.title}
            </div>
            <div className="mt-1 flex flex-col items-start gap-1">
              <div className="inline-flex overflow-hidden rounded-[3px]">
                <div className="flex items-center gap-0.5 bg-[#fe2c55] px-[7px] py-[2px] text-[8.5px] font-semibold text-white">
                  <Zap className="h-[11px] w-[11px] fill-white text-white" />
                  <span>Oferta Relâmpago</span>
                </div>
                <div className="flex items-center bg-[#fff0f3] px-[7px] py-[2px] text-[8.5px] font-semibold tabular-nums text-[#fe2c55]">
                  {clock}
                </div>
              </div>
              <span className="inline-flex h-[14px] items-center gap-[2px] rounded-[3px] bg-[#f7f7f7] px-[3px] text-[8.3px] font-extrabold leading-none text-[#333333]">
                <CheckBadge />
                Devolução gratuita
              </span>
            </div>

            <div className="mt-1.5 flex items-end justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-1 text-[#fe2c55]">
                  <span className="text-[16px] font-extrabold leading-none">
                    {money(product.price)}
                  </span>
                  <Ticket className="h-3 w-3" />
                </div>
                <div className="mt-0.5 flex items-center gap-1 text-[10.5px] text-[#8a8b91]">
                  <span className="line-through">{money(product.originalPrice)}</span>
                  <span className="rounded bg-[#ffe9ec] px-1 py-[1px] font-semibold text-[#fe2c55]">
                    -{product.discountPercent}%
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-0 text-[13px] text-[#161823]">
                <button
                  aria-label="Diminuir"
                  onClick={() => changeQty(qty - 1)}
                  className="flex h-6 w-6 items-center justify-center rounded-l-[4px] bg-[#f1f1f2] text-[16px] leading-none text-[#161823]"
                >
                  −
                </button>
                <span className="flex h-6 w-8 items-center justify-center bg-[#f1f1f2] text-[12px] tabular-nums">
                  {qty}
                </span>
                <button
                  aria-label="Aumentar"
                  onClick={() => changeQty(qty + 1)}
                  className="flex h-6 w-6 items-center justify-center rounded-r-[4px] bg-[#f1f1f2] text-[16px] leading-none text-[#161823]"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-md bg-[#e7f7f5] px-2.5 py-1.5 text-[11.5px]">
          <span className="text-[#161823]">{deliveryWindow || "Calculando prazo de entrega..."}</span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#8a8b91] line-through">{money(product.shipping)}</span>
            <b className="text-[#161823]">Grátis</b>
            <Ticket className="h-3 w-3 text-[#00b8a9]" />
          </span>
        </div>
      </div>

      <button className="mt-2 flex w-full items-center justify-between bg-white px-4 py-[9px] text-left">
        <div className="flex items-center gap-[6px] text-[13px] font-extrabold leading-none text-[#161823]">
          <CouponIcon />
          Desconto do TikTok Shop
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex flex-col items-end gap-1">
            <span className="rounded bg-[#e7f7f5] px-1.5 py-0.5 text-[10.5px] font-semibold text-[#00b8a9]">
              Frete grátis
            </span>
            <span className="rounded bg-[#ffe9ec] px-1.5 py-0.5 text-[10.5px] font-semibold text-[#fe2c55]">
              - {money(productDiscount)}
            </span>
          </div>
          <ChevronRight className="h-4 w-4 text-[#c8c8cc]" />
        </div>
      </button>

      <div className="mt-2 bg-white px-4 py-3">
        <div className="text-[14px] font-semibold">Resumo do pedido</div>
        <div className="mt-3 space-y-2 text-[13px]">
          <div className="flex w-full items-center justify-between font-semibold">
            <span className="flex items-center gap-1">
              Subtotal do produto
              <ChevronRight className="h-3.5 w-3.5 rotate-90 text-[#8a8b91]" />
            </span>
            <span>{money(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between pl-3 text-[13px]">
            <span className="text-[#5a5b60]">Preço original</span>
            <span>{money(original)}</span>
          </div>
          <div className="flex items-center justify-between pl-3 text-[13px]">
            <span className="text-[#5a5b60]">Desconto no produto</span>
            <span className="text-[#fe2c55]">- {money(productDiscount)}</span>
          </div>
          <div className="flex w-full items-center justify-between pt-1 font-semibold">
            <span className="flex items-center gap-1">
              Subtotal do envio
              <ChevronRight className="h-3.5 w-3.5 rotate-90 text-[#8a8b91]" />
            </span>
            <span>{money(0)}</span>
          </div>
          <div className="flex items-center justify-between pl-3 text-[13px]">
            <span className="text-[#5a5b60]">Taxa de envio</span>
            <span>{money(product.shipping)}</span>
          </div>
          <div className="flex items-center justify-between pl-3 text-[13px]">
            <span className="text-[#5a5b60]">Desconto de envio</span>
            <span className="text-[#fe2c55]">- {money(product.shipping)}</span>
          </div>
        </div>
        <div className="my-3 h-px bg-[#f0f0f0]" />
        <div className="flex items-start justify-between">
          <div className="text-[16px] font-bold">Total</div>
          <div className="text-right">
            <div className="text-[17px] font-bold">{money(total)}</div>
            <div className="text-[11px] text-[#8a8b91]">Impostos inclusos</div>
          </div>
        </div>
      </div>

      <div className="mt-2 bg-white px-4 py-3">
        <div className="text-[14px] font-semibold">Forma de pagamento</div>
        <div className="mt-3 flex w-full items-start justify-between text-left">
          <div className="flex flex-1 items-start gap-2.5">
            <div className="mt-0.5">
              <QrCode className="h-5 w-5 text-[#00b8a9]" />
            </div>
            <div className="flex-1">
              <div className="text-[13px]">Pix</div>
              <div className="mt-1 text-[11px] text-[#5a5b60]">
                Pagamento instantâneo · Aprovação em segundos
              </div>
            </div>
          </div>
          <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-[#fe2c55] bg-[#fe2c55] transition">
            <span className="h-2 w-2 rounded-full bg-white" />
          </span>
        </div>
      </div>

      <div className="mt-2 bg-[#f5f5f5] px-4 py-3 text-[11px] leading-relaxed text-[#5a5b60]">
        Ao fazer um pedido, você concorda com{" "}
        <span className="font-semibold text-[#161823]">Termos de uso e venda do TikTok Shop</span> e
        reconhece que leu e concordou com a{" "}
        <span className="font-semibold text-[#161823]">Política de privacidade do TikTok</span>.
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[440px] bg-white pb-[max(env(safe-area-inset-bottom),6px)] shadow-[0_-1px_0_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-1.5 whitespace-nowrap bg-[#fff0f3] px-4 py-1 text-[11.5px] font-semibold text-[#fe2c55]">
          <Smile className="h-[15px] w-[15px] shrink-0 text-[#fe2c55]" strokeWidth={2.2} />
          <span className="truncate">Você está economizando {money(savings)} nesse pedido.</span>
        </div>
        <div className="flex items-center justify-between px-4 pt-1.5">
          <div className="text-[14px] font-bold text-[#161823]">Total ({qty} item)</div>
          <div className="text-[17px] font-extrabold text-[#fe2c55]">{money(total)}</div>
        </div>
        <div className="px-4 pt-1">
          <button
            onClick={() => void placeOrder()}
            disabled={submitting}
            className="relative w-full rounded-full bg-[#fe2c55] py-2 text-center text-white shadow-[0_4px_12px_rgba(37,227,155,0.28)] transition active:scale-[0.99] disabled:opacity-70"
          >
            <div className="text-[15px] font-bold leading-tight">
              {submitting ? "Gerando Pix..." : "Fazer pedido"}
            </div>
            <div className="mt-0.5 text-[10.5px] font-semibold leading-tight opacity-95">
              O cupom expira em {clock}
            </div>
          </button>
        </div>
      </div>

      <BottomSheet
        open={noteOpen}
        title="Nota para o vendedor"
        onClose={() => setNoteOpen(false)}
        footer={
          <div className="border-t border-[#f0f0f0] px-4 py-3">
            <button
              onClick={() => {
                setNote(noteDraft);
                saveNote(noteDraft);
                setNoteOpen(false);
              }}
              className="w-full rounded-full bg-[#fe2c55] py-2.5 text-[15px] font-semibold text-white"
            >
              Salvar
            </button>
          </div>
        }
      >
        <textarea
          value={noteDraft}
          maxLength={200}
          onChange={(e) => setNoteDraft(e.target.value)}
          className="h-24 w-full resize-none rounded-lg bg-[#f5f5f5] p-3 text-[14px] outline-none placeholder:text-[#8a8b91]"
        />
        <div className="mt-1 text-right text-[12px] text-[#8a8b91]">{noteDraft.length}/200</div>
      </BottomSheet>

      <BottomSheet
        open={openOrder}
        title="Você já tem um pedido em aberto"
        onClose={() => setOpenOrder(false)}
      >
        <div className="text-[14px] leading-relaxed text-[#161823]">
          <p>
            Identificamos um pedido em aberto no seu CPF. Finalize o pagamento do pedido existente
            antes de realizar um novo pedido.
          </p>
          <Link
            to="/meus-pedidos"
            className="mt-4 block w-full rounded-full bg-[#fe2c55] py-2.5 text-center text-[15px] font-bold text-white"
          >
            VER MEUS PEDIDOS
          </Link>
        </div>
      </BottomSheet>

      <Toasts messages={toasts} />
    </Shell>
  );
}

function CheckBadge() {
  return (
    <svg width="9" height="9" viewBox="0 0 13 13" fill="none" className="shrink-0" aria-hidden="true">
      <circle cx="6.5" cy="6.5" r="6.15" fill="#EAB934" />
      <path
        d="M4 6.55L5.85 8.55L9.2 5"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CouponIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className="shrink-0" aria-hidden="true">
      <path
        d="M20.4 8.05V10.15C19.38 10.34 18.64 11.08 18.64 12C18.64 12.92 19.38 13.66 20.4 13.85V15.95C20.4 16.53 19.93 17 19.35 17H4.65C4.07 17 3.6 16.53 3.6 15.95V13.85C4.62 13.66 5.36 12.92 5.36 12C5.36 11.08 4.62 10.34 3.6 10.15V8.05C3.6 7.47 4.07 7 4.65 7H19.35C19.93 7 20.4 7.47 20.4 8.05Z"
        stroke="#d81d57"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M8.35 12.1L10.55 14.3L15.75 9.3"
        stroke="#d81d57"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
