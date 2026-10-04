import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ChevronLeft, PackageOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { Shell } from "@/components/tt/Shell";
import { money } from "@/lib/catalog";
import { defaultCheckoutProduct } from "@/lib/commerce-products";
import { getOrder, mmss, type PixOrder } from "@/lib/funnel";
import { usePixPaymentStatus } from "@/hooks/use-pix-payment-status";

export const Route = createFileRoute("/meus-pedidos")({
  head: () => ({
    meta: [
      { title: "Meus pedidos | Promoções" },
      { name: "description", content: "Acompanhe o status e o pagamento dos seus pedidos." },
      { property: "og:title", content: "Meus pedidos" },
      { property: "og:description", content: "Acompanhe o status e o pagamento dos seus pedidos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const router = useRouter();
  const [order, setOrder] = useState<PixOrder | null>(null);
  const [left, setLeft] = useState(0);
  const orderedProduct = order?.product ?? defaultCheckoutProduct;
  const paid = usePixPaymentStatus(order);

  useEffect(() => {
    const stored = getOrder();
    setOrder(stored);
    if (!stored) return;
    const tick = () => setLeft(stored.expiresAt - Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <Shell className="bg-[#f5f5f5]">
      <div className="sticky top-0 z-20 flex items-center gap-2 border-b border-[#f0f0f0] bg-white px-2 py-2.5">
        <button aria-label="Voltar" onClick={() => router.history.back()} className="p-1">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="text-[16px] font-semibold">Meus pedidos</span>
      </div>

      {!order ? (
        <div className="flex flex-col items-center px-6 py-20 text-center">
          <PackageOpen className="h-12 w-12 text-[#c8c8cc]" strokeWidth={1.6} />
          <p className="mt-3 text-[14px] text-[#8a8b91]">Você ainda não tem pedidos.</p>
          <Link
            to="/p/motoserra"
            className="mt-4 rounded-full bg-[#fe2c55] px-6 py-2.5 text-[14px] font-extrabold text-white"
          >
            Comprar agora
          </Link>
        </div>
      ) : (
        <div className="px-4 py-3">
          <div className="rounded-xl bg-white p-4">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#8a8b91]">Pedido {order.id}</span>
              <span className="text-[13px] font-extrabold text-[#fe2c55]">
                {paid ? "Pagamento confirmado" : left > 0 ? "Aguardando pagamento" : "Pagamento expirado"}
              </span>
            </div>

            <div className="mt-3 flex gap-3">
              <img src={orderedProduct.image} alt="" className="h-[70px] w-[70px] shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <div className="line-clamp-2 text-[13px] leading-[1.35]">{orderedProduct.title}</div>
                <div className="mt-1 text-[12px] text-[#8a8b91]">
                  {orderedProduct.variant} · {order.qty} un.
                </div>
              </div>
              <div className="shrink-0 text-[14px] font-extrabold">{money(order.total)}</div>
            </div>

            {order.note && (
              <div className="mt-3 rounded-lg bg-[#f5f5f5] p-3 text-[12px] text-[#5a5b60]">
                Nota: {order.note}
              </div>
            )}

            {order.address && (
              <div className="mt-3 border-t border-[#f4f4f5] pt-3 text-[12px] leading-[1.5] text-[#5a5b60]">
                {order.address.nome} · {order.address.telefone}
                <br />
                {order.address.endereco}, {order.address.numero} — {order.address.cidade}/
                {order.address.estado}, {order.address.cep}
              </div>
            )}

            {!paid && left > 0 && (
              <>
                <div className="mt-3 text-center text-[12px] font-semibold tabular-nums text-[#fe2c55]">
                  Vence em: {mmss(left)}
                </div>
                <Link
                  to="/pix"
                  search={{ total: order.total, qty: order.qty }}
                  className="mt-2 block rounded-full bg-[#fe2c55] py-3 text-center text-[15px] font-extrabold text-white"
                >
                  Pagar com Pix
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </Shell>
  );
}
