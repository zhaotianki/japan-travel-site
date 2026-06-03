export type TravelAdCampaign = {
  id: string;
  provider: string;
  title: string;
  description: string;
  badge: string;
  href: string;
  isConfigured: boolean;
  commissionRate: number;
  commissionLabel: string;
  estimatedOrderValueCny: number;
  marketingShare: number;
  productCategory: string;
};

const tripAffiliateUrl = process.env.NEXT_PUBLIC_TRIP_AFFILIATE_URL;
const klookAffiliateUrl = process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_URL;
const esimAffiliateUrl = process.env.NEXT_PUBLIC_ESIM_AFFILIATE_URL;

const campaigns: TravelAdCampaign[] = [
  {
    id: "trip-japan-hotels",
    provider: "Trip.com",
    title: "日本酒店与机酒套餐",
    description:
      "酒店和机酒套餐客单价高，适合作为日本自由行页面的主广告位。",
    badge: "预计收益最高",
    href: tripAffiliateUrl ?? "https://www.trip.com/hotels/",
    isConfigured: Boolean(tripAffiliateUrl),
    commissionRate: 0.07,
    commissionLabel: "最高基础佣金 7%",
    estimatedOrderValueCny: 6000,
    marketingShare: 50,
    productCategory: "酒店 / 机票 / 机酒套餐",
  },
  {
    id: "japan-theme-tickets",
    provider: "Klook",
    title: "日本乐园门票与当地体验",
    description:
      "适合接在行程规划后转化，客单价低于酒店，但购买决策更快。",
    badge: "体验票券",
    href: klookAffiliateUrl ?? "https://www.klook.com/",
    isConfigured: Boolean(klookAffiliateUrl),
    commissionRate: 0.065,
    commissionLabel: "预估佣金 6.5%",
    estimatedOrderValueCny: 700,
    marketingShare: 30,
    productCategory: "乐园门票 / 当地体验 / 交通票券",
  },
  {
    id: "japan-esim",
    provider: "Airalo eSIM",
    title: "日本 eSIM 与随身 Wi-Fi",
    description:
      "出发前购买决策快，适合在搜索、行程和询单前后作为补充转化。",
    badge: "高转化补充",
    href: esimAffiliateUrl ?? "https://www.airalo.com/japan-esim",
    isConfigured: Boolean(esimAffiliateUrl),
    commissionRate: 0.1,
    commissionLabel: "标准佣金 10%",
    estimatedOrderValueCny: 90,
    marketingShare: 15,
    productCategory: "日本 eSIM / 流量卡",
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

export function getAffiliateMarketingShare() {
  return campaigns.reduce((sum, campaign) => sum + campaign.marketingShare, 0);
}

export function getTrackedAdHref(campaign: TravelAdCampaign, source = "home") {
  const params = new URLSearchParams({
    campaign: campaign.id,
    source,
  });
  return `/api/affiliate-clicks?${params.toString()}`;
}
