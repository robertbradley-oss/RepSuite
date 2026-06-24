"use client";

import { useState } from "react";

type LogoAssetProps = {
  alt: string;
  className: string;
  fallback: string;
  src: string;
};

export function LogoAsset({ alt, className, fallback, src }: LogoAssetProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <span aria-label={alt} className={className} role="img">
        {fallback}
      </span>
    );
  }

  return (
    <span className={className}>
      <img alt={alt} onError={() => setHasError(true)} src={src} />
    </span>
  );
}
