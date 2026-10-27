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
  const [remote, setRemote] = useState({ url: null, status: "idle", pin: null, error: null });
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
  // can't do cross-origin — hand those to the unfurl route.
  const shortLink = !parsed.pin ? parsed.urls[0] : null;
  useEffect(() => {
    if (!shortLink) {
      setRemote({ url: null, status: "idle", pin: null, error: null });
      return;
    }
    const controller = new AbortController();
    setRemote({ url: shortLink, status: "loading", pin: null, error: null });
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
            error: data.error || null,
          })
        )
        .catch((err) => {
          if (err.name === "AbortError") return;
          setRemote({ url: shortLink, status: "missing", pin: null, error: "Couldn't reach the link." });
        });
    }, 350);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [shortLink]);

  const pin = parsed.pin || remote.pin;
  const handoff = pin ? buildZomatoHandoff(pin, address.trim()) : null;

  const copy = (key, text) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1200);
    });
  };

  const share = () => {
    navigator.share?.({ text: handoff.message }).catch(() => {});
  };

  let status = null;
  if (input.trim() && !pin) {
    if (remote.status === "loading") {
      status = <span className="text-dim">Following the link…</span>;
    } else if (remote.status === "missing") {
      status = (
        <span className="text-pink">
          {remote.error || "No location inside that link."} Try pasting the
          whole share message.
        </span>
      );
    } else if (!parsed.urls.length) {
      status = (
        <span className="text-pink">
          No link or coordinates found yet.
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
            <p className="font-mono text-[9.5px] tracking-wide text-ash">
              pin from {pin.source === "page" ? "the landing page" : pin.source}
            </p>
          </div>

          <div className="mt-3 overflow-hidden rounded-lg border border-line">
            <iframe
              key={formatPin(pin)}
              title="Pin preview"
              src={osmEmbed(pin)}
              loading="lazy"
              className="block h-48 w-full grayscale invert-[0.92] hue-rotate-180"
            />
          </div>

          <label
            htmlFor="address-input"
            className="mt-4 block font-mono text-[9px] tracking-[1.5px] text-dim"
          >
            ADDRESS LINE (EDITABLE)
          </label>
          <input
            id="address-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Flat, floor, landmark — optional"
            className="mt-1.5 w-full rounded-lg border border-line bg-transparent px-3 py-2 text-[13px] text-ink outline-none transition-colors focus:border-line-bright"
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              ["PIN", handoff.coords],
              ["MAP LINK", handoff.maps],
            ].map(([label, value]) => (
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

          <pre className="mt-4 whitespace-pre-wrap rounded-lg border border-line px-3 py-2.5 font-mono text-[11.5px] leading-relaxed text-dim">
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
            <a
              href={handoff.zomato}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[10px] tracking-wide text-ash transition-colors hover:border-line-mid hover:text-ink"
            >
              Open Zomato ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
