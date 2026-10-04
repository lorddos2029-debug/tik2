const cookie = (name: string) => {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match?.[1] ? decodeURIComponent(match[1]) : "";
};

const UTM_KEY = "tt_utm_parameters";
const UTM_NAMES = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "src",
  "sck",
] as const;

type StoredUtms = Partial<Record<(typeof UTM_NAMES)[number], string>>;

const persistentUtms = () => {
  if (typeof window === "undefined") return {} as StoredUtms;
  let stored: StoredUtms = {};
  try {
    stored = JSON.parse(window.localStorage.getItem(UTM_KEY) ?? "{}") as StoredUtms;
  } catch {
    stored = {};
  }
  const params = new URLSearchParams(window.location.search);
  const merged = { ...stored };
  for (const name of UTM_NAMES) {
    const value = params.get(name);
    if (value) merged[name] = value;
  }
  try {
    window.localStorage.setItem(UTM_KEY, JSON.stringify(merged));
  } catch {
    /* armazenamento indisponível */
  }
  return merged;
};

export interface Tracking {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  src: string;
  sck: string;
  fbp: string;
  fbc: string;
  evento_id: string;
  user_agent: string;
}

export const newEventId = () =>
  `ev_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

/** Captures UTMs, Facebook cookies and user agent from the browser. */
export const collectTracking = (eventId: string): Tracking => {
  const params =
    typeof window === "undefined"
      ? new URLSearchParams()
      : new URLSearchParams(window.location.search);
  const get = (k: string) => params.get(k) ?? "";
  const utms = persistentUtms();
  const tracked = (key: keyof StoredUtms) => get(key) || utms[key] || "";
  const fbclid = get("fbclid");
  return {
    utm_source: tracked("utm_source"),
    utm_medium: tracked("utm_medium"),
    utm_campaign: tracked("utm_campaign"),
    utm_content: tracked("utm_content"),
    utm_term: tracked("utm_term"),
    src: tracked("src"),
    sck: tracked("sck"),
    fbp: cookie("_fbp"),
    fbc: cookie("_fbc") || (fbclid ? `fb.1.${Date.now()}.${fbclid}` : ""),
    evento_id: eventId,
    user_agent: typeof navigator === "undefined" ? "" : navigator.userAgent,
  };
};
