"use client";

import { useEffect, useRef, useState } from "react";
import { LogoAsset } from "./LogoAsset";

export type SuiteStatusTool = {
  name: string;
  initials: string;
  logoSrc: string;
  status: "Live" | "Prototype";
  appHref: string;
};

type PingResult = {
  ok: boolean;
  ms: number | null;
};

const PING_INTERVAL_MS = 45_000;

/**
 * The Suite Status card, made alive: rows resolve one by one on load
 * (skeleton shimmer -> badge pops in), the two live apps are genuinely
 * pinged from the browser with their latency shown inline, a footer line
 * reports reachability and freshness, a glare follows the cursor across
 * the glass, and hovering a row lights up the matching tool card below.
 */
export function SuiteStatus({ tools }: { tools: SuiteStatusTool[] }) {
  const [resolvedCount, setResolvedCount] = useState(0);
  const [pings, setPings] = useState<Record<string, PingResult>>({});
  const [checkedAt, setCheckedAt] = useState<number | null>(null);
  const [nowTick, setNowTick] = useState(() => Date.now());
  const panelRef = useRef<HTMLElement>(null);

  // Beat 1: rows resolve in sequence shortly after mount.
  useEffect(() => {
    const timers = tools.map((_, index) =>
      window.setTimeout(
        () => setResolvedCount((count) => Math.max(count, index + 1)),
        480 + index * 240,
      ),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [tools]);

  // Really check the live apps. no-cors keeps it CORS-safe: the response is
  // opaque, but resolve/reject still tells us reachable vs not, and the
  // round-trip time is real.
  useEffect(() => {
    let cancelled = false;
    async function checkLiveApps() {
      const liveTools = tools.filter((tool) => tool.status === "Live");
      const entries = await Promise.all(
        liveTools.map(async (tool) => {
          const started = performance.now();
          try {
            await fetch(tool.appHref, { mode: "no-cors", cache: "no-store" });
            const ms = Math.round(performance.now() - started);
            return [tool.name, { ok: true, ms }] as const;
          } catch {
            return [tool.name, { ok: false, ms: null }] as const;
          }
        }),
      );
      if (!cancelled) {
        setPings(Object.fromEntries(entries));
        setCheckedAt(Date.now());
      }
    }
    checkLiveApps();
    const interval = window.setInterval(checkLiveApps, PING_INTERVAL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [tools]);

  // Keep the "checked Ns ago" label fresh.
  useEffect(() => {
    const ticker = window.setInterval(() => setNowTick(Date.now()), 5000);
    return () => window.clearInterval(ticker);
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const panel = panelRef.current;
    if (!panel) {
      return;
    }
    const rect = panel.getBoundingClientRect();
    panel.style.setProperty("--gx", `${event.clientX - rect.left}px`);
    panel.style.setProperty("--gy", `${event.clientY - rect.top}px`);
  }

  // Soft-highlight the matching tool card below while a status row is
  // hovered. Additive only — the cards' resting design is untouched.
  function setBeacon(toolName: string, on: boolean) {
    document
      .querySelector(`[data-tool="${toolName}"]`)
      ?.classList.toggle("card-beacon", on);
  }

  const liveTotal = tools.filter((tool) => tool.status === "Live").length;
  const liveReachable = Object.values(pings).filter((ping) => ping.ok).length;

  let footLabel = "Checking live apps…";
  if (checkedAt !== null) {
    const agoSeconds = Math.max(0, Math.round((nowTick - checkedAt) / 1000));
    const agoLabel =
      agoSeconds < 8
        ? "checked just now"
        : agoSeconds < 60
          ? `checked ${agoSeconds}s ago`
          : `checked ${Math.round(agoSeconds / 60)}m ago`;
    footLabel = `${liveReachable} of ${liveTotal} live apps reachable · ${agoLabel}`;
  }

  return (
    <aside
      aria-label="Suite overview"
      className="hub-panel glass-strong refract"
      onPointerMove={handlePointerMove}
      ref={panelRef}
    >
      <span aria-hidden="true" className="panel-glare" />
      <div className="panel-head">
        <span className="micro">Suite status</span>
      </div>
      <div className="mini-list">
        {tools.map((tool, index) => {
          const resolved = index < resolvedCount;
          const ping = pings[tool.name];
          return (
            <div
              className="mini-row"
              key={tool.name}
              onMouseEnter={() => setBeacon(tool.name, true)}
              onMouseLeave={() => setBeacon(tool.name, false)}
            >
              <span className="mini-id">
                <LogoAsset
                  alt={`${tool.name} logo`}
                  className="chip-sm"
                  fallback={tool.initials}
                  src={tool.logoSrc}
                />
                {tool.name}
                {resolved && tool.status === "Live" && ping?.ok && ping.ms !== null && (
                  <span className="mini-ping">{ping.ms}ms</span>
                )}
                {resolved && tool.status === "Live" && ping && !ping.ok && (
                  <span className="mini-ping is-down">offline</span>
                )}
              </span>
              {resolved ? (
                <span className={`badge badge-pop ${tool.status.toLowerCase()}`}>
                  {tool.status}
                </span>
              ) : (
                <span aria-hidden="true" className="badge-skeleton" />
              )}
            </div>
          );
        })}
      </div>
      <div aria-live="polite" className="panel-foot">
        <span
          aria-hidden="true"
          className={`foot-dot${liveReachable > 0 ? " is-ok" : ""}`}
        />
        {footLabel}
      </div>
    </aside>
  );
}
