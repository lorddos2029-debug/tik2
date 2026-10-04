export interface UtmifyOrderInput {
  orderId: string;
  createdAt: string;
  approvedDate: string | null;
  customer: {
    name: string;
    email: string;
    phone: string | null;
    document: string | null;
  };
  product: {
    id: string;
    name: string;
    quantity: number;
    priceInCents: number;
  };
  tracking: {
    src: string | null;
    sck: string | null;
    utm_source: string | null;
    utm_campaign: string | null;
    utm_medium: string | null;
    utm_content: string | null;
    utm_term: string | null;
  };
  totalPriceInCents: number;
}

export const formatUtmifyDate = (date: Date) =>
  date.toISOString().slice(0, 19).replace("T", " ");

export const sendUtmifyOrder = async (
  input: UtmifyOrderInput,
  status: "waiting_payment" | "paid",
) => {
  const token = process.env["UTMIFY_API_TOKEN"];
  if (!token) throw new Error("UTMify não configurada");

  const response = await fetch("https://api.utmify.com.br/api-credentials/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-token": token,
    },
    body: JSON.stringify({
      orderId: input.orderId,
      platform: "PromocoesTik",
      paymentMethod: "pix",
      status,
      createdAt: input.createdAt,
      approvedDate: status === "paid" ? input.approvedDate : null,
      refundedAt: null,
      customer: {
        ...input.customer,
        country: "BR",
      },
      products: [
        {
          ...input.product,
          planId: null,
          planName: null,
        },
      ],
      trackingParameters: input.tracking,
      commission: {
        totalPriceInCents: input.totalPriceInCents,
        gatewayFeeInCents: 0,
        userCommissionInCents: input.totalPriceInCents,
        currency: "BRL",
      },
      isTest: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`UTMify request failed with status ${response.status}`);
  }
};