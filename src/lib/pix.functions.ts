import { createServerFn } from "@tanstack/react-start";

const BASE = "https://urusbot.online/api/v1";

export interface ChargeInput {
  valor: number;
  nome: string;
  email: string;
  cpf?: string | undefined;
  telefone?: string | undefined;
  descricao?: string | undefined;
  itens?: Array<{ id: string; nome: string; quantidade: number; preco_unitario: number }>;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  src?: string;
  sck?: string;
  fbp?: string;
  fbc?: string;
  evento_id?: string;
  user_agent?: string;
}

export interface ChargeResult {
  ok: boolean;
  vendaId?: number | undefined;
  pixCode?: string | undefined;
  qrCodeUrl?: string | undefined;
  expiraEm?: string | undefined;
  checkStatusUrl?: string | undefined;
  utmifyCreatedAt?: string | undefined;
  error?: string | undefined;
}

interface ChargeResponse {
  ok?: boolean;
  venda_id?: number;
  pix_code?: string;
  qr_code_url?: string;
  expira_em?: string;
  check_status_url?: string;
  error?: string;
  message?: string;
  erro?: string;
}

const clean = (input: ChargeInput) => {
  const entries = Object.entries(input).filter(
    ([, v]) => v !== undefined && v !== null && v !== "",
  );
  return Object.fromEntries(entries);
};

export const createPixCharge = createServerFn({ method: "POST" })
  .inputValidator((input: ChargeInput) => input)
  .handler(async ({ data }): Promise<ChargeResult> => {
    const key = process.env["URUSPAY_API_KEY"];
    if (!key) return { ok: false, error: "Pagamento não configurado." };
    if (!(data.valor >= 1)) return { ok: false, error: "Valor mínimo de R$ 1,00." };
    if (!data.nome || !data.email) return { ok: false, error: "Informe nome e email." };

    try {
      const res = await fetch(`${BASE}/charge`, {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          ...clean(data),
          cpf: data.cpf ? data.cpf.replace(/\D/g, "") : undefined,
          telefone: data.telefone ? data.telefone.replace(/\D/g, "") : undefined,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as ChargeResponse;
      if (!res.ok || !json.pix_code) {
        return {
          ok: false,
          error: json.error ?? json.erro ?? json.message ?? "Não foi possível gerar o Pix agora.",
        };
      }
      const utmifyCreatedAt = new Date().toISOString().slice(0, 19).replace("T", " ");
      if (json.venda_id) {
        const { sendUtmifyOrder } = await import("./utmify.server");
        await sendUtmifyOrder(
          {
            orderId: String(json.venda_id),
            createdAt: utmifyCreatedAt,
            approvedDate: null,
            customer: {
              name: data.nome,
              email: data.email,
              phone: data.telefone?.replace(/\D/g, "") || null,
              document: data.cpf?.replace(/\D/g, "") || null,
            },
            product: {
              id: data.itens?.[0]?.id ?? "motoserra-52cc",
              name: data.itens?.[0]?.nome ?? data.descricao ?? "Produto",
              quantity: data.itens?.[0]?.quantidade ?? 1,
              priceInCents: Math.round((data.itens?.[0]?.preco_unitario ?? data.valor) * 100),
            },
            tracking: {
              src: data.src || null,
              sck: data.sck || null,
              utm_source: data.utm_source || null,
              utm_campaign: data.utm_campaign || null,
              utm_medium: data.utm_medium || null,
              utm_content: data.utm_content || null,
              utm_term: data.utm_term || null,
            },
            totalPriceInCents: Math.round(data.valor * 100),
          },
          "waiting_payment",
        ).catch(() => undefined);
      }
      return {
        ok: true,
        vendaId: json.venda_id,
        pixCode: json.pix_code,
        qrCodeUrl: json.qr_code_url,
        expiraEm: json.expira_em,
        checkStatusUrl: json.check_status_url ?? `${BASE}/status/${json.venda_id}`,
        utmifyCreatedAt,
      };
    } catch {
      return { ok: false, error: "Falha de conexão com o pagamento. Tente novamente." };
    }
  });

export const checkPixStatus = createServerFn({ method: "POST" })
  .inputValidator((input: {
    vendaId: number;
    purchase?: {
      eventId: string;
      value: number;
      sourceUrl: string;
      userAgent: string;
      email: string;
      phone: string;
      firstName: string;
      lastName: string;
      fbp: string;
      fbc: string;
      quantity: number;
      document: string;
      productName: string;
      productId: string;
      productPrice: number;
      createdAt: string;
      src: string;
      sck: string;
      utm_source: string;
      utm_campaign: string;
      utm_medium: string;
      utm_content: string;
      utm_term: string;
    };
  }) => input)
  .handler(async ({ data }): Promise<{
    paid: boolean;
    status: string;
    trackingComplete: boolean;
  }> => {
    const key = process.env["URUSPAY_API_KEY"];
    if (!key || !data.vendaId) {
      return { paid: false, status: "pending", trackingComplete: false };
    }
    try {
      const res = await fetch(`${BASE}/status/${data.vendaId}`, {
        headers: { Authorization: `Bearer ${key}` },
      });
      const json = (await res.json().catch(() => ({}))) as { pago?: boolean; status?: string };
      const paid = json.pago === true || json.status === "paid";
      if (paid && data.purchase) {
        const { sendMetaPurchase } = await import("./meta.server");
        const { sendUtmifyOrder, formatUtmifyDate } = await import("./utmify.server");
        const trackingResults = await Promise.allSettled([
          sendMetaPurchase({ ...data.purchase, vendaId: data.vendaId }),
          sendUtmifyOrder(
            {
              orderId: String(data.vendaId),
              createdAt: data.purchase.createdAt,
              approvedDate: formatUtmifyDate(new Date()),
              customer: {
                name: `${data.purchase.firstName} ${data.purchase.lastName}`.trim(),
                email: data.purchase.email,
                phone: data.purchase.phone.replace(/\D/g, "") || null,
                document: data.purchase.document.replace(/\D/g, "") || null,
              },
              product: {
                id: data.purchase.productId,
                name: data.purchase.productName,
                quantity: data.purchase.quantity,
                priceInCents: Math.round(data.purchase.productPrice * 100),
              },
              tracking: {
                src: data.purchase.src || null,
                sck: data.purchase.sck || null,
                utm_source: data.purchase.utm_source || null,
                utm_campaign: data.purchase.utm_campaign || null,
                utm_medium: data.purchase.utm_medium || null,
                utm_content: data.purchase.utm_content || null,
                utm_term: data.purchase.utm_term || null,
              },
              totalPriceInCents: Math.round(data.purchase.value * 100),
            },
            "paid",
          ),
        ]);
        const trackingComplete = trackingResults.every((result) => result.status === "fulfilled");
        return { paid, status: json.status ?? "paid", trackingComplete };
      }
      return { paid, status: json.status ?? "pending", trackingComplete: false };
    } catch {
      return { paid: false, status: "pending", trackingComplete: false };
    }
  });
