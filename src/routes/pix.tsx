import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, CheckCircle2, ChevronLeft, Clock3, Copy, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { Toasts } from "@/components/tt/BottomSheet";
import { Shell } from "@/components/tt/Shell";
import { money } from "@/lib/catalog";
import { getOrder, getSelectedProduct, mmss, type PixOrder } from "@/lib/funnel";
import { usePixPaymentStatus } from "@/hooks/use-pix-payment-status";

export const Route = createFileRoute("/pix")({
  validateSearch: (search: Record<string, unknown>) => ({
    total: Number(search["total"] ?? 87.9),
    qty: Number(search["qty"] ?? 1),
  }),
  head: () => ({
    meta: [
      { title: "Código do pagamento — Pix | Promoções" },
      {
        name: "description",
        content: "Escaneie o QR Code ou copie o código Pix para concluir o pagamento do seu pedido.",
      },
      { property: "og:title", content: "Código do pagamento — Pix" },
      { property: "og:description", content: "Escaneie o QR Code ou copie o código Pix." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PixPage,
});

const dueLabel = (ts: number) =>
  new Date(ts).toLocaleString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

function PixPage() {
  const { total } = Route.useSearch();
  const navigate = useNavigate();
  const [order, setOrder] = useState<PixOrder | null>(null);
  const [left, setLeft] = useState(0);
  const [copied, setCopied] = useState(false);
  const [toasts, setToasts] = useState<string[]>([]);

  useEffect(() => {
    const stored = getOrder();
    if (!stored) {
      void navigate({ to: "/checkout", search: { product: getSelectedProduct().key } });
      return;
    }
    setOrder(stored);
    const tick = () => setLeft(stored.expiresAt - Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [navigate]);

  const paid = usePixPaymentStatus(order);

  const copy = async () => {
    if (!order) return;
    try {
      await navigator.clipboard.writeText(order.code);
    } catch {
      /* clipboard bloqueado */
    }
    setCopied(true);
    setToasts(["Código copiado"]);
    window.setTimeout(() => {
      setCopied(false);
      setToasts([]);
    }, 1800);
  };

  const amount = order?.total ?? total;
  const shortCode = order?.code ? `${order.code.slice(0, 26)}...` : "";

  return (
    <Shell className="bg-white pb-20">
      <div className="sticky top-0 z-20 flex h-11 items-center border-b border-[#f0f0f0] bg-white px-2">
        <Link to="/meus-pedidos" aria-label="Voltar" className="grid h-9 w-9 place-items-center">
          <ChevronLeft className="h-[21px] w-[21px]" />
        </Link>
        <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[13px] font-semibold">
          Código do pagamento
        </span>
      </div>

      <main className="px-4 pb-24 pt-4">
        {paid ? (
          <div className="animate-in fade-in zoom-in-95 py-8 text-center duration-500">
            <CheckCircle2 className="mx-auto h-14 w-14 text-[#00b8a9]" />
            <div className="mt-3 text-[19px] font-extrabold text-[#161823]">
              Pagamento confirmado!
            </div>
            <div className="mt-1 text-[14px] text-[#5a5b60]">
              Recebemos {money(amount)}. Seu pedido já está em preparação.
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between">
              <div className="text-left text-[18px] font-extrabold leading-[1.02] text-[#161823]">
                <div>Aguardando o pagamento</div>
                <div>{money(amount)}</div>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#ff8a1f] text-white">
                <Clock3 className="h-5 w-5" strokeWidth={2.5} />
              </div>
            </div>

            <div className="mt-4 space-y-1 text-[11px] text-[#8a8b91]">
              <div className="flex items-center gap-2">
                <span>Vence em:</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#fe2c55] px-2 py-0.5 font-bold tabular-nums text-white">
                  <Clock3 className="h-3 w-3" />
                  {mmss(left)}
                </span>
              </div>
              {order && <div>Prazo {dueLabel(order.expiresAt)}</div>}
            </div>

            <section className="mt-3 rounded-xl border border-[#eeeeee] bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.07)]">
              <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#161823]">
                <QrCode className="h-[17px] w-[17px] text-[#00c9bd]" />
                PIX
              </div>
              {order?.code && (
                <div className="mt-4 flex justify-center">
                  {order.qrUrl ? (
                    <img
                      src={order.qrUrl}
                      alt="QR Code para pagamento Pix"
                      width={220}
                      height={220}
                      className="h-[220px] w-[220px] object-contain"
                    />
                  ) : (
                    <QRCodeSVG
                      value={order.code}
                      size={220}
                      level="M"
                      marginSize={1}
                      title="QR Code para pagamento Pix"
                    />
                  )}
                </div>
              )}
              <p className="mt-4 truncate text-[14px] font-semibold text-[#161823]">{shortCode}</p>
              <button
                onClick={() => void copy()}
                className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#fe2c55] text-[13px] font-bold text-white transition active:scale-[0.99]"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copiado" : "Copiar"}
              </button>
            </section>

            <section className="mt-5">
              <h1 className="text-[17px] font-bold text-[#161823]">Como fazer pagamentos com PIX?</h1>
              <p className="mt-2 text-[13px] leading-[1.55] text-[#161823]">
                Copie o código de pagamento acima, selecione Pix no seu app de internet ou de banco e cole o código.
              </p>
            </section>
          </>
        )}
      </main>

      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-[440px] bg-white px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-2">
        <Link
          to="/meus-pedidos"
          className="flex h-11 w-full items-center justify-center rounded-md bg-[#f1f1f2] text-[13px] font-semibold text-[#161823]"
        >
          Ver pedido
        </Link>
      </div>

      <Toasts messages={toasts} />
    </Shell>
  );
}
