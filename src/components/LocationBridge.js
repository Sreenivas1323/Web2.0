"use client";

import { useEffect, useMemo, useState } from "react";

import {
  buildZomatoHandoff,
  formatPin,
  parseShare,
} from "../lib/location-link";

const SAMPLE = `Flat 4B, 12th Main, Indiranagar, Bengaluru 560038
https://maps.google.com/?q=12.971599,77.641151`;

function osmEmbed({ lat, lng }) {
  const d = 0.004;
  const bbox = [lng - d, lat - d, lng + d, lat + d].join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
}

export default function LocationBridge() {
  const [input, setInput] = useState("");
  const [remote, setRemote] = useState({ url: null, status: "idle", pin: null, locked: false, error: null });
  const [geo, setGeo] = useState({ status: "idle", pin: null, precision: null, error: null });
  const [address, setAddress] = useState("");
  const [copiedKey, setCopiedKey] = useState(null);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const parsed = useMemo(() => parseShare(input), [input]);

  useEffect(() => {
    setAddress(parsed.address);
  }, [parsed.address]);

  // Short links carry no coordinates until they're followed, which a browser
  // can't do cross-origin — hand those to the unfurl route, which reports
  // whether the link ended on Swiggy's login-only address page.
  const shortLink = !parsed.pin && !parsed.locked ? parsed.urls[0] : null;
  useEffect(() => {
    if (!shortLink) {
      setRemote({ url: null, status: "idle", pin: null, locked: false, error: null });
      return;
    }
    const controller = new AbortController();
    setRemote({ url: shortLink, status: "loading", pin: null, locked: false, error: null });
    const timer = setTimeout(() => {
      fetch(`/api/unfurl?url=${encodeURIComponent(shortLink)}`, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((data) =>
          setRemote({
            url: shortLink,
            status: data.pin ? "found" : "missing",
            pin: data.pin,
            locked: !!data.locked,
            error: data.error || null,
          })
        )
        .catch((err) => {
          if (err.name === "AbortError") return;
          setRemote({ url: shortLink, status: "missing", pin: null, locked: false, error: "Couldn't reach the link." });
        });
    }, 350);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [shortLink]);

  // No pin in the link → fall back to geocoding the written address.
  const linkDone = !shortLink || remote.status === "missing";
  const geocodeQuery =
    !parsed.pin && linkDone && parsed.address.length >= 6 ? parsed.address : null;
  useEffect(() => {
    if (!geocodeQuery) {
      setGeo({ status: "idle", pin: null, precision: null, error: null });
      return;
    }
    const controller = new AbortController();
    setGeo({ status: "loading", pin: null, precision: null, error: null });
    const timer = setTimeout(() => {
      fetch(`/api/geocode?q=${encodeURIComponent(geocodeQuery)}`, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((data) =>
          setGeo({
            status: data.pin ? "found" : "missing",
            pin: data.pin,
            precision: data.precision || null,
            error: data.error || null,
          })
        )
        .catch((err) => {
          if (err.name === "AbortError") return;
          setGeo({ status: "missing", pin: null, precision: null, error: null });
        });
    }, 500);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [geocodeQuery]);

  const pin = parsed.pin || remote.pin || geo.pin;
  const trimmedAddress = address.trim();
  const handoff =
    pin || trimmedAddress
      ? buildZomatoHandoff(pin, trimmedAddress, {
          approximate: pin?.source === "address" && geo.precision !== "exact",
        })
      : null;

  const copy = (key, text) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1200);
    });
  };

  const share = () => {
    navigator.share?.({ text: handoff.message }).catch(() => {});
  };

  const locked = parsed.locked || remote.locked;
  let status = null;
  if (input.trim() && !parsed.pin && !remote.pin) {
    if (remote.status === "loading") {
      status = <span className="text-dim">Following the link…</span>;
    } else if (geo.status === "loading") {
      status = (
        <span className="text-dim">
          {locked
            ? "Swiggy keeps this pin behind its app login — locating the written address instead…"
            : "Locating the written address…"}
        </span>
      );
    } else if (geo.status === "found" && locked) {
      status = (
        <span className="text-dim">
          Swiggy keeps this pin behind its app login, so it&apos;s placed from
          the written address.
        </span>
      );
    } else if (!parsed.address && locked) {
      status = (
        <span className="text-pink">
          Swiggy only opens this link inside its app. Paste the whole message
          — the address line is what carries over.
        </span>
      );
    } else if (!parsed.address && remote.status === "missing") {
      status = (
        <span className="text-pink">
          {remote.error || "No location inside that link."} Try pasting the
          whole share message.
        </span>
      );
    } else if (!parsed.address && !parsed.urls.length) {
      status = <span className="text-pink">No link, address or coordinates found yet.</span>;
    } else if (geo.status === "missing") {
      status = (
        <span className="text-amber">
          {geo.error || "Couldn't place that address on the map."} You can
          still search it in Zomato.
        </span>
      );
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-line p-5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="share-input"
            className="font-mono text-[9.5px] tracking-[1.5px] text-dim"
          >
            SWIGGY SHARE — LINK OR WHOLE MESSAGE
          </label>
          <button
            type="button"
            onClick={() => setInput(SAMPLE)}
            className="font-mono text-[9.5px] tracking-[1.5px] text-ash transition-colors hover:text-ink"
          >
            SAMPLE →
          </button>
        </div>
        <textarea
          id="share-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          rows={4}
          placeholder="Paste what Swiggy shared — https://swig.gy/…, a maps link, or 12.9716, 77.5946"
          className="mt-2.5 w-full resize-y rounded-lg border border-line bg-transparent px-3 py-2.5 font-mono text-[13px] leading-relaxed text-ink outline-none transition-colors focus:border-line-bright"
        />
        {status && <p className="mt-2 font-mono text-[11px]">{status}</p>}
      </div>

      {handoff && (
        <div className="rounded-xl border border-line p-5">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[9.5px] tracking-[1.5px] text-dim">
              FOR ZOMATO
            </p>
            {pin && (
              <p className="font-mono text-[9.5px] tracking-wide text-ash">
                {pin.source === "address"
                  ? geo.precision === "exact"
                    ? "pin from address"
                    : "approximate pin · area match"
                  : `pin from ${pin.source === "page" ? "the landing page" : pin.source}`}
              </p>
            )}
          </div>

          {pin && (
            <div className="mt-3 overflow-hidden rounded-lg border border-line">
              <iframe
                key={formatPin(pin)}
                title="Pin preview"
                src={osmEmbed(pin)}
                loading="lazy"
                className="block h-48 w-full grayscale invert-[0.92] hue-rotate-180"
              />
            </div>
          )}

          <label
            htmlFor="address-input"
            className="mt-4 block font-mono text-[9px] tracking-[1.5px] text-dim"
          >
            SEARCH THIS IN ZOMATO (EDITABLE)
          </label>
          <div className="mt-1.5 flex gap-2">
            <input
              id="address-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Flat, floor, landmark — optional"
              className="min-w-0 flex-1 rounded-lg border border-line bg-transparent px-3 py-2 text-[13px] text-ink outline-none transition-colors focus:border-line-bright"
            />
            {trimmedAddress && (
              <button
                type="button"
                onClick={() => copy("ADDRESS", trimmedAddress)}
                className="shrink-0 rounded-lg border border-line px-3 font-mono text-[9.5px] text-ash transition-colors hover:border-line-mid hover:text-dim"
              >
                {copiedKey === "ADDRESS" ? "copied" : "copy"}
              </button>
            )}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              handoff.coords && ["PIN", handoff.coords],
              ["MAP LINK", handoff.maps],
            ].filter(Boolean).map(([label, value]) => (
              <button
                key={label}
                type="button"
                onClick={() => copy(label, value)}
                className="group flex min-w-0 items-center justify-between gap-3 rounded-lg border border-line px-3 py-2 text-left transition-colors hover:border-line-mid"
              >
                <span className="min-w-0">
                  <span className="block font-mono text-[9px] tracking-[1.5px] text-dim">
                    {label}
                  </span>
                  <span className="block truncate font-mono text-[12.5px] text-ink">
                    {value}
                  </span>
                </span>
                <span className="shrink-0 font-mono text-[9.5px] text-ash group-hover:text-dim">
                  {copiedKey === label ? "copied" : "copy"}
                </span>
              </button>
            ))}
          </div>

          <pre className="mt-4 whitespace-pre-wrap break-all rounded-lg border border-line px-3 py-2.5 font-mono text-[11.5px] leading-relaxed text-dim">
            {handoff.message}
          </pre>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => copy("MESSAGE", handoff.message)}
              className="rounded-full border border-line-bright px-3.5 py-1.5 font-mono text-[10px] tracking-wide text-ink transition-colors hover:border-ink"
            >
              {copiedKey === "MESSAGE" ? "Copied" : "Copy message"}
            </button>
            {canShare && (
              <button
                type="button"
                onClick={share}
                className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[10px] tracking-wide text-ash transition-colors hover:border-line-mid hover:text-ink"
              >
                Share…
              </button>
            )}
            {/* Zomato has no public "add address" link, but its app claims
                every zomato.com URL — so copy what to paste, then hand off. */}
            <a
              href={handoff.zomato}
              target="_blank"
              rel="noreferrer"
              onClick={() => copy("OPEN", trimmedAddress || handoff.coords)}
              className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[10px] tracking-wide text-ash transition-colors hover:border-line-mid hover:text-ink"
            >
              {copiedKey === "OPEN" ? "Copied — opening Zomato ↗" : "Copy address & open Zomato ↗"}
            </a>
          </div>
          <p className="mt-3 font-mono text-[10px] leading-relaxed text-ash">
            In Zomato: tap the location at the top → Add address → paste, then
            nudge the pin onto the building.
          </p>
        </div>
      )}
    </div>
  );
}
