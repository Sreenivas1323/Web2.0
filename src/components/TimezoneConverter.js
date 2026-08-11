"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const FAVORITES = [
  { label: "UTC", tz: "UTC" },
  { label: "New York", tz: "America/New_York" },
  { label: "London", tz: "Europe/London" },
  { label: "Berlin", tz: "Europe/Berlin" },
  { label: "Mumbai", tz: "Asia/Kolkata" },
  { label: "Tokyo", tz: "Asia/Tokyo" },
  { label: "Sydney", tz: "Australia/Sydney" },
];

// Common abbreviations aren't 1:1 with IANA zones (CST is both US Central and
// China Standard Time), so ambiguous ones get one entry per region.
const ALIASES = [
  { zone: "Pacific/Honolulu", abbrs: ["HST"], region: "Hawaii" },
  { zone: "America/Anchorage", abbrs: ["AKST", "AKDT"], region: "Alaska" },
  { zone: "America/Los_Angeles", abbrs: ["PST", "PDT"], region: "US Pacific" },
  { zone: "America/Phoenix", abbrs: ["MST"], region: "US Mountain, no DST" },
  { zone: "America/Denver", abbrs: ["MST", "MDT"], region: "US Mountain" },
  { zone: "America/Chicago", abbrs: ["CST", "CDT"], region: "US Central" },
  { zone: "America/New_York", abbrs: ["EST", "EDT"], region: "US Eastern" },
  { zone: "America/Halifax", abbrs: ["AST", "ADT"], region: "Atlantic Canada" },
  { zone: "America/St_Johns", abbrs: ["NST", "NDT"], region: "Newfoundland" },
  { zone: "America/Sao_Paulo", abbrs: ["BRT"], region: "Brasilia" },
  { zone: "America/Argentina/Buenos_Aires", abbrs: ["ART"], region: "Argentina" },
  { zone: "America/Santiago", abbrs: ["CLT", "CLST"], region: "Chile" },
  { zone: "Europe/London", abbrs: ["GMT", "BST"], region: "UK" },
  { zone: "Europe/Lisbon", abbrs: ["WET", "WEST"], region: "Western Europe" },
  { zone: "Europe/Berlin", abbrs: ["CET", "CEST"], region: "Central Europe" },
  { zone: "Europe/Athens", abbrs: ["EET", "EEST"], region: "Eastern Europe" },
  { zone: "Europe/Moscow", abbrs: ["MSK"], region: "Moscow" },
  { zone: "Africa/Lagos", abbrs: ["WAT"], region: "West Africa" },
  { zone: "Africa/Johannesburg", abbrs: ["CAT", "SAST"], region: "Southern Africa" },
  { zone: "Africa/Nairobi", abbrs: ["EAT"], region: "East Africa" },
  { zone: "Asia/Jerusalem", abbrs: ["IST"], region: "Israel" },
  { zone: "Europe/Dublin", abbrs: ["IST"], region: "Ireland" },
  { zone: "Asia/Kolkata", abbrs: ["IST"], region: "India" },
  { zone: "Asia/Karachi", abbrs: ["PKT"], region: "Pakistan" },
  { zone: "Asia/Dhaka", abbrs: ["BST"], region: "Bangladesh" },
  { zone: "Asia/Yangon", abbrs: ["MMT"], region: "Myanmar" },
  { zone: "Asia/Bangkok", abbrs: ["ICT"], region: "Indochina" },
  { zone: "Asia/Jakarta", abbrs: ["WIB"], region: "Western Indonesia" },
  { zone: "Asia/Singapore", abbrs: ["SGT"], region: "Singapore" },
  { zone: "Asia/Hong_Kong", abbrs: ["HKT"], region: "Hong Kong" },
  { zone: "Asia/Shanghai", abbrs: ["CST"], region: "China" },
  { zone: "Asia/Taipei", abbrs: ["CST"], region: "Taiwan" },
  { zone: "Asia/Seoul", abbrs: ["KST"], region: "Korea" },
  { zone: "Asia/Tokyo", abbrs: ["JST"], region: "Japan" },
  { zone: "Asia/Dubai", abbrs: ["GST"], region: "Gulf" },
  { zone: "Asia/Riyadh", abbrs: ["AST"], region: "Arabia" },
  { zone: "Australia/Perth", abbrs: ["AWST"], region: "Western Australia" },
  { zone: "Australia/Adelaide", abbrs: ["ACST", "ACDT"], region: "Central Australia" },
  { zone: "Australia/Sydney", abbrs: ["AEST", "AEDT"], region: "Eastern Australia" },
  { zone: "Pacific/Auckland", abbrs: ["NZST", "NZDT"], region: "New Zealand" },
  { zone: "UTC", abbrs: ["UTC", "GMT"], region: "Coordinated Universal Time" },
];

