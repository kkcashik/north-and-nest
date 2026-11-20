"use client";

import { useEffect, useRef, useState } from "react";

/** Shows a photo when it exists; otherwise a clean styled placeholder block (never a broken image). */
export function ProductImage({
  src,
  name,
  className = "",
  priority = false,
}: {
  src?: string;
  name: string;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(!src);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setFailed(!src);
  }, [src]);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, [src]);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={`${name} — photo coming soon`}
        className={`flex flex-col items-center justify-center gap-2 bg-sage p-4 text-center text-forest ${className}`}
      >
        <svg viewBox="0 0 24 24" className="h-8 w-8 opacity-60" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
          <path d="M12 21v-8m0 0c0-4 3-6 7-6 0 4-3 6-7 6zm0 0c0-3-2-5-6-5 0 3 2 5 6 5z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-serif text-base leading-tight">{name}</span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={name}
      loading={priority ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
