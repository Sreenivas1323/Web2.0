"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";

import { NAV_LINKS, SITE, SOCIALS } from "../site";

const OPEN_EVENT = "palette:open";

export function openPalette() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [xray, setXray] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape" && document.documentElement.hasAttribute("data-xray")) {
        document.documentElement.removeAttribute("data-xray");
        setXray(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  const showToast = useCallback((message) => {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const run = useCallback((fn) => {
    setOpen(false);
    fn();
  }, []);

  const toggleXray = () =>
    run(() => {
      const next = !document.documentElement.hasAttribute("data-xray");
      document.documentElement.toggleAttribute("data-xray", next);
      setXray(next);
    });

  const copyEmail = () =>
    run(async () => {
      try {
        await navigator.clipboard.writeText(SITE.email);
        showToast(`${SITE.email} — copied`);
      } catch {
        showToast(SITE.email);
      }
    });

  return (
    <>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command palette"
        loop
      >
        <Command.Input placeholder="Type a command or search…" />
        <Command.List>
          <Command.Empty>Nothing found. Try “craft” or “xray”.</Command.Empty>

          <Command.Group heading="Navigate">
            {NAV_LINKS.map(({ href, label }) => (
              <Command.Item
                key={href}
                onSelect={() => run(() => router.push(href))}
              >
                <span>{label}</span>
                <span className="cmdk-shortcut">{href}</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Actions">
            <Command.Item onSelect={copyEmail} keywords={["contact", "mail"]}>
              <span>Copy email</span>
              <span className="cmdk-shortcut">{SITE.email}</span>
            </Command.Item>
            <Command.Item
              onSelect={() => run(() => window.open(`mailto:${SITE.email}`))}
              keywords={["contact", "hire"]}
            >
              <span>Email me</span>
              <span className="cmdk-shortcut">mailto ↗</span>
            </Command.Item>
            <Command.Item
              onSelect={toggleXray}
              keywords={["xray", "blueprint", "wireframe", "drive"]}
            >
              <span>{xray ? "Exit X-ray mode" : "X-ray mode"}</span>
              <span className="cmdk-shortcut">
                {xray ? "back to the product" : "see the blueprint"}
              </span>
            </Command.Item>
            <Command.Item
              onSelect={() =>
                run(() =>
                  window.open(
                    "https://github.com/Sreenivas1323/Web2.0",
                    "_blank"
                  )
                )
              }
              keywords={["code", "repo"]}
            >
              <span>View site source</span>
              <span className="cmdk-shortcut">github ↗</span>
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Elsewhere">
            {SOCIALS.map(({ label, href }) => (
              <Command.Item
                key={label}
                onSelect={() => run(() => window.open(href, "_blank"))}
              >
                <span>{label}</span>
                <span className="cmdk-shortcut">↗</span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command.Dialog>

      {xray && (
        <button
          type="button"
          onClick={toggleXray}
          className="fixed bottom-5 left-1/2 z-[80] -translate-x-1/2 rounded-full border border-[rgba(110,167,255,0.5)] bg-[#070b16] px-4 py-2 font-mono text-[10px] tracking-[2px] text-blueprint"
        >
          X-RAY MODE — CLICK OR ESC TO EXIT
        </button>
      )}

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-[80] -translate-x-1/2 rounded-full border border-line-mid bg-[#161616] px-4 py-2 font-mono text-[11px] text-ink">
          {toast}
        </div>
      )}
    </>
  );
}
