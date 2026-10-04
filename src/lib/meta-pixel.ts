export const META_PIXEL_ID = "1849843465686098";

type MetaEventData = Record<string, string | number | string[]>;

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
  push: Fbq;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export const initializeMetaPixel = () => {
  if (typeof window === "undefined") return;
  if (!window.fbq) {
    const fbq = ((...args: unknown[]) => {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    }) as Fbq;
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.push = fbq;
    window.fbq = fbq;
    window._fbq = fbq;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
    fbq("init", META_PIXEL_ID);
  }
};

export const trackMetaEvent = (
  eventName: "PageView" | "InitiateCheckout" | "Purchase",
  data?: MetaEventData,
  eventId?: string,
) => {
  initializeMetaPixel();
  if (!window.fbq) return;
  const options = eventId ? { eventID: eventId } : undefined;
  window.fbq("track", eventName, data ?? {}, options);
};