import { geocodeCandidates } from "../../../src/lib/location-link";

// Turns a written address into an approximate pin via OpenStreetMap's
// Nominatim. Their policy asks for an identifying UA, ≤1 request a second
// and caching, so candidates are tried in sequence and results cached a day.
const UA = "ssaisreenivas.in craft lab (https://ssaisreenivas.in/craft/swiggy-to-zomato)";
const MAX_TRIES = 5;

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function lookup(q) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.search = new URLSearchParams({ q, format: "jsonv2", limit: "1", countrycodes: "in" });
  const res = await fetch(url, {
    headers: { "user-agent": UA, "accept-language": "en" },
    signal: AbortSignal.timeout(6000),
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`nominatim ${res.status}`);
  const [hit] = await res.json();
  return hit ? { lat: Number(hit.lat), lng: Number(hit.lon), label: hit.display_name } : null;
}

export async function GET(request) {
  const q = (new URL(request.url).searchParams.get("q") || "").trim().slice(0, 240);
  if (q.length < 6) {
    return Response.json({ error: "Address is too short to look up." }, { status: 400 });
  }

  const candidates = geocodeCandidates(q).slice(0, MAX_TRIES);
  try {
    for (const [i, candidate] of candidates.entries()) {
      if (i > 0) await wait(1000);
      const hit = await lookup(candidate);
      if (hit) {
        return Response.json({
          pin: { lat: hit.lat, lng: hit.lng, source: "address" },
          matched: candidate,
          label: hit.label,
          precision: i === 0 ? "exact" : "area",
        });
      }
    }
  } catch {
    return Response.json({ error: "Address lookup is unavailable right now." }, { status: 502 });
  }
  return Response.json({ pin: null });
}
