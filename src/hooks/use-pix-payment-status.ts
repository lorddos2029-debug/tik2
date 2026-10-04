import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { defaultCheckoutProduct } from "@/lib/commerce-products";
import { saveOrder, type PixOrder } from "@/lib/funnel";
import { trackMetaEvent } from "@/lib/meta-pixel";
import { checkPixStatus } from "@/lib/pix.functions";
import { collectTracking } from "@/lib/tracking";

const utmifyDate = (order: PixOrder) =>
  order.utmifyCreatedAt ??
  new Date(order.createdAt).toISOString().slice(0, 19).replace("T", " ");

export function usePixPaymentStatus(order: PixOrder | null) {
  const checkStatus = useServerFn(checkPixStatus);
  const [paid, setPaid] = useState(order?.status === "paid");

  useEffect(() => {
    setPaid(order?.status === "paid");
    if (!order?.vendaId || order.purchaseTracked) return;

    const vendaId = order.vendaId;
    let active = true;
    const poll = async () => {
      const eventId = order.purchaseEventId ?? `purchase_${vendaId}`;
      const tracking = collectTracking(eventId);
      const names = order.address?.nome.trim().split(/\s+/) ?? [];
      const result = await checkStatus({
        data: {
          vendaId,
          purchase: {
            eventId,
            value: order.total,
            sourceUrl: window.location.href,
            userAgent: tracking.user_agent,
            email: order.address?.email ?? "",
            phone: order.address?.telefone ?? "",
            firstName: names[0] ?? "",
            lastName: names.slice(1).join(" "),
            fbp: tracking.fbp,
            fbc: tracking.fbc,
            quantity: order.qty,
            document: order.address?.cpf ?? "",
            productName: order.product?.title ?? defaultCheckoutProduct.title,
            productId: order.product?.id ?? defaultCheckoutProduct.id,
            productPrice: order.total / order.qty,
            createdAt: utmifyDate(order),
            src: tracking.src,
            sck: tracking.sck,
            utm_source: tracking.utm_source,
            utm_campaign: tracking.utm_campaign,
            utm_medium: tracking.utm_medium,
            utm_content: tracking.utm_content,
            utm_term: tracking.utm_term,
          },
        },
      });
      if (!active || !result.paid) return;

      setPaid(true);
      trackMetaEvent(
        "Purchase",
        {
          currency: "BRL",
          value: Number(order.total.toFixed(2)),
          content_ids: [order.product?.id ?? defaultCheckoutProduct.id],
          content_type: "product",
          num_items: order.qty,
        },
        eventId,
      );

      const updated = { ...order, status: "paid" as const, purchaseTracked: result.trackingComplete };
      saveOrder(updated);
      if (result.trackingComplete) window.clearInterval(intervalId);
    };

    void poll();
    const intervalId = window.setInterval(() => void poll(), 5000);
    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, [checkStatus, order]);

  return paid;
}