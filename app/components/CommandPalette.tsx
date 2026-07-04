"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type PaletteTool = {
  name: string;
  label: string;
  logoSrc: string;
  appHref: string;
  githubHref: string;
};

type PaletteAction = {
  id: string;
  title: string;
  hint: string;
  href: string;
  logoSrc?: string;
};

function PaletteGithubIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

/**
 * The launcher's launcher: a ⌘K / Ctrl+K command palette. Renders the hint
 * pill in the header and a frosted overlay when open. Type to filter, arrow
 * keys to navigate, Enter to open, Escape to close.
 */
export function CommandPalette({ tools }: { tools: PaletteTool[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [modLabel, setModLabel] = useState("⌘");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isApple = /Mac|iPhone|iPad/.test(
      `${navigator.platform} ${navigator.userAgent}`,
    );
    if (!isApple) {
      setModLabel("Ctrl");
    }
  }, []);

  const actions = useMemo<PaletteAction[]>(
    () => [
      ...tools.map((tool) => ({
        id: `open-${tool.name}`,
        title: `Open ${tool.name}`,
        hint: tool.label,
        href: tool.appHref,
        logoSrc: tool.logoSrc,
      })),
      ...tools.map((tool) => ({
        id: `github-${tool.name}`,
        title: `${tool.name} on GitHub`,
        hint: "Repository",
        href: tool.githubHref,
      })),
    ],
    [tools],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length === 0) {
      return actions;
    }
    return actions.filter((action) =>
      `${action.title} ${action.hint}`.toLowerCase().includes(q),
    );
  }, [actions, query]);

  const active = Math.min(activeIndex, Math.max(filtered.length - 1, 0));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((wasOpen) => !wasOpen);
        setQuery("");
        setActiveIndex(0);
      } else if (event.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  function launch(action: PaletteAction) {
    window.open(action.href, "_blank", "noreferrer");
    setOpen(false);
  }

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex(Math.min(active + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(Math.max(active - 1, 0));
    } else if (event.key === "Enter" && filtered[active]) {
      event.preventDefault();
      launch(filtered[active]);
    }
  }

  return (
    <>
      <button
        className="palette-hint"
        onClick={() => {
          setOpen(true);
          setQuery("");
          setActiveIndex(0);
        }}
        type="button"
      >
        <span>Launch</span>
        <kbd>{modLabel} K</kbd>
      </button>

      {open && (
        <div
          aria-label="Command palette"
          aria-modal="true"
          className="palette-overlay"
          onClick={() => setOpen(false)}
          role="dialog"
        >
          <div className="palette-panel" onClick={(event) => event.stopPropagation()}>
            <input
              aria-label="Search Rep tools"
              className="palette-input"
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={onInputKeyDown}
              placeholder="Search Rep tools…"
              ref={inputRef}
              spellCheck={false}
              type="text"
              value={query}
            />
            <div className="palette-list" role="listbox">
              {filtered.length === 0 && (
                <div className="palette-empty">No matches.</div>
              )}
              {filtered.map((action, index) => (
                <button
                  aria-selected={index === active}
                  className={`palette-row${index === active ? " is-active" : ""}`}
                  key={action.id}
                  onClick={() => launch(action)}
                  onMouseEnter={() => setActiveIndex(index)}
                  role="option"
                  type="button"
                >
                  <span aria-hidden="true" className="palette-icon">
                    {action.logoSrc ? (
                      <img alt="" src={action.logoSrc} />
                    ) : (
                      <PaletteGithubIcon />
                    )}
                  </span>
                  <span className="palette-title">{action.title}</span>
                  <span className="palette-hint-text">{action.hint}</span>
                </button>
              ))}
            </div>
            <div className="palette-foot">
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> navigate
              </span>
              <span>
                <kbd>↵</kbd> open
              </span>
              <span>
                <kbd>esc</kbd> close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
