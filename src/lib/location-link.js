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

const BOILERPLATE =
  /(swiggy|zomato|tap the link|open the link|download|shared (a|my) location|save my address|one[- ]time|valid for|using the link)/i;

// Strip links, emoji-only lines and app boilerplate so what's left reads as
// the address someone typed. Swiggy's address share labels it "Address: …".
export function addressFrom(text) {
  const labelled = /^\s*address\s*[:\-]\s*(.+)$/im.exec(text || "");
  const source = labelled ? labelled[1] : text || "";
  return source
    .replace(URL_RE, "")
    .replace(new RegExp(PAIR_RE.source, "g"), "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /[a-z0-9]/i.test(line))
    .filter((line) => labelled || !BOILERPLATE.test(line))
    .join(", ")
    .replace(/\s*,\s*,+/g, ",")
    .replace(/\s{2,}/g, " ")
    .replace(/^[,\s:-]+|[,\s:-]+$/g, "")
    .slice(0, 240);
}

// Swiggy's "save my address" page (/ofo/address/<name>/<id>) only hands the
// address to a logged-in Swiggy app, so a link landing there has no pin.
// Short links (onelink etc.) aren't judged here — where they land can vary
// per link, so the unfurl route follows them and checks each hop.
export function isLockedLink(raw) {
  try {
    const url = new URL(raw);
    return /(^|\.)swiggy\.com$/.test(url.hostname) && url.pathname.startsWith("/ofo/address");
  } catch {
    return false;
  }
}

// Geocoders choke on flat numbers and building names, so try the full
// address first and then peel leading parts off: "B 001, SVS Orchids,
// Kalkere, Bengaluru…" → "SVS Orchids, Kalkere…" → "Kalkere, Bengaluru…".
export function geocodeCandidates(address) {
  const parts = address
    .split(/,|\s\/\s/)
    .map((p) => p.trim())
    .filter(Boolean);
  // A leading unit number ("B 001", "Flat 4B", "#12") never matches.
  const unit = /^(flat|apt|unit|door|no\.?|#)?\s*[a-z]?[\s-]?\d+[a-z]?$/i;
  const out = [];
  for (let i = 0; i < parts.length - 2; i++) {
    if (i === 0 && unit.test(parts[0])) continue;
    out.push(parts.slice(i).join(", "));
  }
  return out.length ? out : [address];
}

export function parseShare(text) {
  const urls = extractUrls(text);
  const address = addressFrom(text);
  const locked = urls.some(isLockedLink);
  for (const url of urls) {
    const found = pinFromUrl(url);
    if (found) return { pin: found, urls, address, locked };
  }
  const loose = pairFrom(text.replace(URL_RE, ""), "text");
  return { pin: loose, urls, address, locked };
}

export function formatPin({ lat, lng }) {
  return `${lat.toFixed(6)},${lng.toFixed(6)}`;
}

// Zomato mints its own share links server-side, so the handoff is what its
// "Add address" search takes: the written address first, with a pin and
// maps link to check against. Keep every outgoing format in one place.
// An approximate (area-level) pin is only for eyeballing: the maps link then
// searches the full address, which Google resolves better than we can.
export function buildZomatoHandoff(pinValue, address, { approximate = false } = {}) {
  const coords = pinValue ? formatPin(pinValue) : null;
  const maps =
    coords && !(approximate && address)
      ? `https://www.google.com/maps/search/?api=1&query=${coords}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const lines = [
    "📍 Delivery location for Zomato",
    address || null,
    coords ? `${approximate ? "Approx. area pin" : "Pin"}: ${coords}` : null,
    maps,
    `Zomato → Add address → search ${address ? "the address" : "the pin"}, then confirm the pin on the map.`,
  ].filter(Boolean);
  return {
    coords,
    maps,
    zomato: "https://www.zomato.com/",
    message: lines.join("\n"),
  };
}
