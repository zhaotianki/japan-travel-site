export type TravelAdCampaign = {
  id: string;
  provider: string;
  title: string;
  description: string;
  badge: string;
  href: string;
  commissionRate: number;
  estimatedOrderValueCny: number;
};

const campaigns: TravelAdCampaign[] = [
  {
    id: "trip-japan-hotels",
    provider: "Trip.com",
    title: "日本酒店与机酒套餐",
    description:
      "酒店和机酒套餐客单价高，适合作为日本自由行页面的主广告位。",
    badge: "预计收益最高",
    href:
      process.env.NEXT_PUBLIC_TRIP_AFFILIATE_URL ??
      "https://www.trip.com/hotels/",
    commissionRate: 0.07,
    estimatedOrderValueCny: 6000,
  },
  {
    id: "japan-theme-tickets",
    provider: "Klook",
    title: "日本乐园门票与当地体验",
    description:
      "适合接在行程规划后转化，客单价低于酒店，但购买决策更快。",
    badge: "体验票券",
    href:
      process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_URL ??
      "https://www.klook.com/",
    commissionRate: 0.065,
    estimatedOrderValueCny: 700,
  },
  {
    id: "japan-esim",
    provider: "eSIM / 流量卡",
    title: "日本 eSIM 与随身 Wi-Fi",
    description:
      "佣金率通常更高，但客单价较低，适合作为辅助广告位。",
    badge: "高佣金率",
    href: process.env.NEXT_PUBLIC_ESIM_AFFILIATE_URL ?? "https://www.klook.com/",
    commissionRate: 0.2,
    estimatedOrderValueCny: 90,
  },
];

function estimatedCommission(campaign: TravelAdCampaign) {
  return campaign.commissionRate * campaign.estimatedOrderValueCny;
}

export function getAdCampaigns() {
  return campaigns;
}

export function getBestAdCampaign() {
  return [...campaigns].sort(
    (a, b) => estimatedCommission(b) - estimatedCommission(a),
  )[0];
}

export function getAdCampaign(id: string) {
  return campaigns.find((campaign) => campaign.id === id) ?? null;
}

export function getEstimatedCommission(campaign: TravelAdCampaign) {
  return Math.round(estimatedCommission(campaign));
}

export function getTrackedAdHref(campaign: TravelAdCampaign, source = "home") {
  const params = new URLSearchParams({
    campaign: campaign.id,
    source,
  });
  return `/api/affiliate-clicks?${params.toString()}`;
}
