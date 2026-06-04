import { sponsorAds, type SponsorAd } from "@/content/ads";
import { getAdSenseClient, getAdSenseSlot, getSponsorAds } from "@/lib/site";
import { AdSlot } from "./AdSlot";

type AdUnitProps = {
  placement: SponsorAd["placement"];
  variant?: "box" | "leaderboard" | "inline";
  label?: string;
};

export function AdUnit({ placement, variant = "box", label = "广告" }: AdUnitProps) {
  const configuredAds = getSponsorAds();
  const nativeAd =
    configuredAds.find((item) => item.placement === placement) ??
    sponsorAds.find((item) => item.placement === placement) ??
    sponsorAds[0];

  return (
    <AdSlot
      client={getAdSenseClient()}
      slot={getAdSenseSlot()}
      label={label}
      nativeAd={nativeAd}
      variant={variant}
    />
  );
}
