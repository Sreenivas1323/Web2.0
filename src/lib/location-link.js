// Pulls a lat/lng pin out of whatever a delivery app shares — a bare link, a
// short link that has already been unfurled, or a whole "here's my address"
// message — and turns it back into links other apps understand.

const URL_RE = /https?:\/\/[^\s<>"'`]+/gi;

// Param names seen across Swiggy, Google Maps, AppsFlyer and Branch links.
const LAT_KEYS = ["lat", "latitude", "user_lat", "userlat", "la", "plat"];
const LNG_KEYS = ["lng", "lon", "long", "longitude", "user_lng", "userlng", "lo", "plng"];
const PAIR_KEYS = ["q", "query", "ll", "sll", "center", "destination", "daddr", "location", "loc", "coords", "latlng", "point"];

const DECIMAL = String.raw`-?\d{1,3}\.\d{3,}`;
const PAIR_RE = new RegExp(`(${DECIMAL})\\s*,\\s*(${DECIMAL})`);
// Inside a known param (?q=, ?ll=) a short pair like 12.9,77.6 is still a pin.
const PARAM_PAIR_RE = /^\s*(-?\d{1,3}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)/;

export function isValidPin(lat, lng) {
  return (
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    Math.abs(lat) <= 90 &&
    Math.abs(lng) <= 180 &&
    !(lat === 0 && lng === 0)
  );
}

function pin(lat, lng, source) {
  const la = Number(lat);
  const ln = Number(lng);
  return isValidPin(la, ln) ? { lat: la, lng: ln, source } : null;
}

function pairFrom(text, source, re = PAIR_RE) {
  const m = re.exec(text || "");
  return m ? pin(m[1], m[2], source) : null;
}

export function extractUrls(text) {
  return [...(text || "").matchAll(URL_RE)].map((m) =>
    m[0].replace(/[),.;!?]+$/, "")
  );
}

function tryDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function tryBase64(value) {
  if (!/^[A-Za-z0-9+/_-]{16,}={0,2}$/.test(value)) return null;
  try {
    const text = atob(value.replace(/-/g, "+").replace(/_/g, "/"));
    return /lat|lng|lon/i.test(text) ? text : null;
  } catch {
    return null;
  }
}

// Looks for "lat": 12.97 / "lng": 77.59 style pairs in JSON or HTML.
export function pinFromMarkup(text, source = "page") {
  if (!text) return null;
  const num = String.raw`["']?\s*[:=]\s*["']?(-?\d{1,3}\.\d+)`;
  const lat = new RegExp(`(?:latitude|"lat"|'lat'|\\blat)${num}`, "i").exec(text);
  const lng = new RegExp(`(?:longitude|"lng"|'lng'|"lon"|\\blng|\\blon)${num}`, "i").exec(text);
  if (lat && lng) {
    const found = pin(lat[1], lng[1], source);
    if (found) return found;
  }
  const google = /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/.exec(text);
  if (google) return pin(google[1], google[2], source);
  return null;
}

export function pinFromUrl(raw, depth = 0) {
  if (depth > 3) return null;
  let url;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }

  const params = new Map();
  for (const [key, value] of url.searchParams) params.set(key.toLowerCase(), value);
  // Hash-routed SPAs put their query after the #.
  const hashQuery = url.hash.includes("?") ? url.hash.slice(url.hash.indexOf("?") + 1) : "";
  for (const [key, value] of new URLSearchParams(hashQuery)) params.set(key.toLowerCase(), value);

  const latKey = LAT_KEYS.find((k) => params.has(k));
  const lngKey = LNG_KEYS.find((k) => params.has(k));
  if (latKey && lngKey) {
    const found = pin(params.get(latKey), params.get(lngKey), "link");
    if (found) return found;
  }

  for (const key of PAIR_KEYS) {
    if (params.has(key)) {
      const found = pairFrom(params.get(key), "link", PARAM_PAIR_RE);
      if (found) return found;
    }
  }

  const path = tryDecode(url.pathname);
  const at = /@(-?\d+\.\d+),(-?\d+\.\d+)/.exec(path);
  if (at) return pin(at[1], at[2], "link");
  const fromPath = pinFromMarkup(path, "link") || pairFrom(path, "link");
  if (fromPath) return fromPath;

  // AppsFlyer / Branch links tuck the real deep link (or a base64 payload)
  // inside a param — dig one level in.
  for (const value of params.values()) {
    const decoded = tryDecode(value);
    if (/^[a-z][\w+.-]*:\/\//i.test(decoded)) {
      const nested = pinFromUrl(decoded.replace(/^[a-z][\w+.-]*:\/\//i, "https://"), depth + 1);
      if (nested) return nested;
    }
    const fromJson = pinFromMarkup(decoded, "link") || pinFromMarkup(tryBase64(value), "link");
    if (fromJson) return fromJson;
  }

  return null;
}

// Strip links, emoji-only lines and app boilerplate so what's left reads as
// the address someone typed.
export function addressFrom(text) {
  return (text || "")
    .replace(URL_RE, "")
    .replace(new RegExp(PAIR_RE.source, "g"), "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /[a-z0-9]/i.test(line))
    .filter((line) => !/(swiggy|zomato|tap the link|open the link|download|shared (a|my) location)/i.test(line))
    .join(", ")
    .replace(/\s*,\s*,+/g, ",")
    .replace(/\s{2,}/g, " ")
    .replace(/^[,\s:-]+|[,\s:-]+$/g, "")
    .slice(0, 240);
}

export function parseShare(text) {
  const urls = extractUrls(text);
  for (const url of urls) {
    const found = pinFromUrl(url);
    if (found) return { pin: found, urls, address: addressFrom(text) };
  }
  const loose = pairFrom(text.replace(URL_RE, ""), "text");
  return { pin: loose, urls, address: addressFrom(text) };
}

export function formatPin({ lat, lng }) {
  return `${lat.toFixed(6)},${lng.toFixed(6)}`;
}

// Zomato mints its own share links server-side, so the most reliable handoff
// is a pin Zomato's "Add address" search will accept plus a maps link the
// recipient can sanity-check. Keep every outgoing format in one place.
export function buildZomatoHandoff(pinValue, address) {
  const coords = formatPin(pinValue);
  const maps = `https://www.google.com/maps/search/?api=1&query=${coords}`;
  const lines = [
    "📍 Delivery location for Zomato",
    address || null,
    `Pin: ${coords}`,
    maps,
    "Zomato → Add address → paste the pin in the search bar.",
  ].filter(Boolean);
  return {
    coords,
    maps,
    zomato: "https://www.zomato.com/",
    message: lines.join("\n"),
  };
}