const EXAMPLE_INPUT = "2026-11-30T06:00:00.000Z";
const MAX_RESULTS = 40;

function listTimezones() {
  try {
    return Intl.supportedValuesOf("timeZone");
  } catch {
    return FAVORITES.map((f) => f.tz);
  }
}

function cityName(zone) {
  return zone.split("/").pop().replace(/_/g, " ");
}

function buildEntries(zones) {
  const byZone = new Map();
  for (const zone of zones) {
    byZone.set(zone, { zone, city: cityName(zone), aliases: [] });
  }
  for (const alias of ALIASES) {
    if (!byZone.has(alias.zone)) {
      byZone.set(alias.zone, {
        zone: alias.zone,
        city: cityName(alias.zone),
        aliases: [],
      });
    }
    byZone.get(alias.zone).aliases.push(alias);
  }
  return [...byZone.values()];
}

function matchScore(entry, query) {
  const q = query.toLowerCase();
  const haystacks = [
    entry.zone.toLowerCase(),
    entry.city.toLowerCase(),
    ...entry.aliases.flatMap((a) => a.abbrs.map((abbr) => abbr.toLowerCase())),
    ...entry.aliases.map((a) => a.region.toLowerCase()),
  ];
  if (haystacks.some((h) => h === q)) return 3;
  if (haystacks.some((h) => h.startsWith(q))) return 2;
  if (haystacks.some((h) => h.includes(q))) return 1;
  return 0;
}

function datePartsIn(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const map = {};
  for (const part of parts) map[part.type] = part.value;
  return map;
}

function offsetIn(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "longOffset",
  }).formatToParts(date);
  const raw = parts.find((p) => p.type === "timeZoneName")?.value || "GMT+00:00";
  return raw.replace("GMT", "UTC");
}

function abbreviationIn(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "short",
  }).formatToParts(date);
  return parts.find((p) => p.type === "timeZoneName")?.value || "";
}

