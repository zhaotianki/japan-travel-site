"use client";

import { useEffect, useRef } from "react";

type AdsByGoogleQueue = unknown[];

declare global {
  interface Window {
    adsbygoogle?: AdsByGoogleQueue;
  }
}

type GoogleAdSenseSlotProps = {
  client: string;
  slot: string;
  className?: string;
};

export function GoogleAdSenseSlot({
  client,
  slot,
  className,
}: GoogleAdSenseSlotProps) {
  const pushedRef = useRef(false);

  useEffect(() => {
    if (pushedRef.current) return;
    pushedRef.current = true;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("AdSense slot failed to initialize", error);
      }
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle block min-h-32 w-full ${className ?? ""}`}
      data-ad-client={client}
      data-ad-format="auto"
      data-ad-slot={slot}
      data-full-width-responsive="true"
      data-testid="google-adsense-slot"
      style={{ display: "block" }}
    />
  );
}
