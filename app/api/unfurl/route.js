import { isLockedLink, pinFromUrl } from "../../../src/lib/location-link";

// Follows a share short link (swig.gy, onelink, maps.app.goo.gl…) to wherever
// it lands and reports the pin. Only known link hosts are followed, at every
// hop, so this can't be pointed at arbitrary or internal URLs.
const ALLOWED_HOSTS = [
  "swiggy.com",
  "swig.gy",
  "swiggy.onelink.me",
  "swiggy.app.link",
  "swiggy.page.link",
  "zomato.com",
  "zoma.to",
  "goo.gl",
  "maps.app.goo.gl",
  "google.com",
  "google.co.in",
  "maps.google.com",
];
const MAX_HOPS = 6;
const MAX_BYTES = 512 * 1024;
// App-install links bounce phones to the App Store; a desktop UA gets the
// web fallback, which is where any coordinates would live.
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
const DEAD_ENDS = ["apps.apple.com", "itunes.apple.com", "play.google.com"];

function isAllowed(url) {
  if (url.protocol !== "https:" && url.protocol !== "http:") return false;
  const host = url.hostname.toLowerCase();
  return ALLOWED_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));
}

async function readCapped(res) {
  const reader = res.body?.getReader();
  if (!reader) return "";
  const chunks = [];
  let size = 0;
  while (size < MAX_BYTES) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    size += value.length;
  }
  reader.cancel().catch(() => {});
  return new TextDecoder().decode(Buffer.concat(chunks));
}

export async function GET(request) {
  const target = new URL(request.url).searchParams.get("url");
  let current;
  try {
    current = new URL(target);
  } catch {
    return Response.json({ error: "That isn't a link." }, { status: 400 });
  }

  const hops = [current.href];
  for (let i = 0; i < MAX_HOPS; i++) {
    // Check the URL itself first: a hop can carry the pin in its params
    // (or in a nested deep link) even when the page behind it is locked.
    const fromUrl = pinFromUrl(current.href);
    if (fromUrl) return Response.json({ pin: fromUrl, hops });

    if (DEAD_ENDS.includes(current.hostname)) {
      return Response.json({ pin: null, hops });
    }
    if (isLockedLink(current.href)) {
      return Response.json({ pin: null, locked: true, hops });
    }
    if (!isAllowed(current)) {
      return Response.json(
        { error: `Won't follow links to ${current.hostname}.`, hops },
        { status: 400 }
      );
    }

    let res;
    try {
      res = await fetch(current, {
        redirect: "manual",
        headers: { "user-agent": UA, accept: "text/html,*/*" },
        signal: AbortSignal.timeout(6000),
        cache: "no-store",
      });
    } catch {
      return Response.json({ error: "The link didn't respond.", hops }, { status: 502 });
    }

    const location = res.headers.get("location");
    if (res.status >= 300 && res.status < 400 && location) {
      current = new URL(location, current);
      hops.push(current.href);
      continue;
    }

    const body = await readCapped(res);
    // Some short links redirect with a meta refresh or JS instead of a 3xx.
    const softRedirect =
      /http-equiv=["']?refresh["']?[^>]*url=([^"'>\s]+)/i.exec(body)?.[1] ||
      /window\.location(?:\.href)?\s*=\s*["']([^"']+)["']/i.exec(body)?.[1];
    // Only trust explicit place markup — app shells embed a default city
    // centre as "lat"/"lng" in their bootstrap state.
    const meta =
      /place:location:latitude["']?\s+content=["'](-?[\d.]+)[\s\S]{0,200}?place:location:longitude["']?\s+content=["'](-?[\d.]+)/i.exec(body) ||
      /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/.exec(body);
    if (meta) {
      return Response.json({ pin: { lat: Number(meta[1]), lng: Number(meta[2]), source: "page" }, hops });
    }
    if (softRedirect) {
      current = new URL(softRedirect.replace(/&amp;/g, "&"), current);
      hops.push(current.href);
      continue;
    }
    return Response.json({ pin: null, hops });
  }

  return Response.json({ pin: null, hops });
}