export default function TimezoneConverter() {
  const timezones = useMemo(listTimezones, []);
  const entries = useMemo(() => buildEntries(timezones), [timezones]);
  const entryByZone = useMemo(
    () => new Map(entries.map((e) => [e.zone, e])),
    [entries]
  );

  const [input, setInput] = useState(EXAMPLE_INPUT);
  const [tz, setTz] = useState("UTC");
  const [copiedKey, setCopiedKey] = useState(null);

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Local timezone is only known once mounted in the browser — setting it as
  // the initial state would make the server-rendered markup mismatch the client.
  useEffect(() => {
    setTz(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [isOpen]);

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return entries
      .map((entry) => ({ entry, score: matchScore(entry, q) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score || a.entry.city.localeCompare(b.entry.city))
      .slice(0, MAX_RESULTS)
      .map((r) => r.entry);
  }, [entries, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const selectEntry = (entry) => {
    setTz(entry.zone);
    setQuery("");
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const selectedEntry = entryByZone.get(tz);
  const displayValue = selectedEntry
    ? `${selectedEntry.city} · ${selectedEntry.zone}`
    : tz;

  const onInputKeyDown = (e) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
      setIsOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[activeIndex]) selectEntry(results[activeIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setQuery("");
      inputRef.current?.blur();
    }
  };

  const date = useMemo(() => {
    const parsed = new Date(input);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }, [input]);

  const result = useMemo(() => {
    if (!date) return null;
    try {
      const parts = datePartsIn(date, tz);
      const offset = offsetIn(date, tz);
      const abbr = abbreviationIn(date, tz);
      const iso = `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}${offset.replace("UTC", "")}`;
      const dayShift =
        `${parts.year}-${parts.month}-${parts.day}` !==
        date.toISOString().slice(0, 10);

      return {
        readable: new Intl.DateTimeFormat("en-US", {
          timeZone: tz,
          dateStyle: "full",
          timeStyle: "long",
        }).format(date),
        iso,
        offset,
        abbr,
        unix: Math.floor(date.getTime() / 1000),
        dayShift,
      };
    } catch {
      return null;
    }
  }, [date, tz]);

  const copy = (key, text) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1200);
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-line p-5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="tz-input"
            className="font-mono text-[9.5px] tracking-[1.5px] text-dim"
          >
            UTC TIMESTAMP (ISO 8601)
          </label>
          <button
            type="button"
            onClick={() => setInput(new Date().toISOString())}
            className="font-mono text-[9.5px] tracking-[1.5px] text-ash transition-colors hover:text-ink"
          >
            NOW →
          </button>
        </div>
        <input
          id="tz-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          className="mt-2.5 w-full rounded-lg border border-line bg-transparent px-3 py-2.5 font-mono text-[13px] text-ink outline-none transition-colors focus:border-line-bright"
          placeholder={EXAMPLE_INPUT}
        />
        {!date && (
          <p className="mt-2 font-mono text-[11px] text-pink">
            Not a parseable ISO 8601 string.
          </p>
        )}
      </div>

      <div className="rounded-xl border border-line p-5">
        <label
          htmlFor="tz-search"
          className="font-mono text-[9.5px] tracking-[1.5px] text-dim"
        >
          CONVERT TO
        </label>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {FAVORITES.map((f) => (
            <button
              key={f.tz}
              type="button"
              onClick={() => setTz(f.tz)}
              className={`rounded-full border px-2.5 py-1 font-mono text-[9.5px] tracking-wide transition-colors ${
                tz === f.tz
                  ? "border-line-bright text-ink"
                  : "border-line text-ash hover:border-line-mid hover:text-dim"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div ref={containerRef} className="relative mt-3">
          <input
            id="tz-search"
            ref={inputRef}
            role="combobox"
            aria-expanded={isOpen}
            aria-controls="tz-listbox"
            aria-autocomplete="list"
            aria-activedescendant={
              isOpen && results[activeIndex]
                ? `tz-option-${results[activeIndex].zone}`
                : undefined
            }
            value={isOpen ? query : displayValue}
            onFocus={() => {
              setIsOpen(true);
              setQuery("");
            }}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onKeyDown={onInputKeyDown}
            spellCheck={false}
            placeholder="Search city, region, or abbreviation — PST, CST, IST, JST…"
            className="w-full rounded-lg border border-line bg-transparent px-3 py-2.5 font-mono text-[13px] text-ink outline-none transition-colors focus:border-line-bright"
          />

          {isOpen && (
            <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-10 max-h-72 overflow-y-auto rounded-lg border border-line-mid bg-[#0e0e0e] shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
              {query.trim() === "" ? (
                <p className="px-3 py-3 font-mono text-[11px] text-ash">
                  Type to search 400+ timezones by city, IANA id, or
                  abbreviation (PST, CST, IST, JST…).
                </p>
              ) : results.length === 0 ? (
                <p className="px-3 py-3 font-mono text-[11px] text-ash">
                  No match for &ldquo;{query}&rdquo;.
                </p>
              ) : (
                <ul id="tz-listbox" role="listbox">
                  {results.map((entry, i) => (
                    <li
                      key={entry.zone}
                      id={`tz-option-${entry.zone}`}
                      role="option"
                      aria-selected={i === activeIndex}
                    >
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => selectEntry(entry)}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={`flex w-full items-center justify-between px-3 py-2 text-left transition-colors ${
                          i === activeIndex ? "bg-white/[0.06]" : ""
                        }`}
                      >
                        <span>
                          <span className="font-mono text-[12.5px] text-ink">
                            {entry.city}
                          </span>
                          <span className="ml-2 font-mono text-[10px] text-ash">
                            {entry.zone}
                          </span>
                        </span>
                        {entry.aliases.length > 0 && (
                          <span className="font-mono text-[9.5px] tracking-wide text-dim">
                            {[
                              ...new Set(
                                entry.aliases.flatMap((a) => a.abbrs)
                              ),
                            ].join("/")}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {result && (
        <div className="rounded-xl border border-line p-5">
          <p className="font-mono text-[9.5px] tracking-[1.5px] text-dim">
            RESULT
          </p>
          <p className="mt-2.5 text-[16px] leading-snug text-ink">
            {result.readable}
            {result.dayShift && (
              <span className="ml-2 rounded-full border border-line px-2 py-0.5 font-mono text-[9px] tracking-wide text-amber">
                DATE SHIFTS
              </span>
            )}
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              ["ISO", result.iso],
              ["OFFSET", result.offset],
              ["ABBREVIATION", result.abbr || "—"],
              ["UNIX", String(result.unix)],
            ].map(([label, value]) => (
              <button
                key={label}
                type="button"
                onClick={() => copy(label, value)}
                className="group flex items-center justify-between rounded-lg border border-line px-3 py-2 text-left transition-colors hover:border-line-mid"
              >
                <span>
                  <span className="block font-mono text-[9px] tracking-[1.5px] text-dim">
                    {label}
                  </span>
                  <span className="font-mono text-[12.5px] text-ink">
                    {value}
                  </span>
                </span>
                <span className="font-mono text-[9.5px] text-ash group-hover:text-dim">
                  {copiedKey === label ? "copied" : "copy"}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
