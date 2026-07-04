"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient hero motion: three slow-drifting aurora blobs behind the page, plus
 * a faint dot-grid that is only revealed inside a soft spotlight following
 * the cursor. Everything is pointer-events: none and sits under the shell.
 */
export function AmbientBackground() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) {
      return;
    }
    let frame = 0;
    const onPointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        grid.style.setProperty("--spot-x", `${event.clientX}px`);
        grid.style.setProperty("--spot-y", `${event.clientY}px`);
        grid.classList.add("has-spot");
      });
    };
    window.addEventListener("pointermove", onPointerMove);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="ambient" aria-hidden="true">
      <div className="aurora-blob blob-a" />
      <div className="aurora-blob blob-b" />
      <div className="aurora-blob blob-c" />
      <div className="dot-grid" ref={gridRef} />
    </div>
  );
}
