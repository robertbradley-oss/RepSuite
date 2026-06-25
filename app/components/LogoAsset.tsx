"use client";

import { useEffect, useRef, useState } from "react";

type LogoAssetProps = {
  alt: string;
  className: string;
  fallback: string;
  src: string;
};

export function LogoAsset({ alt, className, fallback, src }: LogoAssetProps) {
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Catch loads that failed before hydration (e.g. a missing file 404s during
  // the initial paint, so the onError event never reaches React).
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setHasError(true);
    }
  }, [src]);

  if (hasError) {
    return (
      <span aria-label={alt} className={className} role="img">
        {fallback}
      </span>
    );
  }

  return (
    <span className={className}>
      <img ref={imgRef} alt={alt} onError={() => setHasError(true)} src={src} />
    </span>
  );
}
