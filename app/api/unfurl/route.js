import { pinFromMarkup, pinFromUrl } from "../../../src/lib/location-link";

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
const UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";

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
    if (!isAllowed(current)) {
      return Response.json(
        { error: `Won't follow links to ${current.hostname}.`, hops },
        { status: 400 }
      );
    }

    const fromUrl = pinFromUrl(current.href);
    if (fromUrl) return Response.json({ pin: fromUrl, hops });

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
    const pin = pinFromMarkup(body);
    if (pin) return Response.json({ pin, hops });
    if (softRedirect) {
      current = new URL(softRedirect.replace(/&amp;/g, "&"), current);
      hops.push(current.href);
      continue;
    }
    return Response.json({ pin: null, hops });
  }

  return Response.json({ pin: null, hops });
}
