"use client";

import { useEffect } from "react";
import type { SponsorAd } from "@/content/ads";

type AdSlotProps = {
  client: string;
  slot: string;
  label?: string;
  nativeAd: SponsorAd;
  variant?: "box" | "leaderboard" | "inline";
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({ client, slot, label = "广告", nativeAd, variant = "box" }: AdSlotProps) {
  useEffect(() => {
    if (!client || !slot) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // AdSense can be blocked locally by extensions; keep the UI stable.
    }
  }, [client, slot]);

  if (!client || !slot) {
    const isExternal = nativeAd.href.startsWith("http");

    return (
      <aside className={`ad-slot native-ad native-ad-${variant}`} aria-label={label}>
        <div className="ad-disclosure">{nativeAd.eyebrow}</div>
        <div className="tag-row">
          {nativeAd.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <h3>{nativeAd.title}</h3>
        <p>{nativeAd.description}</p>
        <a
          href={nativeAd.href}
          className="ad-cta"
          rel={isExternal ? "sponsored noreferrer" : "sponsored"}
          target={isExternal ? "_blank" : undefined}
        >
          {nativeAd.cta}
        </a>
      </aside>
    );
  }

  return (
    <aside className={`ad-slot adsense-slot adsense-slot-${variant}`} aria-label={label}>
      <div className="ad-disclosure">Google AdSense</div>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
