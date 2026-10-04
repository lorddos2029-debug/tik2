interface MetaPurchaseInput {
  eventId: string;
  value: number;
  vendaId: number;
  sourceUrl: string;
  userAgent: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  fbp: string;
  fbc: string;
  quantity: number;
  productId: string;
}

const PIXEL_ID = "1849843465686098";

const normalize = (value: string) => value.trim().toLowerCase();

const sha256 = async (value: string) => {
  const bytes = new TextEncoder().encode(normalize(value));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
};

export const sendMetaPurchase = async (input: MetaPurchaseInput) => {
  const token = process.env["META_CAPI_ACCESS_TOKEN"];
  if (!token) throw new Error("Meta CAPI não configurada");

  const userData: Record<string, string | string[]> = {
    external_id: [await sha256(String(input.vendaId))],
  };
  if (input.email) userData["em"] = [await sha256(input.email)];
  if (input.phone) userData["ph"] = [await sha256(input.phone.replace(/\D/g, ""))];
  if (input.firstName) userData["fn"] = [await sha256(input.firstName)];
  if (input.lastName) userData["ln"] = [await sha256(input.lastName)];
  if (input.fbp) userData["fbp"] = input.fbp;
  if (input.fbc) userData["fbc"] = input.fbc;
  if (input.userAgent) userData["client_user_agent"] = input.userAgent;

  const response = await fetch(`https://graph.facebook.com/v23.0/${PIXEL_ID}/events`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: [
        {
          event_name: "Purchase",
          event_time: Math.floor(Date.now() / 1000),
          event_id: input.eventId,
          event_source_url: input.sourceUrl,
          action_source: "website",
          user_data: userData,
          custom_data: {
            currency: "BRL",
            value: Number(input.value.toFixed(2)),
            content_ids: [input.productId],
            content_type: "product",
            num_items: input.quantity,
          },
        },
      ],
    }),
  });
  const result = (await response.json().catch(() => ({}))) as { events_received?: number };
  if (!response.ok || result.events_received !== 1) {
    throw new Error(`Meta Purchase rejeitado com status ${response.status}`);
  }
};